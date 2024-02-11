import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import Image from "next/image";
import { useSelector } from "react-redux";

import { isUserLoggedIn } from "../../../redux/reducers/user_reducer";
import { subscribeApi } from "../../../utils/base-methods";
import { validateEmail } from "../../../utils/common";
import { getSourceCookies } from "../../../utils/cookies";

import images from "../images.json";
import BadgeBg from "../../../images/raddx-nft/badge-new.png";
import CarBg from "../../../images/raddx-nft/car_bg.png";
import CarMobileBg from "../../../images/raddx-nft/car_mobile_bg.png";

import style from "./style.module.scss";
import useWindowSize from "../../../hooks/useWindowSize";
import { useRouter } from "next/router";

const JoinWaitList = () => {
  const loginStatus = useSelector(isUserLoggedIn);
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();
  const { width: windowWidth } = useWindowSize();
  const router = useRouter();
  const fsz = router.query.fsz;

  const [autoLogin, setAutoLogin] = useState(true);
  const [termsConditions, setTermsConditions] = useState(true);

  const handleSubscribe = async () => {
    if (validateEmail(email)) {
      try {
        setLoading(true);

        const response = await subscribeApi(
          email,
          termsConditions,
          "raddx",
          getSourceCookies()
        );

        setEmail("");

        if (response.data.data.exists) {
          if (!response.data.data.subscribed) {
            setSuccess(
              "Email submitted successfully. You're now on the waitlist!"
            );
          } else {
            setSuccess(
              "You've already signed up for the waitlist. Stay tuned for the latest updates!"
            );
          }
        } else {
          if (!response.data.data.subscribed) {
            setSuccess("new-signup");
          } else {
            setSuccess("new-signup-repeat");
          }
        }
        !loginStatus &&
          termsConditions &&
          router.push(
            `?with=otp&email=${response?.data?.data?.signin_email || ""}`
          );
      } catch (error) {
        console.log(
          "🚀 ~ file: index.js ~ line 16 ~ handleSubscribe ~ error",
          error
        );
      } finally {
        setLoading(false);
      }
    } else {
      setSuccess("Enter a valid email");
    }
  };

  return (
    <>
      <section className={`${style["super-loot-section"]}`}>
        <div className={`${style["super-loot-content-box"]}`}>
          <div className={`${style["super-loot-content-block"]}`}>
            <h3>SUPER LOOT BOX UNVEILING SOON</h3>
            {/* <div className={`${style["badge-box"]}`}>
              <Image unoptimized={true}
                height={250}
                width={500}
                src={BadgeBg}
                alt="BadgeBgImage"
                className={style["badgebg-Image"]}
              ></Image>
              <div className={`${style["badge-content-box"]}`}>
                <h3>BUY RADDX CAR NFTS @ $1</h3>
                <h5>Your Digital Collectable NFTs</h5>
              </div>
            </div> */}
            <p>
              RADDX Racing Metaverse — The Most Authentic, Competitive, and
              Addictive NFT Car Racing Game! Show off your skills behind the
              wheel and dominate your opponents to win big rewards in the
              Metaverse!
            </p>
          </div>
          <div className={`${style["badge-img-block"]}`}>
            <div className={`${style["badge-box"]}`}>
              <h3>
                BUY RADDX CAR NFTs @ <span>$1</span>
              </h3>
              <h5>YOUR DIGITAL COLLECTIBLE CAR NFTs</h5>
              <h6>
                <sup>*</sup> One Super Loot Box per user
              </h6>
            </div>
            <Image
              unoptimized={true}
              src={`${windowWidth > 880 ? CarBg.src : CarMobileBg.src}`}
              height={300}
              width={1437}
              alt="raddx car"
              className={`${style["video-fixed"]}`}
            />
          </div>

          <div className={style["join-waitlist-form-block"]}>
            <div className={style["join-waitlist-form-content"]}>
              <h6>Join the waitlist Now</h6>
              <div
                className={`${style["join-waitlist-form"]} ${style["singleline"]}`}
              >
                <input
                  type="text"
                  name="text"
                  value={email}
                  placeholder="Email"
                  className={style["email-content"]}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  type="button"
                  onClick={handleSubscribe}
                  disabled={loading}
                >
                  Join Now
                </button>
              </div>
            </div>
            {success && (
              <div className={style["success-message"]}>
                {(() => {
                  if (success === "new-signup") {
                    return (
                      <div>
                        {`You're now on the waitlist! While we send you updates, why don't you create an account on Jump.trade?`}
                        <span>
                          {" "}
                          <a
                            // href={`${
                            //   process.env.NEXT_PUBLIC_ACCOUNTS_URL
                            // }/signup?fsz=${sessionStorage.getItem("fsz")}`}
                            href={`${
                              process.env.NEXT_PUBLIC_ACCOUNTS_URL
                            }/signup${fsz ? `?fsz=${fsz}` : ""}`}
                            target="_self"
                          >
                            Sign up here
                          </a>
                        </span>
                      </div>
                    );
                  } else if (success === "new-signup-repeat") {
                    return (
                      <div>
                        {`You're already on the waitlist! While we send you updates, why don't you create an account on Jump.trade?`}
                        <span>
                          {" "}
                          <a
                            // href={`${
                            //   process.env.NEXT_PUBLIC_ACCOUNTS_URL
                            // }/signup?fsz=${sessionStorage.getItem("fsz")}`}
                            href={`${
                              process.env.NEXT_PUBLIC_ACCOUNTS_URL
                            }/signup${fsz ? `?fsz=${fsz}` : ""}`}
                            target="_self"
                          >
                            Sign up here
                          </a>
                        </span>
                      </div>
                    );
                  } else return success;
                })()}
              </div>
            )}
            {autoLogin && email && !loginStatus && (
              <div className={`${style["getappLinkCheckbox"]}  py-2`}>
                <input
                  type="checkbox"
                  name="termsConditions"
                  checked={termsConditions}
                  onClick={() => setTermsConditions(!termsConditions)}
                />{" "}
                I allow Jump.trade to create an account for me and I confirm
                that I am 18 years or older. View{" "}
                <a
                  target="_blank"
                  onClick={() =>
                    window.open(
                      `${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/terms-and-conditions`
                    )
                  }
                  className={`${style["link"]} ${style["link-orange"]}`}
                >{`T&Cs`}</a>{" "}
                and
                <a
                  target="_blank"
                  onClick={() =>
                    window.open(
                      `${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/privacy-policy`
                    )
                  }
                  className={`${style["link"]} ${style["link-orange"]}`}
                >{` Privacy Policy.`}</a>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default JoinWaitList;
