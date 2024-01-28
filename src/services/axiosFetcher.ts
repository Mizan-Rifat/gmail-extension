import axios, { AxiosRequestConfig } from "axios";

// const BASE_URL = 'http://localhost:8000';
// const BASE_URL = "https://jsonplaceholder.typicode.com";
const BASE_URL = "https://api-staging.onesuite.io/api";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsbzE5ZnZlaTAwMjM5NjV0eXExd2k1b2YiLCJyb2xlIjoiYnVzaW5lc3NfdXNlciIsInN0YXR1cyI6ImFjdGl2ZSIsImVtYWlsIjoiZmFyaGFuLnRlY2huZXh0QGdtYWlsLmNvbSIsImlhdCI6MTcwNjM2MzQ5NCwiZXhwIjoxNzA4OTU1NDk0fQ.vfuAWotmDxq8Vn6HIa-EYOXbS1h2ZgoCILZnIY-nvSY";

const axiosFetcher = async (url: string, config?: AxiosRequestConfig) => {
  const result = await axios({
    withCredentials: true,
    ...config,
    url: BASE_URL + url,
    headers: { Authorization: `Bearer ${TOKEN}` },
  });

  return result.data;
};

export default axiosFetcher;
