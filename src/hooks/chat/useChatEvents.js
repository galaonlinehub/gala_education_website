import { MESSAGE_STATUSES } from "@/src/utils/data/message";
import { EVENTS } from "@/src/utils/data/events";
import {
  handleMessageIdUpadate,
  handleMessageStatusBatchUpdate,
  handleMessageStatusUpdate,
  handleNewMessage,
  normalizedMessages,
} from "@/src/utils/fns/chat";
import { useSocketEvent } from "@/src/hooks/sockets/useSocketEvent";
import toast from "react-hot-toast";


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

  // useSocketEvent(namespace, EVENTS.NEW_MESSAGE, (message) => {
  //   handleNewMessage(message, setMessages, setChats);
  // });

  useSocketEvent(namespace, EVENTS.NEW_MESSAGE, (message) => {
  handleNewMessage(message, setMessages, setChats);

  // const isOwnMessage = message.sender_id === user?.id;
  if (true) {
    toast.custom((t) => (
      <div
        className={`max-w-xs bg-white shadow-md rounded-lg p-4 text-sm transition-all ${
          t.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <p className="text-gray-800 font-semibold">
          New message from {message.sender?.name || "Someone"}
        </p>
        <p className="text-gray-600 truncate">{message.content}</p>
      </div>
    ), {
      position: "bottom-right",
      duration: 5000,
    });
  }
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
