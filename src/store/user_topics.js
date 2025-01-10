import { create } from "zustand";
const useUserTopcs = create((set) => ({
  userTopics: [],
  topicsLoading: false,
  setUserTopics: (topics) => set(() => ({ userTopics: topics })),
  setTopicsLoading: (isLoading) => set({ topicsLoading: isLoading }),
}));

export { useUserTopcs };
