import { create } from "zustand";

import { CURRENT_CHAT_KEY, PREVIEW_CHAT_KEY } from "@/config/settings";
import { sessionStorageFn } from "@/utils/fns/client";
import { decrypt, encrypt } from "@/utils/fns/encryption";

const useChatStore = create((set, get) => ({
  currentChatId: sessionStorageFn.get(CURRENT_CHAT_KEY) ?? null,
  previewChat: null,

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
}));

export default useChatStore;
