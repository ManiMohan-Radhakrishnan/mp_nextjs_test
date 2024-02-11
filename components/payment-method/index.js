import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { Ippopay } from "react-ippopay";

import { currencyFormat } from "../../utils/common";
import { ippoUpdateOrder, ippoCreateOrder } from "../../utils/base-methods";

import UpiImage from "../../images/upi.svg";
import cryptoImage from "../../images/usdt.svg";

import style from "./style.module.scss";

const PaymentMethod = ({ defaultAmount = 0 }) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [ippo, setIppo] = useState({
    ippopayOpen: false,
    order_id: "",
    public_key: process.env.NEXT_PUBLIC_IPPO_KEY,
  });

  const ippopayHandler = (e) => {
    if (e.data.status === "success") {
      setIppo({ ...ippo, ippopayOpen: false });
      getPaymentStatus(e.data);
    }
    if (e.data.status === "failure") {
      setIppo({ ...ippo, ippopayOpen: false });
      getPaymentStatus(e.data);
    }
    if (e.data.status === "closed") {
      setIppo({ ...ippo, ippopayOpen: false });
      setLoading(false);
    }
  };

  const ippopayOpen = (order_id) => {
    setIppo({ ...ippo, ippopayOpen: true, order_id });
  };

  const getPaymentStatus = async (input) => {
    try {
      const result = await ippoUpdateOrder(input.order_id);

      if (localStorage.getItem("success-msg") === "false") {
        localStorage.setItem("success-msg", "true");

        if (result.data.message === "Payment pending") {
          toast.info(
            "Your Payment Is Pending. The Status Of the Payment Will Be Updated In The Transaction Shortly"
          );
        } else if (
          result.data.message === "Funds were added to your wallet successfully"
        ) {
          toast.success("Funds were added to your wallet successfully");
        } else {
          toast.info(result.data.message);
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        "Something went wrong, dont worry if amount got deducted, please contact support for help"
      );
    }
  };
  const choosePaymentMethod = () => {
    if (paymentMethod === "upi") addMoneyToWallet();
    else
      window.open(
        `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/wallet?depositType=crypto`,
        "_blank"
      );
  };

  const addMoneyToWallet = async () => {
    if (defaultAmount) {
      try {
        setLoading(true);
        const result = await ippoCreateOrder(defaultAmount);
        ippopayOpen(result.data.data.order_id);
      } catch (error) {
        setLoading(false);
        console.log(
          "🚀 ~ file: index.js ~ line 42 ~ handlePayment ~ error",
          error
        );
      }
    }
  };

  useEffect(() => {
    window.addEventListener("message", ippopayHandler);
    localStorage.setItem("success-msg", "false");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={style["prefered-block"]}>
        <h4 className={style["block-title"]}>Select a Payment Method</h4>
        <div
          onClick={() => setPaymentMethod("upi")}
          className={`${style["upi-block"]} ${
            paymentMethod === "upi" ? style["active"] : ""
          }`.trim()}
        >
          <h6 className="m-0 currency-title">UPI</h6>
          <Image
            unoptimized={true}
            src={UpiImage}
            alt="Payment Icon"
            width={62}
            height={30}
          />
        </div>
        <div
          onClick={() => setPaymentMethod("crypto")}
          className={`${style["upi-block"]} ${
            paymentMethod === "crypto" ? style["active"] : ""
          }`.trim()}
        >
          <h6 className="m-0 currency-title">Crypto</h6>
          <Image
            unoptimized={true}
            src={cryptoImage}
            alt="Payment Icon"
            width={62}
            height={30}
          />
        </div>
      </div>
      <div className={style["button-block"]}>
        <button
          onClick={choosePaymentMethod}
          className={style["buy-btn"]}
          disabled={loading}
        >
          {`Pay ${currencyFormat(defaultAmount)}`}
        </button>
      </div>
      <div>
        <Ippopay
          ippopayOpen={ippo.ippopayOpen}
          ippopayClose={true}
          order_id={ippo.order_id}
          public_key={ippo.public_key}
        />
      </div>
    </>
  );
};

export default PaymentMethod;
