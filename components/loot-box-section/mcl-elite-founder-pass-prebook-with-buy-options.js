import { useEffect, useMemo, useRef, useState } from "react";
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
import { getUser, isLoading } from "../../redux/reducers/user_reducer";
import { getCookies } from "../../utils/cookies";
import {
  getDropPriceBreakup,
  getPrebookPriceBreakup,
} from "../../utils/methods";
import { currencyFormat, roundDown } from "../../utils/common";
import { fetchAllowedAssets } from "../../utils/base-methods";

import { PAYMENT_OPTS } from "../PaymentOptions/config";
import { LOOT_STATUS } from "./common";
import ToolTip from "../tooltip";
import PaymentList from "../PaymentOptions/PaymentList";
import PaymentOptions from "../PaymentOptions";

import style from "./style.module.scss";
import useDebounce from "../../utils/useDebounce";

const MclFounderPassPrebook = ({
  show = false,
  toggleModal = () => {},
  modalState = {},
  onHide = () => {},
  onReload = () => {},
  slug = "",
  quantityPerOrder = 1,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const loading = useSelector(isLoading);
  const effectInit = useRef(true);

  const [nftQuantity, setNftQuantity] = useState(quantityPerOrder);

  const [isPurchased, setIsPurchased] = useState(false);
  const [isJTEnabled, enableJT] = useState(false);
  const [isRewardsEnabled, enableRewards] = useState(false);
  const [nftPriceBreakUp, setNftPriceBreakUp] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [allowedAssets, setAllowedAssets] = useState({});
  const [priceLoading, setPriceLoading] = useState(false);
  const [isPurchaseInitiated, setIsPurchaseInitiated] = useState(false);
  useDebounce(() => fetchPaymentSplits(), 500, nftQuantity);

  const user_balance = user?.balance;
  const jump_point_balance = user?.assert_balances?.jump_point || 0;
  const reward_point_balance = user?.assert_balances?.reward_point || 0;
  const insufficient_balance = nftPriceBreakUp?.usd?.value > user_balance;
  const amount_to_be_added = insufficient_balance
    ? parseFloat(
        roundDown(nftPriceBreakUp?.usd?.value) - roundDown(user_balance)
      )
    : 0;

  const { loot = {} } = modalState;
  const nft_price = nftQuantity * parseFloat(loot?.buy_amount);
  const used_reward_points = nftPriceBreakUp?.reward_point?.value || 0;
  const used_reward_points_in_usd =
    nftPriceBreakUp?.reward_point?.value_in_usd || 0;
  const used_jt_points = nftPriceBreakUp?.jump_point?.value || 0;
  const used_jt_points_in_usd = nftPriceBreakUp?.jump_point?.value_in_usd || 0;

  const isMinJTAvailable = useMemo(
    () => parseFloat(jump_point_balance / 10000) >= 0.01,
    [jump_point_balance]
  );

  const isMinRewardAvailable = useMemo(
    () => parseFloat(reward_point_balance) >= 0.01,
    [reward_point_balance]
  );

  const handlePurchase = () => {
    let payment_include = [];
    isRewardsEnabled && payment_include.push("reward_point");
    isJTEnabled && payment_include.push("jump_point");
    setIsPurchaseInitiated(true);
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
      // toggleModal();
    }
    setIsPurchased(response?.status === 200);
  };

  const refreshBalance = () => {
    if (loading) return;
    let token = getCookies("token");
    dispatch(user_load_by_token_thunk(token));
  };

  const getAllowedAssets = async () => {
    const response = await fetchAllowedAssets();
    let allowed_assets = response?.data?.data || [];
    setAllowedAssets(allowed_assets);
  };

  const convertPointsToUSD = (points, point_type = "jump_point") => {
    if (allowedAssets && allowedAssets[point_type]) {
      let usd_per_qty = parseFloat(allowedAssets[point_type]?.usd_per_qty);
      let usd_value = parseFloat(points) * usd_per_qty;
      return roundDown(parseFloat(usd_value), 2);
    } else return 0;
  };

  const handleAssetSelect = (e) => {
    let current_value = e.target.checked;
    let current_asset = e.target.name || "";

    let reward_point_balance_in_usd = convertPointsToUSD(
      reward_point_balance,
      "reward_point"
    );

    let has_surplus_reward_points =
      reward_point_balance_in_usd >= nftPriceBreakUp?.total;

    if (current_asset === "reward_point") {
      enableRewards(current_value);
      if (current_value && has_surplus_reward_points) enableJT(false);
    }
    if (current_asset === "jump_point") {
      enableJT(current_value);
      if (current_value && has_surplus_reward_points) enableRewards(false);
    }
  };

  const fetchPaymentSplits = async () => {
    let payment_include = [];
    if (isRewardsEnabled) payment_include.push("reward_point");
    if (isJTEnabled) payment_include.push("jump_point");
    try {
      let result = {};
      setPriceLoading(true);
      if (modalState?.loot_status === LOOT_STATUS.PRE_BOOK)
        result = await getPrebookPriceBreakup({
          slug,
          request: { payment_include, quantity: nftQuantity },
        });
      if (modalState?.loot_status === LOOT_STATUS.DROP)
        result = await getDropPriceBreakup({
          slug,
          request: { payment_include, quantity: nftQuantity },
        });
      if (Array.isArray(result?.data?.data?.splitup)) {
        let { splitup = [], total } = result?.data?.data;
        let payment_split = splitup.reduce(
          (acc, curr) => ({ ...acc, ...curr }),
          { total }
        );
        setNftPriceBreakUp(payment_split);
      } else setNftPriceBreakUp(result?.data?.data);
    } catch (error) {
      console.log("Error in fetch payment split", error);
    } finally {
      setPriceLoading(false);
    }
  };

  const openPaymentGateway = (paymentGateway) => {
    setPaymentMethod(paymentGateway);
  };

  const handlePaymentSuccess = () => {
    // console.log("Payment Success");
    refreshBalance();
    openPaymentGateway(null);
  };

  const handlePaymentFailure = () => {
    // console.log("Payment Failure");
    setPaymentMethod(null);
  };

  useEffect(() => {
    if (!isPurchaseInitiated) fetchPaymentSplits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRewardsEnabled, isJTEnabled, user_balance]);

  useEffect(() => {
    if (effectInit.current) {
      getAllowedAssets();
      effectInit.current = false;
    }
  }, []);

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
        }  ${loot?.name}`}</span>
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
                  "_self"
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
                  {currencyFormat(roundDown(user_balance) || 0)}
                </p>
              </div>
              {allowedAssets?.reward_point && (
                <div className={style["input-block-row"]}>
                  <div className={`${style["input-block-row"]} mb-0`}>
                    <input
                      id="reward_point_checkbox"
                      type="checkbox"
                      name="reward_point"
                      disabled={!isMinRewardAvailable}
                      checked={isRewardsEnabled}
                      onChange={handleAssetSelect}
                    ></input>{" "}
                    &nbsp;
                    <label
                      className={`${style["asset-label"]} m-0`}
                      htmlFor="reward_point_checkbox"
                    >
                      {allowedAssets?.reward_point?.display_name}
                    </label>
                  </div>
                  <p>
                    ${convertPointsToUSD(reward_point_balance, "reward_point")}
                  </p>
                </div>
              )}
              {allowedAssets?.jump_point && (
                <div className={style["input-block-row"]}>
                  <div className={`${style["input-block-row"]} mb-0`}>
                    <input
                      id="jump_point_checkbox"
                      type="checkbox"
                      name="jump_point"
                      disabled={!isMinJTAvailable}
                      checked={isJTEnabled}
                      onChange={handleAssetSelect}
                    ></input>{" "}
                    &nbsp;
                    <label
                      className={`${style["asset-label"]} m-0`}
                      htmlFor="jump_point_checkbox"
                    >
                      {allowedAssets?.jump_point?.display_name} (
                      {`${jump_point_balance} JT`})
                    </label>
                  </div>
                  <p>${convertPointsToUSD(jump_point_balance)}</p>
                </div>
              )}
              <hr />

              <div className={style["input-block-row"]}>
                <h6>
                  Quantity
                  {/* <ToolTip
                    icon={
                      <BsFillQuestionCircleFill
                        color={"#ec7c49"}
                        size={14}
                        className="mb-1 mx-1 check-icon"
                      />
                    }
                    content={
                      parseInt(modalState?.loot?.pre_qty_per_user) === 1 ? (
                        "1 Qty per user."
                      ) : (
                        <>
                          Each user can buy maximum{" "}
                          {modalState?.loot?.preorder_qty_per_order} Pass box
                          at a time
                        </>
                      )
                    }
                    placement="right"
                  /> */}
                </h6>

                {modalState?.loot?.flow_status === "book" ? (
                  <>
                    {parseInt(modalState?.loot?.preorder_qty_per_user) === 1 ? (
                      "1"
                    ) : (
                      <input
                        className={style["quantity-counter"]}
                        value={nftQuantity}
                        onChange={(e) => {
                          let quantity = parseInt(
                            e?.target?.value ? e?.target?.value : 0
                          );
                          if (
                            !isNaN(quantity) &&
                            quantity <= loot?.preorder_qty_per_order
                          )
                            setNftQuantity(quantity);
                        }}
                      ></input>
                    )}
                  </>
                ) : (
                  <>
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
                          if (
                            !isNaN(quantity) &&
                            quantity <= loot?.preorder_qty_per_order
                          )
                            setNftQuantity(quantity);
                        }}
                      ></input>
                    )}
                  </>
                )}
              </div>
              <div className={style["input-block-row"]}>
                <h6> MCL Elite Founder Pass Box</h6>
                <p>{`$${nft_price || 0}`}</p>
              </div>
              {isRewardsEnabled && (
                <>
                  <hr />
                  <div className={`${style["input-block-row"]} `.trim()}>
                    <h6>
                      {`Used ${allowedAssets?.reward_point?.display_name} (${used_reward_points})`}{" "}
                    </h6>
                    <p>{`- $${used_reward_points_in_usd}`}</p>
                  </div>
                </>
              )}
              {isJTEnabled && (
                <>
                  <div className={`${style["input-block-row"]} `.trim()}>
                    <h6>
                      {`Used ${allowedAssets?.jump_point?.display_name} (${used_jt_points})`}{" "}
                    </h6>
                    <p
                      className={`${priceLoading && style["blur-loader"]}`}
                    >{`- $${used_jt_points_in_usd}`}</p>
                  </div>
                </>
              )}
              {!insufficient_balance && (
                <>
                  <hr />
                  <div className={`${style["input-block-row"]} `.trim()}>
                    <h6 className="m-0 fw-bold">Total Amount</h6>
                    <p
                      className={`m-0 fw-bold ${
                        priceLoading ? "blur-loader" : ""
                      }`}
                    >{`$${nftPriceBreakUp?.usd?.value || 0}`}</p>
                  </div>
                </>
              )}
              {insufficient_balance ? (
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
                      {amount_to_be_added < 1 ? (
                        <span className="text-danger">
                          (Add min. funds of $1)
                        </span>
                      ) : (
                        <></>
                      )}
                    </h6>
                    <p className="m-0 fw-bold">
                      {currencyFormat(
                        amount_to_be_added >= 1 ? amount_to_be_added : 1
                      )}
                    </p>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="preorder-popup-bottom">
              {insufficient_balance ? (
                <div
                  className={`${style["input-block-row"]} d-flex flex-column w-100 `}
                >
                  {/* <PaymentMethod
                    defaultAmount={
                      parseFloat(amount_to_be_added) >= 1
                        ? amount_to_be_added
                        : 1
                    }
                  /> */}
                  <PaymentList
                    className="drop-payment-list"
                    userBalance={user_balance}
                    amount={
                      parseFloat(amount_to_be_added) <= 1.0
                        ? 1
                        : amount_to_be_added
                    }
                    defaultPaymentMethod={PAYMENT_OPTS.UPIOfflinePayment}
                    onHide={() => setPaymentMethod(null)}
                    openPaymentGateway={openPaymentGateway}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentFailure={handlePaymentFailure}
                  ></PaymentList>
                  <PaymentOptions
                    show={paymentMethod}
                    amount={
                      parseFloat(amount_to_be_added) <= 1.0
                        ? 1
                        : amount_to_be_added
                    }
                    onHide={() => setPaymentMethod(null)}
                    openPaymentGateway={openPaymentGateway}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentFailure={handlePaymentFailure}
                  />
                </div>
              ) : (
                <div
                  className={`${style["input-block-row"]} text-center  d-flex flex-column`}
                >
                  <button
                    onClick={handlePurchase}
                    className={style["theme-btn"]}
                    disabled={nftQuantity === 0}
                  >
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

export default MclFounderPassPrebook;
