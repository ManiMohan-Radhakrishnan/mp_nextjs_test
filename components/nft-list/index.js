import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, OverlayTrigger, Tooltip } from "react-bootstrap";

import style from "./style.module.scss";
import images from "../../utils/images.json";
import NFTCounter from "../nft-counter";
import { currencyFormat, Nationality, dateToSeconds } from "../../utils/common";
import { add_to_cart_thunk } from "../../redux/thunk/user_cart_thunk";
import { level, getRoleInfo, getPlayerCategoryInfo } from "../../utils/common";
import { FaShoppingCart } from "react-icons/fa";
import ToolTip from "../tooltip";
import { EVENT_NAMES, invokeTrackEvent } from "../../utils/track-events";
import { useRouter } from "next/router";

const NFTlistcard = ({
  keyValue,
  className,
  nft,
  ownedCard = false,
  recentSold = false,
  liveAuction = false,
  favouriteNFTs = false,
  onsale = false,
  textColor,
  reloadNFTList,
  faved = false,
}) => {
  const erc721 = nft?.nft_type === "erc721";
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => state);

  const [isAuctionStarted, setIsAuctionStarted] = useState(false);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [inCart, setInCart] = useState(false);

  const userSlug = user.data?.user ? user.data?.user?.slug : null;
  const userCart = cart?.data ? cart?.data : null;
  const [imageloaded, setImageLoaded] = useState(false);
  const router = useRouter();

  const isBundle = nft?.order_details?.bundle_id ? true : false;
  const otherUserBundle = nft?.bundle_id ? true : false;
  // console.log(nft?.order_details?.bundle_id + "Bundle-d");

  useEffect(() => {
    if (nft?.order_details?.timed_auction) {
      setIsAuctionStarted(
        new Date(nft?.time).getTime() >=
          new Date(nft?.order_details?.auction_start_time).getTime()
      );
      setIsAuctionEnded(
        new Date(nft?.time).getTime() >
          new Date(nft?.order_details?.auction_end_time).getTime()
      );
      setShowTimer(true);
    }

    if (onsale && nft?.timed_auction) {
      setIsAuctionStarted(
        new Date(nft?.time).getTime() >=
          new Date(nft?.auction_start_time).getTime()
      );
      setIsAuctionEnded(
        new Date(nft?.time).getTime() >
          new Date(nft?.auction_end_time).getTime()
      );
      setShowTimer(true);
    }

    if (favouriteNFTs && nft?.timed_auction) {
      setIsAuctionStarted(
        new Date(nft?.time).getTime() >=
          new Date(nft?.auction_start_time).getTime()
      );
      setIsAuctionEnded(
        new Date(nft?.time).getTime() >
          new Date(nft?.auction_end_time).getTime()
      );
      setShowTimer(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAuctionStartTimer = () => {
    setIsAuctionStarted(true);
    // setAuctionEndTime(nft?.order_details?.auction_end_time);
  };
  const handleAuctionEndTimer = () => {
    setIsAuctionEnded(true);
  };
  const handleNFTEndEvent = () => {
    if (liveAuction) {
      reloadNFTList();
    }
  };

  const levelData = level(nft?.core_statistics?.level?.value);

  const roleData = getRoleInfo(
    nft?.core_statistics?.role?.value,
    nft?.core_statistics?.dominant_hand?.value
      ? nft?.core_statistics?.dominant_hand?.value
      : "BAT"
  );

  const playerCatData = getPlayerCategoryInfo(
    nft?.core_statistics?.category?.value
  );

  const NationalityData = Nationality(nft?.core_statistics?.nationality?.value);

  useEffect(() => {
    if (userSlug) {
      const orderSlug = userCart?.line_items?.find(
        (obj) => obj.order_slug === nft?.order_details?.slug
      );
      if (orderSlug) {
        setInCart(true);
      } else {
        setInCart(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCart]);

  const KycPopOver = () => (
    <Popover>
      <Popover.Body>
        <p className="password-terms">
          Please complete your KYC process to be eligible for purchasing NFTs.
        </p>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <article
        className={`${style["nft-list-row-box"]} ${style["nft-list-items"]} ${style[className]} ${className}`}
      >
        <div className={`${style["nft-list-col-box"]}`}>{keyValue + 1}</div>

        <div className={`${style["nft-list-col-box"]}`}>
          <a
            href={(() => {
              if (recentSold) {
                return `/order/details/${nft?.slug}/${nft?.order_slug}`;
              } else {
                return `/nft-marketplace/details/${nft?.slug}`;
              }
            })()}
            className={`${style["nft-info"]}`}
          >
            <Image
              unoptimized={true}
              className={style["nft-img"]}
              width="300"
              height="300"
              priority={true}
              loading="eager"
              placeholder={"blur"}
              blurDataURL={"/sample.gif"}
              alt="media_logo"
              src={(() => {
                if (nft?.asset_type?.includes("image")) {
                  return nft.asset_url ? nft.asset_url : "/sample.gif";
                } else if (nft?.cover_url) {
                  return nft.cover_url ? nft.cover_url : "/sample.gif";
                } else {
                  return nft.asset_url ? nft.asset_url : "/sample.gif";
                }
              })()}
              role="button"
              onLoad={() => setImageLoaded(true)}
            />
            {/* </a>
        </div>
        <div className={`${style["nft-list-col-box"]}`}>
          <a
            href={(() => {
              if (recentSold) {
                return `/order/details/${nft?.slug}/${nft?.order_slug}`;
              } else {
                return `/nft-marketplace/details/${nft?.slug}`;
              }
            })()}
          > */}
            <div className={style["more-nft-title"]}>
              <span className={style["more-nft-name"]}>{nft?.name}</span>

              {nft?.signed_by?.length > 0 ? (
                <>
                  <h6 className={style["nft-signature"]}>
                    <span>Signed by </span> {nft?.signed_by[0]}{" "}
                    {nft?.signed_by?.length > 1 && (
                      <>&amp; {nft?.signed_by[1]}</>
                    )}
                  </h6>
                </>
              ) : (
                ""
              )}

              {isBundle && <h6 className={style["bundle-badge"]}>Bundle</h6>}
              {otherUserBundle && (
                <h6 className={style["bundle-badge"]}>Bundle</h6>
              )}
            </div>
          </a>
        </div>
        {/* <div className={`${style["nft-list-col-box"]}`}>
          {nft?.core_statistics?.rank?.value && (
            <span
              className={style["rank-title"]}
            >{`${nft?.core_statistics?.rank?.value}/${nft?.core_statistics?.rank?.maximum}`}</span>
          )}
        </div> */}
        {/* <div className={`${style["nft-list-col-box"]}`}>
          {playerCatData && (
            <div className={style["player-range"]}>
              <span className={style["band"]}>{playerCatData?.type}</span>
            </div>
          )}
        </div> */}
        {/* <div className={`${style["nft-list-col-box"]}`}>
          <article className={style["player_stats"]}>
            {roleData && (
              <div className={style["player-type"]}>
                <Image unoptimized={true}
                  width="300"
                  height="300"
                  loading="eager"
                  
                  src={roleData?.value}
                  alt="Player-type"
                  priority={true}
                  placeholder={"blur"}
                  blurDataURL={"/sample.gif"}
                />
              </div>
            )}
            {levelData && (
              <div className={style["player-level"]}>
                <Image unoptimized={true}
                  width="300"
                  height="300"
                  
                  src={levelData?.value}
                  alt="Player-level"
                  priority={true}
                  placeholder={"blur"}
                  blurDataURL={"/sample.gif"}
                />
                <h6>{levelData?.name}</h6>
              </div>
            )}

            {NationalityData && (
              <div className={style["player-level"]}>
                <Image unoptimized={true}
                  width="300"
                  height="300"
                  
                  src={NationalityData?.value}
                  alt="Player-level"
                  priority={true}
                  placeholder={"blur"}
                  blurDataURL={"/sample.gif"}
                />
              </div>
            )}

            {nft?.core_statistics?.year?.value && (
              <div className={`${style["player-range"]} ${style["yearshow"]}`}>
                <h6 className={style["year"]}>
                  {nft?.core_statistics?.year?.value}
                </h6>
                <span className={style["band"]}> Year</span>
              </div>
            )}
          </article>
        </div> */}
        <div className={`${style["nft-list-col-box"]}`}>
          {/* <a
            href={(() => {
              if (recentSold) {
                return `/order/details/${nft?.slug}/${nft?.order_slug}`;
              } else {
                return `/nft-marketplace/details/${nft?.slug}`;
              }
            })()}
          > */}
          <div className={style["more-nft-ownername-info"]}>
            {nft?.owner_name && (
              <div
                className={`${style["more-nft-desc"]} ${style["owner-name"]}`}
                onClick={() => {
                  router.push(`/user/${nft?.owner_slug}/details`);
                }}
              >
                {nft?.owner_name}
              </div>
            )}
            {recentSold && nft?.buyer?.user_name && (
              <div className={style["more-nft-desc"]}>
                {nft?.buyer?.user_name}
              </div>
            )}
          </div>
          {/* </a> */}
        </div>
        {/* Buy Flow */}
        <div className={`${style["nft-list-col-box"]}`}>
          <a
            href={(() => {
              if (recentSold) {
                return `/order/details/${nft?.slug}/${nft?.order_slug}`;
              } else {
                return `/nft-marketplace/details/${nft?.slug}`;
              }
            })()}
          >
            {nft?.is_on_sale && (
              <>
                <div
                  className={style["more-bid-details"]}
                  style={{ color: textColor }}
                >
                  {/* {(() => {
                  if (erc721) {
                    return nft?.order_details?.is_bid
                      ? ""
                      : currencyFormat(nft?.order_details?.buy_amount, "USD");
                  } else {
                    return currencyFormat(nft?.buy_amount, "USD");
                  }
                })()}
                {erc721 &&
                  nft?.order_details?.is_bid &&
                  nft?.order_details?.is_buy &&
                  currencyFormat(nft?.order_details?.buy_amount, "USD")} */}
                  {(() => {
                    if (erc721) {
                      if (
                        nft?.order_details?.is_bid &&
                        nft?.order_details?.is_buy
                      ) {
                        return currencyFormat(
                          nft?.order_details?.buy_amount,
                          "USD"
                        );
                      } else if (nft?.order_details?.is_bid) {
                        return "---";
                      } else if (nft?.order_details?.is_buy) {
                        return currencyFormat(
                          nft?.order_details?.buy_amount,
                          "USD"
                        );
                      } else {
                        return "---";
                      }
                    }
                  })()}
                </div>
              </>
            )}
            {onsale && (
              <>
                <div className={style["more-bid-details"]}>
                  {/* {(() => {
                  if (erc721) {
                    return nft?.is_bid
                      ? "---"
                      : currencyFormat(nft?.buy_amount, "USD");
                  } else {
                    return currencyFormat(nft?.buy_amount, "USD");
                  }
                })()}

                {erc721 &&
                  nft?.is_bid &&
                  nft?.is_buy &&
                  currencyFormat(nft?.buy_amount, "USD")} */}

                  {(() => {
                    if (erc721) {
                      if (nft?.is_bid && nft?.is_buy) {
                        return currencyFormat(nft?.buy_amount, "USD");
                      } else if (nft?.is_bid) {
                        return "---";
                      } else if (nft?.is_buy) {
                        return currencyFormat(nft?.buy_amount, "USD");
                      } else {
                        return "---";
                      }
                    }
                  })()}
                </div>
              </>
            )}
            {ownedCard && nft?.quantity && (
              <>
                <div className={style["more-bid-details"]}>
                  <div className="text-start"></div>
                  <div className="text-end">
                    <div className={`${style["mb-title"]} text-secondary`}>
                      Owned
                    </div>
                    <div className={style["mb-value"]}>{nft?.quantity}</div>
                  </div>
                </div>
              </>
            )}
            {recentSold && (
              <>
                <div className={style["more-bid-details"]}>
                  <div className="text-start">
                    <div className={`${style["mb-title"]} text-secondary`}>
                      Sold For
                    </div>
                    <div className={style["mb-value"]}>
                      {currencyFormat(nft?.amount, "USD")}
                    </div>
                  </div>
                  <div className="text-end">
                    <div className={`${style["mb-title"]} text-secondary`}>
                      Sold On
                    </div>
                    <div className={style["mb-value"]}>
                      {dayjs(nft?.created_at).format("MMM D, YYYY hh:mm A")}
                    </div>
                  </div>
                </div>
              </>
            )}{" "}
            {favouriteNFTs && (
              <>
                <div className={style["more-bid-details"]}>
                  {/* {(() => {
                  if (erc721) {
                    return nft?.is_bid
                      ? "---"
                      : currencyFormat(nft?.buy_amount, "USD");
                  } else {
                    return currencyFormat(nft?.buy_amount, "USD");
                  }
                })()}

                {erc721 &&
                  nft?.is_bid &&
                  nft?.is_buy &&
                  currencyFormat(nft?.buy_amount, "USD")} */}
                  {(() => {
                    if (erc721) {
                      if (nft?.is_bid && nft?.is_buy) {
                        return currencyFormat(nft?.buy_amount, "USD");
                      } else if (nft?.is_bid) {
                        return "---";
                      } else if (nft?.is_buy) {
                        return currencyFormat(nft?.buy_amount, "USD");
                      } else {
                        return "---";
                      }
                    }
                  })()}
                </div>
              </>
            )}{" "}
            {!onsale &&
              !nft.is_on_sale &&
              !recentSold &&
              !ownedCard &&
              !faved && (
                <>
                  <div className={style["empty-space"]}>
                    Not listed for sale
                  </div>
                </>
              )}
          </a>
        </div>
        {/* Bid Flow */}
        <div className={`${style["nft-list-col-box"]}`}>
          <a
            href={(() => {
              if (recentSold) {
                return `/order/details/${nft?.slug}/${nft?.order_slug}`;
              } else {
                return `/nft-marketplace/details/${nft?.slug}`;
              }
            })()}
          >
            {nft?.is_on_sale && (
              <>
                <div className={style["more-bid-details"]}>
                  {(() => {
                    if (erc721) {
                      return nft?.order_details?.is_bid
                        ? currencyFormat(
                            nft?.order_details?.top_bid
                              ? nft?.order_details?.top_bid
                              : nft?.order_details?.minimum_bid,
                            "USD"
                          )
                        : "---";
                    }
                  })()}
                </div>
              </>
            )}
            {onsale && (
              <>
                {(() => {
                  if (erc721) {
                    return nft?.is_bid
                      ? currencyFormat(
                          nft?.top_bid ? nft?.top_bid : nft?.minimum_bid,
                          "USD"
                        )
                      : "---";
                  }
                })()}
              </>
            )}
            {ownedCard && nft?.quantity && (
              <>
                <div className={style["more-bid-details"]}>
                  <div className="text-end">
                    <div className={`${style["mb-title"]} text-secondary`}>
                      Owned
                    </div>
                    <div className={style["mb-value"]}>{nft?.quantity}</div>
                  </div>
                </div>
              </>
            )}
            {favouriteNFTs && (
              <>
                {(() => {
                  if (erc721) {
                    return nft?.is_bid
                      ? currencyFormat(
                          nft?.top_bid ? nft?.top_bid : nft?.minimum_bid,
                          "USD"
                        )
                      : "---";
                  }
                })()}
              </>
            )}{" "}
            {!onsale &&
              !nft.is_on_sale &&
              !recentSold &&
              !ownedCard &&
              !faved && (
                <>
                  <div className={style["empty-space"]}>
                    Not listed for sale
                  </div>
                </>
              )}
          </a>
        </div>
        {/* Bid Flow Timer*/}
        <div className={`${style["nft-list-col-box"]}`}>
          <a
            href={(() => {
              if (recentSold) {
                return `/order/details/${nft?.slug}/${nft?.order_slug}`;
              } else {
                return `/nft-marketplace/details/${nft?.slug}`;
              }
            })()}
          >
            {nft?.is_on_sale && (
              <>
                {nft?.order_details?.timed_auction
                  ? nft?.order_details?.is_bid && (
                      <>
                        {showTimer && (
                          <>
                            {!isAuctionStarted && !isAuctionEnded && (
                              <div className={style["time-counter-box"]}>
                                <span
                                  className={`${style["time-counter-card"]} ${style["startsin"]}`}
                                >
                                  {/* <img src={startin} alt="startin" /> */}
                                  <span className={style["time-title"]}>
                                    Starts
                                  </span>
                                  <NFTCounter
                                    time={
                                      nft?.order_details?.auction_start_time
                                    }
                                    cTime={nft?.time}
                                    timeClass="font-onerem"
                                    intervalClass="font-psevenrem"
                                    intervalGapClass="me-1"
                                    handleEndEvent={handleAuctionStartTimer}
                                  />
                                </span>
                              </div>
                            )}
                            {!isAuctionEnded && isAuctionStarted && (
                              <div className={style["time-counter-box"]}>
                                <span className={style["time-counter-card"]}>
                                  {/* <img src={endsin} alt="endsin" /> */}

                                  <span className={style["time-title"]}>
                                    Ends
                                  </span>
                                  <NFTCounter
                                    time={nft?.order_details?.auction_end_time}
                                    cTime={nft?.time}
                                    timeClass="font-onerem"
                                    intervalClass="font-psevenrem"
                                    intervalGapClass="me-1"
                                    handleEndEvent={handleAuctionEndTimer}
                                  />
                                </span>
                              </div>
                            )}
                          </>
                        )}

                        {dateToSeconds(nft?.order_details?.auction_end_time) <
                        dateToSeconds(Date()) ? (
                          <>
                            <span className={`${style["auction-timer"]}`}>
                              Auction has ended
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    )
                  : "---"}
              </>
            )}
            {onsale && (
              <>
                {nft?.timed_auction
                  ? nft?.is_bid && (
                      <>
                        {showTimer && (
                          <>
                            {!isAuctionStarted && !isAuctionEnded && (
                              <div className={style["time-counter-box"]}>
                                <span
                                  className={`${style["time-counter-card"]} ${style["startsin"]}`}
                                >
                                  <span className={style["time-title"]}>
                                    Starts
                                  </span>
                                  <NFTCounter
                                    time={nft?.auction_start_time}
                                    cTime={nft?.time}
                                    timeClass="font-onerem"
                                    intervalClass="font-psevenrem"
                                    intervalGapClass="me-1"
                                    handleEndEvent={handleAuctionStartTimer}
                                    handleNFTEndEvent={handleNFTEndEvent}
                                  />
                                </span>
                              </div>
                            )}
                            {!isAuctionEnded && isAuctionStarted && (
                              <div className={style["time-counter-box"]}>
                                <span className={style["time-counter-card"]}>
                                  <span className={style["time-title"]}>
                                    Ends
                                  </span>
                                  <NFTCounter
                                    time={nft?.auction_end_time}
                                    cTime={nft?.time}
                                    timeClass="font-onerem"
                                    intervalClass="font-psevenrem"
                                    intervalGapClass="me-1"
                                    handleEndEvent={handleAuctionEndTimer}
                                    handleNFTEndEvent={handleNFTEndEvent}
                                  />
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )
                  : "---"}
              </>
            )}
            {favouriteNFTs && (
              <>
                {nft?.timed_auction
                  ? nft?.is_bid && (
                      <>
                        {showTimer && (
                          <>
                            {!isAuctionStarted && !isAuctionEnded && (
                              <div className={style["time-counter-box"]}>
                                <span
                                  className={`${style["time-counter-card"]} ${style["startsin"]}`}
                                >
                                  <span className={style["time-title"]}>
                                    Starts
                                  </span>
                                  <NFTCounter
                                    time={nft?.auction_start_time}
                                    cTime={nft?.time}
                                    timeClass="font-onerem"
                                    intervalClass="font-psevenrem"
                                    intervalGapClass="me-1"
                                    handleEndEvent={handleAuctionStartTimer}
                                    handleNFTEndEvent={handleNFTEndEvent}
                                  />
                                </span>
                              </div>
                            )}
                            {!isAuctionEnded && isAuctionStarted && (
                              <div className={style["time-counter-box"]}>
                                <span className={style["time-counter-card"]}>
                                  {/* <img src={endsin} alt="endsin" /> */}
                                  <span className={style["time-title"]}>
                                    Ends
                                  </span>
                                  <NFTCounter
                                    time={nft?.auction_end_time}
                                    cTime={nft?.time}
                                    timeClass="font-onerem"
                                    intervalClass="font-psevenrem"
                                    intervalGapClass="me-1"
                                    handleEndEvent={handleAuctionEndTimer}
                                    handleNFTEndEvent={handleNFTEndEvent}
                                  />
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )
                  : "---"}
              </>
            )}{" "}
          </a>
        </div>

        <div className={`${style["nft-list-col-box"]}`}>
          {userSlug &&
            nft?.is_on_sale &&
            nft?.order_details?.is_buy &&
            nft?.owner_slug !== userSlug &&
            !isBundle &&
            !otherUserBundle && (
              <>
                {/* {user?.data?.user?.kyc_status !== "success" ? (
                  <OverlayTrigger
                    trigger={["click"]}
                    rootClose={true}
                    placement="top"
                    overlay={KycPopOver()}
                  >
                    <div className={style["cart_box"]}>
                      <div
                        className={`${style["svg_size"]} ${style["cart_icon"]}`}
                      ></div>
                      <span className={style["cart_text"]}>Add</span>
                    </div>
                  </OverlayTrigger>
                ) : (
                  <div
                    className={`${style["cart_box"]} ${
                      inCart && style["add_cart"]
                    }`}
                    onClick={() => {
                      if (!inCart) {
                        dispatch(
                          add_to_cart_thunk(
                            nft?.order_details?.slug,
                            nft?.quantity
                          )
                        );
                      }
                    }}
                  >
                    <div
                      className={`${style["svg_size"]} ${style["cart_icon"]}`}
                    ></div>
                    <span className={style["cart_text"]}>
                      {!inCart ? "Add" : "Added"}
                    </span>
                  </div>
                )} */}

                {user?.data?.user?.kyc_status !== "success" ? (
                  <OverlayTrigger
                    trigger={["click"]}
                    rootClose={true}
                    placement="top"
                    overlay={KycPopOver()}
                  >
                    <div className={style["cart_box"]}>
                      <span className={style["cart_text"]}>
                        <FaShoppingCart />
                        {/* Add */}
                      </span>
                    </div>
                  </OverlayTrigger>
                ) : (
                  <div
                    className={`${style["cart_box"]} ${
                      inCart && style["add_cart"]
                    }`}
                    // onClick={() => {
                    //   if (!inCart) {
                    //     dispatch(
                    //       add_to_cart_thunk(
                    //         nft?.order_details?.slug,
                    //         nft?.quantity
                    //       )
                    //     );
                    //   }
                    // }}
                    onClick={() => {
                      if (!inCart) {
                        invokeTrackEvent(EVENT_NAMES?.ADDED_TO_CART, {
                          name: nft?.name,
                          ownedBy: nft?.owner_name,
                          Role: nft?.core_statistics?.role?.value,
                          Level: nft?.core_statistics?.level?.value
                            ? parseInt(nft?.core_statistics?.level?.value)
                            : null,
                          category: nft?.core_statistics?.category?.value,
                          "End of Auction": nft?.order_details?.auction_end_time
                            ? new Date(nft?.order_details?.auction_end_time)
                            : null,
                          "Start of Auction": nft?.order_details
                            ?.auction_start_time
                            ? new Date(nft?.order_details?.auction_start_time)
                            : null,
                        });
                        dispatch(
                          add_to_cart_thunk(
                            nft?.order_details?.slug,
                            nft?.quantity
                          )
                        );
                      }
                    }}
                  >
                    <span className={style["cart_text"]}>
                      {/* <FaShoppingCart /> */}

                      <ToolTip
                        icon={
                          <FaShoppingCart size={16} className="check-icon" />
                        }
                        content={`${!inCart ? "Add to cart" : "Added to cart"}`}
                        placement="left"
                      />
                      {/* {!inCart ? "Add" : "Added"} */}
                    </span>
                  </div>
                )}
              </>
            )}
        </div>
      </article>
    </>
  );
};

export default NFTlistcard;
