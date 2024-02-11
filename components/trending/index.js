import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";

import CollectionCard from "../nft-more/nft-card";
import styleSlider from "../nft-more/style.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import style from "./style.module.scss";
import images from "../../utils/images.json";

const Trending = ({ data }) => {
  const router = useRouter();
  const [list, setList] = useState(data?.data?.nfts || []);
  const [update, setUpdate] = useState(0);
  const swiperRef = useRef();

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
      {list.length >= 4 && (
        <section className={style["trending-section"]}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div
                  className={`${style["sec-heading"]} ${style["trending-heading"]}`}
                >
                  <span className={style["title"]}>WHAT&apos;S TRENDING</span>
                </div>

                <div className="row">
                  {list.length > 0 ? (
                    <>
                      <Swiper
                        className={`${styleSlider["hover-anim"]} recently-sold-swiper px-0`}
                        slidesPerView={4}
                        ref={swiperRef}
                        onSlideChange={() => setUpdate(Math.random())}
                        onReachEnd={() => setUpdate(Math.random())}
                        breakpoints={{
                          0: {
                            slidesPerView: 1,
                          },
                          575: {
                            slidesPerView: 2,
                          },
                          991: {
                            slidesPerView: 3,
                          },
                          1200: {
                            slidesPerView: 4,
                          },
                        }}
                      >
                        {list.map((nft, i) => (
                          <SwiperSlide key={`sider-${i}`}>
                            <CollectionCard
                              key={`trending-${i}`}
                              nft={nft}
                              recentSold={false}
                              favouriteNFT={false}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      {list.length > 4 && (
                        <span
                          className={`${style["viewallBtnliveaction"]} ${style["trend-btn"]}`}
                          onClick={() =>
                            router.push("/nft-marketplace/trending-nfts")
                          }
                        >
                          View all
                        </span>
                      )}
                    </>
                  ) : (
                    <div className="col-12 text-center">
                      <h3 className="my-3">
                        You&apos;ll Soon See A Trending NFTs!
                      </h3>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-sm-12">
                <div className={style["carousel-btn-block"]}>
                  <button
                    className={`${style["arrow-btn"]}`}
                    onClick={() => handleNavigation("prev")}
                    disabled={swiperRef?.current?.swiper?.isBeginning}
                  >
                    <Image
                      unoptimized={true}
                      src="https://cdn.guardianlink.io/product-hotspot/images/jump/jump-trade/back-arrow.png"
                      width="40"
                      height="40"
                      alt="Arrow"
                    />
                  </button>
                  <button
                    className={`${style["arrow-btn"]}`}
                    onClick={() => handleNavigation("next")}
                    disabled={swiperRef?.current?.swiper?.isEnd}
                  >
                    <Image
                      unoptimized={true}
                      src="https://cdn.guardianlink.io/product-hotspot/images/jump/jump-trade/front-arrow.png"
                      width="40"
                      height="40"
                      alt="Arrow"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Trending;
