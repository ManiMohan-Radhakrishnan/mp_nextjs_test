import dayjs from "dayjs";
import { useRouter } from "next/router";

import { currencyFormat } from "../../utils/common";

// import style from "./style.module.scss";

const TransactionCard = ({ nft, history, isEnd = false }) => {
  const router = useRouter();
  const ownerState = history?.owner_state ? history?.owner_state : "initial";
  //const { user } = useSelector((state) => state.user.data);

  return (
    <div className={"bid-histroy-card"}>
      {isEnd ? (
        <div className={"history-end-content"}>
          You&apos;ve reached the end of the list
        </div>
      ) : (
        <>
          <div className={`first-half full-width`}>
            <div className="bid-histoy-details">
              <div className={`time text-secondary`}>
                {ownerState === "initial" ? `Transfered on` : `Assigned on`}:{" "}
                {dayjs(history.transfered_at).format("MMM D, YYYY hh:mm A")}
              </div>
              <div className={"bid-owner"}>
                <span
                  className={`transaction-value text-secondary`}
                  role={"button"}
                  onClick={() =>
                    router.push(`/user/${history.buyer_slug}/details`)
                  }
                >
                  {ownerState === "initial"
                    ? history.buyer_name
                    : history.seller_name}
                </span>
                &nbsp;has {ownerState === "initial" ? `bought` : `assigned`}
                &nbsp;
                {nft?.nft_type === "erc721" ? "this" : history.quantity}{" "}
                NFT&nbsp;
                {ownerState === "initial" ? `from` : `to`}&nbsp;
                <span
                  className={`transaction-value text-secondary`}
                  role={"button"}
                  onClick={() =>
                    router.push(`/user/${history.seller_slug}/details`)
                  }
                >
                  {ownerState === "initial"
                    ? history.seller_name
                    : history.buyer_name}
                </span>
                {parseFloat(history?.total_amount) >= 0.1 && (
                  <>
                    &nbsp;for&nbsp;
                    <span className={"transaction-value"}>
                      {currencyFormat(history.total_amount, "USD")}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* <div className="second-half">
            <div className="bid-value">
              {currencyFormat(history.total_amount, "USD")}
            </div>
          </div> */}
        </>
      )}
    </div>
  );
};

export default TransactionCard;
