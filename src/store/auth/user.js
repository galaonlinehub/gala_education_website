// import { create } from "zustand";

// import { persist } from "zustand/middleware";

// const useUser = create(
//   (set) => ({
//     user: null,
//     setUser: (userData) => set({ user: userData }),
//     clearUser: () => set({ user: null }),
//   }),
//   {
//     name: "user-storage",
//   }
// );

// export default useUser;

// src/store/auth/user.js
import { create } from 'zustand';

const useUser = create((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }), // Don't modify loading state here
  clearUser: () => set({ user: null }),
  setLoading: (loading) => set({ loading })
}));

export default useUser;
