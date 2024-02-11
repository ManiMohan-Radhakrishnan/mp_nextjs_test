import style from "./style.module.scss";

export const MODAL_TYPES = Object.freeze({
  LOGIN_WITH_PASSWORD: "login_with_passwordASDASD",
  LOGIN_WITH_OTP: "login_with_otp",
  VERIFY_GOOGLE_OTP: "verify_google_otp",
  VERIFY_OTP: "verify_otp",
  FORGOT_PASSWORD: "forgot_password",
  REGISTER: "register",
  PREBOOK: "prebook",
  SUCCESS: "success",
});

export const LOOT_STATUS = Object.freeze({
  YTS: "YET TO START",
  PRE_BOOK: "PRE BOOK NOW",
  CLAIM: "CLAIM",
  DROP: "BUY",
  SOLD_OUT: "SOLD OUT",
  DROP_YTA: "DROP YET TO ANNOUNACE",
  DROP_YTS: "DROP YET TO START",
  DROP_ENDED: "DROP ENDED",
  ASSIGNING_NFTS: "ASSIGNING NFTS",
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

export const Questions = [
  {
    id: 1,
    title: " Is the Seasonal Pass free to claim?",
    info: (
      <>
        Yes, the Seasonal Pass is completely free! Just create or sign in to
        your Jump.trade account and claim it.
      </>
    ),
  },
  {
    id: 2,
    title: " Can I claim more than one Pass?",
    info: <>No, each player can only claim one Seasonal Pas</>,
  },
  {
    id: 3,
    title: "How long is the Seasonal Pass valid for?",
    info: (
      <>
        The Seasonal Pass is valid for the entire series of tournaments
        throughout the season.
      </>
    ),
  },
  {
    id: 4,
    title: "Can I transfer my pass to another player?",
    info: (
      <>
        No, Seasonal Passes are non-transferable and can only be used by the
        player who claimed them.
      </>
    ),
  },
  {
    id: 5,
    title:
      " I claimed my Pass, but it's not showing in my account. What should I do?",
    info: (
      <>
        Refresh your page or restart the game. If the pass still doesn&apos;t
        appear, contact Jump.trade support for assistance.
      </>
    ),
  },
  {
    id: 6,
    title: "Where can I find the tournament Schedule?",
    info: (
      <>
        The match schedule can be viewed at{" "}
        <a
          style={{ color: "#ef9e5e" }}
          href="https://www.jump.trade/tournaments"
        >
          https://www.jump.trade/tournaments
        </a>{" "}
      </>
    ),
  },
  {
    id: 7,

    title: "How do I know which NFTs I can use to participate?",
    info: (
      <>
        Check the specific tournament information for acceptable NFTs.{" "}
        {/* <a
          style={{ color: "#ef9e5e" }}
          href="https://www.jump.trade/nft-rental"
        >
          https://www.jump.trade/nft-rental
        </a>{" "}
        <b>(Note: The rent of the NFTs will be deducted on the winnings)</b> */}
      </>
    ),
  },
];
