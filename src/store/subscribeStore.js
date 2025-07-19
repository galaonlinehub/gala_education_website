import { create } from "zustand";

const useSubscribeStore = create((set) => ({
    subscribeOpen: false,
    setSubscribeOpen: (state) => set(() => ({ subscribeOpen: state }))
}));

export { useSubscribeStore };
