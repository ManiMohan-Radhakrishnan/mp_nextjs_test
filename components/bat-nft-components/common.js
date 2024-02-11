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
    title: "What are Crypto Bat NFTs?",
    info: (
      <>
        The Crypto Bat NFT Collection is a new offering by Jump.trade, a
        GuardianLink brand where actual cryptocurrency assets are attached to
        playable Bat NFTs.
      </>
    ),
  },
  {
    id: 2,
    title: "What are Genesis MCL Signed NFTs?",
    info: (
      <>
        The MCL Signed Bat NFTs are the NFTs that were sold during April 2022.
      </>
    ),
  },
  {
    id: 3,
    title: "What cryptocurrencies are attached to the Crypto Bat NFTs?",
    info: (
      <>
        <p>
          The following wrapped cryptocurrencies will back the Crypto Bat NFTs —
          wBTC, wETH, wBNB, wDOGE and wMATIC.
        </p>
        <p>
          For Phase 1 of the Drop, the 2000 MCL Crypto Bat NFTs will be backed
          by the following THREE wrapped crypto assets — wBTC, wETH, and wMATIC.
        </p>
      </>
    ),
  },
  {
    id: 4,
    title:
      "Can I withdraw the cryptocurrencies attached to the Crypto Bat NFTs?",
    info: (
      <>
        No, you cannot withdraw the underlying cryptocurrency balances of the
        Crypto Bat NFTs. Instead, you can view the balances in the smart
        contract on the Polygon blockchain. The Token ID of the particular asset
        is mapped to the particular cryptocurrency contract. You can go ahead
        and trade these Crypto Bat NFTs on the Jump.trade marketplace.
        {/* <p>
          Crypto Bat NFTs are an entirely new collection with different
          properties and utilities.
        </p>
        <br />
        <p>
          The Crypto Bat NFTs have actual cryptocurrency balances attached to
          them. These new bats are also playable in the MCL game with utilities
          such as 2x Power Ups, Negative Runs Reduction, and Sixes Distance.
        </p>
        <br />
        <p>
          The addition of Crypto Bat NFTs will supplement the existing Genesis
          MCL Signed Bat holders with additional utility. The Genesis MCL Signed
          Bat NFT users will receive a percentage of royalty fee from the sale
          of Crypto Bat NFTs.
        </p> */}
      </>
    ),
  },
  {
    id: 5,
    title: "Can I use the Crypto Bat NFTs inside the MCL game?",
    info: (
      <>
        Yes, the new Crypto Bat NFTs are playable in the MCL game with utilities
        such as 2x Power Ups, Negative Runs Reduction, and Sixes Distance.
      </>
    ),
  },
  {
    id: 6,
    title:
      "What is Proof-of-Reserves? How does it work with the Crypto Bat NFTs?",
    info: (
      <>
        Proof-of-Reserves is a way to allow users to check the on-chain balances
        of the different cryptocurrency attached to the different Crypto Bat
        NFTs. You can view the balances in the smart contract on the Polygon
        blockchain.
      </>
    ),
  },
  {
    id: 7,
    title: "How does six distance help the users in MCL?",
    info: (
      <>
        Currently, users who use these bats will hit longer sixes depending on
        the category of the bat. In the near future, we are planning to bring
        more use cases for six distances in the MCL game.
      </>
    ),
  },
  {
    id: 8,
    title:
      "When will you purchase and attach the crypto assets to the Crypto Bat NFTs?",
    info: (
      <>
        The crypto assets will be bought and attached to the Crypto Bat NFTs
        closer to the Drop End Date. We will acquire the crypto assets at the
        best market prices to deliver maximum value to our community members.
      </>
    ),
  },
  {
    id: 9,
    title: (
      <>
        Who will receive the yield from the royalties of the Crypto NFT Bats
        transactions?<sup>#</sup>
      </>
    ),
    info: (
      <>
        All Genesis MCL Signed Bat NFT holders who have opted for the yield
        program will receive a share of the royalties from the sale of Crypto
        Bat NFTs. Meanwhile, Crypto Bat NFT buyers will benefit from the
        attached cryptocurrencies, in-game utility in the MCL game, and
        Proof-of-Reserves.
      </>
    ),
  },
  {
    id: 10,
    title:
      "How are the Crypto Bat NFTs different from the Genesis MCL Signed Bat NFTs?",
    info: (
      <>
        <p>
          Crypto Bat NFTs are an entirely new collection with different
          properties and utilities.
        </p>
        <p>
          {" "}
          The Crypto Bat NFTs have actual cryptocurrency balances attached to
          them. These new bats are also playable in the MCL game with utilities
          such as 2x Power Ups, Negative Runs Reduction, and Sixes Distance.
        </p>
        <p>
          {" "}
          The addition of Crypto Bat NFTs will supplement the existing Genesis
          MCL Signed Bat holders with additional utility. The Genesis MCL Signed
          Bat NFT users will receive a percentage of royalty fee from the sale
          of Crypto Bat NFTs.
        </p>
      </>
    ),
  },
];
