import { create } from "zustand";
const useUserTopics = create((set) => ({
  userTopics: [],
  topicsLoading: true,
  setUserTopics: (topics) => set(() => ({ userTopics: topics })),
  setTopicsLoading: (isLoading) => set({ topicsLoading: isLoading }),
}));

export { useUserTopics };
