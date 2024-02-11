import dayjs from "dayjs";
import { useRouter } from "next/router";
import { RiChatUploadFill } from "react-icons/ri";

import { currencyFormat } from "../../../utils/common";

const UpgradeCard = ({ nft, history, isEnd = false }) => {
  const router = useRouter();
  //const { user } = useSelector((state) => state.user.data);

  return (
    <div className={"bid-histroy-card"}>
      {isEnd ? (
        <div className={"bid-empty-content"}>
          <div className={"empty-top-container"}>
            <div className={"empty-top-content"}>
              <RiChatUploadFill />
              <div className={"empty-text"}>No upgrades yet.</div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={`first-half full-width`}>
            <div className="bid-histoy-details">
              <div className={`time text-secondary`}>
                Upgraded on :{" "}
                {dayjs(history?.upgraded_at).format("MMM D, YYYY hh:mm A")}
              </div>
              <div className={"bid-owner"}>
                <span
                  className={`transaction-value text-secondary`}
                  role={"button"}
                  onClick={() =>
                    router.push(`/user/${history?.user_slug}/details`)
                  }
                >
                  {history?.user_name}
                </span>
                &nbsp;has upgraded this NFT from&nbsp; Level{" "}
                {history?.from_level} to Level {history?.to_level}
                {(() => {
                  if (history?.payment_type === "assert") {
                    return (
                      <>
                        &nbsp;for&nbsp;
                        <span className={"transaction-value"}>
                          {parseFloat(history?.buy_value).toFixed(2)}
                          {" JT Points  "}
                        </span>{" "}
                      </>
                    );
                  } else {
                    return (
                      <>
                        &nbsp;for&nbsp;
                        <span className={"transaction-value"}>
                          {currencyFormat(history.buy_value, "USD")}
                        </span>
                      </>
                    );
                  }
                })()}
                &nbsp;
                {history?.used_cards === 0
                  ? `during a SPECIAL EVENT.`
                  : `using ${history?.used_cards} upgrade cards`}
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

export default UpgradeCard;
