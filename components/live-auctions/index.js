import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import style from "./style.module.scss";
import CollectionCard from "../nft-more/nft-card";
import styleSlider from "../nft-more/style.module.scss";
import { useRouter } from "next/router";
import images from "../../utils/images.json";
import Image from "next/image";
import { toast } from "react-toastify";
import { liveAuctionNFTsApi } from "../../utils/methods";
import RecentSoldLoader from "../loaders/recentSoldCardLoader";

const LiveAuctions = ({ data }) => {
  const router = useRouter();
  const [page] = useState(1);
  const [list, setList] = useState([]);
  const swiperRef = useRef();
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    liveAuctionNFTList(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const liveAuctionNFTList = async (page) => {
    try {
      setLoading(true);
      let response = await liveAuctionNFTsApi(page);
      setList([...list, ...response?.data?.data?.nfts]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(
        "The request could not be processed at this time. Please try again."
      );
    }
  };

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
      <section className={style["hot-collection-section"]}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div
                className={`${style["sec-heading"]} ${style["live-flex-box"]}`}
              >
                <span className="title">LIVE AUCTIONS</span>
                {list.length > 4 && (
                  <span
                    className={style["viewallBtnliveaction"]}
                    onClick={() => router.push("/nft-marketplace/live-auction")}
                  >
                    View all
                  </span>
                )}
              </div>
              {!loading ? (
                <div className="row">
                  {list.length > 0 ? (
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
                            key={`live-auction-${i}`}
                            nft={nft}
                            recentSold={false}
                            favouriteNFT={false}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="col-12 text-center">
                      <h3 className="my-3">
                        You&apos;ll Soon See A Live Auction NFTs!
                      </h3>
                    </div>
                  )}
                </div>
              ) : (
                <RecentSoldLoader />
              )}
            </div>
            <div className="col-sm-12">
              {list?.length > 0 && (
                <div className={style["carousel-btn-block"]}>
                  <button
                    className={`${style["arrow-btn"]}`}
                    onClick={() => handleNavigation("prev")}
                    disabled={
                      swiperRef?.current?.swiper?.isBeginning ||
                      typeof swiperRef?.current?.swiper?.isBeginning ===
                        "undefined"
                    }
                  >
                    <Image
                      unoptimized={true}
                      src={images.backArrow}
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
                      src={images.frontArrow}
                      width="40"
                      height="40"
                      alt="Arrow"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LiveAuctions;
