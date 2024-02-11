import { useState, useEffect, useRef, useCallback } from "react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import FlipTimer from "../flip-timer";

import {
  setBallNFTLive,
  setMclPlayPassDropLive,
} from "../../redux/reducers/user_reducer";
import { dateFormat, getOS } from "../../utils/common";
import { lootAvailableQty } from "../../utils/actioncable-methods";
import useWindowSize from "../../hooks/useWindowSize";
import { LOOT_STATUS } from "../mcl-game-code-components/common";
import { EVENT_NAMES, invokeTrackEvent } from "../../utils/track-events";

import images from "../../utils/images-new.json";
import HeroContentBg from "../../images/hero-content-bg.svg";
import RaddxMob from "../../images/drop/car-nft-images/final-mob-raddx.jpg";
import RaddxTab from "../../images/drop/car-nft-images/fianal-tab-image.jpg";
import RaddxAppImage from "../../images/raddx-apple-store.png";
import RaddxPlayImage from "../../images/raddx-play-store.png";
import BallMobileImage from "../../images/ball-nft/mob-banner.jpg";
import BallWebImage from "../../images/ball-nft/web-banner.jpg";
import ThecallitPosterImage from "../../images/callit/Thecallit_PosterImage.png";
import MegaPassPosterImage from "../../images/mcl-mega-pass/mega-pass-rewards.png";
import airdrop from "../../images/callit/airdrop.png";
import CarImages from "../../utils/images.json";

import style from "./style.module.scss";
import "swiper/css/pagination";

const HeroBanner = ({
  playPassRef,
  tournamentRef,
  ballNftDetails,
  megaPassDetails,
}) => {
  const { user } = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const router = useRouter();
  const fsz = router.query.fsz;
  const swiperRef = useRef();
  const [loadingVideoFirst, setLoadingVideoFirst] = useState(false);
  const [bannerImage, setBannerImage] = useState({
    src: CarImages.car_raddx_web,
    height: 1920,
    width: 1080,
  });

  const [ballDetailsInfo, setBallDetailsInfo] = useState({});
  // const [megaPassDetailsInfo, setMegaPassDetailsInfo] = useState({});

  const [endTime, setEndTime] = useState("2024-02-07T12:59:00.000Z");

  const [timerCompleted, setTimerCompleted] = useState(false);
  const [visibleTime, setVisibleTime] = useState(false);

  // const MegaDetailsEventInfo = (showToast = false) => {
  //   const now = new Date().getTime(megaPassDetails?.current_time);
  //   let event_info = {
  //     title: "CLAIM STARTS IN",
  //     status: LOOT_STATUS?.YTS,
  //     endAt: dateFormat(megaPassDetails?.loot_start_time),
  //     buttonTitle:
  //       parseFloat(megaPassDetails?.buy_amount) < 1 &&
  //       !megaPassDetails?.purchased_qty === 1
  //         ? "FREE CLAIM"
  //         : parseFloat(megaPassDetails?.buy_amount) < 1 &&
  //           megaPassDetails?.purchased_qty === 1
  //         ? "CLAIMED"
  //         : "CLAIM NOW",
  //     buttonDisabled: true,
  //   };

  //   if (now < new Date(megaPassDetails?.loot_start_time).getTime()) {
  //     dispatch(setMclPlayPassDropLive("DROP STARTS IN"));
  //     event_info = {
  //       title: "CLAIM STARTS IN",
  //       status: LOOT_STATUS?.YTS,
  //       endAt: dateFormat(megaPassDetails?.loot_start_time),
  //       buttonTitle:
  //         parseFloat(megaPassDetails?.buy_amount) < 1 &&
  //         !megaPassDetails?.purchased_qty === 1
  //           ? "FREE CLAIM"
  //           : parseFloat(megaPassDetails?.buy_amount) < 1 &&
  //             megaPassDetails?.purchased_qty === 1
  //           ? "CLAIMED"
  //           : "CLAIM NOW",
  //       buttonDisabled: true,
  //     };
  //   } else if (
  //     parseInt(megaPassDetails?.available_qty) === 0 &&
  //     now <= new Date(megaPassDetails?.loot_end_time).getTime()
  //   ) {
  //     // statusChangeMessage = "MCL Play Passes are sold out!";
  //     event_info = {
  //       title: "CLAIM ENDED",
  //       status: LOOT_STATUS?.SOLD_OUT,
  //       buttonTitle: "SOLD OUT",
  //       buttonDisabled: true,
  //     };
  //   } else if (
  //     now >= new Date(megaPassDetails?.loot_start_time).getTime() &&
  //     now < new Date(megaPassDetails?.loot_end_time).getTime()
  //   ) {
  //     dispatch(setMclPlayPassDropLive(LOOT_STATUS?.DROP));

  //     event_info = {
  //       title: "CLAIM ENDS IN",
  //       status: LOOT_STATUS?.DROP,
  //       endAt: dateFormat(megaPassDetails?.loot_end_time),
  //       buttonTitle:
  //         parseFloat(megaPassDetails?.buy_amount) < 1 &&
  //         !megaPassDetails?.purchased_qty === 1
  //           ? "FREE CLAIM"
  //           : parseFloat(megaPassDetails?.buy_amount) < 1 &&
  //             megaPassDetails?.purchased_qty === 1
  //           ? "CLAIMED"
  //           : "CLAIM NOW",
  //       buttonDisabled:
  //         !megaPassDetails?.available_qty ||
  //         megaPassDetails?.purchased_qty === 1,
  //     };
  //   } else if (parseInt(megaPassDetails?.available_qty) === 0) {
  //     event_info = {
  //       title: "SOLD OUT",
  //       status: LOOT_STATUS?.SOLD_OUT,
  //       buttonTitle: "SOLD OUT",
  //       buttonDisabled: true,
  //     };
  //   } else if (now >= new Date(megaPassDetails?.loot_end_time).getTime()) {
  //     dispatch(setMclPlayPassDropLive(LOOT_STATUS?.SOLD_OUT));
  //     // statusChangeMessage = "Claim Ended!";
  //     event_info = {
  //       title: "CLAIM ENDED",
  //       status: LOOT_STATUS?.DROP_ENDED,
  //       buttonTitle: "CLAIM ENDED",
  //       buttonDisabled: true,
  //     };
  //   }
  //   setMegaPassDetailsInfo(event_info);
  // };

  const BallDetailsEventInfo = (showToast = false) => {
    const now = new Date().getTime();
    let event_info = { ...ballDetailsInfo };
    if (parseInt(ballNftDetails?.available_qty) === 0) {
      dispatch(setBallNFTLive(LOOT_STATUS?.SOLD_OUT));
      event_info = {
        title: "DROP SOLD OUT",
        status: LOOT_STATUS?.SOLD_OUT,
        buttonTitle: "EXPLORE",
        buttonDisabled: false,
      };
    } else if (now < new Date(ballNftDetails?.preorder_start_time).getTime()) {
      dispatch(setBallNFTLive(LOOT_STATUS?.YTS));
      event_info = {
        title: "PRE-BOOK STARTS IN",
        status: LOOT_STATUS?.YTS,
        endAt: dateFormat(ballNftDetails?.preorder_start_time),
        buttonTitle: "EXPLORE",
        buttonDisabled: false,
      };
    } else if (
      now >= new Date(ballNftDetails?.preorder_start_time).getTime() &&
      now <= new Date(ballNftDetails?.preorder_end_time).getTime()
    ) {
      dispatch(setBallNFTLive(LOOT_STATUS?.PRE_BOOK));
      event_info = {
        title: "PRE-BOOK ENDS IN",
        status: LOOT_STATUS?.PRE_BOOK,
        endAt: dateFormat(ballNftDetails?.preorder_end_time),
        buttonTitle: "PRE-BOOK NOW",
        buttonDisabled: false,
      };
    } else if (
      ballNftDetails?.auction_start_time === null ||
      ballNftDetails?.auction_end_time === null
    ) {
      // statusChangeMessage = "Pre-book ended";
      dispatch(setBallNFTLive(LOOT_STATUS?.DROP_YTA));
      event_info = {
        title: "DROP COMING SOON",
        status: LOOT_STATUS?.DROP_YTA,
        buttonTitle: "EXPLORE",
        buttonDisabled: false,
      };
    } else if (
      now > new Date(ballNftDetails?.preorder_end_time).getTime() &&
      now <= new Date(ballNftDetails?.auction_start_time).getTime()
    ) {
      dispatch(setBallNFTLive(LOOT_STATUS?.DROP_YTS));
      event_info = {
        title: "DROP STARTS IN",
        status: LOOT_STATUS?.DROP_YTS,
        endAt: dateFormat(ballNftDetails?.auction_start_time),
        buttonTitle: "EXPLORE",
        buttonDisabled: false,
      };
    } else if (ballNftDetails?.flow_status === "assign") {
      dispatch(setBallNFTLive(LOOT_STATUS?.ASSIGNING_NFTS));
      let endAt =
        now <= new Date(ballNftDetails?.auction_start_time).getTime()
          ? ballNftDetails?.auction_start_time
          : ballNftDetails?.auction_end_time;
      let title =
        now <= new Date(ballNftDetails?.auction_start_time).getTime()
          ? "DROP STARTS IN"
          : "DROP ENDS IN";
      event_info = {
        title,
        endAt,
        status: LOOT_STATUS?.ASSIGNING_NFTS,
        buttonTitle: "EXPLORE",
        buttonDisabled: false,
      };
    } else if (
      now > new Date(ballNftDetails?.auction_start_time).getTime() &&
      now <= new Date(ballNftDetails?.auction_end_time).getTime() &&
      (ballNftDetails?.flow_status === "buy" ||
        ballNftDetails?.flow_status === "book")
    ) {
      dispatch(setBallNFTLive(LOOT_STATUS?.DROP));
      event_info = {
        title: "DROP ENDS IN",
        status: LOOT_STATUS?.DROP,
        endAt: dateFormat(ballNftDetails?.auction_end_time),
        buttonTitle: "BUY NOW",
        buttonDisabled: false,
      };
    } else if (now > new Date(ballNftDetails?.auction_end_time).getTime()) {
      dispatch(setBallNFTLive(LOOT_STATUS?.DROP_ENDED));
      event_info = {
        title: "DROP ENDED",
        status: LOOT_STATUS?.DROP_ENDED,
        buttonTitle: "EXPLORE",
        buttonDisabled: false,
      };
    }

    setBallDetailsInfo(event_info);
  };

  useEffect(() => {
    let intervalId;
    const endTimeDate = new Date(endTime);
    const currentTime = new Date();

    if (currentTime >= endTimeDate) {
      setTimerCompleted(true);
    } else {
      // Set up an interval to check if the endTime is reached
      const intervalId = setInterval(() => {
        const currentTime = new Date();
        if (currentTime >= endTimeDate) {
          clearInterval(intervalId);
          setTimerCompleted(true);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [endTime]);

  // useEffect(() => {
  //   // BallDetailsEventInfo();
  //   MegaDetailsEventInfo();
  // }, [ballNftDetails, megaPassDetails]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setVisibleTime(true);
    }
  }, []);

  useEffect(() => {
    if (ballNftDetails?.slug) {
      BallDetailsEventInfo();
      lootAvailableQty(ballNftDetails?.slug, (data) => {
        const now = new Date(ballNftDetails?.current_time).getTime();

        if (parseInt(data?.available) === 0) {
          dispatch(setBallNFTLive(LOOT_STATUS?.SOLD_OUT));
          setBallDetailsInfo({
            title: "DROP ENDED",
            status: LOOT_STATUS?.SOLD_OUT,
            buttonTitle: "EXPLORE",
            buttonDisabled: false,
          });
        } else {
          if (
            data?.flow_status === "buy" &&
            ballDetailsInfo?.status !== LOOT_STATUS?.DROP
          ) {
            let endAt =
              now <= new Date(ballNftDetails?.auction_start_time).getTime()
                ? ballNftDetails?.auction_start_time
                : ballNftDetails?.auction_end_time;
            let title =
              now <= new Date(ballNftDetails?.auction_start_time).getTime()
                ? "DROP STARTS IN"
                : "DROP ENDS IN";
            let status =
              now <= new Date(ballNftDetails?.auction_start_time).getTime()
                ? LOOT_STATUS?.DROP_YTS
                : LOOT_STATUS?.DROP;
            dispatch(setBallNFTLive(LOOT_STATUS?.DROP));
            setBallDetailsInfo({
              title,
              status,
              endAt,
              buttonTitle: "BUY NOW",
              buttonDisabled:
                ballDetailsInfo?.status === LOOT_STATUS?.DROP_YTS ||
                !ballNftDetails?.available_qty,
            });
          }
          if (
            data?.flow_status === "assign" &&
            ballDetailsInfo?.status !== LOOT_STATUS?.ASSIGNING_NFTS
          ) {
            let endAt =
              now <= new Date(ballNftDetails?.auction_start_time).getTime()
                ? ballNftDetails?.auction_start_time
                : ballNftDetails?.auction_end_time;
            let title =
              now <= new Date(ballNftDetails?.auction_start_time).getTime()
                ? "DROP STARTS IN"
                : "DROP ENDS IN";
            dispatch(setBallNFTLive(LOOT_STATUS?.ASSIGNING_NFTS));
            setBallDetailsInfo({
              title,
              endAt,
              status: LOOT_STATUS?.ASSIGNING_NFTS,
              buttonTitle: "EXPLORE",
              buttonDisabled: false,
            });
          }
        }
      });
    }
    // if (megaPassDetails?.slug) {
    //   MegaDetailsEventInfo();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ballNftDetails]);

  useEffect(() => {
    setBannerImage((imgSrc) => {
      if (width < 768) {
        return { src: RaddxMob, width: 767, height: 450 };
      }
      if (width < 1031) {
        return { src: RaddxTab, width: 1030, height: 520 };
      }
      return bannerImage;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const scrollIntournaments = (e) => {
    e.preventDefault();
    tournamentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollIntoPlayPassTournaments = (e) => {
    e.preventDefault();
    playPassRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const titleStatus = [LOOT_STATUS?.DROP_ENDED, LOOT_STATUS?.SOLD_OUT];

  return (
    <>
      <section className={style["jt-hero-section"]}>
        <Swiper
          ref={swiperRef}
          className={`${style["hero-carousel"]}`}
          slidesPerView={1}
          centeredSlides={true}
          modules={[Navigation, Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 15000, disableOnInteraction: true }}
          speed={500}
          // loop
          uniqueNavElements
        >
          {/* <SwiperSlide>
            <div className="item">
              <section
                className={`${style["hero-banner-sec"]} ${style["two-column"]}`}
              >
                <div className={`${style["hero-content-block"]}`}>
                  <div className={style["hero-content-box"]}>
                    <Image
                      unoptimized={true}
                      height="100"
                      width="100"
                      src={HeroContentBg}
                      className={style["hero-contet-box-bg"]}
                      alt="circle_image"
                      priority={true}
                    />
                    <h2>INTRODUCING MCL BALL NFT</h2>
                    <h5 className={style["hero-desc_h5"]}>
                      Packing a spin of wizardry, a seam of capabilities, and a
                      pace of power, these Ball NFTs have what it takes to
                      bewilder batsmen with a jaffa and swing the game either
                      way!
                    </h5>
                    <div className="banner-timer-section">
                      <h5 className="banner-timer-title">
                        {ballDetailsInfo?.title}
                      </h5>
                      {ballDetailsInfo?.status !== LOOT_STATUS.SOLD_OUT &&
                        ballDetailsInfo?.endAt && (
                          <FlipTimer
                            classNames={"bat-timer"}
                            endTime={ballDetailsInfo?.endAt}
                            handleEndEvent={() => {
                              setTimeout(
                                () => BallDetailsEventInfo(true),
                                1000
                              );
                            }}
                          />
                        )}
                    </div>

                    <div className={style["hero-btn-block"]}>
                      {ballDetailsInfo?.buttonTitle && (
                        <button
                          className={`${style["theme-btn"]} ${style["explore-btn"]} `}
                          disabled={ballDetailsInfo?.buttonDisabled}
                          onClick={() =>
                            window.open(
                              process.env.NEXT_PUBLIC_BALL_NFT_URL,
                              "_blank"
                            )
                          }
                        >
                          <span>{ballDetailsInfo?.buttonTitle}</span>
                        </button>
                      )}
                      {ballDetailsInfo?.status !== LOOT_STATUS.SOLD_OUT &&
                        ballDetailsInfo?.status !== LOOT_STATUS.DROP_ENDED && (
                          <>
                            <button
                              className={`${style["theme-btn"]} ${style["rounded-bordered"]} `}
                              to="#"
                              onClick={() => {
                                user
                                  ? window.open(
                                      `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/wallet#web`,
                                      "_self"
                                    )
                                  : window.open(
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
                  </div>
                  <div className={style["pp-hero-contet-img"]}>
                    <Image
                      unoptimized={true}
                      height="1280"
                      width="720"
                      src={width < 768 ? BallMobileImage : BallWebImage}
                      alt="circle_image"
                      priority={true}
                    />
                  </div>
                </div>
              </section>
            </div>
          </SwiperSlide> */}
          <SwiperSlide>
            <div className="item">
              <section
                className={`${style["hero-banner-sec"]} ${style["two-column"]} ${style["rentalMCL-bgImage-banner"]} `}
              >
                <div className={`${style["hero-content-block"]}`}>
                  <div className={style["hero-content-box"]}>
                    <h2>
                      <span className={style["sub-heading"]}>BORROW PLAY</span>{" "}
                      AND WIN!!
                    </h2>
                    <h5
                    // className={`${style["sub-heading"]} ${style["theme-text-clr"]}`}
                    >
                      Introducing the MCL Rental Pass, Borrow the NFTs, Play
                      using the NFTs and Emerge Victorious on the field!! <br />{" "}
                      <br />
                    </h5>
                  </div>
                  <div className={`${style["hero-img-box"]} d-none`}>
                    <Image
                      layout="responsive"
                      height="866"
                      width="1039"
                      src={images?.rental_pass}
                      // className={style["hero-contet-box-bg"]}
                      alt="circle_image"
                      priority={true}
                      unoptimized={true}
                    />
                  </div>
                </div>
              </section>
            </div>
          </SwiperSlide>
          {/* {!timerCompleted && ( */}
          <SwiperSlide>
            <div className="item">
              <section
                className={`${style["hero-banner-sec"]} ${style["two-column"]} ${style["callitairdrop-bgImage-banner"]} `}
              >
                <div className={`${style["hero-content-block"]}`}>
                  <div className={style["hero-content-box"]}>
                    <h2>
                      CONNECT, COMPLETE, AND CLAIM{" "}
                      <span className={style["sub-heading"]}>
                        $10,000 Worth of APTOS Tokens
                      </span>
                    </h2>
                    <h5
                    // className={`${style["sub-heading"]} ${style["theme-text-clr"]}`}
                    >
                      Turn your social media engagements into $10,000 worth of
                      APTOS token credits by completing easy tasks!
                      <br /> <br />
                    </h5>

                    {!timerCompleted ? (
                      <h4>
                        {" "}
                        <span className={style["sub-heading"]}>
                          AIRDROP EVENT ENDS IN
                        </span>
                      </h4>
                    ) : (
                      <>
                        <h4>
                          {" "}
                          <span className={style["sub-heading"]}>
                            AIRDROP EVENT HAS ENDED
                          </span>
                        </h4>
                      </>
                    )}

                    <div>
                      {timerCompleted ? (
                        <></>
                      ) : (
                        <FlipTimer classNames={"bat-timer"} endTime={endTime} />
                      )}
                    </div>

                    {!timerCompleted ? (
                      <div className={style["hero-btn-block"]}>
                        <button
                          className={`${style["theme-btn"]} ${style["explore-btn"]} `}
                          onClick={() => {
                            window.open(
                              process.env.NEXT_PUBLIC_GIVEWAY_URL,
                              "_self"
                            );
                          }}
                        >
                          <span>Participate Now!</span>
                        </button>
                      </div>
                    ) : (
                      <>
                        {" "}
                        <div className={style["hero-btn-block"]}>
                          <button
                            className={`${style["theme-btn"]} ${style["explore-btn"]} `}
                            onClick={() => {
                              window.open(
                                process.env.NEXT_PUBLIC_GIVEWAY_URL,
                                "_self"
                              );
                            }}
                            // disabled={true}
                          >
                            <span>Participate Now!</span>
                          </button>
                        </div>
                        <h4 className={style["sub-heading"]}>
                          Tokens Claim for the airdrop will start soon
                        </h4>
                      </>
                    )}
                  </div>
                  <div className={style["hero-img-box"]}>
                    <Image
                      layout="responsive"
                      height="866"
                      width="1039"
                      src={airdrop}
                      // className={style["hero-contet-box-bg"]}
                      alt="circle_image"
                      priority={true}
                      unoptimized={true}
                    />
                  </div>
                </div>
              </section>
            </div>
          </SwiperSlide>
          {/* // )} */}

          {/* Asia Largest Banner */}
          <SwiperSlide>
            <div className="item">
              <section className={style["hero-banner-sec"]}>
                {width && (
                  <>
                    {getOS() === "iOS" ? (
                      <Image
                        unoptimized={true}
                        height="512"
                        width="1024"
                        alt="Poster"
                        id="full-screenVideo"
                        className={`${style["image-fixed"]}`}
                        src={images.hero_poster}
                      />
                    ) : (
                      <video
                        id="full-screenVideo"
                        loop
                        muted
                        autoPlay
                        playsInline
                        onLoadedData={() => setLoadingVideoFirst(false)}
                        poster={images.hero_poster}
                        controlsList="nodownload"
                        className={`${style["video-fixed"]}`}
                        src={
                          loadingVideoFirst
                            ? images.hero_poster
                            : images.nft_banner
                        }
                        type="video/mp4"
                      ></video>
                    )}
                  </>
                )}
                <div className={style["hero-content-block"]}>
                  <div className={style["hero-content-box"]}>
                    <Image
                      unoptimized={true}
                      height="100"
                      width="100"
                      src={HeroContentBg}
                      className={style["hero-contet-box-bg"]}
                      alt="circle_image"
                      priority={true}
                    />
                    <span className={style["hero-main-heading"]}>
                      ASIA&apos;S LARGEST <br /> NFT MARKETPLACE
                    </span>
                    <p className={style["hero-desc"]}>
                      Jump.trade - Your Destination For A Wide Range Of
                      Astonishing Game &amp; Brand NFTs. Explore our NFT
                      marketplace now!
                    </p>
                    <ul className={style["hero-data-count-list"]}>
                      <li className={style["hero-data-count-item"]}>
                        <span className={style["hero-data-count-value"]}>
                          242K+
                        </span>
                        <span className={style["hero-data-count-title"]}>
                          NFTs
                        </span>
                      </li>
                      <li className={style["hero-data-count-item"]}>
                        <span className={style["hero-data-count-value"]}>
                          265K+
                        </span>
                        <span className={style["hero-data-count-title"]}>
                          Trades
                        </span>
                      </li>

                      <li className={style["hero-data-count-item"]}>
                        <span className={style["hero-data-count-value"]}>
                          4.3M+
                        </span>
                        <span className={style["hero-data-count-title"]}>
                          Matches
                        </span>
                      </li>
                    </ul>

                    <div className={style["hero-btn-block"]}>
                      <button
                        className={`${style["theme-btn"]} ${style["explore-btn"]} ${style["mr-1"]} ${style["pre-btn"]}`}
                        onClick={() => {
                          router.push("/nft-marketplace");
                          invokeTrackEvent(EVENT_NAMES.EXPLORE_NOW_CLICKED, {
                            "Page Name": "Home Banner",
                            "Page URL": window.location.href,
                          });
                        }}
                      >
                        <span>Explore Market</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </SwiperSlide>
          {/* Asia Largest Banner */}

          {/* {megaPassDetailsInfo?.status !== LOOT_STATUS.SOLD_OUT &&
            megaPassDetailsInfo?.endAt && (
              <SwiperSlide>
                <div className="item">
                  <section
                    className={`${style["hero-banner-sec"]} ${style["two-column"]} ${style["mega-pass-bgImage-banner"]}`}
                  >
                    <div className={`${style["hero-content-block"]}`}>
                      <div className={style["hero-content-box"]}>
                        <h2>
                          COMPETE, CONQUER <br /> AND WIN
                          <span
                            className={`${style["sub-heading"]} ${style["theme-text-clr"]}`}
                          >
                            {" "}
                            $25,000
                            <span>IN APTOS (APT) TOKENS!</span>
                          </span>
                        </h2>
                        <h5
                        // className={`${style["sub-heading"]} ${style["theme-text-clr"]}`}
                        >
                          Hurry before the Airdrop event ends! Claim your
                          exclusive SKL token and get chances of big wins!
                          Don&apos;t miss out! <br /> <br />
                        </h5>

                        {!timerCompleted && (
                          <h4>
                            {" "}
                            <span className={style["sub-heading"]}>
                              AIRDROP EVENT ENDS IN
                            </span>
                          </h4>
                        )}

                        <div>
                          {timerCompleted ? (
                            <></>
                          ) : (
                            visibleTime && (
                              <FlipTimer
                                classNames={"bat-timer"}
                                endTime={endTime}
                                suppressHydrationWarning={true}
                              />
                            )
                          )}
                        </div>

                        <div className={style["hero-btn-block"]}>
                          <button
                            className={`${style["theme-btn"]} ${style["explore-btn"]} `}
                            onClick={scrollIntoPlayPassTournaments}
                          >
                            <span>Claim Now</span>
                          </button>
                        </div>
                      </div>
                      <div className={style["hero-img-box"]}>
                        <Image
                          unoptimized={true}
                          height="866"
                          width="1039"
                          src={airdrop}
                          // className={style["hero-contet-box-bg"]}
                          alt="circle_image"
                          priority={true}
                        />
                      </div>
                    </div>
                  </section>
                </div>
              </SwiperSlide>
            )} */}
          <SwiperSlide>
            <div className="item">
              <section
                className={`${style["hero-banner-sec"]} ${style["callit-video-banner-sec"]}`}
              >
                {width && (
                  <>
                    {getOS() === "iOS" ? (
                      // <Image
                      //   layout="responsive"
                      //   height="512"
                      //   width="1024"
                      //   alt="Poster"
                      //   id="full-screenVideo"
                      //   className={`${style["image-fixed"]}`}
                      //   src={ThecallitPosterImage.src}
                      // />
                      <video
                        id="full-screenVideo"
                        loop
                        muted
                        autoPlay
                        playsInline
                        onLoadedData={() => setLoadingVideoFirst(false)}
                        poster={ThecallitPosterImage.src}
                        controlsList="nodownload"
                        className={`${style["video-fixed"]}`}
                        // src={images?.callit_banner_video_one}
                        src={`${
                          width < 767
                            ? images?.callit_banner_video_mobile
                            : images?.callit_banner_video_one
                        }`}
                        type="video/mp4"
                      ></video>
                    ) : (
                      <video
                        id="full-screenVideo"
                        loop
                        muted
                        autoPlay
                        playsInline
                        onLoadedData={() => setLoadingVideoFirst(false)}
                        poster={ThecallitPosterImage.src}
                        controlsList="nodownload"
                        className={`${style["video-fixed"]}`}
                        // src={images?.callit_banner_video_one}
                        src={`${
                          width < 767
                            ? images?.callit_banner_video_mobile
                            : images?.callit_banner_video_one
                        }`}
                        type="video/mp4"
                      ></video>
                    )}
                  </>
                )}
                <div className={style["hero-content-block"]}>
                  <div className={style["hero-content-box"]}>
                    <Image
                      layout="responsive"
                      height="100"
                      width="100"
                      src={HeroContentBg}
                      className={style["hero-contet-box-bg"]}
                      alt="circle_image"
                      priority={true}
                      unoptimized={true}
                    />
                    <span className={style["hero-main-heading"]}>
                      {/* <span className={style["theme-text-clr"]}>PLAY & WIN </span>{" "} */}
                      TRADE YOUR OPINIONS... WITH YOUR ANALYTICAL SKILLS
                    </span>
                    <p className={style["hero-desc"]}>
                      Utilize your analytical skills and trade your opinions as
                      NFTs on the exclusive &apos;TheCallit&apos; platform.
                    </p>

                    <div className={style["hero-btn-block"]}>
                      <button
                        className={`${style["theme-btn"]} ${style["explore-btn"]} ${style["mr-1"]} ${style["pre-btn"]}`}
                        onClick={() => {
                          window.open(
                            `${process.env.NEXT_PUBLIC_CALL_IT_URL}/events`
                          );
                        }}
                      >
                        <span>Participate</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </SwiperSlide>
          {/* <SwiperSlide>
          <div className="item">
            <section
              className={`${style["hero-banner-sec"]} ${style["two-column"]} ${style["callit-bgImage-banner"]}`}
            >
              <div className={`${style["hero-content-block"]}`}>
                <div className={style["hero-content-box"]}>
                  <Image unoptimized={true}
                    
                    height="100"
                    width="100"
                    src={HeroContentBg}
                    className={style["hero-contet-box-bg"]}
                    alt="circle_image"
                    priority={true}
                  />
                  <h2>
                    DROPPING BIG CHANCES OF WINNING BIG REWARDS{" "}
                    <span
                      className={`${style["sub-heading"]} ${style["theme-text-clr"]}`}
                    >
                      {" "}
                      FROM THE AIR!
                    </span>
                  </h2>

                  <h5 className={style["hero-desc_h5"]}>
                    Ready To Explore The World Of Opinion Trading With Your
                    Skills? Make Yourself More Eligible For Airdrop Token By
                    Completing Specific Tasks!
                  </h5>

                  <div className={style["hero-btn-block"]}>
                    <button
                      className={`${style["theme-btn"]} ${style["explore-btn"]} `}
                      onClick={() =>
                        window.open(
                          process.env.NEXT_PUBLIC_GIVEWAY_URL,
                          "_blank"
                        )
                      }
                    >
                      <span>Explore</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide> */}

          {/* Founder Pass*/}
          {/* <SwiperSlide>
          <div className="item">
            <section
              className={`${style["hero-banner-sec"]} ${style["two-column"]} ${style["raddx-banner"]}`}
              onClick={() => {
                router.push(
                  `/drop/mcl-founder-pass${fsz ? `?fsz=${fsz}` : ""}`
                );
                invokeTrackEvent(EVENT_NAMES.EXPLORE_NOW_CLICKED, {
                  "Page Name": "Home Banner",
                  "Page URL": window.location.href,
                });
              }}
            >
              <Image unoptimized={true}
                
                height="800"
                width="1920"
                src={`${
                  width < 767
                    ? images?.mcl_founder_mobile_banner
                    : images?.mcl_founder_desktop_banner
                }`}
                className={style["hero-contet-box-bg"]}
                alt="circle_image"
                priority={true}
              />
            </section>
          </div>
        </SwiperSlide> */}
          {/*Founder Pass */}
          {/* fusor banner */}
          {/* <SwiperSlide>
          <div className="item">
            <section
              className={`${style["hero-banner-sec"]} ${style["two-column"]} ${style["raddx-banner"]}`}
            >
              <div className="position-relative">
                <Image unoptimized={true}
                  
                  height="800"
                  width="1920"
                  src={`${
                    width < 767
                      ? images?.raddx_banner_image_mobile
                      : images?.raddx_banner_image_web
                  }`}
                  className={style["hero-contet-box-bg"]}
                  alt="circle_image"
                  priority={true}
                />
                <div className={`${style["download-section"]}`}>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.chennaigames.mrracer"
                    target="_blank"
                    rel="nofollow noopoener noreferrer"
                  >
                    <Image unoptimized={true}
                      
                      height="100"
                      width="100"
                      className={style["image_icon"]}
                      src={RaddxPlayImage}
                      alt="PlayStore"
                      priority={true}
                    />
                  </a>
                  <a
                    href="https://apps.apple.com/in/app/raddx-racing-metaverse/id1671159641"
                    target="_blank"
                    rel="nofollow noopoener noreferrer"
                  >
                    <Image unoptimized={true}
                      
                      height="100"
                      width="100"
                      className={style["image_icon"]}
                      src={RaddxAppImage}
                      alt="AppStore"
                      priority={true}
                    />
                  </a>
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide> */}
          {/* Raddx Banner */}
          {/* <SwiperSlide>
          <div className="item">
            <section
              className={`${style["hero-banner-sec"]} ${style["updated-video-sec"]}`}
            >
              {width && (
                <video
                  id="full-screenVideo"
                  loop
                  muted
                  autoPlay
                  playsInline
                  onLoadedData={() => setLoadingVideoFirst(false)}
                  poster={images.poster_image}
                  controlsList="nodownload"
                  className={`${style["video-fixed"]} `}
                  src={width > 1030 ? images.raddx_web : images.raddx_mobile}
                  type="video/mp4"
                ></video>
              )}
              <div className={style["hero-content-block"]}>
                <div className={style["hero-content-box"]}>
                  <Image unoptimized={true}
                    
                    height="100"
                    width="100"
                    src={HeroContentBg}
                    className={style["hero-contet-box-bg"]}
                    alt="circle_image"
                    priority={true}
                  />
                  <h3>RACE TO THE TOP WITH RADDX METAVERSE NFTs</h3>
                  <p className={style["hero-desc"]}>
                    Get your hands on highly collectible & tradable cars, own
                    exclusive digital lands, and race your way through this
                    exciting metaverse.
                  </p>

                  <div className="time-show">
                    <div className="pl-3 pr-3">
                      <h5 className="mb-1">
                        {""}
                        {(() => {
                          if (
                            new Date(details?.preorder_start_time).getTime() >
                              new Date().getTime() &&
                            new Date(
                              details?.preorder_og_start_time
                            ).getTime() > new Date().getTime()
                          )
                            return (
                              <>
                                {" "}
                                PRE-BOOK <span>(OG Users)</span> STARTS IN
                              </>
                            );
                          else if (
                            new Date(
                              details?.preorder_og_start_time
                            ).getTime() < new Date().getTime() &&
                            new Date(details?.preorder_start_time).getTime() >
                              new Date().getTime()
                          )
                            return (
                              <>
                                PRE-BOOK <span>(OG Users)</span>
                              </>
                            );
                          else return eventInfo?.title;
                        })()}
                      </h5>
                      {eventInfo?.endAt && (
                        <div className="nft-collection-timer">
                          {new Date(details?.preorder_og_start_time).getTime() <
                            new Date().getTime() &&
                          new Date(details?.preorder_start_time).getTime() >
                            new Date().getTime() ? (
                            <>
                              {" "}
                              <span className="blink live-pill">Live Now</span>
                            </>
                          ) : (
                            <>
                              <NFTCounter
                                time={(() => {
                                  if (
                                    new Date(
                                      details?.preorder_start_time
                                    ).getTime() > new Date().getTime() &&
                                    new Date(
                                      details?.preorder_og_start_time
                                    ).getTime() > new Date().getTime()
                                  )
                                    return dateFormat(
                                      details?.preorder_og_start_time
                                    );
                                  else if (
                                    new Date(
                                      details?.preorder_og_start_time
                                    ).getTime() < new Date().getTime() &&
                                    new Date(
                                      details?.preorder_start_time
                                    ).getTime() > new Date().getTime()
                                  )
                                    return <></>;
                                  else return eventInfo?.endAt;
                                })()}
                                timeClass="collection-timer"
                                className="theme-time"
                                handleEndEvent={() =>
                                  setTimeout(initEventInfo, 1000)
                                }
                              />
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {new Date(details?.preorder_start_time).getTime() >
                    new Date().getTime() ? (
                      <>
                        <div className="line"></div>
                        <div className="pl-3 pr-3">
                          <h5 className="mb-1">
                            PRE-BOOK <span>(EVERYONE)</span> STARTS IN
                          </h5>

                          <div className="nft-collection-timer">
                            <NFTCounter
                              time={dateFormat(details?.preorder_start_time)}
                              timeClass="collection-timer"
                              className="theme-time"
                              handleEndEvent={() =>
                                setTimeout(initEventInfo, 1000)
                              }
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className={style["hero-btn-block"]}>
                    <button
                      className={`${style["theme-btn"]} ${style["explore-btn"]} ${style["mr-1"]} ${style["pre-btn"]}`}
                      onClick={() =>
                        window.open(process.env.NEXT_PUBLIC_RADDX_URL, "_blank")
                      }
                    >
                      <span>Drop Sold Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide> */}
          {/* Raddx banner commented */}
          {/* <SwiperSlide>
          <div className="item">
            <section
              className={`${style["hero-banner-sec"]} ${style["raddx_gift_banner"]}  ${style["two-column"]}`}
            >
              <div className={`${style["hero-content-block"]}`}>
                <div className={style["hero-content-box"]}>
                  <Image unoptimized={true}
                    
                    height="1280"
                    width="720"
                    src={CarImages.raddx_banner_drop_image}
                    alt="circle_image"
                    priority={true}
                  />
                </div>
                <div
                  className={style["pp-hero-contet-img"]}
                  onClick={() =>
                    window.open(
                      `${process.env.NEXT_PUBLIC_RADDX_URL}/guaranteed-gift-box`,
                      "_blank"
                    )
                  }
                >
                  <Image unoptimized={true}
                    
                    height="1280"
                    width="720"
                    src={CarImages.raddx_banner_drop_image_rewards}
                    alt="circle_image"
                    priority={true}
                  />
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide> */}
          {/* Raddx banner commented */}
          {/* Spin Wheel Banner */}
          {/* <SwiperSlide>
          <div className="item">
            <section
              className={`${style["hero-banner-sec"]} ${style["two-column"]}`}
            >
              <div className={`${style["hero-content-block"]}`}>
                <div className={style["hero-content-box"]}>
                  <Image unoptimized={true}
                    
                    height="100"
                    width="100"
                    src={HeroContentBg}
                    className={style["hero-contet-box-bg"]}
                    alt="circle_image"
                    priority={true}
                  />
                  <span className={style["hero-main-heading-contest"]}>
                    SPIN-THE-WHEEL CONTEST
                  </span>
                  <span className={style["hero-main-heading-contest"]}>
                    OWN AN MCL SIGNATURE SHOT!
                  </span>
                  <span className={style["hero-main-heading-contest"]}>
                    GET TO SPIN &amp; WIN PRIZES WORTH $6,000!
                  </span>
                  <span className={style["hero-main-heading-contest"]}>
                    EVERY SPIN WINS!
                  </span>

                  <div className={style["hero-btn-block"]}>
                    <button
                      className={`${style["theme-btn"]} ${style["explore-btn"]}`}
                      onClick={() =>
                        window.open(
                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/spin-wheel`,
                          "_self"
                        )
                      }
                    >
                      <span>Live Now</span>
                    </button>
                  </div>
                </div>
                <div className={style["pp-hero-contet-img"]}>
                  <Image unoptimized={true}
                    
                    height="1280"
                    width="720"
                    src={
                      width < 768
                        ? images?.spin_contest_landing_mobile
                        : images?.spin_contest_landing_web
                    }
                    alt="circle_image"
                    priority={true}
                  />
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide> */}

          {/* Play Pass Banner */}
          {/* <SwiperSlide>
          <div className="item">
            <section
              className={`${style["hero-banner-sec"]} ${style["two-column"]}`}
            >
              <div className={`${style["hero-content-block"]}`}>
                <div className={style["hero-content-box"]}>
                  <Image unoptimized={true}
                    
                    height="100"
                    width="100"
                    src={HeroContentBg}
                    className={style["hero-contet-box-bg"]}
                    alt="circle_image"
                    priority={true}
                  />
                  <span className={style["hero-main-heading"]}>
                    PLAY THE $15,000 MCL CROWN CLASH TOURNAMENT FOR FREE!
                  </span>
                  <p className={style["hero-desc"]}>
                    Get ready to compete and win big in the MCL Crown Clash
                    Tournament! Download the MCL Game to claim your FREE PASS
                    and play your way to the top of this $15,000 prize pool
                    tournament.
                  </p>
                  <div className="banner-timer-section">
                    <h5 className="banner-timer-title">{eventInfo?.title}</h5>
                    {eventInfo?.status !== LOOT_STATUS.SOLD_OUT &&
                      eventInfo?.endAt && (
                        <FlipTimer
                          classNames={"bat-timer"}
                          endTime={eventInfo?.endAt}
                          handleEndEvent={() => {
                            setTimeout(() => initEventInfoPass(true), 1000);
                          }}
                        />
                      )}
                  </div>
                  <div className={style["hero-btn-block"]}>
                    {eventInfo?.buttonTitle && (
                      <button
                        className={`${style["theme-btn"]} ${style["explore-btn"]}`}
                        onClick={() => router.push("/drop/free-mcl-pass")}
                      >
                        <span>{eventInfo?.buttonTitle}</span>
                      </button>
                    )}
                    <a
                      className={`${style["theme-btn"]} ${style["rounded-bordered"]}`}
                      role="button"
                      onClick={() => router.push("/mcl-game")}
                    >
                      <span>Download MCL Game</span>
                    </a>
                  </div>
                </div>
                <div className={style["pp-hero-contet-img"]}>
                  {details?.available_qty === 0 && (
                    <h5 className={style["banner-timer-title"]}>
                      PASSES SOLD OUT
                    </h5>
                  )}
                  <Image unoptimized={true}
                    
                    height="1280"
                    width="720"
                    src={
                      width < 768
                        ? images?.crown_pass_mob
                        : images?.crown_pass_mob
                    }
                    alt="circle_image"
                    priority={true}
                  />
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide> */}
          {/* Signature Shots Banner */}
          {/* <SwiperSlide>
          <div className="item">
            <section
              className={`${style["hero-banner-sec"]} ${style["two-column"]}`}
            >
              <div className={`${style["hero-content-block"]}`}>
                <div className={style["hero-content-box"]}>
                  <Image unoptimized={true}
                    
                    height="100"
                    width="100"
                    src={HeroContentBg}
                    className={style["hero-contet-box-bg"]}
                    alt="circle_image"
                    priority={true}
                  />
                  <span className={style["hero-main-heading"]}>
                    ANNOUNCING THE MCL SIGNATURE SHOTS - MYSTERY BOX
                  </span>
                  <p className={style["hero-desc"]}>
                    Introducing motion-captured batting shots that are visually
                    stunning and give your gameplay greater line-connect
                    accuracy. The MCL Signature Shot NFTs are tradeable,
                    collectible, and playable.
                  </p>
                  <div className="banner-timer-section">
                    <h5 className="banner-timer-title">
                      {eventInfoPass?.title}
                    </h5>
                    {eventInfoPass?.endAt && (
                      <FlipTimer
                        classNames={"bat-timer"}
                        endTime={eventInfoPass?.endAt}
                        handleEndEvent={() => {
                          setTimeout(() => initEventInfoShots(true), 1000);
                        }}
                      />
                    )}
                  </div>

                  <div className={style["hero-btn-block"]}>
                    {eventInfoPass?.buttonTitle && (
                      <button
                        className={`${style["theme-btn"]} ${style["explore-btn"]}`}
                        onClick={() => router.push("/drop/mcl-shot-nfts")}
                      >
                        <span>{eventInfoPass?.buttonTitle}</span>
                      </button>
                    )}
                  </div>
                </div>
                <div className={style["pp-hero-contet-img"]}>
                  <Image unoptimized={true}
                    
                    height="1280"
                    width="720"
                    src={
                      width < 768
                        ? images?.mcl_shots_mobile
                        : images?.mcl_shots_web
                    }
                    alt="circle_image"
                    priority={true}
                  />
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide> */}
          {/* <SwiperSlide>
          <div className="item">
            <section
              className={`${style["hero-banner-sec"]} ${style["two-column"]} `}
              style={{
                backgroundImage: `url(${
                  width > 991 &&
                  images?.santa_banner_contest_landing_web_fullbanner
                })`,
              }}
            >
              <div className={`${style["hero-content-block"]}`}>
                <div className={style["hero-content-box"]}>
                  <Image unoptimized={true}
                    
                    height="100"
                    width="100"
                    src={HeroContentBg}
                    className={style["hero-contet-box-bg"]}
                    alt="circle_image"
                    priority={true}
                  />
                  <span className={style["hero-main-heading"]}>
                    $12000 SUPER SANTA TREASURE BOX CONTEST!
                  </span>
                  <span className={style["hero-desc_h5"]}>
                    100 Random NEW Buyers making their first-ever purchase of at
                    least 1 MCL Batsman NFT and 1 MCL Bowler NFT will receive a
                    treasure box with EPIC Prizes!
                  </span>
                  <div className="banner-timer-section">
                    {contestInfo?.title && (
                      <span className="banner-timer-title">
                        {contestInfo?.title}
                      </span>
                    )}
                    {contestInfo?.sub_title && (
                      <p className="banner-timer-sub-title">
                        {contestInfo?.sub_title}
                      </p>
                    )}
                    {contestInfo?.end && (
                      <FlipTimer
                        classNames={"bat-timer"}
                        endTime={"2023-01-02T18:29:59.000Z"}
                        handleEndEvent={() => {
                          setTimeout(
                            () => setContestInfo({ title: "CONTEST ENDED" }),
                            100
                          );
                        }}
                      />
                    )}
                  </div>

                  <div className={style["hero-btn-block"]}>
                    <button
                      className={`${style["theme-btn"]} ${style["explore-btn"]}`}
                      onClick={() => router.push("/nft-marketplace/contest/")}
                    >
                      <span>Explore</span>
                    </button>
                  </div>
                </div>
                <div
                  className={`${style["pp-hero-contet-img"]} ${style["santa-contet-img"]}`}
                >
                  {width < 992 ? (
                    <Image unoptimized={true}
                      
                      height="1280"
                      width="720"
                      src={
                        width < 768
                          ? images?.santa_banner_contest_landing_mobile_new
                          : images?.santa_banner_contest_landing_web_new
                      }
                      alt="circle_image"
                      priority={true}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide> */}
          {/* <SwiperSlide>
          <div className="item">
            <section
              className={`${style["hero-banner-sec"]} ${style["two-column"]}`}
            >
              <div className={`${style["hero-content-block"]}`}>
                <div className={style["hero-content-box"]}>
                  <Image unoptimized={true}
                    
                    height="100"
                    width="100"
                    src={HeroContentBg}
                    className={style["hero-contet-box-bg"]}
                    alt="circle_image"
                    priority={true}
                  />
                  <h3>
                    BUY THE DIP WITH <br /> THE CRYPTO BAT NFTs!
                  </h3>
                  <h5 className={style["hero-desc_h5"]}>
                    Announcing tradeable and playable Crypto Bat NFTs backed by
                    real crypto assets, such as BTC, ETH, BNB, DOGE, &amp;
                    MATIC.
                  </h5>

                  <div className="banner-timer-section">
                    <h5 className="banner-timer-title">SOLD OUT IN 39 SECS</h5>
                    {eventInfo?.status !== LOOT_STATUS.SOLD_OUT &&
                      eventInfo?.endAt && (
                        <FlipTimer
                          classNames={"bat-timer"}
                          endTime={eventInfo?.endAt}
                          handleEndEvent={() => {
                            setTimeout(() => initEventInfo(true), 1000);
                          }}
                        />
                      )}
                  </div>
                  <div className={style["hero-btn-block"]}>
                    <button
                      className={`${style["theme-btn"]} ${style["explore-btn"]}`}
                      onClick={() => router.push("/drop/crypto-bat-nfts")}
                    >
                      <span>Explore</span>
                    </button>

                    {eventInfo?.status !== LOOT_STATUS.SOLD_OUT && (
                      <>
                        <button
                          className={`${style["theme-btn"]} ${style["rounded-bordered"]} `}
                          to="#"
                          onClick={() => {
                            user
                              ? window.open(
                                  `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/wallet#web`,
                                  "_self"
                                )
                              : window.open(
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
                </div>
                <div className={style["hero-contet-img"]}>
                  <Image unoptimized={true}
                    
                    height="1490"
                    width="1476"
                    src={HeroContentImg}
                    alt="circle_image"
                    priority={true}
                  />
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide> */}
          {/* <SwiperSlide>
          <div className="item">
            <section className={style["hero-banner-sec"]}>
              {width && (
                <>
                  {getOS() === "iOS" ? (
                    <Image unoptimized={true}
                      
                      height="512"
                      width="1024"
                      className={`${style["image-fixed"]}`}
                      src={images.mclgame_poster}
                    />
                  ) : (
                    <video
                      id="full-screenVideo"
                      loop
                      muted
                      autoPlay
                      onLoadedData={() => setLoadingVideoSec(false)}
                      playsInline
                      controlsList="nodownload"
                      poster={images.mclgame_poster}
                      className={`${style["video-fixed"]}`}
                      src={
                        loadingVideoSec
                          ? images.mclgame_poster
                          : images.mcl_game
                      }
                      type="video/mp4"
                    ></video>
                  )}
                </>
              )}
              <div className={style["hero-content-block"]}>
                <div className={style["hero-content-box"]}>
                  <Image unoptimized={true}
                    
                    height="1000"
                    width="1000"
                    src={HeroContentBg}
                    className={style["hero-contet-box-bg"]}
                    alt="circle_image"
                  />
                  <Image unoptimized={true}
                    className={style["hero-logo-image"]}
                    
                    height={100}
                    width={100}
                    alt="MCL Icon"
                    src={images.mcl_logo}
                  />
                  <h3>
                    PLAY CRICKET,
                    <br />
                    EARN CASH REWARDS DAILY!
                  </h3>
                  <p className={style["hero-desc"]}>
                    Buy &amp; Sell MCL Player NFTs and MCL Signed Bat NFTs.
                    Build Teams to Play in Daily Tournaments and Climb
                    Leaderboards. Win Cash Rewards Every Day!
                  </p>
                  <div className={style["hero-btn-block"]}>
                    <button
                      className={`${style["theme-btn"]} ${style["mr-1"]}`}
                      onClick={scrollIntournaments}
                    >
                      <span>View Tournaments</span>
                    </button>
                    <a
                      className={`${style["theme-btn"]} ${style["rounded-bordered"]}`}
                      role="button"
                      onClick={() => router.push("/mcl-game")}
                    >
                      <span>Download MCL Game</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide> */}
        </Swiper>
        {/* )} */}
      </section>
    </>
  );
};

export default HeroBanner;
