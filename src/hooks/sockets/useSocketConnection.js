// hooks/useSocket.js
import { useEffect, useState } from "react";

import {
  getConnectionState,
  getSocket,
  isHealthy,
  onConnectionEvent,
} from "../../services/socket/socket-api";

/**
 * Modern connection status hook
 */
export const useSocketConnection = (namespace = "default") => {
  const [connectionInfo, setConnectionInfo] = useState(() => ({
    isConnected: false,
    state: getConnectionState(namespace),
    isHealthy: isHealthy(namespace),
    socketId: null,
    lastError: null,
  }));

  useEffect(() => {
    // Event handlers
    const handleConnect = ({ namespace: ns, socketId }) => {
      if (ns === namespace) {
        setConnectionInfo((prev) => ({
          ...prev,
          isConnected: true,
          state: "connected",
          isHealthy: true,
          socketId,
          lastError: null,
        }));
      }
    };

    const handleDisconnect = ({ namespace: ns, reason }) => {
      if (ns === namespace) {
        setConnectionInfo((prev) => ({
          ...prev,
          isConnected: false,
          state: "disconnected",
          isHealthy: false,
          socketId: null,
          lastError: reason,
        }));
      }
    };

    const handleError = ({ namespace: ns, error }) => {
      if (ns === namespace) {
        setConnectionInfo((prev) => ({
          ...prev,
          isConnected: false,
          state: "error",
          isHealthy: false,
          lastError: error.message || error,
        }));
      }
    };

    // Subscribe to events
    const cleanupConnect = onConnectionEvent(
      "connection:connected",
      handleConnect
    );
    const cleanupDisconnect = onConnectionEvent(
      "connection:disconnected",
      handleDisconnect
    );
    const cleanupError = onConnectionEvent("connection:error", handleError);

    // Initialize socket and get current state
    const socket = getSocket(namespace);
    if (socket) {
      setConnectionInfo((prev) => ({
        ...prev,
        isConnected: socket.connected,
        state: socket.connected ? "connected" : "disconnected",
        isHealthy: isHealthy(namespace),
        socketId: socket.id,
      }));
    }

    return () => {
      cleanupConnect();
      cleanupDisconnect();
      cleanupError();
    };
  }, [namespace]);

  return connectionInfo;
};
