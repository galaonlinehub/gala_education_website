export const preventCopyPaste = (event) => {
  event.preventDefault();
};

//This only works if the preceding word is sign up
export const getRoleFromUrl = (url) => {
  if (!url) return null;

  const parts = url.split('/').filter(Boolean);
  // Example: parts = ["en", "instructor"]

  // Look for known roles directly
  const roles = ["instructor", "student", "admin"];
  const foundRole = parts.find(p => roles.includes(p));

  return foundRole || null;
};


export const hasData = (obj) => Object.keys(obj).length > 0;
export const getKeys = (obj) => Object.keys(obj);
export const getValues = (obj) => Object.values(obj);
export const getEntries = (obj) => Object.entries(obj);
export const getLength = (obj) => Object.keys(obj).length;

