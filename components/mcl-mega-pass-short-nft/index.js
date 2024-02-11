import { useDispatch, useSelector } from "react-redux";
import { BsCalendar4, BsFillInfoCircleFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

import {
  isUserLoggedIn,
  setMclGamePassDropLive,
} from "../../redux/reducers/user_reducer";
import useWindowSize from "../../hooks/useWindowSize";
import { lootAvailableQty } from "../../utils/actioncable-methods";
import { LOOT_STATUS, MODAL_TYPES } from "./common";

import LoginWithPassword from "../loot-box-section/login-with-password";
import LoginWithOtp from "../loot-box-section/login-with-otp";
import LoginWithGoogleOtp from "../loot-box-section/google-otp";
import VerifyOtp from "../loot-box-section/verify-otp";
import ForgotPassword from "../loot-box-section/forgot-password";
import Register from "../loot-box-section/register";
import FlipTimer from "../flip-timer";
import MclPassShortPrebook from "../loot-box-section/mcl-pass-short-prebook-with-buy-options";

import images from "../../utils/images.json";

import style from "./style.module.scss";

const dateFormat = (date = null, format = "YYYY-MM-DD HH:mm:ss") => {
  if (!date) return null;
  var input_date = new Date(date);
  return dayjs(input_date).format(format);
};

const ENABLE_REWARD_BUY = true;

const MegaPassShortBoxDetails = ({ buySuccess = () => {}, details }) => {
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
      dispatch(setMclGamePassDropLive(LOOT_STATUS?.SOLD_OUT));
      event_info = {
        title: "SOLD OUT",
        status: LOOT_STATUS?.SOLD_OUT,
        buttonTitle: "DROP SOLD OUT",
        buttonDisabled: true,
      };
    } else if (now < new Date(details?.preorder_start_time).getTime()) {
      dispatch(setMclGamePassDropLive(LOOT_STATUS?.YTS));
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
      dispatch(setMclGamePassDropLive(LOOT_STATUS?.PRE_BOOK));
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
      dispatch(setMclGamePassDropLive(LOOT_STATUS?.DROP_YTA));
      // statusChangeMessage = "Pre-book ended";
      event_info = {
        title: "DROP COMING SOON",
        status: LOOT_STATUS?.DROP_YTA,
        buttonTitle: "Buy",
        buttonDisabled: true,
      };
    } else if (details?.flow_status === "assign") {
      dispatch(setMclGamePassDropLive(LOOT_STATUS?.ASSIGNING_NFTS));
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
      dispatch(setMclGamePassDropLive(LOOT_STATUS?.DROP_YTS));
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
      dispatch(setMclGamePassDropLive(LOOT_STATUS?.DROP));
      event_info = {
        title: "DROP ENDS IN",
        status: LOOT_STATUS?.DROP,
        endAt: dateFormat(details?.auction_end_time),
        buttonTitle: "BUY NOW",
        buttonDisabled: !details?.available_qty,
      };
    } else if (now > new Date(details?.auction_end_time).getTime()) {
      dispatch(setMclGamePassDropLive(LOOT_STATUS?.SOLD_OUT));
      event_info = {
        title: "DROP ENDED",
        status: LOOT_STATUS?.DROP_ENDED,
        buttonDisabled: true,
        buttonTitle: "DROP ENDED",
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
          dispatch(setMclGamePassDropLive(LOOT_STATUS?.SOLD_OUT));
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
            dispatch(setMclGamePassDropLive(LOOT_STATUS?.DROP));
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
            dispatch(setMclGamePassDropLive(LOOT_STATUS?.ASSIGNING_NFTS));
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
                <h2>
                  INTRODUCING <span>MCL BOUNDARY SWAG SHOTS</span>
                </h2>
                <p>
                  Unleash your inner cricket rockstar with these tradable shot
                  NFTs that exude charisma and pack a punch, elevating your
                  gameplay to a whole new level
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className={style["loot-timer-section"]}>
                <div className={`${style["loot-timer-block"]}`}>
                  {!titleStatus.includes(eventInfo?.status) && (
                    <>
                      {eventInfo?.title && <h4>{eventInfo?.title}</h4>}
                      {eventInfo?.endAt && (
                        <FlipTimer
                          classNames={"bat-timer"}
                          endTime={eventInfo?.endAt}
                          handleEndEvent={() =>
                            setTimeout(() => initEventInfo(true), 1000)
                          }
                          hideMonth={true}
                        />
                      )}
                    </>
                  )}
                  {eventInfo?.status !== LOOT_STATUS?.SOLD_OUT &&
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

                  <div className={`${style["items"]} ${style["one"]}`}>
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
                      <h2>
                        ABOUT{" "}
                        <span className={style["theme-text"]}>COLLECTION</span>
                      </h2>
                      {/* <h6 className={`${style["time-duration"]}`}>
                        (Immortal)
                      </h6> */}
                      <p>
                        The MCL Boundary Swag Shots — Mystery Box includes
                        exceptional Batting Shot NFTs that can be used by all
                        MCL Batters. These shots infuse the swag and style of
                        the real cricketing legends in the history
                      </p>
                    </div>
                  </div>

                  <div className={`${style["items"]} ${style["two"]}`}>
                    <div className={`${style["box-block"]} w-100`}>
                      <h4 className="text-center">
                        Every Mystery Box Contains
                      </h4>
                      <h4 className={`${style["pack-price"]} text-center`}>
                        1 MCL Shot NFT
                      </h4>
                    </div>
                  </div>

                  <div className={`${style["items"]} ${style["three"]}`}>
                    <div className={`${style["box-block"]} w-100`}>
                      <h4 className="text-center">
                        MCL Bounday Swag Shot — Mystery Box Price
                      </h4>
                      <h4 className={`${style["pack-price"]} text-center`}>
                        <s>$10</s>
                        <br />
                        $1 / Mystery Box
                      </h4>
                    </div>
                  </div>
                  {/* <div className={`${style["items"]} ${style["sub-three"]}`}>
                    <div className={`${style["box-block"]} w-100`}>
                      <h4 className="text-center">EACH USER CAN CLAIM ONLY 1 PASS</h4>
                    </div>
                  </div> */}

                  {/* <div className={`${style["items"]} ${style["four"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>EACH USER CAN BUY MAXIMUM 5</h6>
                      <h4>FOUNDER PASS BOX</h4>
                    </div>

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
                        <div className={style["price-list-box"]}>
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
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className={`${style["items"]} ${style["five"]}`}>
                    {/* <div className={`${style["box-block"]}`}>
                      <h6>EACH USER CAN BUY MAXIMUM 5</h6>
                      <h4>FOUNDER PASS BOX</h4>
                    </div> */}

                    <div className={`${style["box-block"]} w-100`}>
                      <h4 className="text-center">Total Supply</h4>
                      <br />
                      <h4 className="text-center">
                        {details?.buy_amount && (
                          <>
                            {parseInt(details?.total_quantity)}{" "}
                            {"MYSTERY BOXES"}
                          </>
                        )}
                      </h4>
                      {/* <div className={`${style["price-list-group"]}`}>
                        <div className={style["price-list-box"]}>
                          <div className={style["pack-price-flex"]}>
                            <div className={style["pack-price-heading"]}>
                              {" "}
                            </div>
                            <div className={style["pack-price-amount"]}>

                              <h4>TBA</h4>
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
                        <div className={style["price-list-box"]}>
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
                        </div>
                      </div> */}
                    </div>
                  </div>

                  <div className={`${style["items"]} ${style["six"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Mystery Box</h6>
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
                          {details?.total_quantity}
                          {/* {`${details?.available_qty} / ${
                            details?.total_quantity || "-"
                          }`} */}
                        </h4>
                      )}
                      {/* <h4>TBA</h4> */}
                    </div>
                  </div>

                  <div className={`${style["items"]} ${style["eight"]}`}>
                    {eventInfo?.status === LOOT_STATUS?.YTS && (
                      <div className="box-block">
                        <h6>Pre-Book Starts On</h6>
                        <h4 className="cap">
                          {" "}
                          {dayjs(details?.preorder_start_time).format(
                            "DD - MMM - YYYY"
                          )}
                        </h4>
                        <h6 className="cap">
                          {dayjs(details?.preorder_start_time).format(
                            "hh:mm a"
                          )}{" "}
                          IST
                        </h6>
                      </div>
                    )}

                    {eventInfo?.status === LOOT_STATUS?.PRE_BOOK && (
                      <div className="box-block">
                        <h6>Pre-Book Started On</h6>
                        <h4 className="cap">
                          {" "}
                          {dayjs(details?.preorder_start_time).format(
                            "DD - MMM - YYYY"
                          )}
                        </h4>
                        <h6 className="cap">
                          {dayjs(details?.preorder_start_time).format(
                            "hh:mm a"
                          )}{" "}
                          IST
                        </h6>
                      </div>
                    )}

                    {(eventInfo?.status === LOOT_STATUS?.DROP_YTA ||
                      eventInfo?.status === LOOT_STATUS?.DROP_YTS) && (
                      <>
                        {!details?.auction_start_time ? (
                          <div className="box-block">
                            <h6>Drop Starts On</h6>
                            <h4 className="cap">TBA</h4>
                          </div>
                        ) : (
                          <div className="box-block">
                            <h6>Drop Starts On</h6>
                            <h4 className="cap">
                              {" "}
                              {dayjs(details?.auction_start_time).format(
                                "DD - MMM - YYYY"
                              )}
                            </h4>
                            <h6 className="cap">
                              {dayjs(details?.auction_start_time).format(
                                "hh:mm a"
                              )}{" "}
                              IST
                            </h6>
                          </div>
                        )}
                      </>
                    )}

                    {(eventInfo?.status === LOOT_STATUS?.DROP ||
                      eventInfo?.status === LOOT_STATUS?.DROP_ENDED ||
                      eventInfo?.status === LOOT_STATUS?.SOLD_OUT ||
                      eventInfo?.status === LOOT_STATUS?.ASSIGNING_NFTS) && (
                      <div className="box-block">
                        <h6>
                          {(eventInfo?.status === LOOT_STATUS?.DROP_ENDED ||
                            eventInfo?.status === LOOT_STATUS?.SOLD_OUT) &&
                            "Drop Started On"}
                        </h6>
                        <h6>
                          {(eventInfo?.status === LOOT_STATUS?.DROP ||
                            eventInfo?.status ===
                              LOOT_STATUS?.ASSIGNING_NFTS) &&
                            "Drop Starts On"}
                        </h6>
                        <h4 className="cap">
                          {" "}
                          {dayjs(details?.auction_start_time).format(
                            "DD - MMM - YYYY"
                          )}
                        </h4>
                        <h6 className="cap">
                          {dayjs(details?.auction_start_time).format("hh:mm a")}{" "}
                          IST
                        </h6>
                      </div>
                    )}
                  </div>
                  <div className={`${style["items"]} ${style["nine"]}`}>
                    {/* {(eventInfo?.status === LOOT_STATUS?.YTS ||
                      eventInfo?.status === LOOT_STATUS?.PRE_BOOK) && (
                      <>
                        {details?.auction_start_time === null && (
                          <div className="box-block">
                            <h6>Drop Starts On</h6>
                            <h4>TBA</h4>
                          </div>
                        )}
                        {details?.auction_start_time && (
                          <div className="box-block">
                            <h6>Drop Starts On</h6>
                            <h4 className="cap">
                              {" "}
                              {dayjs(details?.auction_start_time).format(
                                "DD - MMM - YYYY"
                              )}
                            </h4>
                            <h6 className="cap">
                              {dayjs(details?.auction_start_time).format(
                                "hh:mm a"
                              )}{" "}
                              IST
                            </h6>
                          </div>
                        )}
                      </>
                    )} */}

                    {(eventInfo?.status === LOOT_STATUS?.YTS ||
                      eventInfo?.status === LOOT_STATUS?.PRE_BOOK) && (
                      <div className="box-block">
                        <h6>Prebook Ends On</h6>
                        <h4 className="cap">
                          {" "}
                          {dayjs(details?.preorder_end_time).format(
                            "DD - MMM - YYYY"
                          )}
                        </h4>
                        <h6 className="cap">
                          {dayjs(details?.preorder_end_time).format("hh:mm a")}{" "}
                          IST
                        </h6>
                      </div>
                    )}

                    {eventInfo?.status === LOOT_STATUS?.DROP_YTA && (
                      <div className="box-block">
                        <h6>Drop Ends On</h6>
                        <h4 className="cap">TBA</h4>
                      </div>
                    )}

                    {(eventInfo?.status === LOOT_STATUS?.DROP ||
                      eventInfo?.status === LOOT_STATUS?.DROP_ENDED ||
                      eventInfo?.status === LOOT_STATUS?.SOLD_OUT ||
                      eventInfo?.status === LOOT_STATUS?.DROP_YTS ||
                      eventInfo?.status === LOOT_STATUS?.ASSIGNING_NFTS) && (
                      <div className="box-block">
                        <h6>
                          {(eventInfo?.status === LOOT_STATUS?.DROP_ENDED ||
                            eventInfo?.status === LOOT_STATUS?.SOLD_OUT) &&
                            "Drop Ended On"}
                        </h6>
                        <h6>
                          {(eventInfo?.status === LOOT_STATUS?.DROP ||
                            eventInfo?.status === LOOT_STATUS?.ASSIGNING_NFTS ||
                            eventInfo?.status === LOOT_STATUS?.DROP_YTS) &&
                            "Drop Ends On"}
                        </h6>
                        <h4 className="cap">
                          {" "}
                          {dayjs(details?.auction_end_time).format(
                            "DD - MMM - YYYY"
                          )}
                        </h4>
                        <h6 className="cap">
                          {dayjs(details?.auction_end_time).format("hh:mm a")}{" "}
                          IST
                        </h6>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`${style["pack-section"]}  ${style["cursor-pointer"]}`}
                  // onClick={() => toggleMuteVideo()}
                >
                  <video
                    className={style["pack-image"]}
                    loop
                    src={images?.mcl_founder_pass_video}
                    playsInline
                    muted={mutedVideo}
                    autoPlay
                    type="video/mp4"
                  ></video>
                </div>
              </div>
            </div>
            <div className="row" ref={lootStatusRef}>
              <div className="col-12 text-center mt-5">
                {eventInfo?.buttonTitle && (
                  <button
                    className={style["cus-theme-btn"]}
                    onClick={() => handlePreBook(1)}
                    disabled={
                      eventInfo?.buttonDisabled ||
                      details?.preorder_reserved_qty === 1
                    }
                  >
                    {eventInfo?.buttonTitle}
                  </button>
                )}
              </div>
              {details?.preorder_reserved_qty === 1 &&
                eventInfo?.status === LOOT_STATUS.PRE_BOOK && (
                  <>
                    <h6 className="playpass-hint">
                      <BsFillInfoCircleFill /> MCL Swag Shot already Pre-Booked
                    </h6>

                    {/* <div title="Add to Calendar" className="addeventatc">
                      <BsCalendar4 />
                      Add to my calendar
                      <span className="start">
                        {dayjs(details?.start_time).format(
                          "MM/DD/YYYY hh:mm A"
                        )}
                      </span>
                      <span className="end">
                        {" "}
                        {dayjs(details?.end_time).format("MM/DD/YYYY hh:mm A")}
                      </span>
                      <span className="timezone">Asia/Calcutta</span>
                      <span className="title">{details?.name}</span>
                      <span className="organizer">https://jump.trade/</span>
                    </div> */}
                  </>
                )}
            </div>
          </div>
          {/* <div className="row">
            <div className="col-12">
              <h5 className={style["lootbox-info"]}>
                Turn laps into landmarks! Be the captain of your Metaverse
                domain with exclusive land and buildings around the racetrack.
                Start your journey to ownership now!
              </h5>
            </div>
          </div> */}
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
              <MclPassShortPrebook
                show={modalType === MODAL_TYPES.PREBOOK}
                toggleModal={toggleModal}
                modalState={modalState}
                onReload={buySuccess}
                eventDetails={details}
                slug={process.env.NEXT_PUBLIC_MCL_MEGA_PASS_SHORT_NFT_SLUG}
                quantityPerOrder={nftQuantityValue}
              />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default MegaPassShortBoxDetails;
