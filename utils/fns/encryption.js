
import CryptoJS from "crypto-js";

// const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
const SECRET_KEY =
  "ENW8394TU90TCNC43CWE4U943029C2MN394MEJFNWC321b7c23y8drnhweqo8x8bo30JEWKNC8SEU3-490TCNHE98T4C==43289T==";

export const encrypt = (data) => {
  try {
    let textToEncrypt;

    if (typeof data === "object") {
      textToEncrypt = JSON.stringify(data);
    } else if (data === undefined || data === null) {
      console.error("Cannot encrypt null or undefined data");
      return null;
    } else {
      textToEncrypt = String(data);
    }

    if (!textToEncrypt) {
      console.error("Empty string after conversion");
      return null;
    }

    const wordArray = CryptoJS.enc.Utf8.parse(textToEncrypt);

    const encrypted = CryptoJS.AES.encrypt(wordArray, SECRET_KEY);

    return encodeURIComponent(encrypted.toString());
  } catch (error) {
    console.error("Encryption error:", error);
    console.error("Data type:", typeof data);
    console.error("Data value:", data);
    return null;
  }
};

export const decrypt = (encryptedText) => {
  try {
    if (!encryptedText) {
      console.error("No encrypted text provided");
      return null;
    }
    // Decode the URL encoded string
    const decodedText = decodeURIComponent(encryptedText);

    // Decrypt
    const decrypted = CryptoJS.AES.decrypt(decodedText, SECRET_KEY);
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);

    if (!decryptedString) {
      console.error("Decryption resulted in empty string");
      return null;
    }

    try {
      return JSON.parse(decryptedString);
    } catch {
      return decryptedString;
    }
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};
