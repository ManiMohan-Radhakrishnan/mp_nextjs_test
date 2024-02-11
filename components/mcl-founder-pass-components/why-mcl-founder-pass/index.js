import React, { useRef } from "react";
import Image from "next/image";
import useWindowSize from "../../../hooks/useWindowSize";
import mainHeading from "../../../images/drop/vip-pass/why-mcl-founder.png";
import mainHeadingMobile from "../../../images/drop/vip-pass/why-mcl-founder-mobile.png";
import WhyMclFounderMobileImg from "../../../images/drop/vip-pass/why-founder-pass-mobile.png";
import WhyMclFounderImg from "../../../images/drop/vip-pass/founder-pass-src.png";

import elitemainHeading from "../../../images/drop/vip-pass/elite-pass/elite-why-mcl-founder.png";
import elitemainHeadingMobile from "../../../images/drop/vip-pass/elite-pass/elite-why-mcl-founder-mobile.png";
import eliteWhyMclFounderMobileImg from "../../../images/drop/vip-pass/elite-pass/elite-why-founder-pass-mobile.png";
import eliteWhyMclFounderImg from "../../../images/drop/vip-pass/elite-pass/elite-founder-pass-src.png";

// import Swiper core and required modules
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import style from "./style.module.scss";
const WhyMclFounderPass = () => {
  const { width: windowWidth } = useWindowSize();
  const swiperRef = useRef();

  return (
    <>
      <Swiper
        ref={swiperRef}
        // install Swiper modules
        modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        // navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <section className={`${style["why-mcl-founder-pass-section"]}`}>
            <div className={`${style["why-mcl-founder-pass-block"]}`}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-12">
                    <div className={`${style["sec-header"]}`}>
                      {/* <h2>One identity across internet</h2> */}
                      <Image
                        unoptimized={true}
                        alt="mcl-pass"
                        src={`${
                          windowWidth > 767
                            ? mainHeading.src
                            : mainHeadingMobile.src
                        }`}
                        height={300}
                        width={1440}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row align-items-center">
                  <div className="col-sm-12">
                    <div className={`${style["img-block"]}`}>
                      <Image
                        unoptimized={true}
                        alt="mcl-pass"
                        src={`${
                          windowWidth > 767
                            ? WhyMclFounderImg.src
                            : WhyMclFounderMobileImg.src
                        }`}
                        height={500}
                        width={600}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className={`${style["why-mcl-founder-pass-section"]}`}>
            <div className={`${style["why-mcl-founder-pass-block"]}`}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-12">
                    <div className={`${style["sec-header"]}`}>
                      {/* <h2>One identity across internet</h2> */}
                      <Image
                        unoptimized={true}
                        alt="mcl-pass"
                        src={`${
                          windowWidth > 767
                            ? elitemainHeading.src
                            : elitemainHeadingMobile.src
                        }`}
                        height={300}
                        width={1440}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row align-items-center">
                  <div className="col-sm-12">
                    <div className={`${style["img-block"]}`}>
                      <Image
                        unoptimized={true}
                        alt="mcl-pass"
                        src={`${
                          windowWidth > 767
                            ? eliteWhyMclFounderImg.src
                            : eliteWhyMclFounderMobileImg.src
                        }`}
                        height={500}
                        width={600}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default WhyMclFounderPass;
