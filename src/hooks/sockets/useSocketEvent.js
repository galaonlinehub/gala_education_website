// import { useEffect, useCallback, useRef } from "react";
// import { listen } from "@/src/services/socket/socket-api";

// export const useSocketEvent = (namespace, eventName, callback, deps = []) => {
//   const callbackRef = useRef(callback);
//   const cleanupRef = useRef(null);

//   useEffect(() => {
//     callbackRef.current = callback;
//   }, [callback]);

//   const stableCallback = useCallback((...args) => {
//     console.log(`Executing callback for ${eventName} in ${namespace}`);
//     callbackRef.current(...args);
//   }, []);

//   useEffect(() => {
//     if (cleanupRef.current) {
//       cleanupRef.current();
//       cleanupRef.current = null;
//     }

//     console.log(`Registering listener for ${eventName} in ${namespace}`);
//     cleanupRef.current = listen(namespace, eventName, stableCallback);

//     return () => {
//       if (cleanupRef.current) {
//         console.log(`Cleaning up listener for ${eventName} in ${namespace}`);
//         cleanupRef.current();
//         cleanupRef.current = null;
//       }
//     };
//   // Explicitly list all dependencies to avoid spread in dependency array
//   // If 'deps' is dynamic, you can use a workaround like JSON.stringify(deps)
//   }, [namespace, eventName, stableCallback, ...deps]);
// };

// src/hooks/sockets/useSocketEvent.js
import { useEffect, useCallback, useRef } from "react";
import { listen, getSocket } from "@/src/services/socket/socket-api";

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
