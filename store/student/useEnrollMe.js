import { create } from "zustand";
const useEnrollMe = create((set) => ({
  enrollMe: false,
  enrollCohortId: null,
  setEnrollMe: (state) => set(() => ({ enrollMe: state })),
  setEnrollCohort: (state) => set(() => ({ enrollCohortId: state })),
}));

const useEnrollPay = create((set) => ({
  enrollPayStatus: "",
  setEnrollPayStatus: (state) => set(() => ({ enrollPayStatus: state })),
  reference: null,
  setReference: (state) => set(() => ({ reference: state })),
}));

export { useEnrollMe, useEnrollPay };
