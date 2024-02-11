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
  ASSIGNING_NFTS: "ASSIGNING NFTS",
  DROP_YTS: "DROP STARTS IN",
  DROP: "BUY",
  SOLD_OUT: "SOLD OUT",
});

export const LoginOptionTabs = ({ activeTab = "", onClick }) => {
  return (
    <div className={style["login-section-tab"]}>
      <p
        className={`${style["tab"]} ${
          activeTab === MODAL_TYPES.LOGIN_WITH_PASSWORD ? style["active"] : ""
        } `}
        onClick={() => onClick(MODAL_TYPES.LOGIN_WITH_PASSWORD)}
      >
        Password
      </p>
      <p
        className={`${style["tab"]} ${
          activeTab === MODAL_TYPES.LOGIN_WITH_OTP ? style["active"] : ""
        } `}
        onClick={() => onClick(MODAL_TYPES.LOGIN_WITH_OTP)}
      >
        OTP
      </p>
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
      <p className="text-danger">
        Your login has been disabled because we detected a suspicions activity
        on your account.{" "}
        <a href="https://help.jump.trade/en/support/solutions/articles/84000345960-why-is-my-login-disabled-">
          Learn more
        </a>
      </p>
    );
  } else {
    return <p className="text-danger">{error}</p>;
  }
};

export const Questions = [
  {
    id: 1,
    title: "How many categories are present in ball NFTs?",
    info: (
      <>
        {`Rare, Epic, Legend, Ultra Legend and Immortal.
`}
      </>
    ),
  },
  {
    id: 2,
    title: "How many ball NFTs can be purchased in pre book?",
    info: (
      <>
        {`There is no limit for pre booking MCL Ball NFTs, you can purchase as many as you want.
`}
      </>
    ),
  },
  {
    id: 3,
    title: "Can I trade the MCL Ball NFTs?",
    info: (
      <>
        Yes, you can buy, sell, and auction MCL Ball NFTs on the Jump.trade
        marketplace.
      </>
    ),
  },
  {
    id: 4,
    title: "Can I control the usage of the MCL Ball NFT in the game?",
    info: (
      <>
        {`Yes, you have control over the ball in the game, and you can choose the specific delivery to use the MCL Ball NFT.`}
      </>
    ),
  },
  {
    id: 5,
    title: "Does the ball have any stats like the bat?",
    info: (
      <>
        No, the ball has only abilities, and no particular stats such as bats.
      </>
    ),
  },
  {
    id: 6,
    title: "How many abilities does each category contain?",
    info: <>Rare - 1, Epic -2 , Legend - 3, Ultra - Legend - 4, Immortal - 5</>,
  },
  {
    id: 7,
    title: "How many times can I use a specific ability in a match?",
    info: <>Rare & Epic - 1, Legend & Ultra Legend - 2, Immortal - 3</>,
  },
];
