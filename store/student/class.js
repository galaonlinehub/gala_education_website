import { create } from "zustand";
const useNewClass = create((set) => ({
  openNewClass: false,
  setOpenNewClass: (state) => set(() => ({ openNewClass: state })),
}));

const useEnrolledTopics = create((set) => ({
  enrolledTopics: [],
  setEnrolledTopics: (topics) => set(() => ({ enrolledTopics: topics })),
  loading: true,
  setLoading: (isLoading) => set({ loading: isLoading }),
}));

export { useNewClass, useEnrolledTopics };
