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

const useSelectedPlan = create((set) => ({
    selectedPlan: 1,
    setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  }));


const useAccountType = create((set) => ({
  accountType: "student",
  setAccountType: (state) => set(() => ({ accountType: state })),
}));

export { useEmailVerificationModalOpen, useTabNavigator, useAccountType, useSelectedPlan };
