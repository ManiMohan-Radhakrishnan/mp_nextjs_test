import { memo, useEffect, useRef, useState } from "react";
import { Ippopay } from "react-ippopay";
import { toast } from "react-toastify";

import { ippoCreateOrder, ippoUpdateOrder } from "../../../utils/base-methods";

const ERROR_MSG =
  "Something went wrong, dont worry if amount got deducted, Please contact support for help.";
const PENDING_MSG =
  "Your Payment Is Pending. The Status Of the Payment Will Be Updated In The Transaction Shortly";
const SUCCESS_MSG = "Funds were added to your wallet successfully";

const MIN_AMOUNT = process.env.NEXT_PUBLIC_IPPO_MIN_FUND;

const IppoPayPayment = memo(
  ({
    amount = 0,
    openPaymentGateway = () => {},
    onPaymentSuccess = () => {},
    onPaymentFailure = () => {},
  }) => {
    const payment_initiated = useRef(false);
    const [ippo, setIppo] = useState({
      ippopayOpen: false,
      order_id: "",
      public_key: process.env.NEXT_PUBLIC_IPPO_KEY,
    });

    const getPaymentStatus = async (data) => {
      try {
        const result = await ippoUpdateOrder(data.order_id);
        let message = result?.data?.message;
        if (localStorage.getItem("success-msg") === "false") {
          localStorage.setItem("success-msg", "true");
          if (message === "Payment pending") toast.info(PENDING_MSG);
          else if (message === SUCCESS_MSG) {
            onPaymentSuccess();
            toast.success(SUCCESS_MSG);
          } else toast.info(message);
        }
      } catch (error) {
        console.error("Error from UPI", error);
        toast.error(ERROR_MSG);
        onPaymentFailure();
      }
    };

    const intiatePayment = async () => {
      try {
        const result = await ippoCreateOrder(
          amount > MIN_AMOUNT ? amount : MIN_AMOUNT
        );
        let order_id = result?.data?.data?.order_id;
        if (order_id) setIppo({ ...ippo, ippopayOpen: true, order_id });
      } catch (error) {
        console.error("Error in initiating UPI Payment", error);
        onPaymentFailure();
      }
    };

    const ippopayHandler = (e) => {
      if (["closed", "failure", "success"].includes(e.data.status)) {
        setIppo({ ...ippo, ippopayOpen: false });
        openPaymentGateway(null);
      }
      if (["failure", "success"].includes(e.data.status))
        getPaymentStatus(e.data);
    };

    useEffect(() => {
      if (!payment_initiated.current && amount > 0) {
        window.addEventListener("message", ippopayHandler);
        localStorage.setItem("success-msg", "false");
        intiatePayment();
        payment_initiated.current = true;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return amount > 0 ? (
      <Ippopay
        ippopayOpen={ippo.ippopayOpen}
        ippopayClose={true}
        order_id={ippo.order_id}
        public_key={ippo.public_key}
      />
    ) : (
      <></>
    );
  },
  (oldProps, newProps) => oldProps.amount === newProps.amount
);

IppoPayPayment.displayName = "IppoPayment";

export default IppoPayPayment;
