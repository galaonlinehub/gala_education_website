import { create } from 'zustand';

export const useStickyNotification = create((set) => ({
  notificationOpen: false,
  openStickyNotification: () => set({ notificationOpen: true }),
  closeStickyNotification: () => set({ notificationOpen: false }),
}));

