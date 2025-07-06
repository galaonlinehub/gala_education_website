// src/services/socket/socket-api.js
import { io } from "socket.io-client";
import { state, createConnection, eventEmitter, queueMessage, processQueuedMessages, setupConnectionHandlers } from "./config";

const listenerRegistry = new Map();

export const getSocket = (namespace = "default", options = {}) => {
  const existing = state.connections.get(namespace);

  if (!existing && options?.auth?.token) {
    return createConnection(namespace, options);
  }

  return existing;
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

export const listen = (namespace, eventName, callback) => {
  const socket = getSocket(namespace);
  if (!socket) {
    console.warn(`Cannot listen to ${eventName}: Socket for ${namespace} not initialized`);
    return () => {};
  }

  // Create a unique key for the listener
  const listenerKey = `${namespace}:${eventName}:${callback.toString()}`;
  if (listenerRegistry.has(listenerKey)) {
    console.log(`Listener already exists for ${eventName} in ${namespace}`);
    return listenerRegistry.get(listenerKey).cleanup;
  }

  socket.on(eventName, callback);
  console.log(`Listener registered for ${eventName} in ${namespace}`);

  const cleanup = () => {
    socket.off(eventName, callback);
    listenerRegistry.delete(listenerKey);
    console.log(`Listener removed for ${eventName} in ${namespace}`);
  };

  listenerRegistry.set(listenerKey, { cleanup, callback });
  return cleanup;
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

    // Clean up all listeners for this namespace
    for (const [key, { cleanup }] of listenerRegistry) {
      if (key.startsWith(`${namespace}:`)) {
        cleanup();
        listenerRegistry.delete(key);
      }
    }
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
    listenerCount: listenerRegistry.size,
  };
};

export const reconnect = (namespace) => {
  const socket = state.connections.get(namespace);
  if (socket) {
    socket.disconnect();
    socket.connect();
  }
};

export const onConnectionEvent = (event, callback) => {
  return eventEmitter.on(event, callback);
};

export const offConnectionEvent = (event, callback) => {
  eventEmitter.off(event, callback);
};

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    state.connections.forEach((socket, namespace) => {
      disconnect(namespace);
    });
  });
}