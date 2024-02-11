import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

import { getCookies } from "../../utils/cookies";
import { user_login_thunk } from "../../redux/thunk/user_thunk";
import {
  isLoading,
  isUserLoggedIn,
  loginReset,
} from "../../redux/reducers/user_reducer";
import { validateEmail } from "../../utils/common";
import { LoginErrorInfo, LoginOptionTabs, MODAL_TYPES } from "./common";

import InputText from "../input-text";
import GoogleLogin from "../google-login";

import style from "./style.module.scss";

const LoginWithPassword = ({
  show = false,
  toggleModal = () => {},
  modalState = {},
}) => {
  const dispatch = useDispatch();
  const loginStatus = useSelector(isUserLoggedIn);
  const loading = useSelector(isLoading);
  const [loginInfo, setLoginInfo] = useState({
    email: modalState?.email || "",
    password: "",
  });
  const [captcha, setCaptcha] = useState(false);
  // const [key, setKey] = useState(false);
  const [validation, setValidation] = useState({
    email: false,
    email_empty: false,
    password: false,
    password_empty: false,
    captcha: false,
  });
  const [loginError, setLoginError] = useState(null);

  const validateInputs = () => {
    let validatedInputs = { ...validation };
    if (!captcha && process.env.NEXT_PUBLIC_ENVIRONMENT !== "local")
      validatedInputs = { ...validatedInputs, captcha: true };
    if (!validateEmail(loginInfo?.email))
      validatedInputs = {
        ...validatedInputs,
        email: true && !!loginInfo?.email,
        email_empty: !loginInfo?.email,
      };
    if (loginInfo?.password?.length < 6)
      validatedInputs = {
        ...validatedInputs,
        password: true && !!loginInfo?.password,
        password_empty: !loginInfo?.password,
      };
    setValidation(validatedInputs);

    if (
      !validatedInputs.email &&
      !validatedInputs.email_empty &&
      !validatedInputs.password &&
      !validatedInputs.password_empty &&
      !validatedInputs.captcha
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (e, stateKey) => {
    if (stateKey === "captcha") {
      setCaptcha(e);
      setValidation({
        ...validation,
        [stateKey]: false,
      });
      return;
    }
    setLoginInfo({ ...loginInfo, [stateKey]: e?.target?.value });
    setValidation({
      ...validation,
      [stateKey]: false,
      [`${stateKey}_empty`]: !e?.target?.value,
    });
  };

  const handleLogin = () => {
    if (validateInputs()) {
      dispatch(
        user_login_thunk({ data: loginInfo, callback: dispatchCallback })
      );
    }
  };

  const dispatchCallback = (result) => {
    let modalType = result?.googleOtp
      ? MODAL_TYPES.VERIFY_GOOGLE_OTP
      : result.otp
      ? MODAL_TYPES.VERIFY_OTP
      : null;
    result?.message && setLoginError(result?.message);
    // result?.key && setKey(result?.key);
    if (result?.status === 200) {
      modalType
        ? toggleModal(modalType, { email: loginInfo?.email, key: result?.key })
        : toggleModal();
    } else if (result?.status === 422 && modalType) {
      toggleModal(modalType, { email: loginInfo?.email, key: result?.key });
    }
  };

  useEffect(() => {
    if (!(loginStatus && getCookies())) {
      dispatch(loginReset());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      show={show}
      animation={false}
      contentClassName={`${style["login-modal"]} login-modal`}
      className="login-modal-main"
      centered
    >
      <Modal.Header
        className={style["login-modal-header"]}
        onHide={toggleModal}
        closeButton
        closeVariant="white"
      >
        <span className="fs-4">Sign In</span>
      </Modal.Header>
      <Modal.Body className={style["login-modal-body"]}>
        <LoginOptionTabs
          activeTab={MODAL_TYPES.LOGIN_WITH_PASSWORD}
          onClick={toggleModal}
        />
        <div className={style["input-block"]}>
          <InputText
            title="Email Address"
            type="email"
            value={loginInfo.email}
            onChange={(e) => handleChange(e, "email")}
            error={validation?.email}
            errorMessage={"Please enter a valid email address"}
            required={validation.email_empty}
          />
        </div>
        <div className={style["input-block"]}>
          <InputText
            title="Password"
            type="password"
            value={loginInfo.password}
            onChange={(e) => handleChange(e, "password")}
            error={validation?.password}
            errorMessage={"Password not long enough"}
            required={validation.password_empty}
          />
          <p
            className={`${style["link"]} ${style["link-orange"]} ${style["forgot-password"]}`}
            onClick={() => toggleModal(MODAL_TYPES.FORGOT_PASSWORD)}
          >
            Forgot Password
          </p>
        </div>
        <div className={style["input-block"]}>
          <ReCAPTCHA
            className={style["recaptcha_box"]}
            sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY}
            onChange={(e) => handleChange(e, "captcha")}
          />
          {validation?.captcha && (
            <p className="text-danger">Please verify the CAPTCHA to proceed</p>
          )}
        </div>
        <div className={style["input-block"]}>
          <p className="text-dark">
            {`By Proceeding Further & Clicking on 'Sign In' You Agree to
            Jump.trade's`}{" "}
            <a
              target="_blank"
              onClick={() =>
                window.open(
                  `${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/terms-and-conditions`
                )
              }
              className={`${style["link"]} ${style["link-orange"]}`}
            >{`Terms & Conditions.`}</a>
          </p>
        </div>
        <div className={style["button-block"]}>
          <button
            type="button"
            className={style["login-btn"]}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>
        {loginError && <LoginErrorInfo error={loginError} />}
        <div className={style["social-login-block"]}>
          <h5 className={style["social_OR"]}>or</h5>
          <p className={style["login-with-heading"]}>Sign In with</p>
          <div className={style["social-login-btn-block"]}>
            <GoogleLogin closePopUP={toggleModal} />
          </div>
        </div>
        <p className="text-center">
          <span className="text-dark">{`Don't have an account ?`}</span>
          <span
            className={`${style["link"]} ${style["link-blue"]}`}
            onClick={() => toggleModal(MODAL_TYPES.REGISTER)}
          >
            &nbsp;Sign Up
          </span>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default LoginWithPassword;
