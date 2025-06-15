import { useEffect } from "react";
import notificationService from "../ui/notification/Notification";
import { api } from "@/src/services/api/api_service";

const NetworkMonitor = () => {
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

    const showConnectionNotification = (isOnline, quality, prevQuality) => {
      if (isOnline && quality === prevQuality) return;

      if (!isOnline) {
        notificationService.error({
          message: "You're offline",
          description:
            "Please check your internet connection, make sure you have stable internet connection.",
          duration: null,
          position: "top",
          closable: true,
          customStyle: { padding: "10px" },
        });
      } else if (quality === "weak") {
        notificationService.warning({
          message: "Weak Connection",
          description:
            "Your internet connection is unstable. Some features may not work properly.",
          duration: null,
          position: "top",
          customStyle: {},
        });
      } else if (quality === "moderate" && prevQuality === "weak") {
        notificationService.info({
          message: "Connection Improved",
          description: "Your connection has improved to moderate speed.",
          duration: null,
          position: "top",
          customStyle: {},
        });
      } else if (
        quality === "good" &&
        (prevQuality === "weak" || prevQuality === "moderate")
      ) {
        notificationService.success({
          message: "Strong Connection",
          description: "Your internet connection is stable.",
          duration: null,
          position: "top",
          customStyle: {},
        });
      } else if (prevQuality === "offline" && isOnline) {
        notificationService.success({
          message: "Back Online",
          description: "Your internet connection has been restored.",
          duration: null,
          position: "top",
        });
      }
    };

    const updateConnectionStatus = () => {
      const isOnline = navigator.onLine;
      const quality = isOnline ? checkConnectionQuality() : "offline";

      if (
        quality !== previousStatus.connectionQuality ||
        isOnline !== previousStatus.isOnline
      ) {
        showConnectionNotification(
          isOnline,
          quality,
          previousStatus.connectionQuality
        );
        previousStatus = { isOnline, connectionQuality: quality };
      }
    };

    updateConnectionStatus();

    const handleOnline = () => {
      showConnectionNotification(true, "good", "offline");
      previousStatus = { isOnline: true, connectionQuality: "good" };
    };

    const handleOffline = () => {
      showConnectionNotification(
        false,
        "offline",
        previousStatus.connectionQuality
      );
      previousStatus = { isOnline: false, connectionQuality: "offline" };
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const checkConnection = async () => {
      const startTime = Date.now();
      try {
        await api.head("/health", {
          timeout: 5000,
          headers: { "Cache-Control": "no-cache" },
        });

        const latency = Date.now() - startTime;
        console.log(latency, "this is latency");
        const newQuality =
          latency < 700 ? "good" : latency < 800 ? "moderate" : "weak";
        if (newQuality !== previousStatus.connectionQuality) {
          showConnectionNotification(
            true,
            newQuality,
            previousStatus.connectionQuality
          );
          previousStatus = {
            isOnline: true,
            connectionQuality: newQuality,
          };
        }
      } catch (error) {
        const isNetworkError = !error.response;
        if (navigator.onLine) {
          if (previousStatus.connectionQuality !== "weak" || isNetworkError) {
            showConnectionNotification(
              true,
              "weak",
              previousStatus.connectionQuality
            );
            previousStatus = {
              isOnline: true,
              connectionQuality: "weak",
            };
          }
        }
      }
    };

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

  return null;
};

export default NetworkMonitor;
