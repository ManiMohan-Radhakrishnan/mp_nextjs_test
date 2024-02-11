import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, OverlayTrigger } from "react-bootstrap";

import NFTCounter from "../nft-counter";
import images from "../../utils/images.json";
import style from "./style.module.scss";
import Image from "next/image";
import {
  level,
  currencyFormat,
  getPlayerCategoryInfo,
  getRoleInfo,
  Nationality,
} from "../../utils/common";
import { add_to_cart_thunk } from "../../redux/thunk/user_cart_thunk";
import { EVENT_NAMES, invokeTrackEvent } from "../../utils/track-events";
import { BsFillTrophyFill } from "react-icons/bs";

const CollectionCard = ({ nft, recentSold = false, favouriteNFT = false }) => {
  const erc721 = nft?.nft_type === "erc721";
  //const [bgColor, setBgColor] = useState();
  //const [auctionEndTime, setAuctionEndTime] = useState("");
  const [isAuctionStarted, setIsAuctionStarted] = useState(false);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => state);
  const [inCart, setInCart] = useState(false);
  const userSlug = user.data?.user ? user.data?.user?.slug : null;
  const userCart = cart?.data ? cart?.data : null;
  const [imageloaded, setImageLoaded] = useState(false);

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
    if (favouriteNFT && nft?.timed_auction) {
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

  const NationalityData = Nationality(nft?.core_statistics?.category?.value);

  // const handleAddToCart = () => {
  //   dispatch(add_to_cart_thunk(nft?.order_details?.slug, nft?.quantity));
  // };

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
          Please complete your user verification process to be eligible for
          purchasing NFTs.
        </p>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className={`${style["more-card"]} ${style["jt-card"]}`}>
      {nft?.core_statistics?.rank?.value && (
        <span className={style["nft-type-badge-rank"]}>
          <span className={style["rank-title"]}>
            <BsFillTrophyFill />
            {`${nft?.core_statistics?.rank?.value}/${nft?.core_statistics?.rank?.maximum}`}
          </span>
        </span>
      )}
      <article className={style["player_stats"]}>
        {roleData && (
          <div className={style["player-type"]}>
            <Image
              unoptimized={true}
              width="600"
              height="600"
              src={roleData?.value}
              placeholder={"blur"}
              blurDataURL={"/sample.gif"}
              alt="Player-status"
              loading="lazy"
            />
          </div>
        )}

        {playerCatData && (
          <div
            className={style["player-range"]}
            style={{
              borderBottom: levelData ? "0.1rem solid #3b3b3b" : "none",
            }}
          >
            <span
              className={style["band"]}
              style={{
                background: playerCatData?.textColor
                  ? playerCatData?.textColor
                  : "",
              }}
            >
              {playerCatData?.value}
            </span>
          </div>
        )}

        {levelData && (
          <div className={style["player-level"]}>
            <h6>{levelData?.name}</h6>
            <Image
              unoptimized={true}
              width="300"
              height="300"
              src={levelData?.value}
              alt="Player-level"
              loading="lazy"
            />
          </div>
        )}
        {NationalityData && (
          <div className={style["player-level"]}>
            <Image
              unoptimized={true}
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
          <div className={style["player-range"]}>
            <span className={style["band"]}>
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
        //to={`/details/${nft?.slug}`}
      >
        <Image
          unoptimized={true}
          width="300"
          height="300"
          // style={{ background: bgColor }}
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
          loading="lazy"
          style={imageloaded ? {} : { height: "26rem" }}
          onLoad={() => setImageLoaded(true)}
        />
      </Link>

      <div className={style["top-content-title"]}>
        {/* <div className="heart_box">
          <div className="svg_size filled_heart_icon"></div> */}

        {/* <div className="svg_size heart_icon"></div> */}
        {/* </div> */}
        {userSlug &&
          nft?.is_on_sale &&
          nft?.order_details?.is_buy &&
          nft?.owner_slug !== userSlug && (
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
                    <span className={style["cart_text"]}>Add To Cart</span>
                  </div>
                </OverlayTrigger>
              ) : (
                <div
                  className={`${style["cart_box"]} ${
                    inCart && style["add_cart"]
                  }`}
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
                  <div
                    className={`${style["svg_size"]} ${style["cart_icon"]}`}
                  ></div>
                  <span className={style["cart_text"]}>
                    {!inCart ? "Add To Cart" : "Added To Cart"}
                  </span>
                </div>
              )}
            </>
          )}

        <div className={style["more-nft-info-header"]}>
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
                {/* <span className={style["nft-type-badge"]}>
              {nft?.nft_type?.toUpperCase()}
            </span> */}
              </div>
              <span className={style["more-nft-name"]}>{nft?.name}</span>
            </div>
            {userSlug &&
              nft?.is_on_sale &&
              nft?.order_details?.is_buy &&
              nft?.owner_slug !== userSlug && (
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

          <h6 className={style["nft-signature"]}>
            {nft?.signed_by?.length > 0 ? (
              <>
                <span>Signed by </span> {nft?.signed_by[0]}{" "}
                {nft?.signed_by?.length > 1 && <>&amp; {nft?.signed_by[1]}</>}
              </>
            ) : (
              <br />
            )}
          </h6>
        </div>

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
                </>
              )}
            <div className={style["more-bid-details"]}>
              <div className="text-start">
                <div className="mb-title text-secondary">
                  {(() => {
                    if (erc721) {
                      return nft?.order_details?.is_bid
                        ? "Bid Price"
                        : "Buy Price";
                    } else {
                      return "Buy Price";
                    }
                  })()}{" "}
                  {/* {nft?.order_details?.is_bid && 100 > 0 ? (
                  <span className="value-diff-range green">
                    <BiUpArrowAlt className="arrow-icon" />
                    {`${100}%`}
                  </span>
                ) : (
                  <span className="value-diff-range red">
                    <BiDownArrowAlt className="arrow-icon" />
                    {`${100}%`}
                  </span>
                )} */}
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
        {recentSold && (
          <div className={style["more-bid-details"]}>
            <div className="text-start">
              <div className={`${style["mb-title"]} text-secondary`}>
                Sold For
                {/* {100 > 0 ? (
                  <span className="value-diff-range green">
                    <BiUpArrowAlt className="arrow-icon" />
                    {`${100}%`}
                  </span>
                ) : (
                  <span className="value-diff-range red">
                    <BiDownArrowAlt className="arrow-icon" />
                    {`${100}%`}
                  </span>
                )} */}
              </div>
              <div className={style["mb-value"]}>
                {currencyFormat(nft?.amount, "USD")}
              </div>
            </div>
            <div className="text-end">
              <div className={`${style["mb-title-date"]} text-secondary`}>
                Sold On
              </div>
              <div className={style["mb-value"]}>
                {dayjs(nft?.created_at).format("MMM D, YYYY hh:mm A")}
              </div>
            </div>
          </div>
        )}
        {favouriteNFT && (
          <>
            {nft?.is_bid && nft?.timed_auction && (
              <>
                {showTimer && (
                  <>
                    {!isAuctionStarted && !isAuctionEnded && (
                      <div className="time-counter-box">
                        <span
                          className={`${style["time-counter-card"]} ${style["startsin"]}`}
                        >
                          <span className="time-title">Starts</span>
                          <NFTCounter
                            time={nft?.auction_start_time}
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
                          <span className={style["time-title"]}>Ends</span>
                          <NFTCounter
                            time={nft?.auction_end_time}
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
              </>
            )}
            <div className={style["more-bid-details"]}>
              <div className="text-start">
                <div className={`${style["mb-title"]} text-secondary`}>
                  {(() => {
                    if (erc721) {
                      return nft?.is_bid ? "Bid Price" : "Buy Price";
                    } else {
                      return "Buy Price";
                    }
                  })()}{" "}
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
        {!onsale && !nft.is_on_sale && !recentSold && (
          <>
            <div className={style["empty-space"]}>Not listed for sale</div>
          </>
        )}
      </div>
    </div>
  );
};

export default CollectionCard;
