import { create } from "zustand";

import { USER_HAS_ACCEPTED_COOKIES_KEY } from "@/config/settings";
import { sessionStorageFn } from "@/utils/fns/client";

export const useCookiesStore = create((set) => ({
  cookieIsAccepted: sessionStorageFn.get(USER_HAS_ACCEPTED_COOKIES_KEY),
  setCookieIsAccepted: (state) => {
    sessionStorageFn.set(USER_HAS_ACCEPTED_COOKIES_KEY, state);
    set({ cookieIsAccepted: state });
  },
}));
