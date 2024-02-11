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

export const RaddxLandQuestions = [
  {
    id: 1,
    title: "What is RADDX Racing Metaverse?",
    info: (
      <>
        <p>
          RADDX - Racing Metaverse game is a futuristic multiplayer racing game
          with stunning locations, attractive EV cars, accessories, cop chases,
          power-ups, rewards & much more! Enjoy playing RADDX & have a wonderful
          Racing Metaverse journey!
        </p>
      </>
    ),
  },
  {
    id: 2,
    title: "How many RADDX Land Boxes can I buy during the Prebook?",
    info: <>You can purchase as many boxes during the prebook.</>,
  },
  {
    id: 3,
    title: "What are the benefits I would enjoy as a landowner?",
    info: (
      <>
        As a landowner, you get to become the owner of that digital land
        forever... and your ownership is irrefutable! You can also rent out your
        land to others and earn passive revenue from it. The land also enables
        you to build your landmarks in the metaverse and monetize them by
        hosting your ads or events.
      </>
    ),
  },
  {
    id: 4,
    title: "Where can I get the updates of the Lands and buildings?",
    info: (
      <>
        You can join our waitlist to get email updates. Another awesome way to
        keep yourself up-to-date with all RADDX announcements is to join
        Jump.trade&apos;s Discord community. You can also follow Jump.trade on
        Instagram, Twitter, and Telegram to get the latest updates.
      </>
    ),
  },
];
