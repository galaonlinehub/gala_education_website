import { create } from "zustand";
const useNewClass = create((set) => ({
  openNewClass: false,
  setOpenNewClass: (state) => set(() => ({ openNewClass: state })),
}));

export { useNewClass };
