import { useEffect, useRef, useState, useMemo } from "react";
import io from "socket.io-client";
import { apiPost, apiGet, apiDelete } from "@/src/services/api_service";
import { useUser } from "./useUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cookieFn } from "../utils/fns/client";
import { USER_COOKIE_KEY } from "../config/settings";
import useChatStore from "../store/chat/chat";
import { message } from "antd";

export const useChat = () => {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const { currentChatId, setCurrentChatId, previewChat, clearPreviewChat } =
    useChatStore();
  const { user } = useUser();
  const [typingUsers, setTypingUsers] = useState([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    socketRef.current = io("http://localhost:4000", {
      query: { user_id: user.id },
      auth: { token: cookieFn.get(USER_COOKIE_KEY) },
    });

    socketRef.current.on("new_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socketRef.current.on("user_typing", ({ user_id }) => {
      setTypingUsers((prev) => {
        if (!prev.includes(user_id)) return [...prev, user_id];
        return prev;
      });
    });

    socketRef.current.on("user_stop_typing", ({ user_id }) => {
      setTypingUsers((prev) => prev.filter((id) => id !== user_id));
    });

    return () => socketRef.current.disconnect();
  }, [user.id]);

  const createOrGetChatMutation = useMutation({
    mutationFn: async (payload) => {
      return await apiPost("/chat/get-or-create", payload);
    },
    onSuccess: (response) => {
      currentChatId === "preview" &&
        queryClient.invalidateQueries([chats, user.id]);
      const chat = response.data.data;
      setCurrentChatId(chat.id);
      socketRef.current.emit("join_chat", chat.id);
    },
    onError: (error) => {
      console.error("Failed to create or get chat:", error);
    },
  });

  const sendMessage = async (content, recipient_id, chat_id) => {
    if (!content.trim()) return;
    try {
      const chatPayload = preparePayLoad(recipient_id, chat_id);
      const chatResponse = await createOrGetChatMutation.mutateAsync(
        chatPayload
      );
      const chatId = chatResponse.data.data.id;
      const message = {
        chat_id: chatId,
        content,
        sender_id: user.id,
        sent_at: new Date().toISOString(),
      };

      socketRef.current.emit("send_message", message);
      clearPreviewChat();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const prepareParticipants = (ids) => {
    return [ids];
  };

  const preparePayLoad = (ids, chat_id) =>
    chat_id
      ? { chat_id }
      : {
          type: "private",
          title: "",
          participant_ids: prepareParticipants(ids),
        };

  // CHATS

  const {} = useQuery({
    queryKey: ["chat", currentChatId],
    queryFn: () => getChat(currentChatId),
    staleTime: Infinity,
    enabled: !!currentChatId,
  });

  const getChat = async (id) => {
    try {
      const res = await apiGet(`/chat/${id}`);
      return res.data;
    } catch (error) {
      console.error("Failed to fetch chat:", error);
    }
  };

  const { data: chat_messages, isFetching: isFetchingChatMessages } = useQuery({
    queryKey: ["chat_messages", currentChatId],
    queryFn: () => getChatMessages(),
    staleTime: Infinity,
    enabled: !!currentChatId,
  });

  const getChatMessages = async () => {
    try {
      const res = await apiGet(`/chat/${currentChatId}/messages`);
      return res.data;
    } catch (error) {}
  };

  const {} = useQuery({
    queryKey: ["chat_participants", currentChatId],
    queryFn: () => getChatParticipants(currentChatId),
    staleTime: Infinity,
    enabled: !!currentChatId,
  });

  const getChatParticipants = async (id) => {
    try {
      const res = await apiGet(`/chat/${id}/participants`);
      return res.data;
    } catch (error) {
      console.error("Failed to fetch chat participants:", error);
    }
  };

  const { data: chats, isFetching: isFetchingChats } = useQuery({
    queryKey: ["chats", user.id],
    queryFn: () => getChats(),
    staleTime: Infinity,
    enabled: true,
  });

  const getChats = async () => {
    try {
      const res = await apiGet(`/chat/chats`);
      return res.data.data;
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    }
  };

  useEffect(() => {
    if (chat_messages) {
      setMessages(chat_messages);
    }
  }, [chat_messages]);

  useEffect(() => {
    useChatStore.getState().initializePreviewChat();
  }, []);

  const combinedChats = useMemo(() => {
    const chatsArray = chats ?? [];
    return previewChat ? [previewChat, ...chatsArray] : chatsArray;
  }, [previewChat, chats]);

  const deleteChatMutation = useMutation({
    mutationFn: () => apiDelete(`/chat/${currentChatId}/delete`),
    onSuccess: () => {
      queryClient.invalidateQueries(["chats", user.id]);
      setCurrentChatId(null);
      message.success("Chat deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting chat:", error);
      message.error("Failed to delete chat");
    },
  });

  //TYPING
  const sendTypingStatus = (isTyping) => {
    if (!currentChatId) return;
    const payload = { chat_id: currentChatId, user_id: user.id };
    socketRef.current.emit(isTyping ? "typing" : "stop_typing", payload);
  };

  return {
    sendMessage,
    createOrGetChatMutation,
    preparePayLoad,

    // CHATS
    chats: combinedChats,
    isFetchingChats,
    deleteChatMutation,

    //TYPING
    sendTypingStatus,
    typingUsers,

    //MESSAGES
    isFetchingChatMessages,
    messages,
  };
};
