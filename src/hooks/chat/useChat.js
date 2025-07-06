// src/hooks/chat/useChat.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../data/useUser";
import { apiGet, apiDelete } from "@/src/services/api/api_service";
import { message } from "antd";
import { useSocketEmit } from "../sockets/useSocketEmit";
import { useEffect, useMemo } from "react";
import { getMetrics } from "@/src/services/socket/socket-api";
import { normalizedMessages } from "../../utils/fns/chat";
import useChatStore from "@/src/store/chat/chat";

export const useChat = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const namespace = "chat";
  const { emit } = useSocketEmit(namespace);
  const {
    currentChatId,
    setCurrentChatId,
    previewChat,
    setPreviewChat,
    clearPreviewChat,
    chats,
    messages,
    typingUsers,
    messageReceipts,
    sidebarTyping,
    unreadCounts,
    onlineUsers,
    sendMessage,
    getChats,
    getChatMessages,
    deleteChat,
    sendTypingStatus,
    markMessageAsRead,
    emitSocialEvent,
    getOnlineUsersFromChats,
    setMessages,
    setChats,
    setUnreadCounts,
    setOnlineUsers,
    setMessageReceipts,
  } = useChatStore();

  const chatsQuery = useQuery({
    queryKey: ["chats", user?.id],
    queryFn: getChats,
    staleTime: Infinity,
    enabled: !!user,
  });

  const messagesQuery = useQuery({
    queryKey: ["chat_messages", currentChatId],
    queryFn: () => getChatMessages(currentChatId),
    staleTime: Infinity,
    enabled: !!currentChatId && currentChatId !== "preview",
  });

  const deleteChatMutation = useMutation({
    mutationFn: () => deleteChat(currentChatId),
    onSuccess: () => {
      queryClient.invalidateQueries(["chats", user?.id]);
      setCurrentChatId(null);
      message.success("Chat deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting chat:", error);
      message.error("Failed to delete chat");
    },
  });

  useEffect(() => {
    if (chatsQuery.data) {
      setChats(chatsQuery.data);
      setUnreadCounts((prev) => ({
        ...prev,
        ...chatsQuery.data.reduce((acc, chat) => {
          acc[chat.id] = chat.unread_count;
          return acc;
        }, {}),
      }));
      setOnlineUsers(getOnlineUsersFromChats(chatsQuery.data));
    }
  }, [
    chatsQuery.data,
    setChats,
    setUnreadCounts,
    setOnlineUsers,
    getOnlineUsersFromChats,
  ]);

  useEffect(() => {
    if (messagesQuery.data) {
      const normalized = normalizedMessages(messagesQuery.data);
      setMessages(normalized);
      const initialStatuses = Object.values(normalized).reduce(
        (acc, message) => {
          if (message.statuses?.length > 0) {
            acc[message.id] = message.statuses.reduce((statusAcc, status) => {
              statusAcc[status.user_id] = status.status;
              return statusAcc;
            }, {});
          }
          return acc;
        },
        {}
      );
      setMessageReceipts((prev) => ({ ...prev, ...initialStatuses }));
    } else if (!currentChatId || currentChatId === "preview") {
      setMessages({});
      setMessageReceipts({});
    }
  }, [messagesQuery.data, currentChatId, setMessages, setMessageReceipts]);

  useEffect(() => {
    useChatStore.getState().initializePreviewChat();
  }, []);

  useEffect(() => {
    if (!chats || !user) return;
    const chatIds = chats.map((c) => c?.id).filter(Boolean);
    emitSocialEvent(chatIds);
  }, [chats, user, emitSocialEvent]);

  useEffect(() => {
    const interval = setInterval(() => {
      const metrics = getMetrics();
      console.log("Socket Metrics:", metrics);
    }, 5000); // Log every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const combinedChats = useMemo(() => {
    const chatsArray = chatsQuery.data || chats;
    return previewChat ? [previewChat, ...chatsArray] : chatsArray;
  }, [previewChat, chats, chatsQuery.data]);

  return {
    chats: combinedChats,
    isFetchingChats: chatsQuery.isLoading,
    isFetchingChatMessages: messagesQuery.isLoading,
    messages,
    typingUsers,
    messageReceipts,
    sidebarTyping,
    unreadCounts,
    onlineUsers,
    sendMessage: (content, recipientId, chatId) =>
      sendMessage(content, recipientId, chatId, user, emit, {
        chat: {
          connected:
            user && getMetrics().connectionStates[namespace] === "connected",
        },
      }),
    sendTypingStatus: (isTyping) =>
      sendTypingStatus(
        isTyping,
        user,
        {
          chat: {
            connected:
              user && getMetrics().connectionStates[namespace] === "connected",
          },
        },
        emit
      ),
    markMessageAsRead: (unreadMessages) =>
      markMessageAsRead(
        unreadMessages,
        user,
        {
          chat: {
            connected:
              user && getMetrics().connectionStates[namespace] === "connected",
          },
        },
        emit
      ),
    deleteChatMutation,
  };
};
