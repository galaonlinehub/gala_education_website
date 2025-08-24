import { create } from "zustand";

import { USER_HAS_ACCEPTED_COOKIES_KEY } from "@/config/settings";
import { cookieFn } from "@/utils/fns/client";

export const useCookiesStore = create((set) => ({
  cookieIsAccepted: cookieFn.get(USER_HAS_ACCEPTED_COOKIES_KEY),
  setCookieIsAccepted: (state) => {
    cookieFn.set(USER_HAS_ACCEPTED_COOKIES_KEY, state, 365 );
    set({ cookieIsAccepted: state });
  },
}));
