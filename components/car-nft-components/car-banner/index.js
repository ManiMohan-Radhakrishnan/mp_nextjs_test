import { useRef, useState } from "react";
import Image from "next/image";

import useWindowSize from "../../../hooks/useWindowSize";

import images from "../images.json";
import HeroArrow from "../../../images/raddx-nft/hero-arrow.png";
import videoBanner from "../../../images/raddx-nft/raddx_video_banner.jpg";

import style from "./style.module.scss";

const CarBanner = () => {
  // const [showBannerVideo, setShowBannerVideo] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const { width: windowWidth } = useWindowSize();
  const videoRef = useRef();

  const playVideo = (play = true) => {
    if (!play) {
      videoRef?.current?.pause();
      videoRef.current.currentTime = 0;
    } else {
      videoRef.current.play();
    }
    setShowVideo(play);
  };

  return (
    <section
      className={`${style["raddx-hero-section"]} ${
        showVideo && windowWidth > 768 && style["video-open"]
      }`}
    >
      {windowWidth > 767 ? (
        <>
          <Image
            unoptimized={true}
            src={images.raddx_desktop_video_banner}
            alt="hero banner poster"
            width="2081"
            height="1093"
            className={`${style["raddx-hero-banner-img"]} ${
              showVideo ? style["video-play"] : ""
            }`.trim()}
          />
          <video
            ref={videoRef}
            poster={images.raddx_mobile_banner}
            src={
              windowWidth > 1280
                ? images.raddx_teaser_video_hd
                : images.raddx_teaser_video
            }
            onEnded={() => playVideo(false)}
            controls={false}
            alt="hero banner teaser"
            width="2081"
            height="1093"
            className={`${style["raddx-hero-banner-video"]}`}
          />
        </>
      ) : (
        <Image
          unoptimized={true}
          src={videoBanner.src}
          width={767}
          height={450}
          alt="hero banner poster"
          className={`${style["raddx-hero-banner-video"]}`}
        />
      )}
      {!showVideo && windowWidth > 767 ? (
        <button onClick={playVideo} className={style["watchnow-btn"]}>
          <Image
            unoptimized={true}
            src={HeroArrow.src}
            width="518"
            height="159"
            alt="Arrow"
            className={style["arrow-right"]}
          />
          Watch Now
          <Image
            unoptimized={true}
            src={HeroArrow.src}
            width="518"
            height="159"
            alt="Arrow"
            className={style["arrow-left"]}
          />
        </button>
      ) : (
        <></>
      )}
      {windowWidth < 768 && (
        <>
          {/* <Modal
            show={showBannerVideo}
            dialogClassName={`${style["banner-video-modal"]} banner-video-modal`}
            onHide={() => setShowBannerVideo(false)}
            centered
          >
            <ModalBody>
              <iframe
                width="100%"
                height="auto"
                src="https://www.youtube.com/embed/AdHHFoV-Aoo?rel=0&autoplay=1"
                title="Raddx Racing Metaverse NFTs"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </ModalBody>
          </Modal> */}
          <div className={style["yt-banner-video"]}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/AdHHFoV-Aoo?rel=0&autoplay=1"
              title="Raddx Racing Metaverse NFTs"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </>
      )}
      {/* <div className={style["prebook-sec-icon"]}>
        <BsArrowDownCircleFill
          className="icon-position icon-style"
          onClick={() =>
            lootStatusRef?.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
        />
      </div> */}
    </section>
  );
};

export default CarBanner;
