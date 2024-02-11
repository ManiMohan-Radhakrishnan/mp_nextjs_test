import axios from "axios";
import { getCookies, removeCookies } from "../utils/cookies";

const appAxiosInternal = axios.create({
  baseURL: process.env.NEXT_PUBLIC_INTERNAL_SERVER_URL,
});

// Todo: uncomment this and fix the document bug.
appAxiosInternal.interceptors.request.use(
  function (config) {
    typeof window !== "undefined" &&
      document.body.classList.add("loading-indicator-api");
    const auth_token = getCookies();
    if (auth_token) config.headers.Authorization = auth_token;
    return config;
  },
  function (error) {
    typeof window !== "undefined" &&
      document.body.classList.remove("loading-indicator-api");
    return Promise.reject(error);
  }
);

appAxiosInternal.interceptors.response.use(
  (response) => {
    typeof window !== "undefined" &&
      document.body.classList.remove("loading-indicator-api");

    return response;
  },
  (error) => {
    typeof window !== "undefined" &&
      document.body.classList.remove("loading-indicator-api");

    if (error?.response?.status === 401) {
      removeCookies();
    }
    return Promise.reject(error);
  }
);

export default appAxiosInternal;
