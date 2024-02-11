import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Image from "next/image";

import {
  getAndroidAPK,
  isUserLoggedIn,
  setMclPlayPassDropLive,
} from "../../redux/reducers/user_reducer";
import {
  MODAL_TYPES,
  LOOT_STATUS,
} from "../../components/mcl-game-code-components/common";

import LoginWithGoogleOtp from "../loot-box-section/google-otp";
import FlipTimer from "../flip-timer";

import style from "./style.module.scss";
import { gameCodesAvailableQty } from "../../utils/actioncable-methods";
import { BsCalendar4, BsFillInfoCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";
import DropImage from "../../images/drop/mega-pass/dropImage.png";
import images from "../../utils/images-new.json";
import useWindowUtils from "../../hooks/useWindowUtils";
// import Success from "./success";
import {
  active_code_buy_thunk,
  loot_buy_thunk,
} from "../../redux/thunk/user_thunk";
import { AiFillAndroid, AiFillWindows } from "react-icons/ai";
import MclFounderPassPrebook from "../loot-box-section/mcl-founder-pass-prebook-with-buy-options";
import Register from "../loot-box-section/register";
import ForgotPassword from "../loot-box-section/forgot-password";
import VerifyOtp from "../loot-box-section/verify-otp";
import LoginWithOtp from "../loot-box-section/login-with-otp";
import LoginWithPassword from "../loot-box-section/login-with-password";
import LootBoxSection from "../mcl-game-code-components";
import Images from "../../utils/images.json";
import Prebook from "../mcl-free-season-pass/prebook";
import LootImage from "../../images/drop/loot-image.png";

const PackSection = () => {
  const { width: innerWidth } = useWindowUtils();
  const androidAPK = useSelector(getAndroidAPK);
  // const windowsEXE = useSelector(getWindowsEXE);

  return (
    <div className={style["pack-section"]}>
      {/* <Image
        unoptimized={true}
        height={400}
        width={400}
        alt="Pack"
        src={
          innerWidth > 767
            ? Images.mcl_free_season_pass
            : Images.mcl_free_season_pass
        }
        className={style["pack-image"]}
      /> */}

      <video
        className={style["pack-image"]}
        loop
        poster={
          "https://cdn.guardianlink.io/product-hotspot/images/jumptrade/MCL_Seasonal_Series_OG-min.jpg"
        }
        src={
          "https://cdn.guardianlink.io/product-hotspot/images/jumptrade/MCL_Seasonal_pass.mp4"
        }
        playsInline
        autoPlay
        muted
        type="video/mp4"
      ></video>
      {/* <h4 className={style["head-section"]}>DOWNLOAD MCL GAME</h4>
      <div className={`${style["btn-block"]} mt-2`}>
        <a
          href={androidAPK}
          // target="_blank"
          rel="noreferrer"
          className={`${style["download-icon-btn"]} ${style["theme-btn"]}`}
        >
          <span>
            {" "}
            <AiFillAndroid /> ANDROID
          </span>
        </a>
        <a
          href={windowsEXE}
          // target="_blank"
          rel="noreferrer"
          className={`${style["download-icon-btn"]} ${style["theme-btn"]}`}
        >
          <span>
            {" "}
            <AiFillWindows /> WINDOWS
          </span>
        </a>
      </div> */}
    </div>
  );
};

const dateFormat = (date = null, format = "YYYY-MM-DD HH:mm:ss") => {
  if (!date) return null;
  var input_date = new Date(date);
  return dayjs(input_date).format(format);
};

const MclSeasonPass = ({ slug, details, buySuccess = () => {} }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const lootStatusRef = useRef(null);
  const [modalType, setModalType] = useState("");
  const [modalState, setModalState] = useState({});
  const loginStatus = useSelector(isUserLoggedIn);
  const [availQty, setAvailQty] = useState(details?.available_qty || 0);
  const [eventInfo, setEventInfo] = useState({});

  const [nftQuantityValue, setNftQuantityValue] = useState(1);

  const initEventInfo = (showToast = false) => {
    let statusChangeMessage = "";
    const now = new Date().getTime(details?.current_time);
    let event_info = {
      title: "CLAIM STARTS IN",
      status: LOOT_STATUS?.YTS,
      endAt: dateFormat(details?.loot_start_time),
      buttonTitle:
        parseFloat(details?.buy_amount) < 1 && !details?.purchased_qty === 1
          ? "FREE CLAIM"
          : parseFloat(details?.buy_amount) < 1 && details?.purchased_qty === 1
          ? "CLAIMED"
          : "CLAIM NOW",
      buttonDisabled: true,
    };

    if (now < new Date(details?.loot_start_time).getTime()) {
      dispatch(setMclPlayPassDropLive("DROP STARTS IN"));
      event_info = {
        title: "CLAIM STARTS IN",
        status: LOOT_STATUS?.YTS,
        endAt: dateFormat(details?.loot_start_time),
        buttonTitle:
          parseFloat(details?.buy_amount) < 1 && !details?.purchased_qty === 1
            ? "FREE CLAIM"
            : parseFloat(details?.buy_amount) < 1 &&
              details?.purchased_qty === 1
            ? "CLAIMED"
            : "CLAIM NOW",
        buttonDisabled: true,
      };
    } else if (
      parseInt(details?.available_qty) === 0 &&
      now <= new Date(details?.loot_end_time).getTime()
    ) {
      statusChangeMessage = "MCL Play Passes are sold out!";
      event_info = {
        title: "CLAIM ENDED",
        status: LOOT_STATUS?.SOLD_OUT,
        buttonTitle: "SOLD OUT",
        buttonDisabled: true,
      };
    } else if (
      now >= new Date(details?.loot_start_time).getTime() &&
      now < new Date(details?.loot_end_time).getTime()
    ) {
      dispatch(setMclPlayPassDropLive(LOOT_STATUS?.DROP));

      event_info = {
        title: "CLAIM ENDS IN",
        status: LOOT_STATUS?.DROP,
        endAt: dateFormat(details?.loot_end_time),
        buttonTitle:
          parseFloat(details?.buy_amount) < 1 && !details?.purchased_qty === 1
            ? "FREE CLAIM"
            : parseFloat(details?.buy_amount) < 1 &&
              details?.purchased_qty === 1
            ? "CLAIMED"
            : "CLAIM NOW",
        // buttonDisabled: !details?.available_qty || details?.purchased_qty === 1,
        buttonDisabled:
          !details?.available_qty ||
          details?.purchased_qty === details?.qty_per_user,
      };
    }
    //  else if (parseInt(details?.available_qty) === 0) {
    //   event_info = {
    //     title: "SOLD OUT",
    //     status: LOOT_STATUS?.SOLD_OUT,
    //     buttonTitle: "SOLD OUT",
    //     buttonDisabled: true,
    //   };
    // }
    else if (parseInt(details?.available_qty) === 0) {
      event_info = {
        title: "SOLD OUT",
        status: LOOT_STATUS?.SOLD_OUT,
        buttonTitle: "SOLD OUT",
        buttonDisabled: true,
      };
    } else if (now >= new Date(details?.loot_end_time).getTime()) {
      dispatch(setMclPlayPassDropLive(LOOT_STATUS?.SOLD_OUT));
      statusChangeMessage = "Claim Ended!";
      event_info = {
        title: "CLAIM ENDED",
        status: LOOT_STATUS?.DROP_ENDED,
        buttonTitle: "CLAIM ENDED",
        buttonDisabled: true,
      };
    }
    // if (statusChangeMessage) {
    //   toggleModal();
    //   showToast && toast.info(statusChangeMessage);
    // }
    setEventInfo(event_info);
    setAvailQty(details?.available_qty);
  };

  const handlePreBook = (quantity = 1) => {
    if (eventInfo?.buttonDisabled) return;
    if (loginStatus) {
      setNftQuantityValue(quantity);
      let payment_include = [];
      payment_include.push("jump_point");
      dispatch(
        active_code_buy_thunk({
          data: {
            slug: details?.slug,
            activation_codes: { payment_include: [] },
          },
          callback: disPatchCallBackBuy,
        })
      );
    } else toggleModal(MODAL_TYPES.LOGIN_WITH_OTP);
  };

  const disPatchCallBackBuy = (data) => {
    if (data?.data?.message === "Processed Successfully") {
      toggleModal(MODAL_TYPES.CLAIM, {
        loot: { ...details },
        loot_status: LOOT_STATUS.CLAIM,
      });
    } else if (data?.data?.status === 406) {
      toast.error(data?.data?.message);
    }
  };
  const toggleModal = (modalType = "", modalState = {}) => {
    setModalType(modalType);
    setModalState(modalState);
  };

  useEffect(() => {
    setAvailQty(details?.available_qty || 0);
    if (details?.slug) {
      initEventInfo();
      gameCodesAvailableQty(details?.slug, (data) => {
        setAvailQty(data?.available);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  // useEffect(() => {
  //   gameCodesAvailableQty(slug, (data) => {
  //     !isNaN(data?.available) && setAvailQty(data?.available);
  //     if (parseInt(data?.available) === 0) {
  //       dispatch(setMclPlayPassDropLive(LOOT_STATUS?.SOLD_OUT));
  //       setEventInfo({
  //         title: "DROP ENDED",
  //         status: LOOT_STATUS?.SOLD_OUT,
  //         buttonTitle: "SOLD OUT",
  //         buttonDisabled: true,
  //       });
  //     }
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <div className={style["loot-timer-section"]}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {eventInfo?.endAt && (
                <div className={style["loot-timer-block"]}>
                  <h4>{eventInfo?.title}</h4>
                  <FlipTimer
                    endTime={eventInfo?.endAt}
                    handleEndEvent={() =>
                      setTimeout(() => initEventInfo(true), 1000)
                    }
                    // hideMonth={false}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <section className={style["main-loot-section"]}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className={style["loot-block"]}>
                <div className={style["loot-section"]}>
                  <div className={`${style["items"]} ${style["one"]}`}>
                    <h2>
                      ABOUT{" "}
                      <span className={style["theme-text"]}>
                        MCL SEASONAL PASS
                      </span>
                    </h2>
                    <p>
                      Your gateway to a season of thrilling tournaments and
                      incredible rewards. Claim your free pass, compete in daily
                      matches, and dominate the arena!
                    </p>
                  </div>
                  <div className={`${style["items"]} ${style["onesub"]}`}>
                    <h3>HOW IT WORKS?</h3>
                    <ul>
                      <li>
                        <b>Claim Your Pass:</b> Secure your spot in the action
                        by claiming a free pass.
                      </li>
                      <li>
                        <b>One Pass Per Player: </b>Each player can claim one
                        pass, valid for the entire tournament series.
                      </li>
                      <li>
                        <b>Daily Tournaments:</b> Battle out the matches of the
                        seasonal tournament each day with the players across the
                        globe.
                      </li>
                    </ul>
                  </div>
                  <div className={`${style["items"]} ${style["desc"]}`}>
                    <h3>HOW TO GET YOUR FREE PASS?</h3>
                    <ul>
                      <li>
                        <b>Sign Up or Sign In:</b> Newcomers can create a
                        Jump.trade account, while existing users can simply sign
                        in.
                      </li>
                      <li>
                        <b>Claim Your Pass:</b> Click &quot;Claim Now&quot; to
                        secure your free pass.
                      </li>{" "}
                      <li>
                        <b>Pass Added to Gaming Account:</b> Once claimed, your
                        pass is automatically added to your gaming account.
                      </li>
                    </ul>
                    <p>
                      <b>Note:</b> NFT ownership or rental is required to
                      participate in tournaments.
                    </p>
                  </div>
                  <div className={`${style["items"]} ${style["two"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h4>EACH USER CAN CLAIM ONLY 1 PASS</h4>
                    </div>
                  </div>
                  {/* <div className={`${style["items"]} ${style["three"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h4>
                        NON-NFT USERS WILL GET 1 BATSMAN NFT AND 1 BOWLER NFT ON
                        RENT FOR FREE<sup>#</sup>
                      </h4>
                    </div>
                  </div> */}
                  <div className={`${style["items"]} ${style["four"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h4>MCL SEASONAL PASS PRICE</h4>
                      {details?.buy_amount && (
                        <h4 className={style["pack-price"]}>
                          {parseFloat(details?.buy_amount) < 1 ? (
                            <>
                              <s>$1/PASS</s>
                              <br />
                              FREE
                            </>
                          ) : (
                            <>{"$" + parseInt(details?.buy_amount)}/PASS</>
                          )}
                        </h4>
                      )}
                    </div>
                  </div>
                  {/* <div className={`${style["items"]} ${style["five"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>TOTAL SUPPLY</h6>
                      <h4 className={style["pack-count"]}>
                        {details?.total_quantity}
                      </h4>
                    </div>
                  </div> */}

                  {/* <div className={`${style["items"]} ${style["six"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>AVAILABLE SUPPLY</h6>

                      {eventInfo.status !== LOOT_STATUS.SOLD_OUT &&
                      availQty > 0 ? (
                        <h4 className={style["pack-count"]}>{availQty}</h4>
                      ) : (
                        <>
                          {" "}
                          <h4 className={style["pack-count"]}>
                            {details?.total_quantity}
                          </h4>
                          <h6>(SOLD OUT)</h6>
                        </>
                      )}
                    </div>
                  </div> */}

                  {eventInfo?.status !== LOOT_STATUS?.DROP_ENDED && (
                    <>
                      {/* <div className={`${style["items"]} ${style["seven"]}`}>
                        <div className={`${style["box-block"]}`}>
                          <h6>
                            {eventInfo?.status === LOOT_STATUS?.YTS
                              ? "CLAIM STARTS ON"
                              : "CLAIM STARTED ON"}
                          </h6>
                          <h4>
                            <>
                              {dayjs(details?.loot_start_time).format(
                                "MMM D, YYYY - hh:mm A  IST"
                              )}
                            </>
                            <br />
                          </h4>
                        </div>
                      </div> */}

                      {/* <div className={`${style["items"]} ${style["eight"]}`}>
                        <div className={`${style["box-block"]}`}>
                          <h6>
                            {eventInfo?.status === LOOT_STATUS?.YTS ||
                            eventInfo?.status === LOOT_STATUS?.DROP
                              ? "CLAIM ENDS ON"
                              : "CLAIM ENDED ON"}
                          </h6>
                          <h4>
                            {dayjs(details?.loot_end_time).format(
                              "MMM D, YYYY - hh:mm A  IST"
                            )}

                            <br />
                          </h4>
                        </div>
                      </div> */}
                    </>
                  )}
                  {/* {eventInfo?.status === LOOT_STATUS?.DROP_ENDED && (
                    <div className={`${style["items"]} ${style["nine"]}`}>
                      <div className={`${style["box-block"]}`}>
                        <h6>CLAIM ENDED ON</h6>
                        <h4>
                          {dayjs(details?.loot_end_time).format(
                            "MMM D, YYYY - hh:mm A  IST"
                          )}

                          <br />
                        </h4>
                      </div>
                    </div>
                  )} */}
                </div>

                <PackSection />
              </div>
            </div>
            <div className="row" ref={lootStatusRef}>
              <div className="col-12 text-center mt-5">
                {eventInfo?.buttonTitle && (
                  <button
                    className={style["theme-btn"]}
                    onClick={() => handlePreBook(1)}
                    disabled={
                      availQty === 0 ||
                      eventInfo?.buttonDisabled ||
                      details?.purchased_qty === 1
                    }
                  >
                    {eventInfo?.buttonTitle}
                  </button>
                )}
              </div>
              {details?.purchased_qty === 1 &&
                eventInfo?.status === LOOT_STATUS.DROP && (
                  <>
                    <h6 className="playpass-hint">
                      <BsFillInfoCircleFill /> Pass already claimed
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
              {modalType === MODAL_TYPES.CLAIM && (
                <>
                  <Prebook
                    show={modalType === MODAL_TYPES.CLAIM}
                    toggleModal={toggleModal}
                    modalState={modalState}
                    onReload={buySuccess}
                    slug={process.env.NEXT_PUBLIC_MCL_SEASON_PASS_SLUG}
                    quantityPerOrder={nftQuantityValue}
                    isPurchasedFree={true}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MclSeasonPass;
