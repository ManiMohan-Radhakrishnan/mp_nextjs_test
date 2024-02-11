import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillAndroid, AiFillWindows } from "react-icons/ai";
import { useSelector } from "react-redux";
import { getAndroidAPK } from "../../redux/reducers/user_reducer";
import { EVENT_NAMES, invokeTrackEvent } from "../../utils/track-events";
import PlayStore from "../../images/google-play-image.png";
import AppStore from "../../images/apple-image.png";
import PlayStoreWhite from "../../images/google-play-image_white.png";
import AppStoreWhite from "../../images/apple-image_white.png";

import MCLlogo from "../../images/jump-trade/schedule-paid/mcl-logo.png";
import RaddxLogo from "../../images/jump-trade/schedule-paid/raddx-logo.png";

import style from "./style.module.scss";
import Image from "next/image";
const DownloadGame = () => {
  const router = useRouter();
  const androidAPK = useSelector(getAndroidAPK);
  const [GShover, setGSHover] = useState(false);
  const [APPHover, setAPPHover] = useState(false);
  const [GShoverRaddx, setGSHoverRaddx] = useState(false);
  const [APPHoverRaddx, setAPPHoverRaddx] = useState(false);

  // const windowsEXE = useSelector(getWindowsEXE);

  return (
    <>
      <article className={`${style["download-btn-section"]}`}>
        <div className="container-fluid">
          <div className="row align-items-end">
            <div className="col-12 col-sm-12 col-md-4 ">
              <div
                className={`${style["live-upcoming-tour"]} ${style["btnblock-tour"]} ${style["border-right"]} `}
              >
                <h5 className={style["mclnotes_title"]}>
                  {" "}
                  Daily <br /> Tournament Schedule
                </h5>
                <div className={`${style["btn-block"]} mt-2`}>
                  <a
                    href="#"
                    rel="noreferrer"
                    className={`${style["download-icon-btn"]} ${style["theme-btn"]} ${style["rounded-bordered"]}`}
                    onClick={() => {
                      router.push("/tournaments");
                      invokeTrackEvent(EVENT_NAMES?.MCL_SCHEDULE_CLICKED);
                    }}
                  >
                    <span>SCHEDULE</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12  col-md-4">
              <div
                className={`${style["live-upcoming-tour"]} ${style["btnblock-tour"]} ${style["border-right"]}`}
              >
                {/* <Image
                  className="gamepass-icon"
                  height={100}
                  width={100}
                  src={MCLlogo}
                  alt="GamePass"
                /> */}
                <h5 className={style["mclnotes_title"]}>Download MCL Game</h5>
                <div className={`${style["downloads-section"]} `}>
                  <div
                    className={`d-flex pt-3 gap-3 flex-wrap justify-content-center ${style["downloads_btns"]} `}
                  >
                    <a
                      href="https://play.google.com/store/apps/details?id=com.metacricketleague.app"
                      target="_blank"
                      rel="nofollow noopoener noreferrer"
                    >
                      <Image
                        unoptimized={true}
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
                    <a
                      href="https://apps.apple.com/in/app/meta-cricket-league-nft-game/id1616152944"
                      target="_blank"
                      rel="nofollow noopoener noreferrer"
                    >
                      <Image
                        unoptimized={true}
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
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12  col-md-4">
              <div
                className={`${style["live-upcoming-tour"]} ${style["btnblock-tour"]}`}
              >
                {/* <Image
                  className=" "
                  height={100}
                  width={150}
                  src={RaddxLogo}
                  alt="GamePass"
                /> */}
                <h5 className={style["mclnotes_title"]}>Download RADDX Game</h5>
                <div className={`${style["downloads-section"]} `}>
                  <div
                    className={`d-flex pt-3 gap-3 flex-wrap justify-content-center ${style["downloads_btns"]} `}
                  >
                    <a
                      href="https://play.google.com/store/apps/details?id=com.chennaigames.mrracer"
                      target="_blank"
                      rel="nofollow noopoener noreferrer"
                    >
                      <Image
                        height="100"
                        width="100"
                        className={style["image_icon"]}
                        src={GShoverRaddx ? PlayStoreWhite : PlayStore}
                        alt="PlayStore"
                        priority={true}
                        onMouseOver={() => setGSHoverRaddx(true)}
                        onMouseOut={() => setGSHoverRaddx(false)}
                        unoptimized={true}
                      />
                    </a>
                    <a
                      href="https://apps.apple.com/in/app/raddx-racing-metaverse/id1671159641"
                      target="_blank"
                      rel="nofollow noopoener noreferrer"
                    >
                      <Image
                        height="100"
                        width="100"
                        className={style["image_icon"]}
                        src={APPHoverRaddx ? AppStoreWhite : AppStore}
                        alt="PlayStore"
                        priority={true}
                        onMouseOver={() => setAPPHoverRaddx(true)}
                        onMouseOut={() => setAPPHoverRaddx(false)}
                        unoptimized={true}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default DownloadGame;
