import { MODAL_TYPES, LOOT_STATUS } from "../common";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

import {
  isUserLoggedIn,
  setRaddxLandDropLive,
} from "../../../redux/reducers/user_reducer";
import { lootAvailableQty } from "../../../utils/actioncable-methods";

import LoginWithPassword from "../../loot-box-section/login-with-password";
import LoginWithOtp from "../../loot-box-section/login-with-otp";
import LoginWithGoogleOtp from "../../loot-box-section/google-otp";
import VerifyOtp from "../../loot-box-section/verify-otp";
import ForgotPassword from "../../loot-box-section/forgot-password";
import Register from "../../loot-box-section/register";
import FlipTimer from "../../flip-timer";

import images from "../../../utils/images.json";

import style from "./style.module.scss";
import MclEliteFounderPassPrebook from "../../loot-box-section/mcl-elite-founder-pass-prebook-with-buy-options";
import Image from "next/image";
import useWindowSize from "../../../hooks/useWindowSize";
import mainHeading from "../../../images/drop/vip-pass/own-founder-web.png";
import mainHeadingMobile from "../../../images/drop/vip-pass/one-elite-founder-pass-mobile.png";
import RaddxLandPrebook from "../raddx-land-prebook-section";

const dateFormat = (date = null, format = "YYYY-MM-DD HH:mm:ss") => {
  if (!date) return null;
  var input_date = new Date(date);
  return dayjs(input_date).format(format);
};

const ENABLE_REWARD_BUY = true;

const RaddxPrebookBoxDetails = ({ buySuccess = () => {}, details }) => {
  const dispatch = useDispatch();

  const [modalType, setModalType] = useState("");
  const [modalState, setModalState] = useState({});
  const loginStatus = useSelector(isUserLoggedIn);
  const [availQty, setAvailQty] = useState(30);
  const [mutedVideo, setMutedVideo] = useState(true);
  const [nftQuantityValue, setNftQuantityValue] = useState(1);

  const [eventInfo, setEventInfo] = useState({});

  const lootStatusRef = useRef(null);
  const { width: windowWidth } = useWindowSize();
  const initEventInfo = (showToast = false) => {
    const now = new Date().getTime();
    let event_info = { ...eventInfo };
    if (parseInt(details?.available_qty) === 0) {
      dispatch(setRaddxLandDropLive(LOOT_STATUS?.SOLD_OUT));
      event_info = {
        title: "SOLD OUT",
        status: LOOT_STATUS?.SOLD_OUT,
        buttonTitle: "DROP SOLD OUT",
        buttonDisabled: true,
      };
    } else if (now < new Date(details?.preorder_start_time).getTime()) {
      dispatch(setRaddxLandDropLive(LOOT_STATUS?.YTS));
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
      dispatch(setRaddxLandDropLive(LOOT_STATUS?.PRE_BOOK));
      event_info = {
        title: "PRE-BOOK ENDS IN",
        status: LOOT_STATUS?.PRE_BOOK,
        endAt: dateFormat(details?.preorder_end_time),
        buttonTitle: "PRE-BOOK NOW",
        buttonDisabled: false,
        // buttonDisabled:
        //   details?.preorder_reserved_qty === details?.preorder_qty_per_user,
      };
    } else if (
      details?.auction_start_time === null ||
      details?.auction_end_time === null
    ) {
      dispatch(setRaddxLandDropLive(LOOT_STATUS?.DROP_YTA));
      // statusChangeMessage = "Pre-book ended";
      event_info = {
        title: "DROP COMING SOON",
        status: LOOT_STATUS?.DROP_YTA,
        buttonTitle: "BUY",
        buttonDisabled: true,
      };
    } else if (details?.flow_status === "assign") {
      dispatch(setRaddxLandDropLive(LOOT_STATUS?.ASSIGNING_NFTS));
      let endAt =
        now <= new Date(details?.auction_start_time).getTime()
          ? details?.auction_start_time
          : details?.auction_end_time;
      let title =
        now <= new Date(details?.auction_start_time).getTime()
          ? "DROP STARTS IN"
          : "DROP ENDS IN";
      event_info = {
        title,
        endAt,
        status: LOOT_STATUS?.ASSIGNING_NFTS,
        buttonTitle: "Assigning NFTs",
        buttonDisabled: true,
      };
    } else if (
      now > new Date(details?.preorder_end_time).getTime() &&
      now <= new Date(details?.auction_start_time).getTime()
    ) {
      dispatch(setRaddxLandDropLive(LOOT_STATUS?.DROP_YTS));
      event_info = {
        title: "DROP STARTS IN",
        status: LOOT_STATUS?.DROP_YTS,
        endAt: dateFormat(details?.auction_start_time),
        buttonTitle: "BUY",
        buttonDisabled: true,
      };
    } else if (
      now > new Date(details?.auction_start_time).getTime() &&
      now <= new Date(details?.auction_end_time).getTime() &&
      details?.flow_status === "buy"
    ) {
      dispatch(setRaddxLandDropLive(LOOT_STATUS?.DROP));
      event_info = {
        title: "DROP ENDS IN",
        status: LOOT_STATUS?.DROP,
        endAt: dateFormat(details?.auction_end_time),
        buttonTitle: "BUY NOW",
        buttonDisabled: !details?.available_qty,
      };
    } else if (now > new Date(details?.auction_end_time).getTime()) {
      dispatch(setRaddxLandDropLive(LOOT_STATUS?.SOLD_OUT));
      event_info = {
        title: "DROP ENDED",
        status: LOOT_STATUS?.DROP_ENDED,
        buttonDisabled: true,
      };
    }

    setEventInfo(event_info);
  };

  const handlePreBook = (quantity = 1) => {
    if (eventInfo?.buttonDisabled) return;
    if (loginStatus) {
      setNftQuantityValue(quantity);
      toggleModal(MODAL_TYPES.PREBOOK, {
        loot: { ...details },
        loot_status: eventInfo.status,
      });
    } else toggleModal(MODAL_TYPES.LOGIN_WITH_OTP);
  };

  const toggleModal = (modalType = "", modalState = {}) => {
    setModalType(modalType);
    setModalState(modalState);
  };

  useEffect(() => {
    let quantity = null;
    setAvailQty(details?.available_qty || "-");
    if (details?.slug) {
      initEventInfo();
      lootAvailableQty(details?.slug, (data) => {
        const now = new Date(details?.current_time).getTime();

        if (quantity && quantity != null) {
          if (!isNaN(data?.available) && data?.available < quantity) {
            setAvailQty(data?.available);
            quantity = data?.available;
          }
        } else {
          !isNaN(data?.available) && setAvailQty(data?.available);
          quantity = data?.available;
        }

        if (parseInt(data?.available) === 0) {
          dispatch(setRaddxLandDropLive(LOOT_STATUS?.SOLD_OUT));
          setEventInfo({
            title: "DROP ENDED",
            status: LOOT_STATUS?.SOLD_OUT,
            buttonTitle: "Drop Sold Out",
            buttonDisabled: true,
          });
        } else {
          if (
            data?.flow_status === "buy" &&
            eventInfo?.status === LOOT_STATUS?.DROP_YTS
          ) {
            let endAt =
              now <= new Date(details?.auction_start_time).getTime()
                ? details?.auction_start_time
                : details?.auction_end_time;
            let title =
              now <= new Date(details?.auction_start_time).getTime()
                ? "DROP STARTS IN"
                : "DROP ENDS IN";
            dispatch(setRaddxLandDropLive(LOOT_STATUS?.DROP));
            setEventInfo({
              title,
              endAt,
              status: LOOT_STATUS?.DROP,
              buttonTitle: "BUY NOW",
              buttonDisabled:
                eventInfo?.status === LOOT_STATUS?.DROP_YTS ||
                !details?.available_qty,
            });
          }
          if (
            data?.flow_status === "assign" &&
            eventInfo?.status !== LOOT_STATUS?.ASSIGNING_NFTS
          ) {
            let endAt =
              now <= new Date(details?.auction_start_time).getTime()
                ? details?.auction_start_time
                : details?.auction_end_time;
            let title =
              now <= new Date(details?.auction_start_time).getTime()
                ? "DROP STARTS IN"
                : "DROP ENDS IN";
            dispatch(setRaddxLandDropLive(LOOT_STATUS?.ASSIGNING_NFTS));
            setEventInfo({
              title,
              endAt,
              status: LOOT_STATUS?.ASSIGNING_NFTS,
              buttonTitle: "Assigning NFTs",
              buttonDisabled: true,
            });
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  const titleStatus = [LOOT_STATUS?.DROP_ENDED, LOOT_STATUS?.SOLD_OUT];

  return (
    <>
      <section className={style["main-loot-section"]}>
        <div className={`${style["container-fluids"]} container-fluid`}>
          <div className="row">
            <div className="col-sm-12">
              <div className={`${style["sec-header"]}`}>
                {/* <h2>One identity across internet</h2> */}
                {/* <Image unoptimized={true}
                  alt="mcl-founder-pass"
                  src={`${
                    windowWidth > 767 ? mainHeading.src : mainHeadingMobile.src
                  }`}
                  height={300}
                  width={1440}
                /> */}
                <h3>RADDX SPEEDWAY BOX</h3>
                <p>
                  Inside each of these boxes awaits a single, exclusive,
                  limited-edition digital land paired with a building. Claim
                  yours today to experience unparalleled reach in the Web3
                  landscape, alongside renowned global brands within the RADDX
                  Metaverse.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className={style["loot-timer-section"]}>
                <div className={`${style["loot-timer-block"]}`}>
                  {eventInfo?.status === LOOT_STATUS?.SOLD_OUT &&
                    eventInfo?.buttonTitle && (
                      <>
                        <button
                          className={style["pre-book-btn"]}
                          onClick={() => handlePreBook(1)}
                          disabled={eventInfo?.buttonDisabled}
                        >
                          {eventInfo?.buttonTitle}
                        </button>
                      </>
                    )}
                  {eventInfo?.status === LOOT_STATUS?.DROP_ENDED &&
                    eventInfo?.buttonTitle && (
                      <>
                        <button
                          className={style["pre-book-btn"]}
                          onClick={() => handlePreBook(1)}
                          disabled={eventInfo?.buttonDisabled}
                        >
                          {eventInfo?.buttonTitle}
                        </button>
                      </>
                    )}
                  {!titleStatus.includes(eventInfo?.status) && (
                    <>
                      {eventInfo?.title && <h4>{eventInfo?.title}</h4>}
                      {eventInfo?.endAt && (
                        <FlipTimer
                          classNames={"founder-pass-timer"}
                          endTime={eventInfo?.endAt}
                          handleEndEvent={() =>
                            setTimeout(() => initEventInfo(true), 1000)
                          }
                        />
                      )}
                      {/* {eventInfo?.buttonTitle && (
                        <>
                          <button
                            className={style["pre-book-btn"]}
                            onClick={() => handlePreBook(1)}
                            disabled={eventInfo?.buttonDisabled}
                          >
                            {eventInfo?.buttonTitle}
                          </button>
                        </>
                      )} */}
                      {/* {details?.preorder_reserved_qty ===
                        details?.preorder_qty_per_user &&
                        eventInfo?.status === LOOT_STATUS.PRE_BOOK && (
                          <h6 className="playpass-hint">
                            <BsFillInfoCircleFill />
                            {"  "}
                            Founder Pass is prebooked already.
                          </h6>
                        )} */}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className={style["loot-block"]}>
                <div className={style["loot-section"]}>
                  {/* <div className={`${style["items"]} ${style["one"]}`}>
                    <h2>
                      <span className={style["bat-title"]}>MCL FOUNDER PASS</span>
                    </h2>
                    <p className={`${style["first-p"]}`}>
                      Unleash the power of the MCL Founder Pass. An exclusive
                      membership granting exceptional privileges, utilities, and
                      a competitive edge in the MCL universe. Ignite your
                      gameplay, unlock private privileges, and experience the
                      full potential of your play-to-earn journey. Elevate your
                      gaming with the MCL Founder Pass.
                    </p>
                  </div> */}

                  <div className={`${style["items"]} ${style["two"]}`}>
                    {/* <div className={`${style["box-block"]}`}>
                      <div className={`${style["price-list-group"]}`}>
                        <div className={style["price-list-box"]}>
                          <div className={style["pack-price-flex"]}>
                            <div className={style["first-p"]}>
                              <h3>Every Box Contains</h3>{" "}
                            </div>
                          </div>
                        </div>
                        <div className={style["price-list-box"]}>
                          <div className={style["pack-price-flex"]}>
                            <div className={style["first-p"]}>
                              <h3>1 MCL Founder Pass NFT</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    <div className={`${style["box-block"]}`}>
                      {/* <h6>Every Box Contains</h6> */}
                      <h4>ABOUT COLLECTION</h4>
                      {/* <h6 className={`${style["time-duration"]}`}>
                        (Immortal)
                      </h6> */}
                      <h5>
                        These all-new racetracks are surrounded by exclusive
                        land and building NFTs, each featuring unique
                        masterpieces that grant access to a world of premium
                        structures. These NFTs go beyond digital collectibles;
                        they are your ticket to owning virtual land in the
                        Metaverse.
                      </h5>
                    </div>
                  </div>

                  {/* <div className={`${style["items"]} ${style["three"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>EACH USER CAN BUY MAXIMUM 5</h6>
                      <h4>FOUNDER PASS BOX</h4>
                    </div>
                  </div> */}

                  <div className={`${style["items"]} ${style["four"]}`}>
                    {/* <div className={`${style["box-block"]}`}>
                      <h6>EACH USER CAN BUY MAXIMUM 5</h6>
                      <h4>FOUNDER PASS BOX</h4>
                    </div> */}

                    <div className={`${style["box-block"]}`}>
                      <div className={`${style["price-list-group"]}`}>
                        <div className={style["price-list-box"]}>
                          <div className={style["pack-price-flex"]}>
                            <div className={style["pack-price-heading"]}>
                              <h3>1 Raddx Land Price</h3>{" "}
                            </div>
                            <div className={style["pack-price-amount"]}>
                              <h4>
                                {details?.buy_amount && (
                                  <>${parseInt(details?.buy_amount)}</>
                                )}
                              </h4>
                              {/* <h4>TBA</h4> */}
                              {Object.keys(eventInfo).length !== 0 &&
                                eventInfo.status !== LOOT_STATUS.SOLD_OUT &&
                                eventInfo.status !== LOOT_STATUS.DROP_ENDED && (
                                  <button
                                    onClick={() => handlePreBook(1)}
                                    className={`${style["buy-btn"]} ${
                                      eventInfo?.buttonDisabled &&
                                      style["disabled"]
                                    }`}
                                    disabled={eventInfo?.buttonDisabled}
                                  >
                                    {eventInfo?.status === LOOT_STATUS?.DROP ||
                                    eventInfo?.status === LOOT_STATUS?.DROP_YTS
                                      ? "BUY"
                                      : eventInfo?.status ===
                                        LOOT_STATUS?.ASSIGNING_NFTS
                                      ? "Assigning Nfts"
                                      : "Pre-Book"}
                                  </button>
                                )}
                            </div>
                          </div>
                        </div>
                        {/* <div className={style["price-list-box"]}>
                          <div className={style["pack-price-flex"]}>
                            <div className={style["pack-price-heading"]}>
                              <h3>5 FOUNDER Pass Box</h3>
                            </div>
                            <div className={style["pack-price-amount"]}>
                              <h4>$100</h4>
                              {Object.keys(eventInfo).length !== 0 &&
                                eventInfo.status !== LOOT_STATUS.SOLD_OUT &&
                                eventInfo.status !== LOOT_STATUS.DROP_ENDED && (
                                  <button
                                    onClick={() => handlePreBook(5)}
                                    className={`${style["buy-btn"]} ${
                                      eventInfo?.buttonDisabled &&
                                      style["disabled"]
                                    }`}
                                    disabled={eventInfo?.buttonDisabled}
                                  >
                                    {eventInfo?.status === LOOT_STATUS?.DROP ||
                                    eventInfo?.status === LOOT_STATUS?.DROP_YTS
                                      ? "BUY"
                                      : eventInfo?.status ===
                                        LOOT_STATUS?.ASSIGNING_NFTS
                                      ? "Assigning Nfts"
                                      : "Pre-Book"}
                                  </button>
                                )}
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["five"]}`}>
                    {/* <div className={`${style["box-block"]}`}>
                      <h6>EACH USER CAN BUY MAXIMUM 5</h6>
                      <h4>FOUNDER PASS BOX</h4>
                    </div> */}

                    <div className={`${style["box-block"]}`}>
                      <div className={`${style["price-list-group"]}`}>
                        <div className={style["price-list-box"]}>
                          <div className={style["pack-price-flex"]}>
                            <div className={style["pack-price-heading"]}>
                              <h3>Total Supply</h3>{" "}
                            </div>
                            <div className={style["pack-price-amount"]}>
                              <h4>
                                {details?.buy_amount && (
                                  <>{parseInt(details?.total_quantity)}</>
                                )}
                              </h4>
                              {/* <h4>TBA</h4> */}
                              {/* {Object.keys(eventInfo).length !== 0 &&
                                eventInfo.status !== LOOT_STATUS.SOLD_OUT &&
                                eventInfo.status !== LOOT_STATUS.DROP_ENDED && (
                                  <button
                                    onClick={() => handlePreBook(1)}
                                    className={`${style["buy-btn"]} ${
                                      eventInfo?.buttonDisabled &&
                                      style["disabled"]
                                    }`}
                                    disabled={eventInfo?.buttonDisabled}
                                  >
                                    {eventInfo?.status === LOOT_STATUS?.DROP ||
                                    eventInfo?.status === LOOT_STATUS?.DROP_YTS
                                      ? "BUY"
                                      : eventInfo?.status ===
                                        LOOT_STATUS?.ASSIGNING_NFTS
                                      ? "Assigning Nfts"
                                      : "Pre-Book"}
                                  </button>
                                )} */}
                            </div>
                          </div>
                        </div>
                        {/* <div className={style["price-list-box"]}>
                          <div className={style["pack-price-flex"]}>
                            <div className={style["pack-price-heading"]}>
                              <h3>5 FOUNDER Pass Box</h3>
                            </div>
                            <div className={style["pack-price-amount"]}>
                              <h4>$100</h4>
                              {Object.keys(eventInfo).length !== 0 &&
                                eventInfo.status !== LOOT_STATUS.SOLD_OUT &&
                                eventInfo.status !== LOOT_STATUS.DROP_ENDED && (
                                  <button
                                    onClick={() => handlePreBook(5)}
                                    className={`${style["buy-btn"]} ${
                                      eventInfo?.buttonDisabled &&
                                      style["disabled"]
                                    }`}
                                    disabled={eventInfo?.buttonDisabled}
                                  >
                                    {eventInfo?.status === LOOT_STATUS?.DROP ||
                                    eventInfo?.status === LOOT_STATUS?.DROP_YTS
                                      ? "BUY"
                                      : eventInfo?.status ===
                                        LOOT_STATUS?.ASSIGNING_NFTS
                                      ? "Assigning Nfts"
                                      : "Pre-Book"}
                                  </button>
                                )}
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  <div className={`${style["items"]} ${style["six"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Box Price</h6>
                      <h4>
                        {details?.buy_amount && (
                          <>${parseInt(details?.buy_amount) || 0} / Box</>
                        )}
                      </h4>
                      {/* <h4>TBA</h4> */}
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["seven"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>DROP SUPPLY</h6>
                      {eventInfo?.status === LOOT_STATUS?.SOLD_OUT && (
                        <>
                          <h4>{`${details.total_quantity} NFTs`}</h4>
                          <h6>(SOLD OUT)</h6>
                        </>
                      )}
                      {eventInfo?.status !== LOOT_STATUS?.SOLD_OUT && (
                        <h4>
                          {`${details?.available_qty} / ${
                            details?.total_quantity || "-"
                          }`}
                        </h4>
                      )}
                      {/* <h4>TBA</h4> */}
                    </div>
                  </div>

                  <div className={`${style["items"]} ${style["eight"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>
                        {eventInfo?.status === LOOT_STATUS?.PRE_BOOK ||
                        eventInfo?.status === LOOT_STATUS?.YTS
                          ? "Pre-Book Start"
                          : "Drop Start"}
                      </h6>
                      {
                        // details?.auction_start_time &&
                        details?.preorder_start_time ? (
                          <>
                            <h4>
                              <span>
                                {eventInfo?.status === LOOT_STATUS?.PRE_BOOK ||
                                eventInfo?.status === LOOT_STATUS?.YTS ? (
                                  <>
                                    {dayjs(details?.preorder_start_time).format(
                                      "D MMM, YYYY"
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {dayjs(details?.auction_start_time).format(
                                      "D MMM, YYYY"
                                    )}
                                  </>
                                )}
                              </span>
                            </h4>
                          </>
                        ) : (
                          <>
                            <h4 className={`${style["time-duration"]}`}>TBA</h4>
                          </>
                        )
                      }
                      {
                        // details?.auction_start_time &&
                        details?.preorder_start_time ? (
                          <h6 className={`${style["time-duration"]}`}>
                            {eventInfo?.status === LOOT_STATUS?.PRE_BOOK ||
                            eventInfo?.status === LOOT_STATUS?.YTS ? (
                              <>
                                {dayjs(details?.preorder_start_time).format(
                                  "h A IST"
                                )}
                              </>
                            ) : (
                              <>
                                {dayjs(details?.auction_start_time).format(
                                  "h A IST"
                                )}
                              </>
                            )}
                          </h6>
                        ) : (
                          <></>
                        )
                      }
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["nine"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>
                        {eventInfo?.status === LOOT_STATUS?.PRE_BOOK ||
                        eventInfo?.status === LOOT_STATUS?.YTS
                          ? "Pre-Book End"
                          : "Drop End"}
                      </h6>
                      {
                        // details?.auction_end_time &&
                        details?.preorder_end_time ? (
                          <h4>
                            <span>
                              {eventInfo?.status === LOOT_STATUS?.PRE_BOOK ||
                              eventInfo?.status === LOOT_STATUS?.YTS ? (
                                <>
                                  {dayjs(details?.preorder_end_time).format(
                                    "D MMM, YYYY"
                                  )}
                                </>
                              ) : (
                                <>
                                  {dayjs(details?.auction_end_time).format(
                                    "D MMM, YYYY"
                                  )}
                                </>
                              )}
                            </span>
                          </h4>
                        ) : (
                          <></>
                        )
                      }

                      {
                        // details?.auction_end_time &&
                        details?.preorder_end_time ? (
                          <h6 className={`${style["time-duration"]}`}>
                            {eventInfo?.status === LOOT_STATUS?.YTS ||
                            eventInfo.status === LOOT_STATUS?.PRE_BOOK ? (
                              <>
                                {dayjs(details?.preorder_end_time).format(
                                  "h A  IST"
                                )}
                              </>
                            ) : (
                              <>
                                {dayjs(details?.auction_end_time).format(
                                  "h A  IST"
                                )}
                              </>
                            )}
                          </h6>
                        ) : (
                          <h4 className={`${style["time-duration"]}`}>TBA</h4>
                        )
                      }
                    </div>
                  </div>
                </div>

                <div
                  className={`${style["pack-section"]}  ${style["cursor-pointer"]}`}
                  // onClick={() => toggleMuteVideo()}
                >
                  <video
                    className={style["pack-image"]}
                    loop
                    src={images?.mcl_elite_founder_pass_video}
                    playsInline
                    muted={mutedVideo}
                    autoPlay
                    type="video/mp4"
                  ></video>
                </div>
              </div>
            </div>
            {/* <div className="row" ref={lootStatusRef}>
              <div className="col-12 text-center mt-5">
                {eventInfo?.buttonTitle && (
                  <button
                    className={style["pre-book-btn"]}
                    onClick={() => handlePreBook(1)}
                    disabled={eventInfo?.buttonDisabled}
                  >
                    {eventInfo?.buttonTitle}
                  </button>
                )}
              </div>
            </div> */}
          </div>
          <div className="row">
            <div className="col-12">
              <h5 className={style["lootbox-info"]}>
                Turn laps into landmarks! Be the captain of your Metaverse
                domain with exclusive land and buildings around the racetrack.
                Start your journey to ownership now!
              </h5>
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
          <>
            {ENABLE_REWARD_BUY && (
              <RaddxLandPrebook
                show={modalType === MODAL_TYPES.PREBOOK}
                toggleModal={toggleModal}
                modalState={modalState}
                onReload={buySuccess}
                eventDetails={details}
                slug={process.env.NEXT_PUBLIC_RADDX_LAND_LOOT_BOX_SLUG}
                quantityPerOrder={nftQuantityValue}
              />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default RaddxPrebookBoxDetails;
