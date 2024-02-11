import Image from "next/image";
import { useSelector } from "react-redux";
import { AiFillAndroid, AiFillWindows } from "react-icons/ai";
import { useRouter } from "next/router";

import Pass from "../../../images/drop/pass.png";
import MclIcon from "../../../images/download-mcl-icon.svg";
import GameImage from "../../../images/drop/bat-drop/banner/game-utility.svg";
import Rewards from "../../../images/drop/reward.png";
import style from "./style.module.scss";
import {
  getAndroidAPK,
  getWindowsEXE,
} from "../../../redux/reducers/user_reducer";

const MegaBannerSection = () => {
  const router = useRouter();
  const androidAPK = useSelector(getAndroidAPK);
  // const windowsEXE = useSelector(getWindowsEXE);

  return (
    <section className={style["bat-banner-section"]}>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className={style["head-section-block"]}>
              <h1 className={style["head-section"]}>
                {/* INTRODUCING THE{" "} */}
                {/* <span className={style["head-sec-title1"]}>$25,000</span>{" "} */}
                {/* WORTH OF APTOS TOKEN PRIZE-PACKED <br /> */}
                <span className={style["head-sec-title1"]}>
                  COMPETE, CONQUER & WIN APT TOKENS!!!
                </span>{" "}
                {/* TOURNAMENT! */}
              </h1>
              <p className={`${style["desc-section"]} mb-0`}>
                Claim $25,000 in <span>APTOS</span> Tokens by Dominating the
                Airdrop MCL MEGA PLAY Showdown! Your journey to the ultimate
                Web3 token hunt begins here!
              </p>
              <div className={style["section-heading"]}>
                <h2>HOW TO WIN APT TOKENS</h2>
                <p>
                  Join the Mega Play Tournament and Compete for $25,000 Worth of
                  Aptos (APT) Tokens Airdrop!
                </p>
              </div>
              {/* <p className="desc-section">
                Get closer to winning the ultimate showdown by just playing MCL
                and grabbing your
              </p> */}
              {/* <h2>MEGA PLAY PASS!!!</h2> */}

              <ul className={style["hero-reason-block"]}>
                <li>
                  <div className={style["reason-img"]}>
                    <Image
                      unoptimized={true}
                      height={300}
                      width={300}
                      src={Pass}
                      alt="ProofImage"
                    ></Image>
                  </div>
                  <h5>Claim Free Pass</h5>
                </li>
                {/* <li>
                  <div className={style["reason-img"]}>
                    <Image unoptimized={true}
                      height={300}
                      width={300}
                      src={MclIcon}
                      alt="CryptoImage"
                    ></Image>
                  </div>
                  <h5>Download MCL Game</h5>
                </li> */}
                <li>
                  <div className={style["reason-img"]}>
                    <Image
                      unoptimized={true}
                      height={300}
                      width={300}
                      src={GameImage}
                      alt="CustomerImage"
                    ></Image>
                  </div>
                  <h5>PLAY MATCHES</h5>
                </li>
                <li>
                  <div className={style["reason-img"]}>
                    <Image
                      unoptimized={true}
                      height={300}
                      width={300}
                      src={Rewards}
                      alt="GameImage"
                    ></Image>
                  </div>
                  <h5>WIN APTOS TOKENS</h5>
                </li>
                {/* <li>
                  <div className={style["reason-img"]}>
                    <Image unoptimized={true}
                      height={300}
                      width={300}
                      src={TradeImage}
                      alt="TradeImage"
                    ></Image>
                  </div>
                  <h5>Trade your Bat NFTs</h5>
                </li> */}
              </ul>
              {/* <h4 className={style["head-section"]}>DOWNLOAD MCL GAME</h4>
              <div className={`${style["btn-block"]} mt-2`}>
                <a
                  href={androidAPK}
                  // target="_blank"
                  rel="noreferrer"
                  className={`${style["download-icon-btn"]} ${style["theme-btn"]}`}
                >
                  <span>
                    {" "}
                    <AiFillAndroid /> ANDROID
                  </span>
                </a>
                <a
                  href={windowsEXE}
                  // target="_blank"
                  rel="noreferrer"
                  className={`${style["download-icon-btn"]} ${style["theme-btn"]}`}
                >
                  <span>
                    {" "}
                    <AiFillWindows /> WINDOWS
                  </span>
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MegaBannerSection;
