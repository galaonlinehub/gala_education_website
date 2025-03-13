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
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const { currentChatId, setCurrentChatId } = useChatStore();
  const { user } = useUser();
  const [previewChat, setPreviewChat] = useState(null);
  

  useEffect(() => {
    socketRef.current = io("http://localhost:4000", {
      query: { user_id: user.id },
      auth: { token: cookieFn.get(USER_COOKIE_KEY) },
    });

    socketRef.current.on("new_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socketRef.current.disconnect();
  }, [user.id]);

  const createOrGetChatMutation = useMutation({
    mutationFn: async (payload) => {
      return await apiPost("/chat/get-or-create", payload);
    },
    onSuccess: (data) => {
      setActiveChatId(data.data.data.id);
      socketRef.current.emit("join_chat", data.data.data.id);
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

      sessionStorageFn.remove(PREVIEW_CHAT_KEY);
      setCurrentChatId(chatId);
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
          title: "Direct Chat",
          participant_ids: prepareParticipants(ids),
        };

  // CHARTS

  const {} = useQuery({
    queryKey: ["chat", activeChatId],
    queryFn: () => getChat(activeChatId),
    staleTime: Infinity,
    enabled: !!activeChatId,
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
    queryKey: ["chat_participants", activeChatId],
    queryFn: () => getChatParticipants(activeChatId),
    staleTime: Infinity,
    enabled: !!activeChatId,
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
      const getPreviewChat = () =>
        decrypt(sessionStorageFn.get(PREVIEW_CHAT_KEY));
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

  return {
    sendMessage,
    activeChatId,
    messages,
    createOrGetChatMutation,
    preparePayLoad,

    // CHATS
    chats: combinedChats,
    isFetchingChats,
  };
};
