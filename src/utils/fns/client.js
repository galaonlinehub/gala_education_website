import Cookies from "js-cookie";

const isBrowser = typeof window !== "undefined";
const isValidValue = (value) => value !== undefined;
const isValidKey = (key) => typeof key === "string" && key.length > 0;

// Safe storage access wrapper
const createStorageWrapper = (storage) => ({
  get: (key) => {
    if (!isBrowser || !isValidKey(key)) return null;
    try {
      const value = storage[key];
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error accessing storage for key ${key}:`, error);
      return null;
    }
  },
  set: (key, value) => {
    if (!isBrowser || !isValidKey(key) || !isValidValue(value)) return false;
    try {
      storage[key] = JSON.stringify(value);
      return true;
    } catch (error) {
      console.error(`Error setting storage for key ${key}:`, error);
      return false;
    }
  },
  remove: (key) => {
    if (!isBrowser || !isValidKey(key)) return false;
    try {
      delete storage[key];
      return true;
    } catch (error) {
      console.error(`Error removing storage for key ${key}:`, error);
      return false;
    }
  },
  clear: () => {
    if (!isBrowser) return false;
    try {
      storage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing storage:", error);
      return false;
    }
  }
});

export const localStorageFn = isBrowser
  ? createStorageWrapper(window.localStorage)
  : {
      get: () => null,
      set: () => false,
      remove: () => false,
      clear: () => false
    };

export const sessionStorageFn = isBrowser
  ? createStorageWrapper(window.sessionStorage)
  : {
      get: () => null,
      set: () => false,
      remove: () => false,
      clear: () => false
    };

export const cookieFn = {
  set: (key, value, days = 7) => {
    if (!isValidKey(key)) return false;
    if (!isValidValue(value)) return false;
    try {
      Cookies.set(key, value, {
        expires: days,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/"
      });
      return true;
    } catch (error) {
      console.error(`Error setting cookie ${key}:`, error);
      return false;
    }
  },
  get: (key) => {
    if (!isValidKey(key)) return null;
    try {
      return Cookies.get(key) || null;
    } catch (error) {
      console.error(`Error getting cookie ${key}:`, error);
      return null;
    }
  },
  remove: (key) => {
    if (!isValidKey(key)) return false;
    try {
      Cookies.remove(key);
      return true;
    } catch (error) {
      console.error(`Error removing cookie ${key}:`, error);
      return false;
    }
  },
  clear: () => {
    try {
      const cookies = Object.keys(Cookies.get());
      for (let i = 0; i < cookies.length; i++) {
        Cookies.remove(cookies[i]);
      }
      return true;
    } catch (error) {
      console.error("Error clearing cookies:", error);
      return false;
    }
  }
};