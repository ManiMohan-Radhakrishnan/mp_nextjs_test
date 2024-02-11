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
    title: "What is the MCL Signature Shot NFT?",
    info: (
      <>
        <p>
          The MCL Signature Shot NFTs are 360° batting shots, motion captured by
          professional cricketers. These batting shots are mapped and can be
          equipped to specific MCL Batter.
        </p>
        <p>
          For example, let&apos;s say you&apos;re using a Rookie MCL Player like
          Meta Striker. In that case, MCL Signature Shot NFTs associated with
          Meta Striker, such as Meta Striker — Superstar Shot, Meta Striker —
          Kung Fu Pull Shot, etc., will be played by your Meta Striker Players.
        </p>
        <p>
          The MCL Signature Shot NFTs bring the thrill of real cricket to the
          Meta Cricket League game. They are collectible, playable, and
          tradable.
        </p>
      </>
    ),
  },
  {
    id: 2,
    title: "Can I control when to play an MCL Signature Shot during the match?",
    info: (
      <>
        No, you cannot control the MCL Signature Shot NFT as it gets triggered
        situationally based on the ball delivery and batting shot direction.
      </>
    ),
  },
  {
    id: 3,
    title:
      "Will I score a boundary when the MCL Signature Shot NFT gets triggered?",
    info: (
      <>
        The MCL Signature Shot NFT only adapts your MCL Batter to play
        situational ball deliveries and batting shot directions. The outcome can
        be boundaries, or runs, or even catches.
      </>
    ),
  },
  {
    id: 4,
    title:
      "What Advantage does the MCL Signature Shot NFT bring to the players?",
    info: (
      <>
        With the MCL Signature Shot NFT, the MCL Player will be better equipped
        to handle variations in bowling deliveries. Remember, the Signature Shot
        is triggered only when the right shot is played in the right direction
        according to the ball delivery. You&apos;ll still need to play with good
        timing. It enhances the base stats of your MCL Batters just for that
        shot.
      </>
    ),
  },
  {
    id: 5,
    title: "Can I trade the MCL Signature Shot NFT?",
    info: (
      <>
        Yes, you can buy, sell, and auction MCL Signature Shot NFTs on the
        Jump.trade marketplace.
      </>
    ),
  },
  {
    id: 6,
    title: "How do I equip an MCL Signature Shot NFT to my MCL Batter?",
    info: (
      <>
        You just need to own the matching MCL Signature Shot NFTs and MCL
        Batter. The shot will get equipped automatically.
      </>
    ),
  },
  {
    id: 7,
    title:
      "Can I equip the MCL Signature Shot NFT of an MCL Batter to a different Batter?",
    info: (
      <>
        The MCL Signature Shots are pre-mapped to specific MCL Batters, and you
        CANNOT equip the MCL Signature Shot NFT of one batter to another batter.
        For example, you cannot use the MCL Signature Shot mapped to a specific
        Rookie player like Meta Striker, to another Rookie player like Meta
        Lofter, or even a Rare player like Meta Snazzy.
      </>
    ),
  },
  {
    id: 8,
    title: "How many MCL Signature Shot NFTs will be dropped this time?",
    info: (
      <>
        For this drop, a total of 10,000 MCL Signature Shot — Mystery Boxes will
        be dropped. Each MCL Signature Shot Pack is priced at $1. Pre-book now
        to get priority allocation on the drop day!
      </>
    ),
  },
  {
    id: 9,
    title:
      "How many MCL Signature Shot — Mystery Boxes can each person purchase?",
    info: (
      <>
        Each person can purchase only 1 MCL Signature Shot — Mystery Box during
        the drop.
      </>
    ),
  },
  {
    id: 10,
    title: "Can I trade my MCL Player with the Signature Shot equipped?",
    info: (
      <>
        No. Any equipped Signature Shots will remain in your account when
        trading an MCL Batter.
      </>
    ),
  },
  {
    id: 11,
    title: "How many Signature Shots can I equip on my MCL Batter?",
    info: (
      <>
        Each MCL Batter can equip multiple Signature Shot NFTs. However, the
        shots get triggered situationally based on the ball delivery or batting
        direction.
      </>
    ),
  },
  {
    id: 12,
    title: "How do I get more MCL Signature Shot NFTs?",
    info: (
      <>
        The MCL Signature Shot NFTs are tradable. You can buy MCL Signature Shot
        NFTs for different MCL Batters on the Jump.trade marketplace.
      </>
    ),
  },
  {
    id: 13,
    title: "What are the different pitches available in the game?",
    info: (
      <>
        There are three distinct pitch varieties inside the game — Green, Dry,
        and Normal Pitch.
      </>
    ),
  },
  {
    id: 14,
    title:
      "Will MCL Signature Shot NFTs get triggered if I do not own any MCL Bat NFTs?",
    info: (
      <>
        Yes, once equipped on an MCL Batter, the Signature Shot will get
        triggered situationally based on the ball delivery or batting direction.
        The Signature Shot does not require MCL Bat NFTs to get triggered.
      </>
    ),
  },
  {
    id: 15,
    title: "What is the SPIN-THE-WHEEL Contest?",
    info: (
      <>
        The SPIN-THE-WHEEL Contest is an exciting contest with prizes worth
        $6000 (₹5,00,000) on the drop day! To enter, users need to pre-book and
        get a successful allocation of the mystery box or the users can purchase
        the mystery box directly on the drop date.{" "}
        <a
          href="https://www.jump.trade/nft-marketplace/spin-contest"
          target="_blank"
          className="one-link"
          rel="noreferrer"
        >
          Learn more here.
        </a>
      </>
    ),
  },
];
