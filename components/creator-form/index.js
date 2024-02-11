import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

import AppHelmet from "../helmet";
import creator_bg from "../../images/creator-from.jpg";
import { creatorApplicationApi } from "../../utils/base-methods";
import {
  validateName,
  validateNameReplace,
  validateEmail,
  validInternationalPhone,
  validateURL,
} from "../../utils/common";

import style from "./style.module.scss";

import { useRouter } from "next/router";
import InputPhone from "../InputPhone";
import InputText from "../input-text";
import images from "../../utils/images-new.json";
import { FaFileAlt, FaPlusCircle } from "react-icons/fa";
import { Accordion, Form } from "react-bootstrap";
import TextArea from "../text-area";
import Select from "react-select";

const CreatorForm = () => {
  const sampleFileRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState({ file: null });
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [country, setCountry] = useState("");

  const professionList = [
    { role: "Game Developer" },
    { role: "Game Studio" },
    { role: "Brand" },
    { role: "Celebrity" },
    { role: "Artist" },
  ];

  const router = useRouter();

  const [overSize, setOverSize] = useState();

  const [register, setRegister] = useState({
    first_name: "",
    last_name: "",
    profession: "",
    company: "",
    email: "",
    phone_code: "",
    phone_no: "",
    facebook_link: "",
    instagram_link: "",
    twitter_link: "",
    user_website_link: "",
    user_game_link: "",
    youtube_link: "",
    creative_creation: "",
  });

  useEffect(() => {
    getLocationDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [validation, setValidation] = useState({
    first_name: false,
    valid_first_name: false,
    last_name: false,
    valid_last_name: false,
    email: false,
    valid_email: false,
    phone_code: false,
    phone_no: false,
    valid_phone_no: false,
    facebook_link: false,
    valid_facebook_link: false,
    instagram_link: false,
    valid_instagram_link: false,
    twitter_link: false,
    valid_twitter_link: false,
    youtube_link: false,
    valid_youtube_link: false,
    valid_user_website_link: false,
    valid_user_game_link: false,
    profession: false,
    company: false,
  });

  const handleChangeEvent = (e) => {
    if (e.target.value) {
      if (e.target.name === "first_name" || e.target.name === "last_name") {
        if (validateName(e.target.value)) {
          setRegister({
            ...register,
            [e.target.name]: validateNameReplace(e.target.value),
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

  const handleCompanyChange = (e, meta) => {
    setValidation({ ...validation, profession: false });
    setRegister({ ...register, profession: e });
  };

  const checkValidation = () => {
    let c_validation = { ...validation };
    if (!register.first_name) {
      c_validation = { ...c_validation, first_name: true };
    } else {
      if (validateName(register.first_name)) {
        c_validation = { ...c_validation, valid_first_name: false };
      } else {
        c_validation = { ...c_validation, valid_first_name: true };
      }
    }

    if (!register.last_name) {
      c_validation = { ...c_validation, last_name: false };
    } else {
      if (validateName(register.last_name)) {
        c_validation = { ...c_validation, valid_last_name: false };
      } else {
        c_validation = { ...c_validation, valid_last_name: true };
      }
    }

    if (!register?.profession) {
      c_validation = { ...c_validation, profession: true };
    } else {
      c_validation = { ...c_validation, profession: false };
    }

    if (!register?.company) {
      c_validation = { ...c_validation, company: true };
    } else {
      c_validation = { ...c_validation, company: false };
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

    if (!register.phone_no) {
      c_validation = { ...c_validation, phone_no: true };
    } else {
      if (validInternationalPhone(register.phone_no, register.phone_code)) {
        c_validation = { ...c_validation, valid_phone_no: false };
      } else {
        c_validation = { ...c_validation, valid_phone_no: true };
      }
    }

    if (register.facebook_link) {
      if (!validateURL(register.facebook_link)) {
        c_validation = { ...c_validation, valid_facebook_link: true };
      } else {
        c_validation = { ...c_validation, valid_facebook_link: false };
      }
    }

    if (register.instagram_link) {
      if (!validateURL(register.instagram_link)) {
        c_validation = { ...c_validation, valid_instagram_link: true };
      } else {
        c_validation = { ...c_validation, valid_instagram_link: false };
      }
    }

    if (register.twitter_link) {
      if (!validateURL(register.twitter_link)) {
        c_validation = { ...c_validation, valid_twitter_link: true };
      } else {
        c_validation = { ...c_validation, valid_twitter_link: false };
      }
    }

    if (register.youtube_link) {
      if (!validateURL(register.youtube_link)) {
        c_validation = { ...c_validation, valid_youtube_link: true };
      } else {
        c_validation = { ...c_validation, valid_youtube_link: false };
      }
    }

    if (register.user_game_link) {
      if (!validateURL(register.user_game_link)) {
        c_validation = { ...c_validation, valid_user_game_link: true };
      } else {
        c_validation = { ...c_validation, valid_user_game_link: false };
      }
    }

    if (register.user_website_link) {
      if (!validateURL(register.user_website_link)) {
        c_validation = { ...c_validation, valid_user_website_link: true };
      } else {
        c_validation = { ...c_validation, valid_user_website_link: false };
      }
    }

    setValidation(c_validation);
    if (
      !c_validation.first_name &&
      !c_validation.valid_first_name &&
      !c_validation.last_name &&
      !c_validation.valid_last_name &&
      !c_validation.email &&
      !c_validation.valid_email &&
      !c_validation.phone_no &&
      !c_validation.valid_phone_no &&
      !c_validation.valid_facebook_link &&
      !c_validation.valid_instagram_link &&
      !c_validation.valid_twitter_link &&
      !c_validation.valid_youtube_link &&
      !c_validation.valid_user_game_link &&
      !c_validation.valid_user_website_link &&
      !c_validation.profession &&
      !c_validation.company
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleBlurURL = (e) => {
    let info = e.target.value;
    if (info) {
      if (!(info.startsWith("https://") || info.startsWith("http://"))) {
        info = `https://` + info;
      }

      setRegister({
        ...register,
        [e.target.name]: info,
      });
    }
  };

  const handleSubmit = async () => {
    if (checkValidation()) {
      try {
        setLoading(true);

        setError("");

        const {
          email,
          first_name,
          last_name,
          profession,
          company,
          phone_code,
          phone_no,
          facebook_link,
          instagram_link,
          twitter_link,
          user_website_link,
          user_game_link,
          youtube_link,
          creative_creation,
        } = register;

        let creatorData = {
          creator: {
            first_name: first_name,
            last_name: last_name,
            profession: profession?.role,
            company: company,
            email: email,
            phone_code: phone_code,
            phone_no: phone_no,
            facebook_link: facebook_link,
            instagram_link: instagram_link,
            twitter_link: twitter_link,
            user_website_link: user_website_link,
            user_game_link: user_game_link,
            youtube_link: youtube_link,
            relevant_link: creative_creation,
          },
        };

        const result = await creatorApplicationApi(creatorData);

        if (result.status === 201) {
          setRegisterSuccess(true);
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
      } catch (err) {
        setLoading(false);
        toast.error("An unexpected error occured. Please try again ");
      }
    } else {
      setError("Please fill all the required fields");
    }
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
      <AppHelmet
        title="Build With Us | Jump.trade"
        description="Let's build together. Join Jump.trade today to learn more about how NFTs can power your project"
        image=""
      />
      <div className={style["creator-container"]}>
        <Image
          unoptimized={true}
          height={30}
          width={30}
          className={`${style["bg_image"]}`}
          src={creator_bg.src}
          alt="Content"
        />
        <div className={`${style["creator-block"]} creator-block`}>
          {/* <h2 className="mb-3">Here&apos;s where we stART! </h2> */}

          {registerSuccess ? (
            <>
              <div className={style["success-msg-block"]}>
                <h4>Thank you for your interest!</h4>
                <p>
                  Please accept our heartfelt congratulations and our warm
                  welcome into the world of NFTs. We have received your details,
                  and Jump.trade community will look into your details shortly.
                  We will get back to you over your registered email and/or
                  mobile number to discuss what we can do further.
                  <br />
                  <br />
                  Once again, welcome to the world of NFT art.
                </p>
              </div>
              <div className={`${style["btn-block"]}  text-center`}>
                <button
                  // className="marketplace-btn"
                  className={style["submit-btn"]}
                  type="button"
                  onClick={() => router.push("/")}
                >
                  Go to Marketplace
                </button>
              </div>
            </>
          ) : (
            <>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Let&apos;s Get In Touch!</Accordion.Header>
                  <Accordion.Body>
                    <InputText
                      title="First Name"
                      name="first_name"
                      value={register.first_name}
                      required={validation.first_name}
                      onChange={handleChangeEvent}
                    />
                    {validation.valid_first_name && (
                      <p className={style["error_text"]}>
                        Please enter a valid first name
                      </p>
                    )}
                    <InputText
                      title="Last Name"
                      name="last_name"
                      value={register.last_name}
                      onChange={handleChangeEvent}
                    />
                    {validation.valid_last_name && (
                      <p className={style["error_text"]}>
                        Please enter a valid last name
                      </p>
                    )}
                    <div className={`${style["input-field"]}`}>
                      <label className={style["input-title"]}>
                        I am a/an &nbsp;
                        {validation?.profession && (
                          <span className={style["error_text"]}>
                            (Required)
                          </span>
                        )}
                      </label>{" "}
                      <Select
                        placeholder="Select Option"
                        value={register?.profession}
                        options={professionList}
                        onChange={handleCompanyChange}
                        name="profession"
                        className="basic-multi-select"
                        classNamePrefix="basic-multi-select"
                        getOptionLabel={(e) => (
                          <div
                            className="option"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <span style={{ marginLeft: 5 }}>{e?.role}</span>
                          </div>
                        )}
                      />
                    </div>
                    {/* <p>
                      I am a/an &nbsp;
                      {validation?.profession && (
                        <span className={style["error_text"]}>(Required)</span>
                      )}
                    </p> */}
                    {/* <select
                      className="form-control select"
                      onChange={handleChangeEvent}
                      // onClick={() => setShowDrop(true)}
                      name="profession"
                    >
                      <option value={"Choose a land"}>Choose a Role</option>
                      {professionList?.map((list) => (
                        <>
                          <option key={list?.company} value={list?.company}>
                            {list?.company}
                          </option>
                        </>
                      ))}
                    </select> */}

                    <InputText
                      title="The Company You Represent"
                      name="company"
                      value={register.company}
                      required={validation.company}
                      onChange={handleChangeEvent}
                    />
                    <InputText
                      title="Email Address"
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
                    <InputPhone
                      title={"Mobile Number"}
                      defaultCountry={country || "in"}
                      value={register.phone_no}
                      required={validation.phone_no}
                      onChange={(e, c_code) => {
                        setRegister({
                          ...register,
                          phone_no: e,
                          phone_code: c_code.countryCode.toUpperCase(),
                        });
                        if (e) {
                          setValidation({ ...validation, phone_no: false });
                        } else {
                          setValidation({ ...validation, phone_no: true });
                        }
                      }}
                    />
                    {validation.valid_phone_no && (
                      <p className={style["error_text"]}>
                        Please enter a valid mobile number
                      </p>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    A Little More About Yourself
                  </Accordion.Header>
                  <Accordion.Body>
                    <InputText
                      title="Your Website"
                      name="user_website_link"
                      value={register.user_website_link}
                      onChange={handleChangeEvent}
                      onBlur={handleBlurURL}
                    />
                    {validation.valid_user_website_link && (
                      <p className={style["error_text"]}>
                        Please enter a valid website link
                      </p>
                    )}

                    <TextArea
                      title="Your Game URL [iOS And Android]"
                      name="user_game_link"
                      value={register.user_game_link}
                      onChange={handleChangeEvent}
                      onBlur={handleBlurURL}
                    />

                    {validation.valid_user_game_link && (
                      <p className={style["error_text"]}>
                        Please enter a valid Game link
                      </p>
                    )}

                    <InputText
                      title="Twitter Profile"
                      name="twitter_link"
                      value={register.twitter_link}
                      onChange={handleChangeEvent}
                      onBlur={handleBlurURL}
                    />
                    {validation.valid_twitter_link && (
                      <p className={style["error_text"]}>
                        Please enter a valid twitter link
                      </p>
                    )}

                    <InputText
                      title="Facebook Page"
                      name="facebook_link"
                      value={register.facebook_link}
                      onChange={handleChangeEvent}
                      onBlur={handleBlurURL}
                    />
                    {validation.valid_facebook_link && (
                      <p className={style["error_text"]}>
                        Please enter a valid facebook link
                      </p>
                    )}

                    <InputText
                      title="YouTube Channel"
                      name="youtube_link"
                      value={register.youtube_link}
                      onChange={handleChangeEvent}
                      onBlur={handleBlurURL}
                    />
                    {validation.valid_youtube_link && (
                      <p className={style["error_text"]}>
                        Please enter a valid youtube link
                      </p>
                    )}

                    <InputText
                      title="Instagram Page"
                      name="instagram_link"
                      value={register.instagram_link}
                      onChange={handleChangeEvent}
                      onBlur={handleBlurURL}
                    />
                    {validation.valid_instagram_link && (
                      <p className={style["error_text"]}>
                        Please enter a valid instagram link
                      </p>
                    )}

                    <TextArea
                      title="Your Creatives & Creations [Behance And SoundCloud]"
                      name="creative_creation"
                      value={register.creative_creation}
                      onChange={handleChangeEvent}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

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
              {error && (
                <div className="error-text text-center mt-3">{error}</div>
              )}
            </>
          )}
        </div>

        <div className={style["heading-block"]}>
          <h2>
            <span>$1 Million</span> In <span>Grants</span> Await The Best
            Projects <span>That Partner</span> With Jump.trade Platform!
          </h2>
          <p>
            With Our Grant Options, Your Project Can Now Gain Advantage Of
            Scalability, Growth, & Of Course, Our Community!
          </p>
        </div>
      </div>
    </>
  );
};

export default CreatorForm;
