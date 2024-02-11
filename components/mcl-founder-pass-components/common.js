import { useRouter } from "next/router";

import style from "./style.module.scss";

export const MODAL_TYPES = Object.freeze({
  LOGIN_WITH_PASSWORD: "login_with_passwordASDASD",
  LOGIN_WITH_OTP: "login_with_otp",
  VERIFY_GOOGLE_OTP: "verify_google_otp",
  VERIFY_OTP: "verify_otp",
  FORGOT_PASSWORD: "forgot_password",
  REGISTER: "register",
  PREBOOK: "prebook",
});

export const LOOT_STATUS = Object.freeze({
  YTS: "YET TO START",
  PRE_BOOK: "PRE BOOK NOW",
  DROP_YTA: "DROP COMING SOON",
  DROP_YTS: "DROP STARTS IN",
  DROP: "BUY",
  ASSIGNING_NFTS: "ASSIGNING NFTS",
  SOLD_OUT: "SOLD OUT",
  DROP_ENDED: "DROP ENDED",
});

export const LoginOptionTabs = ({ activeTab = "", onClick }) => {
  const router = useRouter();
  const withOtp = router.query.with;

  return (
    <div
      className={`${style["login-section-tab"]} ${
        withOtp ? "justify-content-center" : ""
      }`}
    >
      {!withOtp ? (
        <>
          {" "}
          <p
            className={`${style["tab"]} ${
              activeTab === MODAL_TYPES.LOGIN_WITH_OTP ? style["active"] : ""
            } `}
            onClick={() => onClick(MODAL_TYPES.LOGIN_WITH_OTP)}
          >
            OTP
          </p>
          <p
            className={`${style["tab"]} ${
              activeTab === MODAL_TYPES.LOGIN_WITH_PASSWORD
                ? style["active"]
                : ""
            } `}
            onClick={() => onClick(MODAL_TYPES.LOGIN_WITH_PASSWORD)}
          >
            Password
          </p>
        </>
      ) : (
        <p
          className={`${style["tab"]} ${
            activeTab === MODAL_TYPES.LOGIN_WITH_PASSWORD ? style["active"] : ""
          } `}
          onClick={() => onClick(MODAL_TYPES.LOGIN_WITH_PASSWORD)}
        >
          OTP
        </p>
      )}
    </div>
  );
};

export const ConfirmError = ({ loading, resendEmail = () => {} }) => {
  return loading ? (
    <p className="text-dark">Sending email...</p>
  ) : (
    <p className="text-dark">
      You need to verify your account first.{" "}
      <a href="#" onClick={resendEmail}>
        Click here
      </a>{" "}
      to resend the confirmation email.
    </p>
  );
};

export const LoginErrorInfo = ({ error, loading, resendEmail }) => {
  if (error === "confirm-email") {
    return <ConfirmError loading={loading} resendEmail={resendEmail} />;
  } else if (error === "login-locked") {
    return (
      <p className="text-danger text-center">
        Your login has been disabled because we detected a suspicions activity
        on your account.{" "}
        <a href="https://help.jump.trade/en/support/solutions/articles/84000345960-why-is-my-login-disabled-">
          Learn more
        </a>
      </p>
    );
  } else {
    return <p className="text-danger text-center">{error}</p>;
  }
};

export const MCLElitePass = [
  {
    id: 1,
    title:
      "Can I upgrade my cards multiple times using the card upgrade feature?",
    info: (
      <>
        Yes, you can upgrade your cards multiple times using the card upgrade
        feature. Each upgrade costs $8, and it allows you to enhance your cards
        by increasing their level.
      </>
    ),
  },
  {
    id: 2,
    title: "How can I participate in the Mega Special Play tournament?",
    info: (
      <>
        To participate in the Mega Special Play tournament, you need to have the
        pass. Once you have the pass, you will be eligible to participate in the
        tournament twice a month. Keep an eye out for the tournament schedule
        and make sure to join during the specified times.
      </>
    ),
  },
  {
    id: 3,
    title:
      "Is the voice chat feature available for all users or only for pass holders?",
    info: (
      <>
        The voice chat feature is exclusively available for pass holders. By
        purchasing the pass, you gain access to the voice chat functionality,
        allowing you to communicate with other users using voice instead of just
        text.
      </>
    ),
  },
  {
    id: 4,
    title:
      "What are the benefits of creating a special tournament, and how can I earn service fees from it?",
    info: (
      <>
        Creating a special tournament gives you the opportunity to customize the
        tournament according to your preferences and invite other players to
        participate and invite sponsors of your choice to host the tournament.
        As the organizer, you have the ability to set the entry fees for
        participants, and a portion of those fees can be collected as service
        fees. So, by creating and hosting your own special tournament, you can
        earn service fees from the entry fees paid by participants.
      </>
    ),
  },
  {
    id: 5,
    title: "What kind of rewards can I expect from the monthly spin wheel?",
    info: <></>,
  },
];

export const FounderQuestions = [
  {
    id: 1,
    title: "How many passes can I buy during the prebook ?",
    info: (
      <>
        <p>
          You can buy a total of 5 passes per transaction during the prebook.
        </p>
      </>
    ),
  },
  {
    id: 2,
    title:
      "Can I upgrade my cards multiple times using the card upgrade feature?",
    info: (
      <>
        No, you can only upgrade your cards within the specified limits defined
        for the category of pass you own.
      </>
    ),
  },
  {
    id: 3,
    title: "How can I participate in the Mega Special Play tournament?",
    info: (
      <>
        To participate in the Mega Special Play tournament, you need to have the
        pass. Once you have the pass, you will be eligible to participate in the
        tournament. These tournaments will be held exclusive only for the pass
        holders.
      </>
    ),
  },
  {
    id: 4,
    title:
      "What are the benefits of creating a special tournament, and how can I earn from it?",
    info: (
      <>
        Creating a special tournament gives you the opportunity to customize the
        tournament according to your preferences and invite other players to
        participate and invite sponsors of your choice to host the tournament.
        As the organizer, you have the ability to set the entry fees for
        participants, and a portion of those fees can be collected as service
        fees. So, by creating and hosting your own special tournament, you can
        earn service fees from the entry fees paid by participants.
      </>
    ),
  },
  {
    id: 5,
    title: "What are the different categories of founder pass?",
    info: (
      <>
        <p>
          There are three different categories of Founders Pass provided in the
          box.
        </p>
        <ul>
          <li>Immortal</li>
          <li>Legend</li>
          <li>Epic</li>
        </ul>
        <p>
          For eg: The share varies according to the Founder pass that you own.
          If you own an Immortal Founder pass, the percentage of the share will
          be higher than that of the value provided in the legend. Each pass
          holds a unique share value percentage, where Immortal gets the highest
          share.
        </p>
      </>
    ),
  },
  {
    id: 6,
    title: "How many matches can we host per day?",
    info: (
      <>
        <p>
          If you own an MCL Elite Founder Pass you can host unlimited
          tournaments in a day.
        </p>
        <p>
          If you own an MCL Founder Pass you can host tournaments for a
          specified number of times defined for each category of the pass.
        </p>
        <p>The details is as follows:</p>
        <ul>
          <li>For Epic MCL Founder Pass - 35 completed matches per week</li>
          <li>For Legend MCL Founder Pass - 49 completed matches per week</li>
          <li>For Immortal MCL Founder Pass - 70 completed matches per week</li>
        </ul>
      </>
    ),
  },
  {
    id: 7,
    title:
      "Can we host a 1vs1 match similar to the existing 1vs1 format, or is it more like the daily tournaments hosted by Jump Trade?",
    info: (
      <>
        <p>
          You can host 1vs1 match, similar to the existing format hosted by us.
        </p>
      </>
    ),
  },
  {
    id: 8,
    title: "Is the MCL Founder pass a permanent membership pass?",
    info: (
      <>
        <p>Yes, the MCL Founder Pass is a permanent membership pass</p>
      </>
    ),
  },
  {
    id: 9,
    title: "Is the MCL Elite Founder pass a permanent membership pass?",
    info: (
      <>
        <p>Yes, the MCL Elite Founder Pass is a permanent membership pass</p>
      </>
    ),
  },
  {
    id: 10,
    title: "Can we use rental players in mega play tournaments?",
    info: (
      <>
        <p>
          Yes, If you own either of the passes you can use rental players to
          play in the mega play tournament.
        </p>
      </>
    ),
  },
  {
    id: 11,
    title:
      "Do we need to own the Founder pass to join in the custom tournaments hosted using the Founder pass?",
    info: (
      <>
        <p>
          No, you don&apos;t have to own the pass in order to play in the custom
          tournament hosted using the pass.
        </p>
      </>
    ),
  },
  {
    id: 12,
    title:
      "What is the share percentage of the different MCL Founder Pass holders for hosting tournaments?",
    info: (
      <>
        <p>The breakup for the MCL Founder Pass holders is as follows,</p>
        <ol type="a">
          <li>For Epic MCL Founder Pass - 70% of the service fee</li>
          <li>For Legend MCL Founder Pass - 80% of the service fee</li>
          <li>For Immortal MCL Founder Pass - 90% of the service fee</li>
        </ol>
      </>
    ),
  },
];
