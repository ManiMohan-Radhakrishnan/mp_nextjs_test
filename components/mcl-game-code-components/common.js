import style from "./style.module.scss";

export const MODAL_TYPES = Object.freeze({
  LOGIN_WITH_PASSWORD: "login_with_passwordASDASD",
  LOGIN_WITH_OTP: "login_with_otp",
  VERIFY_GOOGLE_OTP: "verify_google_otp",
  VERIFY_OTP: "verify_otp",
  FORGOT_PASSWORD: "forgot_password",
  REGISTER: "register",
  PREBOOK: "prebook",
  CLAIM: "claim",
  SUCCESS: "success",
});

export const LOOT_STATUS = Object.freeze({
  YTS: "YET TO START",
  PRE_BOOK: "PRE BOOK NOW",
  DROP: "BUY",
  CLAIM: "CLAIM",
  CLAIM_ENDED: "CLAIM ENDED",
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
    title: "What is the MCL Crown Clash Tournament Pass?",
    info: (
      <>
        The MCL Crown Clash Tournament Pass is a special entry pass that holders
        can use to enter and participate in an exclusive tournament.
      </>
    ),
  },
  {
    id: 2,
    title: "How do I claim the MCL Crown Clash Tournament Pass?",
    info: (
      <>
        To get your MCL Crown Clash Tournament Pass, you need to log into the
        Meta Cricket League game and claim the pass directly from the game’s
        homepage. If you’re a new user, create your MCL account now by
        downloading and installing the game from:
        <a style={{ color: "ec844e" }} href="https://www.jump.trade/mcl-game">
          https://www.jump.trade/mcl-game
        </a>
      </>
    ),
  },
  {
    id: 3,
    title: "What is the validity of the MCL Crown Clash Tournament Pass?",
    info: (
      <>
        The MCL Crown Clash Tournament Pass validity is as per the tournament
        date and time mentioned on it. MCL Crown Clash Tournament Passes lose
        their validity automatically, irrespective if they are used or not used
        to enter the tournament.
      </>
    ),
  },
  {
    id: 4,
    title: "When, Where, and How can I use my MCL Crown Clash Tournament Pass?",
    info: (
      <>
        You can use the pass to enter an exclusive tournament inside the MCL
        game. The tournament details are mentioned on the pass.
      </>
    ),
  },
  {
    id: 5,
    title: "What is the tournament format?",
    info: (
      <>
        The tournament will feature a limited number of participants, each
        playing 4 matches. Only 2 matches with the maximum scores will be
        counted toward the leaderboard.
      </>
    ),
  },
  {
    id: 6,
    title: "What is the prize pool and winners of these tournaments?",
    info: (
      <>
        The number of participants, along with the prize pool and percentage of
        winners, is disclosed in the about section of the pass drop.
      </>
    ),
  },
  {
    id: 7,

    title: (
      <>If I buy the pass, can I enter this tournament without holding NFTs?</>
    ),
    info: (
      <>
        Yes, you can enter and play in this tournament even if you do not own
        any MCL Player NFTs. On the day of the tournament, Jump.trade will
        assign NFTs on rent to all new players. We will assign one MCL Batsman
        NFT and one MCL Bowler NFT of any category — Rookie, Rare, Epic, or
        Legend, as per availability.
        <br />
        Alternatively, ahead of the tournament you can also purchase your MCL
        NFTs on the Jump.trade marketplace:{" "}
        <a
          style={{ color: "ec844e" }}
          href="https://www.jump.trade/nft-marketplace"
        >
          https://www.jump.trade/nft-marketplace
        </a>
        .
      </>
    ),
  },
  {
    id: 8,
    title: "How will Jump.trade give NFTs on rent?",
    info: (
      <>
        {`As part of the MCL Crown Clash Tournament, Jump.trade will be taking MCL Player NFTs  on rent from existing NFT owners from the community. A standard rental fee will be distributed to all NFT owners who have opted their MCL Player NFTs  for rent, based on the NFTs’ assignment.`}
      </>
    ),
  },
  {
    id: 9,
    title: "How do I opt-in my MCL Player NFTs for rent?",
    info: (
      <>
        Jump.trade will be making an official announcement on the opt-in process
        for rental of MCL Player NFTs ahead of the tournament date.
      </>
    ),
  },
  {
    id: 10,
    title: "How will the tournament matchmaking take place?",
    info: (
      <>
        The special tournament will focus on the participant&apos;s skills.
        Hence, the MCL Player NFTs used by the pass holders will have normalized
        stats, irrespective of the MCL Player NFTs category.
      </>
    ),
  },
  {
    id: 11,
    title:
      "At the end of the tournament, will the list of winners get published?",
    info: (
      <>
        Yes, at the end of the tournament, the list of all winners and
        participants will be published. Details such as game name, ranking,
        leaderboard points, and tournament earnings will be disclosed.
      </>
    ),
  },

  {
    id: 12,
    title:
      "Can I trade the MCL Crown Clash Tournament Pass on the Jump.trade marketplace?",
    info: (
      <>
        No, you cannot trade the MCL Crown Clash Tournament Pass as it is not a
        digital collectible.
      </>
    ),
  },
];
