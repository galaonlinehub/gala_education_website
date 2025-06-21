export const preventCopyPaste = (event) => {
  event.preventDefault();
};

export const hasData = (obj) => Object.keys(obj).length > 0;
export const getKeys = (obj) => Object.keys(obj);
export const getValues = (obj) => Object.values(obj);
export const getEntries = (obj) => Object.entries(obj);
export const getLength = (obj) => Object.keys(obj).length;
