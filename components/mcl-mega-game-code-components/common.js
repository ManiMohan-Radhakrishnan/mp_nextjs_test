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
    title: "What is the MCL Mega Play tournament Pass?",
    info: (
      <>
        The MCL Mega Play Tournament Pass is a special entry pass that holders
        can use to enter and participate in an exclusive tournament.
      </>
    ),
  },
  {
    id: 2,
    title: "How do I claim the MCL Mega Play Tournament Pass?",
    info: (
      <>
        To claim the pass, existing users simply need to visit the drop page and
        click &quot;claim.&quot; New users should sign up first, and then
        proceed to claim the pass to add it to their gaming account.
      </>
    ),
  },
  {
    id: 3,
    title:
      "Can I trade the MCL Mega Play Tournament Pass on the Jump.trade marketplace?",
    info: <>No, you cannot trade the MCL Mega Play Tournament Pass.</>,
  },
  {
    id: 4,
    title: "What is the validity of the MCL Mega Play Tournament Pass?",
    info: (
      <>
        The MCL Mega Play Tournament Pass is valid till the date of the
        tournament and the same pass cannot be reused.
      </>
    ),
  },
  {
    id: 5,
    title: "When, Where, and How can I use my MCL Mega Play Tournament Pass?",
    info: (
      <>
        You can use the pass to enter an exclusive tournament inside the MCL
        game. The tournament details are mentioned on the pass.
      </>
    ),
  },
  {
    id: 6,
    title: "What is the Tournament format?",
    info: (
      <>
        The tournament will feature a limited number of participants, each
        playing 6 matches. Only 4 matches with the maximum scores will be
        counted toward the leaderboard.
      </>
    ),
  },
  {
    id: 7,

    title:
      "If I buy the pass, can I enter this tournament without holding NFTs?",
    info: (
      <>
        Even if you don&apos;t own an NFT, you can still get NFTs on rentals.
        You can borrow a max of 1 bowler, batsman and bat. Refer to the
        following rental section,{" "}
        <a
          style={{ color: "#ef9e5e" }}
          href="https://www.jump.trade/nft-rental"
        >
          https://www.jump.trade/nft-rental
        </a>{" "}
        <b>(Note: The rent of the NFTs will be deducted on the winnings)</b>
      </>
    ),
  },
  {
    id: 8,
    title: "What are MCL Boundary Swag Shots?",
    info: (
      <>
        The MCL Boundary Swag Shot NFTs are the exclusive new collection of
        shots, motion captured by professional cricketers. These batting shots
        are mapped and can be equipped to specific MCL Batter.
      </>
    ),
  },
  {
    id: 9,
    title: "Can I trade these MCL Boundary Swag Shots?",
    info: (
      <>
        Yes, you can buy, sell, and trade MCL Boundary Swag Shot NFTs on the
        Jump.trade marketplace.
      </>
    ),
  },
  {
    id: 10,
    title: "How do I equip the MCL Boundary Swag Shot NFT to my MCL Batter?",
    info: (
      <>
        You just need to own the matching MCL Boundary Swag Shot NFTs and MCL
        Batter. The shot will get equipped automatically.
      </>
    ),
  },
  {
    id: 11,
    title: "How many MCL Boundary Swag Shots can I equip on my MCL Batter?",
    info: (
      <>
        Each MCL Batter can equip multiple Boundary Swag Shot NFTs. However, the
        shots get triggered situationally based on the ball delivery or batting
        direction.
      </>
    ),
  },
  {
    id: 12,
    title:
      "How many MCL Boundary Swag Shot — Mystery Boxes can each person purchase?",
    info: (
      <>
        Each person can purchase only 1 MCL Boundary Swag Shot — Mystery Box
        during the drop.
      </>
    ),
  },
];
