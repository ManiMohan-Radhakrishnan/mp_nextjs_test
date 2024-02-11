import baseAxios from "./axios-base-utils";
import appAxios from "./axios-utils";

import axios from "axios";
// import { ParamsSerialize } from "./common";

import { ParamsSerialize } from "./params-serialize";

export const registerApi = (props) =>
  baseAxios.post("/register", { user: { ...props } });

export const signOutApi = () => baseAxios.delete("/logout");

export const userApi = (token) =>
  baseAxios.get("/users/me", { headers: { Authorization: token } });

export const socialLogin = ({ provider, token, email }) =>
  baseAxios.post(
    "/social_login",
    { provider, source: "web", email },
    { headers: { Authorization: token } }
  );

export const getNotificationApi = (page) =>
  baseAxios.get(`/users/notifications?page=${page}`);

export const readNotificationApi = () =>
  baseAxios.post("/users/notification_read");

export const creatorApplicationApi = (input) =>
  baseAxios.post(`/creator_register`, input);

export const reachOutMailerApi = (details) =>
  baseAxios.post("/reach_out_mailer", details);

export const getServerTimeApi = () =>
  axios.get(
    `${process.env.NEXT_PUBLIC_BASE_SERVER_URL.replace("api/v1", "")}/time`
  );

export const artistApi = (slug) => baseAxios.get(`/celebrities/${slug}`);

export const subscribeApi = (
  email,
  accepted_terms_and_condition = false,
  source,
  fsz
) =>
  baseAxios.post("/subscribe_emails", {
    subscribe_emails: { email, accepted_terms_and_condition, source, fsz },
  });

export const tournamentsApi = () => baseAxios.get("/tournaments");

export const tournamentscheduleListApi = (category) => {
  return baseAxios.get(`/tournaments/${category}/list`);
};

export const topEarners = () => baseAxios.get("/top_earners");

export const downloadApk = (source) =>
  baseAxios.get(`/download_files/${source}`);

export const releaseNotesApi = (category) =>
  baseAxios.get(`/release_notes?category=${category}`);

// export const signInApi = (props) =>
//   baseAxios.post("/login", { ...props, source: "web" });

export const signInApi = (props) =>
  baseAxios.post("/user_login", { ...props, source: "web" });

export const verifyGoogleOtpApi = (props) =>
  baseAxios.post("/verify_google_otp", { ...props });

export const LoginWithOtp = (props) =>
  baseAxios.post("/login_with_otp", { ...props, source: "web" });

export const resendOtpApi = (email, login_with_otp = false) =>
  baseAxios.post("/resend_email_otp", { email, login_with_otp, source: "web" });

export const xena = (props) =>
  baseAxios.post("/xena_registration", { ...props });

export const trackIP = () => baseAxios.get("https://geolocation-db.com/json/");

export const forgotPasswordApi = (email) =>
  baseAxios.post(`/forgot_password`, { email });

export const SendEmailOtp = (props) =>
  baseAxios.post("/send_email_otp", { ...props, source: "web" });

export const GetLootDetails = (slug) => appAxios.get(`/loots/${slug}`);

export const ippoCreateOrder = (amount) =>
  baseAxios.post("/payments/ippopay/create_order", { amount });

export const ippoUpdateOrder = (order_id) =>
  baseAxios.put("/payments/ippopay/order_status", { order_id });

export const leaderBoardListApi = (slug) =>
  baseAxios.get(`tournaments/leader_board`, {
    params: {
      slug: slug,
    },
    paramsSerializer: (params) => {
      return ParamsSerialize(params);
    },
  });

export const activeCodesTour = (slug) => baseAxios.get(`/tournaments/${slug}`);

export const activeCodeBuyApi = (slug, request) =>
  baseAxios.post(`/tournaments/${slug}/activation_codes`, request);

export const getTournamentSchedule = () =>
  baseAxios.get("tournaments/today_schedule");

export const fetchAllowedAssets = () => baseAxios.get(`/asserts/buy_allowed`);

export const fireBlockFetchAddress = () =>
  baseAxios.post("/payments/fireblock/fetch_address");

export const fireBlockRefresh = () =>
  baseAxios.post("/payments/fireblock/refresh");

export const getRentalNfts = (q) =>
  appAxios.get(`/rents/mcl_players${q ? "?" + q : ""}`.trim());
// appAxios.get(`/rents/mcl_players?${q}`);

export const getRentalBats = (q) =>
  appAxios.get(`/rents/mcl_bats${q ? "?" + q : ""}`.trim());
// appAxios.get(`/rents/mcl_bats`, { params: { q } });

export const getRentedNftList = ({ slug, category }) => {
  return appAxios.get(`/rents/detail/${category}/${slug}`);
};

export const rentNft = (request) => appAxios.post(`/nfts/rent`, request);
export const offlinePaymentsDetails = () =>
  baseAxios.get("/payments/offline_payments/details");

export const offlinePaymentsConvert = (amount) =>
  baseAxios.get(`/payments/offline_payments/approx_usd?amount=${amount}`);

export const offlinePaymentsSubmit = (props) =>
  baseAxios.post("/payments/offline_payments", { ...props });

export const offlinePaymentsCancel = (deposit_slug) =>
  baseAxios.post(
    `/payments/offline_payments/cancel?deposit_slug=${deposit_slug}`
  );

export const getUpgradeActiveSaleDetails = ({ randomValue, page }) => {
  return appAxios.get(`/histories/${randomValue}?page=${page}`);
};

export const getHomePageRentalPlayers = (type) => {
  return appAxios.get(`/rents/mcl_players`, {
    params: {
      nftType: type?.nftType,
      "q[role_in]": type?.role,
    },
    paramsSerializer: (params) => {
      return ParamsSerialize(params);
    },
  });
};
