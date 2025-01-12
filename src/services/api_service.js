import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { decrypt } from "../utils/fns/encryption";

export const api = axios.create({
  baseURL: "https://galaweb.galahub.org/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const publicEndpoints = ["/login", "/register"];

api.interceptors.request.use(
  (config) => {
    const isPublic = publicEndpoints.some((endpoint) =>
      config.url.includes(endpoint)
    );

    if (!isPublic) {
      const encryptedToken = Cookies.get(
        "9fb96164-a058-41e4-9456-1c2bbdbfbf8d"
      );
      if (encryptedToken) {
        const decryptedToken = decrypt(encryptedToken);
        config.headers.Authorization = `Bearer ${decryptedToken}`;
      }
    }

    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response Interceptor Error:", error);

    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");

      if (typeof window !== "undefined") {
        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  }
);

export const apiGet = async (endpoint, headers = {}) => {
  try {
    const response = await api.get(endpoint, { headers });
    return response;
  } catch (error) {
    console.error(`GET ${endpoint} Error:`, error);
    throw error;
  }
};

export const apiPost = async (endpoint, data, headers = {}) => {
  try {
    const response = await api.post(endpoint, data, { headers });
    console.log(response);
    return response;
  } catch (error) {
    console.error(`POST ${endpoint} Error:`, error);
    throw error;
  }
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
