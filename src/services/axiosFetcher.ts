import axios, { AxiosRequestConfig } from "axios";
import { decryption, getStorageValue } from "../pages/content/utils";

const BASE_URL = "https://api-staging.onesuite.io/api";
// const BASE_URL = "http://localhost:8000";
// const BASE_URL = "https://stage-api.post.market/api";

const axiosFetcher = async (url: string, config?: AxiosRequestConfig) => {
  const token = await getStorageValue("token");
  const decryptedToken = decryption(token);

  const result = await axios({
    withCredentials: true,
    ...config,
    url: BASE_URL + url,
    headers: { Authorization: `Bearer ${decryptedToken}` },
  }).catch((error) => {
    console.log({ error });

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
