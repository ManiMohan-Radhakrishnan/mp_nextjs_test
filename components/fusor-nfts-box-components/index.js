import { MODAL_TYPES, LOOT_STATUS } from "./common";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

import {
  isUserLoggedIn,
  setFusorsDropLive,
} from "../../redux/reducers/user_reducer";
import { lootAvailableQty } from "../../utils/actioncable-methods";

import LoginWithPassword from "../loot-box-section/login-with-password";
import LoginWithOtp from "../loot-box-section/login-with-otp";
import LoginWithGoogleOtp from "../loot-box-section/google-otp";
import VerifyOtp from "../loot-box-section/verify-otp";
import ForgotPassword from "../loot-box-section/forgot-password";
import Register from "../loot-box-section/register";
import PrebookWithBuyOptions from "../loot-box-section/prebook-with-buy-options";
import FusorExplanation from "./fusor-explanation";
import FlipTimer from "../flip-timer";

import images from "../../utils/images.json";

import style from "./style.module.scss";

const dateFormat = (date = null, format = "YYYY-MM-DD HH:mm:ss") => {
  if (!date) return null;
  var input_date = new Date(date);
  return dayjs(input_date).format(format);
};

const ENABLE_REWARD_BUY = true;

const FusorBoxDetails = ({ buySuccess = () => {}, details }) => {
  const dispatch = useDispatch();

  const [modalType, setModalType] = useState("");
  const [modalState, setModalState] = useState({});
  const loginStatus = useSelector(isUserLoggedIn);
  const [availQty, setAvailQty] = useState("-");
  const [mutedVideo, setMutedVideo] = useState(true);
  const [nftQuantityValue, setNftQuantityValue] = useState(1);

  const [eventInfo, setEventInfo] = useState({});

  const lootStatusRef = useRef(null);

  const initEventInfo = (showToast = false) => {
    const now = new Date().getTime();
    let event_info = { ...eventInfo };
    if (parseInt(details?.available_qty) === 0) {
      dispatch(setFusorsDropLive(LOOT_STATUS?.SOLD_OUT));
      event_info = {
        title: "SOLD OUT",
        status: LOOT_STATUS?.SOLD_OUT,
        buttonTitle: "DROP SOLD OUT",
        buttonDisabled: true,
      };
    } else if (now < new Date(details?.preorder_start_time).getTime()) {
      dispatch(setFusorsDropLive(LOOT_STATUS?.YTS));
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
      dispatch(setFusorsDropLive(LOOT_STATUS?.PRE_BOOK));
      event_info = {
        title: "PRE-BOOK ENDS IN",
        status: LOOT_STATUS?.PRE_BOOK,
        endAt: dateFormat(details?.preorder_end_time),
        buttonTitle: "PRE-BOOK NOW",
        buttonDisabled: false,
      };
    } else if (
      details?.auction_start_time === null ||
      details?.auction_end_time === null
    ) {
      dispatch(setFusorsDropLive(LOOT_STATUS?.DROP_YTA));
      statusChangeMessage = "Pre-book ended";
      event_info = {
        title: "DROP COMING SOON",
        status: LOOT_STATUS?.DROP_YTA,
        buttonTitle: "BUY",
        buttonDisabled: true,
      };
    } else if (details?.flow_status === "assign") {
      dispatch(setFusorsDropLive(LOOT_STATUS?.ASSIGNING_NFTS));
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
      dispatch(setFusorsDropLive(LOOT_STATUS?.DROP_YTS));
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
      dispatch(setFusorsDropLive(LOOT_STATUS?.DROP));
      event_info = {
        title: "DROP ENDS IN",
        status: LOOT_STATUS?.DROP,
        endAt: dateFormat(details?.auction_end_time),
        buttonTitle: "BUY NOW",
        buttonDisabled: !details?.available_qty,
      };
    } else if (now > new Date(details?.auction_end_time).getTime()) {
      dispatch(setFusorsDropLive(LOOT_STATUS?.SOLD_OUT));
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
          dispatch(setFusorsDropLive(LOOT_STATUS?.SOLD_OUT));
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
            dispatch(setFusorsDropLive(LOOT_STATUS?.DROP));
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
            dispatch(setFusorsDropLive(LOOT_STATUS?.ASSIGNING_NFTS));
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
      <section className={`${style["hero-banner-section"]} `}>
        <div className="container-fluid position-relative">
          <div className="row">
            <div className="col-12">
              <div className={`${style["hero-content-block"]}`}>
                <h3 className={`${style["title"]}`}>
                  <span>INTRODUCING THE FUSOR NFTs! </span>
                </h3>
                <p>
                  The Fusor NFT lets you fuse two MCL NFT players to create:{" "}
                  <span>
                    New MCL Premier NFT Player + Special Shot NFT + MCL Fielding
                    Action NFT!
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={style["loot-timer-section"]}>
          <div className="container-fluid">
            {eventInfo?.status === LOOT_STATUS?.SOLD_OUT && (
              <div className="row">
                <div className="col-12">
                  <div className={style["loot-timer-block"]}>
                    {eventInfo?.buttonTitle && (
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
            )}
            {eventInfo?.status === LOOT_STATUS?.DROP_ENDED && (
              <div className="row">
                <div className="col-12">
                  <div className={style["loot-timer-block"]}>
                    {eventInfo?.buttonTitle && (
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
            )}
            {!titleStatus.includes(eventInfo?.status) && (
              <div className="row">
                <div className="col-12">
                  <div className={style["loot-timer-block"]}>
                    {eventInfo?.title && <h4>{eventInfo?.title}</h4>}
                    {eventInfo?.endAt && (
                      <FlipTimer
                        classNames={"bat-timer"}
                        endTime={eventInfo?.endAt}
                        handleEndEvent={() =>
                          setTimeout(() => initEventInfo(true), 1000)
                        }
                      />
                    )}
                    {eventInfo?.buttonTitle && (
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
            )}
          </div>
        </div>
      </section>
      <FusorExplanation />

      <section className={style["main-loot-section"]}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className={style["loot-block"]}>
                <div className={style["loot-section"]}>
                  <div className={`${style["items"]} ${style["one"]}`}>
                    <h2>
                      <span className={style["bat-title"]}>
                        EVERY FUSOR BOX CONTAINS
                      </span>
                    </h2>
                    <p className={`${style["first-p"]}`}>
                      1 Fusor NFT of some category (Rookie, Rare, Epic,
                      Legendary).
                    </p>
                    <h6>ON FUSING TWO MCL PLAYERS, YOU GET:</h6>
                    <p>
                      1 New MCL Premier NFT Player <br />+<br /> 1 Special Shot
                      NFT (of some category) <br />+<br />1 MCL Fielding Action
                      NFT (of some category)
                    </p>
                  </div>
                  <div className={`${style["items"]} ${style["two"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <div className={`${style["price-list-group"]}`}>
                        <div className={style["price-list-box"]}>
                          <div className={style["pack-price-flex"]}>
                            <div className={style["pack-price-heading"]}>
                              <h3>1 FUSOR Loot Box</h3>{" "}
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
                              <h3>5 FUSOR Loot Box</h3>
                            </div>
                            <div className={style["pack-price-amount"]}>
                              <h4>$25</h4>
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
                  </div>

                  <div className={`${style["items"]} ${style["three"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Fusor Box Price</h6>
                      <h4 className={style["pack-price"]}>
                        {details?.buy_amount && (
                          <>${parseInt(details?.buy_amount || 0)} / Fusor Box</>
                        )}
                      </h4>
                    </div>
                  </div>

                  <div className={`${style["items"]} ${style["four"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Total Supply</h6>
                      <h4 className={style["pack-count"]}>
                        {details?.total_quantity && (
                          <>{details?.total_quantity || "-"} Boxes</>
                        )}
                      </h4>
                    </div>
                  </div>

                  <div className={`${style["items"]} ${style["six"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Pre-book Allocation</h6>
                      <h4 className={style["pack-count"]}>8200</h4>
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["seven"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Drop Supply</h6>
                      {eventInfo?.status === LOOT_STATUS?.SOLD_OUT && (
                        <>
                          <h4 className={style["pack-count"]}>10000 NFTs</h4>
                          <h6>(SOLD OUT)</h6>
                        </>
                      )}
                      {eventInfo?.status !== LOOT_STATUS?.SOLD_OUT && (
                        <h4 className={style["pack-count"]}>{`${availQty} / ${
                          details?.total_quantity || "-"
                        }`}</h4>
                      )}
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
                        <br />
                        <span>
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
                        </span>
                      </h4>
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
                        <br />
                        <span>
                          {eventInfo?.status === LOOT_STATUS?.YTS ||
                          eventInfo.status === LOOT_STATUS?.PRE_BOOK ? (
                            <>
                              {dayjs(details?.preorder_end_time).format(
                                "h A  IST"
                              )}
                            </>
                          ) : (
                            <>
                              {" "}
                              {dayjs(details?.auction_end_time).format(
                                "h A  IST"
                              )}
                            </>
                          )}
                        </span>
                      </h4>
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
                    src={images?.fusor_box_video}
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
                    className={style["pre-book-btn"]}
                    onClick={() => handlePreBook(1)}
                    disabled={eventInfo?.buttonDisabled}
                  >
                    {eventInfo?.buttonTitle}
                  </button>
                )}
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
          <>
            {ENABLE_REWARD_BUY && (
              <PrebookWithBuyOptions
                show={modalType === MODAL_TYPES.PREBOOK}
                toggleModal={toggleModal}
                modalState={modalState}
                onReload={buySuccess}
                slug={process.env.NEXT_PUBLIC_MCL_FUSOR_NFT_SLUG}
                quantityPerOrder={nftQuantityValue}
              />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default FusorBoxDetails;
