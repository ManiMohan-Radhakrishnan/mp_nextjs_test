import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

import {
  user_load_by_token_thunk,
  user_login_with_email_thunk,
} from "../../redux/thunk/user_thunk";
import {
  isLoading,
  isUserLoggedIn,
  loginReset,
} from "../../redux/reducers/user_reducer";
import { LoginErrorInfo, LoginOptionTabs, MODAL_TYPES } from "./common";

import style from "./style.module.scss";
import { verifyGoogleOtpApi } from "../../utils/base-methods";
import InputOTP from "../input-otp";
import { setCookies } from "../../utils/cookies";

const LoginWithGoogleOtp = ({
  show = false,
  toggleModal = () => {},
  modalState = {},
}) => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const [otpValue, setOtpValue] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleVerifyOTP = async () => {
    setLoginError(null);
    if (otpValue.length === 6) {
      try {
        setVerifyLoading(true);
        const payload = {
          otp_code: otpValue,
          secret_key: modalState.key,
          email: modalState.email,
        };
        const result = await verifyGoogleOtpApi(payload);
        setCookies(result.data.data.token);
        setVerifyLoading(false);
        toggleModal();
        dispatch(user_load_by_token_thunk(result.data.data.token));
      } catch (error) {
        setVerifyLoading(false);
        setLoginError(
          "It seems you have entered the wrong code. Please check the number(s) you have entered."
        );
        console.log(
          "🚀 ~ file: index.js ~ line 172 ~ handleVerifyOTP ~ error",
          error
        );
      }
    } else {
      setLoginError(
        "Please enter the 6-digit-code from your Authenticator App."
      );
    }
  };

  return (
    <Modal
      show={show}
      animation={false}
      contentClassName={style["login-modal"]}
      className="login-modal-main"
      centered
    >
      <Modal.Header
        className={style["login-modal-header"]}
        onHide={toggleModal}
        closeButton
        closeVariant="white"
      ></Modal.Header>
      <Modal.Body className={style["login-modal-body"]}>
        <LoginOptionTabs
          activeTab={MODAL_TYPES.LOGIN_WITH_PASSWORD}
          onClick={toggleModal}
        />
        <p className="text-dark text-center fs-5">
          Enter 6-digit-code from your Google Authenticator App
        </p>
        <div className={style["input-block"]}>
          <InputOTP
            onChange={(e) => setOtpValue(e)}
            value={otpValue}
            hideLabel
          />
        </div>
        <div className={style["button-block"]}>
          <button
            type="button"
            className={style["login-btn"]}
            onClick={handleVerifyOTP}
            disabled={loading || verifyLoading}
          >
            {verifyLoading ? "Verifying..." : "Verify"}
          </button>
        </div>
        {loginError && <LoginErrorInfo error={loginError} />}
      </Modal.Body>
    </Modal>
  );
};

export default LoginWithGoogleOtp;
