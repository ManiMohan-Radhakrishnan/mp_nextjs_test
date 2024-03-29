import dayjs from "dayjs";
import Image from "next/image";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BsFillQuestionCircleFill } from "react-icons/bs";

import BidName from "./bid-name";
import ToolTip from "../tooltip/index";
import NFTCounter from "../nft-counter";
import images from "../../utils/images.json";
import { currencyFormat } from "../../utils/common";

const BidCard = ({
  setBidExpiry,
  setIsBidder,
  history,
  isOrderOnSale = false,
  isOwner = false,
  isEnd = false,
  acceptBidConfirm,
  setAcceptBidConfirm,
  setAcceptBidDetail,
  latestIndex,
  handleEndTimer,
  bidExpired,
  orderDetails,
  isAuctionEnded,
}) => {
  const { user } = useSelector((state) => state.user.data);

  useEffect(() => {
    if (isOrderOnSale && (history.slug === user?.slug || isOwner)) {
      setIsBidder(true);

      if (history?.status === "active" && latestIndex === 0) {
        setBidExpiry(dayjs(history.expires_at));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.slug, history]);

  return (
    <div
      className={`bid-histroy-card ${
        history?.status === "active" &&
        latestIndex === 0 &&
        dayjs() < dayjs(history.expires_at) &&
        !bidExpired
          ? "active-history-card"
          : ""
      }`}
    >
      {isEnd ? (
        <div className={"history-end-content"}>
          You&apos;ve reached the end of the list
        </div>
      ) : (
        <>
          <div className={"first-half"}>
            <Image
              unoptimized={true}
              alt="User"
              height={100}
              width={100}
              src={
                !history.private && history.avatar_url
                  ? history.avatar_url
                  : user?.slug === history.slug && history.avatar_url
                  ? history.avatar_url
                  : images.userJPG
              }
            />
            <div className="bid-histoy-details">
              <div className={`time text-secondary`}>
                {dayjs(history.created_at).format("MMM D, YYYY hh:mm A")}
                <span
                  className={`expire-pill ${
                    (history?.status === "active" &&
                      latestIndex === 0 &&
                      dayjs() < dayjs(history.expires_at) &&
                      !bidExpired) ||
                    (history?.status === "success" && latestIndex === 0)
                      ? "active"
                      : orderDetails?.timed_auction &&
                        history?.status === "active" &&
                        isAuctionEnded &&
                        latestIndex === 0
                      ? "processing"
                      : ""
                  }`}
                >
                  {orderDetails?.timed_auction &&
                  history?.status === "active" &&
                  isAuctionEnded &&
                  latestIndex === 0
                    ? "Processing..."
                    : history?.status === "active" &&
                      latestIndex === 0 &&
                      dayjs() < dayjs(history.expires_at) &&
                      !bidExpired
                    ? "Active"
                    : history?.status === "success" && latestIndex === 0
                    ? "Success"
                    : "Expired"}
                </span>
              </div>
              <div className={"bid-owner"}>
                Bid placed by{" "}
                <BidName
                  imgUrl={history.avatar_url}
                  text={history.user_name}
                  slug={history.slug}
                />
              </div>

              {user?.slug &&
                isOrderOnSale &&
                (history.slug === user?.slug || isOwner) &&
                history?.status === "active" &&
                latestIndex === 0 &&
                !orderDetails?.timed_auction && (
                  <div className={"bid-expire-cntent"}>
                    {dayjs() < dayjs(history.expires_at) && !bidExpired ? (
                      <>
                        Bid Expires at
                        <NFTCounter
                          time={dayjs(history.expires_at)}
                          handleEndEvent={handleEndTimer}
                        />{" "}
                        <ToolTip
                          icon={
                            <BsFillQuestionCircleFill
                              color={"#000"}
                              size={16}
                              className="mb-1 check-icon"
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
                  </div>
                )}

              {orderDetails?.timed_auction &&
                isAuctionEnded &&
                latestIndex === 0 && (
                  <div className={"bid-expire-cntent"}>
                    Processing Winner Details
                  </div>
                )}
            </div>
          </div>
          <div className={"second-half"}>
            <button
              className={"assign-btn"}
              onClick={() => {
                setAcceptBidConfirm(!acceptBidConfirm);
                setAcceptBidDetail(history);
              }}
            >
              Accept Bid
            </button>
            <div className={"bid-value"}>
              {currencyFormat(history.bid_amount, "USD")}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BidCard;
