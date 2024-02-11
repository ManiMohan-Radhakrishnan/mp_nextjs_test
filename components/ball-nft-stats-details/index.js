import Image from "next/image";
import React from "react";

import images from "../../utils/images.json";

import style from "./style.module.scss";

const BallNftStatsDetails = ({ ballAttributes }) => {
  return (
    <div className={`current-bid ${style["shot-detail-layout"]}`}>
      <div className={style["pitch-block"]}>
        <h5 className={style["title"]}>Power Attributes </h5>
        <div className={style["ballNFT-wrapper"]}>
          {ballAttributes?.includes("Boundary Trap") && (
            <div className={style["ballNFT-item"]}>
              <Image
                unoptimized={true}
                className={style["pitch-img"]}
                width="300"
                height="300"
                alt="boundary-image"
                src={images?.boundary_image}
                priority={true}
                placeholder={"blur"}
                blurDataURL={images.sample}
              />
              <h5>Boundary Trap</h5>
            </div>
          )}
          {ballAttributes?.includes("Stealth Ball") && (
            <div className={style["ballNFT-item"]}>
              {" "}
              <Image
                unoptimized={true}
                className={style["pitch-img"]}
                width="300"
                height="300"
                alt="stealth-image"
                src={images?.stealth_image}
                priority={true}
                placeholder={"blur"}
                blurDataURL={images.sample}
              />
              <h5>Stealth Ball</h5>
            </div>
          )}
          {ballAttributes?.includes("Null runner") && (
            <div className={style["ballNFT-item"]}>
              <Image
                unoptimized={true}
                className={style["pitch-img"]}
                width="300"
                height="300"
                alt="nullRunner-image"
                src={images?.nullRunner_image}
                priority={true}
                placeholder={"blur"}
                blurDataURL={images.sample}
              />
              <h5>Null Runner</h5>
            </div>
          )}
          {ballAttributes?.includes("Loft Control") && (
            <div className={style["ballNFT-item"]}>
              <Image
                unoptimized={true}
                className={style["pitch-img"]}
                width="300"
                height="300"
                alt="loft-image"
                src={images?.loft_image}
                priority={true}
                placeholder={"blur"}
                blurDataURL={images.sample}
              />
              <h5>Loft Control</h5>
            </div>
          )}
          {ballAttributes?.includes("50-50") && (
            <div className={style["ballNFT-item"]}>
              <Image
                unoptimized={true}
                className={style["pitch-img"]}
                width="300"
                height="300"
                alt="fifty-image"
                src={images?.fifty_image}
                priority={true}
                placeholder={"blur"}
                blurDataURL={images.sample}
              />
              <h5>50-50</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BallNftStatsDetails;
