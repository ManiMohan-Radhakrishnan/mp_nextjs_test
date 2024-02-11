import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiArrowLeft } from "react-icons/fi";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

import { PAYMENT_OPTS } from "../config";
import { user_load_by_token_thunk } from "../../../redux/thunk/user_thunk";
import {
  fireBlockFetchAddress,
  fireBlockRefresh,
  offlinePaymentsConvert,
  offlinePaymentsDetails,
  offlinePaymentsSubmit,
} from "../../../utils/base-methods";
import {
  currencyFormat,
  validateCurrency,
  validateNumber,
  validateUpi,
} from "../../../utils/common";
import { getCookies } from "../../../utils/cookies";

import CopyToClipboardComponent from "../../copy-to-clipboard";

import style from "./style.module.scss";
import InputText from "../../input-text";
import { BsFillInfoCircleFill } from "react-icons/bs";
import ToolTip from "../../tooltip";

const UPIInstructions = () => (
  <div className={`mt-2 mb-2 ${style["qr-terms"]} border p-4 rounded-3`}>
    <ol>
      <li>
        {`Please deposit`} <b>{`ONLY USDT`}</b>{" "}
        {`(US Dollar
      Tether), `}
        <b>{`USDC`}</b>
        {`, or `}
        <b>{`BUSD`}</b>
        {`. In addition, MANDATORILY,
      make sure that the `}
        <b>{`USDT`}</b>
        {` and the `}
        <b>{`USDC`}</b>
        {` you transfer is compliant with
      Ethereum's ERC-20, Polygon's ERC-20, or Binance Smart
      Chain (BSC)'s BEP-20 token standards, and the `}
        <b>{`BUSD`}</b>
        {` is compliant with Ethereum's ERC-20 or
      Binance Smart Chain (BSC)'s BEP-20 token standards. Any
      other coin or any other non-compliant standard token
      transferred to the GuardianLink wallet will result in an
      irreversible and non-refundable loss of funds`}
      </li>
      <li>
        The minimum deposit amount is {process.env.REACT_APP_CRYPTO_MIN_FUND}{" "}
        <b>USDT/USDC/BUSD</b>. Any deposit below{" "}
        {process.env.REACT_APP_CRYPTO_MIN_FUND} <b>USDT/USDC/BUSD</b> will not
        be supported and cannot be recovered/refunded.
      </li>
      <li>
        The address only supports <b>USDT/USDC</b> (Ethereum ERC-20/Polygon
        ERC-20/BSC BEP-20). and <b>BUSD</b> (Ethereum ERC-20/BSC BEP-20), and no
        other coin/chain/standard. OMNI wallets are not supported.
      </li>
      <li>
        When you make payments with cryptocurrency, you transact with Guardian
        Blockchain Labs Pte Ltd.
      </li>
    </ol>
  </div>
);

const UPIPayment = ({
  show,
  amount = 0,
  onPaymentSuccess = () => {},
  onPaymentFailure = () => {},
  openPaymentGateway = () => {},
  onHide = () => {},
}) => {
  const { user } = useSelector((state) => state.user.data);
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [refresh, setRefresh] = useState(false);
  const [paymentdetail, setPaymentDetail] = useState([]);
  const [paymentApproxUsd, setPaymentApproxUsd] = useState([]);

  const [checked, setChecked] = useState(false);

  const [closed, setClosed] = useState(true);

  const [upiPayment, setUpiPayment] = useState({
    amount: "",
    trans_id: "",
    upi_id: "",
  });

  const [validation, setValidation] = useState({
    amount: false,
    valid_amount: false,
    trans_id: false,
    valid_trans_id: false,
    upi_id: false,
    valid_upi_id: false,
  });
  useEffect(() => {
    getOfflinePaymentsDetails();
  }, []);

  const checkValidation = () => {
    let c_validation = { ...validation };

    // if (!upiPayment.amount) {
    //   c_validation = { ...c_validation, amount: true };
    // } else {
    //   c_validation = { ...c_validation, valid_amount: false };
    // }

    if (checked && !upiPayment.amount) {
      c_validation = { ...c_validation, amount: true };
    } else {
      if (validateCurrency(upiPayment.amount)) {
        c_validation = { ...c_validation, valid_amount: false };
      } else {
        c_validation = { ...c_validation, valid_amount: true };
      }
    }

    if (checked && !upiPayment.upi_id) {
      c_validation = { ...c_validation, upi_id: true };
    } else {
      if (validateUpi(upiPayment.upi_id)) {
        c_validation = { ...c_validation, valid_upi_id: false };
      } else {
        c_validation = { ...c_validation, valid_upi_id: true };
      }
    }

    if (checked && !upiPayment.trans_id) {
      c_validation = { ...c_validation, trans_id: true };
    } else {
      if (upiPayment?.trans_id?.length < 12) {
        c_validation = { ...c_validation, valid_trans_id: true };
      } else {
        c_validation = { ...c_validation, valid_trans_id: false };
      }
    }

    setValidation(c_validation);
    if (
      !c_validation.trans_id &&
      !c_validation.valid_trans_id &&
      !c_validation.upi_id &&
      !c_validation.valid_upi_id
    ) {
      return true;
    } else {
      return false;
    }
  };

  const getOfflinePaymentsDetails = async () => {
    try {
      setLoading(true);
      const result = await offlinePaymentsDetails();
      setPaymentDetail(result?.data?.data);

      setLoading(false);
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js ~ line 133 ~ offlinePaymentsDetails ~ error",
        error
      );
    }
  };
  const handlePaymentCovert = async (e) => {
    try {
      const result = await offlinePaymentsConvert(e);
      setPaymentApproxUsd(result?.data?.data);
    } catch (error) {
      setLoading(false);
      console.log(
        "🚀 ~ file: index.js ~ line 42 ~ offlinePaymentsConvert ~ error",
        error
      );
    }
  };

  const handlePayment = async (e) => {
    if (checkValidation()) {
      try {
        setLoading(true);
        let apiInput = { ...upiPayment };
        apiInput.txid = apiInput?.trans_id;

        const result = await offlinePaymentsSubmit(apiInput);
        if (result.status === 200) {
          // setAddFund({ ...addFund, show: false });

          toast.success("UPI deposit details submitted for processing.");
          setClosed(false);

          setTimeout(() => {
            window.location.reload();
          }, 100);
        }
      } catch (error) {
        setLoading(false);
        if (error?.data?.status === 422) {
          toast.error(error?.data?.message);
        }
        console.log(
          "🚀 ~ file: index.js ~ line 42 ~ handlePayment ~ error",
          error
        );
      }
    }
  };

  return (
    <>
      {closed && (
        <>
          <Modal
            show={show === PAYMENT_OPTS.UPIOfflinePayment}
            animation={false}
            contentClassName={`${style["payment-modal"]} ${style["set-modal-scroll"]}`}
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
            <Modal.Body
              className={`${style["payment-modal-body"]} ${style["set-modal-scroll-body"]}`}
            >
              <div className={`${style["inner-card-details"]}`}>
                {/* <div
                  className={`${style["pay-list-back"]}`}
                  role="button"
                  onClick={() => openPaymentGateway(PAYMENT_OPTS.LIST)}
                >
                  <FiArrowLeft size={25} /> Back
                </div> */}
                <div className={`${style["amount-flex-box"]}`}>
                  <div
                    className={`bg-white mt-3 p-3 ${style["current-balance"]}`}
                  >
                    <div className={`${style["cb-title"]}`}>
                      Current Balance
                    </div>
                    <div>
                      <div className={`${style["cb-balance"]}`}>
                        {currencyFormat(user.balance, user.currency_name)}
                      </div>
                    </div>
                  </div>
                  {amount > 0 && (
                    <div
                      className={`bg-white mt-3 p-3 ${style["current-balance"]}`}
                    >
                      <div className={`${style["cb-title"]}`}>
                        Amount to be added
                      </div>
                      <div>
                        <div className={`${style["cb-balance"]}`}>
                          {currencyFormat(amount)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className={`${style["popup-content-block"]}`}>
                  <div
                    className={`d-flex justify-content-between ${style["ac-cc-title"]}`}
                  >
                    <h6 className={`${style["scan-text"]}`}>
                      Scan Code <br />
                      <span>
                        ( No. of UPI deposits allowed per day:{" "}
                        {paymentdetail?.max_tx}, Remaining :{" "}
                        {paymentdetail?.rem_tx}){" "}
                      </span>
                    </h6>{" "}
                  </div>

                  <div className="text-center mt-4">
                    {paymentdetail?.link && (
                      <QRCode value={paymentdetail?.link} width="100%" />
                    )}
                  </div>

                  <div className="mt-4 mb-3">
                    <CopyToClipboardComponent
                      copyText={paymentdetail?.upi_id}
                    />
                  </div>
                  <div className={`${style["flex-input-box"]}`}>
                    <div className={`${style["inr-input"]} `}>
                      <InputText
                        type="text"
                        title={"Amount (INR) "}
                        value={upiPayment?.amount}
                        required={validation.amount}
                        grpClassName={`mb-0`}
                        className={`${style["af-amount"]}`}
                        placeholder="Amount"
                        maxLength="7"
                        onKeyPress={(e) => {
                          if (e.keyCode) {
                            return null;
                          }
                        }}
                        onChange={(e) => {
                          if (
                            e?.target?.value &&
                            e?.target?.value <= paymentdetail?.max_deposit
                          ) {
                            if (validateCurrency(e.target.value)) {
                              setUpiPayment({
                                ...upiPayment,
                                amount: e?.target?.value.trim(),
                              });
                              handlePaymentCovert(e.target?.value);
                              if (e?.target?.value) {
                                setValidation({
                                  ...validation,
                                  amount: false,
                                });
                              } else {
                                setValidation({
                                  ...validation,
                                  amount: true,
                                });
                              }
                            }
                          } else {
                            setUpiPayment({
                              ...upiPayment,
                              amount: "",
                            });
                            // if (validateCurrency(e.target.value)) {
                            handlePaymentCovert(0);
                            // }
                          }
                        }}
                      />
                    </div>

                    <div className={`${style["current-balance"]}`}>
                      <div>
                        <div className={`${style["cb-balance"]}`}>
                          ~{currencyFormat(paymentApproxUsd?.approx_usd)}
                          <ToolTip
                            content={
                              "Approx value. Conversion rate subject to change"
                            }
                            icon={
                              <BsFillInfoCircleFill
                                size={16}
                                className="ms-2 question-icon"
                              />
                            }
                            placement="top"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`${style["form-group"]} mb-3`}>
                    {" "}
                    <label className={`${style["input-title"]}`}>
                      {" "}
                      After paying in UPI app, submit the details to process the
                      payment.
                    </label>{" "}
                  </div>
                  <div className={`${style["form-group"]} mb-3`}>
                    <InputText
                      type="text"
                      title={"UPI Transaction Id"}
                      value={upiPayment?.trans_id}
                      required={validation.trans_id}
                      className="af-amount"
                      placeholder="UPI Transaction Id"
                      // onKeyPress={handleKeyPressEvent}
                      onChange={(e) => {
                        if (
                          (e.target.value.length <= 12 &&
                            validateNumber(e.target.value)) ||
                          e.target.value === ""
                        ) {
                          setUpiPayment({
                            ...upiPayment,
                            trans_id: e.target.value.trim(),
                          });
                        }
                        if (e) {
                          setValidation({ ...validation, trans_id: false });
                        } else {
                          setValidation({ ...validation, trans_id: true });
                        }
                      }}
                    />
                    {validation?.valid_trans_id && (
                      <div className={style["error_text"]}>
                        Please enter 12-digit UPI transaction ID
                      </div>
                    )}
                  </div>
                  <div className={`${style["form-group"]} mb-3`}>
                    <InputText
                      type="text"
                      title={"Your UPI ID"}
                      value={upiPayment?.upi_id}
                      required={validation.upi_id}
                      className="af-amount"
                      placeholder="Your UPI ID"
                      // onKeyPress={handleKeyPressEvent}
                      onChange={(e) => {
                        setUpiPayment({
                          ...upiPayment,
                          upi_id: e.target.value.trim(),
                        });
                        if (e) {
                          setValidation({ ...validation, upi_id: false });
                        } else {
                          setValidation({ ...validation, upi_id: true });
                        }
                      }}
                    />
                    {validation.valid_upi_id && (
                      <div className={style["error_text"]}>
                        Please enter a valid UPI ID
                      </div>
                    )}
                  </div>
                  <div className={`${style["form-group"]} mb-3`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                      id="checkPayment"
                    />{" "}
                    <label
                      htmlFor="checkPayment"
                      className={`${style["input-title"]}`}
                    >
                      I have made the payment
                    </label>{" "}
                  </div>
                </div>
                {checked && (
                  <>
                    <button
                      // disabled={
                      //   upiPayment?.upi_id.length === 0 ||
                      //   !validateUpi(upiPayment?.upi_id)
                      // }
                      type="button"
                      className="btn place-bid-btn mt-4 mb-2 mx-auto"
                      onClick={handlePayment}
                    >
                      Submit
                    </button>
                  </>
                )}
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default UPIPayment;
