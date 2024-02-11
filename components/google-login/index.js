import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

import google from "../../images/google.svg";

import style from "./style.module.scss";
import { useRouter } from "next/router";
import { getUser, isUserLoggedIn } from "../../redux/reducers/user_reducer";
import { user_load_by_token_thunk } from "../../redux/thunk/user_thunk";
import { getCookies, setCookies } from "../../utils/cookies";
import { socialLogin } from "../../utils/base-methods";
import Image from "next/image";

function ReactGoogleLogin(props) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const router = useRouter();
  const redirect = router.query.redirect;
  const loginStatus = useSelector(isUserLoggedIn);

  const responseGoogle = async (response) => {
    if (loginStatus && getCookies()) {
      if (redirect) {
        window.open(redirect, "_self");
      } else {
        props?.closePopUP();
      }
    } else {
      if (response.access_token) {
        const token_type = response.token_type ? response.token_type : "";
        const access_token = response.access_token ? response.access_token : "";
        const token = `${token_type} ${access_token}`;
        await handleSignIn(token);
      } else if (response.credential)
        await handleSignIn(`Bearer ${response.credential}`);
    }
  };

  const handleSignIn = async (token) => {
    try {
      const signData = await socialLogin({
        provider: "google",
        token,
      });
      if (signData?.data?.data?.token) {
        dispatch(user_load_by_token_thunk(signData?.data?.data?.token));
        setCookies(signData.data.data.token);
        props?.closePopUP();
      }
    } catch (error) {
      toast.error("An unexpected error occured. Please try again  later");

      console.log(
        "🚀 ~ file: index.js ~ line 92 ~ responseGoogle ~ error",
        error
      );
    }
  };

  const login = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    uxMode: "popup",
  });

  const handleClick = () => {
    login();
  };

  return (
    <>
      <div className={style["social-login-btn-box"]}>
        <button
          onClick={() => handleClick()}
          className={style["login-with-btn"]}
          type="button"
        >
          <Image
            unoptimized={true}
            height={60}
            width={60}
            alt="Google"
            className={style["icon-img"]}
            src={google}
          ></Image>
        </button>
      </div>
    </>
  );
}

const GoogleLogin = (closePopUP = () => {}) => {
  const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={client_id} className="signup_button">
      <ReactGoogleLogin {...closePopUP} />
    </GoogleOAuthProvider>
  );
};
export default GoogleLogin;
