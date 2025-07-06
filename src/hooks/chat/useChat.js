// import { useEffect, useCallback, useState, useMemo } from "react";
// import { apiPost, apiGet, apiDelete } from "@/src/services/api/api_service";
// import { useUser } from "../data/useUser";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import useChatStore from "../../store/chat/chat";
// import { message } from "antd";
// import { EVENTS } from "../../utils/data/events";
// import { MESSAGE_STATUSES } from "../../utils/data/message";
// import { handleNewMessage, normalizedMessages } from "../../utils/fns/chat";
// import { format } from "date-fns";
// import { useSocketConnection } from "../sockets/useSocketConnection";
// import { useChatSocketEvents } from "./useChatEvents";
// import { useSocketEmit } from "../sockets/useSocketEmit";

// export const useChat = () => {
//   const [messages, _setMessages] = useState({});
//   const {
//     currentChatId,
//     setCurrentChatId,
//     previewChat,
//     clearPreviewChat,
//     setPreviewChat,
//   } = useChatStore();
//   const { user } = useUser();
//   const [typingUsers, setTypingUsers] = useState([]);
//   const [messageReceipts, _setMessageReceipts] = useState({});
//   const [sidebarTyping, setSidebarTyping] = useState({});
//   const [unreadCounts, setUnreadCounts] = useState({});
//   const [chats, setChats] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);

//   const queryClient = useQueryClient();
//   const namespace = "chat";

//   const {
//     isConnected,
//     socketId,
//     state: connectionState,
//   } = useSocketConnection({
//     namespace: "chat",
//     initialize: false,
//   });

//   const { emit } = useSocketEmit(namespace);

//   const setMessages = useCallback((updater) => {
//     _setMessages((prev) =>
//       typeof updater === "function" ? updater(prev) : updater
//     );
//   }, []);

//   const setMessageReceipts = useCallback((updater) => {
//     _setMessageReceipts((prev) =>
//       typeof updater === "function" ? updater(prev) : updater
//     );
//   }, []);

//   useChatSocketEvents(namespace, {
//     setOnlineUsers,
//     setMessages,
//     setChats,
//     setTypingUsers,
//     setMessageReceipts,
//     setSidebarTyping,
//     setUnreadCounts,
//   });

//   const createOrGetChatMutation = useMutation({
//     mutationFn: async (payload) => apiPost("/chat/get-or-create", payload),
//   });

//   const getParticipants = (chat) => chat.participants.map((p) => p.user?.id);

//   const sendMessage = async (content, recipient_id, chat_id) => {
//     if (!content.trim()) return;
//     try {
//       let chatId = chat_id || currentChatId;
//       const wasPreview = currentChatId === "preview";

//       if (!chatId || chatId === "preview") {
//         const chatPayload = preparePayLoad(recipient_id, chat_id);
//         const res = await createOrGetChatMutation.mutateAsync(chatPayload);

//         const chat = res.data.data;

//         setCurrentChatId(chat.id);
//         chatId = chat.id;
//         setPreviewChat(null);

//         setChats((prev) => {
//           const updated = [...prev];
//           const index = updated.findIndex((c) => c.id === "preview");
//           if (index !== -1) updated[index] = chat;
//           return updated;
//         });

//         queryClient.setQueryData(["chats", user?.id], (old) => {
//           const chats = old ?? [];
//           const filtered = chats.filter((c) => c.id !== chatId);
//           return [chat, ...filtered];
//         });

//         const initialChat = {
//           chatId: chatId,
//           startParticipants: getParticipants(chat),
//         };

//         // socketRef.current.emit(EVENTS.JOIN_CHAT, initialChat);
//         if (!isConnected) {
//           console.warn("No connection. Join chat will be queued.");
//         }
//         const joinSuccess = await emit(EVENTS.JOIN_CHAT, initialChat);
//         if (!joinSuccess) {
//           console.warn("Failed to join chat, action queued.");
//         }
//       }

//       const message = {
//         id: new Date().toISOString(),
//         chat_id: chatId,
//         sender_id: user?.id,
//         content,
//         type: "text",
//         sent_at: format(new Date().toISOString(), "HH:mm a").toLowerCase(),
//         sent_at_iso: new Date().toISOString(),
//         status: MESSAGE_STATUSES.SENDING,
//         statuses: [],
//       };

//       handleNewMessage(message, setMessages, setChats);
//       // socketRef.current.emit(EVENTS.SEND_MESSAGE, message);
//       const sendSuccess = await emit(EVENTS.SEND_MESSAGE, message, {
//         priority: "high",
//       });

//       if (wasPreview) clearPreviewChat();
//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//   };

//   const prepareParticipants = (ids) => [ids];
//   const preparePayLoad = (ids, chat_id) =>
//     chat_id
//       ? { chat_id }
//       : {
//           type: "private",
//           title: "",
//           participant_ids: prepareParticipants(ids),
//         };

//   const { data: chat_messages, isFetching: isFetchingChatMessages } = useQuery({
//     queryKey: ["chat_messages", currentChatId],
//     queryFn: () => getChatMessages(),
//     staleTime: Infinity,
//     enabled: !!currentChatId && currentChatId !== "preview",
//   });

//   const getChatMessages = async () => {
//     try {
//       const res = await apiGet(`/chat/${currentChatId}/messages`);
//       return res.data.data;
//     } catch (error) {}
//   };

//   const { data: apiChats, isFetching: isFetchingChats } = useQuery({
//     queryKey: ["chats", user?.id],
//     queryFn: () => getChats(),
//     staleTime: Infinity,
//     enabled: true,
//   });

//   useEffect(() => {
//     if (apiChats) {
//       setChats(apiChats);
//       setUnreadCounts((prev) => ({
//         ...prev,
//         ...apiChats.reduce((acc, chat) => {
//           acc[chat.id] = chat.unread_count;
//           return acc;
//         }, {}),
//       }));

//       setOnlineUsers(getOnlineUsersFromChats(apiChats));
//     }
//   }, [apiChats]);

//   const getChats = async () => {
//     try {
//       const res = await apiGet(`/chat/chats`);
//       return res.data.data;
//     } catch (error) {
//       console.error("Failed to fetch chats:", error);
//     }
//   };

//   // useEffect(() => {
//   //   if (chats && socketRef.current) {
//   //     const getChatIds = () => chats.map((c) => c?.id).filter(Boolean);
//   //     socketRef.current.emit(EVENTS.SOCIAL, getChatIds());
//   //   }
//   // }, [chats]);

//   useEffect(() => {
//     if (!chats || !isConnected) {
//       if (!isConnected) {
//         console.warn("No connection. Social event will be queued.");
//       }
//       return;
//     }

//     const getChatIds = () => chats.map((c) => c?.id).filter(Boolean);
//     const chatIds = getChatIds();

//     const emitSocialEvent = async () => {
//       console.log(chatIds, "chats");
//       try {
//         const success = await emit(EVENTS.SOCIAL, chatIds);
//         if (!success) {
//           console.warn("Failed to emit social event, action queued.");
//         }
//       } catch (error) {
//         console.error("Error emitting social event:", error);
//       }
//     };

//     emitSocialEvent();
//   }, [chats, isConnected, emit]);

//   useEffect(() => {
//     if (!chat_messages) {
//       setMessages({});
//       setMessageReceipts({});
//       return;
//     }

//     const normalized = normalizedMessages(chat_messages);
//     setMessages(normalized);

//     const initialStatuses = Object.values(normalized).reduce((acc, message) => {
//       if (message.statuses?.length > 0) {
//         acc[message.id] = message.statuses.reduce((statusAcc, status) => {
//           statusAcc[status.user_id] = status.status;
//           return statusAcc;
//         }, {});
//       }
//       return acc;
//     }, {});
//     setMessageReceipts((prev) => ({ ...prev, ...initialStatuses }));
//   }, [chat_messages, setMessageReceipts, setMessages]);

//   useEffect(() => {
//     useChatStore.getState().initializePreviewChat();
//   }, []);

//   const combinedChats = useMemo(() => {
//     const chatsArray = chats ?? [];
//     return previewChat ? [previewChat, ...chatsArray] : chatsArray;
//   }, [previewChat, chats]);

//   const deleteChatMutation = useMutation({
//     mutationFn: () => apiDelete(`/chat/${currentChatId}/delete`),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["chats", user?.id]);
//       setCurrentChatId(null);
//       message.success("Chat deleted successfully");
//     },
//     onError: (error) => {
//       console.error("Error deleting chat:", error);
//       message.error("Failed to delete chat");
//     },
//   });

//   // const sendTypingStatus = (isTyping) => {
//   //   if (!currentChatId || currentChatId === "preview") return;
//   //   const payload = { chat_id: currentChatId, user_id: user?.id };
//   //   socketRef.current.emit(isTyping ? "typing" : "stop_typing", payload);
//   // };

//   const sendTypingStatus = async (isTyping) => {
//     if (!currentChatId || currentChatId === "preview") return;

//     const payload = { chat_id: currentChatId, user_id: user?.id };

//     if (!isConnected) {
//       console.warn(
//         `No connection. ${
//           isTyping ? "Typing" : "Stop typing"
//         } event will be queued.`
//       );
//     }

//     try {
//       const success = await emit(
//         isTyping ? EVENTS.TYPING : EVENTS.STOP_TYPING,
//         payload
//       );
//       if (!success) {
//         console.warn(
//           `Failed to emit ${
//             isTyping ? "typing" : "stop typing"
//           } event, action queued.`
//         );
//       }
//     } catch (error) {
//       console.error(
//         `Error emitting ${isTyping ? "typing" : "stop typing"} event:`,
//         error
//       );
//     }
//   };

//   // const markMessageAsRead = (unread_messages) => {
//   //   const payload = unreadMessageData(unread_messages);
//   //   if (currentChatId && currentChatId !== "preview") {
//   //     socketRef.current.emit("message_read", payload);
//   //   }
//   // };

//   const markMessageAsRead = async (unread_messages) => {
//     if (!currentChatId || currentChatId === "preview") return;

//     const payload = unreadMessageData(unread_messages);

//     if (!isConnected) {
//       console.warn("No connection. Message read event will be queued.");
//     }

//     try {
//       const success = await emit(EVENTS.MESSAGE_READ, payload, {
//         priority: "high",
//       });
//       if (!success) {
//         console.warn("Failed to emit message read event, action queued.");
//       } else {
//         // setMessageReceipts((prev) => {
//         //   const updated = { ...prev };
//         //   unread_messages.forEach((msg) => {
//         //     updated[msg.id] = { ...updated[msg.id], status: "read" };
//         //   });
//         //   return updated;
//         // });
//       }
//     } catch (error) {
//       console.error("Error emitting message read event:", error);
//     }
//   };

//   const unreadMessageData = (unread_messages) => ({
//     user_id: user?.id,
//     chat_id: currentChatId,
//     messages: unread_messages.map((m) => ({
//       message_id: m.id,
//       sender_id: m.sender_id,
//     })),
//   });

//   const getOnlineUsersFromChats = (chats) => {
//     if (!chats || !Array.isArray(chats)) return [];
//     console.log("Getting online users from chats", chats);
//     return [
//       ...new Set(
//         chats.flatMap((c) =>
//           c.participants
//             .filter((p) => p.user?.status === "online")
//             .map((p) => p.user?.id)
//         )
//       ),
//     ];
//   };

//   return {
//     sendMessage,
//     createOrGetChatMutation,
//     preparePayLoad,
//     chats: combinedChats,
//     isFetchingChats,
//     deleteChatMutation,
//     sendTypingStatus,
//     typingUsers,
//     sidebarTyping,
//     unreadCounts,
//     isFetchingChatMessages,
//     messages,
//     messageReceipts,
//     markMessageAsRead,
//     onlineUsers,
//   };
// };



// useChat.js
import { useEffect, useCallback, useState, useMemo } from "react";
import { apiPost, apiGet, apiDelete } from "@/src/services/api/api_service";
import { useUser } from "../data/useUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useChatStore from "../../store/chat/chat";
import { message } from "antd";
import { EVENTS } from "../../utils/data/events";
import { MESSAGE_STATUSES } from "../../utils/data/message";
import { handleNewMessage, normalizedMessages } from "../../utils/fns/chat";
import { format } from "date-fns";
import { useSocketConnection } from "../sockets/useSocketConnection";
import { useChatSocketEvents } from "./useChatEvents";
import { useSocketEmit } from "../sockets/useSocketEmit";
import { debounce } from "lodash"; // Install lodash if not already present
import { getMetrics } from "@/src/services/socket/socket-api";

export const useChat = () => {
  const [messages, _setMessages] = useState({});
  const {
    currentChatId,
    setCurrentChatId,
    previewChat,
    clearPreviewChat,
    setPreviewChat,
  } = useChatStore();
  const { user } = useUser();
  const [typingUsers, setTypingUsers] = useState([]);
  const [messageReceipts, _setMessageReceipts] = useState({});
  const [sidebarTyping, setSidebarTyping] = useState({});
  const [unreadCounts, setUnreadCounts] = useState({});
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const queryClient = useQueryClient();
  const namespace = "chat";

  const {
    isConnected,
    socketId,
    state: connectionState,
  } = useSocketConnection({
    namespace: "chat",
    initialize: false,
  });

  const { emit } = useSocketEmit(namespace);

  const setMessages = useCallback((updater) => {
    _setMessages((prev) =>
      typeof updater === "function" ? updater(prev) : updater
    );
  }, []);

  const setMessageReceipts = useCallback((updater) => {
    _setMessageReceipts((prev) =>
      typeof updater === "function" ? updater(prev) : updater
    );
  }, []);

  useChatSocketEvents(namespace, {
    setOnlineUsers,
    setMessages,
    setChats,
    setTypingUsers,
    setMessageReceipts,
    setSidebarTyping,
    setUnreadCounts,
  });

  const createOrGetChatMutation = useMutation({
    mutationFn: async (payload) => apiPost("/chat/get-or-create", payload),
  });

  const getParticipants = (chat) => chat.participants.map((p) => p.user?.id);

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

        queryClient.setQueryData(["chats", user?.id], (old) => {
          const chats = old ?? [];
          const filtered = chats.filter((c) => c.id !== chatId);
          return [chat, ...filtered];
        });

        const initialChat = {
          chatId: chatId,
          startParticipants: getParticipants(chat),
        };

        if (!isConnected) {
          console.warn("No connection. Join chat will be queued.");
        }
        const joinSuccess = await emit(EVENTS.JOIN_CHAT, initialChat);
        if (!joinSuccess) {
          console.warn("Failed to join chat, action queued.");
        }
      }

      const message = {
        id: new Date().toISOString(),
        chat_id: chatId,
        sender_id: user?.id,
        content,
        type: "text",
        sent_at: format(new Date().toISOString(), "HH:mm a").toLowerCase(),
        sent_at_iso: new Date().toISOString(),
        status: MESSAGE_STATUSES.SENDING,
        statuses: [],
      };

      handleNewMessage(message, setMessages, setChats);
      const sendSuccess = await emit(EVENTS.SEND_MESSAGE, message, {
        priority: "high",
      });

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
    queryKey: ["chats", user?.id],
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

  const getChats = async () => {
    try {
      const res = await apiGet(`/chat/chats`);
      return res.data.data;
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    }
  };

  // Debounced SOCIAL event emission
  const emitSocialEvent = useCallback(
    debounce(async (chatIds) => {
      console.log(chatIds, "chats");
      try {
        const success = await emit(EVENTS.SOCIAL, chatIds);
        if (!success) {
          console.warn("Failed to emit social event, action queued.");
        }
      } catch (error) {
        console.error("Error emitting social event:", error);
      }
    }, 1000),
    [emit]
  );

  useEffect(() => {
    if (!chats || !isConnected) {
      if (!isConnected) {
        console.warn("No connection. Social event will be queued.");
      }
      return;
    }

    const getChatIds = () => chats.map((c) => c?.id).filter(Boolean);
    const chatIds = getChatIds();
    emitSocialEvent(chatIds);
  }, [chats, isConnected, emitSocialEvent]);

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
  }, [chat_messages, setMessageReceipts, setMessages]);

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
      queryClient.invalidateQueries(["chats", user?.id]);
      setCurrentChatId(null);
      message.success("Chat deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting chat:", error);
      message.error("Failed to delete chat");
    },
  });

  const sendTypingStatus = async (isTyping) => {
    if (!currentChatId || currentChatId === "preview") return;

    const payload = { chat_id: currentChatId, user_id: user?.id };

    if (!isConnected) {
      console.warn(
        `No connection. ${
          isTyping ? "Typing" : "Stop typing"
        } event will be queued.`
      );
    }

    try {
      const success = await emit(
        isTyping ? EVENTS.TYPING : EVENTS.STOP_TYPING,
        payload
      );
      if (!success) {
        console.warn(
          `Failed to emit ${
            isTyping ? "typing" : "stop typing"
          } event, action queued.`
        );
      }
    } catch (error) {
      console.error(
        `Error emitting ${isTyping ? "typing" : "stop typing"} event:`,
        error
      );
    }
  };

  const markMessageAsRead = async (unread_messages) => {
    if (!currentChatId || currentChatId === "preview") return;

    const payload = unreadMessageData(unread_messages);

    if (!isConnected) {
      console.warn("No connection. Message read event will be queued.");
    }

    try {
      const success = await emit(EVENTS.MESSAGE_READ, payload, {
        priority: "high",
      });
      if (!success) {
        console.warn("Failed to emit message read event, action queued.");
      }
    } catch (error) {
      console.error("Error emitting message read event:", error);
    }
  };

  const unreadMessageData = (unread_messages) => ({
    user_id: user?.id,
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
            .map((p) => p.user?.id)
        )
      ),
    ];
  };


  // useChat.js (add to the end of the hook)
useEffect(() => {
  const interval = setInterval(() => {
    const metrics = getMetrics ();
    console.log("Socket Metrics:", metrics);
  }, 5000); // Log every 5 seconds
  return () => clearInterval(interval);
}, []);

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