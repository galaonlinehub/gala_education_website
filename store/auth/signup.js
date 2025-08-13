import { create } from "zustand";

import {
  EMAIL_VERIFICATION_MODAL_KEY,
  SIGN_UP_CHOOSE_ACCOUNT_KEY,
  SIGN_UP_NAVIGATOR_KEY,
} from "@/config/settings";
import { localStorageFn, sessionStorageFn } from "@/utils/fns/client";

const useEmailVerificationModalOpen = create((set) => ({
  openEmailVerificationModal:
    sessionStorageFn.get(EMAIL_VERIFICATION_MODAL_KEY) ?? false,
  setOpenEmailVerificationModal: (state) => {
    sessionStorageFn.set(EMAIL_VERIFICATION_MODAL_KEY, state);
    set(() => ({ openEmailVerificationModal: state }));
  },
}));

const useTabNavigator = create((set) => ({
  activeTab: localStorageFn.get(SIGN_UP_NAVIGATOR_KEY) ?? 0,
  setActiveTab: (newState) => {
    localStorageFn.set(SIGN_UP_NAVIGATOR_KEY, newState);
    set({ activeTab: newState });
  },
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
  },
}));

export {
  useEmailVerificationModalOpen,
  useTabNavigator,
  useAccountType,
  useSelectedPlan,
};
