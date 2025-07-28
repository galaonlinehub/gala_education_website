import { MESSAGE_STATUSES } from "@/src/utils/data/message";

import { EVENTS } from "../../utils/data/events";
import {
  handleMessageIdUpadate,
  handleMessageStatusBatchUpdate,
  handleMessageStatusUpdate,
  handleNewMessage,
  normalizedMessages,
} from "../../utils/fns/chat";
import { useSocketEvent } from "../sockets/useSocketEvent";

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
  useSocketEvent(namespace, EVENTS.USER_ONLINE, (user_id) => {
    setOnlineUsers((prev) => [...new Set([...prev, user_id])]);
  });

  useSocketEvent(namespace, EVENTS.NEW_MESSAGE, (message) => {
    handleNewMessage(message, setMessages, setChats);
  });

  useSocketEvent(
    namespace,
    EVENTS.MESSAGE_STATUS_BATCH,
    handleMessageStatusBatchUpdate(setMessages, setMessageReceipts)
  );

  useSocketEvent(
    namespace,
    EVENTS.MESSAGE_ID_UPDATE,
    handleMessageIdUpadate(setMessages, setMessageReceipts)
  );

  useSocketEvent(
    namespace,
    EVENTS.MESSAGE_SENT,
    handleMessageStatusUpdate(MESSAGE_STATUSES.SENT, setMessages)
  );

  useSocketEvent(namespace, EVENTS.USER_TYPING, ({ user_id }) => {
    setTypingUsers((prev) =>
      prev.includes(user_id) ? prev : [...prev, user_id]
    );
  });

  useSocketEvent(namespace, EVENTS.USER_STOP_TYPING, ({ user_id }) => {
    setTypingUsers((prev) => prev.filter((id) => id !== user_id));
  });

  useSocketEvent(
    namespace,
    EVENTS.USER_SIDEBAR_TYPING,
    ({ chat_id, user_id }) => {
      setSidebarTyping((prev) => ({
        ...prev,
        [chat_id]: prev[chat_id]?.includes(user_id)
          ? prev[chat_id]
          : [...(prev[chat_id] || []), user_id],
      }));
    }
  );

  useSocketEvent(
    namespace,
    EVENTS.USER_SIDEBAR_STOP_TYPING,
    ({ chat_id, user_id }) => {
      setSidebarTyping((prev) => ({
        ...prev,
        [chat_id]: prev[chat_id]?.filter((id) => id !== user_id) || [],
      }));
    }
  );

  useSocketEvent(
    namespace,
    EVENTS.SIDEBAR_NEW_MESSAGE,
    ({ chat_id, message, unread_count }) => {
      setChats((p) =>
        p.map((c) => (c.id == chat_id ? { ...c, last_message: message } : c))
      );

      setUnreadCounts((prev) => ({ ...prev, [chat_id]: unread_count }));
    }
  );

  useSocketEvent(
    namespace,
    EVENTS.SIDEBAR_UNREAD_RESET,
    ({ chat_id, unread_count }) => {
      setUnreadCounts((prev) => ({ ...prev, [chat_id]: unread_count }));
    }
  );
};
