import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import {
  getAndroidAPK,
  isUserLoggedIn,
  setMclShotsDropLive,
} from "../../redux/reducers/user_reducer";
import { MODAL_TYPES, LOOT_STATUS } from "./common";
import JoinWaitList from "./join-wait-list";
import LoginWithPassword from "../loot-box-section/login-with-password";
import LoginWithOtp from "../loot-box-section/login-with-otp";
import LoginWithGoogleOtp from "../loot-box-section/google-otp";
import VerifyOtp from "../loot-box-section/verify-otp";
import ForgotPassword from "../loot-box-section/forgot-password";
import Register from "../loot-box-section/register";
import Prebook from "../loot-box-section/prebook";
import PrebookWithBuyOptions from "../loot-box-section/prebook-with-buy-options";
import FlipTimer from "../flip-timer";

import LootImage from "../../images/drop/loot-image.png";
import images from "../../utils/images.json";

import { GoUnmute, GoMute } from "react-icons/go";
import style from "./style.module.scss";
import BannerSection from "./banner-section";
import { lootAvailableQty } from "../../utils/actioncable-methods";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { AiFillAndroid, AiFillWindows } from "react-icons/ai";
import Image from "next/image";

const ENABLE_REWARD_BUY = false;

const dateFormat = (date = null, format = "YYYY-MM-DD HH:mm:ss") => {
  if (!date) return null;
  var input_date = new Date(date);
  return dayjs(input_date).format(format);
};

const MclBallLootBoxSection = ({ buySuccess = () => {}, details }) => {
  const dispatch = useDispatch();
  const androidAPK = useSelector(getAndroidAPK);
  // const windowsEXE = useSelector(getWindowsEXE);
  const [modalType, setModalType] = useState("");
  const [modalState, setModalState] = useState({});
  const loginStatus = useSelector(isUserLoggedIn);
  const [availQty, setAvailQty] = useState(details?.available_qty || 0);
  const [mutedVideo, setMutedVideo] = useState(true);
  const toggleMuteVideo = () => {
    mutedVideo === true ? setMutedVideo(false) : setMutedVideo(true);
  };
  const [eventInfo, setEventInfo] = useState({
    // title: "PRE-BOOK STARTS IN",
    // status: LOOT_STATUS?.YTS,
    // endAt: dateFormat(details?.preorder_start_time),
    // buttonTitle: "PRE-BOOK",
    // buttonDisabled: true,
  });

  const lootStatusRef = useRef(null);

  const initEventInfo = (showToast = false) => {
    const now = new Date().getTime(details?.current_time);
    let event_info = { ...eventInfo };
    let statusChangeMessage = "";
    if (parseInt(details?.available_qty) === 0) {
      event_info = {
        title: "SOLD OUT",
        status: LOOT_STATUS?.SOLD_OUT,
        buttonTitle: "SOLD OUT",
        buttonDisabled: true,
      };
    } else if (now < new Date(details?.preorder_start_time).getTime()) {
      dispatch(setMclShotsDropLive(LOOT_STATUS?.YTS));
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
      dispatch(setMclShotsDropLive(LOOT_STATUS?.PRE_BOOK));
      event_info = {
        title: "PRE-BOOK ENDS IN",
        status: LOOT_STATUS?.PRE_BOOK,
        endAt: dateFormat(details?.preorder_end_time),
        buttonTitle: "PRE-BOOK NOW",
        buttonDisabled:
          details?.preorder_reserved_qty === details?.preorder_qty_per_user,
      };
    } else if (
      details?.auction_start_time === null ||
      details?.auction_end_time === null
    ) {
      dispatch(setMclShotsDropLive(LOOT_STATUS?.DROP_YTA));
      statusChangeMessage = "Pre-book ended";
      event_info = {
        title: "DROP COMING SOON",
        status: LOOT_STATUS?.DROP_YTA,
        buttonTitle: "BUY NOW",
        buttonDisabled: true,
      };
    } else if (details?.flow_status === "assign") {
      dispatch(setMclShotsDropLive(LOOT_STATUS?.ASSIGNING_NFTS));
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
      dispatch(setMclShotsDropLive(LOOT_STATUS?.DROP_YTS));
      statusChangeMessage = "Pre-book ended";
      event_info = {
        title: "DROP STARTS IN",
        status: LOOT_STATUS?.DROP_YTS,
        endAt: dateFormat(details?.auction_start_time),
        buttonTitle: "BUY NOW",
        buttonDisabled: true,
      };
    } else if (
      now > new Date(details?.auction_start_time).getTime() &&
      now <= new Date(details?.auction_end_time).getTime() &&
      details?.flow_status === "buy"
    ) {
      dispatch(setMclShotsDropLive(LOOT_STATUS?.DROP));
      event_info = {
        title: "DROP ENDS IN",
        status: LOOT_STATUS?.DROP,
        endAt: dateFormat(details?.auction_end_time),
        buttonTitle: "BUY NOW",
        buttonDisabled:
          !details?.available_qty ||
          details?.purchased_qty === details?.qty_per_user,
      };
    } else if (now > new Date(details?.auction_end_time).getTime()) {
      dispatch(setMclShotsDropLive(LOOT_STATUS?.SOLD_OUT));
      statusChangeMessage = "Drop ended";
      event_info = {
        title: "DROP ENDED",
        status: LOOT_STATUS?.SOLD_OUT,
        buttonTitle: "SOLD OUT",
        buttonDisabled: true,
      };
    }
    // if (statusChangeMessage) {
    //   toggleModal();
    //   showToast && toast.info(statusChangeMessage);
    // }
    setEventInfo(event_info);
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
    initEventInfo();
  }, []);

  // useEffect(() => {
  //   let quantity = null;
  //   if (details?.slug) {
  //     initEventInfo();
  //     lootAvailableQty(details?.slug, (data) => {
  //       const now = new Date().getTime(details?.current_time);
  //       if (quantity && quantity != null) {
  //         if (!isNaN(data?.available) && data?.available < quantity) {
  //           setAvailQty(data?.available);
  //           quantity = data?.available;
  //         }
  //       } else {
  //         !isNaN(data?.available) && setAvailQty(data?.available);
  //         quantity = data?.available;
  //       }

  //       if (parseInt(data?.available) === 0) {
  //         dispatch(setMclShotsDropLive(LOOT_STATUS?.SOLD_OUT));
  //         setEventInfo({
  //           title: "DROP ENDED",
  //           status: LOOT_STATUS?.SOLD_OUT,
  //           buttonTitle: "Sold Out",
  //           buttonDisabled: true,
  //         });
  //       } else {
  //         if (
  //           data?.flow_status === "buy" &&
  //           eventInfo?.status !== LOOT_STATUS?.DROP
  //         ) {
  //           dispatch(setMclShotsDropLive(LOOT_STATUS?.DROP));
  //           setEventInfo({
  //             title: "DROP ENDS IN",
  //             status: LOOT_STATUS?.DROP,
  //             endAt: dateFormat(details?.auction_end_time),
  //             buttonTitle: "BUY NOW",
  //             buttonDisabled:
  //               !details?.available_qty ||
  //               details?.purchased_qty === details?.qty_per_user,
  //           });
  //         }
  //         if (
  //           data?.flow_status === "assign" &&
  //           eventInfo?.status !== LOOT_STATUS?.ASSIGNING_NFTS
  //         ) {
  //           dispatch(setMclShotsDropLive(LOOT_STATUS?.ASSIGNING_NFTS));
  //           let endAt =
  //             now <= new Date(details?.auction_start_time).getTime()
  //               ? details?.auction_start_time
  //               : details?.auction_end_time;
  //           let title =
  //             now <= new Date(details?.auction_start_time).getTime()
  //               ? "DROP STARTS IN"
  //               : "DROP ENDS IN";
  //           setEventInfo({
  //             title,
  //             endAt,
  //             status: LOOT_STATUS?.ASSIGNING_NFTS,
  //             buttonTitle: "Assigning NFTs",
  //             buttonDisabled: true,
  //           });
  //         }
  //       }
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [details]);

  return (
    <>
      {/* <section>
        <div className={style["loot-timer-section"]}>
          <div className="container-fluid">
            {eventInfo?.status !== LOOT_STATUS?.SOLD_OUT && (
              <div className="row">
                <div className="col-12">
                  <div className={style["loot-timer-block"]}>
                    <h4>{eventInfo?.title}</h4>
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
                          onClick={handlePreBook}
                          disabled={eventInfo?.buttonDisabled}
                        >
                          {eventInfo?.buttonTitle}
                        </button>
                      </>
                    )}
                    {details?.preorder_reserved_qty ===
                      details?.preorder_qty_per_user &&
                      eventInfo?.status === LOOT_STATUS.PRE_BOOK && (
                        <h6 className="playpass-hint">
                          <BsFillInfoCircleFill />
                          {"  "}
                          Shots NFT is prebooked already.
                        </h6>
                      )}
                    {eventInfo?.buttonDisabled &&
                      eventInfo?.status === LOOT_STATUS.DROP && (
                        <h6 className="playpass-hint">
                          <BsFillInfoCircleFill />
                          {"  "}
                          Shots NFT is already purchased.
                        </h6>
                      )}
                    <h4 className={style["down-section"]}>DOWNLOAD MCL GAME</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section> */}
      <section className={style["main-loot-section"]}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className={style["loot-block"]}>
                <div className={style["loot-section"]}>
                  <div className={`${style["items"]} ${style["one"]}`}>
                    <h2>
                      <span className={style["bat-title"]}>
                        OWN MCL BALL NFT
                      </span>
                    </h2>
                    <h4>
                      <span
                        className={`${style["bat-title"]} ${style["secondary-bat-title"]}`}
                      >
                        ABOUT COLLECTION
                      </span>
                    </h4>
                    <p>
                      The MCL Ball NFTs have been designed to bring to our
                      cricket metaverse, the real spirit of cricket gameplay -
                      complementing the formidable batting lineup with a
                      devastating meta-bowling attack, so the game brings to
                      you, more thrill and energy!
                    </p>
                    <p>
                      Some Signature Shots include World Cup Victory Shot,
                      Superstar Shot, Switch Hit, Super Scoop, Reverse Sweep,
                      Straight Drive, Slog Sweep, SKY Shot, Uppercut, Kung Fu
                      Pull Shot, and many more…
                    </p>
                  </div>
                  <div className={`${style["items"]} ${style["two"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Every Box Contains</h6>
                      <p className={style["loot-desc"]}>MCL Ball NFTs</p>
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["three"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>MCL Ball NFTs — Mystery Box Price</h6>
                      <h4 className={style["pack-price"]}>
                        <span>
                          {/* <s>$10</s>
                          <br /> */}
                        </span>{" "}
                        ${parseInt(details?.buy_amount)} / Mystery Box
                      </h4>
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["four"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>
                        <b>EACH USER CAN BUY ONLY 1 MYSTERY BOX</b>
                      </h6>
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["five"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Total Supply</h6>
                      <h4 className={style["pack-count"]}>
                        {details?.total_quantity} Mystery Boxes
                      </h4>
                    </div>
                  </div>
                  {/* {![LOOT_STATUS.PRE_BOOK, LOOT_STATUS.DROP_YTS].includes(
                    eventInfo.status
                  ) && (
                    <>
                      <div className={`${style["items"]} ${style["six"]}`}>
                        <div className={`${style["box-block"]}`}>
                          <h6>Pre-book Allocation</h6>
                          <h4 className={style["pack-count"]}>8000 NFTs</h4>
                        </div>
                      </div>
                      <div className={`${style["items"]} ${style["seven"]}`}>
                        <div className={`${style["box-block"]}`}>
                          <h6>Drop Supply</h6>
                          {[
                            LOOT_STATUS.ASSIGNING_NFTS,
                            LOOT_STATUS.DROP,
                          ].includes(eventInfo.status) && (
                            <h4
                              className={style["pack-count"]}
                            >{`${availQty}/${details?.total_quantity}`}</h4>
                          )}
                          {eventInfo.status === LOOT_STATUS.SOLD_OUT && (
                            <>
                              <h4 className={style["pack-count"]}>
                                2000 Shot NFTs
                              </h4>
                              <h6>(SOLD OUT)</h6>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )} */}
                  {console.log(details, "details")}
                  <div className={`${style["items"]} ${style["eight"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Drop Start</h6>
                      <h4>
                        <span>
                          {dayjs(details?.auction_start_time).format(
                            "hh:mm A  IST"
                          )}
                        </span>
                        <br />
                        <span>
                          {/* TBD */}
                          {dayjs(details?.auction_start_time).format(
                            "D MMM, YYYY"
                          )}
                        </span>
                      </h4>
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["nine"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Drop End</h6>
                      <h4>
                        <span>
                          {dayjs(details?.auction_end_time).format(
                            "hh:mm A  IST"
                          )}
                        </span>
                        <br />
                        <span>
                          {/* TBD */}
                          {dayjs(details?.auction_end_time).format(
                            "D MMM, YYYY"
                          )}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>

                <div
                  className={`${style["pack-section"]}  ${style["cursor-pointer"]}`}
                  onClick={() => toggleMuteVideo()}
                >
                  <video
                    className={style["pack-image"]}
                    loop
                    src={
                      "https://cdn.guardianlink.io/product-hotspot/videos/drops/ball_nft_lootbox.mp4"
                    }
                    poster={LootImage}
                    playsInline
                    muted={mutedVideo}
                    autoPlay
                    type="video/mp4"
                  ></video>

                  <div className={style["tap_play"]}>
                    <button className={`${style["tap_play_btn"]}`}>
                      {mutedVideo === true ? (
                        <>
                          <GoMute /> Tap to Unmute
                        </>
                      ) : (
                        <>
                          <GoUnmute /> Tap to Mute
                        </>
                      )}
                    </button>
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
              {details?.preorder_reserved_qty ===
                details?.preorder_qty_per_user &&
                eventInfo?.status === LOOT_STATUS.PRE_BOOK && (
                  <h6 className="playpass-hint">
                    <BsFillInfoCircleFill />
                    {"  "}
                    Shots NFT is prebooked already.
                  </h6>
                )}
              {/* {
                details?.preorder_reserved_qty !==
                  details?.preorder_qty_per_user &&
                  (eventInfo?.status === LOOT_STATUS?.PRE_BOOK ||
                    eventInfo?.status === LOOT_STATUS?.YTS) && ( */}
              {eventInfo?.status === LOOT_STATUS?.PRE_BOOK && (
                <div className="mt-5">
                  <JoinWaitList />
                </div>
              )}
              {/* //   )
              // } */}
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
            {ENABLE_REWARD_BUY ? (
              <PrebookWithBuyOptions
                show={modalType === MODAL_TYPES.PREBOOK}
                toggleModal={toggleModal}
                modalState={modalState}
                onReload={buySuccess}
                slug={process.env.NEXT_PUBLIC_DROP_MCL_SHOTS_SLUG}
              />
            ) : (
              <Prebook
                show={modalType === MODAL_TYPES.PREBOOK}
                toggleModal={toggleModal}
                modalState={modalState}
                onReload={buySuccess}
                slug={process.env.NEXT_PUBLIC_DROP_MCL_SHOTS_SLUG}
              />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default MclBallLootBoxSection;
