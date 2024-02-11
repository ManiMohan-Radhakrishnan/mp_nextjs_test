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
import Prebook from "../loot-box-section/prebook-with-buy-options";
import LootBoxSection from "../mcl-game-code-components";
import Images from "../../utils/images.json";

const PackSection = () => {
  const { width: innerWidth } = useWindowUtils();
  const androidAPK = useSelector(getAndroidAPK);
  // const windowsEXE = useSelector(getWindowsEXE);

  return (
    <div className={style["pack-section"]}>
      <Image
        unoptimized={true}
        height={400}
        width={400}
        alt="Pack"
        src={
          innerWidth > 767
            ? Images.mcl_free_mega_pass
            : Images.mcl_free_mega_pass
        }
        className={style["pack-image"]}
      />
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

const MegaPlayPass = ({ slug, details, buySuccess = () => {} }) => {
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
                        MCL MEGA PLAY TOURNAMENT
                      </span>
                    </h2>
                    <p>
                      Secure your entry to the MEGA PLAY TOURNAMENT, compete for
                      a chance to win a share of the prize pool worth $25,000
                      Aptos tokens, and emerge victorious.
                    </p>
                  </div>
                  <div className={`${style["items"]} ${style["onesub"]}`}>
                    <h3>HOW IT WORKS?</h3>
                    <ul>
                      <li>
                        Only the 25,000 Pass Holders can join the tournament.
                      </li>
                      <li>The tournament lasts for one hour.</li>
                      <li>Each Pass Holder can play a maximum of 6 matches.</li>
                      <li>Each match goes on for 3 overs.</li>
                      <li>
                        Only the 4 best-scoring matches count for the
                        leaderboard.
                      </li>
                      <li>
                        There&apos;s a $25,000 worth of Aptos token prize pool,
                        and everyone who participates is a winner, meaning they
                        all get prizes.
                      </li>
                    </ul>
                  </div>
                  <div className={`${style["items"]} ${style["desc"]}`}>
                    <h3>HOW TO GET MY FREE PASS?</h3>
                    <ul>
                      <li>
                        If you&apos;re a newcomer, you can create your
                        Jump.trade account by clicking sign up at the top of the
                        page.
                      </li>
                      <li>Claim your free pass by clicking on claim now</li>{" "}
                      <li>
                        Once claimed your pass will be added to your gaming
                        account.
                      </li>
                    </ul>
                    <p>
                      <b>Note:</b> NFTs must be either owned or rented in order
                      to participate in the tournament.
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
                      <h4>MCL MEGA PLAY PASS PRICE</h4>
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
                  <div className={`${style["items"]} ${style["five"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>TOTAL SUPPLY</h6>
                      <h4 className={style["pack-count"]}>
                        {details?.total_quantity}
                      </h4>
                      {/* <h4>TBA</h4> */}
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["six"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>AVAILABLE SUPPLY</h6>
                      {/* <h4 className={style["pack-count"]}>TBA</h4> */}

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

                      {/* {eventInfo.status === LOOT_STATUS.SOLD_OUT ||
                        (availQty === 0 && (
                          <>
                            <h4 className={style["pack-count"]}>
                              {details?.total_quantity}
                            </h4>
                            <h6>(SOLD OUT)</h6>
                          </>
                        ))} */}
                    </div>
                  </div>
                  {eventInfo?.status !== LOOT_STATUS?.DROP_ENDED && (
                    <>
                      <div className={`${style["items"]} ${style["seven"]}`}>
                        <div className={`${style["box-block"]}`}>
                          <h6>
                            {eventInfo?.status === LOOT_STATUS?.YTS
                              ? "CLAIM STARTS ON"
                              : "CLAIM STARTED ON"}
                          </h6>
                          <h4>
                            {/* {eventInfo?.status === LOOT_STATUS?.DROP ||
                            eventInfo?.status === LOOT_STATUS?.YTS ? (
                              <>
                                {dayjs(details?.loot_start_time).format(
                                  "MMM D, YYYY - hh:mm A  IST"
                                )}
                              </>
                            ) : ( */}
                            <>
                              {dayjs(details?.loot_start_time).format(
                                "MMM D, YYYY - hh:mm A  IST"
                              )}
                            </>
                            {/* )} */}
                            <br />
                          </h4>
                        </div>
                      </div>

                      {/* <div className={`${style["items"]} ${style["eight"]}`}>
                        <div className={`${style["box-block"]}`}>
                          <h6>
                            {eventInfo?.status === LOOT_STATUS?.YTS &&
                              "CLAIM ENDS ON"}
                            {eventInfo?.status === LOOT_STATUS?.DROP ||
                              eventInfo?.status === LOOT_STATUS?.SOLD_OUT &&
                              "CLAIM ENDED ON"}
                          </h6>
                          <h4>
                            {eventInfo?.status === LOOT_STATUS?.DROP ||
                            eventInfo?.status === LOOT_STATUS?.YTS ? (
                              <>
                                {dayjs(details?.loot_end_time).format(
                                  "MMM D, YYYY - hh:mm A  IST"
                                )}
                              </>
                            ) : (
                              <>
                                {dayjs(details?.loot_end_time).format(
                                  "MMM D, YYYY - hh:mm A  IST"
                                )}
                              </>
                            )}
                            <br />
                          </h4>
                        </div>
                      </div> */}

                      <div className={`${style["items"]} ${style["eight"]}`}>
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
                      </div>
                    </>
                  )}
                  {eventInfo?.status === LOOT_STATUS?.DROP_ENDED && (
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
                  )}
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
                    slug={process.env.NEXT_PUBLIC_DROP_MCL_MEGA_GAME_CODE_SLUG}
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

export default MegaPlayPass;
