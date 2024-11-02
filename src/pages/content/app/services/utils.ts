export const removeStorageValue = async (key: string) => {
  await await chrome.storage.local.remove(key);
};

export const getStorageValue = async (key: string) => {
  const result = await chrome.storage.local.get(key);
  return result[key];
};
export const setStorageValue = async (value: { [key: string]: any }) =>
  await chrome.storage.local.set(value);
