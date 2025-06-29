import { useCallback, useState, useMemo } from "react";
import { emit } from "@/src/services/socket/socket-api";

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
