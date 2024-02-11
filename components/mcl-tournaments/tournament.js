import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import NFTCounter from "../nft-counter";
import style from "./style.module.scss";
import GamePass from "../../images/jump-trade/schedule-paid/game-pass.svg";

const Tournament = ({
  index,
  statusChange = () => {},
  tournamentData = {},
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
  }, [tournamentData]);

  const showTimer = () => {
    if (
      new Date().getTime() <= new Date(tournamentData?.end_time).getTime() &&
      new Date().getTime() > new Date(tournamentData?.start_time).getTime()
    ) {
      setIsLiveStarted(true);
      setIsUpcoming(false);
      setIsFinished(false);
    }
    if (
      new Date().getTime() <= new Date(tournamentData?.start_time).getTime()
    ) {
      setIsLiveStarted(false);
      setIsUpcoming(true);
      setIsFinished(false);
    }
    if (new Date().getTime() > new Date(tournamentData?.end_time).getTime()) {
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
    <div
      className={`${style["tournament-list"]} tournament-list ${
        isLiveStarted ? `${style["live-card"]} live-card` : ""
      }  ${
        tournamentData?.paid_event
          ? `${style["tournament-paid"]} tournament-paid`
          : ""
      }`.trim()}
    >
      {tournamentData?.paid_event && (
        <>
          <span className={style["bgcolor-half"]}></span>
          <Image
            unoptimized={true}
            src={GamePass.src}
            width={24}
            height={16}
            alt="GamePass"
            className={style["pass-icon"]}
          />
        </>
      )}
      <div className={style["inside-dot"]}>
        {/*<Image unoptimized={true} src={tournamentData?.img_url} /> */}
        {tournamentData?.img_url && (
          <Image
            unoptimized={true}
            src={tournamentData?.img_url}
            alt="Tournament"
            width={50}
            height={50}
            loading="eager"
            className={`${isLiveStarted && style["live-tournament"]}`}
          />
        )}
        <div className={style["details-tour"]}>
          <div className={style["head-title"]}>
            <h4 className={style["title"]}>
              {tournamentData?.name &&
                tournamentData.name.toUpperCase().slice(0, 25)}
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
                  dayjs(tournamentData.end_time).format("MMM D, YYYY hh:mm A")}
                {isLiveStarted && tournamentData?.end_time && (
                  <>
                    <NFTCounter
                      time={tournamentData?.end_time}
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
                {isUpcoming && tournamentData?.start_time && (
                  <>
                    <NFTCounter
                      time={tournamentData?.start_time}
                      timeClass={style["counter-time"]}
                      handleEndEvent={() => setChangeStart()}
                      cTime={cTime}
                    />
                  </>
                )}
                {tournamentData?.schedule && "Up Next"}
              </span>
            </div>
            {/* {isLiveStarted && (
              <span
                role="button"
                className={style["view-leaderboard-btn"]}
                onClick={() => viewLeaderBoard(tournamentData)}
              >
                View Leaderboard
              </span>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tournament;
