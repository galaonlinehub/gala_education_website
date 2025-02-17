import { create } from "zustand";

export const useStore = create((set) => ({
    openMenu: false,
    toggleMenu: () => set((state) => ({ openMenu: !state.openMenu })),
    setOpenMenu: (value) => set({ openMenu: value }),
  }))

 