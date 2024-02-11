import UpiImage from "../../images/upi.svg";
import cryptoImage from "../../images/usdt.svg";

export const PAYMENT_OPTS = Object.freeze({
  LIST: "LIST",
  CRYPTO: "CRYPTO",
  // UPI: "UPI",
  UPIOfflinePayment: "UPIOfflinePayment",
});

export const PAYMENT_METHODS = {
  // UPI: {
  //   title: "UPI",
  //   image: UpiImage,
  //   min_amount: process.env.NEXT_PUBLIC_IPPO_MIN_FUND,
  //   limit_text: `You need to fund your GuardianLink wallet with a minimum of $${process.env.NEXT_PUBLIC_IPPO_MIN_FUND}.`,
  // },
  UPIOfflinePayment: {
    title: "UPI",
    image: UpiImage,
  },

  CRYPTO: {
    title: "Crypto",
    image: cryptoImage,
  },
};
