import { createConnection, state } from "@/config";

export const getSocket = (namespace = "default", options = {}) => {
  if (!state.connections.has(namespace)) {
    createConnection(namespace, options);
  }
  return state.connections.get(namespace);
};

export const emit = (namespace, event, data, options = {}) => {
  const { priority = "normal" } = options;
  const socket = getSocket(namespace);
  const connectionState = state.connectionStates.get(namespace);

  if (state.circuitBreaker.state === "OPEN") {
    console.warn(`Circuit breaker is OPEN for ${namespace}. Message queued.`);
    queueMessage(namespace, event, data, priority);
    return false;
  }

  if (connectionState === "connected" && socket) {
    try {
      socket.emit(event, data);
      state.metrics.messagesSent++;
      return true;
    } catch (error) {
      console.error("Socket emit error:", error);
      queueMessage(namespace, event, data, priority);
      return false;
    }
  } else {
    queueMessage(namespace, event, data, priority);
    return false;
  }
};

export const listen = (namespace, event, callback) => {
  const socket = getSocket(namespace);
  if (socket) {
    socket.on(event, callback);
    return () => socket.off(event, callback);
  }
  return () => {};
};

export const disconnect = (namespace) => {
  const socket = state.connections.get(namespace);
  if (socket) {
    socket.disconnect();
    state.connections.delete(namespace);
    state.messageQueues.delete(namespace);
    state.connectionStates.delete(namespace);
    state.metrics.activeConnections = Math.max(
      0,
      state.metrics.activeConnections - 1
    );
  }
};

export const getConnectionState = (namespace) => {
  return state.connectionStates.get(namespace) || "disconnected";
};

export const isHealthy = (namespace) => {
  const connectionState = state.connectionStates.get(namespace);
  return (
    connectionState === "connected" && state.circuitBreaker.state !== "OPEN"
  );
};

export const getMetrics = () => {
  return {
    ...state.metrics,
    connectionStates: Object.fromEntries(state.connectionStates),
    queueSizes: Object.fromEntries(
      Array.from(state.messageQueues.entries()).map(([ns, queue]) => [
        ns,
        queue.length,
      ])
    ),
    circuitBreakerState: state.circuitBreaker.state,
  };
};

export const reconnect = (namespace) => {
  const socket = state.connections.get(namespace);
  if (socket) {
    socket.disconnect();
    socket.connect();
  }
};

// Event system
export const onConnectionEvent = (event, callback) => {
  return eventEmitter.on(event, callback);
};

export const offConnectionEvent = (event, callback) => {
  eventEmitter.off(event, callback);
};

// Cleanup on page unload
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    state.connections.forEach((socket, namespace) => {
      disconnect(namespace);
    });
  });
}
