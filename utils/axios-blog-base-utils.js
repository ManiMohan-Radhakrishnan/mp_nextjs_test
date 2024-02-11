import axios from "axios";
import { getCookies, removeCookies } from "../utils/cookies";
import { store } from "./../redux/store";
import { user_logout_thunk } from "./../redux/thunk/user_thunk";

const blogAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BLOG_BASE_URL,
});

blogAxios.interceptors.request.use(
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

blogAxios.interceptors.response.use(
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
    }
    return Promise.reject(error?.response);
  }
);

export default blogAxios;
