// hooks/useSocket.js
import { useEffect, useState } from "react";
import { getSocket } from "../../services/socket/socket-api";

/**
 * Auto-reconnect hook with exponential backoff
 */
export const useAutoReconnect = (namespace, maxAttempts = 10) => {
  const [reconnectInfo, setReconnectInfo] = useState({
    attempts: 0,
    isReconnecting: false,
    lastAttempt: null,
  });

  const { isConnected } = useSocketConnection(namespace);

  useEffect(() => {
    if (isConnected) {
      setReconnectInfo({
        attempts: 0,
        isReconnecting: false,
        lastAttempt: null,
      });
      return;
    }

    if (reconnectInfo.attempts >= maxAttempts) {
      return;
    }

    const reconnectDelay = Math.min(
      1000 * Math.pow(2, reconnectInfo.attempts),
      30000
    );

    setReconnectInfo((prev) => ({
      ...prev,
      isReconnecting: true,
    }));

    const timeout = setTimeout(() => {
      const socket = getSocket(namespace);
      if (socket && !socket.connected) {
        socket.connect();
        setReconnectInfo((prev) => ({
          attempts: prev.attempts + 1,
          isReconnecting: false,
          lastAttempt: Date.now(),
        }));
      }
    }, reconnectDelay);

    return () => clearTimeout(timeout);
  }, [isConnected, namespace, reconnectInfo.attempts, maxAttempts]);

  return reconnectInfo;
};
