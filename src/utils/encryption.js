import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

console.log(SECRET_KEY, "this is the secret key")
export const encrypt = (text) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
    return encodeURIComponent(encrypted);
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

export const decrypt = (encryptedText) => {
  try {
    const decodedText = decodeURIComponent(encryptedText);
    const decrypted = CryptoJS.AES.decrypt(decodedText, SECRET_KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};
