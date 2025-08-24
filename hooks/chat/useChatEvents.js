import { MESSAGE_STATUSES } from "@/utils/data/message";
import {
  handleMessageIdUpadate,
  handleMessageStatusBatchUpdate,
  handleMessageStatusUpdate,
  handleNewMessage,
} from "@/utils/fns/chat";
import { showMessageToast } from "@/utils/fns/notification";

import { EVENTS } from "../../utils/data/events";
import { useSound } from "../misc/useSound";
import { useSocketEvent } from "../sockets/useSocketEvent";

export const useChatSocketEvents = (
  namespace,
  connections,
  {
    setOnlineUsers,
    setMessages,
    setChats,
    setTypingUsers,
    setMessageReceipts,
    setSidebarTyping,
    setUnreadCounts,
  }
) => {
  const { play } = useSound("/sounds/audio-1.wav");
  const isInitialized = useRef(false);
  const instanceId = useRef(Math.random().toString(36).substring(2, 9));

  const _handleMessageIdUpdate = useCallback(
    (...args) => {
      if (!connections?.chat?.connected) {
        console.warn(
          `Cannot handle MESSAGE_ID_UPDATE: Socket for namespace ${namespace} not connected`
        );
        return;
      }
      handleMessageIdUpadate(setMessages, setMessageReceipts)(...args);
    },
    [namespace, connections?.chat?.connected, setMessages, setMessageReceipts]
  );

  const handleBatchUpdate = useCallback(
    (data) => {
      if (!connections?.chat?.connected) {
        console.warn(
          `Cannot handle MESSAGE_STATUS_BATCH: Socket for namespace ${namespace} not connected`
        );
        return;
      }
      console.log(`BATCH handled [Instance ${instanceId.current}]`, data);
      if (Array.isArray(data)) {
        data.forEach((batch) =>
          handleMessageStatusBatchUpdate(setMessages, setMessageReceipts)(batch)
        );
      } else {
        handleMessageStatusBatchUpdate(setMessages, setMessageReceipts)(data);
      }
    },
    [namespace, connections?.chat?.connected, setMessages, setMessageReceipts]
  );

  const sentStatusHandler = useCallback(
    (data) => {
      if (!connections?.chat?.connected) {
        console.warn(
          `Cannot handle MESSAGE_SENT: Socket for namespace ${namespace} not connected`
        );
        return;
      }
      console.log(
        `MESSAGE_SENT handled [Instance ${instanceId.current}]`,
        data
      );
      handleMessageStatusUpdate(MESSAGE_STATUSES.SENT, setMessages)(data);
    },
    [namespace, connections?.chat?.connected, setMessages]
  );

  const handleUserOnline = useCallback(
    (user_id) => {
      if (!connections?.chat?.connected) {
        console.warn(
          `Cannot handle USER_ONLINE: Socket for namespace ${namespace} not connected`
        );
        return;
      }
      setOnlineUsers((prev) => [...new Set([...prev, user_id])]);
    },
    [namespace, connections?.chat?.connected, setOnlineUsers]
  );

  const handleMessage = useCallback(
    (message) => {
      if (!connections?.chat?.connected) {
        console.warn(
          `Cannot handle NEW_MESSAGE: Socket for namespace ${namespace} not connected`
        );
        return;
      }
      showMessageToast(message, { onPlaySound: play });
      handleNewMessage(message, setMessages, setChats);
    },
    [namespace, connections?.chat?.connected, play, setMessages, setChats]
  );

  const handleUserTyping = useCallback(
    ({ user_id }) => {
      if (!connections?.chat?.connected) {
        console.warn(
          `Cannot handle USER_TYPING: Socket for namespace ${namespace} not connected`
        );
        return;
      }
      setTypingUsers((prev) =>
        prev.includes(user_id) ? prev : [...prev, user_id]
      );
    },
    [namespace, connections?.chat?.connected, setTypingUsers]
  );

  const handleUserStopTyping = useCallback(
    ({ user_id }) => {
      if (!connections?.chat?.connected) {
        console.warn(
          `Cannot handle USER_STOP_TYPING: Socket for namespace ${namespace} not connected`
        );
        return;
      }
      setTypingUsers((prev) => prev.filter((id) => id !== user_id));
    },
    [namespace, connections?.chat?.connected, setTypingUsers]
  );

  const handleSidebarTyping = useCallback(
    ({ chat_id, user_id }) => {
      if (!connections?.chat?.connected) {
        console.warn(
          `Cannot handle USER_SIDEBAR_TYPING: Socket for namespace ${namespace} not connected`
        );
        return;
      }
      setSidebarTyping((prev) => ({
        ...prev,
        [chat_id]: prev[chat_id]?.includes(user_id)
          ? prev[chat_id]
          : [...(prev[chat_id] || []), user_id],
      }));
    },
    [namespace, connections?.chat?.connected, setSidebarTyping]
  );

  const handleSidebarStopTyping = useCallback(
    ({ chat_id, user_id }) => {
      if (!connections?.chat?.connected) {
        console.warn(
          `Cannot handle USER_SIDEBAR_STOP_TYPING: Socket for namespace ${namespace} not connected`
        );
        return;
      }
      setSidebarTyping((prev) => ({
        ...prev,
        [chat_id]: prev[chat_id]?.filter((id) => id !== user_id) || [],
      }));
    },
    [namespace, connections?.chat?.connected, setSidebarTyping]
  );

  const handleSidebarNewMessage = useCallback(
    ({ chat_id, message, unread_count }) => {
      if (!connections?.chat?.connected) {
        console.warn(
          `Cannot handle SIDEBAR_NEW_MESSAGE: Socket for namespace ${namespace} not connected`
        );
        return;
      }
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chat_id ? { ...chat, last_message: message } : chat
        )
      );
      setUnreadCounts((prev) => ({ ...prev, [chat_id]: unread_count }));
    },
    [namespace, connections?.chat?.connected, setChats, setUnreadCounts]
  );

  const handleSidebarUnreadReset = useCallback(
    ({ chat_id, unread_count }) => {
      if (!connections?.chat?.connected) {
        console.warn(
          `Cannot handle SIDEBAR_UNREAD_RESET: Socket for namespace ${namespace} not connected`
        );
        return;
      }
      setUnreadCounts((prev) => ({ ...prev, [chat_id]: unread_count }));
    },
    [namespace, connections?.chat?.connected, setUnreadCounts]
  );

  // Register socket events at the top level
  const cleanupUserOnline = useSocketEvent(
    namespace,
    EVENTS.USER_ONLINE,
    handleUserOnline
  );
  const cleanupNewMessage = useSocketEvent(
    namespace,
    EVENTS.NEW_MESSAGE,
    handleMessage
  );
  const cleanupBatchUpdate = useSocketEvent(
    namespace,
    EVENTS.MESSAGE_STATUS_BATCH,
    handleBatchUpdate
  );
  const cleanupMessageIdUpdate = useSocketEvent(
    namespace,
    EVENTS.MESSAGE_ID_UPDATE,
    _handleMessageIdUpdate
  );
  const cleanupMessageSent = useSocketEvent(
    namespace,
    EVENTS.MESSAGE_SENT,
    sentStatusHandler
  );
  const cleanupUserTyping = useSocketEvent(
    namespace,
    EVENTS.USER_TYPING,
    handleUserTyping
  );
  const cleanupUserStopTyping = useSocketEvent(
    namespace,
    EVENTS.USER_STOP_TYPING,
    handleUserStopTyping
  );
  const cleanupSidebarTyping = useSocketEvent(
    namespace,
    EVENTS.USER_SIDEBAR_TYPING,
    handleSidebarTyping
  );
  const cleanupSidebarStopTyping = useSocketEvent(
    namespace,
    EVENTS.USER_SIDEBAR_STOP_TYPING,
    handleSidebarStopTyping
  );
  const cleanupSidebarNewMessage = useSocketEvent(
    namespace,
    EVENTS.SIDEBAR_NEW_MESSAGE,
    handleSidebarNewMessage
  );
  const cleanupSidebarUnreadReset = useSocketEvent(
    namespace,
    EVENTS.SIDEBAR_UNREAD_RESET,
    handleSidebarUnreadReset
  );

  useEffect(() => {
    if (isInitialized.current || !connections?.chat?.connected) {
      if (!connections?.chat?.connected) {
        console.warn(
          `Skipping socket event registration: Socket for namespace ${namespace} not connected`
        );
      }
      return;
    }

    const localInstanceId = instanceId.current;

    console.log(
      `Registering socket events for namespace: ${namespace} [Instance ${localInstanceId}]`
    );
    isInitialized.current = true;

    return () => {
      console.log(
        `Cleaning up socket events for namespace: ${namespace} [Instance ${localInstanceId}]`
      );
      isInitialized.current = false;
      cleanupUserOnline();
      cleanupNewMessage();
      cleanupBatchUpdate();
      cleanupMessageIdUpdate();
      cleanupMessageSent();
      cleanupUserTyping();
      cleanupUserStopTyping();
      cleanupSidebarTyping();
      cleanupSidebarStopTyping();
      cleanupSidebarNewMessage();
      cleanupSidebarUnreadReset();
    };
  }, [
    namespace,
    connections?.chat?.connected,
    cleanupUserOnline,
    cleanupNewMessage,
    cleanupBatchUpdate,
    cleanupMessageIdUpdate,
    cleanupMessageSent,
    cleanupUserTyping,
    cleanupUserStopTyping,
    cleanupSidebarTyping,
    cleanupSidebarStopTyping,
    cleanupSidebarNewMessage,
    cleanupSidebarUnreadReset,
  ]);
};
