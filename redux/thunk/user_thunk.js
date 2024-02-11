import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  GetLootDetails,
  signInApi,
  signOutApi,
  userApi,
  SendEmailOtp,
  activeCodesTour,
  activeCodeBuyApi,
  getTournamentSchedule,
  downloadApk,
} from "../../utils/base-methods";
import { lootBoxBuyApi, lootBoxPrebookApi } from "../../utils/methods";
import { removeCookies, getCookies, setCookies } from "../../utils/cookies";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  loginWithGoogleOTP,
  loginWithOTP,
  logout,
  setAndroidAPK,
  setWindowsEXE,
  marketLive,
  marketLiveOff,
} from "../reducers/user_reducer";

export const user_login_thunk = ({ data = {}, callback = () => {} } = {}) => {
  return async (dispatch) => {
    let response = {};
    try {
      dispatch(loginRequest());
      const result = await signInApi(data);
      response.status = result?.status;
      if (result?.status === 200) {
        if (result?.data?.data?.gauth) {
          response.key = result?.data?.data?.secret_key;
          response.googleOtp = true;
          dispatch(loginWithGoogleOTP());
        } else if (result.data.message === "verification required") {
          response.otp = true;
          dispatch(loginWithOTP());
        } else {
          setCookies(result.data.data.token);
          try {
            const user = await userApi(result.data.data.token);
            dispatch(loginSuccess(user.data.data));
          } catch (u_err) {
            if (u_err?.status === 401) {
              response.message = "Invalid credential(s)";
            } else {
              toast.error(
                "An unexpected error occured. Please try again later"
              );
            }
            dispatch(loginFailure(u_err));
          }
        }
      }
      callback(response);
    } catch (err) {
      response.status = err?.status;
      if (err?.status === 422) {
        if (err?.data?.message === "email otp locked") {
          response.message =
            "Account lock for security reasons, please login again after 10 mins";
        } else if (err?.data?.message === "OTP has already been sent") {
          response.message = "Redirecting you to OTP screen...";
          response.otp = true;
          dispatch(loginWithOTP());
        } else {
          response.message = "Invalid credential(s)";
        }
      } else if (err?.status === 406) {
        response.message = "Invalid credential(s)";
        if (err?.data.message === "login locked")
          response.message = "login-locked";
        else response.message = "confirm-email";
      } else {
        toast.error("An unexpected error occured. Please try again  later");
      }
      dispatch(loginFailure(err));
      callback(response);
    }
  };
};

export const user_login_with_email_thunk = ({
  data = {},
  callback = () => {},
} = {}) => {
  return async (dispatch) => {
    let response = {};
    try {
      dispatch(loginRequest());
      const result = await SendEmailOtp(data);
      response.status = result?.data?.status;
      if (result?.data?.status === 200) {
        response.otp = true;
        dispatch(loginWithOTP());
      }
      callback(response);
    } catch (err) {
      response.status = err?.status;
      if (err?.status === 422) {
        if (err?.data?.message === "email otp locked") {
          response.message =
            "Account lock for security reasons, please login again after 10 mins";
        } else if (err?.data?.error_code == 1001) {
          response.message =
            "Your email id does not exists, please signup and try again.";
        } else if (err?.data?.error_code == 1002) {
          response.otp = true;
        }
      } else if (err?.status === 406) {
        if (err?.data.message === "login locked")
          response.message = "login-locked";
        else response.message = "confirm-email";
      } else {
        toast.error("An unexpected error occured. Please try again  later");
      }
      dispatch(loginFailure(err));
      callback(response);
    }
  };
};

export const user_logout_thunk = () => {
  return async (dispatch) => {
    try {
      const token = getCookies();
      if (token) await signOutApi();
    } catch (err) {
      console.log("🚀 ~ file: user_thunk.js ~ line 58 ~ return ~ err", err);
    }
    removeCookies();
    dispatch(logout());
  };
};

export const user_load_by_token_thunk = (token) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      const user = await userApi(token);

      dispatch(loginSuccess(user.data.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const market_live_thunk = () => {
  return async (dispatch) => {
    dispatch(marketLive());
  };
};

export const market_live_off_thunk = () => {
  return async (dispatch) => {
    dispatch(marketLiveOff());
  };
};

export const loot_details_thunk = createAsyncThunk(
  "loot/details",
  async (request = {}) => {
    try {
      let { data, callback = null } = request;
      let { slug = "" } = data;
      const result = await GetLootDetails(slug);
      // console.log("RESPONSE", result);
      callback(result);
    } catch (error) {
      console.log("Error in loot/details");
      callback(error?.response);
    }
  }
);

export const active_code_thunk = createAsyncThunk(
  "loot/details",
  async (request = {}) => {
    try {
      let { data, callback = null } = request;
      let { slug = "" } = data;
      const result = await activeCodesTour(slug);
      callback(result);
    } catch (error) {
      console.log("Error in loot/details");
      callback(error?.response);
    }
  }
);

export const loot_prebook_thunk = createAsyncThunk(
  "loot/pre-book",
  async (request = {}, thunkAPI) => {
    let { data, callback = null } = request;
    try {
      let { slug = "", ...rest } = data;
      const response = await lootBoxPrebookApi(slug, rest);
      const token = getCookies();
      if (response?.status === 200)
        thunkAPI.dispatch(user_load_by_token_thunk(token));
      callback && callback(response);
    } catch (error) {
      console.log("Error in loot/pre-book", error);
      callback && callback(error?.response);
    }
  }
);

export const loot_buy_thunk = createAsyncThunk(
  "loot/buy",
  async (request = {}, thunkAPI) => {
    let { data, callback = null } = request;
    try {
      let { slug = "", ...rest } = data;
      const response = await lootBoxBuyApi(slug, rest);
      const token = getCookies();
      if (response?.status === 200)
        thunkAPI.dispatch(user_load_by_token_thunk(token));
      callback && callback(response);
    } catch (error) {
      console.log("Error in loot/buy", error);
      callback && callback(error?.response);
    }
  }
);

export const downloadMCLGame = createAsyncThunk(
  "download_files/game",
  async (type, thunkAPI) => {
    try {
      const result = await downloadApk(type);

      if (type == "android") {
        thunkAPI.dispatch(
          setAndroidAPK(result?.data?.data?.download_details?.download_file)
        );
      }
      // if (type == "windows") {
      //   thunkAPI.dispatch(
      //     setWindowsEXE(result?.data?.data?.download_details?.download_file)
      //   );
      // }
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js ~ 254 ~ downloadMCLGame ~ error",
        error?.data?.message
      );
    }
  }
);

export const active_code_buy_thunk = createAsyncThunk(
  "loot/buy",
  async (request = {}, thunkAPI) => {
    let { data, callback = null } = request;
    try {
      let { slug = "", ...rest } = data;
      const response = await activeCodeBuyApi(slug, rest);
      const token = getCookies();
      if (response?.status === 200)
        thunkAPI.dispatch(user_load_by_token_thunk(token));
      callback && callback(response);
    } catch (error) {
      console.log("Error in loot/buy", error);
      callback && callback(error);
    }
  }
);

export const tournamentDetails = createAsyncThunk(
  "tournaments/schedule",
  async ({ callback }) => {
    try {
      const response = await getTournamentSchedule();
      callback(response);
    } catch (err) {
      console.log("Error in tournament/schedule", err);
      callback(err?.response);
    }
  }
);
