import { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { validateEmail } from "../../utils/common";
import { MODAL_TYPES } from "./common";
import InputText from "../input-text";
import { forgotPasswordApi } from "../../utils/base-methods";

import style from "./style.module.scss";

const SuccessInfo = ({ toggleModal }) => (
  <div className="form-cntnt-box text-dark">
    <h4>{`We've Sent A Mail To Reset Your Password!`}</h4>
    <p>
      Check your email and follow the simple procedures to reset your password.
    </p>
    <p className="mb-4">
      The reset password link is valid only for 10 minutes! Act fast to regain
      your access to your account!
    </p>
    <p className="mb-4">
      Please{" "}
      <a
        onClick={() => toggleModal(MODAL_TYPES.LOGIN_WITH_PASSWORD)}
        className={style["login-nav"]}
      >
        click here{" "}
      </a>
      to login
    </p>
  </div>
);

const ForgotPassword = ({
  show = false,
  toggleModal = () => {},
  modalState = {},
}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({
    email: false,
    email_empty: false,
  });
  const [success, setSuccess] = useState(false);

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

  const handleSubmit = async () => {
    if (validateInputs()) {
      try {
        setLoading(true);
        const result = await forgotPasswordApi(email);
        result.status === 200 && setSuccess(true);
        setLoading(false);
      } catch (err) {
        toast.error("An unexpected error occured. Please try again ");
        setLoading(false);
      }
    }
  };

  return (
    <Modal
      show={show}
      animation={false}
      contentClassName={`${style["forgot-password-modal"]} forgot-password-modal`}
      className="forgot-password-modal-main"
      centered
    >
      <Modal.Header
        className={style["forgot-password-modal-header"]}
        onHide={toggleModal}
        closeButton
        closeVariant="white"
      >
        <span className="fs-4">Forgot Password</span>
      </Modal.Header>
      <Modal.Body className={style["forgot-password-modal-body"]}>
        {success ? (
          <SuccessInfo toggleModal={toggleModal} />
        ) : (
          <>
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
            <div className={`${style["button-block"]} mt-4`}>
              <button
                disabled={loading}
                type="button"
                className="bl_btn"
                onClick={handleSubmit}
              >
                {"Send Email"}
              </button>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPassword;
