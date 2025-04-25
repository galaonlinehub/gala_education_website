import axios from "axios";
import { decrypt } from "../utils/fns/encryption";
import { API_BASE_URL, USER_COOKIE_KEY } from "../config/settings";
import { cookieFn } from "../utils/fns/client";

export const api = axios.create({
  baseURL: API_BASE_URL,
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
  "subscribe-plan",
  "health",
]);

api.interceptors.request.use(
  (config) => {
    if (!config.url) return config;
    const baseUrl = config.url.split("?")[0];

    if (config.headers["X-Use-Direct-Token"] === "true") {
      console.log("Skipping interceptor token logic...");
      return config;
    }

    if ([...publicEndpoints].some((endpoint) => baseUrl.includes(endpoint))) {
      return config;
    }

    if (typeof window !== "undefined") {
      const encryptedToken = cookieFn.get(USER_COOKIE_KEY);
      if (!encryptedToken) {
        console.error("No token in cookies");
        return Promise.reject(new Error("No authentication token"));
      }
      config.headers.Authorization = `Bearer ${decrypt(encryptedToken)}`;
    } else if (!config.headers.Authorization) {
      console.error("No Authorization header in server context");
      return Promise.reject(new Error("No authentication token"));
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const apiGet = async (endpoint, headers = {}, directToken = null) => {
  try {
    if (directToken) {
      console.log("Using direct token for:", endpoint);
      const response = await api.get(endpoint, {
        headers: {
          ...headers,
          Authorization: `Bearer ${directToken}`,
          "X-Use-Direct-Token": "true",
        },
      });
      return response;
    }
    const response = await api.get(endpoint, { headers });
    return response;
  } catch (e) {
    console.error(`apiGet error for ${endpoint}:`, e);
    throw e;
  }
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
    const response = await api.patch(endpoint, data, { headers });
    return response;
  } catch (error) {
    console.error(`PATCH ${endpoint} Error:`, error);
    throw error;
  }
};

export const apiDelete = async (endpoint, data, headers = {}) => {
  try {
    const response = await api.delete(endpoint, data, { headers });
    return response;
  } catch (error) {
    console.error(`DELETE ${endpoint} Error:`, error);
    throw error;
  }
};
