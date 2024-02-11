import React from "react";
import Image from "next/image";
import { BsArrowRight, BsAsterisk } from "react-icons/bs";
// import heroImg from "../../../images/bns/hero-flow.svg";
import Lottie from "lottie-react";
import searchLottie from "../../../images/drop/vip-pass/collectible.png";
import registerLottie from "../../../images/drop/vip-pass/game.png";
import tradeLottie from "../../../images/drop/vip-pass/trade.png";

import style from "./style.module.scss";
const HeroBandSection = () => {
  return (
    <>
      <section className={`${style["hero-section"]}`}>
        <div className={`${style["info-img-set"]}`}>
          <ul className={`${style["lottie-list"]}`}>
            <li>
              {" "}
              <div className={`${style["cotent-box"]}`}>
                <Image
                  unoptimized={true}
                  src={searchLottie}
                  height="60"
                  width="60"
                  alt="Collectible"
                />
                {/* <Lottie animationData={searchLottie} loop={true} /> */}

                <h6>Collectible</h6>
              </div>
              <BsArrowRight className={`${style["arrow-icon"]}`} />
            </li>
            <li>
              {" "}
              <div className={`${style["cotent-box"]}`}>
                <Image
                  unoptimized={true}
                  src={registerLottie}
                  height="60"
                  width="60"
                  alt="Playable"
                />
                <h6>Playable</h6>
              </div>
              <BsArrowRight className={`${style["arrow-icon"]}`} />
            </li>
            <li>
              {" "}
              <div className={`${style["cotent-box"]}`}>
                <Image
                  unoptimized={true}
                  src={tradeLottie}
                  height="60"
                  width="60"
                  alt="Tradable"
                />
                <h6>Tradable</h6>
              </div>
              {/* <BsArrowRight className={`${style["arrow-icon"]}`} /> */}
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default HeroBandSection;
