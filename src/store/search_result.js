import { create } from "zustand";

const useSearchResult = create((set) => ({
  selectedItemId:null,
    setSelectedItemId: (id) => set({ selectedItemId: id }),
}));

export { useSearchResult };
