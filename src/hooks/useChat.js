import { useEffect, useRef, useState, useMemo } from "react";
import io from "socket.io-client";
import { apiPost, apiGet, apiDelete } from "@/src/services/api/api_service";
import { useUser } from "./useUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cookieFn } from "../utils/fns/client";
import { socket_base_url, USER_COOKIE_KEY } from "../config/settings";
import useChatStore from "../store/chat/chat";
import { message } from "antd";
import { decrypt } from "../utils/fns/encryption";
import { EVENTS } from "../utils/data/events";
import { MESSAGE_STATUSES } from "../utils/data/message";
import {
  handleMessageIdUpadate,
  handleMessageStatusBatchUpdate,
  handleMessageStatusUpdate,
  handleNewMessage,
  normalizedMessages,
} from "../utils/fns/chat";
import { format } from "date-fns";

export const useChat = () => {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState({});
  const {
    currentChatId,
    setCurrentChatId,
    previewChat,
    clearPreviewChat,
    setPreviewChat,
  } = useChatStore();
  const { user } = useUser();
  const [typingUsers, setTypingUsers] = useState([]);
  const [messageReceipts, setMessageReceipts] = useState({});
  const [sidebarTyping, setSidebarTyping] = useState({});
  const [unreadCounts, setUnreadCounts] = useState({});
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const queryClient = useQueryClient();
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    if (!user?.id) return;
    const token = decrypt(cookieFn.get(USER_COOKIE_KEY));

    if (!token) {
      console.error("No token available for socket authentication");
      return;
    }

    socketRef.current = io(`${socket_base_url}chat`, {
      query: { user_id: user.id, mode: isDev ? "development" : "" },
      auth: { token },
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    });

    socketRef.current.on(EVENTS.USER_ONLINE, (user_id) => {
      setOnlineUsers((prev) => [...new Set([...prev, user_id])]);
    });

    socketRef.current.on(EVENTS.NEW_MESSAGE, (message) => {
      handleNewMessage(message, setMessages, setChats);
    });

    socketRef.current.on(
      EVENTS.MESSAGE_STATUS_BATCH,
      handleMessageStatusBatchUpdate(setMessages, setMessageReceipts)
    );

    socketRef.current.on(
      EVENTS.MESSAGE_ID_UPDATE,
      handleMessageIdUpadate(setMessages, setMessageReceipts)
    );

    socketRef.current.on(
      EVENTS.MESSAGE_SENT,
      handleMessageStatusUpdate(MESSAGE_STATUSES.SENT, setMessages)
    );

    socketRef.current.on(EVENTS.USER_TYPING, ({ user_id }) => {
      setTypingUsers((prev) =>
        prev.includes(user_id) ? prev : [...prev, user_id]
      );
    });

    socketRef.current.on(EVENTS.USER_STOP_TYPING, ({ user_id }) => {
      setTypingUsers((prev) => prev.filter((id) => id !== user_id));
    });

    socketRef.current.on(EVENTS.USER_SIDEBAR_TYPING, ({ chat_id, user_id }) => {
      setSidebarTyping((prev) => ({
        ...prev,
        [chat_id]: prev[chat_id]?.includes(user_id)
          ? prev[chat_id]
          : [...(prev[chat_id] || []), user_id],
      }));
    });

    socketRef.current.on(
      EVENTS.USER_SIDEBAR_STOP_TYPING,
      ({ chat_id, user_id }) => {
        setSidebarTyping((prev) => ({
          ...prev,
          [chat_id]: prev[chat_id]?.filter((id) => id !== user_id) || [],
        }));
      }
    );

    socketRef.current.on(
      EVENTS.SIDEBAR_NEW_MESSAGE,
      ({ chat_id, message, unread_count }) => {
        setChats((p) =>
          p.map((c) => (c.id == chat_id ? { ...c, last_message: message } : c))
        );

        setUnreadCounts((prev) => ({ ...prev, [chat_id]: unread_count }));
      }
    );

    socketRef.current.on(
      EVENTS.SIDEBAR_UNREAD_RESET,
      ({ chat_id, unread_count }) => {
        setUnreadCounts((prev) => ({ ...prev, [chat_id]: unread_count }));
      }
    );

    socketRef.current.on(EVENTS.USER_OFFLINE, ({ user_id, last_active_at }) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== user_id));
      setChats((prev) =>
        prev.map((chat) => {
          return {
            ...chat,
            participants: chat.participants.map((p) =>
              p.user.id === user_id
                ? {
                    ...p,
                    user: {
                      ...p.user,
                      last_active_at: last_active_at,
                    },
                  }
                : p
            ),
          };
        })
      );
    });

    // return () => {
    //   socketRef.current.close();
    //   console.log("THIS IS ME DISCONNECTING", user.id);
    // };
  }, [isDev, user.id]);

  const createOrGetChatMutation = useMutation({
    mutationFn: async (payload) => apiPost("/chat/get-or-create", payload),
  });

  const getParticipants = (chat) => chat.participants.map((p) => p.user.id);

  const sendMessage = async (content, recipient_id, chat_id) => {
    if (!content.trim()) return;
    try {
      let chatId = chat_id || currentChatId;
      const wasPreview = currentChatId === "preview";

      if (!chatId || chatId === "preview") {
        const chatPayload = preparePayLoad(recipient_id, chat_id);
        const res = await createOrGetChatMutation.mutateAsync(chatPayload);

        const chat = res.data.data;

        setCurrentChatId(chat.id);
        chatId = chat.id;
        setPreviewChat(null);

        setChats((prev) => {
          const updated = [...prev];
          const index = updated.findIndex((c) => c.id === "preview");
          if (index !== -1) updated[index] = chat;
          return updated;
        });

        queryClient.setQueryData(["chats", user.id], (old) => {
          const chats = old ?? [];
          const filtered = chats.filter((c) => c.id !== chatId);
          return [chat, ...filtered];
        });

        const initialChat = {
          chatId: chatId,
          startParticipants: getParticipants(chat),
        };

        socketRef.current.emit("join_chat", initialChat);
      }

      const message = {
        id: new Date().toISOString(),
        chat_id: chatId,
        sender_id: user.id,
        content,
        type: "text",
        sent_at: format(new Date().toISOString(), "HH:mm a").toLowerCase(),
        sent_at_iso: new Date().toISOString(),
        status: MESSAGE_STATUSES.SENDING,
        statuses: [],
      };

      handleNewMessage(message, setMessages, setChats);
      socketRef.current.emit(EVENTS.SEND_MESSAGE, message);
      // setChats((prevChats) => moveChatToTop(chatId, prevChats));

      if (wasPreview) clearPreviewChat();
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

  const { data: chat_messages, isFetching: isFetchingChatMessages } = useQuery({
    queryKey: ["chat_messages", currentChatId],
    queryFn: () => getChatMessages(),
    staleTime: Infinity,
    enabled: !!currentChatId && currentChatId !== "preview",
  });

  const getChatMessages = async () => {
    try {
      const res = await apiGet(`/chat/${currentChatId}/messages`);
      return res.data.data;
    } catch (error) {}
  };

  const { data: apiChats, isFetching: isFetchingChats } = useQuery({
    queryKey: ["chats", user.id],
    queryFn: () => getChats(),
    staleTime: Infinity,
    enabled: true,
  });

  useEffect(() => {
    if (apiChats) {
      setChats(apiChats);
      setUnreadCounts((prev) => ({
        ...prev,
        ...apiChats.reduce((acc, chat) => {
          acc[chat.id] = chat.unread_count;
          return acc;
        }, {}),
      }));

      setOnlineUsers(getOnlineUsersFromChats(apiChats));
    }
  }, [apiChats]);

  console.log(apiChats, "THIS ARE API CHATS");

  const getChats = async () => {
    try {
      const res = await apiGet(`/chat/chats`);
      return res.data.data;
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    }
  };

  useEffect(() => {
    if (chats && socketRef.current) {
      const getChatIds = () => chats.map((c) => c?.id).filter(Boolean);
      socketRef.current.emit("social", getChatIds());
    }
  }, [chats]);

  useEffect(() => {
    if (!chat_messages) {
      setMessages({});
      setMessageReceipts({});
      return;
    }

    const normalized = normalizedMessages(chat_messages);
    setMessages(normalized);

    const initialStatuses = Object.values(normalized).reduce((acc, message) => {
      if (message.statuses?.length > 0) {
        acc[message.id] = message.statuses.reduce((statusAcc, status) => {
          statusAcc[status.user_id] = status.status;
          return statusAcc;
        }, {});
      }
      return acc;
    }, {});
    setMessageReceipts((prev) => ({ ...prev, ...initialStatuses }));
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

  const sendTypingStatus = (isTyping) => {
    if (!currentChatId || currentChatId === "preview") return;
    const payload = { chat_id: currentChatId, user_id: user.id };
    socketRef.current.emit(isTyping ? "typing" : "stop_typing", payload);
  };

  const markMessageAsRead = (unread_messages) => {
    const payload = unreadMessageData(unread_messages);
    if (currentChatId && currentChatId !== "preview") {
      socketRef.current.emit("message_read", payload);
    }
  };

  const unreadMessageData = (unread_messages) => ({
    user_id: user.id,
    chat_id: currentChatId,
    messages: unread_messages.map((m) => ({
      message_id: m.id,
      sender_id: m.sender_id,
    })),
  });

  const getOnlineUsersFromChats = (chats) => {
    if (!chats || !Array.isArray(chats)) return [];
    console.log("Getting online users from chats", chats);
    return [
      ...new Set(
        chats.flatMap((c) =>
          c.participants
            .filter((p) => p.user?.status === "online")
            .map((p) => p.user.id)
        )
      ),
    ];
  };

  return {
    sendMessage,
    createOrGetChatMutation,
    preparePayLoad,
    chats: combinedChats,
    isFetchingChats,
    deleteChatMutation,
    sendTypingStatus,
    typingUsers,
    sidebarTyping,
    unreadCounts,
    isFetchingChatMessages,
    messages,
    messageReceipts,
    markMessageAsRead,
    onlineUsers,
  };
};
