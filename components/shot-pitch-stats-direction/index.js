import Image from "next/image";
import React from "react";
import { shotDirection } from "../../utils/common";

import style from "./style.module.scss";
import images from "../../utils/images.json";
import ToolTip from "../tooltip";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";

const ShotPitchStatsDirection = ({ ShotsData }) => {
  const shotDirectionData = shotDirection(ShotsData?.shot_direction?.value);

  return (
    <div className={`current-bid ${style["shot-detail-layout"]}`}>
      <div className={style["pitch-detail-block"]}>
        <h5 className={style["title"]}>
          Pitch Stats{" "}
          <ToolTip
            icon={<AiOutlineInfoCircle size={16} className="mb-1 check-icon" />}
            content="% of uptick to an MCL Batter's stats, based on the corresponding pitch type."
            placement="top"
          />
        </h5>

        <ul className={style["pitch-list"]}>
          <li className={`${style["pitch-layout"]}`}>
            <h5 className={` ${style["green"]}`}>
              {ShotsData?.pitch_green?.value}%
            </h5>
            <h6>Green</h6>
          </li>
          <li className={`${style["pitch-layout"]}`}>
            <h5 className={` ${style["dry"]}`}>
              {ShotsData?.pitch_dry?.value}%
            </h5>
            <h6>Dry</h6>
          </li>
          <li className={`${style["pitch-layout"]}`}>
            <h5 className={` ${style["normal"]}`}>
              {ShotsData?.pitch_normal?.value}%
            </h5>
            <h6>Normal</h6>
          </li>
        </ul>
      </div>
      <div className={style["pitch-block"]}>
        <h5 className={style["title"]}>
          Shot Direction{" "}
          <ToolTip
            icon={<AiOutlineInfoCircle size={16} className="mb-1 check-icon" />}
            content="The direction the user needs to play a particular shot."
            placement="top"
          />
        </h5>
        <Image
          unoptimized={true}
          className={style["pitch-img"]}
          width="300"
          height="300"
          src={shotDirectionData?.value}
          alt="short-direction"
          priority={true}
          placeholder={"blur"}
          blurDataURL={"/sample.gif"}
        />
      </div>
    </div>
  );
};

export default ShotPitchStatsDirection;
