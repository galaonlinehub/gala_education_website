import { useEffect, useState, useMemo } from "react";

import { USER_COOKIE_KEY } from "@/config/settings";
import { state } from "@/services/socket/config";
import {  getConnectionState,
  getSocket,
  isHealthy,
  onConnectionEvent, } from "@/services/socket/socket-api";
import { cookieFn } from "@/utils/fns/client";
import { decrypt } from "@/utils/fns/encryption";

/**
 * Hook for managing socket connection status and optionally initializing a connection.
 *
 * @param {Object} config
 * @param {string} [config.namespace="default"] - The socket namespace.
 * @param {Object} [config.options=null] - Options to pass to getSocket (e.g., query, auth, transportOptions).
 * @param {boolean} [config.initialize=true] - Whether to initialize the socket if it doesn't exist.
 * @param {boolean} [config.useInternalToken=false] - If true, fetches token from cookie and builds options.
 * @param {Object} [config.user=null] - User object for building internal query.
 * @param {boolean} [config.isDev=false] - Whether to include development mode flag in query.
 *
 * @returns {Object} Connection information: isConnected, socketId, state, isHealthy, lastError
 */
export const useSocketConnection = ({
  namespace = "default",
  options = null,
  initialize = true,
  useInternalToken = false,
  user = null,
  isDev = false,
} = {}) => {
  const [connectionInfo, setConnectionInfo] = useState(() => ({
    isConnected: false,
    state: getConnectionState(namespace),
    isHealthy: isHealthy(namespace),
    socketId: null,
    lastError: null,
  }));

  if (options && useInternalToken) {
    console.warn(
      "[useSocketConnection] Both `options` and `useInternalToken` provided. Internal options may override the external ones."
    );
  }

  const computedOptions = useMemo(() => {
    if (!useInternalToken || !initialize) return options;

    const token = decrypt(cookieFn.get(USER_COOKIE_KEY));
    if (!token) {
      console.error(
        "[useSocketConnection] No token available for socket authentication"
      );
      return null;
    }


    return {
      query: {
        ...(user?.id ? { user_id: user?.id } : {}),
        ...(isDev ? { mode: "development" } : {}),
      },
      auth: { token },
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    };
  }, [useInternalToken, user?.id, isDev, options, initialize]);



  useEffect(() => {
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

    // Subscribe to socket events
    const cleanupConnect = onConnectionEvent(
      "connection:connected",
      handleConnect
    );
    const cleanupDisconnect = onConnectionEvent(
      "connection:disconnected",
      handleDisconnect
    );
    const cleanupError = onConnectionEvent("connection:error", handleError);

    let socket = null;

    if (initialize && (computedOptions || options)) {
      socket = getSocket(namespace, computedOptions || options);
    } else {
      // Only check existing connection without initializing
      socket = state.connections.get(namespace);
    }

    if (socket) {
      setConnectionInfo((prev) => ({
        ...prev,
        isConnected: socket.connected,
        state: socket.connected ? "connected" : "disconnected",
        isHealthy: isHealthy(namespace),
        socketId: socket.id,
      }));
    } else {
      setConnectionInfo((prev) => ({
        ...prev,
        isConnected: false,
        state: "disconnected",
        isHealthy: false,
        socketId: null,
        lastError:
          computedOptions === null && useInternalToken
            ? "No token available"
            : prev.lastError,
      }));
    }

    return () => {
      cleanupConnect();
      cleanupDisconnect();
      cleanupError();

      // Optional: Disconnect socket on unmount
      // if (socket && initialize) socket.disconnect();

   if (socket && initialize) {
      console.log(`Cleaning and closing namespace ${namespace}`)
      socket.disconnect();
      state.connections.delete(namespace);
    };
   };
  }, [namespace, computedOptions, initialize, options, useInternalToken]);

  return connectionInfo;
};
