// hooks/useSocket.js
import { useEffect, useCallback, useRef } from "react";
import { listen } from "@/src/services/socket/socket-api";

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
  }, [namespace, eventName, stableCallback]);
};
