import Image from "next/image";
import Marquee from "react-fast-marquee";
import { forwardRef, useEffect, useState } from "react";

import style from "./style.module.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";

const VedioPlayer = ({ videoUrl, videoBox, onHide = () => {} }) => {
  return (
    <>
      {videoBox ? (
        <section className={`${style["buy-trade-video-container"]}`}>
          <div className={`${style["video-card-box"]}`}>
            {/* <video
              id="video-card"
              loop
              // muted
              autoPlay
              playsInline
              controls
              controlsList="nodownload"
              className={`${style["video-card"]}`}
              src={videoUrl}
              type="video/mp4"
            ></video> */}
            <div className={`${style["video-card"]}`}>
              <iframe
                width="100%"
                height="auto"
                src={videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div
              className={`${style["close-comp"]} ${style["d-inline-flex"]}`}
              onClick={() => onHide()}
            >
              <AiOutlineCloseCircle />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default VedioPlayer;
