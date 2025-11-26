import { create } from "zustand";

export const useLoading = create((set) => ({
    loading: true,
    toggleLoading: () => set(() => ({loading: false })),
  }))

 