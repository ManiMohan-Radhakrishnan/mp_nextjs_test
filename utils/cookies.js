import { setCookie, getCookie, deleteCookie } from "cookies-next";

const cookie_token = "bl_base_user_token";

export const setCookiesByName = (name, input) => {
  const expires = new Date();
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);
  const maxAge = 365 * 24 * 60 * 60;
  const path = "/";

  setCookie(name, input, {
    path,
    expires,
    maxAge,
    domain:
      process.env.NEXT_PUBLIC_ENVIRONMENT === "local"
        ? "localhost"
        : process.env.NEXT_PUBLIC_COOKIE_DOMAIN_NAME,
    secure: true,
  });
};

export const setCookies = (input) => {
  const expires = new Date();
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);
  const maxAge = 365 * 24 * 60 * 60;
  const path = "/";

  setCookie(cookie_token, input, {
    path,
    expires,
    maxAge,
    domain:
      process.env.NEXT_PUBLIC_ENVIRONMENT === "local"
        ? "localhost"
        : process.env.NEXT_PUBLIC_COOKIE_DOMAIN_NAME,
    secure: true,
  });
};

export const setCookiesInviteCode = (input) => {
  const expires = new Date();
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);
  const maxAge = 365 * 24 * 60 * 60;
  const path = "/";

  setCookie("invite_code", input, {
    path,
    expires,
    maxAge,
    domain:
      process.env.NEXT_PUBLIC_ENVIRONMENT === "local"
        ? "localhost"
        : process.env.NEXT_PUBLIC_COOKIE_DOMAIN_NAME,
    secure: true,
  });
};

export const removeCookiesByName = (name) => {
  deleteCookie(name, {
    path: "/",
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN_NAME,
  });
};
export const getCookiesByName = (referralcode) => {
  return getCookie(referralcode);
};
export const getCookies = () => {
  return getCookie(cookie_token);
};
export const getSourceCookies = () => {
  return getCookie("fsz");
};

export const removeCookies = () => {
  deleteCookie(cookie_token, {
    path: "/",
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN_NAME,
  });
};
