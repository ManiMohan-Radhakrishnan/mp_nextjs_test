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

export const Fusor = [
  {
    id: 1,
    title: "What happens to the Fusor NFT on use?",
    info: <>Fusors are burned/consumed on use.</>,
  },
  {
    id: 2,
    title:
      "Are Fusors dependent on which specific MCL Player is getting fused?",
    info: (
      <>
        No. They are only related to the category of the higher level Player
        (Rookie, Rare, Epic, Legendary). Fusing two batters or two bowlers
        produces either a new MCL Premier batter or a Premier bowler. And Fusing
        an MCL batter with an MCL bowler will produce either an MCL Premier
        batter or bowler at random. The Fusor is burned in the process.
      </>
    ),
  },
  {
    id: 3,
    title: "Is KYC required for fusing NFTs?",
    info: <>Yes, KYC is required for fusing NFTs</>,
  },
  {
    id: 4,
    title: "Can I fuse NFTs after I list them for sale?",
    info: (
      <>
        The Fusor NFT or the MCL Player NFTs listed for sale cannot be used for
        the Fusion process.
      </>
    ),
  },
  {
    id: 5,
    title: "Can I fuse my NFTs listed for rent?",
    info: <>No, NFTs listed for rent are not eligible for Fusion.</>,
  },
];

export const PremierPlayerFaq = [
  {
    id: 1,
    title: "Can I use MCL Premier Players in normal MCL matches?",
    info: <>Yes.</>,
  },
  {
    id: 2,
    title: "Can I upgrade MCL Premier Players like other MCL Players?",
    info: (
      <>
        Yes. You can receive upgrade cards for MCL Premier Players from kit
        boxes just like MCL Players.
      </>
    ),
  },
  {
    id: 3,
    title: "How do I upgrade MCL Premier Players?",
    info: (
      <>
        The same way you upgrade MCL Players applies here too, with the same
        costs in JT Points / USD.
      </>
    ),
  },
  {
    id: 4,
    title: "Can MCL Players use Special Shots?",
    info: <>No. They can use only MCL Signature Shots.</>,
  },
  {
    id: 5,
    title: "Can MCL Players use Fielding Specials?",
    info: <>No, Fielding Specials are exclusive to MCL Premier Players.</>,
  },
  {
    id: 6,
    title:
      "Can I fuse two MCL Premier Players to produce new MCL Premier Players?",
    info: (
      <>No. Only MCL Players can be fused to produce MCL Premier Players.</>
    ),
  },
  {
    id: 7,
    title: "Can I fuse a bowler with a batter?",
    info: (
      <>
        Yes, Fusing an MCL batter with an MCL bowler will produce either an MCL
        Premier batter or bowler at random.
      </>
    ),
  },
  {
    id: 8,
    title: "How do I get more MCL Premier Players?",
    info: (
      <>
        Aside from fusion, you can trade them on the Jump.trade marketplace with
        other users.
      </>
    ),
  },
  {
    id: 9,
    title:
      "Will MCL Premier Players receive any upgrades I did on my input MCL Players?",
    info: (
      <>
        Yes, the output MCL Premier Player will benefit from the same upgrades
        as the higher category (Rookie, Rare, Epic, Legendary) of the two input
        MCL Players, and also get +1 or +2 additional levels If both input
        players are same category, the fused MCL Premier Player has the same
        upgrades as whichever input Player has more (+ the additional levels).
      </>
    ),
  },
];

export const SpecialShotsFaq = [
  {
    id: 1,
    title: "How do Special Shots differ from Signature Shots?",
    info: (
      <>
        Special Shots offer similar benefits to Signature Shots but have unique
        new animations and scenarios in which they will be executed.
      </>
    ),
  },
  {
    id: 2,
    title: "Are Special Shots bound to specific MCL Premier Players?",
    info: (
      <>
        Yes. Just like Signature Shots are bound to specific MCL batters, these
        are bound to specific MCL Premier batters.
      </>
    ),
  },
  {
    id: 3,
    title: "Can my MCL Players use MCL Special Shots?",
    info: <>No. MCL Special Shots are exclusive to MCL Premier Players.</>,
  },
  {
    id: 4,
    title:
      "Will MCL Premier League Special Shots affect the supply of Signature Shots?",
    info: (
      <>
        No. Since Special Shots are a completely different set of NFTs which can
        only be used by MCL Premier Players, they will not affect the supply of
        existing NFTs.
      </>
    ),
  },
  {
    id: 5,
    title: "Can I control when to play a Special Shot during the match?",
    info: (
      <>
        No, you cannot control the Special Shot NFT as it gets triggered
        situationally based on the particular player, the ball delivery and
        batting shot direction.
      </>
    ),
  },
  // {
  //   id: 6,
  //   title: "What is the MCL Signature Shot NFT?",
  //   info: (
  //     <>
  //       <p>
  //         The MCL Signature Shot NFTs are 360° batting shots, motion captured by
  //         professional cricketers. These batting shots are mapped and can be
  //         equipped to specific MCL Batter.
  //       </p>
  //       <p>
  //         For example, let’s say you’re using a Rookie MCL Player like Meta
  //         Striker. In that case, MCL Signature Shot NFTs associated with Meta
  //         Striker, such as Meta Striker — Superstar Shot, Meta Striker — Kung Fu
  //         Pull Shot, etc., will be played by your Meta Striker Players.
  //       </p>
  //       <p>
  //         The MCL Signature Shot NFTs bring the thrill of real cricket to the
  //         Meta Cricket League game. They are collectible, playable, and
  //         tradable.
  //       </p>
  //     </>
  //   ),
  // },
  // {
  //   id: 7,
  //   title: "Can I control when to play an MCL Signature Shot during the match?",
  //   info: (
  //     <>
  //       No, you cannot control the MCL Signature Shot NFT as it gets triggered
  //       situationally based on the ball delivery and batting shot direction.
  //     </>
  //   ),
  // },
  // {
  //   id: 8,
  //   title:
  //     "Will I score a boundary when the MCL Signature Shot NFT gets triggered?",
  //   info: (
  //     <>
  //       The MCL Signature Shot NFT only adapts your MCL Batter to play
  //       situational ball deliveries and batting shot directions. The outcome can
  //       be boundaries, or runs, or even catches.
  //     </>
  //   ),
  // },
  // {
  //   id: 9,
  //   title:
  //     "What Advantage does the MCL Signature Shot NFT bring to the players?",
  //   info: (
  //     <>
  //       With the MCL Signature Shot NFT, the MCL Player will be better equipped
  //       to handle variations in bowling deliveries. Remember, the Signature Shot
  //       is triggered only when the right shot is played in the right direction
  //       according to the ball delivery. You’ll still need to play with good
  //       timing. It enhances the base stats of your MCL Batters just for that
  //       shot.
  //     </>
  //   ),
  // },
  // {
  //   id: 10,
  //   title: "Can I trade the MCL Signature Shot NFT?",
  //   info: (
  //     <>
  //       Yes, you can buy, sell, and auction MCL Signature Shot NFTs on the
  //       Jump.trade marketplace.
  //     </>
  //   ),
  // },
  // {
  //   id: 11,
  //   title: "How do I equip an MCL Signature Shot NFT to my MCL Batter?",
  //   info: (
  //     <>
  //       You just need to own the matching MCL Signature Shot NFTs and MCL
  //       Batter. The shot will get equipped automatically.
  //     </>
  //   ),
  // },
  // {
  //   id: 12,
  //   title:
  //     "Can I equip the MCL Signature Shot NFT of an MCL Batter to a different Batter?",
  //   info: (
  //     <>
  //       The MCL Signature Shots are pre-mapped to specific MCL Batters, and you
  //       CANNOT equip the MCL Signature Shot NFT of one batter to another batter.
  //       For example, you cannot use the MCL Signature Shot mapped to a specific
  //       Rookie player like Meta Striker, to another Rookie player like Meta
  //       Lofter, or even a Rare player like Meta Snazzy.
  //     </>
  //   ),
  // },
  // {
  //   id: 13,
  //   title: "How many MCL Signature Shot NFTs will be dropped this time?",
  //   info: (
  //     <>
  //       For this drop, a total of 10,000 MCL Signature Shot — Mystery Boxes will
  //       be dropped. Each MCL Signature Shot Pack is priced at $1. Pre-book now
  //       to get priority allocation on the drop day!
  //     </>
  //   ),
  // },
  // {
  //   id: 14,
  //   title:
  //     "How many MCL Signature Shot — Mystery Boxes can each person purchase?",
  //   info: (
  //     <>
  //       Each person can purchase only 1 MCL Signature Shot — Mystery Box during
  //       the drop.
  //     </>
  //   ),
  // },
  // {
  //   id: 15,
  //   title: "Can I trade my MCL Player with the Signature Shot equipped?",
  //   info: (
  //     <>
  //       No. Any equipped Signature Shots will remain in your account when
  //       trading an MCL Batter.
  //     </>
  //   ),
  // },
  // {
  //   id: 16,
  //   title: "How many Signature Shots can I equip on my MCL Batter?",
  //   info: (
  //     <>
  //       Each MCL Batter can equip multiple Signature Shot NFTs. However, the
  //       shots get triggered situationally based on the ball delivery or batting
  //       direction.
  //     </>
  //   ),
  // },
  // {
  //   id: 17,
  //   title: "How do I get more MCL Signature Shot NFTs?",
  //   info: (
  //     <>
  //       The MCL Signature Shot NFTs are tradable. You can buy MCL Signature Shot
  //       NFTs for different MCL Batters on the Jump.trade marketplace.
  //     </>
  //   ),
  // },
  // {
  //   id: 18,
  //   title: "What are the different pitches available in the game?",
  //   info: (
  //     <>
  //       There are three distinct pitch varieties inside the game — Green, Dry,
  //       and Normal Pitch.
  //     </>
  //   ),
  // },
  // {
  //   id: 19,
  //   title:
  //     "Will MCL Signature Shot NFTs get triggered if I do not own any MCL Bat NFTs?",
  //   info: (
  //     <>
  //       Yes, once equipped on an MCL Batter, the Signature Shot will get
  //       triggered situationally based on the ball delivery or batting direction.
  //       The Signature Shot does not require MCL Bat NFTs to get triggered.
  //     </>
  //   ),
  // },
  // {
  //   id: 20,
  //   title: "What is the SPIN-THE-WHEEL Contest?",
  //   info: (
  //     <>
  //       The SPIN-THE-WHEEL Contest is an exciting contest with prizes worth
  //       $6000 (₹5,00,000) on the drop day! To enter, users need to pre-book and
  //       get a successful allocation of the mystery box or the users can purchase
  //       the mystery box directly on the drop date.{" "}
  //       <a
  //         href="https://www.jump.trade/nft-marketplace/spin-contest"
  //         target="_blank"
  //         className="one-link"
  //         rel="noreferrer"
  //       >
  //         Learn more here.
  //       </a>
  //     </>
  //   ),
  // },
];

export const FieldingSpecialFaq = [
  {
    id: 1,
    title: "What are MCL Fielding Specials?",
    info: (
      <>
        MCL Fielding Specials are motion-captured animations of professional
        cricketers, bringing their unique fielding styles to your MCL gameplay.
        These animations are collectible, tradable, and playable.
      </>
    ),
  },
  {
    id: 2,
    title:
      "Can I control when to play an MCL Fielding Special during the match?",
    info: (
      <>
        No. MCL Fielding Specials owned by an MCL Premier bowler are triggered
        if that bowler is currently bowling, and situationally handled by the AI
        fielders based on the batting shot and fielding direction.
      </>
    ),
  },
  {
    id: 3,
    title: "What advantage does the MCL Fielding Special bring to the players?",
    info: (
      <>
        MCL Fielding Special NFTs enhance the visual appeal of your MCL gameplay
        and bring more accuracy to your fielding by adapting your fielder to the
        situation.
      </>
    ),
  },
  {
    id: 4,
    title: "Can I trade the MCL Fielding Specials?",
    info: (
      <>
        Yes, you can buy, sell, and auction MCL Fielding Specials on the
        Jump.trade marketplace.
      </>
    ),
  },
  {
    id: 5,
    title: "How do I equip MCL Fielding Specials to my MCL fielders?",
    info: (
      <>
        You just need to own the MCL Fielding Specials and the appropriate MCL
        Premier bowler that own them. The animation will get equipped
        automatically when the MCL Premier bowler who owns it is playing.
      </>
    ),
  },
  {
    id: 6,
    title: "How many MCL Fielding Specials will be available?",
    info: (
      <>
        There are 10,000 Fielding Specials available which are bundled with the
        Fusor Boxes.
      </>
    ),
  },
  {
    id: 7,
    title: "How do I get more MCL Fielding Specials?",
    info: (
      <>
        MCL Fielding Specials are tradable. You can buy MCL Fielding Specials on
        the Jump.trade marketplace..
      </>
    ),
  },
];
