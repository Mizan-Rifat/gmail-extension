import axios, { AxiosRequestConfig } from "axios";
import { decryption, getStorageValue } from "../pages/content/utils";
import { BASE_URL } from "./constants";

const axiosFetcher = async (params: {
  url: string;
  config?: AxiosRequestConfig;
}) => {
  console.log({ params });

  const { url, config } = params;

  const token = await getStorageValue("token");
  const decryptedToken = decryption(token);

  const result = await axios({
    withCredentials: true,
    ...config,
    url: BASE_URL + url,
    headers: { Authorization: `Bearer ${decryptedToken}` },
  }).catch((error) => {
    console.log({ error });

    if (error.response?.status === 403) {
      const event = new CustomEvent("authChanged");
      document.dispatchEvent(event);
    }

    throw {
      status: error.response?.status,
      data: error.response?.data || error.message,
    };
  });

  if (result) {
    return result.data;
  }
};

export default axiosFetcher;
