import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styleSlider from "../nft-more/style.module.scss";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Autoplay, Pagination } from "swiper";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

import { randomOrders } from "../../utils/methods";
import RareCollectionCard from "../rare-card/nft-card";
import NewImage from "../../utils/images.json";
import images from "../../utils/images-new.json";

import style from "./style.module.scss";
import useWindowUtils from "../../hooks/useWindowUtils";
import MobCarousel from "../mobile-carosel";
import { batPower, Nationality } from "../../utils/common";

const RareCollections = () => {
  const [page] = useState(1);
  const [list, setList] = useState([]);
  const [update, setUpdate] = useState(false);
  const swiperRef = useRef();
  const [loading, setLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slug, setSlug] = useState();
  const window = useWindowUtils();

  useEffect(() => {
    topTradesList(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const topTradesList = async (page, sort = "recently_sold") => {
    try {
      setLoading(true);
      let response = await randomOrders();
      setSlug(response?.data?.data?.nfts[0].slug);
      setList(response?.data?.data?.nfts);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(
        "The request could not be processed at this time. Please try again."
      );
    }
  };
  const callbackClick = (index) => {
    setSlug(list[index]?.slug);
    setActiveSlide(0);
    let newArray = [...list.slice(index), ...list.slice(0, index)];
    setList(newArray);
  };

  const handleNavigation = (direction = "") => {
    if (!direction || !swiperRef.current) return;
    if (direction === "next") {
      swiperRef.current.swiper.slideNext();
    } else {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const slideChange = (e) => {
    setSlug(list[e.realIndex]?.slug);
    if (e.realIndex === 0) setActiveSlide(list.length - 1);
    else setActiveSlide(e.realIndex - 1);
  };

  const NationalityData = Nationality(
    list[activeSlide]?.core_statistics?.nationality?.value
  );

  const batData = batPower(
    list[activeSlide]?.core_statistics?.twox_power?.value
  );

  return (
    <>
      <section
        className={`${style["rare-collection"]} rare-collection`}
        style={{ backgroundImage: `url(${images?.rare_bg})` }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className=" col-12 col-lg-6 offset-lg-6">
              <div className={style["content-left"]}>
                <h4>Hot-Selling NFTs ✦</h4>
                <h2>EXPLORE EXCLUSIVE COLLECTIONS ON OUR NFT MARKETPLACE</h2>
                <p>
                  Jump.trade brings you MCL Player and MCL Signed Bat NFTs that
                  are tradeable, collectible, and playable.
                  {/* <br />
                  <br />
                  The MCL Signed Bat NFTs contain signatures of legendary
                  cricketers like Sachin Tendulkar, Don Bradman, and many other
                  legends. */}
                </p>
              </div>
            </div>
          </div>
          {window.width > 991 ? (
            <>
              {list.length > 0 ? (
                <div className="row align-items-end">
                  <div className="col-12 col-lg-6">
                    <Link
                      legacyBehavior
                      href={`/nft-marketplace/details/${list[activeSlide]?.slug}`}
                    >
                      <div className={style["highlight-card"]}>
                        <div className={style["nft-card-info"]}>
                          <Image
                            unoptimized={true}
                            alt="Asset"
                            src={list[activeSlide]?.asset_url}
                            width="600"
                            height="600"
                            placeholder={"blur"}
                            blurDataURL={"/sample.gif"}
                          />

                          {list[activeSlide]?.core_statistics?.role?.value ===
                            "Bat" && (
                            <>
                              <div className={style["bat-type-2x"]}>
                                <Image
                                  unoptimized={true}
                                  src={batData?.value}
                                  alt="Trophy"
                                  width="200"
                                  height="200"
                                />
                              </div>
                            </>
                          )}

                          {/* <h4>{list[activeSlide]?.name.split("#")[0]}</h4> */}

                          {list[activeSlide]?.core_statistics?.role?.value !==
                          "Shot" ? (
                            <>
                              {" "}
                              <h5 className={style["rare-nft-title"]}>
                                {list[activeSlide]?.name.split("#")[0]}
                              </h5>
                              <h5 className={style["rare-nft-subtitle"]}>
                                #{list[activeSlide]?.name.split("#")[1]}
                              </h5>
                            </>
                          ) : (
                            <>
                              {" "}
                              <h5 className={style["rare-nft-title"]}>
                                {list[activeSlide]?.name}
                              </h5>
                            </>
                          )}
                        </div>

                        {list[activeSlide]?.core_statistics?.role?.value ===
                        "Bat" ? (
                          <div className={`${style["bat-card-details"]} `}>
                            <div
                              className={`${style["bat-card-set"]} ${style["category"]}`}
                            >
                              <Image
                                unoptimized={true}
                                alt="Bat-details"
                                src={images.card}
                                width="20"
                                height="20"
                              />
                              <div className={style["category-info"]}>
                                <h4>CATEGORY</h4>
                                <h2>
                                  <span>
                                    {
                                      list[activeSlide]?.core_statistics
                                        ?.category?.value
                                    }{" "}
                                  </span>
                                  {/* {list[activeSlide]?.signed_by[0].split(" ")[1]} */}
                                </h2>
                              </div>
                            </div>
                            {list[activeSlide]?.signed_by?.length && (
                              <div className={style["bat-card-set"]}>
                                <h4>SIGNED BY ✦</h4>
                                <h2>
                                  <span>
                                    {
                                      list[activeSlide]?.signed_by[0].split(
                                        " "
                                      )[0]
                                    }{" "}
                                  </span>
                                  {
                                    list[activeSlide]?.signed_by[0].split(
                                      " "
                                    )[1]
                                  }
                                </h2>
                              </div>
                            )}
                            {/* <a href="javascript:void(0);">
                        <CgPlayButtonO /> &nbsp; Watch Match moments
                      </a> */}
                          </div>
                        ) : (
                          <div className={style["player-details"]}>
                            {!["Shot", "Fusor"].includes(
                              list[activeSlide]?.core_statistics?.role?.value
                            ) ? (
                              <>
                                <div className={style["nft-details-row"]}>
                                  <div className={style["stats-col"]}>
                                    <div className={style["img-block"]}>
                                      <Image
                                        unoptimized={true}
                                        src={images.trophy}
                                        alt="Trophy"
                                        width="200"
                                        height="200"
                                      />
                                    </div>
                                    <div className={style["info-block"]}>
                                      <span className={style["highlight"]}>
                                        Rank
                                      </span>
                                      <span>
                                        {
                                          list[activeSlide]?.core_statistics
                                            ?.rank?.value
                                        }
                                        /{" "}
                                        {
                                          list[activeSlide]?.core_statistics
                                            .rank?.maximum
                                        }
                                      </span>
                                    </div>
                                  </div>

                                  <div className={style["stats-col"]}>
                                    <div className={style["img-block"]}>
                                      <Image
                                        unoptimized={true}
                                        src={images.star}
                                        alt="Star"
                                        width="200"
                                        height="200"
                                      />
                                    </div>
                                    <div className={style["info-block"]}>
                                      <span className={style["highlight"]}>
                                        Level
                                      </span>
                                      <span>
                                        {
                                          list[activeSlide]?.core_statistics
                                            ?.level?.value
                                        }
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                {"   "}
                                {!["Fusor"].includes(
                                  list[activeSlide]?.core_statistics?.role
                                    ?.value
                                ) && (
                                  <div className={style["nft-details-row"]}>
                                    <div className={style["stats-col"]}>
                                      <div className={style["img-block"]}>
                                        <Image
                                          unoptimized={true}
                                          src={NationalityData?.value}
                                          alt="Trophy"
                                          width="200"
                                          height="200"
                                        />
                                      </div>
                                      <div className={style["info-block"]}>
                                        <span className={style["highlight"]}>
                                          Nationality
                                        </span>
                                        <span>
                                          {
                                            list[activeSlide]?.core_statistics
                                              ?.nationality?.value
                                          }
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                            <div className={style["nft-details-row"]}>
                              {list[activeSlide]?.core_statistics?.role
                                ?.value !== "Shot" ? (
                                <>
                                  <div className={style["stats-col"]}>
                                    <div className={style["img-block"]}>
                                      {list[activeSlide]?.core_statistics?.role
                                        ?.value === "Bowler" && (
                                        <>
                                          <Image
                                            unoptimized={true}
                                            src={images.right_bowl}
                                            alt="Bowler"
                                            width="200"
                                            height="200"
                                          />
                                        </>
                                      )}
                                      {list[activeSlide]?.core_statistics?.role
                                        ?.value === "Batsman" && (
                                        <>
                                          {list[activeSlide]?.core_statistics
                                            ?.dominant_hand?.value === "RH" ? (
                                            <Image
                                              unoptimized={true}
                                              src={images.right}
                                              alt="Bowler"
                                              width="200"
                                              height="200"
                                            />
                                          ) : (
                                            <Image
                                              unoptimized={true}
                                              src={images.left}
                                              alt="Bowler"
                                              width="200"
                                              height="200"
                                            />
                                          )}
                                        </>
                                      )}
                                    </div>
                                    {!["Fusor"].includes(
                                      list[activeSlide]?.core_statistics?.role
                                        ?.value
                                    ) && (
                                      <div className={style["info-block"]}>
                                        <span className={style["highlight"]}>
                                          {
                                            list[activeSlide]?.core_statistics
                                              ?.role?.value
                                          }
                                        </span>
                                        <span>
                                          {list[activeSlide]?.core_statistics
                                            ?.role?.value === "Bowler"
                                            ? list[activeSlide]?.core_statistics
                                                ?.bowling_style?.value
                                            : list[activeSlide]?.core_statistics
                                                ?.dominant_hand?.value}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className={style["stats-col"]}>
                                    <div className={style["img-block"]}>
                                      {list[activeSlide]?.core_statistics?.role
                                        ?.value === "Shot" && (
                                        <>
                                          <Image
                                            unoptimized={true}
                                            src={images.hot_selling_calendar}
                                            alt="Bowler"
                                            width="200"
                                            height="200"
                                          />
                                        </>
                                      )}
                                    </div>
                                    <div className={style["info-block"]}>
                                      <span className={style["highlight"]}>
                                        Year
                                      </span>
                                      <span>
                                        {
                                          list[activeSlide]?.core_statistics
                                            ?.year?.value
                                        }
                                      </span>
                                    </div>
                                  </div>
                                </>
                              )}

                              <div className={style["stats-col"]}>
                                <div className={style["img-block"]}>
                                  <Image
                                    unoptimized={true}
                                    src={images.card}
                                    alt="card"
                                    width="200"
                                    height="200"
                                  />
                                </div>
                                <div className={style["info-block"]}>
                                  <span className={style["highlight"]}>
                                    Category
                                  </span>
                                  <span>
                                    {" "}
                                    {
                                      list[activeSlide]?.core_statistics
                                        ?.category?.value
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                  <div className="col-12 col-lg-6">
                    {list?.length > 0 && (
                      <>
                        <div className={`${style["navigation-btn-block"]}`}>
                          <button
                            className={`${style["theme-btn"]} ${style["rounded-bordered"]} ${style["swiper-prev"]}`}
                            onClick={() => handleNavigation("prev")}
                          >
                            <BsArrowLeft />
                          </button>
                          <button
                            className={`${style["theme-btn"]} ${style["rounded-bordered"]} ${style["swiper-next"]}`}
                            onClick={() => handleNavigation("next")}
                          >
                            <BsArrowRight />
                          </button>
                        </div>
                      </>
                    )}
                    <Swiper
                      className={`${styleSlider["hover-anim"]} recently-sold-swiper px-0`}
                      // slidesPerView={4}
                      ref={swiperRef}
                      loopAdditionalSlides={list.length}
                      modules={[Autoplay, Pagination]}
                      pagination={{
                        dynamicBullets: true,
                      }}
                      // autoplay={{
                      //   delay: 3000,
                      //   disableOnInteraction: false,
                      // }}
                      loop
                      onSlideChange={slideChange}
                      initialSlide={1}
                      // scrollbar={{ draggable: true }}
                      breakpoints={{
                        0: {
                          slidesPerView: 2,
                        },
                        375: {
                          slidesPerView: 2,
                        },
                        575: {
                          slidesPerView: 2,
                        },
                        768: {
                          slidesPerView: 3,
                        },
                        991: {
                          slidesPerView: 4,
                        },
                        1024: {
                          slidesPerView: 4,
                        },
                      }}
                    >
                      {list.map((nft, i) => (
                        <>
                          {" "}
                          <SwiperSlide key={nft?.slug}>
                            <RareCollectionCard
                              key={nft?.slug}
                              nft={nft}
                              index={i}
                              recentSold={false}
                              callbackClick={callbackClick}
                              favouriteNFT={false}
                            />
                          </SwiperSlide>
                        </>
                      ))}
                    </Swiper>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-12 text-center">
                    <h3 className="my-3">
                      You&apos;ll Soon See A Live Auction NFTs!
                    </h3>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="row ">
              <div className="col-12 col-lg-6">
                {list.length > 0 ? (
                  <Swiper
                    className={`${styleSlider["hover-anim"]} recently-sold-swiper px-0`}
                    slidesPerView={1}
                    modules={[Autoplay, Pagination]}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      dynamicBullets: true,
                    }}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },

                      700: {
                        slidesPerView: 2,
                      },
                    }}
                  >
                    {list.map((nft, i) => (
                      <>
                        {" "}
                        <SwiperSlide key={nft?.slug}>
                          <MobCarousel key={nft?.slug} list={nft} />
                        </SwiperSlide>
                      </>
                    ))}
                  </Swiper>
                ) : (
                  <h3 className="my-3 text-center">
                    You&apos;ll Soon See A Live Auction NFTs!
                  </h3>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default RareCollections;
