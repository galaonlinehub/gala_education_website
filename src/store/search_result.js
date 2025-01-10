import { create } from "zustand";

const useSearchResult = create((set) => ({
  searchResults: [],
  searchLoading: null,
  setSearchResult: (result) => set(() => ({ searchResults: result })),
  setSearchLoading: (isLoading) => set({ searchLoading: isLoading }),
}));

export { useSearchResult };
