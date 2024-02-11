import { useEffect, useState } from "react";

import images from "../../utils/images.json";
import style from "./style.module.scss";
import Image from "next/image";
import useWindowUtils from "../../hooks/useWindowUtils";
import RaddxGame from "../raddx-game";
import MclGame from "../mcl-game";
import MclTournamentBannerMob from "../../images/jump-trade/schedule-paid/banner-tournaments-mob.jpg";
import MclTournamentBannerWeb from "../../images/jump-trade/schedule-paid/banner-tournaments-web.jpg";
import { useRouter } from "next/router";

const TournamentScheduleList = () => {
  const [tab, setTab] = useState("mcl");
  const router = useRouter();

  const { game } = router.query;

  useEffect(() => {
    if (game) {
      setTab(game);
    }
  }, [game]);

  const window = useWindowUtils();
  const { width: innerWidth } = window;
  return (
    <>
      <div className={`${style["releasenotes-wrapper"]} releasenotes-wrapper`}>
        <Image
          src={
            innerWidth < 425
              ? MclTournamentBannerMob.src
              : MclTournamentBannerWeb.src
          }
          alt="Release"
          width={750}
          height={150}
          unoptimized={true}
        />

        <div className={style["c-tabs"]}>
          <div
            role="button"
            onClick={() => {
              setTab("mcl");
              router.replace("/tournaments");
            }}
            className={`${style["nav-tab"]} ${
              tab === "mcl" ? style["active"] : ""
            }`}
          >
            MCL Game
          </div>
          <div
            role="button"
            onClick={() => {
              setTab("raddx");
              router.replace("/tournaments");
            }}
            className={`${style["nav-tab"]} ${
              tab === "raddx" ? style["active"] : ""
            }`}
          >
            Raddx Game
          </div>
        </div>
        <div className={"c-tab-body"}>
          {(() => {
            if (tab === "mcl") {
              return (
                <div className="row">
                  <div className="col-12 text-center mb-5">
                    <MclGame />
                  </div>
                </div>
              );
            } else if (tab === "raddx") {
              return (
                <div className="row">
                  <div className="col-12 text-center mb-5">
                    <RaddxGame />
                  </div>
                </div>
              );
            }
          })()}
        </div>
      </div>
    </>
  );
};

export default TournamentScheduleList;
