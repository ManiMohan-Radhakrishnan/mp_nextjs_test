import Image from "next/image";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { BiCheck } from "react-icons/bi";

import { currencyFormat } from "../../../utils/common";
import { PAYMENT_METHODS, PAYMENT_OPTS } from "../config";

import style from "./style.module.scss";

const PaymentList = ({
  className = "",
  amount = 0,
  userBalance = 0,
  defaultPaymentMethod = null,
  onHide = () => {},
  openPaymentGateway = () => {},
  onPaymentSuccess = () => {},
  ...props
}) => {
  const [paymentMethod, setPaymentMethod] = useState(
    defaultPaymentMethod || null
  );
  let curr_payment_info = PAYMENT_METHODS[paymentMethod] || {};
  let { min_amount = 0, limit_text = null } = curr_payment_info;

  const handlePaymentSelect = (payment_method = "") => {
    setPaymentMethod(
      paymentMethod !== PAYMENT_OPTS[payment_method]
        ? PAYMENT_OPTS[payment_method]
        : ""
    );
  };

  const handlePay = () => openPaymentGateway(paymentMethod);

  return (
    <div
      className={`${style["payment-list"]} ${
        className ? style[className] : ""
      }`.trim()}
    >
      <div className={style["prefered-block"]}>
        <h4 className={style["block-title"]}>Choose a Payment Method</h4>
        {Object.entries(PAYMENT_METHODS).map(([payment_method, payment]) => (
          <div
            key={`method-${payment_method}`}
            onClick={() => handlePaymentSelect(payment_method)}
            className={`${style["payment-option"]} ${
              paymentMethod === PAYMENT_OPTS[payment_method]
                ? style["active"]
                : ""
            }`.trim()}
          >
            <div className={`${style["checkbox"]}`}>
              <input
                name="checkbox-group"
                checked={paymentMethod === PAYMENT_OPTS[payment_method]}
                type="checkbox"
              />
              <span className={style["checkbox__mark"]}>
                <BiCheck />
              </span>
            </div>
            <h6 className="m-0 currency-title">{payment?.title}</h6>
            <Image
              unoptimized={true}
              src={payment?.image}
              alt="Payment Icon"
              width={62}
              height={30}
            />
          </div>
        ))}
      </div>
      {limit_text ? <p className={style["limit-text"]}>{limit_text}</p> : <></>}
      {amount > 0 && (
        <div className={style["button-block"]}>
          <div className={`${style["current-balance-block"]}`}>
            <h5>Balance</h5>
            <p>${userBalance <= 0 ? 0 : userBalance}</p>
          </div>
          <button
            className={`btn btn-dark text-center btn-lg w-75 rounded-pill pay-btn ${style["pay-btn"]}`}
            onClick={handlePay}
            disabled={!paymentMethod}
          >
            {`Pay ${currencyFormat(amount > min_amount ? amount : min_amount)}`}
          </button>
        </div>
      )}
    </div>
  );
};

export const PaymentListModal = ({
  show,
  amount = 0,
  onHide = () => {},
  openPaymentGateway = () => {},
  onPaymentSuccess = () => {},
  ...props
}) => {
  return (
    <Modal
      show={show === PAYMENT_OPTS.LIST}
      animation={false}
      contentClassName={`${style["payment-modal"]}`}
      backdrop="static"
      centered
    >
      <Modal.Header
        className={style["payment-modal-header"]}
        onHide={onHide}
        closeVariant="white"
        closeButton
      >
        <span className="fs-4">Payment Options</span>
      </Modal.Header>
      <Modal.Body className={style["payment-modal-body"]}>
        <PaymentList
          show={show}
          amount={amount}
          openPaymentGateway={openPaymentGateway}
          onPaymentSuccess={onPaymentSuccess}
          {...props}
        />
      </Modal.Body>
    </Modal>
  );
};

export default PaymentList;
