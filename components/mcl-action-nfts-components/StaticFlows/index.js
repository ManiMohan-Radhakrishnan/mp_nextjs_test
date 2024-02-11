import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper";
import images from "../../../utils/images.json";
import style from "./style.module.scss";
import "swiper/css/pagination";

const StaticFlows = () => {
  return (
    <>
      <section className={`${style["flow-section"]} shots-info-block`}>
        <h4 className={`${style["title"]} title`}>
          WHAT DO <span>MCL SIGNATURE SHOTS</span> DO?
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
          <div className={`${style["shot-section-content"]}`}>
            <h1 className={style["head-section"]}>Signature Styles</h1>
            <p className={`${style["description"]}`}>
              Equip your players with stylish, motion-captured signature shots
              from all your favorite real-world cricketers.
            </p>
            <h1 className={style["head-section"]}>Better Performance</h1>
            <p className={`${style["description"]}`}>
              Improves the base stats of your MCL Batters specifically for that
              shot.
            </p>
            <h1 className={style["head-section"]}>Pitch Adaptiveness</h1>
            <p className={`${style["description"]}`}>
              Improves performance based on pitch type (Green, Dry, and Normal).
            </p>
            <h1 className={style["head-section"]}>Improved Handling</h1>
            <p className={`${style["description"]}`}>
              Batters can now handle more variations in line and length,
              tackling bowlers much more effectively. You’ll still need good
              timing.
            </p>
            <h1 className={style["head-section"]}>
              How to Use MCL Signature Shots?
            </h1>
            <p className={`${style["description"]}`}>
              Every Signature Shot gets triggered situationally based on the
              line of the ball, type of the ball, and batting shot direction
            </p>
          </div>
          <Swiper
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
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default StaticFlows;
