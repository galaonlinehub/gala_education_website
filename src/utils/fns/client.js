import Cookies from "js-cookie";

const isValidValue = (value) => value !== undefined && value !== null;
const isValidKey = (key) => typeof key === "string" && key.length > 0;

export const cookieFn = {
  set: (key, value, days = 7) => {
    if (!isValidKey(key)) throw new Error("Invalid key");
    if (!isValidValue(value)) throw new Error("Invalid value");

    try {
      Cookies.set(key, value, {
        expires: days,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
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
      // More efficient than forEach as it avoids creating a callback function
      const cookies = Object.keys(Cookies.get());
      for (let i = 0; i < cookies.length; i++) {
        Cookies.remove(cookies[i]);
      }
      return true;
    } catch (error) {
      console.error("Error clearing cookies:", error);
      return false;
    }
  },
};

export const localStorageFn = {
  set: (key, value) => {
    if (!isValidKey(key)) return false;
    if (!isValidValue(value)) return false;

    try {
      // Direct assignment is more efficient than setItem for primitive values
      localStorage[key] = JSON.stringify(value);
      return true;
    } catch (error) {
      console.error(`Error setting localStorage ${key}:`, error);
      return false;
    }
  },

  get: (key) => {
    if (!isValidKey(key)) return null;

    try {
      // Direct access is more efficient than getItem
      const value = localStorage[key];
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting localStorage ${key}:`, error);
      return null;
    }
  },

  remove: (key) => {
    if (!isValidKey(key)) return false;

    try {
      // Direct deletion is more efficient than removeItem
      delete localStorage[key];
      return true;
    } catch (error) {
      console.error(`Error removing localStorage ${key}:`, error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  },
};

export const sessionStorageFn = {
  set: (key, value) => {
    if (!isValidKey(key)) return false;
    if (!isValidValue(value)) return false;

    try {
      // Direct assignment is more efficient than setItem
      sessionStorage[key] = JSON.stringify(value);
      return true;
    } catch (error) {
      console.error(`Error setting sessionStorage ${key}:`, error);
      return false;
    }
  },

  get: (key) => {
    if (!isValidKey(key)) return null;

    try {
      // Direct access is more efficient than getItem
      const value = sessionStorage[key];
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting sessionStorage ${key}:`, error);
      return null;
    }
  },

  remove: (key) => {
    if (!isValidKey(key)) return false;

    try {
      // Direct deletion is more efficient than removeItem
      delete sessionStorage[key];
      return true;
    } catch (error) {
      console.error(`Error removing sessionStorage ${key}:`, error);
      return false;
    }
  },

  clear: () => {
    try {
      sessionStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing sessionStorage:", error);
      return false;
    }
  },
};
