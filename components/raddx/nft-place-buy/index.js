import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import dayjs from "dayjs";
import { Offcanvas } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { toast } from "react-toastify";

import { PAYMENT_OPTS } from "../../PaymentOptions/config";
import { user_load_by_token_thunk } from "../../../redux/thunk/user_thunk";
import images from "../../../utils/images.json";
import {
  bidBuyError,
  dynamicDecimalPrecision,
  roundDown,
} from "../../../utils/common";
import {
  getNftPriceBreakup,
  nftBundleBuyApi,
  nftBuyApi,
} from "../../../utils/methods";
import { fetchAllowedAssets } from "../../../utils/base-methods";
import * as fbq from "../../../utils/fbpixel";
import { getCookies } from "../../../utils/cookies";

import ToolTip from "../../tooltip/index";
import PaymentList from "../../PaymentOptions/PaymentList";
import PaymentOptions from "../../PaymentOptions";
import GradientCircularLoader from "../../loaders/gradient-circular-loader";

import lock from "../../../images/lock.svg";

import style from "./style.module.scss";

const initialBuyState = {
  amountClass: "",
  progressError: "",
  buttonDisable: true,
  processClass: "",
  buttonName: "Confirm",
  isError: false,
  errorTitle: "",
  errorDescription: "",
  buyTypeDollar: false,
  buyTypeJt: false,
  buyTypeReward: false,
  buyJT: 0,
  buyDollar: 0,
  buyReward: 0,
  remainingBalance: 0,
  serviceFee: 0,
  subTotal: 0,
  total: 0,
};

const NFTPlaceBuy = ({
  placeBuyPop = false,
  setPlaceBuyPop,
  nft,
  orderDetails = {},
  availableQty,
  totalQty,
  soldOut,
  transferringNFT,
  isOrderOnSale,
  isOrderCancelled,
  orderSlug,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.data);
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState({});
  const [noBalance, setNoBalance] = useState(false);
  const [buyQuantity, setBuyQuantity] = useState("");
  const [allowedAssets, setAllowedAssets] = useState({});
  const [buy, setBuy] = useState(initialBuyState);
  const [isJTused, setIsJTused] = useState(false);
  const [isRewardUsed, setIsRewardUsed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [nftPriceBreakup, setNftPriceBreakup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);

  const isBundle = nft?.order_details?.bundle ? true : false;
  const bundleInfo = nft?.order_details?.bundle_details || [];

  const erc721 = nft.nft_type === "erc721";
  const buy_amount = isBundle
    ? nft?.order_details?.total_bundle_amount
    : orderDetails?.buy_amount;

  const user_balance = parseFloat(user?.balance);
  const jump_point_balance = user?.assert_balances?.jump_point || 0;
  const reward_point_balance = user?.assert_balances?.reward_point || 0;

  const jumpBalanceLocked = parseInt(jump_point_balance) < 100;
  const rewardPointsLocked = parseInt(reward_point_balance) <= 0;
  const amount_to_be_added = parseFloat(nftPriceBreakup?.total)
    ? parseFloat(nftPriceBreakup?.total) - user_balance
    : 0;

  const used_jt_points = dynamicDecimalPrecision(
    nftPriceBreakup?.jump_point?.buy_value +
      nftPriceBreakup?.jump_point?.service_fee +
      nftPriceBreakup?.jump_point?.tds_fee
  );

  const used_jt_points_in_usd = dynamicDecimalPrecision(
    nftPriceBreakup?.jump_point?.buy_value_in_usd +
      nftPriceBreakup?.jump_point?.service_fee_in_usd +
      nftPriceBreakup?.jump_point?.tds_fee_in_usd
  );

  const used_reward_points = dynamicDecimalPrecision(
    nftPriceBreakup?.reward_point?.buy_value +
      nftPriceBreakup?.reward_point?.service_fee +
      nftPriceBreakup?.reward_point?.tds_fee
  );

  const used_reward_points_in_usd = dynamicDecimalPrecision(
    nftPriceBreakup?.reward_point?.buy_value_in_usd +
      nftPriceBreakup?.reward_point?.service_fee_in_usd +
      nftPriceBreakup?.reward_point?.tds_fee_in_usd
  );

  const convertPointsToUSD = useCallback(
    (points, point_type = "jump_point") => {
      if (allowedAssets && allowedAssets[point_type]) {
        let usd_per_qty = parseFloat(allowedAssets[point_type]?.usd_per_qty);
        let usd_value = parseFloat(points) * usd_per_qty;
        return roundDown(parseFloat(usd_value), 2);
      } else return 0;
    },
    [allowedAssets]
  );

  const openPaymentGateway = useCallback((paymentGateway) => {
    setPaymentMethod(paymentGateway);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePaymentSuccess = useCallback(() => {
    // handleBuy();
    refreshBalance();
    openPaymentGateway(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePaymentFailure = useCallback(() => {
    setPaymentMethod(null);
  }, []);

  const refreshBalance = useCallback(() => {
    const token = getCookies();
    if (token) dispatch(user_load_by_token_thunk(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBuy = async () => {
    setLoading(true);
    if (!user)
      window.open(
        `${process.env.REACT_APP_APP_ACCOUNTS_URL}/signin?redirect=${window.location.href}`,
        "_self"
      );
    let assert_list = [];
    if (isRewardUsed && !rewardPointsLocked) assert_list.push("reward_point");
    if (isJTused && !jumpBalanceLocked) assert_list.push("jump_point");
    setBuy({
      ...buy,
      progressError: "loading",
      processClass: "process",
      buttonName: "Processing...",
      buttonDisable: true,
    });
    try {
      let result = {};
      if (isBundle) {
        result = await nftBundleBuyApi({
          order: {
            bundle_id: nft?.order_details?.bundle_id,
            assert_list,
          },
        });
      } else {
        result = await nftBuyApi({
          order_slug: orderSlug,
          order: {
            quantity: erc721 ? 1 : parseInt(buyQuantity),
            assert_list,
          },
        });
      }
      if (result.data.success) {
        setSuccess(true);
        setSuccessData(result.data.data.buy);
        setBuy({
          ...buy,
          progressError: "",
          processClass: "",
          buttonName: "Buy NFTs",
          buttonDisable: false,
        });
        if (process.env.NEXT_PUBLIC_MARKETING_SCRIPT === "enabled") {
          mixpanel.track("Purchased", {
            quantity: result.data.data.buy.quantity,
            amount: result.data.data.buy.amount,
          });

          fbq.pageView();
          fbq.event("Purchase", {
            currency: "USD",
            value: buy_amount,
          });
        }
        refreshBalance();
      }
      setLoading(false);
    } catch (error) {
      let err = {};
      if (error?.response?.data?.status === 422) {
        err = bidBuyError(error?.response?.data?.fail_status);
        setBuy({
          ...buy,
          isError: true,
          progressError: "error-progress",
          errorTitle: err.title,
          errorDescription: err.description,
        });
      } else if (error?.response?.data?.status === 404) {
        err = bidBuyError(404);
        setBuy({
          ...buy,
          isError: true,
          progressError: "error-progress",
          errorTitle: err.title,
          errorDescription: err.description,
        });
      } else {
        err = bidBuyError(error?.response?.data?.fail_status);
        setBuy({
          ...buy,
          isError: true,
          progressError: "error-progress",
          errorTitle: err.title,
          errorDescription: err.description,
        });
      }

      if (error?.response?.data?.fail_status)
        toast.error(`${err?.title} ${err?.description}`);
      setLoading(false);
      setPlaceBuyPop(false);
    }
  };

  const onHide = () => {
    setNftPriceBreakup(null);
    setSuccess(false);
    setBuyQuantity("");
    setBuy({
      ...initialBuyState,
      buttonDisable: erc721 ? false : true,
    });
    setIsRewardUsed(false);
    setIsJTused(false);
    setPlaceBuyPop(false);
  };

  const getAllowedAssets = async () => {
    const response = await fetchAllowedAssets();
    let allowed_assets = response?.data?.data || {};
    setAllowedAssets(allowed_assets);
  };

  const calculateNftPriceBreakup = async () => {
    nftPriceBreakup ? setPriceLoading(true) : setLoading(true);
    if (buy_amount) {
      let assert_list = [];
      if (!rewardPointsLocked && isRewardUsed) assert_list.push("reward_point");
      if (!jumpBalanceLocked && isJTused) assert_list.push("jump_point");
      const result = await getNftPriceBreakup({
        amount: buy_amount,
        assert_list: assert_list,
      });
      let price_breakup = result?.data?.data || {};
      let no_balance = parseFloat(price_breakup?.total) > user_balance;
      setNoBalance(no_balance);
      setNftPriceBreakup(price_breakup || {});
    }
    setPriceLoading(false);
    setLoading(false);
  };

  const handleAssetSelect = (e) => {
    let current_value = e.target.checked;
    let current_asset = e.target.name || "";

    let reward_point_balance_in_usd = convertPointsToUSD(
      reward_point_balance,
      "reward_point"
    );
    let jump_point_balance_in_usd = convertPointsToUSD(
      jump_point_balance,
      "jump_point"
    );

    let has_surplus_reward_points =
      reward_point_balance_in_usd >= nftPriceBreakup?.sub_total;

    let has_surplus_jump_points =
      jump_point_balance_in_usd >= nftPriceBreakup?.sub_total;

    if (current_asset === "reward_point") {
      setIsRewardUsed(current_value);
      if (current_value && has_surplus_reward_points) setIsJTused(false);
    }
    if (current_asset === "jump_point") {
      setIsJTused(current_value);
      if (current_value && has_surplus_reward_points) setIsRewardUsed(false);
    }
  };

  useEffect(() => {
    if (placeBuyPop) {
      Object.keys(allowedAssets).length === 0 && getAllowedAssets();
      calculateNftPriceBreakup();
      // calculateNftOrderBreakup();
    } else onHide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeBuyPop, isRewardUsed, isJTused]);

  // Closed the Popup when the NFT is soldout
  useEffect(() => {
    if (soldOut && !success) setPlaceBuyPop(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soldOut]);

  return (
    <Offcanvas
      show={placeBuyPop}
      onHide={onHide}
      placement="end"
      className={"w-100 w-md-50 w-lg-42"}
    >
      <Offcanvas.Body
        className={`p-0 pop-body-buy-container jtbuy-body-content ${style["buynft-popup"]}`}
      >
        {loading ? (
          <GradientCircularLoader />
        ) : (
          <>
            {" "}
            {user ? (
              <>
                <div
                  className={`pop-nft-buy-details ${
                    priceLoading ? style["blur"] : ""
                  }`.trim()}
                >
                  {!success ? (
                    <>
                      <div className={"pop-head-content"}>
                        <div className={"pop-buy-title"}>
                          {!isBundle
                            ? "Purchase Your NFT"
                            : "Purchase Your NFTs"}
                        </div>
                        <div
                          className={"close-button-pop"}
                          onClick={() => {
                            setPlaceBuyPop(!placeBuyPop);
                          }}
                        >
                          <Image
                            unoptimized={true}
                            alt="place bid logo"
                            height={10}
                            width={10}
                            src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e"
                          />
                        </div>
                      </div>

                      <div className={`pop-buy-progress ${buy.progressError}`}>
                        <div className={"progress-complete"}></div>
                      </div>
                      <div
                        className={`pop-body-buy-content reward-buy-progress ${
                          amount_to_be_added > 0 ? "" : "with__other-payment"
                        }`}
                      >
                        {/* with__other-payment */}
                        {isBundle ? (
                          <div className={`bundle-nft-dox`}>
                            {bundleInfo.map((bundle = {}, i) => (
                              <BundleAsset
                                key={`${bundle.nft_slug || "bundle-" + i}`}
                                nft={nft}
                                bundle={bundle}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className={"pop-nft-info"}>
                            <div className={"pop-nft-media"}>
                              {(() => {
                                if (nft?.asset_type?.includes("image")) {
                                  return (
                                    <Image
                                      unoptimized={true}
                                      alt="media_logo"
                                      height={340}
                                      width={340}
                                      className={"type_image typeimg_audio"}
                                      src={
                                        nft.asset_url
                                          ? nft.asset_url
                                          : "/sample.gif"
                                      }
                                      loading="lazy"
                                    />
                                  );
                                } else if (nft?.asset_type?.includes("audio")) {
                                  return (
                                    <>
                                      <Image
                                        unoptimized={true}
                                        alt="media_logo"
                                        height={340}
                                        width={340}
                                        className={"type_image typeimg_audio"}
                                        src={
                                          nft.cover_url
                                            ? nft.cover_url
                                            : "/sample.gif"
                                        }
                                        loading="lazy"
                                      />
                                    </>
                                  );
                                } else if (nft?.asset_type?.includes("video")) {
                                  return (
                                    <Image
                                      unoptimized={true}
                                      alt="media_logo"
                                      height={340}
                                      width={340}
                                      className={"type_image typeimg_audio"}
                                      src={
                                        nft.cover_url
                                          ? nft.cover_url
                                          : "/sample.gif"
                                      }
                                      loading="lazy"
                                    />
                                  );
                                } else {
                                  return (
                                    <Image
                                      unoptimized={true}
                                      alt="media_logo"
                                      height={340}
                                      width={340}
                                      className={"type_image typeimg_audio"}
                                      src={
                                        nft.asset_url
                                          ? nft.asset_url
                                          : "/sample.gif"
                                      }
                                      loading="lazy"
                                    />
                                  );
                                }
                              })()}
                            </div>

                            <div className={"pop-nft-content"}>
                              <div className={"pop-author-name"}>
                                <span
                                  className={style["pop-author-name-category"]}
                                >
                                  {nft?.category_name}
                                </span>
                                {!erc721 && (
                                  <div className={"erc-type"}>
                                    {availableQty >= 0 && availableQty != null
                                      ? `${availableQty} / ${
                                          totalQty != null
                                            ? totalQty
                                            : orderDetails.total_quantity
                                        }`
                                      : `${orderDetails.available_quantity} / ${orderDetails.total_quantity}`}
                                  </div>
                                )}
                              </div>
                              <div className={`pop-nft-title text-center mb-1`}>
                                {nft?.name}
                              </div>
                              {/* <div className={"price-box"}>
                          <span className={style["price-title"]}>
                            Price of NFT
                          </span>
                          <h5>
                            <span className={style["dollar"]}>
                              {currencyFormat(buyAmount, "USD")}
                            </span>{" "}
                          </h5>
                        </div> */}
                            </div>
                          </div>
                        )}
                        <div
                          className={`${style["sticky-bottom-fix"]} ${style["buyfee-block"]}`}
                        >
                          <div className={`${style["input-buyfee-wrap"]} mt-4`}>
                            <div
                              className={`${style["checkbox"]} ${style["buy-checkbox"]}`}
                            >
                              <label>
                                {!rewardPointsLocked ? (
                                  <>
                                    <input
                                      name="reward_point"
                                      onChange={handleAssetSelect}
                                      checked={isRewardUsed}
                                      type="checkbox"
                                    />
                                    <span className={style["checkbox__mark"]}>
                                      <BiCheck />
                                    </span>
                                  </>
                                ) : (
                                  <Image
                                    unoptimized={true}
                                    height={20}
                                    width={20}
                                    src={lock}
                                    alt="lock"
                                  />
                                )}
                              </label>
                              {allowedAssets?.reward_point && (
                                <div className={style["checkbox__info"]}>
                                  <div className={style["checkbox__info_box"]}>
                                    <div className={style["point_info"]}>
                                      <h4 className={style["title"]}>
                                        {
                                          allowedAssets?.reward_point
                                            ?.display_name
                                        }
                                      </h4>
                                      <h6 className={style["points_value"]}>
                                        {reward_point_balance} ($
                                        {convertPointsToUSD(
                                          reward_point_balance,
                                          "reward_point"
                                        )}
                                        )
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div
                              className={`${style["checkbox"]} ${style["buy-checkbox"]}`}
                            >
                              <label>
                                {!jumpBalanceLocked ? (
                                  <>
                                    <input
                                      name="jump_point"
                                      onChange={handleAssetSelect}
                                      checked={isJTused}
                                      type="checkbox"
                                    />
                                    <span className={style["checkbox__mark"]}>
                                      <BiCheck />
                                    </span>
                                  </>
                                ) : (
                                  <Image
                                    unoptimized={true}
                                    height={20}
                                    width={20}
                                    src={lock}
                                    alt="lock"
                                  />
                                )}
                              </label>
                              {allowedAssets?.jump_point && (
                                <div className={style["checkbox__info"]}>
                                  <div className={style["checkbox__info_box"]}>
                                    <div className={style["point_info"]}>
                                      <h4 className={style["title"]}>
                                        {
                                          allowedAssets?.jump_point
                                            ?.display_name
                                        }
                                      </h4>
                                      <h6 className={style["points_value"]}>
                                        {jump_point_balance} ($
                                        {convertPointsToUSD(jump_point_balance)}
                                        )
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className={style["jtpoint-price-summary"]}>
                            <h4>Price Summary</h4>
                            <ul className={style["jtpoint-list"]}>
                              <li>
                                <span className={style["jt-key"]}>
                                  Buy Price
                                </span>
                                <span className={style["jt-value"]}>
                                  {`$${buy_amount}`}
                                </span>
                              </li>
                              <li>
                                <span className={style["jt-key"]}>
                                  Service Fee ( {nft?.service_fee} )%
                                  <ToolTip
                                    icon={
                                      <BsFillQuestionCircleFill
                                        size={16}
                                        className="ms-2 check-icon"
                                      />
                                    }
                                    content={
                                      "The service fee includes gas fee and the platform fee."
                                    }
                                    placement="top"
                                  />
                                  {user?.apply_buy_tds && (
                                    <>
                                      {" "}
                                      & TDS Fee ( {nft?.tds_rate} )%
                                      <ToolTip
                                        icon={
                                          <BsFillQuestionCircleFill
                                            size={16}
                                            className="ms-2 check-icon"
                                          />
                                        }
                                        content={"TDS u/s 194S Income Tax Act"}
                                        placement="top"
                                      />
                                    </>
                                  )}
                                </span>
                                <span className={style["jt-value"]}>
                                  {`$${dynamicDecimalPrecision(
                                    nftPriceBreakup?.service_fee +
                                      nftPriceBreakup?.tds_fee
                                  )}`}
                                </span>
                              </li>
                            </ul>

                            {used_reward_points_in_usd ||
                            used_jt_points_in_usd ? (
                              <>
                                <hr className={style["custom-divider"]}></hr>
                                <ul
                                  className={`${style["jtpoint-list"]} ${style["sub-total"]}`}
                                >
                                  <li>
                                    <span className={style["jt-key"]}>
                                      SubTotal
                                    </span>
                                    <span className={style["jt-value"]}>
                                      {`$${nftPriceBreakup?.sub_total}`}
                                    </span>
                                  </li>

                                  {used_reward_points_in_usd ? (
                                    <li className={style["jtpoint-info"]}>
                                      <span className={style["jt-key"]}>
                                        {`Used ${allowedAssets?.reward_point?.display_name}`}{" "}
                                        <i>({used_reward_points})</i>
                                      </span>
                                      <span className={style["jt-value"]}>
                                        - {`$${used_reward_points_in_usd}`}
                                      </span>
                                    </li>
                                  ) : (
                                    <></>
                                  )}
                                  {used_jt_points_in_usd ? (
                                    <li className={style["jtpoint-info"]}>
                                      <span className={style["jt-key"]}>
                                        {`Used ${allowedAssets?.jump_point?.display_name}`}{" "}
                                        <i>({used_jt_points}) </i>
                                      </span>
                                      <span className={style["jt-value"]}>
                                        - {`$${used_jt_points_in_usd}`}
                                      </span>
                                    </li>
                                  ) : (
                                    <></>
                                  )}
                                </ul>
                              </>
                            ) : (
                              <></>
                            )}

                            <hr className={style["custom-divider"]}></hr>
                            <ul
                              className={`${style["jtpoint-list"]} ${style["main-total"]}`}
                            >
                              <li>
                                <span className={style["jt-key"]}>
                                  Total Amount
                                </span>
                                <span className={style["jt-value"]}>
                                  {`$${nftPriceBreakup?.total}`}
                                  <i>Inclusive Taxes and Fees</i>
                                </span>
                              </li>
                            </ul>
                            <hr className={style["custom-divider"]}></hr>
                          </div>
                        </div>
                      </div>
                      <div className={"bottom-area"}>
                        {nft.celebrity_id ===
                          parseInt(process.env.REACT_APP_APP_LATIMES_ID) && (
                          <div className="terms ">
                            <>
                              By proceeding further and clicking the &quot;BUY
                              NFTs&quot; button as your electronic signature,
                              you agree to the LA Times{" "}
                              <a
                                href="https://nft.latimes.com/terms-and-conditions/"
                                target={"_blank"}
                                rel="noreferrer"
                              >
                                Terms and Conditions
                              </a>
                              . The license to display the items associated with
                              the NFTs shall only be used for your personal,
                              non-commercial use.
                            </>
                          </div>
                        )}
                        <div className={"bottom-content-pop"}>
                          {amount_to_be_added > 0 ? (
                            <>
                              <PaymentList
                                userBalance={user_balance}
                                amount={amount_to_be_added}
                                defaultPaymentMethod={PAYMENT_OPTS.UPI}
                                onHide={() => setPaymentMethod(null)}
                                openPaymentGateway={openPaymentGateway}
                                onPaymentSuccess={handlePaymentSuccess}
                                onPaymentFailure={handlePaymentFailure}
                              ></PaymentList>
                              <PaymentOptions
                                show={paymentMethod}
                                amount={amount_to_be_added}
                                onHide={() => setPaymentMethod(null)}
                                openPaymentGateway={openPaymentGateway}
                                onPaymentSuccess={handlePaymentSuccess}
                                onPaymentFailure={handlePaymentFailure}
                              />
                            </>
                          ) : (
                            <>
                              <div className={"current-balance-block"}>
                                <h5>Balance</h5>
                                <p>${user_balance}</p>
                              </div>
                              <div className={"place-buy-button"}>
                                <button
                                  disabled={(() => {
                                    if (
                                      soldOut ||
                                      transferringNFT ||
                                      isOrderCancelled
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  })()}
                                  className={`btn btn-dark text-center btn-lg w-75 rounded-pill ${
                                    isBundle
                                      ? style["place-buy-bundle-pop"]
                                      : "place-buy-btn-pop"
                                  } ${buy.processClass}`} //process -> proccessing
                                  onClick={() =>
                                    noBalance
                                      ? openPaymentGateway(PAYMENT_OPTS.LIST)
                                      : handleBuy()
                                  }
                                >
                                  <span>
                                    {(() => {
                                      if (erc721) {
                                        if (soldOut) {
                                          return "Sold Out";
                                        } else if (transferringNFT) {
                                          return (
                                            <>
                                              Token Transfer Initiated{" "}
                                              <ToolTip
                                                icon={
                                                  <BsFillQuestionCircleFill
                                                    size={16}
                                                    className={
                                                      "ms-2 check-icon"
                                                    }
                                                  />
                                                }
                                                content={
                                                  "The NFT's transfer/transaction is in process on the blockchain. Visit again for latest sale-status."
                                                }
                                                placement="top"
                                              />
                                            </>
                                          );
                                        } else if (isOrderCancelled) {
                                          return "Order Cancelled";
                                        } else {
                                          return noBalance
                                            ? "Recharge Wallet"
                                            : isBundle
                                            ? "BUY NFTs"
                                            : "BUY NFT";
                                        }
                                      } else {
                                        if (soldOut) {
                                          return "Sold Out";
                                        } else if (transferringNFT) {
                                          return (
                                            <>
                                              Token Transfer Initiated{" "}
                                              <ToolTip
                                                icon={
                                                  <BsFillQuestionCircleFill
                                                    size={16}
                                                    className={
                                                      "ms-2 check-icon"
                                                    }
                                                  />
                                                }
                                                content={
                                                  "The NFT's transfer/transaction is in process on the blockchain. Visit again for latest sale-status."
                                                }
                                                placement="top"
                                              />
                                            </>
                                          );
                                        } else if (isOrderCancelled) {
                                          return "Order Cancelled";
                                        } else if (buyQuantity > 0) {
                                          return noBalance
                                            ? "Recharge Wallet"
                                            : isBundle
                                            ? "BUY NFTs"
                                            : "BUY NFT";
                                        } else {
                                          return "NFT quantity is required";
                                        }
                                      }
                                    })()}
                                  </span>
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={`pop-body-buy-content success`}>
                        <div className={"sucess-title"}>
                          <FaCheckCircle color={"#95ff8d"} size={60} />
                          <div className={`message mt-3`}>
                            We have initiated the purchase of your NFT. <br />{" "}
                            Once the blockchain transfer is complete, we will
                            notify you, after which you can view them in the
                            &quot;My NFTs&quot; section of your profile.
                          </div>
                        </div>
                        <div className={`pop-nft-buy-media mt-4 preview`}>
                          {(() => {
                            if (nft?.asset_type?.includes("image")) {
                              return (
                                <Image
                                  unoptimized={true}
                                  alt="media_logo"
                                  height={340}
                                  width={340}
                                  className={"type_image typeimg_audio"}
                                  src={
                                    nft.asset_url
                                      ? nft.asset_url
                                      : "/sample.gif"
                                  }
                                  loading="lazy"
                                />
                              );
                            } else if (nft?.asset_type?.includes("audio")) {
                              return (
                                <>
                                  <Image
                                    unoptimized={true}
                                    alt="media_logo"
                                    height={340}
                                    width={340}
                                    className={"type_image typeimg_audio"}
                                    src={
                                      nft.cover_url
                                        ? nft.cover_url
                                        : "/sample.gif"
                                    }
                                    loading="lazy"
                                  />
                                </>
                              );
                            } else if (nft?.asset_type?.includes("video")) {
                              return (
                                <Image
                                  unoptimized={true}
                                  alt="media_logo"
                                  height={340}
                                  width={340}
                                  className={"type_image typeimg_audio"}
                                  src={
                                    nft.cover_url
                                      ? nft.cover_url
                                      : "/sample.gif"
                                  }
                                  loading="lazy"
                                />
                              );
                            } else {
                              return (
                                <Image
                                  unoptimized={true}
                                  alt="media_logo"
                                  height={340}
                                  width={340}
                                  className={"type_image typeimg_audio"}
                                  src={
                                    nft.asset_url
                                      ? nft.asset_url
                                      : "/sample.gif"
                                  }
                                  loading="lazy"
                                />
                              );
                            }
                          })()}
                        </div>
                        <div className={`pop-buy-author-name text-center mt-3`}>
                          {nft?.category_name}
                        </div>
                        <div className={`pop-nft-buy-title text-center mb-1`}>
                          {nft?.name}
                        </div>

                        <div className={`success-summary-container mt-3`}>
                          <div className={"success-summary"}>
                            <div>Price</div>
                            <div className={"bold"}>
                              {`$${successData.amount}`}
                            </div>
                          </div>
                          {!erc721 && (
                            <div className={"success-summary"}>
                              <div>Edition(s)</div>
                              <div className={"bold"}>
                                {successData.quantity}
                              </div>
                            </div>
                          )}
                          <div className={"success-summary"}>
                            <div>{erc721 ? "Buy placed on" : "Time"}</div>
                            <div className={"bold"}>
                              {dayjs(successData.created_at).format(
                                "MMM D, YYYY hh:mm A"
                              )}
                            </div>
                          </div>

                          {erc721 && (
                            <div className={"success-summary"}>
                              <div>Buy placed for</div>
                              <div className={"bold"}>1 Limited Edition</div>
                            </div>
                          )}

                          <div className={"success-summary"}>
                            <div>Transaction ID</div>
                            <div className={"bold"}>
                              {successData.transaction_id}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={"bottom-area"}>
                        <div className={"bottom-content-pop"}>
                          <div className={"place-buy-button"}>
                            <button
                              className={`btn btn-dark text-center btn-lg w-75 rounded-pill place-buy-btn-pop`}
                              onClick={onHide}
                            >
                              <span>Okay</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className={style["pop-nft-buy-details"]}>
                  <div className={style["pop-head-content"]}>
                    <div className={style["pop-buy-title"]}></div>
                    <div
                      className={style["close-button-pop"]}
                      onClick={() => setPlaceBuyPop(!placeBuyPop)}
                    >
                      <Image
                        unoptimized={true}
                        alt="bid logo"
                        height={40}
                        width={40}
                        src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e"
                      />
                    </div>
                  </div>
                  <div className={style["pop-signin"]}>
                    <div
                      className={`${style["pop-signin-title"]} text-center mb-1`}
                    >
                      {erc721 ? "Sign in to place bid" : "Sign in to buy"}
                    </div>
                    <div className={style["pop-nft-buy-media"]}>
                      <button
                        className={`btn btn-dark text-center btn-lg mt-2 rounded-pill ${style["place-buy-btn"]}`}
                        onClick={() =>
                          window.open(
                            `${process.env.REACT_APP_APP_ACCOUNTS_URL}/signin?redirect=${window.location.href}`,
                            "_self"
                          )
                        }
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

const BundleAsset = ({ nft, bundle = {} }) => {
  return (
    <div className={"pop-nft-info"}>
      <div className={"pop-nft-media"}>
        <div
          className={`bundle-sale ${
            nft?.slug === bundle.nft_slug ? "active" : ""
          }`.trim()}
          role="button"
        >
          {bundle?.asset_type?.includes("image") ? (
            <Image
              unoptimized={true}
              height={100}
              width={100}
              alt={`${bundle?.name}`}
              className="type_image typeimg_audio"
              src={bundle?.asset_url ? bundle?.asset_url : "/sample.gif"}
              loading="lazy"
            />
          ) : bundle?.asset_type?.includes("audio") ? (
            <>
              <div className={`no_height align-items-center`}>
                <Image
                  unoptimized={true}
                  height={30}
                  width={30}
                  alt={`${bundle?.name}`}
                  className="type_image typeimg_audio"
                  src={nft.cover_url ? nft.cover_url : "/sample.gif"}
                  onClick={() => {
                    var el = document.getElementById("audio-fullscreen");
                    if (!el.paused) {
                      el.pause();
                    } else {
                      el.play();
                    }
                  }}
                  loading="lazy"
                />
              </div>
              <audio
                id="audio-fullscreen"
                controls
                className={`shadow-sm audioOnmedia`}
                // disablepictureinpicture
                controlsList="nodownload noplaybackrate"
              >
                <source src={nft.asset_url} type={nft.asset_type} />
                Your browser does not support the audio element.
              </audio>
            </>
          ) : bundle?.asset_type?.includes("video") ? (
            <video
              id="full-screenVideo"
              loop
              muted
              autoPlay
              playsInline
              controlsList="nodownload"
            >
              <source src={bundle?.asset_url} type="video/mp4" />
            </video>
          ) : (
            <Image
              unoptimized={true}
              height={30}
              width={30}
              alt="media_logo"
              className="type_image typeimg_audio"
              src={bundle?.asset_url ? bundle?.asset_url : "/sample.gif"}
              loading="lazy"
            />
          )}
        </div>
      </div>
      <div className={"pop-nft-content"}>
        <div className={"pop-author-name"}>
          <span className={style["pop-author-name-category"]}>
            {/* {nft?.category_name} */}
          </span>
        </div>
        <div className={`pop-nft-title text-center mb-1`}>{bundle?.name}</div>
      </div>
    </div>
  );
};

export default NFTPlaceBuy;
