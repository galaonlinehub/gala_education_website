import { useEffect, useMemo, useState } from "react";

import { USER_COOKIE_KEY } from "@/config/settings";
import { state } from "@/services/socket/config";
import { getConnectionState ,
  getSocket,
  isHealthy,
  onConnectionEvent} from "@/services/socket/socket-api";
import { cookieFn } from "@/utils/fns/client";
import { decrypt } from "@/utils/fns/encryption";

/**
 * Hook to manage multiple socket namespaces.
 *
 * @param {Array} configs - List of config objects:
 *   {
 *     namespace: string,
 *     initialize?: boolean,
 *     useInternalToken?: boolean,
 *     userId?: number,
 *     isDev?: boolean,
 *     options?: object
 *   }
 */
export const useSocketMultipleNamespaces = (configs = []) => {
  const [connections, setConnections] = useState({});

  const computedConfigs = useMemo(() => {
    return configs.map((config) => {
      const {
        namespace,
        initialize = true,
        useInternalToken = false,
        options = null,
        userId = null,
        isDev = false,
      } = config;

      let finalOptions = options;

      if (useInternalToken && initialize) {
        const token = decrypt(cookieFn.get(USER_COOKIE_KEY));
        if (!token) {
          console.warn(`[${namespace}] No token available`);
          return { namespace, options: null, initialize: false };
        }

        finalOptions = {
          query: {
            ...(userId ? { user_id: userId } : {}),
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

    computedConfigs.forEach(({ namespace, initialize, options }) => {
      if (initialize && options) {
        getSocket(namespace, options);
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
