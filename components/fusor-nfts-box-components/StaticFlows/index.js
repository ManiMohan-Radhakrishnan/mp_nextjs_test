import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper";
import images from "../../../utils/images.json";
import style from "./style.module.scss";
import "swiper/css/pagination";
import Image from "next/image";
import SpecialShot from "../../../images/special-shot-image.jpg";

const StaticFlows = () => {
  return (
    <>
      <section
        className={`${style["flow-section"]} ${style["shots-info-block"]}  shots-info-block`}
      >
        <div className="container-fluid mb-5">
          <div className="row">
            <div className="col-sm-12">
              <h4 className={`${style["title"]} title`}>
                WHAT IS AN MCL SPECIAL SHOT NFT?
              </h4>
              <p className={`${style["description"]} description`}>
                {`The MCL Special Shots are a brand new set of tradeable,
                collectible, and playable NFTs created through Fusion, that
                enhance your MCL Premier batters with adaptive line-connect
                accuracy. These shots bring a lot more style and flamboyance
                from the best of the real-world cricket legends, powered by 360°
                Motion-Capture Technology. Don't miss the chance to own these
                unique shot NFTs that combine visual thrill and legendary shots.`}
              </p>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <h4 className={`${style["title"]} title`}>
                WHAT DO MCL SPECIAL SHOTS DO?
              </h4>
              <div className={`${style["shot_section"]} shot_section`}>
                <div className={`${style["shot-section-content"]}`}>
                  <h1 className={style["head-section"]}>Special Styles</h1>
                  <p className={`${style["description"]}`}>
                    Equip your players with stylish, motion-captured Special
                    Shots from all your favorite real-world cricketers
                  </p>
                  <h1 className={style["head-section"]}>Better Performance</h1>
                  <p className={`${style["description"]}`}>
                    Improves the base stats of your MCL Premier Batters
                    specifically for that shot.
                  </p>
                  <h1 className={style["head-section"]}>Pitch Adaptiveness</h1>
                  <p className={`${style["description"]}`}>
                    Improves performance based on pitch type (Green, Dry, and
                    Normal).
                  </p>
                  <h1 className={style["head-section"]}>Improved Handling</h1>
                  <p className={`${style["description"]}`}>
                    Batters can now handle more variations in line and length,
                    tackling bowlers much more effectively. You&apos;ll still
                    need good timing.
                  </p>
                  <h1 className={style["head-section"]}>
                    How to Use MCL Special Shots?
                  </h1>
                  <p className={`${style["description"]}`}>
                    Every Special Shot gets triggered situationally based on the
                    line of the ball, type of the ball, and batting shot
                    direction.
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
                  <Image
                    unoptimized={true}
                    alt="SpecialShot"
                    src={images.special_shot_image}
                    className={`${style["pack-image"]}`}
                    height="1080"
                    width="1080"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StaticFlows;
