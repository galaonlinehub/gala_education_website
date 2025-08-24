// src/store/chat/chatStore.js
import { message } from "antd";
import { format } from "date-fns";
import { debounce } from "lodash";
import { create } from "zustand";

import { CURRENT_CHAT_KEY, PREVIEW_CHAT_KEY } from "@/config/settings";
import { apiPost, apiGet, apiDelete } from "@/services/api/api_service";
import { EVENTS } from "@/utils/data/events";
import { MESSAGE_STATUSES } from "@/utils/data/message";
import { handleNewMessage } from "@/utils/fns/chat";
import { sessionStorageFn } from "@/utils/fns/client";
import { decrypt, encrypt } from "@/utils/fns/encryption";

const useChatStore = create((set, get) => ({
  currentChatId: sessionStorageFn.get(CURRENT_CHAT_KEY) ?? null,
  previewChat: null,
  messages: {},
  typingUsers: [],
  messageReceipts: {},
  sidebarTyping: {},
  unreadCounts: {},
  chats: [],
  onlineUsers: [],

  // State setters
  setCurrentChatId: (chatId) =>
    set((state) => {
      sessionStorageFn.set(CURRENT_CHAT_KEY, chatId);
      return { ...state, currentChatId: chatId };
    }),

  setPreviewChat: (chatData) => {
    if (chatData) {
      const encryptedData = encrypt({
        first_name: chatData.first_name,
        last_name: chatData.last_name,
        recepient_id: chatData.recepient_id,
      });
      sessionStorageFn.set(PREVIEW_CHAT_KEY, encryptedData);
    } else {
      sessionStorageFn.remove(PREVIEW_CHAT_KEY);
    }

    const previewChatData = chatData
      ? {
          id: "preview",
          title: null,
          participants: [
            {
              id: chatData.recepient_id,
              user: {
                id: chatData.recepient_id,
                first_name: chatData.first_name,
                last_name: chatData.last_name,
                profile_picture: null,
              },
            },
          ],
          created_at: new Date().toISOString(),
        }
      : null;

    set({ previewChat: previewChatData });
  },

  initializePreviewChat: () => {
    const encryptedPreview = sessionStorageFn.get(PREVIEW_CHAT_KEY);
    if (encryptedPreview) {
      const preview = decrypt(encryptedPreview);
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
          created_at: new Date().toISOString(),
        };
        set({ previewChat: previewChatData });
      }
    }
  },

  clearPreviewChat: () => {
    sessionStorageFn.remove(PREVIEW_CHAT_KEY);
    set({ previewChat: null });
  },

  setMessages: (updater) =>
    set((state) => ({
      messages: typeof updater === "function" ? updater(state.messages) : updater,
    })),

  setMessageReceipts: (updater) =>
    set((state) => ({
      messageReceipts:
        typeof updater === "function" ? updater(state.messageReceipts) : updater,
    })),

  setChats: (updater) =>
    set((state) => ({
      chats: typeof updater === "function" ? updater(state.chats) : updater,
    })),

  setTypingUsers: (updater) =>
    set((state) => ({
      typingUsers:
        typeof updater === "function" ? updater(state.typingUsers) : updater,
    })),

  setSidebarTyping: (updater) =>
    set((state) => ({
      sidebarTyping:
        typeof updater === "function" ? updater(state.sidebarTyping) : updater,
    })),

  setUnreadCounts: (updater) =>
    set((state) => ({
      unreadCounts:
        typeof updater === "function" ? updater(state.unreadCounts) : updater,
    })),

  setOnlineUsers: (updater) =>
    set((state) => ({
      onlineUsers:
        typeof updater === "function" ? updater(state.onlineUsers) : updater,
    })),

  // Actions
  sendMessage: async (content, recipient_id, chat_id, user, emit, connections) => {
    if (!content.trim() || !connections?.chat?.connected) {
      if (!connections?.chat?.connected) {
        console.warn("No connection to chat namespace. Message will be queued.");
        emit("chat", EVENTS.SEND_MESSAGE, {
          id: new Date().toISOString(),
          chat_id: chat_id || get().currentChatId,
          sender_id: user?.id,
          content,
          type: "text",
          sent_at: format(new Date().toISOString(), "HH:mm a").toLowerCase(),
          sent_at_iso: new Date().toISOString(),
          status: MESSAGE_STATUSES.SENDING,
          statuses: [],
        }, { priority: "high" });
      }
      return;
    }
    try {
      let chatId = chat_id || get().currentChatId;
      const wasPreview = get().currentChatId === "preview";

      if (!chatId || chatId === "preview") {
        const chatPayload = {
          type: "private",
          title: "",
          participant_ids: [recipient_id],
        };
        const res = await apiPost("/chat/get-or-create", chatPayload);
        const chat = res.data.data;

        set({ currentChatId: chat.id, previewChat: null });
        chatId = chat.id;

        set((state) => {
          const updated = [...state.chats];
          const index = updated.findIndex((c) => c.id === "preview");
          if (index !== -1) updated[index] = chat;
          else updated.push(chat);
          return { chats: updated };
        });

        const initialChat = {
          chatId: chat.id,
          startParticipants: chat.participants.map((p) => p.user?.id),
        };
        const joinSuccess = await emit("chat", EVENTS.JOIN_CHAT, initialChat, { priority: "high" });
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

      handleNewMessage(message, get().setMessages, get().setChats);
      const sendSuccess = await emit("chat", EVENTS.SEND_MESSAGE, message, { priority: "high" });
      if (wasPreview) get().clearPreviewChat();
      return sendSuccess;
    } catch (error) {
      console.error("Failed to send message:", error);
      return false;
    }
  },

  getChats: async () => {
    try {
      const res = await apiGet(`/chat/chats`);
      return res.data.data;
    } catch (error) {
      console.error("Failed to fetch chats:", error);
      return [];
    }
  },

  getChatMessages: async (chatId) => {
    try {
      const res = await apiGet(`/chat/${chatId}/messages`);
      return res.data.data;
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      return [];
    }
  },

  deleteChat: async (chatId) => {
    try {
      await apiDelete(`/chat/${chatId}/delete`);
      set((state) => ({
        chats: state.chats.filter((c) => c.id !== chatId),
        currentChatId: state.currentChatId === chatId ? null : state.currentChatId,
      }));
      message.success("Chat deleted successfully");
    } catch (error) {
      console.error("Error deleting chat:", error);
      message.error("Failed to delete chat");
    }
  },

  sendTypingStatus: async (isTyping, user, connections, emit) => {
    if (!get().currentChatId || get().currentChatId === "preview" || !connections?.chat?.connected) {
      if (!connections?.chat?.connected) {
        console.warn("No connection to chat namespace. Typing event will be queued.");
        emit("chat", isTyping ? EVENTS.TYPING : EVENTS.STOP_TYPING, {
          chat_id: get().currentChatId,
          user_id: user?.id,
        }, { priority: "normal" });
      }
      return;
    }
    const payload = { chat_id: get().currentChatId, user_id: user?.id };
    try {
      const success = await emit(
        "chat",
        isTyping ? EVENTS.TYPING : EVENTS.STOP_TYPING,
        payload,
        { priority: "normal" }
      );
      if (!success) {
        console.warn(
          `Failed to emit ${isTyping ? "typing" : "stop typing"} event, action queued.`
        );
      }
      return success;
    } catch (error) {
      console.error(`Error emitting ${isTyping ? "typing" : "stop typing"} event:`, error);
      return false;
    }
  },

  markMessageAsRead: async (unread_messages, user, connections, emit) => {
    if (!get().currentChatId || get().currentChatId === "preview" || !connections?.chat?.connected) {
      if (!connections?.chat?.connected) {
        console.warn("No connection to chat namespace. Read event will be queued.");
        emit("chat", EVENTS.MESSAGE_READ, {
          user_id: user?.id,
          chat_id: get().currentChatId,
          messages: unread_messages.map((m) => ({
            message_id: m.id,
            sender_id: m.sender_id,
          })),
        }, { priority: "high" });
      }
      return;
    }
    const payload = {
      user_id: user?.id,
      chat_id: get().currentChatId,
      messages: unread_messages.map((m) => ({
        message_id: m.id,
        sender_id: m.sender_id,
      })),
    };
    try {
      const success = await emit("chat", EVENTS.MESSAGE_READ, payload, { priority: "high" });
      if (!success) {
        console.warn("Failed to emit message read event, action queued.");
      }
      return success;
    } catch (error) {
      console.error("Error emitting message read event:", error);
      return false;
    }
  },

  emitSocialEvent: debounce(async (chatIds, emit, connections) => {
    if (!connections?.chat?.connected) {
      console.warn("No connection to chat namespace. Social event will be queued.");
      emit("chat", EVENTS.SOCIAL, chatIds, { priority: "normal" });
      return;
    }
    try {
      const success = await emit("chat", EVENTS.SOCIAL, chatIds, { priority: "normal" });
      if (!success) {
        console.warn("Failed to emit social event, action queued.");
      }
      return success;
    } catch (error) {
      console.error("Error emitting social event:", error);
      return false;
    }
  }, 1000),

  getOnlineUsersFromChats: (chats) => {
    if (!chats || !Array.isArray(chats)) return [];
    return [
      ...new Set(
        chats.flatMap((c) =>
          c.participants
            .filter((p) => p.user?.status === "online")
            .map((p) => p.user?.id)
        )
      ),
    ];
  },
}));

export default useChatStore;