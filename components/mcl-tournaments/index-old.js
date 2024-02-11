import Image from "next/image";
import Marquee from "react-fast-marquee";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { AiFillAndroid, AiFillWindows } from "react-icons/ai";

import Tournament from "./tournament";
import style from "./style.module.scss";
import images from "../../utils/images.json";
import imagesNew from "../../utils/images-new.json";
// import MCL from "../../images/mcl-game-launcher/mcl.png";
import {
  leaderBoardListApi,
  topEarners,
  tournamentsApi,
} from "../../utils/base-methods";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { Reorder } from "framer-motion";
import FlipMove from "react-flip-move";

import LeaderboardImage from "../../images/leaderboard-comingsoon.png";
import dayjs from "dayjs";
import { typeOf } from "@rumess/react-flip-countdown";
import useWindowUtils from "../../hooks/useWindowUtils";
import { tournamentTime } from "../../utils/common";
import { useSelector } from "react-redux";
import {
  getAndroidAPK,
  isUserLoggedIn,
} from "../../redux/reducers/user_reducer";
import ContentLoader from "react-content-loader";
import GamePass from "../../images/jump-trade/schedule-paid/game-pass.svg";
const MclTournaments = forwardRef((props, ref) => {
  const router = useRouter();
  // const androidAPK = useSelector(getAndroidAPK);
  // const windowsEXE = useSelector(getWindowsEXE);
  const loginStatus = useSelector(isUserLoggedIn);
  const { user } = useSelector((state) => state.user.data);
  const [tournamentData, setTournamentData] = useState([]);
  const [leaderTourData, setLeaderTourData] = useState({});
  const [leaderBoardList, setLeaderBoardList] = useState([
    { name: "hmmmJH", lb_points: 23816918, coins: "$2,381.69" },
    { name: "Hummer ENF", lb_points: 21547686, coins: "$2,154.77" },
    { name: "APSR369_ENF", lb_points: 15642744, coins: "$1,564.27" },
    { name: "ACommanMan_ENF", lb_points: 15491115, coins: "$1,549.11" },
    { name: "Errornotfnd_ENF", lb_points: 13840315, coins: "$1,384.03" },
    { name: "messi", lb_points: 13761036, coins: "$1,376.10" },
    { name: "MTG MTG", lb_points: 13600049, coins: "$1,360.00" },
    { name: "Gamer_LDH", lb_points: 12394948, coins: "$1,239.49" },
    { name: "SPARTANS ENF", lb_points: 12266663, coins: "$1,226.67" },
    { name: "YARU_ENF", lb_points: 12045641, coins: "$1,204.56" },
  ]);
  const [liveTournament, setLiveTournament] = useState(false);
  const leaderBoardRef = useRef();
  const window = useWindowUtils();
  const [paidEvent, setPaidEvent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topEarnersList, setTopEarnersList] = useState([]);
  const { width: innerWidth } = window;
  useEffect(() => {
    tournamentsTimer();
    getTopEarners();
    // setTempLeaderBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTopEarners = async () => {
    try {
      setLoading(true);
      let result = await topEarners();
      // console.log("setTopEarnersList", result);
      setTopEarnersList(result?.data?.data?.top_earners);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchLeaderBoardList = (leaderTourData) => {
    if (leaderTourData) {
      // getLeaderboardList(leaderTourData?.slug);
      // setLeaderTourData(leaderTourData);
      setLiveTournament(
        (new Date().getTime() <= new Date(leaderTourData?.end_time).getTime() &&
          new Date().getTime() >
            new Date(leaderTourData.start_time).getTime()) ||
          false
      );
    }
  };

  const getLeaderboardList = async (slug) => {
    try {
      setLoading(true);
      let result = await leaderBoardListApi(slug);
      setLeaderBoardList(result?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const tournamentsTimer = async () => {
    try {
      let result = await tournamentsApi();
      setTournamentData([]);
      dataCheck(result?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const dataCheck = (tournamentDetails) => {
    let activeData = tournamentDetails?.active?.filter(
      (items) =>
        new Date().getTime() <= new Date(items.end_time).getTime() &&
        new Date().getTime() > new Date(items.start_time).getTime()
    );

    if (activeData?.length > 1) {
      activeData?.sort(
        (firstElement, secondElement) =>
          new Date(firstElement.end_time).getTime() -
          new Date(secondElement?.end_time).getTime()
      );
      activeData?.push(
        ...tournamentDetails?.active.slice(
          activeData?.length,
          tournamentDetails?.active?.length
        )
      );
      setTournamentData(
        activeData?.sort((a, b) => b?.paid_event - a?.paid_event)
      );
      // fetchLeaderBoardList(activeData[0]);
    } else {
      setTournamentData(
        tournamentDetails?.active?.sort(
          (a, b) => b?.paid_event - a?.paid_event
        ) || []
      );
      // if (activeData?.length > 0) fetchLeaderBoardList(activeData[0]);
      // if (activeData?.length === 0)
      //   fetchLeaderBoardList(tournamentDetails?.finished[0]);
    }
  };

  return (
    <>
      <section className={style["tournament-main"]} ref={ref}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={style["content-center"]}>
                <h4>GAMES FOR THE WEB3 ERA ✦</h4>
                <h2>
                  NEXT-GEN <br />
                  METAVERSE CRICKET
                </h2>
                <p>
                  Experience The Awesomeness Of MCL, Buy NFTs From Our Gaming
                  NFT Marketplace, Play In Tournaments, &amp; Win Rewards!
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-6">
              {tournamentData?.length > 0 ? (
                <div className={style["live-upcoming-tour"]}>
                  <h6 className={style["heading"]}>
                    Live &amp; Upcoming Tournaments
                  </h6>
                  <div className={style["live-upcoming-tour-list"]}>
                    {tournamentData.map((data, index) => {
                      {
                        if (data?.paid_event && !paidEvent) setPaidEvent(true);
                        return (
                          <Tournament
                            index={index}
                            statusChange={() => tournamentsTimer()}
                            tournamentData={data}
                            viewLeaderBoard={(tournamentData) => {
                              fetchLeaderBoardList(tournamentData);
                              leaderBoardRef?.current?.scrollIntoView({
                                behavior: "smooth",
                              });
                            }}
                          />
                        );
                      }
                    })}
                  </div>
                  {paidEvent && (
                    <h6 className={style["live-upcoming-info"]}>
                      {" "}
                      <Image
                        alt="GamePass"
                        src={GamePass}
                        height={20}
                        width={20}
                      />{" "}
                      Entry Pass required
                    </h6>
                  )}
                </div>
              ) : (
                <Image
                  src={imagesNew?.NotScheduledImage}
                  alt="Schedule"
                  height={688}
                  width={830}
                  className={style["notscheduled-image"]}
                />
              )}
            </div>
            {/* <div className="col-12 col-lg-6">
              <div className={style["leaderboard-image"]}>
                <Image
                  alt="LeaderBoard"
                  src={LeaderboardImage}
                  height={688}
                  width={830}
                />
              </div>
            </div> */}
            {/* <div
              className="col-12 col-lg-6"
              ref={innerWidth < 992 ? leaderBoardRef : null}
             >
              <div className={style["table-block"]}>
                <div className="text-center">
                  <span className={style["tournament-name"]}>
                    {leaderTourData?.name}
                  </span>
                  <br />
                  <>
                    <span className={style["tour-time"]}>
                      {dayjs(leaderTourData?.start_time).format(
                        "MMM D, YYYY hh:mm A"
                      )}
                    </span>{" "}
                    -{" "}
                    <span className={style["tour-time"]}>
                      {dayjs(leaderTourData?.end_time).format("MM/DD/YYYY") ===
                      dayjs(leaderTourData?.start_time).format("MM/DD/YYYY")
                        ? dayjs(leaderTourData?.end_time).format("hh:mm A")
                        : dayjs(leaderTourData?.end_time).format(
                            "MMM D, YYYY hh:mm A"
                          )}{" "}
                      IST
                    </span>
                  </>
                </div>
                {!loading ? (
                  <>
                    {leaderBoardList?.length === 0 ||
                    typeof leaderBoardList === "undefined" ? (
                      <>
                        <div className={style["leaderboard-image"]}>
                          <Image
                            src={LeaderboardImage}
                            height={688}
                            width={830}
                          />
                          <span className={style["text-leader"]}>
                            Leaderboard standings will be updated shortly...
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className={style["leaderboard-table"]}>
                        <table>
                          <thead>
                            <tr>
                              <th className="text-center">
                                RANK {liveTournament && `*`}
                              </th>
                              <th></th>
                              <th>PLAYERS</th>
                              <th className="text-center">LB POINTS</th>
                              <th className="text-center">JT POINTS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {leaderBoardList?.map((items, index) => (
                              <tr
                                key={index}
                                className={
                                  items?.user_slug === user?.slug && loginStatus
                                    ? `${style["own-user"]}`
                                    : ""
                                }
                              >
                                <td className="text-center">{index + 1}</td>
                                <td>
                                  {index < 3 ? (
                                    <Image
                                      className="bat-status-icon"
                                      height={20}
                                      width={20}
                                      src={imagesNew[`price_${index + 1}`]}
                                      alt="bat_icon"
                                    />
                                  ) : (
                                    ""
                                  )}
                                </td>
                                <td>
                                  <div className={style["players-line"]}>
                                    {items?.name}
                                  </div>
                                </td>
                                <td className="text-center">
                                  {items.lb_points}
                                </td>
                                <td className="text-center">{items?.coins}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="leader-board-loader">
                    <div className="skeleton1"></div>
                  </div>
                )}
                {liveTournament &&
                  " * Leaderboard standings will refresh every 5 minutes"}
              </div>
            </div> */}

            <div className="col-12 col-lg-6">
              <div className={style["table-block"]}>
                <div className="text-center">
                  <span className={style["tournament-name"]}>
                    {/* {leaderTourData?.name} */}The Meta Cricket Tycoons
                  </span>{" "}
                  <br />
                  <span className={`${style["tour-time"]}`}>
                    The Top Earners Of The Season
                  </span>
                  <>
                    {/* <span className={style["tour-time"]}>
                      {dayjs(leaderTourData?.start_time).format(
                        "MMM D, YYYY hh:mm A"
                      )}
                    </span>{" "}
                    -{" "}
                    <span className={style["tour-time"]}>
                      {dayjs(leaderTourData?.end_time).format("MM/DD/YYYY") ===
                      dayjs(leaderTourData?.start_time).format("MM/DD/YYYY")
                        ? dayjs(leaderTourData?.end_time).format("hh:mm A")
                        : dayjs(leaderTourData?.end_time).format(
                            "MMM D, YYYY hh:mm A"
                          )}{" "}
                      IST
                    </span> */}
                  </>
                </div>
                {!loading ? (
                  <>
                    {topEarnersList?.length === 0 ||
                    typeof topEarnersList === "undefined" ? (
                      <>
                        <div className={style["leaderboard-image"]}>
                          <Image
                            src={LeaderboardImage}
                            alt="LeaderBoard"
                            height={688}
                            width={830}
                          />
                          <span className={style["text-leader"]}>
                            The Top Earners list will be updated shortly...
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={style["leaderboard-table"]}>
                          <table>
                            <thead>
                              <tr>
                                <th className="text-center">S.No</th>
                                <th></th>
                                <th>Nickname</th>
                                <th className="text-center">JT Points</th>
                                <th className="text-center">USD</th>
                              </tr>
                            </thead>
                            <tbody>
                              {topEarnersList?.map((items, index) => (
                                <>
                                  {index < 10 ? (
                                    <tr key={index}>
                                      <td className="text-center">
                                        {items?.serial_number}
                                      </td>
                                      <td></td>
                                      <td>
                                        <div className={style["players-line"]}>
                                          {items?.nickname}
                                        </div>
                                      </td>
                                      <td className="text-center">
                                        {items.jt_points}
                                      </td>
                                      <td className="text-center">
                                        {items?.usd}
                                      </td>
                                    </tr>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <button
                          className={style["view-more-btn"]}
                          onClick={() => router.push("mcl-game?winners=true")}
                        >
                          View more
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="leader-board-loader">
                    <div className="skeleton1"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});
MclTournaments.displayName = "MclTournaments";

export default MclTournaments;
