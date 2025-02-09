import { create } from "zustand";

export const useLoading = create((set) => ({
    loading: true,
    toggleLoading: () => set((state) => ({ loading: !state.loading })),
  }))

 