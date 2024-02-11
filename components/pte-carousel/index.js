import { Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";

import VedioPlayer from "../vedio-player";

import images1 from "../../utils/images-new.json";

import "swiper/css/scrollbar";
import "swiper/css/pagination";
import style from "./style.module.scss";
import DownloadGame from "../download-game";
import { EVENT_NAMES, invokeTrackEvent } from "../../utils/track-events";

const PteCarousel = () => {
  const swiperRef = useRef();
  const [videoBox, setVideoBox] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const videoRef = useRef();

  const refFirst = useRef(null);
  const refSec = useRef(null);
  const refThird = useRef(null);
  const handleVideoClick = (video) => {
    invokeTrackEvent(EVENT_NAMES?.VIDEO_PLAYED, { name: video });
    if (video === "marketplace")
      refFirst.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    else if (video === "mcl-game")
      refSec.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    else
      refThird.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
  };

  function handleVedio(video) {
    handleVideoClick(video);
    if (video === "marketplace") {
      setVideoBox(true);
      setVideoUrl(
        "https://www.youtube.com/embed/5elFhF6mj98?rel=0&hd=1&wmode=opaque&enablejsapi=1&controls=1&autoplay=1"
      );
    }

    if (video === "mcl-game") {
      setVideoBox(true);
      setVideoUrl(
        "https://www.youtube.com/embed/GHEyH-dUN28?rel=0&hd=1&wmode=opaque&enablejsapi=1&controls=1&autoplay=1"
      );
    }

    if (video === "rewards") {
      setVideoBox(true);
      setVideoUrl(
        "https://www.youtube.com/embed/D78a4moJE-g?rel=0&hd=1&wmode=opaque&enablejsapi=1&controls=1&autoplay=1"
      );
    }
  }
  return (
    <>
      {/* <DownloadGame /> */}
      <section
        ref={videoRef}
        className={`${style["jt-pte-carousel"]} jt-pte-carousel`}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={style["jt-pte-carousel-header"]}>
                <h4 className={style["gold-heading"]}>
                  BUY . TRADE . PLAY . EARN ✦
                </h4>
                <h2 className={style["bold-heading"]}>
                  HOW TO PLAY &amp; EARN <br />
                  WITH YOUR NFTs?
                </h2>
                <p className={style["pte-description"]}>
                  With Jump.trade&apos;s MCL NFTs, you can earn real cash
                  rewards by playing your favorite cricket game - It&apos;s as
                  simple as that!
                </p>
              </div>
              <Swiper
                modules={[Pagination, Scrollbar, A11y]}
                initialSlide={3}
                // centeredSlides={false}
                ref={swiperRef}
                className={style["pte-carousel"]}
                spaceBetween={20}
                pagination={{ clickable: true }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    initialSlide: 0,
                  },
                  650: {
                    slidesPerView: 2,
                    initialSlide: 0,
                  },
                  992: {
                    slidesPerView: 3,
                    initialSlide: 0,
                  },
                }}
              >
                <SwiperSlide>
                  <div className={style["carousel-item"]}>
                    <div
                      className={`${style["golden-content-wrapper"]} ${style["one"]}`}
                    >
                      <h4>01.</h4>
                      <h3 className={style["bold-heading"]}>
                        Buy Your NFTs from The Marketplace
                      </h3>
                      <p>
                        The Jump.trade marketplace offers you a wide selection
                        of NFTs!
                      </p>
                    </div>
                    <div
                      className={style["video-wrapper"]}
                      style={{ backgroundImage: `url(${images1?.rare_bg})` }}
                    >
                      <div
                        className={`${style["video-overlay"]}`}
                        ref={refFirst}
                      >
                        <AiFillPlayCircle
                          className={style["play-btn"]}
                          onClick={() => handleVedio("marketplace")}
                        />
                        <p className={style["video-description"]}>
                          How To Buy Your NFTs From The Jump.Trade Marketplace?
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={style["carousel-item"]}>
                    <div
                      className={`${style["golden-content-wrapper"]} ${style["two"]}`}
                    >
                      <h4>02.</h4>
                      <h3 className={style["bold-heading"]}>
                        Download The App &amp; Play The MCL Game
                      </h3>
                      <p>
                        Download The Game, Form Your Team & Play MCL Using Your
                        NFTs!
                      </p>
                    </div>

                    <div
                      className={style["video-wrapper"]}
                      style={{ backgroundImage: `url(${images1?.rare_bg})` }}
                    >
                      <div className={`${style["video-overlay"]}`} ref={refSec}>
                        <AiFillPlayCircle
                          className={style["play-btn"]}
                          onClick={() => handleVedio("mcl-game")}
                        />
                        <p className={style["video-description"]}>
                          How To Download &amp; Play The MCL Game With Your
                          NFTs?
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={style["carousel-item"]}>
                    <div
                      className={`${style["golden-content-wrapper"]} ${style["three"]}`}
                    >
                      <h4>03.</h4>
                      <h3 className={style["bold-heading"]}>
                        Top The Leaderboard &amp; Win Cash Prizes
                      </h3>
                      <p>
                        Play Matches, Top The Leaderboard, & Win Cash Rewards
                        Daily!
                      </p>
                    </div>

                    <div
                      className={style["video-wrapper"]}
                      style={{ backgroundImage: `url(${images1?.rare_bg})` }}
                    >
                      <div
                        className={`${style["video-overlay"]}`}
                        ref={refThird}
                      >
                        <AiFillPlayCircle
                          className={style["play-btn"]}
                          onClick={() => handleVedio("rewards")}
                        />
                        <p className={style["video-description"]}>
                          How To Win Real Cash Rewards By Playing Meta Cricket
                          League?
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>

        {videoBox && (
          <>
            <VedioPlayer
              videoUrl={videoUrl}
              videoBox={videoBox}
              onHide={() => {
                setVideoBox("");
              }}
            />
          </>
        )}
      </section>
    </>
  );
};

export default PteCarousel;
