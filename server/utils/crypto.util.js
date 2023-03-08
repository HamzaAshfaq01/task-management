import CryptoJS from "crypto-js";
import {
  SECRET_KEY,
} from "../constants/config.const.js";

var encryptedString;

export const encryptData = (data) => {
  if (typeof data == "string") {
    data = data.slice();
    encryptedString = CryptoJS.AES.encrypt(data, SECRET_KEY);
  } else {
    encryptedString = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY);
  }
  return encryptedString.toString();
};

export const decryptData = (encrypted) => {
  console.log(encrypted,'encrypted');
  var decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
  return decrypted.toString(CryptoJS.enc.Utf8);
};