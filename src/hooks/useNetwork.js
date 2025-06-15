import { useEffect, useState } from "react";
import { api } from "@/src/services/api/api_service";

const useNetwork = () => {
  const [networkStatus, setNetworkStatus] = useState({
    isOnline: navigator.onLine,
    connectionQuality: "unknown",
  });

  useEffect(() => {
    let previousStatus = {
      isOnline: navigator.onLine,
      connectionQuality: "unknown",
    };

    const checkConnectionQuality = () => {
      if (navigator.connection) {
        const connection = navigator.connection;
        const effectiveType = connection.effectiveType;

        if (effectiveType === "4g") {
          return "good";
        } else if (effectiveType === "3g") {
          return "moderate";
        } else {
          return "weak";
        }
      }
      return "unknown";
    };

    const updateConnectionStatus = () => {
      const isOnline = navigator.onLine;
      const quality = isOnline ? checkConnectionQuality() : "offline";

      if (
        quality !== previousStatus.connectionQuality ||
        isOnline !== previousStatus.isOnline
      ) {
        previousStatus = { isOnline, connectionQuality: quality };
        setNetworkStatus({ isOnline, connectionQuality: quality });
      }
    };

    const handleOnline = () => {
      const quality = "good";
      previousStatus = { isOnline: true, connectionQuality: quality };
      setNetworkStatus({ isOnline: true, connectionQuality: quality });
    };

    const handleOffline = () => {
      previousStatus = { isOnline: false, connectionQuality: "offline" };
      setNetworkStatus({ isOnline: false, connectionQuality: "offline" });
    };

    const checkConnection = async () => {
      const startTime = Date.now();
      try {
        await api.head("/health", {
          timeout: 5000,
          headers: { "Cache-Control": "no-cache" },
        });

        const latency = Date.now() - startTime;
        const newQuality =
          latency < 500 ? "good" : latency < 700 ? "moderate" : "weak";
        if (newQuality !== previousStatus.connectionQuality) {
          previousStatus = { isOnline: true, connectionQuality: newQuality };
          setNetworkStatus({ isOnline: true, connectionQuality: newQuality });
        }
      } catch (error) {
        const isNetworkError = !error.response;
        if (navigator.onLine) {
          if (previousStatus.connectionQuality !== "weak" || isNetworkError) {
            previousStatus = { isOnline: true, connectionQuality: "weak" };
            setNetworkStatus({ isOnline: true, connectionQuality: "weak" });
          }
        }
      }
    };

    updateConnectionStatus();

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const initialTimeout = setTimeout(() => {
      checkConnection();
    }, 3000);

    const intervalId = setInterval(checkConnection, 30000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, []);

  return networkStatus;
};

export default useNetwork;
