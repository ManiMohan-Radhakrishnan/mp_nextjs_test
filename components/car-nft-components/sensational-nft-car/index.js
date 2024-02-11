import style from "./style.module.scss";
import WinIcon from "../../../images/drop/car-nft-images/discover-section/win.svg";
import PlayIcon from "../../../images/drop/car-nft-images/discover-section/play.svg";
import TradeIcon from "../../../images/drop/car-nft-images/discover-section/trade.svg";
import ActionPacked from "../../../images/drop/car-nft-images/discover-section/action-packed.png";
import DigitalDream from "../../../images/drop/car-nft-images/discover-section/digital-dream.png";
import LevelImage from "../../../images/drop/car-nft-images/discover-section/level-image.png";
import EarnReward from "../../../images/drop/car-nft-images/discover-section/earn-reward.png";
import TradeImage from "../../../images/drop/car-nft-images/discover-section/trade-red-image.png";
import DiscoverBg from "../../../images/drop/car-nft-images/discover-section/discover-bg.jpg";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const SensationalNftCar = () => {
  return (
    <section
      className={`${style["sensational-nft-section"]} sensational-nft-section`}
      style={{
        backgroundImage: `url(${DiscoverBg.src})`,
      }}
    >
      <div className="container-fluid position-relative">
        <div className="row">
          <div className="col-12">
            <div className={style["sec-heading"]}>
              <h4>DISCOVER THE THRILL OF RACING IN THE METAVERSE</h4>
              <p>
                COLLECT & TRADE stunning CARS and accelerate your way to the
                finish line to WIN BIG REWARDS daily!
              </p>
            </div>
            <ul className={style["step-info-block"]}>
              <li>
                <Image
                  unoptimized={true}
                  src={TradeIcon.src}
                  alt="TradeIcon"
                  height={80}
                  width={80}
                />
                <h5>Trade Car NFTs</h5>
              </li>
              <li>
                <Image
                  unoptimized={true}
                  src={PlayIcon.src}
                  alt="PlayIcon"
                  height={80}
                  width={80}
                />
                <h5>Play Tournaments</h5>
              </li>
              <li>
                <Image
                  unoptimized={true}
                  src={WinIcon.src}
                  alt="WinIcon"
                  height={80}
                  width={80}
                />
                <h5>Win Cash Rewards Daily</h5>
              </li>
            </ul>

            <Swiper
              className={style["sensational-nft-swiper"]}
              modules={[Navigation, Autoplay, Pagination]}
              autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
              speed={500}
              pagination={{ dynamicBullets: true }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                500: {
                  slidesPerView: 2,
                },
                800: {
                  slidesPerView: 3,
                },

                991: {
                  slidesPerView: 4,
                },
                1200: {
                  slidesPerView: 5,
                },
              }}
            >
              <SwiperSlide>
                <article
                  className={`${style["nft-car-cards"]} ${style["red-card"]}`}
                >
                  <div
                    className={`${style["img-block"]}`}
                    style={{
                      backgroundImage: `url(${DigitalDream.src})`,
                    }}
                  >
                    <h2 className={`${style["title"]}`}>COLLECT</h2>
                  </div>
                  <div className={`${style["content-block"]}`}>
                    <h6>
                      OWN <span>your</span> DIGITAL DREAM CARS
                    </h6>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article
                  className={`${style["nft-car-cards"]} ${style["yellow-card"]}`}
                >
                  <div
                    className={`${style["img-block"]}`}
                    style={{
                      backgroundImage: `url(${ActionPacked.src})`,
                    }}
                  >
                    <h2 className={`${style["title"]}`}>RACE</h2>
                  </div>
                  <div className={`${style["content-block"]}`}>
                    <h6>
                      <span>Compete for the</span> TOP <span>places in</span>{" "}
                      ACTION-PACKED <span>races</span>
                    </h6>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article
                  className={`${style["nft-car-cards"]} ${style["green-card"]}`}
                >
                  <div
                    className={`${style["img-block"]}`}
                    style={{
                      backgroundImage: `url(${EarnReward.src})`,
                    }}
                  >
                    <h2 className={`${style["title"]}`}>EARN</h2>
                  </div>
                  <div className={`${style["content-block"]}`}>
                    <h6>
                      <span>Race Your Way To Victory & </span>WIN BIG REWARDS!
                    </h6>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article
                  className={`${style["nft-car-cards"]} ${style["blue-card"]}`}
                >
                  <div
                    className={`${style["img-block"]}`}
                    style={{
                      backgroundImage: `url(${LevelImage.src})`,
                    }}
                  >
                    <h2 className={`${style["title"]}`}>UPGRADE</h2>
                  </div>
                  <div className={`${style["content-block"]}`}>
                    <h6>
                      <span>Level Up Your Car to </span> BOOST ITS PERFORMANCE &
                      VISUALS!
                    </h6>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article
                  className={`${style["nft-car-cards"]} ${style["orange-card"]}`}
                >
                  <div
                    className={`${style["img-block"]}`}
                    style={{
                      backgroundImage: `url(${TradeImage.src})`,
                    }}
                  >
                    <h2 className={`${style["title"]}`}>TRADE</h2>
                  </div>
                  <div className={`${style["content-block"]}`}>
                    <h6>
                      <span>Explore Exciting Options To </span> TRADE YOUR CAR
                      NFTS!
                    </h6>
                  </div>
                </article>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SensationalNftCar;
