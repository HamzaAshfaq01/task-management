import CryptoJS from "crypto-js";

var encryptedString;

export const encryptData = (data) => {
  if (typeof data == "string") {
    data = data.slice();
    encryptedString = CryptoJS.AES.encrypt(
      data,
      process.env.REACT_APP_SECRET_KEY
    );
  } else {
    encryptedString = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      process.env.REACT_APP_SECRET_KEY
    );
  }
  return encryptedString.toString();
};

export const decryptData = (encrypted) => {
  var decrypted = CryptoJS.AES.decrypt(
    encrypted,
    process.env.REACT_APP_SECRET_KEY
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
};
