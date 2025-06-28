import { useEffect, useState } from "react";
import {
  getConnectionState,
  getSocket,
  isHealthy,
  onConnectionEvent,
} from "../../services/socket/socket-api";
/**
 * Multiple namespaces hook
 */
export const useMultipleNamespaces = (namespaces = []) => {
  const [connections, setConnections] = useState({});

  useEffect(() => {
    const updateConnections = () => {
      const newConnections = {};
      namespaces.forEach((ns) => {
        const socket = getSocket(ns);
        newConnections[ns] = {
          connected: socket?.connected || false,
          healthy: isHealthy(ns),
          state: getConnectionState(ns),
        };
      });
      setConnections(newConnections);
    };

    // Initial update
    updateConnections();

    // Listen for changes
    const cleanupConnect = onConnectionEvent(
      "connection:connected",
      updateConnections
    );
    const cleanupDisconnect = onConnectionEvent(
      "connection:disconnected",
      updateConnections
    );
    const cleanupError = onConnectionEvent(
      "connection:error",
      updateConnections
    );

    return () => {
      cleanupConnect();
      cleanupDisconnect();
      cleanupError();
    };
  }, [namespaces.join(",")]);

  return connections;
};
