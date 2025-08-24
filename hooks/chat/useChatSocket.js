import { useChatSocketEvents } from "@/src/hooks/chat/useChatSocketEvents";
import useChatStore from "@/src/store/chat/chatStore";

export const useChatSocket = (namespace, connections) => {
  const {
    setOnlineUsers,
    setMessages,
    setChats,
    setTypingUsers,
    setMessageReceipts,
    setSidebarTyping,
    setUnreadCounts,
  } = useChatStore();

  useChatSocketEvents(namespace, connections, {
    setOnlineUsers,
    setMessages,
    setChats,
    setTypingUsers,
    setMessageReceipts,
    setSidebarTyping,
    setUnreadCounts,
  });
};