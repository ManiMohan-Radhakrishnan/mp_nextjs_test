import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { MdCheckCircle } from "react-icons/md";
import { BsFillQuestionCircleFill } from "react-icons/bs";

import {
  loot_buy_thunk,
  loot_prebook_thunk,
  user_load_by_token_thunk,
} from "../../redux/thunk/user_thunk";
import { getCookies } from "../../utils/cookies";
import { getUser, isLoading } from "../../redux/reducers/user_reducer";
import { currencyFormat, roundDown } from "../../utils/common";
import { LOOT_STATUS } from "./common";
import PaymentMethod from "../payment-method";
import ToolTip from "../tooltip";

import style from "./style.module.scss";

// For Testing
// const avl_balance = 3;
// const jt_balance = 20000;
// const total_amt = 10;
// const init_modal_state = {
//   loot_status: LOOT_STATUS.YTS,
//   loot: {
//     slug: "DYMVkPqdiw0ZyARv",
//     name: "Loot1",
//     auction_start_time: "2022-10-28T13:57:55.242Z",
//     auction_end_time: "2022-11-17T12:18:36.256Z",
//     total_quantity: 19,
//     buy_amount: "2.0",
//     qty_per_order: 1,
//     qty_per_user: 1,
//     preorder_start_time: "2022-10-18T13:57:55.242Z",
//     preorder_end_time: "2022-11-07T12:18:36.256Z",
//     preorder_qty_per_user: 1,
//     available_qty: 19,
//   },
// };

const Prebook = ({
  show = false,
  toggleModal = () => {},
  modalState = {},
  onHide = () => {},
  availableQuantity,
  onReload = () => {},
}) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const loading = useSelector(isLoading);
  // const isMinJTAvailable = useMemo(
  //   () => parseFloat(jt_balance / 10000) >= 1,
  //   [jt_balance]
  // );
  const isMinJTAvailable = useMemo(
    () => parseFloat(user?.jump_points_balance / 10000) >= 0.01,
    [user?.jump_points_balance]
  );
  const [nftQuantity, setNftQuantity] = useState(1);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isJTEnabled, enableJT] = useState(false);
  const [breakUp, setBreakUp] = useState({
    // available_balance: avl_balance,
    // available_jt_balance: jt_balance,
    available_balance: user?.balance,
    available_jt_balance: user?.jump_points_balance,
    allowBuy: false,
    amount_to_be_added: 0,
  });

  const handlePurchase = () => {
    if (nftQuantity > availableQuantity) {
      toast.error(
        `Only ${availableQuantity} ${
          availableQuantity === 1
            ? " MCL Signature Shot is"
            : " MCL Signature Shots are"
        } available.`
      );
      return;
    }
    let payment_include = [];
    isJTEnabled && payment_include.push("jump_point");
    if (modalState?.loot_status === LOOT_STATUS.PRE_BOOK)
      dispatch(
        loot_prebook_thunk({
          data: {
            slug: modalState?.loot?.slug,
            preorder_users: { quantity: nftQuantity, payment_include },
          },
          callback: dispatchCallback,
        })
      );
    if (modalState?.loot_status === LOOT_STATUS.DROP)
      dispatch(
        loot_buy_thunk({
          data: {
            slug: modalState?.loot?.slug,
            loot: { quantity: nftQuantity, payment_include },
          },
          callback: dispatchCallback,
        })
      );
  };

  const dispatchCallback = (response) => {
    if (response?.data?.status !== 200) {
      toast.error(
        response?.data?.message ||
          "Something went wrong. Please try again later."
      );
      toggleModal();
    }
    setIsPurchased(response?.status === 200);
  };

  const refreshBalance = () => {
    if (loading) return;
    let token = getCookies("token");
    dispatch(user_load_by_token_thunk(token));
  };

  useEffect(() => {
    let { loot = {} } = modalState;
    let price_from_jt = 0;
    let price_from_glw = 0;
    let amount_to_be_added = 0;
    // let balance = avl_balance ;
    // let jump_points_balance = jt_balance;
    // let total_price = total_amt ;
    let balance = parseFloat(user?.balance || 0);
    let jump_points_balance = user?.jump_points_balance || 0;
    let total_price = nftQuantity * parseInt(loot?.buy_amount);
    if (isJTEnabled && jump_points_balance > 0)
      price_from_jt =
        jump_points_balance >= total_price * 10000
          ? total_price
          : parseFloat(jump_points_balance / 10000);
    if (balance > 0)
      price_from_glw =
        balance >= total_price - price_from_jt
          ? total_price - price_from_jt
          : balance;

    if (price_from_jt + price_from_glw < total_price)
      amount_to_be_added = total_price - (price_from_jt + price_from_glw);
    setBreakUp({
      total: total_price - price_from_jt,
      sub_total: total_price,
      price_from_jt: price_from_jt,
      price_from_glw: price_from_glw,
      available_balance:
        balance - price_from_glw > 0 ? balance - price_from_glw : 0,
      available_jt_balance:
        jump_points_balance - price_from_jt * 10000 > 0
          ? jump_points_balance - price_from_jt * 10000
          : 0,
      allowBuy:
        price_from_jt + price_from_glw === total_price && total_price > 0,
      amount_to_be_added,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isJTEnabled, nftQuantity, user?.balance]);

  return (
    <Modal
      show={show}
      animation={false}
      contentClassName={`${style["prebook-modal"]} prebook-modal`}
      centered
    >
      <Modal.Header
        className={`${
          !isPurchased ? style["prebook-modal-header"] : style["purchased"]
        }`}
        onHide={() => {
          isPurchased && onHide();
          onReload();
          toggleModal();
        }}
        closeButton
        closeVariant={!isPurchased ? "white" : "dark"}
      >
        <span className="fs-4">{`${
          modalState?.loot_status === LOOT_STATUS.DROP ? "BUY" : "PRE-BOOK"
        }  MCL Signature Shots`}</span>
      </Modal.Header>
      <Modal.Body className={style["prebook-modal-body"]}>
        {isPurchased ? (
          <div className={style["purchase-success"]}>
            <MdCheckCircle
              fill="green"
              style={{ width: "4rem", height: "4rem", fill: "#00A506" }}
            />
            <p className="text-dark fs-3">{`${
              modalState?.loot_status === LOOT_STATUS.DROP
                ? "Purchase"
                : "Pre-Book"
            } Successful!`}</p>
            <button
              className={`${style["theme-btn"]} mb-3 mt-4 w-100`}
              onClick={() => {
                let url =
                  modalState?.loot_status === LOOT_STATUS.DROP
                    ? "/accounts/mynft"
                    : "/accounts/pre-orders";
                window.open(
                  `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}${url}`,
                  "_blank"
                );
                onReload();
                toggleModal();
              }}
            >
              {modalState?.loot_status === LOOT_STATUS.DROP
                ? "View My NFTs"
                : "View Order Summary"}
            </button>
          </div>
        ) : (
          <>
            <div className="d-flex flex-column text-dark preorder-popup-top">
              <div
                className={`${style["input-block-row"]} ${style["valign-top"]}`}
              >
                <div className={style["input-block"]}>
                  <h6 className="m-0">Current GL Balance</h6>
                  <a
                    onClick={refreshBalance}
                    className={`${style["link"]} ${style["link-blue"]} ${
                      loading ? style["link-disabled"] : ""
                    }`.trim()}
                  >
                    {!loading ? "Refresh Bal." : "Refreshing..."}
                  </a>
                </div>
                <p className="m-0 fw-bold">
                  {currencyFormat(user?.balance || 0)}
                </p>
                {/* <p>{currencyFormat(avl_balance || 0)}</p> */}
              </div>
              <div className={style["input-block-row"]}>
                <div className={`${style["input-block-row"]} mb-0`}>
                  <input
                    type="checkbox"
                    disabled={!isMinJTAvailable}
                    checked={isJTEnabled}
                    onChange={() => enableJT(!isJTEnabled)}
                  ></input>{" "}
                  &nbsp;
                  <h6 className="m-0">
                    Pay with JT Points ({`${user?.jump_points_balance} JT`})
                  </h6>
                  {/* <h6 className="m-0">JT Points ({`${jt_balance} JT`})</h6> */}
                </div>
                <p>
                  {`${currencyFormat(
                    roundDown(user?.jump_points_balance / 10000) || 0
                  )}`}
                </p>
                {/* <p>{`${currencyFormat(parseFloat(jt_balance / 10000) || 0)}`}</p> */}
              </div>
              <hr />
              <div className={style["input-block-row"]}>
                <h6>
                  Quantity
                  <ToolTip
                    icon={
                      <BsFillQuestionCircleFill
                        color={"#ec7c49"}
                        size={14}
                        className="mb-1 mx-1 check-icon"
                      />
                    }
                    content={
                      parseInt(modalState?.loot?.qty_per_user) === 1 ? (
                        "1 Qty per user."
                      ) : (
                        <>{`Only ${availableQuantity} ${
                          availableQuantity === 1 ? "is" : "are"
                        } available.`}</>
                      )
                    }
                    placement="right"
                  />
                </h6>
                {parseInt(modalState?.loot?.qty_per_user) === 1 ? (
                  "1"
                ) : (
                  <input
                    className={style["quantity-counter"]}
                    value={nftQuantity}
                    onChange={(e) => {
                      let quantity = parseInt(
                        e?.target?.value ? e?.target?.value : 0
                      );
                      if (!isNaN(quantity) && quantity <= availableQuantity)
                        setNftQuantity(quantity);
                    }}
                  ></input>
                )}
              </div>
              <div className={style["input-block-row"]}>
                <h6> MCL Signature Shots</h6>
                <p>
                  {currencyFormat(
                    nftQuantity * parseInt(modalState?.loot?.buy_amount)
                  )}
                </p>
              </div>
              {isJTEnabled && (
                <>
                  <hr />
                  <div className={style["input-block-row"]}>
                    <h6>{`Used JT Points (${parseInt(
                      Math.ceil(breakUp?.price_from_jt * 10000)
                    )} JT)`}</h6>
                    <p>{`- ${currencyFormat(
                      roundDown(breakUp?.price_from_jt)
                    )}`}</p>
                  </div>
                </>
              )}
              {breakUp?.allowBuy && (
                <>
                  <hr />
                  <div className={style["input-block-row"]}>
                    <h6 className="m-0 fw-bold">Total Amount</h6>
                    <p className="m-0 fw-bold">{`${currencyFormat(
                      breakUp?.price_from_glw
                    )}`}</p>
                  </div>
                </>
              )}
              {breakUp?.sub_total > 0 && !breakUp?.allowBuy && (
                <>
                  <div
                    className={`${style["input-block-row"]} ${style["dashed-top-border"]}`}
                  >
                    <h6 className="m-0 fw-bold">
                      {`${
                        modalState?.loot_status === LOOT_STATUS.DROP
                          ? "Buy"
                          : "Pre-book"
                      } your NFT by adding`}
                      <br />
                      {parseFloat(breakUp?.amount_to_be_added) < 1.0 && (
                        <span className="text-danger">
                          {" "}
                          (Add min. funds of $1)
                        </span>
                      )}
                    </h6>
                    <p className="m-0 fw-bold">
                      {currencyFormat(
                        parseFloat(breakUp?.amount_to_be_added) >= 1
                          ? breakUp?.amount_to_be_added
                          : 1
                      )}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="preorder-popup-bottom">
              {breakUp?.sub_total > 0 ? (
                !breakUp?.allowBuy ? (
                  <>
                    <div
                      className={`${style["input-block-row"]} d-flex flex-column w-100 `}
                    >
                      {/* <div className={style["pack-payment-detail"]}> */}
                      <PaymentMethod
                        defaultAmount={
                          parseFloat(breakUp?.amount_to_be_added) >= 1
                            ? breakUp?.amount_to_be_added
                            : 1
                        }
                      />
                      {/* </div> */}
                    </div>
                  </>
                ) : (
                  <div
                    className={`${style["input-block-row"]} text-center  d-flex flex-column`}
                  >
                    <button
                      onClick={handlePurchase}
                      className={style["theme-btn"]}
                    >
                      {modalState?.loot_status === LOOT_STATUS.DROP
                        ? "BUY"
                        : "PRE-BOOK"}
                    </button>
                  </div>
                )
              ) : (
                <div
                  className={`${style["input-block-row"]} text-center  d-flex flex-column`}
                >
                  <button disabled className={style["theme-btn"]}>
                    {modalState?.loot_status === LOOT_STATUS.DROP
                      ? "BUY"
                      : "PRE-BOOK"}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Prebook;
