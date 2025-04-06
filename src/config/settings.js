export const USER_COOKIE_KEY = "9fb96164-a058-41e4-9456-1c2bbdbfbf8d";
export const SIGN_UP_NAVIGATOR_KEY = "3a903b78-8236-4225-acf0-06bcfd515f04";
export const SIGN_UP_CHOOSE_ACCOUNT_KEY =
  "f8bc6b75-1764-4054-b018-51b863432753";
export const EMAIL_VERIFICATION_KEY = "e67e4931-4518-4369-b011-fa078beefac1";
export const PLAN_CONFIRMED_KEY = "b6694dca-72a9-41c1-82e9-befd10a51d5e";
export const STUDENT_CONTRACT_KEY = "45a95407-631c-45e8-b691-b01ea943c3d6";
export const INSTRUCTOR_CONTRACT_KEY = "45dab10c-ce9f-40fd-9254-6b429efda2ee";

export const EMAIL_VERIFICATION_MODAL_KEY =
  "1a56cd1c-ba85-48cf-ac45-0991bc732fb2";

export const PaymentStatus = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
  REFERENCE: "reference"
};

export const encryptText = (text, secretKey = 'SecretKey') => {
  const textChars = text.split('');
  const keyChars = secretKey.split('');
  const encryptedChars = textChars.map((char, index) => {
      const charCode = char.charCodeAt(0);
      const keyChar = keyChars[index % keyChars.length];
      const keyCode = keyChar.charCodeAt(0);
      return String.fromCharCode(charCode ^ keyCode);
  });

  const encryptedText = encryptedChars.join('');
  return btoa(encryptedText);
};

export const decryptText = (encryptedText, secretKey = 'SecretKey') => {
  const encryptedChars = atob(encryptedText).split('');
  const keyChars = secretKey.split('');
  
  const decryptedChars = encryptedChars.map((char, index) => {
    const charCode = char.charCodeAt(0);
    const keyChar = keyChars[index % keyChars.length];
    const keyCode = keyChar.charCodeAt(0);
    
    return String.fromCharCode(charCode ^ keyCode);
  });
  
  return decryptedChars.join('');
};
