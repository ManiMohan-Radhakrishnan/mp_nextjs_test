import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dropdown } from "react-bootstrap";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import { BiCaretDown } from "react-icons/bi";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaCheckCircle } from "react-icons/fa";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

import RecentSoldLoader from "../loaders/recentSoldCardLoader";
import {
  liveAuctionNFTsApi,
  nftRecentlySoldApi,
  nftShowAllApi,
  randomOrders,
} from "../../utils/methods";
import {
  getHomePageRentalPlayers,
  getRentalBats,
  getRentalNfts,
} from "../../utils/base-methods";
import useWindowUtils from "../../hooks/useWindowUtils";

import NFTCard from "../nft-card";
import RaddxNFTCard from "../raddx/nft-card";
import HurleyNFTCard from "../hurley/nft-card";
import TrendingRentalCard from "../trending-rental-card";

import images from "../../utils/images.json";

import style from "./style.module.scss";
const HotAndTrendings = () => {
  const router = useRouter();
  const window = useWindowUtils();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = router.query;
  const [category, setCategory] = useState("");
  const [disable, setDisable] = useState("");
  const [handle, setHandle] = useState(false);
  const { width: innerWidth } = window;
  const [slideChange, setSlideChange] = useState(false);
  const [rentalNftType, setRentalNftType] = useState("");
  const [playerType, setPlayerType] = useState("");

  const [filter, setFilter] = useState([
    {
      name: "Live Auction",
      checked: true,
    },
    {
      name: "Listed NFTs",
      checked: false,
    },
    {
      name: "Rental",
      checked: false,
    },
  ]);

  const swiperRef = useRef();

  const handleNavigation = (direction = "") => {
    setHandle(!handle);
    if (!direction || !swiperRef.current) return;
    if (direction === "next") swiperRef.current.swiper.slideNext();
    else swiperRef.current.swiper.slidePrev();
  };

  useEffect(() => {
    liveAuctionNFTList(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (swiperRef?.current?.swiper?.isBeginning) setDisable("left");
    if (swiperRef?.current?.swiper?.isEnd) setDisable("right");
    else setDisable("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, handle, slideChange]);

  const liveAuctionNFTList = async (action = false) => {
    try {
      setLoading(true);
      let response = await liveAuctionNFTsApi();
      if (response?.data?.data?.nfts.length === 0 && !action) {
        setFilter(
          filter.map((item) => {
            return {
              ...item,
              checked: item.name === "Listed NFTs" ? true : false,
            };
          })
        );
        topTradesList();
      } else {
        setCategory("Live Auction");
        setList(response?.data?.data?.nfts);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(
        "The request could not be processed at this time. Please try again."
      );
    }
  };
  const recentlySold = async () => {
    try {
      setLoading(true);
      let response = await nftRecentlySoldApi();
      setList(response?.data?.data?.nfts);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(
        "The request could not be processed at this time. Please try again."
      );
    }
  };

  const topTradesList = async () => {
    try {
      setLoading(true);
      let response = await randomOrders();
      setList(response?.data?.data?.nfts);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(
        "The request could not be processed at this time. Please try again."
      );
    }
  };

  const showAllFilteredNFTs = async (
    page = 1,
    sort = "recently_listed",
    filterType
  ) => {
    try {
      let filter = {
        nft_category: [filterType],
      };

      page === 1 && setLoading(true);
      let response = await nftShowAllApi({
        page,
        per_page: 21,
        filter,
        sort: sort === "relevance" ? null : sort,
      });
      setList(response.data.data.nfts);
      page === 1 && setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const ShowAllSort = forwardRef(({ onClick }, ref) => (
    <div
      className={`${style["dropdown-name"]}`}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {filter.find((obj) => obj.checked === true)?.name &&
        `${filter.find((obj) => obj.checked === true).name}`}
      <BiCaretDown />
    </div>
  ));

  ShowAllSort.displayName = "ShowAllSort";

  const handleFilterCheck = (
    obj,
    rentalNftType = "players",
    type = "Batsman"
  ) => {
    setFilter(
      filter.map((item) => {
        return { ...item, checked: item.name === obj ? true : false };
      })
    );

    if (obj === "Live Auction") liveAuctionNFTList(true);
    else if (obj === "Rental") {
      setCategory("");
      if (rentalNftType === "players") {
        if (type === "Batsman") {
          let value = { nftType: "players", role: "Batsman" };
          setRentalNftType("players");
          setPlayerType("Batsman");
          handlePlayerRentalNfts(value);
        }
        if (type === "Bowler") {
          setRentalNftType("players");
          setPlayerType("Bowler");
          let value = { nftType: "players", role: "Bowler" };
          handlePlayerRentalNfts(value);
        }
      }
      if (rentalNftType === "bats") {
        setPlayerType("Bats");
        setRentalNftType("bats");
        handleBatRentalNfts(rentalNftType);
      }
    } else {
      setCategory("");
      topTradesList();
    }
  };

  const handlePlayerRentalNfts = async (value) => {
    try {
      setLoading(true);
      const result = await getHomePageRentalPlayers(value || "");

      const finalResult = [];
      const rentAvailableCount = result?.data?.data?.players?.filter(
        (item) => item?.rent_available > 0
      );
      const rentAvailableZero = result?.data?.data?.players?.filter(
        (item) => item?.rent_available === 0
      );
      finalResult.push(...rentAvailableCount);
      finalResult.push(...rentAvailableZero);
      setList(finalResult);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setList([]);
      console.log("🚀 ~ file: index.js:184 ~ handleRentalNfts ~ err:", err);
    }
  };

  const handleBatRentalNfts = async (value) => {
    try {
      setLoading(true);
      const result = await getRentalBats(value || "");
      const finalBats = [];
      const rentAvailableBats = result?.data?.data?.bats?.filter(
        (item) => item?.rent_available > 0
      );
      const rentAvailableZero = result?.data?.data?.bats.filter(
        (item) => item?.rent_available === 0
      );
      finalBats.push(...rentAvailableBats);
      finalBats.push(...rentAvailableZero);
      setList(finalBats);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setList([]);
      console.log("🚀 ~ file: index.js:212 ~ handleBatRentalNfts ~ err:", err);
    }
  };

  return (
    <>
      <section
        className={`${style["jt-discover-nfts-section"]} jt-discover-nfts-section`}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className={style["content-center"]}>
                {/* <h4>Discover ✦</h4> */}
                <h1>HOT &amp; TRENDING NFTs</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              {/* {innerWidth > 767 ? (
                <>
                  <div className={`${style["discover-btn-block"]}`}>
                    <div className={`${style["filter-btn-block"]}`}>
                      <button
                        onClick={handleClick}
                        className={`${style["theme-btn"]} ${
                          style["rounded-bordered"]
                        } ${
                          style[category === "Live Auction" ? "active" : ""]
                        }`}
                      >
                        <span>Live Auction</span>
                      </button>
                      <button
                        onClick={handleClick}
                        className={`${style["theme-btn"]} ${
                          style["rounded-bordered"]
                        } ${style[category === "Sold" ? "active" : ""]}`}
                      >
                        <span>Sold</span>
                      </button>
                      <button
                        onClick={handleClick}
                        className={`${style["theme-btn"]} ${
                          style["rounded-bordered"]
                        } ${style[category === "Batsman" ? "active" : ""]}`}
                      >
                        <span>Batsman</span>
                      </button>
                      <button
                        onClick={handleClick}
                        className={`${style["theme-btn"]} ${
                          style["rounded-bordered"]
                        } ${style[category === "Bowler" ? "active" : ""]}`}
                      >
                        <span>Bowler</span>
                      </button>
                      <button
                        onClick={handleClick}
                        className={`${style["theme-btn"]} ${
                          style["rounded-bordered"]
                        } ${style[category === "Bat" ? "active" : ""]}`}
                      >
                        <span>Bat</span>
                      </button>
                      <button
                        onClick={handleClick}
                        className={`${style["theme-btn"]} ${
                          style["rounded-bordered"]
                        } ${style[category === "Shot" ? "active" : ""]}`}
                      >
                        <span>Shot</span>
                      </button>
                      <button
                        onClick={handleClick}
                        className={`${style["theme-btn"]} ${
                          style["rounded-bordered"]
                        } ${style[category === "Fusor" ? "active" : ""]}`}
                      >
                        <span>Fusor</span>
                      </button>
                    </div>
                    {list?.length > 0 && (
                      <div className={`${style["navigation-btn-block"]}`}>
                        <button
                          className={`${style["theme-btn"]} ${style["rounded-bordered"]} ${style["swiper-prev"]}`}
                          onClick={() => handleNavigation("prev")}
                          disabled={
                            swiperRef?.current?.swiper?.isBeginning ||
                            typeof swiperRef?.current?.swiper?.isBeginning ===
                              "undefined"
                          }
                        >
                          <BsArrowLeft />
                        </button>
                        <button
                          className={`${style["theme-btn"]} ${style["rounded-bordered"]} ${style["swiper-next"]}`}
                          onClick={() => handleNavigation("next")}
                          disabled={swiperRef?.current?.swiper?.isEnd}
                        >
                          <BsArrowRight />
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Dropdown className={`${style["dropdown-list"]} dropdown-list`}>
                  <Dropdown.Toggle
                    align="start"
                    drop="start"
                    as={ShowAllSort}
                  ></Dropdown.Toggle>

                  <Dropdown.Menu
                    align="start"
                    className={style["dropdown-menu"]}
                  >
                    {filter.map((obj, i) => (
                      <Dropdown.Item
                        key={`nft${i}`}
                        as="button"
                        onClick={() => {
                          handleFilterCheck(obj?.name);
                          setCategory(obj?.name);
                        }}
                      >
                        {obj.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )} */}
              <div className={`${style["discover-btn-block"]}`}>
                <div className={`${style["filter-btn-block"]}`}>
                  {filter?.map((item, index) => (
                    <>
                      <button
                        key={index}
                        onClick={() => handleFilterCheck(item?.name)}
                        className={`${style["theme-btn"]} ${
                          style["rounded-bordered"]
                        } ${style[item.checked ? "active" : ""]}`}
                      >
                        <span>{item.name}</span>
                      </button>
                    </>
                  ))}
                </div>
                <div className={`${style["filter-btn-block"]} mt-5`}>
                  {filter?.map((item, index) => (
                    <>
                      {item?.name === "Rental" && item?.checked && (
                        <div
                          className={`${style["discover-top-btn-block"]} ${style["mcl"]}`}
                        >
                          <div className={`${style["filter-btn-block"]}`}>
                            <button
                              onClick={() => {
                                handleFilterCheck(
                                  "Rental",
                                  "players",
                                  "Batsman"
                                );
                              }}
                              className={`${style["top-btn"]} ${style["mcl"]} ${
                                style[
                                  rentalNftType === "players" &&
                                  playerType === "Batsman"
                                    ? "active"
                                    : ""
                                ]
                              }`}
                            >
                              Batsman
                            </button>
                            <button
                              onClick={() => {
                                handleFilterCheck(
                                  "Rental",
                                  "players",
                                  "Bowler"
                                );
                              }}
                              className={`${style["top-btn"]} ${style["mcl"]} ${
                                style[
                                  rentalNftType === "players" &&
                                  playerType === "Bowler"
                                    ? "active"
                                    : ""
                                ]
                              }`}
                            >
                              Bowler
                            </button>
                            <button
                              onClick={() => {
                                handleFilterCheck("Rental", "bats");
                              }}
                              className={`${style["top-btn"]} ${
                                style["raddx"]
                              } ${
                                style[
                                  rentalNftType === "bats" &&
                                  playerType === "Bats"
                                    ? "active"
                                    : ""
                                ]
                              }`}
                            >
                              Bat
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {!loading ? (
              <div className="col-sm-12">
                {list?.length > 0 ? (
                  <div className={`${style["swiper-block"]}`}>
                    {list?.length > 0 && (
                      <div className={`${style["navigation-btn-block"]}`}>
                        <button
                          className={` ${style["swiper-prev"]}`}
                          onClick={() => handleNavigation("prev")}
                          disabled={
                            swiperRef?.current?.swiper?.isBeginning ||
                            typeof swiperRef?.current?.swiper?.isBeginning ===
                              "undefined"
                          }
                        >
                          <MdArrowBackIosNew />
                        </button>
                        <button
                          className={` ${style["swiper-next"]}`}
                          onClick={() => handleNavigation("next")}
                          disabled={swiperRef?.current?.swiper?.isEnd}
                        >
                          <MdArrowForwardIos />
                        </button>
                      </div>
                    )}
                    <Swiper
                      ref={swiperRef}
                      spaceBetween={20}
                      // modules={[Navigation]}
                      cssMode={true}
                      mousewheel={true}
                      keyboard={true}
                      modules={[Pagination, Navigation, Mousewheel, Keyboard]}
                      pagination={{ dynamicBullets: true }}
                      onSlideChange={() => setSlideChange(!slideChange)}
                      initialSlide={0}
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
                    >
                      {list?.map((nft, i) => (
                        <SwiperSlide key={nft?.slug}>
                          {filter?.find((obj) => obj.checked === true).name ===
                          "Rental" ? (
                            <>
                              <TrendingRentalCard
                                details={nft}
                                player={playerType}
                              />
                            </>
                          ) : (
                            <>
                              {nft?.game_name === "mcl" ? (
                                <NFTCard
                                  nft={nft}
                                  key={nft.slug}
                                  imageUrl={"/sample.gif"}
                                  relativeUrl={`nft-marketplace`}
                                  recentSold={false}
                                  favouriteNFT={false}
                                />
                              ) : nft?.game_name === "raddx" ? (
                                <RaddxNFTCard
                                  nft={nft}
                                  key={nft.slug}
                                  imageUrl={"/sample.gif"}
                                  relativeUrl={`nft-marketplace`}
                                  recentSold={false}
                                  favouriteNFT={false}
                                />
                              ) : nft?.game_name === "hurley" ? (
                                <HurleyNFTCard
                                  nft={nft}
                                  key={nft.slug}
                                  imageUrl={"/sample.gif"}
                                  relativeUrl={`nft-marketplace`}
                                  recentSold={false}
                                  favouriteNFT={false}
                                />
                              ) : (
                                <NFTCard
                                  nft={nft}
                                  key={nft.slug}
                                  imageUrl={"/sample.gif"}
                                  relativeUrl={`nft-marketplace`}
                                  recentSold={false}
                                  favouriteNFT={false}
                                />
                              )}
                            </>
                          )}
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                ) : (
                  <div className="col-12 text-center">
                    <h3 className="my-3 py-5">
                      {category === "Live Auction"
                        ? `You'll Soon See A Live Auction NFTs!`
                        : `No Records Found!`}
                    </h3>
                  </div>
                )}
              </div>
            ) : (
              <RecentSoldLoader />
            )}
          </div>
          {list?.length > 4 && (
            <div className="row">
              <div className="col-sm-12 text-center">
                <button
                  className={`${style["theme-btn"]} ${style["rounded-bordered"]} ${style["view-all-btn"]} `}
                  onClick={(() => {
                    if (
                      filter?.find((obj) => obj.checked === true).name ===
                      "Live Auction"
                    )
                      return () => router.push("/nft-marketplace/live-auction");
                    // else if (
                    //   filter?.find((obj) => obj.checked === true).name ===
                    //   "Sold"
                    // )
                    //   return () => router.push("/nft-marketplace/sale-history");
                    else if (
                      filter?.find((obj) => obj.checked === true).name ===
                      "Rental"
                    ) {
                      if (playerType === "Bats") {
                        return () => router.push("/nft-rental?nftType=bats");
                      }
                      if (playerType === "Batsman") {
                        return () =>
                          (window.location.href =
                            "/nft-rental?nftType=players&q[role_in][]=Batsman");
                      }
                      if (playerType === "Bowler") {
                        return () =>
                          (window.location.href =
                            "/nft-rental?nftType=players&q[role_in][]=Bowler");
                      }
                    } else return () => router.push("/nft-marketplace");
                  })()}
                >
                  <span
                    onClick={(() => {
                      if (
                        filter?.find((obj) => obj.checked === true).name ===
                        "Live Auction"
                      )
                        return () =>
                          router.push("/nft-marketplace/live-auction");
                      else if (
                        filter?.find((obj) => obj.checked === true).name ===
                        "Rental"
                      ) {
                        if (playerType === "Bats") {
                          return () => router.push("/nft-rental?nftType=bats");
                        }
                        if (playerType === "Batsman") {
                          return () =>
                            (window.location.href =
                              "/nft-rental?nftType=players&q[role_in][]=Batsman");
                        }
                        if (playerType === "Bowler") {
                          return () =>
                            (window.location.href =
                              "/nft-rental?nftType=players&q[role_in][]=Bowler");
                        }
                      } else return () => router.push("/nft-marketplace");
                    })()}
                  >
                    {["Live Auction", "Rental"].includes(
                      filter?.find((obj) => obj.checked === true).name
                    )
                      ? "View All"
                      : "Explore Market"}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default HotAndTrendings;
