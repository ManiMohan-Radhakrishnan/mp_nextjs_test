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
  tournamentscheduleListApi,
} from "../../utils/base-methods";
import Link from "next/link";
import { useRouter } from "next/router";
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
import RaddxTournament from "./raddx-tournament";
import MCLlogo from "../../images/jump-trade/schedule-paid/mcl-logo.png";
import RaddxLogo from "../../images/jump-trade/schedule-paid/raddx-logo.png";

const MclTournaments = forwardRef((props, ref) => {
  const router = useRouter();
  // const androidAPK = useSelector(getAndroidAPK);
  // const windowsEXE = useSelector(getWindowsEXE);
  const loginStatus = useSelector(isUserLoggedIn);
  const { user } = useSelector((state) => state.user.data);
  const [tournamentData, setTournamentData] = useState([]);
  const [raddxtournamentData, setRaddxTournamentData] = useState([]);

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
    tournamentsRaddx();
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
  const tournamentsRaddx = async () => {
    try {
      let result = await tournamentscheduleListApi("raddx");
      setRaddxTournamentData([]);
      dataCheckRaddx(result?.data?.data);
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

  const dataCheckRaddx = (raddxtournamentDetails) => {
    let activeData = raddxtournamentDetails?.active?.filter(
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
        ...raddxtournamentDetails?.active.slice(
          activeData?.length,
          raddxtournamentDetails?.active?.length
        )
      );
      setRaddxTournamentData(
        activeData?.sort((a, b) => b?.paid_event - a?.paid_event)
      );
      // fetchLeaderBoardList(activeData[0]);
    } else {
      setRaddxTournamentData(
        raddxtournamentDetails?.active?.sort(
          (a, b) => b?.paid_event - a?.paid_event
        ) || []
      );

      // if (activeData?.length > 0) fetchLeaderBoardList(activeData[0]);
      // if (activeData?.length === 0)
      //   fetchLeaderBoardList(raddxtournamentDetails?.finished[0]);
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
                  LIVE THE MOST REALISTIC <br />
                  WEB3 EXPERIENCE
                </h2>
                <p>
                  Mark your calendars for our exclusive futuristic web3 game
                  tournaments! Stay up-to-date on the schedule and don&apos;t
                  miss your chance to compete for glory.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-6">
              <Image
                className={style["tournament-logo-icon"]}
                height={100}
                width={100}
                src={MCLlogo}
                alt="MCLlogo"
                unoptimized={true}
              />
              {tournamentData?.length > 0 ? (
                <div className={style["live-upcoming-tour"]}>
                  <h6 className={style["heading"]}>
                    MCL Live &amp; Upcoming Tournaments
                  </h6>
                  <div
                    className={style["live-upcoming-tour-list"]}
                    onClick={() => router.push("/tournaments?game=mcl")}
                  >
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
                        unoptimized={true}
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
                  unoptimized={true}
                  src={imagesNew?.NotScheduledImage}
                  alt="Schedule"
                  height={688}
                  width={830}
                  className={style["notscheduled-image"]}
                />
              )}
            </div>

            <div className="col-12 col-lg-6">
              <Image
                className={style["tournament-logo-icon"]}
                height={100}
                width={150}
                src={RaddxLogo}
                alt="RaddxLogo"
              />
              {raddxtournamentData?.length > 0 ? (
                <div className={style["live-upcoming-tour"]}>
                  <h6 className={style["heading"]}>
                    RADDX Live &amp; Upcoming Tournaments
                  </h6>
                  <div
                    className={style["live-upcoming-tour-list"]}
                    onClick={() => router.push("/tournaments?game=raddx")}
                  >
                    {raddxtournamentData.map((data, index) => {
                      {
                        // if (data?.paid_event && !paidEvent) setPaidEvent(true);
                        return (
                          <RaddxTournament
                            index={index}
                            statusChange={tournamentsRaddx}
                            raddxtournamentData={data}
                            viewLeaderBoard={(raddxtournamentData) => {
                              fetchLeaderBoardList(raddxtournamentData);
                              leaderBoardRef?.current?.scrollIntoView({
                                behavior: "smooth",
                              });
                            }}
                          />
                        );
                      }
                    })}
                  </div>
                  {/* {paidEvent && (
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
                  )} */}
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
          </div>
        </div>
      </section>
    </>
  );
});
MclTournaments.displayName = "MclTournaments";

export default MclTournaments;
