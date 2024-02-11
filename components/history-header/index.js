import dayjs from "dayjs";
import Image from "next/image";
import { useSelector } from "react-redux";

import images from "../../utils/images.json";
import style from "./style.module.scss";

const HistoryHeader = ({ nftOwner, nft }) => {
  const { user } = useSelector((state) => state.user.data);

  return (
    <>
      {nftOwner?.slug && (
        <div className={style["bid-history--header"]}>
          <div className={style["bh-user-image"]}>
            <Image
              unoptimized={true}
              height={30}
              width={30}
              src={
                !nftOwner?.private && nftOwner?.avatar_url
                  ? nftOwner?.avatar_url
                  : user?.slug === nftOwner?.slug && nftOwner?.avatar_url
                  ? nftOwner?.avatar_url
                  : images.userJPG
              }
              alt="bid-user"
            />
          </div>
          <div className={style["bh-user-details"]}>
            <h2 className={style["bh-user-name"]}>
              {user?.slug === nftOwner?.slug
                ? `@${user?.first_name}${user?.last_name}`
                : nftOwner?.user_name}
            </h2>
            <h4 className={style["bh-user-status"]}>Owner</h4>
            <div className={style["bh-user-sold-info"]}>
              {/* <div className={style["price"]}>
            <span className="key">NFT sold for</span>
            <span className={style["value"]}>
              {currencyFormat(nftOwner?.sold_amount, "USD")}
            </span>
          </div> */}
              <div className={style["date"]}>
                {!parseInt(process.env.NEXT_PUBLIC_HINDUSTAN_TIMES_ID) ===
                  nft?.celebrity_id && (
                  <>
                    <span className={style["key"]}>Sold on</span>
                    <span className={style["value"]}>
                      {dayjs(nftOwner?.sold_at).format("MMM D, YYYY hh:mm A")}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryHeader;
