// src/hooks/chat/useChatSocketEvents.js
import { useEffect, useCallback, useRef } from "react";
import { MESSAGE_STATUSES } from "@/src/utils/data/message";
import { EVENTS } from "@/src/utils/data/events";
import {
  handleMessageIdUpadate,
  handleMessageStatusBatchUpdate,
  handleMessageStatusUpdate,
  handleNewMessage,
} from "@/src/utils/fns/chat";
import { useSocketEvent } from "@/src/hooks/sockets/useSocketEvent";
import { showMessageToast } from "@/src/utils/fns/notification";
import { useSound } from "../misc/useSound";

export const useChatSocketEvents = (
  namespace,
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
    (...args) => handleMessageIdUpadate(setMessages, setMessageReceipts)(...args),
    [setMessages, setMessageReceipts]
  );

  const handleBatchUpdate = useCallback(
    (data) => {
      console.log(`BATCH handled [Instance ${instanceId.current}]`, data);
      if (Array.isArray(data)) {
        data.forEach((batch) =>
          handleMessageStatusBatchUpdate(setMessages, setMessageReceipts)(batch)
        );
      } else {
        handleMessageStatusBatchUpdate(setMessages, setMessageReceipts)(data);
      }
    },
    [setMessages, setMessageReceipts]
  );

  const sentStatusHandler = useCallback(
    (data) => {
      console.log(`MESSAGE_SENT handled [Instance ${instanceId.current}]`, data);
      handleMessageStatusUpdate(MESSAGE_STATUSES.SENT, setMessages)(data);
    },
    [setMessages]
  );

  const handleUserOnline = useCallback(
    (user_id) => {
      setOnlineUsers((prev) => [...new Set([...prev, user_id])]);
    },
    [setOnlineUsers]
  );

  const handleMessage = useCallback(
    (message) => {
      showMessageToast(message, { onPlaySound: play });
      handleNewMessage(message, setMessages, setChats);
    },
    [play, setMessages, setChats]
  );

  const handleUserTyping = useCallback(
    ({ user_id }) => {
      setTypingUsers((prev) =>
        prev.includes(user_id) ? prev : [...prev, user_id]
      );
    },
    [setTypingUsers]
  );

  const handleUserStopTyping = useCallback(
    ({ user_id }) => {
      setTypingUsers((prev) => prev.filter((id) => id !== user_id));
    },
    [setTypingUsers]
  );

  const handleSidebarTyping = useCallback(
    ({ chat_id, user_id }) => {
      setSidebarTyping((prev) => ({
        ...prev,
        [chat_id]: prev[chat_id]?.includes(user_id)
          ? prev[chat_id]
          : [...(prev[chat_id] || []), user_id],
      }));
    },
    [setSidebarTyping]
  );

  const handleSidebarStopTyping = useCallback(
    ({ chat_id, user_id }) => {
      setSidebarTyping((prev) => ({
        ...prev,
        [chat_id]: prev[chat_id]?.filter((id) => id !== user_id) || [],
      }));
    },
    [setSidebarTyping]
  );

  const handleSidebarNewMessage = useCallback(
    ({ chat_id, message, unread_count }) => {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chat_id ? { ...chat, last_message: message } : chat
        )
      );
      setUnreadCounts((prev) => ({ ...prev, [chat_id]: unread_count }));
    },
    [setChats, setUnreadCounts]
  );

  const handleSidebarUnreadReset = useCallback(
    ({ chat_id, unread_count }) => {
      setUnreadCounts((prev) => ({ ...prev, [chat_id]: unread_count }));
    },
    [setUnreadCounts]
  );

  // Register socket events at the top level
  const cleanupUserOnline = useSocketEvent(namespace, EVENTS.USER_ONLINE, handleUserOnline);
  const cleanupNewMessage = useSocketEvent(namespace, EVENTS.NEW_MESSAGE, handleMessage);
  const cleanupBatchUpdate = useSocketEvent(namespace, EVENTS.MESSAGE_STATUS_BATCH, handleBatchUpdate);
  const cleanupMessageIdUpdate = useSocketEvent(namespace, EVENTS.MESSAGE_ID_UPDATE, _handleMessageIdUpdate);
  const cleanupMessageSent = useSocketEvent(namespace, EVENTS.MESSAGE_SENT, sentStatusHandler);
  const cleanupUserTyping = useSocketEvent(namespace, EVENTS.USER_TYPING, handleUserTyping);
  const cleanupUserStopTyping = useSocketEvent(namespace, EVENTS.USER_STOP_TYPING, handleUserStopTyping);
  const cleanupSidebarTyping = useSocketEvent(namespace, EVENTS.USER_SIDEBAR_TYPING, handleSidebarTyping);
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
    if (isInitialized.current) return;

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