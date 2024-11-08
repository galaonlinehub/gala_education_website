import { create } from "zustand";

const useEmailVerificationModalOpen = create((set) => ({
    openEmailVerificationModal: false,
    setOpenEmailVerificationModal: (state) =>
        set(() => ({ openEmailVerificationModal: state })),
}));

const useTabNavigator = create((set) => ({
    activeTab: 0,
    setActiveTab: (state) => set(() => ({ activeTab: state })),
}));

export { useEmailVerificationModalOpen, useTabNavigator };
