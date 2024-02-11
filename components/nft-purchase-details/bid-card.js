import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { useSelector } from "react-redux";

import BidName from "./bid-name";
import images from "../../utils/images.json";
// import style from "./style.module.scss";
import { currencyFormat } from "../../utils/common";

const BidCard = ({ history, isEnd = false }) => {
  const { user } = useSelector((state) => state.user.data);

  return (
    <div className="bid-histroy-card">
      {isEnd ? (
        <div className="history-end-content">
          You&apos;ve reached the end of the list
        </div>
      ) : (
        <>
          <div className="first-half">
            <Image
              unoptimized={true}
              height={30}
              width={30}
              alt="avatar"
              src={
                !history.private && history.avatar_url
                  ? history.avatar_url
                  : user?.slug === history.slug && history.avatar_url
                  ? history.avatar_url
                  : images.userJPG
              }
            />
            <div className="bid-histoy-details">
              <div className="time text-secondary">
                {dayjs(history.created_at).format("MMM D, YYYY hh:mm A")}
              </div>
              <div className="bid-owner">
                Bid placed by{" "}
                <BidName
                  imgUrl={history.avatar_url}
                  text={history.user_name}
                  slug={history.slug}
                />
              </div>
            </div>
          </div>
          <div className="second-half">
            <div className="bid-value">
              {currencyFormat(history.bid_amount, "USD")}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BidCard;
