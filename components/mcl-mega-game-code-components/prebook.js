import { useEffect, useMemo, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { MdCheckCircle } from "react-icons/md";

import {
  active_code_buy_thunk,
  loot_buy_thunk,
  loot_prebook_thunk,
  user_load_by_token_thunk,
} from "../../redux/thunk/user_thunk";
import { getCookies } from "../../utils/cookies";
import { getUser, isLoading } from "../../redux/reducers/user_reducer";
import { currencyFormat, roundDown } from "../../utils/common";
import { LOOT_STATUS } from "./common";
import PaymentMethod from "../payment-method";

import style from "./style.module.scss";
import { activeCodeBuyApi } from "../../utils/base-methods";
import { BsCalendar4 } from "react-icons/bs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

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

const Prebook = memo(
  ({
    show = false,
    toggleModal = () => {},
    modalState = {},
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

    const onPurchase = () => {
      let payment_include = [];
      isJTEnabled && payment_include.push("jump_point");
      dispatch(
        active_code_buy_thunk({
          data: {
            slug: modalState?.loot?.slug,
            activation_codes: { payment_include },
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
        className={`prebook-modal-main`}
        centered
      >
        <Modal.Header
          className={`${
            !isPurchased ? style["prebook-modal-header"] : style["purchased"]
          }`}
          onHide={() => {
            isPurchased && onReload();
            toggleModal();
          }}
          closeButton
          closeVariant={!isPurchased ? "white" : "dark"}
        >
          <span className="fs-4">Buy Play Pass</span>
        </Modal.Header>
        <Modal.Body className={style["prebook-modal-body"]}>
          {isPurchased ? (
            <div
              className={`${style["purchase-success"]} purchase-success mt-4`}
            >
              <MdCheckCircle
                fill="green"
                style={{ width: "4rem", height: "4rem", fill: "#00A506" }}
              />
              <p className="text-dark fs-3">Purchase Successful!</p>
              {/* <div
              title="Add to Calendar"
              className="addeventatc fs-5 h"
              data-dropdown-y="up"
             >
              <BsCalendar4 />
              <span>Add to my calendar</span>
              <span className="start">
                {dayjs(modalState?.loot?.start_time).format(
                  "MM/DD/YYYY hh:mm A"
                )}
              </span>
              <span className="end">
                {dayjs(modalState?.loot?.end_time).format("MM/DD/YYYY hh:mm A")}
              </span>
              <span className="timezone">Asia/Calcutta</span>
              <span className="title">{modalState?.loot?.name}</span>
              <span className="organizer">https://jump.trade/</span>
            </div> */}
              <button
                className={`${style["theme-btn"]} mb-3 mt-4 w-100`}
                onClick={() => {
                  window.open(
                    `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/game-pass`,
                    "_blank"
                  );
                  onReload();
                  toggleModal();
                }}
              >
                View Game Pass
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
                      Pay with JT Points({`${user?.jump_points_balance} JT`})
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
                  <h6>Quantity</h6>
                  <p>{modalState?.loot?.qty_per_user}</p>
                  {/* <input
                  className={style["quantity-counter"]}
                  value={nftQuantity}
                  onChange={(e) => {
                    let quantity = parseInt(
                      e?.target?.value ? e?.target?.value : 0
                    );
                    setNftQuantity(
                      !isNaN(quantity) && quantity <= 100
                        ? quantity
                        : nftQuantity
                    );
                  }}
                ></input> */}
                </div>
                <div className={style["input-block-row"]}>
                  <h6>Play Pass</h6>
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
                        Buy your Play Pass by adding
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
                          parseFloat(breakUp?.amount_to_be_added) < 1.0
                            ? 1
                            : breakUp?.amount_to_be_added
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
                            parseFloat(breakUp?.amount_to_be_added) < 1.0
                              ? 1
                              : breakUp?.amount_to_be_added
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
                        onClick={onPurchase}
                        className={style["theme-btn"]}
                      >
                        BUY
                      </button>
                    </div>
                  )
                ) : (
                  <div
                    className={`${style["input-block-row"]} text-center  d-flex flex-column`}
                  >
                    <button disabled className={style["theme-btn"]}>
                      BUY
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    );
  }
);

Prebook.displayName = "Prebook";

export default Prebook;
