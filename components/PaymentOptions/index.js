import { PAYMENT_OPTS } from "./config";

import PaymentList from "./PaymentList";
import CryptoPayment from "./crypto";
import IppoPayPayment from "./ippopay";
import UPIPayment from "./upiPayment";

const PaymentOptions = (props) => {
  if (props.show === PAYMENT_OPTS.LIST)
    return <PaymentList {...props}></PaymentList>;
  // else if (props.show === PAYMENT_OPTS.UPI)
  //   return <IppoPayPayment {...props}></IppoPayPayment>;
  else if (props.show === PAYMENT_OPTS.UPIOfflinePayment)
    return <UPIPayment {...props}></UPIPayment>;
  else if (props.show === PAYMENT_OPTS.CRYPTO)
    return <CryptoPayment {...props}></CryptoPayment>;
  else return <></>;
};

export default PaymentOptions;
