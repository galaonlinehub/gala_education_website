import { io } from "socket.io-client";

import { socket_base_url } from "@/config/settings";

export const state = {
  connections: new Map(),
  messageQueues: new Map(),
  connectionStates: new Map(),
  eventListeners: new Map(),
  metrics: {
    totalConnections: 0,
    activeConnections: 0,
    messagesQueued: 0,
    messagesSent: 0,
    reconnectAttempts: 0,
    errors: 0,
  },
  circuitBreaker: {
    failures: 0,
    threshold: 5,
    timeout: 30000,
    state: "CLOSED",
  },
};

export const createEventEmitter = () => {
  const listeners = new Map();

  return {
    on: (event, callback) => {
      if (!listeners.has(event)) {
        listeners.set(event, new Set());
      }
      listeners.get(event).add(callback);

      // Return cleanup function
      return () => {
        const eventListeners = listeners.get(event);
        if (eventListeners) {
          eventListeners.delete(callback);
          if (eventListeners.size === 0) {
            listeners.delete(event);
          }
        }
      };
    },

    emit: (event, data) => {
      const eventListeners = listeners.get(event);
      if (eventListeners) {
        eventListeners.forEach((callback) => {
          try {
            callback(data);
          } catch (error) {
            console.error(`Error in event listener for ${event}:`, error);
          }
        });
      }
    },

    off: (event, callback) => {
      const eventListeners = listeners.get(event);
      if (eventListeners) {
        eventListeners.delete(callback);
      }
    },
  };
};

// Create global event emitter
export const eventEmitter = createEventEmitter();

// Core socket functions
export const createConnection = (namespace = "default", options = {}) => {
  if (typeof window === "undefined") return null;

  const socketOptions = {
    transports: ["websocket", "polling"],
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    autoConnect: true,
    ...options,
  };

  const socket = io(`${socket_base_url}${namespace}`, socketOptions);

  // Setup handlers using functional approach
  setupConnectionHandlers(socket, namespace);

  // Update state
  state.connections.set(namespace, socket);
  state.messageQueues.set(namespace, []);
  state.connectionStates.set(namespace, "connecting");
  state.metrics.totalConnections++;

  return socket;
};

export const setupConnectionHandlers = (socket, namespace) => {
  const handlers = {
    connect: () => {
      state.connectionStates.set(namespace, "connected");
      state.metrics.activeConnections++;
      state.circuitBreaker.failures = 0;

      processQueuedMessages(namespace);
      eventEmitter.emit("connection:connected", {
        namespace,
        socketId: socket.id,
      });
      console.log(`✅ Socket connected [${namespace}]:`, socket.id);
    },

    disconnect: (reason) => {
      state.connectionStates.set(namespace, "disconnected");
      state.metrics.activeConnections = Math.max(
        0,
        state.metrics.activeConnections - 1
      );

      eventEmitter.emit("connection:disconnected", { namespace, reason });
      console.log(`❌ Socket disconnected [${namespace}]:`, reason);
    },

    connect_error: (error) => {
      state.connectionStates.set(namespace, "error");
      state.metrics.reconnectAttempts++;
      state.metrics.errors++;

      // Circuit breaker logic
      state.circuitBreaker.failures++;
      if (state.circuitBreaker.failures >= state.circuitBreaker.threshold) {
        state.circuitBreaker.state = "OPEN";
        setTimeout(() => {
          state.circuitBreaker.state = "HALF_OPEN";
        }, state.circuitBreaker.timeout);
      }

      eventEmitter.emit("connection:error", { namespace, error });
      console.error(`❌ Socket connection error [${namespace}]:`, error);
    },

    reconnect: (attemptNumber) => {
      eventEmitter.emit("connection:reconnected", { namespace, attemptNumber });
      console.log(
        `🔄 Socket reconnected [${namespace}] after ${attemptNumber} attempts`
      );
    },
  };

  // Attach handlers
  Object.entries(handlers).forEach(([event, handler]) => {
    socket.on(event, handler);
  });
};

export const processQueuedMessages = (namespace) => {
  const queue = state.messageQueues.get(namespace) || [];
  const socket = state.connections.get(namespace);

  if (!socket || queue.length === 0) return;

  const processed = [];
  const failed = [];

  queue.forEach((message) => {
    try {
      socket.emit(message.event, message.data);
      processed.push(message);
      state.metrics.messagesSent++;
    } catch (error) {
      message.retries = (message.retries || 0) + 1;
      if (message.retries < 3) {
        failed.push(message);
      }
      console.error("Failed to process queued message:", error);
    }
  });

  state.messageQueues.set(namespace, failed);
  state.metrics.messagesQueued = Math.max(
    0,
    state.metrics.messagesQueued - processed.length
  );
};

export const queueMessage = (namespace, event, data, priority = "normal") => {
  const queue = state.messageQueues.get(namespace) || [];
  const message = {
    event,
    data,
    priority,
    timestamp: Date.now(),
    retries: 0,
  };

  if (priority === "high") {
    queue.unshift(message);
  } else {
    queue.push(message);
  }

  state.messageQueues.set(namespace, queue);
  state.metrics.messagesQueued++;
};
