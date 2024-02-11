import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { lootAvailableQty } from "../../utils/actioncable-methods";
import {
  isUserLoggedIn,
  setCryptoBatDropLive,
} from "../../redux/reducers/user_reducer";
import { MODAL_TYPES, LOOT_STATUS } from "./common";
import { dateFormat } from "../../utils/common";
import JoinWaitList from "./join-wait-list";
import LoginWithPassword from "../loot-box-section/login-with-password";
import LoginWithOtp from "../loot-box-section/login-with-otp";
import LoginWithGoogleOtp from "../loot-box-section/google-otp";
import VerifyOtp from "../loot-box-section/verify-otp";
import ForgotPassword from "../loot-box-section/forgot-password";
import Register from "../loot-box-section/register";
import Prebook from "../loot-box-section/prebook";
import FlipTimer from "../flip-timer";
import BannerSection from "./banner-section";

import LootImage from "../../images/drop/loot-image.png";
import images from "../../utils/images.json";
import BinanceCoin from "../../images/drop/bat-drop/bat-loot-video/binance-coin.svg";
import BitCoin from "../../images/drop/bat-drop/bat-loot-video/bitcoin-image.svg";
import DollarImage from "../../images/drop/bat-drop/bat-loot-video/dollar-image.svg";
import EthereumCoin from "../../images/drop/bat-drop/bat-loot-video/ethereum-image.svg";
import PolygonMatic from "../../images/drop/bat-drop/bat-loot-video/polygon-matic.svg";

import style from "./style.module.scss";

const LootBoxSection = ({ refetch, slug, details = {} }) => {
  const { user } = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const router = useRouter();
  const [modalType, setModalType] = useState("");
  const [modalState, setModalState] = useState({});
  const loginStatus = useSelector(isUserLoggedIn);
  const [availQty, setAvailQty] = useState(details?.available_qty || 0);
  const [eventInfo, setEventInfo] = useState({});

  const lootStatusRef = useRef(null);

  const initEventInfo = (showToast = false) => {
    const now = new Date().getTime(details?.current_time);
    let event_info = {};
    let statusChangeMessage = "";

    if (now < new Date(details?.preorder_start_time).getTime()) {
      event_info = {
        title: "PRE-BOOK STARTS IN",
        status: LOOT_STATUS?.YTS,
        endAt: dateFormat(details?.preorder_start_time),
        buttonTitle: "PRE-BOOK",
        buttonDisabled: true,
      };
    } else if (
      now >= new Date(details?.preorder_start_time).getTime() &&
      now <= new Date(details?.preorder_end_time).getTime()
    ) {
      event_info = {
        title: "PRE-BOOK ENDS IN",
        status: LOOT_STATUS?.PRE_BOOK,
        endAt: dateFormat(details?.preorder_end_time),
        buttonTitle: "PRE-BOOK NOW",
        buttonDisabled: false,
      };
    } else if (
      parseInt(details?.available_qty) === 0 &&
      now < new Date(details?.auction_end_time).getTime()
    ) {
      statusChangeMessage = "Crypto Bat NFTs are sold out!";
      dispatch(setCryptoBatDropLive(LOOT_STATUS?.SOLD_OUT));
      event_info = {
        title: "DROP ENDED",
        status: LOOT_STATUS?.SOLD_OUT,
        buttonTitle: "SOLD OUT IN 39 SECS",
        buttonDisabled: true,
      };
    } else if (
      details?.auction_start_time === null ||
      details?.auction_end_time === null
    ) {
      event_info = {
        title: "DROP COMING SOON",
        status: LOOT_STATUS?.DROP_YTA,
        buttonTitle: "Buy Now",
        buttonDisabled: true,
      };
    } else if (
      now > new Date(details?.preorder_end_time).getTime() &&
      now < new Date(details?.auction_start_time).getTime()
    ) {
      dispatch(setCryptoBatDropLive(LOOT_STATUS?.DROP_YTS));
      event_info = {
        title: "DROP STARTS IN",
        status: LOOT_STATUS?.DROP_YTS,
        endAt: dateFormat(details?.auction_start_time),
        buttonTitle: "Buy Now",
        buttonDisabled: true,
      };
    } else if (
      now >= new Date(details?.auction_start_time).getTime() &&
      now < new Date(details?.auction_end_time).getTime()
    ) {
      dispatch(setCryptoBatDropLive(LOOT_STATUS?.DROP));
      event_info = {
        title: "DROP ENDS IN",
        status: LOOT_STATUS?.DROP,
        endAt: dateFormat(details?.auction_end_time),
        buttonTitle: "Buy Now",
        buttonDisabled: !details?.available_qty,
      };
    } else if (now >= new Date(details?.auction_end_time).getTime()) {
      statusChangeMessage = "Drop ended";
      dispatch(setCryptoBatDropLive(LOOT_STATUS?.SOLD_OUT));
      event_info = {
        title: "DROP ENDED",
        status: LOOT_STATUS?.SOLD_OUT,
        buttonTitle: "SOLD OUT IN 39 SECS",
        buttonDisabled: true,
      };
    }
    if (statusChangeMessage) {
      toggleModal();
      showToast && toast.info(statusChangeMessage);
    }
    setEventInfo(event_info);
    setAvailQty(details?.available_qty);
  };

  const handlePreBook = () => {
    if (eventInfo?.buttonDisabled) return;
    if (loginStatus)
      toggleModal(MODAL_TYPES.PREBOOK, {
        loot: { ...details },
        loot_status: eventInfo.status,
      });
    else toggleModal(MODAL_TYPES.LOGIN_WITH_OTP);
  };

  const toggleModal = (modalType = "", modalState = {}) => {
    setModalType(modalType);
    setModalState(modalState);
  };

  useEffect(() => {
    details?.slug && initEventInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  // useEffect(() => {
  //   if (!loginStatus && router.query.email && router.query.with) {
  //     toggleModal(MODAL_TYPES.LOGIN_WITH_OTP, { email });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [router.query.email]);

  // useEffect(() => {
  //   lootAvailableQty(slug, (data) => {
  //     !isNaN(data?.available) && setAvailQty(data?.available);
  //     if (parseInt(data?.available) === 0) {
  //       dispatch(setCryptoBatDropLive(LOOT_STATUS?.SOLD_OUT));
  //       setEventInfo({
  //         title: "DROP ENDED",
  //         status: LOOT_STATUS?.SOLD_OUT,
  //         buttonTitle: "SOLD OUT IN 39 SECS",
  //         buttonDisabled: true,
  //       });
  //     }
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <section className={style["bat-banner-section"]}>
        <BannerSection />
        <div className={style["loot-timer-section"]}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                {availQty !== 0 && eventInfo.status !== LOOT_STATUS.SOLD_OUT ? (
                  <div className={style["loot-timer-block"]}>
                    <h4>{eventInfo?.title}</h4>
                    <FlipTimer
                      classNames={"bat-timer"}
                      endTime={eventInfo?.endAt}
                      handleEndEvent={() => {
                        setTimeout(() => initEventInfo(true), 1000);
                      }}
                    />
                    <div className={`${style["pre-book-btn-box"]}`}>
                      <button
                        className={style["pre-book-btn"]}
                        onClick={handlePreBook}
                        disabled={eventInfo?.buttonDisabled}
                      >
                        {eventInfo?.buttonTitle}
                      </button>

                      {user ? (
                        <>
                          {" "}
                          <button
                            className={`${style["pre-book-btn"]} ${style["rounded-btn"]}`}
                            to="#"
                            onClick={() => {
                              window.open(
                                `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/wallet#web`,
                                "_self"
                              );
                            }}
                          >
                            <span>Fund Your Wallet</span>
                          </button>
                        </>
                      ) : (
                        <>
                          {" "}
                          <button
                            className={`${style["pre-book-btn"]} ${style["rounded-btn"]}`}
                            to="#"
                            onClick={() => {
                              window.open(
                                `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/signin?redirect=${window.location.href}`,
                                "_self"
                              );
                            }}
                          >
                            <span>Fund Your Wallet</span>
                          </button>
                        </>
                      )}
                    </div>
                    {eventInfo?.status !== LOOT_STATUS?.SOLD_OUT &&
                      eventInfo?.status !== LOOT_STATUS?.DROP && (
                        <JoinWaitList />
                      )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={style["main-loot-section"]}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className={style["loot-block"]}>
                <div className={style["loot-section"]}>
                  <div className={`${style["items"]} ${style["one"]}`}>
                    <h2>
                      CRYPTO BAT NFT{" "}
                      <span className={style["bat-title"]}>COLLECTION</span>
                    </h2>
                    <p>
                      The Crypto Bat NFT Collection are unique NFT Bats that are
                      backed by cryptocurrency assets. You can HODL and trade
                      these Crypto Bat NFTs as assets and also play with them in
                      the MCL Game.
                    </p>
                    <p>
                      The Crypto Bat NFTs are packaged in a Super Loot Box
                      priced at $50. These Bat NFTs come attached with crypto
                      assets whose values range from $25 to $100. It could be
                      any one of the following wrapped crypto assets like wBTC,
                      wETH, wBNB, wDOGE, and wMATIC!
                    </p>
                  </div>
                  <div className={`${style["items"]} ${style["two"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Every Super Loot Box Contains</h6>
                      <p className={style["loot-desc"]}>
                        1 Crypto Bat NFT attached with <br />
                        Crypto Assets worth $25 to $100
                      </p>
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["three"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Super Loot Box Price</h6>
                      <h4 className={style["pack-price"]}>$50/Box </h4>
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["four"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Total Supply for Phase 1</h6>
                      <h4 className={style["pack-count"]}>
                        {/* {availQty ? availQty : "Sold Out"} */}
                        2000 NFTs
                      </h4>
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["five"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Phase 1 Pre-book Allocation</h6>
                      <h4 className={style["pack-count"]}>1500 NFTs</h4>
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["six"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Phase 1 Drop Supply</h6>
                      {eventInfo.status === LOOT_STATUS.DROP_YTS && (
                        <h4 className={style["pack-count"]}>500 NFTs</h4>
                      )}
                      {eventInfo.status === LOOT_STATUS.DROP && (
                        <h4
                          className={style["pack-count"]}
                        >{`${availQty}/3000 NFTs`}</h4>
                      )}
                      {eventInfo.status === LOOT_STATUS.SOLD_OUT && (
                        <>
                          <h4 className={style["pack-count"]}>500 NFTs</h4>
                          <h6>(SOLD OUT IN 39 SECS)</h6>
                        </>
                      )}
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["seven"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Pre-book End</h6>
                      <h6>25-11-2022</h6>
                      <h6>6:00 PM IST</h6>
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["eight"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Drop Start</h6>
                      {details?.auction_start_time ? (
                        <>
                          <h6>
                            {dayjs(details?.auction_start_time).format(
                              "DD-MM-YYYY"
                            )}
                          </h6>
                          <h6>
                            {dayjs(details?.auction_start_time).format(
                              "h:mm A"
                            )}{" "}
                            IST
                          </h6>
                        </>
                      ) : (
                        <>
                          <h6>09-12-2022</h6>
                          <h6>7:00 PM IST</h6>
                        </>
                      )}
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["seven"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Drop End</h6>
                      {details?.auction_end_time ? (
                        <>
                          <h6>
                            {dayjs(details?.auction_end_time).format(
                              "DD-MM-YYYY"
                            )}
                          </h6>
                          <h6>
                            {dayjs(details?.auction_end_time).format("h:mm A")}{" "}
                            IST
                          </h6>
                        </>
                      ) : (
                        <>
                          <h6>12-12-2022</h6>
                          <h6>5:00 PM IST</h6>
                        </>
                      )}
                    </div>
                  </div>
                  {/* eventInfo?.status !== LOOT_STATUS.SOLD_OUT */}
                  {/* {![LOOT_STATUS.SOLD_OUT, LOOT_STATUS.DROP].includes(
                    eventInfo?.status
                  ) && (
                    <div className={`${style["items"]} ${style["five"]}`}>
                      <div className={`${style["box-block"]}`}>
                        {![LOOT_STATUS.DROP_YTS, LOOT_STATUS.DROP_YTA].includes(
                          eventInfo.status
                        ) ? (
                          <h6>Pre-Booking Ends On</h6>
                        ) : (
                          <h6>Pre-Booking Ended On</h6>
                        )}
                        <h4>
                          {dayjs(details?.preorder_end_time).format(
                            "DD-MM-YYYY"
                          )}
                        </h4>
                      </div>
                    </div>
                  )}
                  {eventInfo?.status !== LOOT_STATUS.SOLD_OUT && (
                    <div
                      className={`${style["items"]} ${
                        eventInfo?.status === LOOT_STATUS.DROP
                          ? style["five"]
                          : style["six"]
                      }`}
                    >
                      <div className={`${style["box-block"]}`}>
                        <h6>Drop Starts From</h6>
                        <h4>
                          {dayjs(details?.auction_start_time).format(
                            "DD-MM-YYYY"
                          )}
                        </h4>
                        <h6>
                          {" "}
                          <small>Onwards</small>
                        </h6>
                      </div>
                    </div>
                  )}
                  {[LOOT_STATUS.SOLD_OUT, LOOT_STATUS.DROP].includes(
                    eventInfo?.status
                  ) && (
                    <div
                      className={`${style["items"]} ${
                        eventInfo?.status === LOOT_STATUS.DROP
                          ? style["six"]
                          : style["full-row"]
                      }`}
                    >
                      <div className={`${style["box-block"]}`}>
                        <h6>{`${
                          eventInfo?.status === LOOT_STATUS.DROP
                            ? "Drop Ends On"
                            : availQty === 0
                            ? "Drop Ended"
                            : "Drop Ended On"
                        }`}</h6>
                        {availQty !== 0 && (
                          <h4>
                            {dayjs(details?.auction_end_time).format(
                              "DD-MM-YYYY"
                            )}
                          </h4>
                        )}
                      </div>
                    </div>
                  )} */}
                </div>

                <div className={style["pack-section"]}>
                  <video
                    className={style["pack-image"]}
                    loop
                    muted
                    autoPlay
                    src={images.bat_sold}
                    poster={LootImage}
                    playsInline
                    type="video/mp4"
                  ></video>
                  <h6>Crypto Assets</h6>
                  <div className={style["coins-section"]}>
                    <Image
                      unoptimized={true}
                      height={300}
                      width={300}
                      className={style["coin-image"]}
                      src={BitCoin}
                      alt="BitCoin"
                    />
                    <Image
                      unoptimized={true}
                      height={300}
                      width={300}
                      className={style["coin-image"]}
                      src={EthereumCoin}
                      alt="EthereumCoin"
                    />
                    <Image
                      unoptimized={true}
                      height={300}
                      width={300}
                      className={style["coin-image"]}
                      src={BinanceCoin}
                      alt="BitCoin"
                    />
                    <Image
                      unoptimized={true}
                      height={300}
                      width={300}
                      className={style["coin-image"]}
                      src={DollarImage}
                      alt="DollarImage"
                    />
                    <Image
                      unoptimized={true}
                      height={300}
                      width={300}
                      className={style["coin-image"]}
                      src={PolygonMatic}
                      alt="PolygonMatic"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row" ref={lootStatusRef}>
              <div className="col-12 text-center mt-5">
                <button
                  className={style["pre-book-btn"]}
                  onClick={handlePreBook}
                  disabled={eventInfo?.buttonDisabled}
                >
                  {eventInfo?.buttonTitle}
                </button>
              </div>
            </div>
          </div>
        </div>

        {modalType === MODAL_TYPES.LOGIN_WITH_PASSWORD && (
          <LoginWithPassword
            show={modalType === MODAL_TYPES.LOGIN_WITH_PASSWORD}
            toggleModal={toggleModal}
            modalState={modalState}
          />
        )}
        {modalType === MODAL_TYPES.LOGIN_WITH_OTP && (
          <LoginWithOtp
            show={modalType === MODAL_TYPES.LOGIN_WITH_OTP}
            toggleModal={toggleModal}
            modalState={modalState}
          />
        )}
        {modalType === MODAL_TYPES.VERIFY_GOOGLE_OTP && (
          <LoginWithGoogleOtp
            show={modalType === MODAL_TYPES.VERIFY_GOOGLE_OTP}
            toggleModal={toggleModal}
            modalState={modalState}
          />
        )}
        {modalType === MODAL_TYPES.VERIFY_OTP && (
          <VerifyOtp
            show={modalType === MODAL_TYPES.VERIFY_OTP}
            toggleModal={toggleModal}
            modalState={modalState}
          />
        )}
        {modalType === MODAL_TYPES.FORGOT_PASSWORD && (
          <ForgotPassword
            show={modalType === MODAL_TYPES.FORGOT_PASSWORD}
            toggleModal={toggleModal}
            modalState={modalState}
          />
        )}
        {modalType === MODAL_TYPES.REGISTER && (
          <Register
            show={modalType === MODAL_TYPES.REGISTER}
            toggleModal={toggleModal}
            modalState={modalState}
          />
        )}
        {modalType === MODAL_TYPES.PREBOOK && (
          <Prebook
            show={modalType === MODAL_TYPES.PREBOOK}
            toggleModal={toggleModal}
            modalState={modalState}
            onHide={refetch}
            availableQuantity={availQty}
          />
        )}
      </section>
    </>
  );
};

export default LootBoxSection;
