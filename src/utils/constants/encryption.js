// import CryptoJS from "crypto-js";

// const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

// export const encrypt = (text) => {
//   try {
//     const encrypted = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
//     return encodeURIComponent(encrypted);
//   } catch (error) {
//     console.error("Encryption error:", error);
//     return null;
//   }
// };

// export const decrypt = (encryptedText) => {
//   try {
//     const decodedText = decodeURIComponent(encryptedText);
//     const decrypted = CryptoJS.AES.decrypt(decodedText, SECRET_KEY);
//     return decrypted.toString(CryptoJS.enc.Utf8);
//   } catch (error) {
//     console.error("Decryption error:", error);
//     return null;
//   }
// };


import CryptoJS from 'crypto-js';

// const SECRET_KEY = 'your-secret-key-here';
const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;


export const encrypt = (data) => {
  try {
    // Convert data to string if it's not already a string
    let textToEncrypt;
    
    if (typeof data === 'object') {
      textToEncrypt = JSON.stringify(data);
    } else if (data === undefined || data === null) {
      console.error("Cannot encrypt null or undefined data");
      return null;
    } else {
      textToEncrypt = String(data);
    }

    // Validate the string before encryption
    if (!textToEncrypt) {
      console.error("Empty string after conversion");
      return null;
    }

    // Create a word array from the string
    const wordArray = CryptoJS.enc.Utf8.parse(textToEncrypt);
    
    // Encrypt
    const encrypted = CryptoJS.AES.encrypt(wordArray, SECRET_KEY);
    
    // Convert to string and URL encode
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

    // Try to parse as JSON if it's an object, otherwise return as is
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