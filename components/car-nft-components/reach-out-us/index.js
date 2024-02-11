import React, { useEffect, useState } from "react";

import {
  ValidateTelegramUsername,
  formValidateName,
  formValidateTelegram,
  validInternationalPhone,
  validateEmail,
  validateName,
  validatePhone,
  validateTelegramId,
} from "../../../utils/common";
import { toast } from "react-toastify";

import style from "./style.module.scss";
import Image from "next/image";
import ReachOutBg from "../../../images/mcl-product/reach-at-background.png";
import { Modal, Table } from "react-bootstrap";
import { BiX } from "react-icons/bi";
import TextArea from "../../text-area";
import InputText from "../../input-text";
import { reachOutMailerApi, trackIP } from "../../../utils/base-methods";
import Link from "next/link";
import InputPhone from "../../InputPhone";
import ReCAPTCHA from "react-google-recaptcha";

const ReachOutUs = () => {
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("");
  // const [captcha, setCaptcha] = useState(false);

  const [register, setRegister] = useState({
    name: "",
    email: "",
    phone_no: "",
    phone_code: "",
    telegram_id: "",
    message: "",
    // captcha: "",
  });
  const [countryCode, setCountryCode] = useState(null);

  const [validation, setValidation] = useState({
    name: false,
    email: false,
    phone_no: false,
    telegram_id: false,
    message: false,
    valid_name: false,
    valid_email: false,
    valid_phone_no: false,
    valid_telegram_id: false,
    valid_message: false,
    valid_captcha: false,
    valid_phone_code: false,
  });

  useEffect(() => {
    getLocationDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log("validation", validation);
  const handleChangeEvent = (e) => {
    if (e.target.value) {
      if (e.target.name === "name") {
        if (formValidateName(e.target.value)) {
          setRegister({
            ...register,
            [e.target.name]: e.target.value,
          });
          setValidation({ ...validation, [e.target.name]: false });
        }
      } else if (e.target.name === "telegram_id") {
        if (formValidateTelegram(e.target.value)) {
          setRegister({
            ...register,
            [e.target.name]: e.target.value,
          });
          setValidation({ ...validation, [e.target.name]: false });
        }
      } else {
        setRegister({ ...register, [e.target.name]: e.target.value });
        setValidation({ ...validation, [e.target.name]: false });
      }
    } else {
      setRegister({ ...register, [e.target.name]: e.target.value });
      setValidation({ ...validation, [e.target.name]: true });
    }
  };

  // const handleChange = (e, stateKey) => {
  //   if (stateKey === "captcha") {
  //     setCaptcha(e);
  //     setValidation({
  //       ...validation,
  //       [stateKey]: false,
  //     });
  //     return;
  //   }
  //   setRegister({ ...register, [stateKey]: e?.target?.value });
  //   setValidation({
  //     ...validation,
  //     [stateKey]: false,
  //     [`valid_${stateKey}`]: !e?.target?.value,
  //   });
  // };

  const checkValidation = () => {
    let c_validation = { ...validation };
    if (!register.name) {
      c_validation = { ...c_validation, name: true };
    } else {
      if (formValidateName(register.name)) {
        c_validation = { ...c_validation, valid_name: false };
      } else {
        c_validation = { ...c_validation, valid_name: true };
      }
    }

    if (!register.email) {
      c_validation = { ...c_validation, email: true };
    } else {
      if (validateEmail(register.email)) {
        c_validation = { ...c_validation, valid_email: false };
      } else {
        c_validation = { ...c_validation, valid_email: true };
      }
    }

    if (!register.telegram_id) {
      c_validation = {
        ...c_validation,
        telegram_id: false,
        valid_telegram_id: false,
      };
    } else {
      if (register.telegram_id) {
        if (!ValidateTelegramUsername(register.telegram_id)) {
          c_validation = { ...c_validation, valid_telegram_id: true };
        } else {
          c_validation = { ...c_validation, valid_telegram_id: false };
        }
      }
    }

    if (!register.phone_no || register.phone_no === countryCode?.dialCode) {
      c_validation = {
        ...c_validation,
        phone_no: false,
        valid_phone_no: false,
      };
    } else {
      if (validInternationalPhone(register.phone_no, register.phone_code)) {
        c_validation = { ...c_validation, valid_phone_no: false };
      } else {
        c_validation = { ...c_validation, valid_phone_no: true };
      }
    }

    if (!register.message) {
      c_validation = { ...c_validation, valid_message: true };
    } else {
      c_validation = { ...c_validation, valid_message: false };
    }

    // if (!register.captcha) {
    //   c_validation = { ...c_validation, valid_captcha: true };
    // } else {
    //   c_validation = { ...c_validation, valid_captcha: false };
    // }
    setValidation(c_validation);
    if (
      !c_validation.valid_email &&
      !c_validation.valid_phone_no &&
      !c_validation.valid_message &&
      !c_validation.valid_name &&
      !c_validation.valid_telegram_id &&
      !c_validation.valid_captcha
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmit = async () => {
    if (checkValidation()) {
      try {
        setLoading(true);
        setError("");

        const { name, email, phone_no, telegram_id, message } = register;

        let contactDetails = {
          name: name,
          email: email,
          message: message,
          phone:
            !register.phone_no || register.phone_no === countryCode?.dialCode
              ? ""
              : phone_no,
          telegram_id: telegram_id?.length === 0 ? "" : telegram_id,
          // captcha: captcha,
        };

        const result = await reachOutMailerApi(contactDetails);

        if (result.status === 201) {
          //   setRegisterSuccess(true);
          setLoading(false);
          toast.success(result?.data?.message);
          setModalShow(false);

          setRegister({
            name: "",
            email: "",
            phone_no: "",
            telegram_id: "",
            message: "",
          });
          // handleClose();
          //document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
      } catch (err) {
        // console.log("err", err);
        setLoading(false);
        toast.error("An unexpected error occured. Please try again ");
      }
    } else {
      setError("Please fill all the required fields");
    }
  };

  const handleClose = () => {
    setModalShow(false);
    setRegister({
      name: "",
      email: "",
      phone_no: "",
      telegram_id: "",
      message: "",
    });
    setValidation({
      name: false,
      email: false,
      phone_no: false,
      telegram_id: false,
      message: false,
      valid_name: false,
      valid_email: false,
      valid_phone_no: false,
      valid_telegram_id: false,
      valid_message: false,
      valid_captcha: false,
      valid_phone_code: false,
    });
    setLoading(false);
  };

  const getLocationDetails = async () => {
    try {
      const result = await trackIP();
      const ip_code = result.data?.country_code;
      if (ip_code) setCountry(ip_code.toLowerCase());
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js ~ line 70 ~ getLocationDetails ~ error",
        error
      );
    }
  };

  return (
    <>
      <section className={style["reach-out-us-section"]}>
        <div className={style["reach-out-us-wrapper"]}>
          <div className={style["reach-out-us-background"]}>
            <Image
              unoptimized={true}
              alt="brand"
              src={ReachOutBg}
              width="100"
              height="100"
            />
            <p>
              Jump.trade gives you the ultimate NFT gaming experience be it as a
              gaming platform or a marketplace! Got a game? We got a platform
              for you! Let&apos;s Connect!
            </p>
          </div>

          <div className={style["reach-out-us-btn-wrappper"]}>
            <Link legacyBehavior href="/">
              Go to Marketplace
            </Link>
            <button
              className={style["fill-out"]}
              onClick={() => {
                setModalShow(true);
              }}
            >
              Reach out us
            </button>
          </div>
        </div>
        <Modal
          size="md"
          centered
          show={modalShow}
          className={style["reach-out-modal"]}
          contentClassName={style["reach-out-modal-content-box"]}
        >
          <Modal.Header
            className={`bg-transparent p-0 ${style["reach-out-modal-header"]}`}
          >
            <Modal.Title className="flex-fill">
              <div className={style["reach-out-title-content"]}>
                <div className={style["reach-out-title"]}>Reach out us</div>
                <div className={"reach-out-filter"}>
                  <BiX
                    role="button"
                    style={{ color: "#fff" }}
                    size={25}
                    onClick={handleClose}
                  />
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputText
              title="Name"
              name="name"
              value={register.name}
              required={validation.name}
              onChange={handleChangeEvent}
            />
            <InputText
              title="Email Address"
              type="email"
              name="email"
              value={register.email}
              required={validation.email}
              onChange={handleChangeEvent}
            />

            {validation.valid_email && (
              <p className={style["error_text"]}>
                Please enter a valid email address
              </p>
            )}
            <div className="mb-3">
              <InputPhone
                title={"Mobile Number"}
                defaultCountry={country || "in"}
                value={register.phone_no}
                onChange={(e, c_code) => {
                  setRegister({
                    ...register,
                    phone_no: e,
                    phone_code: c_code.countryCode.toUpperCase(),
                  });
                  setCountryCode(c_code);
                  if (e) {
                    setValidation({ ...validation, phone_no: false });
                  } else {
                    setValidation({ ...validation, phone_no: true });
                  }
                }}
              />
            </div>
            {validation.valid_phone_no && (
              <p className={style["error_text"]}>
                Please enter a valid mobile number
              </p>
            )}
            <InputText
              title="Telegram Id"
              name="telegram_id"
              value={register.telegram_id}
              onChange={handleChangeEvent}
            />
            {validation.valid_telegram_id && (
              <p className={style["error_text"]}>
                Please enter a valid telegram Id
              </p>
            )}
            <TextArea
              title={"Message"}
              name={"message"}
              value={register.message}
              required={validation.valid_message}
              onChange={handleChangeEvent}
            />
            {/* <div className={style["input-block"]}>
              <ReCAPTCHA
                className="recaptcha_box"
                sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY}
                onChange={(value) => handleChange(value, "captcha")}
              />
              {validation.valid_captcha && (
                <p className={style["error-text"]}>
                  Please verify the CAPTCHA to proceed
                </p>
              )}
            </div> */}
          </Modal.Body>
          <div className={`${style["btn-block"]}  text-center`}>
            <button
              className={style["submit-btn"]}
              disabled={loading}
              type="button"
              onClick={handleSubmit}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </Modal>
      </section>
    </>
  );
};

export default ReachOutUs;
