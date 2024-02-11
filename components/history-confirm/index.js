import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";

import ToolTip from "../tooltip/index";
import images from "../../utils/images.json";
import { currencyFormat } from "../../utils/common";
import { acceptBidApi } from "../../utils/methods";
import style from "./style.module.scss";

const HistoryConfirm = ({
  nft,
  orderSlug,
  acceptBidConfirm,
  setAcceptBidConfirm,
  acceptBidDetail,
  isOrderOnSale,
  isOrderSuccess,
  isOrderCancelled,
  soldOut,
  transferringNFT,
}) => {
  const { user } = useSelector((state) => state.user.data);
  const [success, setSuccess] = useState(false);

  const handleAcceptBid = async () => {
    try {
      const result = await acceptBidApi({
        order_slug: orderSlug,
        order: { bid_slug: acceptBidDetail.bid_slug },
      });
      if (result.data.success) {
        setSuccess(true);
      }
    } catch (error) {
      if (error.response.data.status === 422) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {success || transferringNFT || soldOut ? (
        <div className={style["bid-history-confirm"]}>
          <div className={style["success-msg"]}>
            <FaThumbsUp className={style["thumbUp-icon"]} />
            {soldOut ? (
              <h3>Collectible Sold</h3>
            ) : (
              <h3>
                Token Transfer Initiated{" "}
                <ToolTip
                  icon={
                    <BsFillQuestionCircleFill
                      size={16}
                      className="ms-2 check-icon"
                    />
                  }
                  content={
                    "The NFT's transfer/transaction is in process on the blockchain. Visit again for latest sale-status."
                  }
                  placement="top"
                />{" "}
              </h3>
            )}
          </div>
        </div>
      ) : (
        <div className={style["bid-history-confirm"]}>
          <div className={style["bh-user-details"]}>
            <div className={style["bh-user-image"]}>
              <Image
                unoptimized={true}
                height={30}
                width={30}
                src={
                  !acceptBidDetail.private && acceptBidDetail.avatar_url
                    ? acceptBidDetail.avatar_url
                    : user?.slug === acceptBidDetail.slug &&
                      acceptBidDetail.avatar_url
                    ? acceptBidDetail.avatar_url
                    : images.userJPG
                }
                alt="bid-user"
              />
            </div>
            <h2 className={style["bh-user-name"]}>
              {acceptBidDetail.user_name}
            </h2>
          </div>
          <div className={style["bh-user-sold-details"]}>
            <div className={style["sold-info"]}>
              <div className={style["price"]}>
                <span className={style["key"]}>Highest Bid Price</span>
                <span className={style["value"]}>
                  {currencyFormat(acceptBidDetail.bid_amount, "USD")}
                </span>
              </div>
              <div className={style["price"]}>
                <span className={style["key"]}>
                  Artist Fee{" "}
                  <ToolTip
                    icon={
                      <BsFillQuestionCircleFill
                        size={16}
                        className="mb-1 check-icon"
                      />
                    }
                    content={
                      "The royalty paid to the artist or the inspiration."
                    }
                    placement="top"
                  />
                </span>
                <span className="value">{parseFloat(nft.royalties)}%</span>
              </div>
              <div className={style["price"]}>
                <span className={style["key"]}>
                  Service Fee{" "}
                  <ToolTip
                    icon={
                      <BsFillQuestionCircleFill
                        size={16}
                        className="mb-1 check-icon"
                      />
                    }
                    content={
                      "The service fee includes gas fee and the platform fee."
                    }
                    placement="top"
                  />
                </span>
                <span className={style["value"]}>
                  {parseFloat(nft.service_fee)}%
                </span>
              </div>
            </div>
            <div className={style["total"]}>
              <span className={style["key"]}>You will Get</span>
              <span className={style["value"]}>
                {currencyFormat(
                  parseFloat(acceptBidDetail.bid_amount) -
                    (parseFloat(acceptBidDetail.bid_amount) *
                      (parseFloat(nft.royalties) +
                        parseFloat(nft.service_fee))) /
                      100,
                  "USD"
                )}
              </span>
            </div>

            <div className={style["footer-btn-box"]}>
              <div className={style["notes-box"]}>
                <p>
                  Note: Once you sell your NFT, it will be moved from your
                  collectibles in the &apos;My NFTs section.
                </p>
              </div>
              <div className={style["btn-block"]}>
                <button
                  className={`btn btn-dark text-center btn-lg rounded-pill btn-outline`}
                  onClick={() => setAcceptBidConfirm(!acceptBidConfirm)}
                >
                  Back
                </button>
                <button
                  className={`btn btn-dark text-center btn-lg rounded-pill btn-filled`}
                  onClick={handleAcceptBid}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryConfirm;
