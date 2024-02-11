import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { user_load_by_token_thunk } from "../../redux/thunk/user_thunk";
import { LoginOptionTabs, MODAL_TYPES } from "./common";
import InputOTP from "../input-otp";

import style from "./style.module.scss";
import { LoginWithOtp, resendOtpApi } from "../../utils/base-methods";
import { setCookies } from "../../utils/cookies";
import { useRouter } from "next/router";

const VerifyOtp = ({
  show = false,
  toggleModal = () => {},
  modalState = {},
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState(null);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const [resendOTP, setResendOTP] = useState(true);
  const [reLoading, setReLoading] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(false);
  const withOtp = router.query.with;

  let seconds = countDown ? String(countDown % 60).padStart(2, 0) : null;
  let minutes = countDown
    ? String(Math.floor(countDown / 60)).padStart(2, 0)
    : null;

  const handleChangeEmail = () => {
    toggleModal(MODAL_TYPES.LOGIN_WITH_OTP);
  };

  const handleVerifyOTP = async () => {
    setError(null);
    if (otpValue.length === 6) {
      try {
        setVerifyLoading(true);
        const result = await LoginWithOtp({
          email: modalState?.email,
          otp: otpValue,
        });
        setVerifyLoading(false);
        handleLogin(result);
      } catch (error) {
        setVerifyLoading(false);
        setError(
          "It seems you have entered the wrong code. Please check the number(s) you have entered."
        );
      }
    } else {
      setError("Please enter the full OTP received through your email.");
    }
  };

  const handleResendOTP = async () => {
    if (modalState?.email) {
      try {
        setReLoading(true);
        await resendOtpApi(modalState?.email, true);
        setReLoading(false);
        toast.success(
          "Your confirmation email has been sent to your registered email address"
        );
        setResendOTP(false);
        setRunTimer(true);
      } catch (error) {
        setReLoading(false);
        if (error?.data?.message === "email otp locked") {
          toast.error(
            "Account locked for security reasons, please login again after 10 mins"
          );
          setOTPValue("");
          setError(null);
          toggleModal("", {});
        } else {
          toast.error(error?.data?.message);
        }
      }
    }
  };

  const handleLogin = (result) => {
    result?.message && setError(result?.message);
    if (result?.data?.status === 200) {
      if (result?.data?.data?.gauth) {
        toggleModal(MODAL_TYPES.VERIFY_GOOGLE_OTP, {
          type: "OTP",
          email: modalState?.email,
          key: result?.data?.data?.secret_key,
        });
      } else {
        setCookies(result?.data?.data?.token);
        setNavigate(true);
        dispatch(user_load_by_token_thunk(result.data.data.token));
        toggleModal();
      }
    }
  };

  useEffect(() => {
    let timerId;
    if (runTimer) {
      setCountDown(60 * 1);
      timerId = setInterval(() => {
        setCountDown((countDown) => (countDown - 1 > 0 ? countDown - 1 : 0));
        if (countDown - 1 === 0) {
          setRunTimer(false);
          setResendOTP(true);
          setReLoading(false);
        }
      }, 1000);
    } else {
      clearInterval(timerId);
      setResendOTP(true);
    }
    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runTimer]);

  return (
    <Modal
      show={show}
      animation={false}
      contentClassName={style["verify-otp-modal"]}
      centered
    >
      <Modal.Header
        className={style["verify-otp-modal-header"]}
        onHide={toggleModal}
        closeButton
        closeVariant="white"
      >
        <span className="fs-4">Verify OTP</span>
      </Modal.Header>
      <Modal.Body className={style["verify-otp-modal-body"]}>
        <LoginOptionTabs
          activeTab={modalState?.modalType || MODAL_TYPES.LOGIN_WITH_PASSWORD}
          onClick={!withOtp && toggleModal}
        />
        {modalState?.email && (
          <div className={`${style["input-block-row"]}`}>
            <div className={style["input-block"]}>
              <p className="mb-0 text-dark">{`Please enter the OTP sent to`}</p>
              <p className="text-dark fw-bold">{modalState?.email}</p>
            </div>
            {!withOtp && (
              <a
                className={`${style["link"]} ${style["link-orange"]} ms-auto`}
                onClick={() => handleChangeEmail()}
              >
                Change
              </a>
            )}
          </div>
        )}
        <div className={style["input-block"]}>
          <InputOTP onChange={(e) => setOtpValue(e)} value={otpValue} />
        </div>
        <div className={style["input-block"]}>
          <p className="text-dark mt-4">
            {`By Proceeding Further & Clicking on 'Continue' You Agree to
            Jump.trade's`}{" "}
            <a
              target="_blank"
              onClick={() =>
                window.open(
                  `${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/terms-and-conditions`
                )
              }
              className={`${style["link"]} ${style["link-orange"]}`}
            >{`Terms & Conditions`}</a>
          </p>
        </div>
        <div className={style["button-block"]}>
          <button
            type="button"
            className="bl_btn"
            onClick={handleVerifyOTP}
            disabled={verifyLoading || navigate}
          >
            {navigate ? (
              "Verified Successfully, please wait..."
            ) : (
              <>{verifyLoading ? "Verifying..." : "Continue"}</>
            )}
          </button>
        </div>
        {error && <p className="text-danger text-center">{error}</p>}
        <p className="text-center text-dark">
          {resendOTP ? "" : "Please wait  "}
          {resendOTP ? (
            reLoading ? (
              "Sending email..."
            ) : (
              <>
                {" "}
                {`Didn't receive ?`}{" "}
                <span
                  className={`${style["link"]} ${style["link-blue"]}`}
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </span>{" "}
              </>
            )
          ) : (
            <>
              {minutes && seconds && (
                <>
                  {" "}
                  {minutes}:{seconds}
                </>
              )}
            </>
          )}
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default VerifyOtp;
