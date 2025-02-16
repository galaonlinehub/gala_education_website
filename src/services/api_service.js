// "use server"

import axios from "axios";
import { decrypt } from "../utils/fns/encryption";
import { USER_COOKIE_KEY } from "../config/settings";
import { cookieFn } from "../utils/fns/client";

export const api = axios.create({
  baseURL: "https://galaweb.galahub.org/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const publicEndpoints = new Set([
  "login",
  "register",
  "verify-otp",
  "resend-otp",
  "payment",
  "password/reset-request",
  "reset-password",
  "subscribe-plan"
]);

api.interceptors.request.use(
  (config) => {
    if (!config.url) return config;
    const baseUrl = config.url.split("?")[0];

    if ([...publicEndpoints].some((endpoint) => baseUrl.includes(endpoint))) {
      return config;
    }

    const encryptedToken = cookieFn.get(USER_COOKIE_KEY);
    if (!encryptedToken) {
      if (typeof window !== "undefined") {
        // window.location.href = "/signin";
      }
      return Promise.reject(new Error("No authentication token"));
    }

    config.headers.Authorization = `Bearer ${decrypt(encryptedToken)}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     console.error("Response Interceptor Error:", error);

//     if (error.response?.status === 401) {
//       console.warn("Unauthorized! Redirecting to login...");

//       if (typeof window !== "undefined") {
//         window.location.href = "/signin";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export const apiGet = async (endpoint, headers = {}) => {
  const response = await api.get(endpoint, { headers });
  return response;
};

export const apiPost = async (endpoint, data, headers = {}) => {
  const response = await api.post(endpoint, data, { headers });
  return response;
};

export const apiPut = async (endpoint, data, headers = {}) => {
  try {
    const response = await api.post(endpoint, data, { headers });
    return response;
  } catch (error) {
    console.error(`PUT ${endpoint} Error:`, error);
    throw error;
  }
};
export const apiPatch = async (endpoint, data, headers = {}) => {
  try {
    const response = await api.post(endpoint, data, { headers });
    return response;
  } catch (error) {
    console.error(`PATCH ${endpoint} Error:`, error);
    throw error;
  }
};

export const apiDelete = async (endpoint, data, headers = {}) => {
  try {
    const response = await api.post(endpoint, data, { headers });
    return response;
  } catch (error) {
    console.error(`DELETE ${endpoint} Error:`, error);
    throw error;
  }
};
