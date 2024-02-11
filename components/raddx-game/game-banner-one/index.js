import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { BsCurrencyDollar } from "react-icons/bs";

import style from "../style.module.scss";
import images from "../../../utils/images.json";

import { tournamentscheduleListApi } from "../../../utils/base-methods";
import { AiFillAndroid, AiFillInfoCircle, AiFillWindows } from "react-icons/ai";
import ContentLoader from "react-content-loader";
import ScheduleImage from "../../../images/schedule-image.png";
import useWindowSize from "../../../hooks/useWindowSize";
import dayjs from "dayjs";
import GamePass from "../../../images/jump-trade/schedule-paid/game-pass.svg";
import ToolTip from "../../tooltip";
import { useRouter } from "next/router";
import { invokeTrackEvent } from "../../../utils/track-events";
import PlayStore from "../../../images/google-play-image.png";
import AppStore from "../../../images/apple-image.png";
import PlayStoreWhite from "../../../images/google-play-image_white.png";
import AppStoreWhite from "../../../images/apple-image_white.png";

import MCLlogo from "../../../images/jump-trade/schedule-paid/mcl-logo.png";
import RaddxLogo from "../../../images/jump-trade/schedule-paid/raddx-logo.png";

import Racecar from "../../../images/jump-trade/schedule-paid/race_car.svg";
import Racecarflag from "../../../images/jump-trade/schedule-paid/race_flag.svg";
import { getDeviceType } from "../../../redux/reducers/user_reducer";

const RaddxSchedule = ({ hideSign = false, ...props }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [matchScedule, setMatchScedule] = useState([]);
  const { width } = useWindowSize();

  const leaderBoardRef = useRef(null);
  const [topEarnersList, setTopEarnersList] = useState([]);
  const [GShover, setGSHover] = useState(false);
  const [APPHover, setAPPHover] = useState(false);
  const apiCallMade = useRef(false);
  const deviceType = useSelector(getDeviceType);

  useEffect(() => {
    if (router.query.winners) {
      setTimeout(
        () => leaderBoardRef?.current?.scrollIntoView({ behavior: "smooth" }),
        750
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.winners]);

  useEffect(() => {
    invokeTrackEvent("Page Viewed", {
      "Page Name": "Mcl Game",
      "Page URL": window?.location?.href,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const dispatch = useDispatch();

  useEffect(() => {
    // Check if the API call has already been made
    if (!apiCallMade.current) {
      // Make the API call here
      tournamentsTimer();

      // Update the flag to indicate that the API call has been made
      apiCallMade.current = true;
    }
  }, []);

  const tournamentsTimer = async () => {
    try {
      setLoading(true);
      let result = await tournamentscheduleListApi("raddx");
      setMatchScedule(
        result?.data?.data?.active?.sort(
          (a, b) => b?.paid_event - a?.paid_event
        ) || []
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <section className={style["game-banner"]}>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-12 text-center">
              {/* <div className="">
                <h2 className={`${style["mcl-game-title"]} `}>
                  RADDX TOURNAMENT SCHEDULE
                </h2>
                {/* <h2 className={`${style["mcl-game-time"]} `}></h2> */}
              {/* </div> */}
              <Image
                className="gamepass-logo"
                height={100}
                width={150}
                src={RaddxLogo}
                alt="GamePass"
              />
              {!loading ? (
                <>
                  {width > 992 ? (
                    <div className="table-block tournament-tabel">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>
                              <Image
                                className="thead-icon"
                                height={40}
                                width={40}
                                src={images.tournament}
                                alt="tournament"
                              />
                              Tournaments
                            </th>
                            <th>
                              <Image
                                className="thead-icon"
                                height={40}
                                width={40}
                                src={images.timing}
                                alt="timing"
                              />
                              Timings (IST)
                            </th>
                            <th>
                              <Image
                                className="thead-icon"
                                height={150}
                                width={150}
                                src={Racecar.src}
                                alt="matches"
                              />
                              Races
                            </th>
                            {/* <th>
                              <Image
                                className="thead-icon"
                                height={40}
                                width={40}
                                src={images.player}
                                alt="player"
                              />
                              Players
                            </th> */}
                            {/* <th>
                              <Image
                                className="thead-icon"
                                height={40}
                                width={40}
                                src={images.bat_icon}
                                alt="bat_icon"
                              />
                              Bat
                            </th> */}
                            <th>
                              <Image
                                className="thead-icon"
                                height={40}
                                width={40}
                                src={images.winner}
                                alt="winner"
                              />
                              Winners
                            </th>
                            <th className="rewards">
                              <Image
                                className="thead-icon"
                                height={40}
                                width={40}
                                src={images.reward}
                                alt="reward"
                              />
                              Rewards
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {matchScedule?.length > 0 ? (
                            <>
                              {matchScedule.map((list, i) => (
                                <tr
                                  key={i}
                                  className={`${
                                    list?.paid_event && "paid-event"
                                  }`}
                                >
                                  <td className="title">
                                    {list?.name && list.name.slice(0, 40)}{" "}
                                    {list?.paid_event && (
                                      <>
                                        {" "}
                                        {/* <Image
                                          height={40}
                                          width={40}
                                          src={GamePass.src}
                                          alt="GamePass"
                                        /> */}
                                        <div className="gamepass-icon-box">
                                          <Image
                                            className="gamepass-icon"
                                            height={40}
                                            width={40}
                                            src={GamePass.src}
                                            alt="GamePass"
                                          />
                                        </div>
                                      </>
                                    )}
                                  </td>
                                  <td>
                                    <div>
                                      <>
                                        {dayjs(list?.start_time).format(
                                          "MMM D, YYYY hh:mm:A"
                                        )}
                                        {dayjs(list?.end_time).format(
                                          "MM/DD/YYYY"
                                        ) ===
                                          dayjs(list?.start_time).format(
                                            "MM/DD/YYYY"
                                          ) &&
                                          ` - ${dayjs(list?.end_time).format(
                                            "hh:mm A"
                                          )}`}
                                      </>
                                      {/* Starts -{" "} */}
                                    </div>
                                    <div>
                                      {/* Ends -{" "} */}
                                      {dayjs(list?.end_time).format(
                                        "MM/DD/YYYY"
                                      ) !==
                                        dayjs(list?.start_time).format(
                                          "MM/DD/YYYY"
                                        ) &&
                                        dayjs(list?.end_time).format(
                                          "MMM D, YYYY hh:mm A"
                                        )}
                                    </div>
                                  </td>
                                  <td>
                                    {list?.races}{" "}
                                    {/* {list?.paid_event && (
                                      <ToolTip
                                        icon={
                                          <AiFillInfoCircle
                                            size={16}
                                            className="mb-1 check-icon"
                                          />
                                        }
                                        content={
                                          " Only Top 2 matches with the best scores will count toward the leaderboard"
                                        }
                                        placement="top"
                                      />
                                    )} */}
                                  </td>
                                  {/* <td>{list?.players}</td> */}
                                  {/* <td>
                                    <Image
                                      className="bat-status-icon"
                                      height={40}
                                      width={40}
                                      src={
                                        list?.has_bat
                                          ? images.tick_white
                                          : images.wrong_white
                                      }
                                      alt="bat_icon"
                                    />
                                  </td> */}
                                  <td>{list?.total_winners}</td>
                                  <td className="rewards">
                                    {
                                      <>
                                        <span>
                                          {parseInt(list?.prize_pool || 0)}
                                          &nbsp;
                                        </span>
                                        {list?.display_code}
                                      </>
                                    }
                                  </td>
                                </tr>
                              ))}
                            </>
                          ) : (
                            <tr className="text-center">
                              <td colSpan={7}>
                                Tournament schedule is getting ready. Stay
                                tuned.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <>
                      {matchScedule.length > 0 ? (
                        <div className="flexy-mcl-game-block">
                          <ul className="hint-list">
                            <li>
                              {/* <div className="bat-icon-box">
                                <Image
                                  className="bat-icon"
                                  height={40}
                                  width={40}
                                  src={images.bat_icon}
                                  alt="bat_icon"
                                />
                              </div>
                              - Bat allowed */}
                            </li>
                            {/* <li>W - Winners</li> */}
                            {/* <li>R - Rewards</li> */}
                          </ul>

                          <div className="flexy-mcl-game-list">
                            {matchScedule.map((list) => (
                              <>
                                <article
                                  className={`${
                                    list?.paid_event && "paid-event"
                                  } flexy-mcl-game-tiem`}
                                >
                                  <div className="flexy-mcl-header">
                                    {list?.has_bat && (
                                      <div className="bat-icon-box">
                                        <Image
                                          className="bat-icon"
                                          height={40}
                                          width={40}
                                          src={images.bat_icon}
                                          alt="bat_icon"
                                        />
                                      </div>
                                    )}
                                    {list?.paid_event && (
                                      <div className="gamepass-icon-box">
                                        <Image
                                          className="gamepass-icon"
                                          height={40}
                                          width={40}
                                          src={GamePass.src}
                                          alt="GamePass"
                                        />
                                      </div>
                                    )}
                                    <h4>
                                      {list?.name && list.name.slice(0, 40)}
                                    </h4>

                                    <h6 className="timing">
                                      <Image
                                        className="timing-icon"
                                        height={40}
                                        width={40}
                                        src={images.timing_white}
                                        alt="timing"
                                      />
                                      <div className="date-time-box">
                                        <h6>
                                          <>
                                            {dayjs(list?.start_time).format(
                                              "MMM D, YYYY hh:mm A"
                                            )}{" "}
                                            {dayjs(list?.end_time).format(
                                              "MM/DD/YYYY"
                                            ) ===
                                              dayjs(list?.start_time).format(
                                                "MM/DD/YYYY"
                                              ) &&
                                              `- ${dayjs(list?.end_time).format(
                                                "hh:mm A"
                                              )}`}{" "}
                                          </>
                                        </h6>

                                        <h6>
                                          {dayjs(list?.end_time).format(
                                            "MM/DD/YYYY"
                                          ) !==
                                            dayjs(list?.start_time).format(
                                              "MM/DD/YYYY"
                                            ) &&
                                            `${dayjs(list?.end_time).format(
                                              "MMM D, YYYY hh:mm A"
                                            )}`}{" "}
                                        </h6>
                                      </div>
                                    </h6>
                                  </div>
                                  <div className="flexy-mcl-body">
                                    <ul className="feature-list">
                                      <li>
                                        <span className="key-feature">
                                          Races
                                        </span>
                                        <span className="value-feature">
                                          {list?.races}
                                          {/* {list?.paid_event && (
                                            <ToolTip
                                              icon={
                                                <AiFillInfoCircle
                                                  size={16}
                                                  className="mb-1 check-icon"
                                                />
                                              }
                                              content={
                                                "Only Top 2 matches with the best scores will count toward the leaderboard"
                                              }
                                              placement="top"
                                            />
                                          )} */}
                                        </span>
                                      </li>
                                      <li>
                                        <span className="key-feature">
                                          Winners
                                        </span>
                                        <span className="value-feature">
                                          {list?.total_winners}
                                        </span>
                                      </li>
                                      <li>
                                        <span className="key-feature">
                                          Rewards
                                        </span>
                                        <span className="value-feature winner-rewards-sec">
                                          <>
                                            {parseInt(list?.prize_pool || 0)}{" "}
                                            {list?.display_code}
                                          </>
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </article>
                              </>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <>
                          {width < 768 && (
                            <div className={`${style["nomatchfound-mobile"]}`}>
                              <Image
                                src={ScheduleImage.src}
                                alt="Schedule"
                                height="518"
                                width="1112"
                              />
                              <p>
                                Tournament schedule is getting ready. Stay
                                tuned.
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>{width > 768 ? <MyLoader /> : <MobileLoader />}</>
              )}

              <div className={`${style["btn-block-mclpg"]}`}>
                {/* <a
                  href={androidAPK}
                  className={`${style["theme-btn"]} ${style["download-btn"]}`}
                >
                  <span>
                    <AiFillAndroid />
                    ANDROID
                  </span>
                </a>
                <a
                  href={windowsEXE}
                  className={`${style["theme-btn"]} ${style["download-btn"]}`}
                >
                  <span>
                    <AiFillWindows />
                    WINDOWS
                  </span>
                </a> */}
                <div className={`${style["downloads-section"]} `}>
                  <div
                    className={`d-flex pt-3 gap-3 flex-wrap justify-content-center ${style["downloads_btns"]} `}
                  >
                    {deviceType === "android" && (
                      <a
                        href="https://play.google.com/store/apps/details?id=com.chennaigames.mrracer"
                        target="_blank"
                        rel="nofollow noopoener noreferrer"
                      >
                        <Image
                          layout="responsive"
                          height="100"
                          width="100"
                          className={style["image_icon"]}
                          src={GShover ? PlayStoreWhite : PlayStore}
                          alt="PlayStore"
                          priority={true}
                          onMouseOver={() => setGSHover(true)}
                          onMouseOut={() => setGSHover(false)}
                        />
                      </a>
                    )}
                    {!deviceType && (
                      <a
                        href="https://play.google.com/store/apps/details?id=com.chennaigames.mrracer"
                        target="_blank"
                        rel="nofollow noopoener noreferrer"
                      >
                        <Image
                          layout="responsive"
                          height="100"
                          width="100"
                          className={style["image_icon"]}
                          src={GShover ? PlayStoreWhite : PlayStore}
                          alt="PlayStore"
                          priority={true}
                          onMouseOver={() => setGSHover(true)}
                          onMouseOut={() => setGSHover(false)}
                        />
                      </a>
                    )}
                    {deviceType === "ios" && (
                      <a
                        href="https://apps.apple.com/in/app/raddx-racing-metaverse/id1671159641"
                        target="_blank"
                        rel="nofollow noopoener noreferrer"
                      >
                        <Image
                          layout="responsive"
                          height="100"
                          width="100"
                          className={style["image_icon"]}
                          src={APPHover ? AppStoreWhite : AppStore}
                          alt="PlayStore"
                          priority={true}
                          onMouseOver={() => setAPPHover(true)}
                          onMouseOut={() => setAPPHover(false)}
                        />
                      </a>
                    )}
                    {!deviceType && (
                      <a
                        href="https://apps.apple.com/in/app/raddx-racing-metaverse/id1671159641"
                        target="_blank"
                        rel="nofollow noopoener noreferrer"
                      >
                        <Image
                          layout="responsive"
                          height="100"
                          width="100"
                          className={style["image_icon"]}
                          src={APPHover ? AppStoreWhite : AppStore}
                          alt="PlayStore"
                          priority={true}
                          onMouseOver={() => setAPPHover(true)}
                          onMouseOut={() => setAPPHover(false)}
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className={`${style["hr-line"]}  mt-5`}></div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RaddxSchedule;

const MyLoader = () => (
  <ContentLoader
    viewBox="0 0 380 50"
    backgroundColor="#4d4a5f"
    foregroundColor="#212031"
  >
    <rect x="30" y="17" rx="4" ry="4" width="300" height="20" />
  </ContentLoader>
);

const MobileLoader = () => (
  <ContentLoader
    viewBox="0 0 500 150"
    backgroundColor="#4d4a5f"
    foregroundColor="#212031"
  >
    <rect x="15" y="5" rx="4" ry="4" width="450" height="20" />
    <rect x="15" y="35" rx="4" ry="4" width="450" height="80" />
  </ContentLoader>
);
