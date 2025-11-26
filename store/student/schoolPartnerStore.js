import { create } from "zustand";

const useSchoolPartnerStore = create((set) => ({
  isOpen: false,
  open: () => set(() => ({ isOpen: true })),
  toggleOpen: () => set((state) => ({ isOpen: !state.open })),
  close: () => set(() => ({ isOpen: false })),
}));

export { useSchoolPartnerStore };
