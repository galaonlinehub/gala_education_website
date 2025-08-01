"use client"
import { create } from "zustand";

const useSearchResult = create((set) => ({
  selectedItemId: { id: null, type: null },
  setSelectedItemId: (id) => set({ selectedItemId: id }),
}));

export { useSearchResult };
