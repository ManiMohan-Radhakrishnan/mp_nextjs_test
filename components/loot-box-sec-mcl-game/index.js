import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Image from "next/image";

import { isUserLoggedIn } from "../../redux/reducers/user_reducer";
import { MODAL_TYPES, LOOT_STATUS } from "./common";
import LoginWithPassword from "../loot-box-section/login-with-password";
import LoginWithOtp from "../loot-box-section/login-with-otp";
import VerifyOtp from "../loot-box-section/verify-otp";
import ForgotPassword from "../loot-box-section/forgot-password";
import Register from "../loot-box-section/register";
import Prebook from "./prebook";
import LoginWithGoogleOtp from "../loot-box-section/google-otp";
import FlipTimer from "../flip-timer";

import style from "./style.module.scss";
import { gameCodesAvailableQty } from "../../utils/actioncable-methods";

const dateFormat = (date = null, format = "YYYY-MM-DD HH:mm:ss") => {
  if (!date) return null;
  var input_date = new Date(date);
  return dayjs(input_date).format(format);
};

const LootBoxSection = ({ slug, details }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const lootStatusRef = useRef(null);
  const [modalType, setModalType] = useState("");
  const [modalState, setModalState] = useState({});
  const loginStatus = useSelector(isUserLoggedIn);
  const [availQty, setAvailQty] = useState(details?.available_qty || 0);
  const [eventInfo, setEventInfo] = useState({
    title: "DROP ENDS IN",
    status: LOOT_STATUS?.PRE_BOOK,
    endAt: dateFormat(details?.end_time),
    buttonTitle: "BUY NOW",
  });

  const initEventInfo = () => {
    const now = new Date().getTime(details?.current_time);
    let event_info = { ...eventInfo };
    if (now <= new Date(details?.start_time).getTime()) {
      event_info = {
        title: "DROP STARTS IN",
        status: LOOT_STATUS?.DROP_YTS,
        endAt: dateFormat(details?.start_time),
        buttonTitle: "BUY NOW",
        buttonDisabled: true,
      };
    } else if (parseInt(details?.available_qty) === 0) {
      event_info = {
        title: "DROP ENDED",
        status: LOOT_STATUS?.SOLD_OUT,
        buttonTitle: "SOLD OUT",
        buttonDisabled: true,
      };
    } else if (
      now > new Date(details?.start_time).getTime() &&
      now <= new Date(details?.end_time).getTime()
    ) {
      event_info = {
        title: "DROP ENDS IN",
        status: LOOT_STATUS?.DROP,
        endAt: dateFormat(details?.end_time),
        buttonTitle: "BUY NOW",
        buttonDisabled: !details?.available_qty,
      };
    } else if (now > new Date(details?.end_time).getTime()) {
      event_info = {
        title: "DROP ENDED",
        status: LOOT_STATUS?.SOLD_OUT,
        buttonTitle: "SOLD OUT",
        buttonDisabled: true,
      };
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
    initEventInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  useEffect(() => {
    if (!loginStatus && router.query.email && router.query.with) {
      toggleModal(MODAL_TYPES.LOGIN_WITH_OTP, { email });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.email]);

  useEffect(() => {
    gameCodesAvailableQty(slug, (data) => {
      setAvailQty(data?.available);
      if (parseInt(data?.available) === 0) {
        setEventInfo({
          ...eventInfo,
          status: LOOT_STATUS?.SOLD_OUT,
          buttonTitle: "SOLD OUT",
          buttonDisabled: true,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={style["loot-timer-section"]}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className={style["loot-timer-block"]}>
                <h4>{eventInfo?.title}</h4>
                <FlipTimer
                  endTime={eventInfo?.endAt}
                  handleEndEvent={initEventInfo}
                />
                {/* <JoinWaitList /> */}
                {/* <div title="Add to Calendar" className="addeventatc">
                  Add to my calendar
                  <span className="start">11/23/2022 08:00 AM</span>
                  <span className="end">11/23/2022 10:00 AM</span>
                  <span className="timezone">America/Los_Angeles</span>
                  <span className="title">Summary of the event</span>
                  <span className="description">Description of the event</span>
                  <span className="location">Location of the event</span>
                </div> */}
                {/* <div className={style["prebook-sec"]}>
                  {eventInfo.status === LOOT_STATUS.PRE_BOOK && (
                    <p>PRE-BOOK NOW</p>
                  )}
                  <Image unoptimized={true}
                    height={50}
                    width={50}
                    src={DownArrow}
                    className={style["prebook-sec-icon"]}
                    alt="down-arrow"
                    onClick={() =>
                      lootStatusRef?.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      })
                    }
                  />
                </div> */}
              </div>
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
                      MCL RUSH{" "}
                      <span className={style["theme-text"]}>
                        SUPER LOOT BOX
                      </span>
                    </h2>
                    <p>
                      Introducing Game Activation Codes, a new cricket game
                      format under the MCL banner that focuses on Real-Time
                      Strategy and Player skill.
                    </p>
                    <p>
                      The Super Loot box contains player NFTs that grant you
                      access to the exciting world of MCL Rush and its
                      magnificence. Each box contains 1 Batsman NFT and 1 Bowler
                      NFT. Pre-book your Super Loot box today for just $1 to get
                      started!
                    </p>
                  </div>
                  <div className={`${style["items"]} ${style["two"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Every Super Loot Box Contains</h6>
                      <h4>1 Activation Code</h4>
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["three"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Tournament Entry Fee</h6>
                      <h4 className={style["pack-price"]}>
                        {details?.buy_amount
                          ? "$" + parseInt(details?.buy_amount)
                          : "TBA"}{" "}
                      </h4>
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["four"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Number of Items</h6>
                      <h4 className={style["pack-count"]}>
                        {details?.total_quantity
                          ? `${availQty}/${details?.total_quantity}`
                          : "TBA"}
                      </h4>
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["five"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Drop Starting From</h6>
                      <h4>{dayjs(details?.start_time).format("DD-MM-YYYY")}</h4>
                      <h6>
                        {" "}
                        <small>Onwards</small>
                      </h6>
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["six"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>Drop Ends In</h6>
                      <h4>{dayjs(details?.end_time).format("DD-MM-YYYY")}</h4>
                      {/* <h6>
                        {" "}
                        <small>Onwards</small>
                      </h6> */}
                    </div>
                  </div>
                  {/* <div className={`${style["items"]} ${style["six"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>No. of Items</h6>
                      <h4>{details?.total_quantity}&nbsp;Super Loot Boxes</h4>
                    </div>
                  </div> */}
                </div>

                <div className={style["pack-section"]}>
                  {/* <Image unoptimized={true}
                    className={style["pack-image"]}
                    src={LootImage}
                    height={800}
                    width={800}
                  ></Image> */}
                  {/* <video
                    className={style["pack-image"]}
                    loop
                    muted
                    autoPlay
                    src={images.loot_sample_video}
                    poster={LootImage}
                    type="video/mp4"
                  ></video> */}
                  <Image
                    unoptimized={true}
                    height={400}
                    width={400}
                    alt="LootBox"
                    src={
                      "https://cdn.guardianlink.io/product-hotspot/images/MarathonLeague.png"
                    }
                  />
                  <h6>How many Super Loot boxes can I purchase?</h6>
                  <h4>
                    Every user can purchase only <br />
                    ONE Super Loot Box each.
                  </h4>
                </div>
              </div>
            </div>
            <div className="row" ref={lootStatusRef}>
              <div className="col-12 text-center mt-5">
                {eventInfo?.buttonTitle && (
                  <button
                    className={style["theme-btn"]}
                    onClick={handlePreBook}
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
          <Prebook
            show={modalType === MODAL_TYPES.PREBOOK}
            toggleModal={toggleModal}
            modalState={modalState}
          />
        )}
      </section>
    </>
  );
};

export default LootBoxSection;
