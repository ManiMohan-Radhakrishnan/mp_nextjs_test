import _ from "lodash";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { Popover, OverlayTrigger } from "react-bootstrap";

import BidValue from "../bid-value";
import ToolTip from "../../tooltip";
import NFTPlaceBid from "../nft-place-bid";
import NFTPlaceBuy from "../nft-place-buy";
import NFTCancelTheSale from "../nft-cancel-the-sale";
import NFTCounter from "../../nft-counter";
import images from "../../../utils/images.json";
import useWindowUtils from "../../../hooks/useWindowUtils";
import NFTTimeLeft from "../../nft-time-left/index";
import { currencyFormat } from "../../../utils/common";
import { acceptBidApi } from "../../../utils/methods";
import { add_to_cart_thunk } from "../../../redux/thunk/user_cart_thunk";
import ShotPitchStatsDirection from "../../shot-pitch-stats-direction";

import style from "./style.module.scss";

const NFTOrderBaseDetails = ({
  bidExpiry,
  isBidder = false,
  nft,
  placeBidPop,
  setPlaceBidPop,
  placeBuyPop,
  setPlaceBuyPop,
  cancelTheSalePop,
  setCancelTheSalePop,
  totalBuy,
  userTotalBuys,
  price,
  availableQty,
  totalQty,
  userOutBid,
  userLastBid,
  soldOut,
  transferringNFT,
  owners,
  isOrderOnSale,
  isOrderSuccess,
  isOrderCancelled,
  orderSlug,
  slug,
  latestBid,
  bidOutDated,
  handleBidExpiredEndTimer,
  bidExpired,
  isAuctionStarted,
  isAuctionEnded,
  auctionEndTime,
  handleAuctionStartTimer,
  handleAuctionEndTimer,
  handleBeforeAuctionEndTimer,
  nftData,
  isBundle = false,
  isChild = false,
  bundleInfo = [],
  childInfo = [],
  switchNftDataInBundle = () => {},
}) => {
  const windowUtils = useWindowUtils();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => state);
  const User = user.data.user;
  const Cart = cart.data;
  //const [modalShow, setModalShow] = useState(false);
  const [acceptBidConfirm, setAcceptBidConfirm] = useState(false);
  // const [acceptBidSucess, setAcceptBidSucess] = useState(false);
  const [inCart, setInCart] = useState(false);

  const erc721 = nft.nft_type === "erc721";
  const isBid = _.get(nft, "order_details.is_bid", false);
  const isBuy = _.get(nft, "order_details.is_buy", false);
  const isOwner = _.get(nft, "order_details.owned", false);
  const orderDetails = _.get(nft, "order_details", {});
  //const ownerOrderDetails = _.get(nft, "owner_details.orders", []);

  const handleAcceptBid = async () => {
    setAcceptBidConfirm(!acceptBidConfirm);
    try {
      await acceptBidApi({
        order_slug: orderSlug,
        order: { bid_slug: latestBid.bid_slug },
      });
      // if (result.data.success) {
      //   setAcceptBidSucess(true);
      // }
    } catch (error) {
      if (error.response.data.status === 422) {
        console.log(error);
      }
    }
  };

  const KycPopOver = () => (
    <Popover>
      <Popover.Body>
        <p className="password-terms">
          Please complete your user verification process to be eligible for
          buying/bidding on NFTs.
        </p>
      </Popover.Body>
    </Popover>
  );

  const KycPopOverCart = () => (
    <Popover>
      <Popover.Body>
        <p className="password-terms">
          Please complete your user verification process to be eligible for
          purchasing NFTs.
        </p>
      </Popover.Body>
    </Popover>
  );

  useEffect(() => {
    if (User?.slug) {
      const orderSlug = Cart?.line_items?.find(
        (obj) => obj.order_slug === orderDetails?.slug
      );
      if (orderSlug) {
        setInCart(true);
      } else {
        setInCart(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <>
      {/* <ul className="bredcrumb-link">
        <li>
          <span onClick={() => router.push(`/details/${slug}`)}>
            NFT <VscChevronRight className="icon" color="#fff" />
          </span>
        </li>
        <li>
          <span
            onClick={() => router.push(`/order/details/${slug}/${orderSlug}`)}
          >
            Order Detail
            <VscChevronRight className="icon" color="#fff" />
          </span>
        </li>
      </ul> */}
      {/* {erc721 && owners?.length > 0 && (
        <>
          <div className={"d-flex"}>
            <BidValue
              ClassNames="ownerName"
              title="Owned By"
              avatar={owners[0].avatar_url}
              name={owners[0].user_name}
              userSlug={owners[0].slug}
              seller={true}
              owner={owners[0]}
              isEnd
            />
          </div>
        </>
      )} */}
      <div className={`creator mt-3 mb-3`}>
        {isBundle && <span className={style["bundle-badge"]}>Bundle</span>}
        <span
        // className="link"
        // onClick={() => {
        //   if (nft?.core_statistics?.role?.value?.toLowerCase() === "car")
        //     return router.push(
        //       `/nft-marketplace/raddx-car-nfts/${nft?.category_slug}`
        //     );
        //   if (nft?.core_statistics?.role?.value?.toLowerCase() === "land")
        //     return router.push(
        //       `/nft-marketplace/raddx-land-nfts/${nft?.category_slug}`
        //     );
        //   if (nft?.core_statistics?.role?.value?.toLowerCase() === "building")
        //     return router.push(
        //       `/nft-marketplace/raddx-building-nfts/${nft?.category_slug}`
        //     );
        // }}
        >
          {nft?.category_name}
        </span>{" "}
        | {nft?.celebrity_name} Exclusive NFTs
        <ToolTip
          icon={<FaCheckCircle size={16} className={`ms-2 check-icon`} />}
          content="Verified Artist"
          placement="right"
        />
        {(transferringNFT || soldOut || isAuctionEnded) && (
          <span className={`nft-status-tag rounded-pill`}>
            {soldOut ? (
              "Sold Out"
            ) : transferringNFT ? (
              <>
                Token Transfer Initiated{" "}
                <ToolTip
                  icon={
                    <BsFillQuestionCircleFill
                      size={16}
                      className={`ms-2 check-icon`}
                    />
                  }
                  content={
                    "The NFT's transfer/transaction is in process on the blockchain. Visit again for latest sale-status."
                  }
                  placement="top"
                />
              </>
            ) : (
              "Auction has ended"
            )}
          </span>
        )}
      </div>
      <div className="nft-title-container">
        <h1 className="nft-title mb-2">{nft?.name}</h1>
      </div>

      <div className="text-secondary mt-1 mb-5 nft-desc">
        {nft?.description && (
          // <ReadMoreReact
          //   min={200}
          //   ideal={560}
          //   max={560}
          //   text={nftData?.description}
          // />
          <p>{nft?.description}</p>
        )}
      </div>
      {/* <div className={`price-block `}>
        <ul className={`price-box`}>
          <li>
            <h5>Price</h5>
            <h4 className={`price-value`}>
              {price
                ? currencyFormat(price, "USD")
                : currencyFormat(orderDetails.buy_amount, "USD")}
            </h4>
          </li>
          <li>
            <h5>Limited Edition</h5>
            <h4>
              <span className={`edition-value`}>1 of 1 </span> left
            </h4>
          </li>
        </ul>
      </div> */}
      {nftData?.core_statistics?.role?.value === "Shot" && (
        <>
          <hr className="custom-divider dashed-divider" />
          <div className="bottom-content-box">
            <ShotPitchStatsDirection ShotsData={nftData?.core_statistics} />
          </div>
        </>
      )}
      {isBundle && (
        <div className="bundle-nft-details">
          <h5>Bundle Details</h5>
          <ul className="bundle-list">
            {bundleInfo.map((bundle, i) => {
              return (
                <li
                  key={bundle?.nft_slug || i}
                  className={`bundle-list-item ${
                    nft?.slug === bundle?.nft_slug ? "active" : ""
                  }`.trim()}
                  onClick={() => switchNftDataInBundle(bundle?.nft_slug)}
                >
                  <span>{bundle?.name}</span>
                  <span>${bundle?.buy_amount || 0}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {isChild &&
        (childInfo.length > 0 ? (
          <div className="bundle-nft-details">
            <h5>Accessories</h5>
            <ul className="bundle-list">
              {childInfo.map((child, i) => {
                return (
                  <li
                    key={child?.nft_slug || i}
                    className={`bundle-list-item ${
                      nft?.slug === child?.nft_slug ? "active" : ""
                    }`.trim()}
                    onClick={() => switchNftDataInBundle(child?.nft_slug)}
                  >
                    <span>{child?.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          ""
        ))}
      <div className={"bottom-content"}>
        {erc721 && owners?.length > 0 && (
          <BidValue
            ClassNames="ownerName"
            title="Owned By"
            avatar={owners[0].avatar_url}
            name={owners[0].user_name}
            userSlug={owners[0].slug}
            seller={true}
            owner={owners[0]}
            isEnd
          />
        )}
        <div className="bottom-content-box">
          {!transferringNFT &&
          !soldOut &&
          !isOrderCancelled &&
          !bidOutDated &&
          acceptBidConfirm ? (
            <>
              {User?.slug &&
                isOrderOnSale &&
                (isOwner || isBidder) &&
                bidExpiry &&
                !transferringNFT &&
                !soldOut &&
                !isOrderCancelled &&
                !bidOutDated &&
                !orderDetails?.timed_auction && (
                  <p className={"bid-expire-alert"}>
                    {dayjs() < bidExpiry && !bidExpired ? (
                      <>
                        Bid Expire at
                        <NFTCounter
                          time={bidExpiry}
                          handleEndEvent={handleBidExpiredEndTimer}
                        />{" "}
                        <ToolTip
                          icon={
                            <BsFillQuestionCircleFill
                              color={"#000"}
                              size={16}
                              className={`mb-1 check-icon`}
                            />
                          }
                          content={
                            <>
                              If the bid is not accepted before the shown time
                              in the countdown, the bid will expire. <br />
                              The <b>Funds on Hold</b> will be returned to the{" "}
                              <b>Available Funds</b> of the bidder&apos;s
                              wallet.
                            </>
                          }
                          placement="top"
                        />
                      </>
                    ) : (
                      <>Bid Expired</>
                    )}
                  </p>
                )}
              <div className={"assign-card"}>
                <div className={"first-half"}>
                  <Image
                    unoptimized={true}
                    height={20}
                    width={20}
                    alt="nfImages"
                    src={
                      !latestBid?.private && latestBid?.avatar_url
                        ? latestBid?.avatar_url
                        : User?.slug === latestBid?.slug &&
                          latestBid?.avatar_url
                        ? latestBid?.avatar_url
                        : images.userJPG
                    }
                  />
                  <div className="bid-histoy-details">
                    <div className={`time text-secondary`}>
                      {dayjs(latestBid?.created_at).format(
                        "MMM D, YYYY hh:mm A"
                      )}
                    </div>
                    <div className={"bid-owner"}>
                      Bid placed by {latestBid?.user_name}
                    </div>
                  </div>
                </div>
                <div className={"second-half"}>
                  <div className={"highest-bid"}>
                    <span className={"key"}>Highest Bid Price</span>
                    <span className={"value"}>
                      {currencyFormat(latestBid?.bid_amount, "USD")}
                    </span>
                  </div>
                </div>
              </div>

              <div className={"d-flex"}>
                <BidValue
                  title="Artist Fee"
                  value={`${parseFloat(nft.royalties)} %`}
                  toolTip={"The royalty paid to the artist or the inspiration."}
                />

                <BidValue
                  title="Service Fee"
                  value={`${parseFloat(nft.service_fee)} %`}
                  toolTip={
                    "The service fee includes gas fee and the platform fee."
                  }
                />
              </div>
              <hr className={"custom-divider"} />
              <div className={"d-flex"}>
                <BidValue
                  title="You will Get"
                  value={currencyFormat(
                    parseFloat(latestBid?.bid_amount) -
                      (parseFloat(latestBid?.bid_amount) *
                        (parseFloat(nft?.royalties) +
                          parseFloat(nft?.service_fee))) /
                        100,
                    "USD"
                  )}
                />
              </div>
              <hr className={"custom-divider"} />
            </>
          ) : (
            <>
              {User?.slug &&
                isOrderOnSale &&
                (isOwner || isBidder) &&
                bidExpiry &&
                !transferringNFT &&
                !soldOut &&
                !isOrderCancelled &&
                !orderDetails?.timed_auction && (
                  <p className={"bid-expire-alert"}>
                    {dayjs() < bidExpiry && !bidExpired ? (
                      <>
                        Bid Expire at
                        <NFTCounter
                          time={bidExpiry}
                          handleEndEvent={handleBidExpiredEndTimer}
                        />{" "}
                        <ToolTip
                          icon={
                            <BsFillQuestionCircleFill
                              color={"#000"}
                              size={16}
                              className={`mb-1 check-icon`}
                            />
                          }
                          content={
                            <>
                              If the bid is not accepted before the shown time
                              in the countdown, the bid will expire. <br />
                              The <b>Funds on Hold</b> will be returned to the{" "}
                              <b>Available Funds</b> of the bidder&apos;s
                              wallet.
                            </>
                          }
                          placement="top"
                        />
                      </>
                    ) : (
                      <>Bid Expired</>
                    )}
                  </p>
                )}
              <div className={"d-flex"}>
                {(() => {
                  if (erc721) {
                    if (isBid) {
                      return (
                        <BidValue
                          title={(() => {
                            if (isAuctionEnded) {
                              return "Last Bid";
                            } else if (orderDetails.total_bids === 0) {
                              return "Minimum Bid";
                            } else if (userLastBid || isAuctionStarted) {
                              return "Current Bid";
                            } else {
                              return "Minimum Bid";
                            }
                          })()}
                          value={
                            price
                              ? currencyFormat(price, "USD")
                              : currencyFormat(orderDetails.minimum_bid, "USD")
                          }
                        />
                      );
                    } else {
                      return (
                        <BidValue
                          title="Price"
                          value={
                            price
                              ? currencyFormat(price, "USD")
                              : currencyFormat(
                                  isBundle
                                    ? orderDetails.total_bundle_amount
                                    : orderDetails.buy_amount,
                                  "USD"
                                )
                          }
                        />
                      );
                    }
                  } else {
                    return (
                      <BidValue
                        title="Price"
                        value={currencyFormat(
                          isBundle
                            ? orderDetails.total_bundle_amount
                            : orderDetails.buy_amount,
                          "USD"
                        )}
                      />
                    );
                  }
                })()}

                {(() => {
                  if (User && userLastBid && price) {
                    return (
                      <BidValue
                        title="Your Last Bid"
                        value={currencyFormat(userLastBid, "USD")}
                        status={
                          parseFloat(userLastBid) < parseFloat(price)
                            ? "Outbid"
                            : ""
                        }
                      />
                    );
                  } else if (User && orderDetails.user_highest_bid) {
                    return (
                      <BidValue
                        title="Your Last Bid"
                        value={currencyFormat(
                          orderDetails.user_highest_bid,
                          "USD"
                        )}
                        status={
                          parseFloat(orderDetails.user_highest_bid) <
                          parseFloat(orderDetails.minimum_bid)
                            ? "Outbid"
                            : ""
                        }
                      />
                    );
                  } else {
                    return null;
                  }
                })()}

                {(() => {
                  if (erc721 && !isBundle) {
                    return (
                      <BidValue title="Limited Edition" value="1 of 1" isLeft />
                    );
                  } else if (nft?.nft_type === "erc1155") {
                    return (
                      <BidValue
                        title="Edition(s)"
                        value={
                          availableQty >= 0 && availableQty != null
                            ? `${availableQty} / ${
                                totalQty != null
                                  ? totalQty
                                  : orderDetails.total_quantity
                              }`
                            : `${orderDetails.available_quantity} / ${orderDetails.total_quantity}`
                        }
                      />
                    );
                  }
                })()}
              </div>
              {(() => {
                if (
                  (orderDetails.timed_auction &&
                    !transferringNFT &&
                    !soldOut) ||
                  (isAuctionEnded && isOwner && !isOrderCancelled)
                ) {
                  if (!isAuctionStarted && !isOrderCancelled) {
                    return <hr className={"custom-divider"} />;
                  } else if (
                    !isAuctionEnded &&
                    isAuctionStarted &&
                    !isOrderCancelled
                  ) {
                    return <hr className={"custom-divider"} />;
                  }
                } else {
                  <></>;
                }
              })()}
              {/* <hr className={"custom-divider"} /> */}
              {/* <div className="d-flex">
                <BidValue title="Category" value={nft.category_name} />
              </div>
              <hr className="custom-divider" /> */}
              <div className={"d-flex"}>
                {orderDetails.timed_auction && !transferringNFT && !soldOut && (
                  <>
                    {!isAuctionStarted && !isOrderCancelled && (
                      <NFTTimeLeft
                        title="Auction starting in"
                        placement="top"
                        tooltipText={(() => {
                          if (erc721) {
                            if (orderDetails.auction_extend_minutes) {
                              return `When there are less than ${orderDetails?.auction_extend_minutes} minutes left in the auction, successful bids will extend the auction by ${orderDetails?.auction_extend_minutes} minutes.`;
                            } else {
                              return `When there are less than 10 minutes left in the auction, successful bids will not extend the auction by 10 minutes.`;
                            }
                          }
                        })()}
                        time={orderDetails.auction_start_time}
                        cTime={nft.time}
                        handleTimer={handleAuctionStartTimer}
                      />
                    )}
                    {!isAuctionEnded &&
                      isAuctionStarted &&
                      !isOrderCancelled && (
                        <NFTTimeLeft
                          title="End of Auction"
                          tooltipText={(() => {
                            if (erc721) {
                              if (orderDetails.auction_extend_minutes) {
                                return `When there are less than ${orderDetails?.auction_extend_minutes} minutes left in the auction, successful bids will extend the auction by ${orderDetails?.auction_extend_minutes} minutes.`;
                              } else {
                                return `When there are less than 10 minutes left in the auction, successful bids will not extend the auction by 10 minutes.`;
                              }
                            }
                          })()}
                          placement="top"
                          time={auctionEndTime}
                          cTime={nft.time}
                          handleTimer={handleAuctionEndTimer}
                          handleBeforeEndTimer={handleBeforeAuctionEndTimer}
                        />
                      )}
                  </>
                )}
                {isAuctionEnded && isOwner && !isOrderCancelled && (
                  <NFTTimeLeft
                    title="Auction ended on"
                    tooltipText="Auction ended"
                    placement="top"
                    time={auctionEndTime}
                    cTime={nft.time}
                    isEnded={true}
                  />
                )}
              </div>
              {orderDetails.timed_auction && !transferringNFT && !soldOut && (
                <hr className={"custom-divider"} />
              )}
              {nft?.show_crypto_assets && (
                <>
                  {" "}
                  <div className="d-flex">
                    <BidValue
                      title="Asset Quantity"
                      value={nft?.asset_quantity}
                      withBlink
                    />
                    <div className="d-flex">
                      <BidValue
                        title="Asset Value"
                        withBlink
                        // value={
                        //   "~" + " " + currencyFormat(nft?.asset_value, "USD")
                        // }
                        value={
                          nft?.asset_value === "-"
                            ? "-"
                            : "~" +
                              " " +
                              currencyFormat(nft?.asset_value, "USD")
                        }
                        toolTip={
                          "The value of crypto assets will fluctuate, sometimes dramatically."
                        }
                      />
                    </div>
                  </div>
                  <hr className="custom-divider" />
                </>
              )}
            </>
          )}

          {nft?.allow_rent && nft?.core_statistics?.role?.value !== "Shot" && (
            <div className="text-center text-danger">
              This NFT has been opted-in for rentals.
            </div>
          )}

          <div className={`text-center flex-btn`}>
            <NFTPlaceBid
              nft={nft}
              orderDetails={orderDetails}
              placeBidPop={placeBidPop}
              setPlaceBidPop={setPlaceBidPop}
              isBid={isBid}
              isBuy={isBuy}
              price={price}
              userTotalBuys={userTotalBuys}
              soldOut={soldOut}
              transferringNFT={transferringNFT}
              isOrderOnSale={isOrderOnSale}
              isOrderCancelled={isOrderCancelled}
              isAuctionStarted={isAuctionStarted}
              isAuctionEnded={isAuctionEnded}
              orderSlug={orderSlug}
            />
            <NFTPlaceBuy
              nft={nft}
              orderDetails={orderDetails}
              placeBuyPop={placeBuyPop}
              setPlaceBuyPop={setPlaceBuyPop}
              isBid={isBid}
              isBuy={isBuy}
              price={price}
              availableQty={availableQty}
              totalQty={totalQty}
              userTotalBuys={userTotalBuys}
              soldOut={soldOut}
              transferringNFT={transferringNFT}
              isOrderOnSale={isOrderOnSale}
              isOrderCancelled={isOrderCancelled}
              orderSlug={orderSlug}
            />

            <NFTCancelTheSale
              nft={nft}
              orderDetails={orderDetails}
              isOwner={isOwner}
              cancelTheSalePop={cancelTheSalePop}
              setCancelTheSalePop={setCancelTheSalePop}
              price={price}
              availableQty={availableQty}
              isOrderOnSale={isOrderOnSale}
              isOrderCancelled={isOrderCancelled}
              totalQty={totalQty}
              soldOut={soldOut}
              transferringNFT={transferringNFT}
              isAuctionEnded={isAuctionEnded}
              latestBid={latestBid}
              orderSlug={orderSlug}
            />

            {/* {nft.promoted && (
              <div className="text-danger">
                This NFT has yield generation enabled & can be present on other
                NFTs.
              </div>
            )} */}
            {/* {nft?.allow_rent && (
              <div className="text-danger">
                This NFT has been opted-in for rental.
              </div>
            )} */}
            <>
              {(() => {
                if (!User) {
                  return (
                    <button
                      disabled={false}
                      className={`btn btn-dark text-center btn-lg mt-2 place-bid-btn full-width`}
                      onClick={() =>
                        window.open(
                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/signin?redirect=${windowUtils?.href}`,
                          "_self"
                        )
                      }
                    >
                      Sign In
                    </button>
                  );
                } else if (soldOut) {
                  return (
                    <button
                      disabled={true}
                      className={`btn btn-dark text-center btn-lg mt-2 place-bid-btn full-width`}
                    >
                      Sold Out
                    </button>
                  );
                } else if (transferringNFT) {
                  return (
                    <ToolTip
                      icon={
                        <button
                          disabled={true}
                          className={`btn btn-dark text-center btn-lg mt-2 place-bid-btn`}
                        >
                          Token Transfer Initiated{" "}
                          <BsFillQuestionCircleFill
                            size={16}
                            className="ms-2 check-icon"
                          />
                        </button>
                      }
                      content={
                        "The NFT's transfer/transaction is in process on the blockchain. Visit again for latest sale-status."
                      }
                      placement="top"
                    />
                  );
                } else if (isOrderCancelled) {
                  return (
                    <button
                      disabled={true}
                      className={`btn btn-dark text-center btn-lg mt-2 place-bid-btn full-width`}
                    >
                      Order Cancelled
                    </button>
                  );
                } else if (
                  parseFloat(User?.balance) <= 0 &&
                  parseFloat(user?.jump_points_balance) < parseFloat(100) &&
                  !isOwner
                ) {
                  return (
                    <>
                      <button
                        disabled={false}
                        className={`place-bid-btn filled-btn ${
                          User?.kyc_status !== "success" && !isBuy
                            ? "full-width"
                            : ""
                        }`}
                        onClick={() =>
                          window.open(
                            `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/wallet`,
                            "_self"
                          )
                        }
                      >
                        Recharge Wallet
                      </button>

                      {isBuy && !isBundle && (
                        <>
                          {User?.kyc_status !== "success" ? (
                            <OverlayTrigger
                              trigger={["click"]}
                              rootClose={true}
                              placement="top"
                              overlay={KycPopOverCart()}
                            >
                              <button className={"add-to-cart-btn"}>
                                <Image
                                  unoptimized={true}
                                  height={20}
                                  width={20}
                                  src={images.cartIconPNG}
                                  alt="Carticon"
                                />{" "}
                                Add to Cart
                              </button>
                            </OverlayTrigger>
                          ) : (
                            <button
                              className={`add-to-cart-btn ${
                                inCart && "added-to-cart"
                              }`}
                              onClick={() => {
                                if (!inCart) {
                                  dispatch(
                                    add_to_cart_thunk(
                                      orderDetails.slug,
                                      orderDetails.available_quantity
                                    )
                                  );
                                }
                              }}
                            >
                              <Image
                                unoptimized={true}
                                height={20}
                                width={20}
                                src={images.cartIconPNG}
                                alt="CartIcon"
                              />{" "}
                              {!inCart ? "Add to Cart" : "Added to Cart"}
                            </button>
                          )}
                        </>
                      )}
                    </>
                  );
                } else if (erc721 && isOwner && isOrderOnSale) {
                  if (!bidOutDated && acceptBidConfirm) {
                    return (
                      <>
                        <button
                          disabled={false}
                          className={`place-bid-buy-btn filled-btn `}
                          onClick={() => setAcceptBidConfirm(!acceptBidConfirm)}
                        >
                          Cancel
                        </button>
                        <button
                          disabled={false}
                          className={`btn btn-dark text-center btn-lg mt-2 place-bid-buy-btn`}
                          onClick={handleAcceptBid}
                        >
                          Confirm
                        </button>
                      </>
                    );
                  } else {
                    if (isBid) {
                      return orderDetails?.timed_auction ? (
                        <button
                          disabled={latestBid?.slug ? true : false}
                          className={`place-bid-btn filled-btn full-width`}
                          onClick={() => setCancelTheSalePop(!cancelTheSalePop)}
                        >
                          Cancel the sale
                        </button>
                      ) : (
                        <>
                          <button
                            className={`place-bid-buy-btn filled-btn`}
                            onClick={() =>
                              setCancelTheSalePop(!cancelTheSalePop)
                            }
                          >
                            Cancel the sale
                          </button>
                          <button
                            disabled={
                              latestBid?.slug &&
                              latestBid?.status === "active" &&
                              dayjs() < bidExpiry &&
                              !bidExpired
                                ? false
                                : true
                            }
                            className={`btn btn-dark text-center btn-lg mt-2 rounded-pill place-bid-buy-btn`}
                            onClick={() =>
                              setAcceptBidConfirm(!acceptBidConfirm)
                            }
                          >
                            Accept Bid
                          </button>
                        </>
                      );
                    } else {
                      return (
                        <button
                          className={`place-bid-btn filled-btn full-width`}
                          onClick={() => setCancelTheSalePop(!cancelTheSalePop)}
                        >
                          Cancel the sale
                        </button>
                      );
                    }
                  }
                } else if (!erc721 && isOwner && isOrderOnSale) {
                  return (
                    <>
                      <button
                        disabled={false}
                        className={`place-bid-btn filled-btn full-width`}
                        onClick={() => setCancelTheSalePop(!cancelTheSalePop)}
                      >
                        Cancel the sale
                      </button>
                    </>
                  );
                } else if (isBid && isBuy) {
                  return (
                    <>
                      {User?.kyc_status !== "success" ? (
                        <OverlayTrigger
                          trigger={["click"]}
                          rootClose={true}
                          placement="top"
                          overlay={KycPopOver()}
                        >
                          <button className={`place-bid-buy-btn filled-btn`}>
                            Buy{" "}
                            {currencyFormat(
                              isBundle
                                ? orderDetails.total_bundle_amount
                                : orderDetails.buy_amount,
                              "USD"
                            )}
                          </button>
                        </OverlayTrigger>
                      ) : (
                        <button
                          disabled={
                            isAuctionEnded &&
                            typeof latestBid === "object" &&
                            Object.keys(latestBid).length > 0
                          }
                          className={`place-bid-buy-btn filled-btn`}
                          onClick={() => setPlaceBuyPop(!placeBuyPop)}
                        >
                          Buy{" "}
                          {currencyFormat(
                            isBundle
                              ? orderDetails.total_bundle_amount
                              : orderDetails.buy_amount,
                            "USD"
                          )}
                        </button>
                      )}

                      {orderDetails.timed_auction ? (
                        <>
                          {User?.kyc_status !== "success" ? (
                            <OverlayTrigger
                              trigger={["click"]}
                              rootClose={true}
                              placement="top"
                              overlay={KycPopOver()}
                            >
                              <button
                                disabled={(() => {
                                  if (!isAuctionStarted && !isAuctionEnded) {
                                    return !isAuctionStarted;
                                  } else {
                                    return isAuctionEnded;
                                  }
                                })()}
                                className={`btn btn-dark text-center btn-lg mt-2 rounded-pill place-bid-buy-btn`}
                              >
                                Place Bid
                              </button>
                            </OverlayTrigger>
                          ) : (
                            <button
                              disabled={(() => {
                                if (!isAuctionStarted && !isAuctionEnded) {
                                  return !isAuctionStarted;
                                } else {
                                  return isAuctionEnded;
                                }
                              })()}
                              className={`btn btn-dark text-center btn-lg mt-2 rounded-pill place-bid-buy-btn`}
                              onClick={() => setPlaceBidPop(!placeBidPop)}
                            >
                              Place Bid
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          {User?.kyc_status !== "success" ? (
                            <OverlayTrigger
                              trigger={["click"]}
                              rootClose={true}
                              placement="top"
                              overlay={KycPopOver()}
                            >
                              <button
                                className={`btn btn-dark text-center btn-lg mt-2 rounded-pill place-bid-buy-btn`}
                              >
                                Place Bid
                              </button>
                            </OverlayTrigger>
                          ) : (
                            <button
                              className={`btn btn-dark text-center btn-lg mt-2 rounded-pill place-bid-buy-btn`}
                              onClick={() => setPlaceBidPop(!placeBidPop)}
                            >
                              Place Bid
                            </button>
                          )}
                        </>
                      )}
                      {!isBundle && (
                        <>
                          {User?.kyc_status !== "success" ? (
                            <OverlayTrigger
                              trigger={["click"]}
                              rootClose={true}
                              placement="top"
                              overlay={KycPopOverCart()}
                            >
                              <button className={`add-to-cart-btn full-width`}>
                                <Image
                                  unoptimized={true}
                                  height={20}
                                  width={20}
                                  src={images.cartIconPNG}
                                  alt="CartIcon1"
                                />{" "}
                                Add to Cart
                              </button>
                            </OverlayTrigger>
                          ) : (
                            <button
                              className={`add-to-cart-btn full-width ${
                                inCart && "added-to-cart"
                              }`}
                              onClick={() => {
                                if (!inCart) {
                                  dispatch(
                                    add_to_cart_thunk(
                                      orderDetails.slug,
                                      orderDetails.available_quantity
                                    )
                                  );
                                }
                              }}
                            >
                              <Image
                                unoptimized={true}
                                height={20}
                                width={20}
                                src={images.cartIconPNG}
                                alt="CartIcon2"
                              />{" "}
                              {!inCart ? "Add to Cart" : "Added to Cart"}
                            </button>
                          )}
                        </>
                      )}
                    </>
                  );
                } else if (isBid) {
                  return orderDetails.timed_auction ? (
                    <>
                      {User?.kyc_status !== "success" ? (
                        <OverlayTrigger
                          trigger={["click"]}
                          rootClose={true}
                          placement="top"
                          overlay={KycPopOver()}
                        >
                          <button
                            disabled={(() => {
                              if (!isAuctionStarted && !isAuctionEnded) {
                                return !isAuctionStarted;
                              } else {
                                return isAuctionEnded;
                              }
                            })()}
                            className={`btn btn-dark text-center btn-lg mt-2 rounded-pill place-bid-btn full-width`}
                          >
                            Place Bid
                          </button>
                        </OverlayTrigger>
                      ) : (
                        <button
                          disabled={(() => {
                            if (!isAuctionStarted && !isAuctionEnded) {
                              return !isAuctionStarted;
                            } else {
                              return isAuctionEnded;
                            }
                          })()}
                          className={`btn btn-dark text-center btn-lg mt-2 rounded-pill place-bid-btn full-width`}
                          onClick={() => setPlaceBidPop(!placeBidPop)}
                        >
                          Place Bid
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {User?.kyc_status !== "success" ? (
                        <OverlayTrigger
                          trigger={["click"]}
                          rootClose={true}
                          placement="top"
                          overlay={KycPopOver()}
                        >
                          <button
                            className={`btn btn-dark text-center btn-lg mt-2 rounded-pill place-bid-btn full-width`}
                          >
                            Place Bid
                          </button>
                        </OverlayTrigger>
                      ) : (
                        <button
                          className={`btn btn-dark text-center btn-lg mt-2 rounded-pill place-bid-btn full-width`}
                          onClick={() => setPlaceBidPop(!placeBidPop)}
                        >
                          Place Bid
                        </button>
                      )}
                    </>
                  );
                } else if (isBuy) {
                  return User?.kyc_status !== "success" ? (
                    <>
                      <OverlayTrigger
                        trigger={["click"]}
                        rootClose={true}
                        placement="top"
                        overlay={KycPopOver()}
                      >
                        <button
                          disabled={false}
                          className={`btn btn-dark text-center btn-lg mt-2 place-bid-btn`}
                        >
                          Buy{" "}
                          {currencyFormat(
                            isBundle
                              ? orderDetails.total_bundle_amount
                              : orderDetails.buy_amount,
                            "USD"
                          )}
                        </button>
                      </OverlayTrigger>

                      {!isBundle && (
                        <OverlayTrigger
                          trigger={["click"]}
                          rootClose={true}
                          placement="top"
                          overlay={KycPopOverCart()}
                        >
                          <button className={"add-to-cart-btn"}>
                            <Image
                              unoptimized={true}
                              height={20}
                              width={20}
                              src={images.cartIconPNG}
                              alt="CartIcon3"
                            />{" "}
                            Add to Cart
                          </button>
                        </OverlayTrigger>
                      )}
                    </>
                  ) : (
                    <>
                      <button
                        disabled={false}
                        className={`btn btn-dark text-center btn-lg mt-2 place-bid-btn`}
                        onClick={() => setPlaceBuyPop(!placeBuyPop)}
                      >
                        Buy{" "}
                        {currencyFormat(
                          isBundle
                            ? orderDetails.total_bundle_amount
                            : orderDetails.buy_amount,
                          "USD"
                        )}
                      </button>
                      {!isBundle && (
                        <button
                          className={`add-to-cart-btn ${
                            inCart && "added-to-cart"
                          }`}
                          onClick={() => {
                            if (!inCart) {
                              dispatch(
                                add_to_cart_thunk(
                                  orderDetails.slug,
                                  orderDetails.available_quantity
                                )
                              );
                            }
                          }}
                        >
                          <Image
                            unoptimized={true}
                            height={20}
                            width={20}
                            src={images.cartIconPNG}
                            alt="CartIcon4"
                          />{" "}
                          {!inCart ? "Add to Cart" : "Added to Cart"}
                        </button>
                      )}
                    </>
                  );
                } else {
                  return (
                    <button
                      disabled={true}
                      className={`btn btn-dark text-center btn-lg mt-2 rounded-pill place-bid-btn full-width`}
                    >
                      Yet To Be Listed!
                    </button>
                  );
                }
              })()}
            </>
            <div className={`mt-2 royalty-info`}>
              {/* {erc721 &&
              nft.auction_extend_minutes &&
              `Counterbid within the last 5 minutes will extend the auction by ${nft.auction_extend_minutes} minutes`} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTOrderBaseDetails;
