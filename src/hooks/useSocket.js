// hooks/useSocket.js
import { useEffect, useCallback, useRef, useState, useMemo } from "react";
import {
  getConnectionState,
  getSocket,
  emit,
  listen,
  isHealthy,
  getMetrics,
  onConnectionEvent,
  offConnectionEvent,
} from "../services/socket/socket-api";

/**
 * Modern socket event hook with automatic cleanup
 */
export const useSocketEvent = (namespace, eventName, callback, deps = []) => {
  const callbackRef = useRef(callback);
  const cleanupRef = useRef(null);

  // Keep callback reference current
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Stable callback that won't change reference
  const stableCallback = useCallback((...args) => {
    callbackRef.current(...args);
  }, []);

  useEffect(() => {
    // Cleanup previous listener
    if (cleanupRef.current) {
      cleanupRef.current();
    }

    // Setup new listener
    cleanupRef.current = listen(namespace, eventName, stableCallback);

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [namespace, eventName, stableCallback, ...deps]);
};

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

/**
 * Modern emit hook with status tracking
 */
export const useSocketEmit = (namespace = "default") => {
  const [emitStatus, setEmitStatus] = useState({
    isEmitting: false,
    lastEmit: null,
    error: null,
  });

  const emitMessage = useCallback(
    async (event, data, options = {}) => {
      setEmitStatus((prev) => ({ ...prev, isEmitting: true, error: null }));

      try {
        const success = emit(namespace, event, data, options);
        const result = {
          event,
          data,
          timestamp: Date.now(),
          success,
        };

        setEmitStatus({
          isEmitting: false,
          lastEmit: result,
          error: success ? null : "Message queued (connection unavailable)",
        });

        return success;
      } catch (error) {
        setEmitStatus({
          isEmitting: false,
          lastEmit: null,
          error: error.message,
        });
        return false;
      }
    },
    [namespace]
  );

  return useMemo(
    () => ({
      emit: emitMessage,
      ...emitStatus,
    }),
    [emitMessage, emitStatus]
  );
};

/**
 * Real-time data synchronization hook
 */
export const useRealtimeData = (namespace, dataKey, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [metadata, setMetadata] = useState({
    isLoading: true,
    lastUpdate: null,
    error: null,
  });

  const { emit } = useSocketEmit(namespace);

  // Handle data updates
  useSocketEvent(namespace, `${dataKey}:update`, (newData) => {
    setData(newData);
    setMetadata((prev) => ({
      ...prev,
      isLoading: false,
      lastUpdate: Date.now(),
      error: null,
    }));
  });

  // Handle partial updates
  useSocketEvent(namespace, `${dataKey}:patch`, (patch) => {
    setData((prevData) => {
      if (typeof prevData === "object" && prevData !== null) {
        return { ...prevData, ...patch };
      }
      return patch;
    });
    setMetadata((prev) => ({
      ...prev,
      lastUpdate: Date.now(),
    }));
  });

  // Handle errors
  useSocketEvent(namespace, `${dataKey}:error`, (error) => {
    setMetadata((prev) => ({
      ...prev,
      isLoading: false,
      error: error.message || error,
    }));
  });

  // Subscribe on mount
  useEffect(() => {
    emit(`${dataKey}:subscribe`);

    return () => {
      emit(`${dataKey}:unsubscribe`);
    };
  }, [emit, dataKey]);

  return useMemo(
    () => ({
      data,
      ...metadata,
      refetch: () => emit(`${dataKey}:refresh`),
    }),
    [data, metadata, emit, dataKey]
  );
};

/**
 * Socket metrics hook for monitoring
 */
export const useSocketMetrics = (updateInterval = 5000) => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(getMetrics());
    };

    // Initial update
    updateMetrics();

    // Periodic updates
    const interval = setInterval(updateMetrics, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  return metrics;
};

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
