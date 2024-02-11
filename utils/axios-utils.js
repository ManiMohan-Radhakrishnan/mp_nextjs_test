import axios from "axios";
import { getCookies, removeCookies } from "../utils/cookies";
import { store } from "./../redux/store";
import { user_logout_thunk } from "./../redux/thunk/user_thunk";

const appAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

// Todo: uncomment this and fix the document bug.
appAxios.interceptors.request.use(
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

appAxios.interceptors.response.use(
  (response) => {
    typeof window !== "undefined" &&
      document.body.classList.remove("loading-indicator-api");

    // if (!getCookies()) store.dispatch(user_logout_thunk());
    return response;
  },
  (error) => {
    typeof window !== "undefined" &&
      document.body.classList.remove("loading-indicator-api");

    if (error?.response?.status === 401) {
      removeCookies();
      // toast.warn("Session expired, signin again");
    }
    return Promise.reject(error);
  }
);

export default appAxios;
