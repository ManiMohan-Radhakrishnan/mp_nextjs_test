import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper";
import images from "../../../utils/images.json";
import style from "./style.module.scss";
import "swiper/css/pagination";

const StaticFlowsSeasonPass = () => {
  return (
    <>
      <section className={`${style["flow-section"]} shots-info-block`}>
        <h4 className={`${style["title"]} title`}>
          WHAT DO <span>MCL BOUNDARY SWAG SHOTS</span> DO?
        </h4>
        {/* <p className={`${style["description"]} description`}>
          When your favorite player plays their signature shot, it appears so
          graceful and smoothly connected! When an Action Shot NFT is equipped,
          your MCL Batsman adapts better to different situations. They can more
          confidently handle balls of varying lengths when played in the right
          direction! You not only get to play signature shots in style but also
          improve the effectiveness of the shot being played!
        </p> */}

        <div className={`${style["shot_section"]} shot_section`}>
          <div
            className={`${style["shot-section-content"]} ${style["shot-section-content-box-list"]}`}
          >
            <div className={`${style["shot-section-content-box-item"]}`}>
              <h1 className={style["head-section"]}>SWAG STYLES</h1>
              <p className={`${style["description"]}`}>
                Equip your players with swaggy stylish shots from all your
                favorite real-world cricketers.
              </p>
            </div>
            <div className={`${style["shot-section-content-box-item"]}`}>
              <h1 className={style["head-section"]}>MAXIMUM PERFORMANCE</h1>
              <p className={`${style["description"]}`}>
                Improves the stats to the maximum of your Batters specifically
                for that shot.
              </p>
            </div>
            <div className={`${style["shot-section-content-box-item"]}`}>
              <h1 className={style["head-section"]}>PITCH RESPONSIVENESS</h1>
              <p className={`${style["description"]}`}>
                Respond to the ball at a higher rate based on pitch type (Green,
                Dry, and Normal).
              </p>
            </div>
            <div className={`${style["shot-section-content-box-item"]}`}>
              <h1 className={style["head-section"]}>HIGH PRECISION</h1>
              <p className={`${style["description"]}`}>
                Execute the shots perfectly to tackle the toughest deliveries
                from the bowlers.
              </p>
            </div>
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
        </div>
      </section>
    </>
  );
};

export default StaticFlowsSeasonPass;
