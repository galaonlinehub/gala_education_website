import { create } from 'zustand';

const useChatStore = create((set) => ({
  currentChatId: null,
  messages: [],
  users: [],
  setCurrentChatId: (chatId) => set({ currentChatId: chatId }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setUsers: (users) => set({ users }),
}));

export default useChatStore;