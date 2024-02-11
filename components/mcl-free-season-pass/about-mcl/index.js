import Image from "next/image";
import Metaverse from "../../../images/drop/all-about-mcl/metaverse-image.svg";
import GamePlayImage from "../../../images/drop/all-about-mcl/game-play-image.svg";
import StrategyImage from "../../../images/drop/all-about-mcl/strategy-image.svg";
import ClubImage from "../../../images/drop/all-about-mcl/club-image.svg";
import BatImage from "../../../images/drop/all-about-mcl/bat-image.svg";
import RewardImage from "../../../images/drop/all-about-mcl/rewards-image.svg";

import style from "./style.module.scss";

const AboutMclSeasonPass = () => {
  return (
    <>
      <section className={style["mcl-rush-section"]}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={style["mcl-rush-flex"]}>
                <div className={style["mcl-rush-flex-card"]}>
                  <h1>
                    <span>ALL ABOUT</span> MCL RUSH
                  </h1>
                  <p>
                    Meet MCL RUSH, a completely new game format that mixes
                    Strategy, Decision-Making, and Skill to bring a unique
                    Metaverse Cricket experience.
                  </p>
                  <p>
                    Players must set up teams and enter tournaments to win
                    exciting rewards daily!
                  </p>
                </div>
                <ul className={style["mcl-rush-flex-list"]}>
                  <li>
                    <div className={style["mcl-rush-imgbox"]}>
                      <Image
                        unoptimized={true}
                        height={150}
                        width={150}
                        src={GamePlayImage}
                        alt="metaverse"
                      />
                    </div>
                    <h4>New Format</h4>
                    <p>
                      {`MCL Rush's exciting new strategy game format puts your
                      skills to the test`}
                    </p>
                  </li>
                  <li>
                    <div className={style["mcl-rush-imgbox"]}>
                      <Image
                        unoptimized={true}
                        height={150}
                        width={150}
                        src={Metaverse}
                        alt="clubImage"
                      />
                    </div>
                    <h4>New Avatars</h4>
                    <p>
                      Custom Roster of metaverse cricketers with striking
                      jerseys and fresh stats
                    </p>
                  </li>
                  <li>
                    <div className={style["mcl-rush-imgbox"]}>
                      <Image
                        unoptimized={true}
                        height={150}
                        width={150}
                        src={ClubImage}
                        alt="batImage"
                      />
                    </div>
                    <h4>16 Global Metaverse Clubs</h4>
                    <p>
                      Play with your favourite metaverse clubs form around the
                      world
                    </p>
                  </li>
                  <li>
                    <div className={style["mcl-rush-imgbox"]}>
                      <Image
                        unoptimized={true}
                        height={150}
                        width={150}
                        src={RewardImage}
                        alt="rewardImage"
                      />
                    </div>
                    <h4>Daily Rewards</h4>
                    <p>Set up teams and play daily for exciting rewards</p>
                  </li>
                  <li>
                    <div className={style["mcl-rush-imgbox"]}>
                      <Image
                        unoptimized={true}
                        height={150}
                        width={150}
                        src={StrategyImage}
                        alt="strategyImage"
                      />
                    </div>
                    <h4>Real-time Strategy</h4>
                    <p>
                      Counter your opponents with superior team-building skills
                    </p>
                  </li>
                  <li>
                    <div className={style["mcl-rush-imgbox"]}>
                      <Image
                        unoptimized={true}
                        height={150}
                        width={150}
                        src={BatImage}
                        alt="gamePlay"
                      />
                    </div>
                    <h4>PvP Tournaments</h4>
                    <p>
                      Go head-to-head against opponents and emerge victorious
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMclSeasonPass;
