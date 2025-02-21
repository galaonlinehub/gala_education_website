"use client";

import { create } from "zustand";
const useEnrollMe = create((set) => ({
  enrollMe: false,
  enrollCohortId: null,
  setEnrollMe: (state) => set(() => ({ enrollMe: state })),
  setEnrollCohort: (state) => set(() => ({ enrollCohortId: state })),
}));

export { useEnrollMe };
