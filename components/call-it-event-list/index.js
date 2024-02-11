import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";

import RecentSoldLoader from "../loaders/recentSoldCardLoader";
import { liveAuctionNFTsApi } from "../../utils/methods";

import images from "../../utils/images.json";

import style from "./style.module.scss";
import { Autoplay, Keyboard, Mousewheel, Navigation, Pagination } from "swiper";
import { toast } from "react-toastify";
import useWindowUtils from "../../hooks/useWindowUtils";
import RaddxNFTCard from "../raddx/nft-card";
import { eventApi } from "../../utils/base-call-it-methods";
import CallitCard from "./call-it-card";
const EventsList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState("");
  const [handle, setHandle] = useState(false);
  const [slideChange, setSlideChange] = useState(false);

  const swiperRef = useRef();

  useEffect(() => {
    EventsList(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (swiperRef?.current?.swiper?.isBeginning) setDisable("left");
    if (swiperRef?.current?.swiper?.isEnd) setDisable("right");
    else setDisable("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, handle, slideChange]);

  const EventsList = async () => {
    try {
      setLoading(true);
      let response = await eventApi();

      setList(response?.data?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(
        "The request could not be processed at this time. Please try again."
      );
    }
  };

  return (
    <>
      {list?.length > 0 ? (
        <>
          <section
            className={`${style["jt-callit-event-nfts-section"]} jt-callit-event-nfts-section`}
          >
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className={style["content-center"]}>
                    {/* <h4>Discover ✦</h4> */}
                    <h1>EVENTS</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12"></div>
              </div>

              <div className="row">
                {!loading ? (
                  <div className="col-sm-12">
                    {list?.length > 0 ? (
                      <div
                        className={`${style["swiper-block"]} callit-swiper-block`}
                      >
                        <Swiper
                          ref={swiperRef}
                          spaceBetween={20}
                          // modules={[Navigation]}
                          // cssMode={true}
                          // mousewheel={true}
                          // keyboard={true}
                          modules={[
                            Pagination,
                            Navigation,
                            // Mousewheel,
                            Keyboard,
                            Autoplay,
                          ]}
                          pagination={{ dynamicBullets: true }}
                          breakpoints={{
                            320: {
                              slidesPerView: 1,
                            },
                            640: {
                              slidesPerView: 2,
                            },
                            991: {
                              slidesPerView: 3,
                            },
                            1200: {
                              slidesPerView: 4,
                            },
                          }}
                          autoplay={{
                            delay: 2000,
                            disableOnInteraction: true,
                          }}
                          speed={500}
                          loop
                          slidesPerView={1}
                          // uniqueNavElements
                        >
                          {list?.map((eventlist, i) => (
                            <SwiperSlide key={eventlist?.slug}>
                              <>
                                <>
                                  <CallitCard
                                    eventlist={eventlist}
                                    key={eventlist.slug}
                                  />
                                </>
                              </>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    ) : (
                      <>No Records Found!</>
                    )}
                  </div>
                ) : (
                  <RecentSoldLoader />
                )}
              </div>
            </div>
          </section>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default EventsList;
