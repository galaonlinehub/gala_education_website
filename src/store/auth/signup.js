import { SIGN_UP_CHOOSE_ACCOUNT_KEY, SIGN_UP_NAVIGATOR_KEY } from "@/src/config/settings";
import { localStorageFn } from "@/src/utils/fns/client";
import { create } from "zustand";

const useEmailVerificationModalOpen = create((set) => ({
  openEmailVerificationModal: false,
  setOpenEmailVerificationModal: (state) =>
    set(() => ({ openEmailVerificationModal: state })),
}));

const useTabNavigator = create((set) => ({
  activeTab: localStorageFn.get(SIGN_UP_NAVIGATOR_KEY) || 0,
  setActiveTab: (newState) => {
    localStorageFn.set(SIGN_UP_NAVIGATOR_KEY, newState);
    set({ activeTab: newState });
  }
}));


const useSelectedPlan = create((set) => ({
    selectedPlan: 1,
    setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  }));


const useAccountType = create((set) => ({
  accountType: localStorageFn.get(SIGN_UP_CHOOSE_ACCOUNT_KEY),
  setAccountType: (newState) => {
    localStorageFn.set(SIGN_UP_CHOOSE_ACCOUNT_KEY, newState);
    set({ accountType: newState });
  }
}));

export { useEmailVerificationModalOpen, useTabNavigator, useAccountType, useSelectedPlan };
