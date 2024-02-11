import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import NFTCounter from "../nft-counter";
import style from "./style.module.scss";
import GamePass from "../../images/jump-trade/schedule-paid/game-pass.svg";

const RaddxTournament = ({
  index,
  statusChange = () => {},
  raddxtournamentData = {},
  viewLeaderBoard = () => {},
}) => {
  const [cTime, setCTime] = useState(new Date());
  // Timed Auction
  const [isUpcoming, setIsUpcoming] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isLiveStarted, setIsLiveStarted] = useState(false);

  var className = "upcoming-card";

  useEffect(() => {
    showTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raddxtournamentData]);

  const showTimer = async () => {
    if (
      new Date().getTime() <=
        new Date(raddxtournamentData?.end_time).getTime() &&
      new Date().getTime() > new Date(raddxtournamentData?.start_time).getTime()
    ) {
      setIsLiveStarted(true);
      setIsUpcoming(false);
      setIsFinished(false);
    }
    if (
      new Date().getTime() <=
      new Date(raddxtournamentData?.start_time).getTime()
    ) {
      setIsLiveStarted(false);
      setIsUpcoming(true);
      setIsFinished(false);
    }
    if (
      new Date().getTime() > new Date(raddxtournamentData?.end_time).getTime()
    ) {
      setIsLiveStarted(false);
      setIsUpcoming(false);
      setIsFinished(true);
    }
  };

  const setChangeStart = () => {
    let interval = setInterval(() => {
      statusChange();
      clearInterval(interval);
    }, 2000);
  };
  const setChangeEnd = () => {
    let interval = setInterval(() => {
      statusChange();
      clearInterval(interval);
    }, 2000);
  };

  if (isUpcoming) className = "upcoming-card";
  else if (isFinished) className = "expire-card";
  else if (isLiveStarted) className = "livenow-card";
  else className = "upnext-card";

  return (
    <>
      {!isFinished ? (
        <>
          {" "}
          <div
            className={`${style["tournament-list"]} tournament-list ${
              isLiveStarted ? `${style["live-card"]} live-card` : ""
            }  ${
              raddxtournamentData?.paid_event
                ? `${style["tournament-paid"]} tournament-paid`
                : ""
            }`.trim()}
          >
            {/* {raddxtournamentData?.paid_event && (
      <>
        <span className={style["bgcolor-half"]}></span>
        <Image
          src={
            GamePass.src
              ? GamePass.src
              : "https://cdn.guardianlink.io/product-hotspot/images/raddx/raddx-section-bg.webp"
          }
          width={24}
          height={16}
          alt="GamePass"
          className={style["pass-icon"]}
        />
      </>
    )} */}
            <div className={style["inside-dot"]}>
              {/*<Image src={raddxtournamentData?.img_url} /> */}
              {/* {raddxtournamentData?.bg_img && ( */}
              <Image
                src={
                  // raddxtournamentData?.bg_img
                  //   ? raddxtournamentData?.bg_img
                  //   : "https://cdn.guardianlink.io/product-hotspot/images/raddx/raddx-section-bg.webp"
                  "https://cdn.guardianlink.io/product-hotspot/images/Raddx_OG_Image_v1.jpg"
                }
                alt="RaddxTournament"
                width={50}
                height={50}
                loading="eager"
                className={`${isLiveStarted && style["live-tournament"]}`}
              />

              {/* )} */}
              <div className={style["details-tour"]}>
                <div className={style["head-title"]}>
                  <h4 className={style["title"]}>
                    {raddxtournamentData?.name &&
                      raddxtournamentData.name.toUpperCase().slice(0, 23)}
                    ..
                  </h4>

                  {isLiveStarted && (
                    <span className={style["live-btn"]}>
                      <span>●</span>
                      Live
                    </span>
                  )}
                </div>
                <div className={style["status-block"]}>
                  <div className={style["status-block-timer"]}>
                    <span className={`${style["timer-title"]} timer-title`}>
                      {isLiveStarted ? "Ends In" : "Starts In"}{" "}
                    </span>
                    <span
                      className={`${style["timer-block"]} tournament-timer-block`}
                    >
                      {isFinished &&
                        dayjs(raddxtournamentData.end_time).format(
                          "MMM D, YYYY hh:mm A"
                        )}
                      {isLiveStarted && raddxtournamentData?.end_time && (
                        <>
                          <NFTCounter
                            time={raddxtournamentData?.end_time}
                            timeClass={style["counter-time"]}
                            handleEndEvent={() => setChangeEnd()}
                            cTime={cTime}
                          />
                          {/* <div class="nft-counter">
                  <span class="counter-time  ">
                    1<span class="counter-interval interval-gap  ">h</span>
                  </span>
                  <span class="counter-time  ">
                    34<span class="counter-interval interval-gap  ">m</span>
                  </span>
                  <span class="counter-time  ">
                    12<span class="counter-interval interval-gap  ">s</span>
                  </span>
                </div> */}
                        </>
                      )}
                      {isUpcoming && raddxtournamentData?.start_time && (
                        <>
                          <NFTCounter
                            time={raddxtournamentData?.start_time}
                            timeClass={style["counter-time"]}
                            handleEndEvent={() => setChangeStart()}
                            cTime={cTime}
                          />
                        </>
                      )}
                      {raddxtournamentData?.schedule && "Up Next"}
                    </span>
                  </div>

                  {/* <span
                    role="button"
                    className={style["view-leaderboard-btn"]}
                    onClick={() => router.push("/tournaments?game=raddx")}
                  >
                    View Details
                  </span> */}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        " "
      )}
    </>
  );
};

export default RaddxTournament;
