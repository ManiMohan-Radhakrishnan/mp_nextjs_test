import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { useCallback, useEffect, useRef, useState } from "react";

import style from "./style.module.scss";
import images from "../../utils/images.json";
import Video from "../video";

const VideoBlog = () => {
  const swiperRef = useRef();
  const [update, setUpdate] = useState(0);

  const handleNavigation = useCallback((direction = "") => {
    setUpdate(Math.random());
    if (!direction || !swiperRef.current) return;
    if (direction === "next") swiperRef.current.swiper.slideNext();
    else swiperRef.current.swiper.slidePrev();
  }, []);

  useEffect(() => {
    setUpdate(Math.random());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiperRef?.current?.swiper]);
  return (
    <>
      <section className={style["videoGallery"]}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h2>THE SPOTLIGHT</h2>
            </div>
          </div>
          <div className="row">
            <Swiper
              ref={swiperRef}
              className="owl-theme"
              slidesPerView={3}
              modules={[Navigation, Autoplay]}
              autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
              speed={500}
              onSlideChange={() => setUpdate(Math.random())}
              onReachEnd={() => setUpdate(Math.random())}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                600: {
                  slidesPerView: 2,
                },
                1000: {
                  slidesPerView: 3,
                },
              }}
            >
              <SwiperSlide>
                <div className={style["item"]}>
                  <Video
                    src={images.nftInvestment}
                    type={"video/mp4"}
                    poster={images.investmentimg}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={style["item"]}>
                  <Video
                    src={images.nftInvestor}
                    type={"video/mp4"}
                    poster={images.investorimg}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={style["item"]}>
                  <Video
                    src={images.women}
                    type={"video/mp4"}
                    poster={images.womenimg}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={style["item"]}>
                  <Video
                    src={images.badri}
                    type={"video/mp4"}
                    poster={images.badriimg}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={style["item"]}>
                  <Video
                    src={images.jp}
                    type={"video/mp4"}
                    poster={images.jpimg}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={style["item"]}>
                  <Video
                    src={images.mithali}
                    type={"video/mp4"}
                    poster={images.mithaliimg}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={style["item"]}>
                  <Video
                    src={images.harbajan}
                    type={"video/mp4"}
                    poster={images.harbajanimg}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={style["item"]}>
                  <Video
                    src={images.ben}
                    type={"video/mp4"}
                    poster={images.benimg}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={style["item"]}>
                  <Video
                    src={images.mills}
                    type={"video/mp4"}
                    poster={images.millsimg}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={style["item"]}>
                  <Video
                    src={images.jordan}
                    type={"video/mp4"}
                    poster={images.jordanimg}
                  />
                </div>
              </SwiperSlide>
            </Swiper>
            <div className={`${style["carousel-btn-block"]}`}>
              <button
                className={`${style["arrow-btn"]}`}
                onClick={() => handleNavigation("prev")}
                disabled={
                  swiperRef?.current?.swiper?.isBeginning ||
                  typeof swiperRef?.current?.swiper?.isBeginning === "undefined"
                }
              >
                <Image
                  unoptimized={true}
                  alt="Arrow"
                  src={images.backArrow}
                  width="200"
                  height="200"
                />
              </button>
              <button
                className={`${style["arrow-btn"]}`}
                onClick={() => handleNavigation("next")}
                disabled={swiperRef?.current?.swiper?.isEnd}
              >
                <Image
                  unoptimized={true}
                  alt="Arrow"
                  src={images.frontArrow}
                  width="200"
                  height="200"
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoBlog;
