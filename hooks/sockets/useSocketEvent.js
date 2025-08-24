
// hooks/useSocket.js
import { useEffect, useCallback, useRef } from "react";

import { listen } from "../../services/socket/socket-api";

export const useSocketEvent = (namespace, eventName, callback, deps = []) => {
  const callbackRef = useRef(callback);
  const cleanupRef = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const stableCallback = useCallback(
    (...args) => {
      console.log(`Executing callback for ${eventName} in ${namespace}`);
      callbackRef.current(...args);
    },
    [namespace, eventName]
  );

  useEffect(() => {
    const socket = getSocket(namespace);
    if (!socket) {
      console.warn(`Socket for namespace ${namespace} not initialized`);
      return;
    }

    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    console.log(`Registering listener for ${eventName} in ${namespace}`);
    cleanupRef.current = listen(namespace, eventName, stableCallback);

    return () => {
      if (cleanupRef.current) {
        console.log(`Cleaning up listener for ${eventName} in ${namespace}`);
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [namespace, eventName, stableCallback, ...deps]);

  return () => {
    if (cleanupRef.current) {
      console.log(`Manual cleanup for ${eventName} in ${namespace}`);
      cleanupRef.current();
    }
  };
};
