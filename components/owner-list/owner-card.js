import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { useSelector } from "react-redux";

import OwnerName from "./owner-name";
import images from "../../utils/images.json";

const OwnerCard = ({ owner, isEnd = false, totalQuantity }) => {
  const { user } = useSelector((state) => state.user.data);

  return (
    <div className={"bid-histroy-card"}>
      {isEnd ? (
        <div className={"history-end-content"}>
          You&apos;ve reached the end of the list
        </div>
      ) : (
        <>
          <div className={"first-half"}>
            <Image
              unoptimized={true}
              alt="Owner_avatar"
              height={20}
              width={20}
              src={
                !owner.private && owner.avatar_url
                  ? owner.avatar_url
                  : user?.slug === owner.slug && owner.avatar_url
                  ? owner.avatar_url
                  : images.userJPG
              }
            />
            <div className="bid-histoy-details">
              <div className={`time text-secondary`}>
                {dayjs(owner.sold_at).format("MMM D, YYYY hh:mm A")}
              </div>
              <div className={"bid-owner"}>
                NFT Owned by{" "}
                <OwnerName
                  imgUrl={owner.avatar_url}
                  text={owner.user_name}
                  slug={owner.slug}
                  seller={true}
                />
              </div>
            </div>
          </div>
          <div className={"second-half"}>
            <div
              className={"bid-value"}
            >{`${owner.sold_quantity} / ${totalQuantity}`}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default OwnerCard;
