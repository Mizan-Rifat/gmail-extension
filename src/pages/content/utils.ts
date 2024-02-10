import CryptoJS from "crypto-js";

export const getStorageValue = async (key: string) => {
  const result = await chrome.storage.local.get(key);
  return result[key];
};
export const setStorageValue = (value: { [key: string]: any }) =>
  chrome.storage.local.set(value);

export const decryption = (data: any) => {
  try {
    const dataBytes = CryptoJS.AES.decrypt(data, "23WKu49Rkxa@");
    const decryptedDataString = dataBytes.toString(CryptoJS.enc.Utf8);
    const decryptedData = JSON.parse(decryptedDataString);
    return decryptedData;
  } catch (error) {
    console.error("Decryption error:", error);
    return null; // or handle the error in an appropriate way
  }
};

export const cleanLabel = (label: string) => label.replace(":", "");
