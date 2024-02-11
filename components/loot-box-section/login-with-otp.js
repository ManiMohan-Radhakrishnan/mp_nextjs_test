import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";

import { user_login_with_email_thunk } from "../../redux/thunk/user_thunk";
import {
  isLoading,
  isUserLoggedIn,
  loginReset,
} from "../../redux/reducers/user_reducer";
import { validateEmail } from "../../utils/common";
import { getCookies } from "../../utils/cookies";
import { LoginErrorInfo, LoginOptionTabs, MODAL_TYPES } from "./common";

import InputText from "../input-text";
import GoogleLogin from "../google-login";

import style from "./style.module.scss";

const LoginWithOtp = ({
  show = false,
  toggleModal = () => {},
  modalState = {},
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const loginStatus = useSelector(isUserLoggedIn);
  const [email, setEmail] = useState("");
  const [validation, setValidation] = useState({
    email: false,
    email_empty: false,
  });
  const [loginError, setLoginError] = useState(null);
  const emailOtp = router.query.email?.replace(" ", "+");
  const withOtp = router.query.with;

  const validateInputs = () => {
    if (!validateEmail(email)) {
      setValidation({
        email: true && !!email,
        email_empty: !email,
      });
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setEmail(e?.target?.value);
    setValidation({
      email: false,
      email_empty: !e?.target?.value,
    });
  };

  const handleSendOtp = (emailOtp = "") => {
    if (validateEmail(emailOtp)) {
      dispatch(
        user_login_with_email_thunk({
          data: { email: emailOtp },
          callback: dispatchCallback,
        })
      );
    } else {
      if (validateInputs()) {
        dispatch(
          user_login_with_email_thunk({
            data: { email },
            callback: dispatchCallback,
          })
        );
      }
    }
  };

  const dispatchCallback = (result) => {
    result?.message && setLoginError(result?.message);
    if (result?.otp) {
      // let modalType = result?.otp && MODAL_TYPES.VERIFY_OTP;
      // modalType = result?.googlOtp ? MODAL_TYPES.VERIFY_GOOGLE_OTP : modalType;
      toggleModal(MODAL_TYPES.VERIFY_OTP, {
        email: email ? email : emailOtp,
        modalType: MODAL_TYPES.LOGIN_WITH_OTP,
      });
    }
  };

  useEffect(() => {
    if (!(loginStatus && getCookies())) {
      dispatch(loginReset());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (emailOtp && withOtp) {
      setEmail(emailOtp);
      handleSendOtp(emailOtp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailOtp]);

  return (
    <Modal
      show={show}
      animation={false}
      contentClassName={`${style["login-otp-modal"]} login-otp-modal`}
      className="login-otp-modal-main"
      centered
    >
      <Modal.Header
        className={style["login-otp-modal-header"]}
        onHide={toggleModal}
        closeButton
        closeVariant="white"
      >
        <span className="fs-4">Sign In with OTP</span>
      </Modal.Header>
      <Modal.Body className={style["login-otp-modal-body"]}>
        <LoginOptionTabs
          activeTab={MODAL_TYPES.LOGIN_WITH_OTP}
          onClick={toggleModal}
        />
        <div className={style["input-block"]}>
          <InputText
            title="Email Address"
            type="email"
            value={email}
            onChange={(e) => handleChange(e)}
            error={validation?.email}
            errorMessage={"Please enter a valid email address"}
            required={validation?.email_empty}
          />
        </div>
        <div className={style["button-block"]}>
          <button
            type="button"
            className={style["login-btn"]}
            onClick={handleSendOtp}
            disabled={loading}
          >
            Request OTP
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
        <div>
          <p className="w-100 text-center">
            <span className={"text-dark"}>{`Don't have an account?`}</span>
            <span
              className={`${style["link"]} ${style["link-blue"]}`}
              onClick={() => toggleModal(MODAL_TYPES.REGISTER)}
            >
              &nbsp;Sign Up
            </span>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginWithOtp;
