import Image from "next/image";
import CryptoImage from "../../../images/drop/bat-drop/banner/crypto-image.svg";
import CustomerImage from "../../../images/drop/bat-drop/banner/customer-image.png";
import GameImage from "../../../images/drop/bat-drop/banner/game-utility.svg";
import ProofImage from "../../../images/drop/bat-drop/banner/proof-image.svg";
import TradeImage from "../../../images/drop/bat-drop/banner/trade-bat-image.svg";

import Lottie from "lottie-react";

import coinJsonImage from "../../../images/json/shots/01-Coin-Spin.json";
import batBollJsonImage from "../../../images/json/shots/02-Bat-ball.json";
import tradableJsonImage from "../../../images/json/shots/03-Tradable.json";
import style from "./style.module.scss";

const BannerSection = () => {
  return (
    <section className={style["bat-banner-section"]}>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className={style["head-section-block"]}>
              <h1 className={style["head-section"]}>
                INTRODUCING THE
                <span className={style["head-sec-title1"]}>
                  MCL SIGNATURE SHOTS - MYSTERY BOX
                </span>
              </h1>
              <p className={style["desc-section"]}>
                The MCL Signature Shots are tradeable, collectible, and playable
                NFTs that enhance your gameplay with adaptive line-connect
                accuracy. These shots bring a lot more style and flamboyance
                from the best of the real-world cricket legends, powered by 360°
                Motion-Capture Technology. <br />
                Don&apos;t miss the chance to own these unique shot NFTs that
                combine visual thrill and legendary shots
              </p>

              <ul className={style["hero-reason-block"]}>
                <li>
                  <div className={style["reason-img"]}>
                    {/* <Image unoptimized={true}
                      height={300}
                      width={300}
                      src={CryptoImage}
                      alt="CryptoImage"
                    ></Image> */}
                    <Lottie animationData={coinJsonImage} loop={true} />
                  </div>
                  <h5>Collectible</h5>
                </li>
                <li>
                  <div className={style["reason-img"]}>
                    {/* <Image unoptimized={true}
                      height={300}
                      width={300}
                      src={GameImage}
                      alt="GameImage"
                    ></Image> */}
                    <Lottie animationData={batBollJsonImage} loop={true} />
                  </div>
                  <h5>Playable</h5>
                </li>
                <li>
                  <div className={style["reason-img"]}>
                    {/* <Image unoptimized={true}
                      height={300}
                      width={300}
                      src={TradeImage}
                      alt="TradeImage"
                    ></Image> */}
                    <Lottie animationData={tradableJsonImage} loop={true} />
                  </div>
                  <h5>Tradable</h5>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
