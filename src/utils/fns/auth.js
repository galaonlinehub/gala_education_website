import { USER_COOKIE_KEY } from "@/src/config/settings";
import { cookieFn } from "./client";
import { apiPost, apiGet } from "@/src/services/api_service";
import { encrypt } from "./encryption";
import { getUser } from "./global";

export const logout = async () => {
  try {
    const response = await apiPost("logout");
    if (response.status === 200) {
      cookieFn.remove(USER_COOKIE_KEY);
    }
  } catch (e) {
    alert("Error logging out");
  }
};

export const login = async (data) => {
  try {
    
    const response = await apiPost("login", data);
    
    if (response.status === 200) {
      console.log(response.data.token, "THIS IS THE TOKEN");
      const encryptedToken = encrypt(response.data.token);
      cookieFn.set(USER_COOKIE_KEY, encryptedToken, 7);
      return 1;
    }
  } catch (error) {
    // alert(
    //   JSON.stringify({
    //     message: error.message,
    //     response: error.response
    //       ? {
    //           data: error.response.data,
    //           status: error.response.status,
    //           statusText: error.response.statusText,
    //         }
    //       : null,
    //   })
    // );
  }
};

export const handleGoogleLogin = async () => {
  try {
    const response = await apiGet("/auth/google");
    window.location.href = response.data.authUrl;
  } catch (error) {
    setLocalFeedback({
      show: true,
      type: "error",
      message: "Google login failed. Please try again later.",
    });
  } finally {
    setTimeout(() => {
      setLocalFeedback({
        show: false,
        type: "",
        message: "",
      });
    }, 10000);
  }
};
