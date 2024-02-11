import Image from "next/image";
import React from "react";
import { fieldingDirection } from "../../utils/common";

import style from "./style.module.scss";
import images from "../../utils/images.json";
import ToolTip from "../tooltip";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";

const FieldingPitchStatsDirection = ({ FieldingData }) => {
  const fieldingDataDirectionData = fieldingDirection(FieldingData?.value);

  return (
    <div className={`current-bid ${style["shot-detail-layout"]}`}>
      <div className={style["pitch-block"]}>
        <h5 className={style["title"]}>
          Fielding Direction{" "}
          <ToolTip
            icon={<AiOutlineInfoCircle size={16} className="mb-1 check-icon" />}
            content="The direction the user needs to play a particular fielding."
            placement="top"
          />
        </h5>
        <Image
          unoptimized={true}
          className={style["pitch-img"]}
          width="300"
          height="300"
          src={fieldingDataDirectionData?.value}
          alt="short-direction"
          priority={true}
          placeholder={"blur"}
          blurDataURL={"/sample.gif"}
        />
      </div>
    </div>
  );
};

export default FieldingPitchStatsDirection;
