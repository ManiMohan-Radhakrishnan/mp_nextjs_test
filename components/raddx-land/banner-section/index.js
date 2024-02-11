import Image from "next/image";
import CryptoImage from "../../../images/drop/bat-drop/banner/crypto-image.svg";
import CustomerImage from "../../../images/drop/bat-drop/banner/customer-image.png";
import GameImage from "../../../images/drop/bat-drop/banner/game-utility.svg";
import ProofImage from "../../../images/drop/bat-drop/banner/proof-image.svg";
import TradeImage from "../../../images/drop/bat-drop/banner/trade-bat-image.svg";
import carImage from "../../../images/drop/raddx-land-nft/car.json";
import earnImage from "../../../images/drop/raddx-land-nft/Earn.json";

import Lottie from "lottie-react";

import coinJsonImage from "../../../images/json/shots/01-Coin-Spin.json";
import batBollJsonImage from "../../../images/json/shots/02-Bat-ball.json";
import tradableJsonImage from "../../../images/json/shots/03-Tradable.json";
import style from "./style.module.scss";

const RaddxLandBannerSection = () => {
  return (
    <section className={style["bat-banner-section"]}>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className={style["head-section-block"]}>
              <h1 className={style["head-section"]}>
                INTRODUCING
                <span className={style["head-sec-title1"]}>
                  RADDX SPEEDWAY TRACKS
                </span>
              </h1>
              <p className={style["desc-section"]}>
                Introducing our latest tracks, featuring iconic building
                structures paired with lands uncover exciting ownership.
                Discover the thrill of racing combined with the allure of owning
                premium Metaverse properties.
              </p>

              <h3>The Ultimate Horizon Adventure awaits! </h3>

              <ul className={style["hero-reason-block"]}>
                <li>
                  <div className={style["reason-img"]}>
                    <Lottie animationData={coinJsonImage} loop={true} />
                  </div>
                  <h5>Own</h5>
                </li>
                <li>
                  <div className={style["reason-img"]}>
                    <Lottie animationData={carImage} loop={true} />
                  </div>
                  <h5>Build</h5>
                </li>
                <li>
                  <div className={style["reason-img"]}>
                    <Lottie animationData={earnImage} loop={true} />
                  </div>
                  <h5>Earn</h5>
                </li>
                <li>
                  <div className={style["reason-img"]}>
                    <Lottie animationData={tradableJsonImage} loop={true} />
                  </div>
                  <h5>Trade</h5>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RaddxLandBannerSection;
