import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, OverlayTrigger } from "react-bootstrap";

import style from "./style.module.scss";
import images from "../../../utils/images.json";
import { BsFillTrophyFill } from "react-icons/bs";
import NFTCounter from "../../nft-counter";
import {
  currencyFormat,
  raddx_level,
  raddx_roles,
  raddx_category,
  raddx_car_category,
  dateToSeconds,
} from "../../../utils/common";
import { add_to_cart_thunk } from "../../../redux/thunk/user_cart_thunk";

const RaddxNFTCard = ({
  className,
  nft,
  ownedCard = false,
  recentSold = false,
  liveAuction = false,
  favouriteNFTs = false,
  onsale = false,
  textColor,
  reloadNFTList,
  isExplore = false,
  relativeUrl = "",
  searchPrefix = "",
  exploreSlug = "",
  isFaltoo = false,
  clientUrl = "",
  faved = false,
  imageUrl
}) => {
  const erc721 = nft?.nft_type === "erc721";
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => state);
  const isBundle = nft?.order_details?.bundle_id ? true : false;
  const otherUserBundle = nft?.bundle_id ? true : false;

  const [isAuctionStarted, setIsAuctionStarted] = useState(false);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [inCart, setInCart] = useState(false);

  const [imageNFTURL, setImageNFTURL] = useState("/sample.gif");

  const userSlug = user.data?.user ? user.data?.user?.slug : null;
  const userCart = cart?.data ? cart?.data : null;

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
  useEffect(()=>{
    if (nft?.asset_type?.includes("image")) {
          setImageNFTURL(nft.asset_url ? nft.asset_url : "/sample.gif");
        } else if (nft?.cover_url) {
          setImageNFTURL(nft.cover_url ? nft.cover_url : "/sample.gif")
        } else {
          setImageNFTURL(nft.asset_url ? nft.asset_url : "/sample.gif");
        }
  },[nft])

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
  const rank = nft?.core_statistics?.rank?.value;
  const levelData = raddx_level(nft?.core_statistics?.level?.value);

  const roleData = raddx_roles(nft?.core_statistics?.role?.value);

  const category = raddx_category(nft?.core_statistics?.category?.value);
  const car_category = raddx_car_category(
    nft?.core_statistics?.car_category?.value
  );

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
    <div
      className={`${style["more-card"]} ${style["raddx-card"]} ${
        style[isBundle ? "bundle" : ""]
      } ${style[otherUserBundle ? "bundle" : ""]}  ${style[className]}`}
      data-title="Bundle"
    >
      {rank && (
        // <span className={style["nft-type-badge-rank"]}>
        //   <span className={style["rank-title"]}>{`#${rank}`}</span>
        // </span>
        <span className={style["nft-type-badge-rank"]}>
          <span className={style["rank-title"]}>
            <BsFillTrophyFill /> {rank}
          </span>
        </span>
      )}
      <div className="position-relative">
        {nft?.is_on_sale && (
          <>
            {nft?.order_details?.is_bid &&
              nft?.order_details?.timed_auction && (
                <>
                  {showTimer && (
                    <>
                      {!isAuctionStarted && !isAuctionEnded && (
                        <div className={style["time-counter-box"]}>
                          <span
                            className={`${style["time-counter-card"]} ${style["startsin"]}`}
                          >
                            {/*<Image unoptimized={true} src={startin} alt="startin" /> */}
                            <span className={style["time-title"]}>Starts</span>
                            <NFTCounter
                              time={nft?.order_details?.auction_start_time}
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
                            {/*<Image unoptimized={true} src={endsin} alt="endsin" /> */}

                            <span className={style["time-title"]}>Ends</span>
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
                      <div className={style["time-counter-box"]}>
                        <span className={`${style["time-counter-card"]}`}>
                          Auction has ended
                        </span>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </>
              )}
          </>
        )}

        {onsale && (
          <>
            {nft?.is_bid && nft?.timed_auction && (
              <>
                {showTimer && (
                  <>
                    {!isAuctionStarted && !isAuctionEnded && (
                      <div className={style["time-counter-box"]}>
                        <span
                          className={`${style["time-counter-card"]} ${style["startsin"]}`}
                        >
                          <span className={style["time-title"]}>Starts</span>
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
                          <span className={style["time-title"]}>Ends</span>
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
            )}
          </>
        )}

        {favouriteNFTs && (
          <>
            {nft?.is_bid && nft?.timed_auction && (
              <>
                {showTimer && (
                  <>
                    {!isAuctionStarted && !isAuctionEnded && (
                      <div className={style["time-counter-box"]}>
                        <span
                          className={`${style["time-counter-card"]} ${style["startsin"]}`}
                        >
                          <span className={style["time-title"]}>Starts</span>
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
                          {/*<Image unoptimized={true} src={endsin} alt="endsin" /> */}
                          <span className={style["time-title"]}>Ends</span>
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
            )}
          </>
        )}
        <article
          className={`${style["player_stats"]} ${
            style[`${roleData?.name === "Land" ? "land-stats" : ""}`]
          }`}
        >
          {roleData && (
            <div className={`${style["player-level"]}`}>
              <Image
                unoptimized={true}
                width="300"
                height="300"
                loading="eager"
                src={roleData?.value}
                alt="Player-type"
                priority={true}
                placeholder={"blur"}
                blurDataURL={imageUrl}
              />
              <h6>{roleData?.name}</h6>
            </div>
          )}
          {car_category && (
            <div className={`${style["player-level"]}`}>
              <Image
                unoptimized={true}
                width="300"
                height="300"
                src={car_category?.value}
                alt="Player-level"
                priority={true}
                placeholder={"blur"}
                blurDataURL={imageUrl}
              />
              <h6>{car_category?.name}</h6>
            </div>
          )}
          {category && (
            <div
              className={style["player-range"]}
              style={{
                borderRight:
                  levelData || nft?.core_statistics?.year?.value
                    ? "0.1rem solid #ff7f004d"
                    : "none",
              }}
            >
              <span
                className={style["band"]}
                style={{
                  background: category?.textColor ? category?.textColor : "",
                }}
              >
                {category?.value}
              </span>
              <h6>
                {/* {category?.name} */}
                RARITY
              </h6>
            </div>
          )}

          {levelData && (
            <div className={style["player-level"]}>
              <Image
                unoptimized={true}
                width="300"
                height="300"
                src={levelData?.value}
                alt="Player-level"
                priority={true}
                placeholder={"blur"}
                blurDataURL={imageUrl}
              />
              <h6>{levelData?.name}</h6>
            </div>
          )}

          {nft?.core_statistics?.year?.value && (
            <div className={`${style["player-range"]} ${style["yearshow"]}`}>
              <h6 className={style["band"]}> Year</h6>

              <span className={style["year"]}>
                {nft?.core_statistics?.year?.value}
              </span>
            </div>
          )}
        </article>

        <Link
          legacyBehavior
          href={(() => {
            if (recentSold) {
              return `/order/details/${nft?.slug}/${nft?.order_slug}`;
            } else {
              return `/nft-marketplace/details/${nft?.slug}`;
            }
          })()}
        >
          {/* <a> */}
          <Image
            unoptimized={true}
            width="300"
            height="300"
            priority={true}
            loading="eager"
            placeholder={"blur"}
            blurDataURL={imageUrl}
            alt="media_logo"
            // src={(() => {
            //   if (nft?.asset_type?.includes("image")) {
            //     return nft.asset_url ? nft.asset_url : imageUrl;
            //   } else if (nft?.cover_url) {
            //     return nft.cover_url ? nft.cover_url : imageUrl;
            //   } else {
            //     return nft.asset_url ? nft.asset_url : imageUrl;
            //   }
            // })()}
            src={imageNFTURL}
            role="button"
          />
          {/* </a> */}
        </Link>
      </div>
      <div className={style["top-content-title"]}>
        <div
          style={{ color: textColor }}
          className={style["more-nft-info-header"]}
        >
          <div className={style["more-nft-title"]}>
            <div className={style["more-nft-title-box"]}>
              <div className={style["more-nft-ownername-info"]}>
                {nft?.owner_name && (
                  <div className={style["more-nft-desc"]}>
                    {nft?.owner_name}
                  </div>
                )}
                {recentSold && nft?.buyer?.user_name && (
                  <div className={style["more-nft-desc"]}>
                    {nft?.buyer?.user_name}
                  </div>
                )}
                <span className={style["more-nft-name"]}>{nft?.name}</span>
              </div>
            </div>
            {/* <span className={style["nft-type-badge"]}>
              {nft?.nft_type?.toUpperCase()}
            </span> */}
            {userSlug &&
              nft?.is_on_sale &&
              nft?.order_details?.is_buy &&
              nft?.owner_slug !== userSlug &&
              !isBundle &&
              !otherUserBundle && (
                <>
                  {user?.data?.user?.kyc_status !== "success" ? (
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
                    </div>
                  )}
                </>
              )}
          </div>
          {/* <h6 className={style["nft-signature"]}>
            {nft?.signed_by?.length > 0 ? (
              <>
                <span>Signed by </span> {nft?.signed_by[0]}{" "}
                {nft?.signed_by?.length > 1 && <>&amp; {nft?.signed_by[1]}</>}
              </>
            ) : (
              <br />
            )}
          </h6> */}
        </div>
        {nft?.is_on_sale && (
          <>
            <div
              className={style["more-bid-details"]}
              style={{ color: textColor }}
            >
              <div className="text-start">
                <div className={`${style["mb-title"]} text-secondary`}>
                  {(() => {
                    if (erc721) {
                      return nft?.order_details?.is_bid
                        ? "Bid Price"
                        : "Buy Price";
                    } else {
                      return "Buy Price";
                    }
                  })()}
                </div>
                <div className={style["mb-value"]}>
                  {(() => {
                    if (erc721) {
                      return nft?.order_details?.is_bid
                        ? currencyFormat(
                            nft?.order_details?.top_bid
                              ? nft?.order_details?.top_bid
                              : nft?.order_details?.minimum_bid,
                            "USD"
                          )
                        : currencyFormat(nft?.order_details?.buy_amount, "USD");
                    } else {
                      return currencyFormat(
                        nft?.order_details?.buy_amount,
                        "USD"
                      );
                    }
                  })()}
                </div>
              </div>
              {erc721 &&
                nft?.order_details?.is_bid &&
                nft?.order_details?.is_buy && (
                  <div className="text-end">
                    <div className={`${style["mb-title"]} text-secondary`}>
                      Buy Price
                    </div>
                    <div className={style["mb-value"]}>
                      {currencyFormat(nft?.order_details?.buy_amount, "USD")}
                    </div>
                  </div>
                )}
            </div>
          </>
        )}
        {onsale && (
          <>
            <div className={style["more-bid-details"]}>
              <div className="text-start">
                <div className={`${style["mb-title"]} text-secondary`}>
                  {(() => {
                    if (erc721) {
                      return nft?.is_bid ? "Bid Price" : "Buy Price";
                    } else {
                      return "Buy Price";
                    }
                  })()}
                </div>
                <div className={style["mb-value"]}>
                  {(() => {
                    if (erc721) {
                      return nft?.is_bid
                        ? currencyFormat(
                            nft?.top_bid ? nft?.top_bid : nft?.minimum_bid,
                            "USD"
                          )
                        : currencyFormat(nft?.buy_amount, "USD");
                    } else {
                      return currencyFormat(nft?.buy_amount, "USD");
                    }
                  })()}
                </div>
              </div>
              {erc721 && nft?.is_bid && nft?.is_buy && (
                <div className="text-end">
                  <div className={`${style["mb-title"]} text-secondary`}>
                    Buy Price
                  </div>
                  <div className={style["mb-value"]}>
                    {currencyFormat(nft?.buy_amount, "USD")}
                  </div>
                </div>
              )}
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
        )}

        {favouriteNFTs && (
          <>
            <div className={style["more-bid-details"]}>
              <div className="text-start">
                <div className={`${style["mb-title"]} text-secondary`}>
                  {(() => {
                    if (erc721) {
                      return nft?.is_bid ? "Bid Price" : "Buy Price";
                    } else {
                      return "Buy Price";
                    }
                  })()}
                </div>
                <div className={style["mb-value"]}>
                  {(() => {
                    if (erc721) {
                      return nft?.is_bid
                        ? currencyFormat(
                            nft?.top_bid ? nft?.top_bid : nft?.minimum_bid,
                            "USD"
                          )
                        : currencyFormat(nft?.buy_amount, "USD");
                    } else {
                      return currencyFormat(nft?.buy_amount, "USD");
                    }
                  })()}
                </div>
              </div>
              {erc721 && nft?.is_bid && nft?.is_buy && (
                <div className="text-end">
                  <div className={`${style["mb-title"]} text-secondary`}>
                    Buy Price
                  </div>
                  <div className={style["mb-value"]}>
                    {currencyFormat(nft?.buy_amount, "USD")}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {!onsale && !nft.is_on_sale && !recentSold && !ownedCard && !faved && (
          <>
            <div className={style["empty-space"]}>Not listed for sale</div>
          </>
        )}
      </div>
    </div>
  );
};

export default RaddxNFTCard;
