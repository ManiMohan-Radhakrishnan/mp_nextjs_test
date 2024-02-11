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
} from "../../../utils/base-methods";
import { currencyFormat } from "../../../utils/common";
import { getCookies } from "../../../utils/cookies";

import CopyToClipboardComponent from "../../copy-to-clipboard";

import style from "./style.module.scss";

const CryptoInstructions = () => (
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

const CryptoPayment = ({
  show,
  amount = 0,
  onPaymentSuccess = () => {},
  onPaymentFailure = () => {},
  openPaymentGateway = () => {},
  onHide = () => {},
}) => {
  const { user } = useSelector((state) => state.user.data);
  const [loading, setLoading] = useState(false);
  // const [showQrcode, setShowQrcode] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let myInterval = 0;
    if (refresh) {
      myInterval = setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          setRefresh(false);
        }
      }, 1000);
    } else {
      setSeconds(30);
    }

    return () => {
      clearInterval(myInterval);
    };
  }, [seconds, refresh]);

  const fetchAddress = async () => {
    try {
      setLoading(true);
      await fireBlockFetchAddress();
      setLoading(false);
      toast.success("Your Wallet Address Was Generated Successfully.");
      dispatch(user_load_by_token_thunk(getCookies()));
    } catch (error) {
      setLoading(false);
      toast.error("An unexpected error occured. Please try again ");
      console.log(
        "🚀 ~ file: index.js ~ line 16 ~ fetchAddress ~ error",
        error
      );
    }
  };

  const fireBlockRefreshCall = async () => {
    try {
      setLoading(true);
      const result = await fireBlockRefresh();
      setLoading(false);

      if (result.data.data.balance === user.balance) {
        // if (showQrcode) {
        toast.info(
          "Now please wait for some more time & Refresh again! Rare congestions can sometimes delay payment fulfilments."
        );
        // }
      } else {
        dispatch(user_load_by_token_thunk(getCookies()));
      }
    } catch (error) {
      setLoading(false);
      // if (showQrcode) {
      toast.error("An unexpected error occured. Please try again ");
      // }
      console.log(
        "🚀 ~ file: index.js ~ line 16 ~ fetchAddress ~ error",
        error
      );
    }
  };

  return (
    <Modal
      show={show === PAYMENT_OPTS.CRYPTO}
      animation={false}
      contentClassName={`${style["payment-modal"]}  ${style['set-modal-scroll']}`}
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
      <Modal.Body className={`${style["payment-modal-body"]} ${style['set-modal-scroll-body']}`}>
        <div className={`${style["inner-card-details"]}`}>
          {/* <div
            className={`${style["pay-list-back"]}`}
            role="button"
            onClick={() => openPaymentGateway(PAYMENT_OPTS.LIST)}
          >
            <FiArrowLeft size={25} /> Back
          </div> */}

          <div className={`bg-white mt-3 p-3 ${style["current-balance"]}`}>
            <div className={`${style["cb-title"]}`}>Current Balance</div>
            <div>
              <div className={`${style["cb-balance"]}`}>
                {currencyFormat(user.balance, user.currency_name)}
              </div>
            </div>
          </div>
          {amount > 0 && (
            <div className={`bg-white mt-3 p-3 ${style["current-balance"]}`}>
              <div className={`${style["cb-title"]}`}>Amount to be added</div>
              <div>
                <div className={`${style["cb-balance"]}`}>
                  {currencyFormat(amount)}
                </div>
              </div>
            </div>
          )}

          <div className={`${style["popup-content-block"]}`}>
            {user.crypto_address ? (
              <>
                {/* {showQrcode ? ( */}
                <>
                  <div
                    className={`d-flex justify-content-between ${style["ac-cc-title"]}`}
                  >
                    <div>Scan Code</div>
                  </div>
                  <div className="text-center mt-4">
                    <QRCode value={user.crypto_address} width="100%" />
                  </div>
                  <div className="mt-4">
                    <CopyToClipboardComponent copyText={user.crypto_address} />
                  </div>
                  <button
                    disabled={refresh}
                    type="button"
                    className="btn btn-dark w-100 rounded-pill mt-4 mb-2 mx-auto"
                    onClick={() => {
                      fireBlockRefreshCall();
                      setRefresh(true);
                    }}
                  >
                    {(() => {
                      if (refresh) {
                        return `Next Refresh Available in ${seconds}s`;
                      } else if (loading && !refresh) {
                        return "Processing please wait...";
                      } else {
                        return "Refresh Balance";
                      }
                    })()}
                    {/* {refresh ? seconds : "Refresh Balance"} */}
                  </button>
                </>
                {/* ) : (
                  <CryptoInstructions />
                )} */}

                {/* {!showQrcode && (
                  <button
                    type="button"
                    className="btn btn-dark w-100 rounded-pill mt-2 mb-4 mx-auto"
                    onClick={() => {
                      setShowQrcode(!showQrcode);
                      fireBlockRefreshCall();
                    }}
                  >
                    Show Address
                  </button>
                )} */}
              </>
            ) : (
              <>
                <button
                  disabled={loading}
                  type="button"
                  className={`btn btn-dark w-100 rounded-pill ${style["btn-af-pay"]} mt-4 mb-4"`}
                  onClick={fetchAddress}
                >
                  {loading ? "Processing please wait..." : "Generate Address"}
                </button>
              </>
            )}
            <CryptoInstructions />
            {/* {showQrcode ? <CryptoInstructions /> : <></>} */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CryptoPayment;
