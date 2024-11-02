export const getStorageValue = async (key: string) => {
  const value = localStorage.getItem(key);
  return value;
};

export const setStorageValue = async (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const removeStorageValue = async (key: string) => {
  localStorage.removeItem(key);
};
