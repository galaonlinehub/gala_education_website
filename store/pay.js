import { create } from "zustand";

const usePay = create((set) => ({
  payMethod: "mobile",
  mobilePay: true,
  setMobilePay: (updateFn) =>
    set((state) => {
      const newMobilePay =
        typeof updateFn === "function" ? updateFn(state.mobilePay) : updateFn;

      return {
        mobilePay: newMobilePay,
      };
    }),
  setPayMethod: (method) => set(() => ({ payMethod: method })),
}));

const usePaySteps = create((set) => ({
  currentStep: 0,
  setCurrentStep: (step) => set(() => ({ currentStep: step })),
}));

export { usePay, usePaySteps };
