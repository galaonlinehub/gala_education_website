import { USER_COOKIE_KEY } from "@/src/config/settings";
import { cookieFn, localStorageFn, sessionStorageFn } from "./client";
import { apiPost, apiGet } from "@/src/services/api_service";
import { encrypt } from "./encryption";

const errorMessage = "Something went wrong, Please try again later!";

export const logout = async () => {
  try {
    const response = await apiPost("logout");
    if (response.status === 200) {
      cookieFn.remove(USER_COOKIE_KEY);
      localStorageFn.clear();
      sessionStorageFn.clear();
    }
  } catch (e) {
    throw new Error(`${errorMessage}\t`, +e?.message);
  }
};

export const login = async (data) => {
  try {
    const response = await apiPost("login", data);

    if (response.status === 200) {
      const encryptedToken = encrypt(response.data.token);
      cookieFn.set(USER_COOKIE_KEY, encryptedToken, 7);
      sessionStorageFn.clear();
      localStorageFn.clear();
      return 1;
    }
  } catch (error) {
    if (error?.status === 401) {
      throw new Error("Oops! Wrong credentials. Please check and try again 🤔");
    }
    throw new Error(`${errorMessage}😬`);
  }
};




