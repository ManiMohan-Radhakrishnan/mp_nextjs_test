import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useSelector } from "react-redux";

import { isUserLoggedIn } from "../../../redux/reducers/user_reducer";
import { subscribeApi } from "../../../utils/base-methods";
import { validateEmail } from "../../../utils/common";
import style from "./style.module.scss";

const JoinWaitListAppLink = () => {
  const loginStatus = useSelector(isUserLoggedIn);
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();
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
          "jump",
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
              "You've already signed up for the waitlist. Stay tuned for the latest updates!."
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
      <div className={style["join-waitlist-form-block"]}>
        <h5>Never Miss a Drop</h5>
        <div className={style["join-waitlist-form"]}>
          <input
            type="text"
            name="text"
            value={email}
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
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
            <div className={`${style["getappLinkCheckbox"]} py-2`}>
              <input
                type="checkbox"
                name="termsConditions"
                checked={termsConditions}
                onClick={() => setTermsConditions(!termsConditions)}
              />{" "}
              I allow Jump.trade to create an account for me and I confirm that
              I am 18 years or older. View{" "}
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
          <button type="button" onClick={handleSubscribe} disabled={loading}>
            Join the waitlist &nbsp;
            <BsArrowRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default JoinWaitListAppLink;
