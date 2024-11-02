/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import axios, { AxiosRequestConfig } from "axios";
// import { getStorageValue } from "../pages/content/utils";
import { BASE_URL } from "./constants";
import { getStorageValue } from "./utils";

const axiosFetcher = async (
  args: string | [string, AxiosRequestConfig],
  extraArg?: {
    arg: { data?: any; setError?: any } | any;
  }
) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  let { data } = extraArg?.arg || {};
  if (!data && extraArg?.arg) {
    data = extraArg.arg;
  }

  const apiKey = await getStorageValue("api_key");
  // const apiKey = "0HSCRYda-Jnuw-Emlo-rcNj-mJbUheU4pANo";

  const result = await axios({
    withCredentials: true,
    method: config?.method || "get",
    ...config,
    data,
    url: BASE_URL + url,
    headers: { Authorization: apiKey },
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
