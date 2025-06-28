import { useEffect, useMemo, useState } from "react";
import {
  getConnectionState,
  getSocket,
  isHealthy,
  onConnectionEvent,
  state,
} from "../../services/socket/socket-api";
import { decrypt } from "@/src/utils/fns/encryption";
import { cookieFn } from "@/src/utils/fns/client";
import { USER_COOKIE_KEY } from "@/src/config/settings";

/**
 * Hook to manage multiple socket namespaces.
 *
 * @param {Array} configs - List of config objects:
 *   {
 *     namespace: string,
 *     initialize?: boolean,
 *     useInternalToken?: boolean,
 *     user?: object,
 *     isDev?: boolean,
 *     options?: object
 *   }
 */
export const useMultipleNamespacesConnection = (configs = []) => {
  const [connections, setConnections] = useState({});

  const computedConfigs = useMemo(() => {
    return configs.map((config) => {
      const {
        namespace,
        initialize = true,
        useInternalToken = false,
        options = null,
        user = null,
        isDev = false,
      } = config;

      let finalOptions = options;

      if (useInternalToken && initialize) {
        const token = decrypt(cookieFn.get(USER_COOKIE_KEY));
        if (!token) {
          console.warn(`[${namespace}] No token available`);
          return { namespace, options: null, initialize: false }; // skip init
        }

        finalOptions = {
          query: {
            ...(user?.id ? { user_id: user.id } : {}),
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
      }

      return { namespace, initialize, options: finalOptions };
    });
  }, [configs]);

  useEffect(() => {
    const updateConnections = () => {
      const newStates = {};
      computedConfigs.forEach(({ namespace }) => {
        const socket = state.connections.get(namespace);
        newStates[namespace] = {
          connected: socket?.connected || false,
          healthy: isHealthy(namespace),
          state: getConnectionState(namespace),
          socketId: socket?.id || null,
        };
      });
      setConnections(newStates);
    };

    // Init sockets
    computedConfigs.forEach(({ namespace, initialize, options }) => {
      if (initialize && options) {
        getSocket(namespace, options); // will only connect if not already
      }
    });

    updateConnections();

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
  }, [computedConfigs]);

  return connections;
};
