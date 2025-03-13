import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { apiPost, apiGet } from "@/src/services/api_service";
import { useUser } from "./useUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { cookieFn, sessionStorageFn } from "../utils/fns/client";
import { PREVIEW_CHAT_KEY, USER_COOKIE_KEY } from "../config/settings";
import useChatStore from "../store/chat/chat";
import { decrypt } from "@/src/utils/fns/encryption";

export const useChat = () => {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const { currentChatId, setCurrentChatId } = useChatStore();
  const { user } = useUser();
  const [previewChat, setPreviewChat] = useState(null);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    socketRef.current = io("http://localhost:4000", {
      query: { user_id: user.id },
      auth: { token: cookieFn.get(USER_COOKIE_KEY) },
    });

    socketRef.current.on("new_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socketRef.current.on("user_typing", ({ user_id }) => {
      console.log(`User ${user_id} is typing in chat ${currentChatId}`);
      setTypingUsers((prev) => {
        if (!prev.includes(user_id)) return [...prev, user_id];
        return prev;
      });
    });

    socketRef.current.on("user_stop_typing", ({ user_id }) => {
      console.log(`User ${user_id} stopped typing in chat ${currentChatId}`);
      setTypingUsers((prev) => prev.filter((id) => id !== user_id));
    });

    return () => socketRef.current.disconnect();
  }, [currentChatId, user.id]);

  const createOrGetChatMutation = useMutation({
    mutationFn: async (payload) => {
      return await apiPost("/chat/get-or-create", payload);
    },
    onSuccess: (response) => {
      const chat = response.data.data; // Fixed from response.data.data
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
      const chatResponse = await createOrGetChatMutation.mutateAsync(chatPayload);
      const chatId = chatResponse.data.data.id; // Fixed from chatResponse.data.data.id
      console.log("THIS IS THE CHAT ID", chatId);
      const message = {
        chat_id: chatId,
        content,
        sender_id: user.id,
        sent_at: new Date().toISOString(),
      };

      console.log("THIS IS THE MESSAGE TO EMIT", message);
      socketRef.current.emit("send_message", message);

      sessionStorageFn.remove(PREVIEW_CHAT_KEY);
      setCurrentChatId(chatId);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const prepareParticipants = (ids) => [ids];

  const preparePayLoad = (ids, chat_id) =>
    chat_id
      ? { chat_id }
      : {
          type: "private",
          title: "",
          participant_ids: prepareParticipants(ids),
        };

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
    } catch (error) {
      console.error("Failed to fetch chat messages:", error);
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
    const getPreviewChat = () => decrypt(sessionStorageFn.get(PREVIEW_CHAT_KEY));
    const preview = getPreviewChat();

    if (preview) {
      const previewChatData = {
        id: "preview",
        title: null,
        participants: [
          {
            id: preview.recepient_id,
            user: {
              id: preview.recepient_id,
              first_name: preview.first_name,
              last_name: preview.last_name,
              profile_picture: null,
            },
          },
        ],
      };
      setPreviewChat(previewChatData);
    }
  }, []);

  const combinedChats = previewChat
    ? [previewChat, ...(chats ?? [])]
    : chats ?? [];

  const sendTypingStatus = (isTyping) => {
    if (!currentChatId) return;
    const payload = { chat_id: currentChatId, user_id: user.id };
    console.log(`Emitting ${isTyping ? "typing" : "stop_typing"}`, payload);
    socketRef.current.emit(isTyping ? "typing" : "stop_typing", payload);
  };

  return {
    sendMessage,
    messages,
    createOrGetChatMutation,
    preparePayLoad,
    chats: combinedChats,
    isFetchingChats,
    sendTypingStatus,
    typingUsers,
  };
};