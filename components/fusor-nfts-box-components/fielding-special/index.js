import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper";
import images from "../../../utils/images.json";
import style from "./style.module.scss";
import "swiper/css/pagination";
import Image from "next/image";

const FieldingSpecial = () => {
  return (
    <>
      <section className={`${style["flow-section"]} shots-info-block`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <h4 className={`${style["title"]} title`}>
                WHAT IS AN MCL FIELDING ACTION NFT?
              </h4>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={`${style["shot_section"]} shot_section`}>
                <div className={`${style["shot-section-content"]}`}>
                  <p className={`${style["description"]}`}>
                    MCL Fielding Actions help your MCL Premier bowler direct the
                    team to perform spectacular feats of fielding in matches.
                    Your fielders will display enhanced agility in running and
                    diving, take more difficult catches, and showcase higher
                    throw accuracy. Fielding Actions also enable more aggression
                    and empower your team to take more wickets. Fielding Actions
                    are tradeable but can only be used by MCL Premier bowlers.
                  </p>
                  <h1 className={style["head-section"]}>Acrobatic Dives</h1>
                  <p className={`${style["description"]}`}>
                    Equip your players with acrobatic, motion-captured diving
                    catches and stops from all your favourite real-world
                    cricketers.
                  </p>
                  <h1 className={style["head-section"]}>Stopping Power</h1>
                  <p className={`${style["description"]}`}>
                    Empower your fielders with a burst of athletic prowess to
                    restrict extra runs and nab crucial wickets when your
                    opponent slips up.
                  </p>
                  <h1 className={style["head-section"]}>How to Use</h1>
                  <p className={`${style["description"]}`}>
                    Fielding Actions get triggered automatically based on the
                    ball trajectory and fielder position. Just owning them is
                    enough to trigger them.
                  </p>
                </div>
                {/* <Swiper
            className={`${style["hero-carousel"]}`}
            slidesPerView={1}
            modules={[EffectFade, Navigation, Autoplay, Pagination]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 15000 }}
            speed={500}
            loop
            uniqueNavElements
          >
            <SwiperSlide>
              <div className={`${style["shot-section-content-video"]}`}>
                <video
                  className={`${style["pack-image"]}`}
                  loop
                  muted
                  autoPlay
                  src={images.mcl_shot_video1}
                  playsInline
                  type="video/mp4"
                ></video>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={`${style["shot-section-content-video"]}`}>
                <video
                  className={`${style["pack-image"]}`}
                  loop
                  muted
                  autoPlay
                  src={images.mcl_shot_video2}
                  playsInline
                  type="video/mp4"
                ></video>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={`${style["shot-section-content-video"]}`}>
                <video
                  className={`${style["pack-image"]}`}
                  loop
                  muted
                  autoPlay
                  src={images.mcl_shot_video3}
                  playsInline
                  type="video/mp4"
                ></video>
              </div>
            </SwiperSlide>
          </Swiper> */}
                <div className={`${style["shot-section-content-video"]}`}>
                  <video
                    className={`${style["pack-image"]}`}
                    loop
                    muted
                    autoPlay
                    src={images.fielding_action_video}
                    playsInline
                    type="video/mp4"
                  ></video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FieldingSpecial;
