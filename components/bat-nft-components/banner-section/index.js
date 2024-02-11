import Image from "next/image";
import { AiFillAndroid, AiFillWindows } from "react-icons/ai";
import CryptoImage from "../../../images/drop/bat-drop/banner/crypto-image.svg";
import CustomerImage from "../../../images/drop/bat-drop/banner/customer-image.png";
import GameImage from "../../../images/drop/bat-drop/banner/game-utility.svg";
import ProofImage from "../../../images/drop/bat-drop/banner/proof-image.svg";
import TradeImage from "../../../images/drop/bat-drop/banner/trade-bat-image.svg";
import style from "./style.module.scss";

const BannerSection = () => {
  return (
    <section className={style["bat-banner-section"]}>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className={style["head-section-block"]}>
              <h1 className={style["head-section"]}>
                INTRODUCING CRYPTO BAT NFTs BACKED BY{" "}
                <span className={style["head-sec-title1"]}>
                  BTC, ETH, BNB, DOGE, &amp; MATIC!
                </span>
              </h1>
              <p className={style["desc-section"]}>
                The Crypto Bat NFT Collection is the First-Of-Its-Kind NFT Bat
                attached with Crypto Assets Of Tangible Values, enabling you to
                Buy The Dip, Play in the MCL Game, and access many more
                benefits!
              </p>

              <ul className={style["hero-reason-block"]}>
                <li>
                  <div className={style["reason-img"]}>
                    <Image
                      unoptimized={true}
                      height={300}
                      width={300}
                      src={CryptoImage}
                      alt="CryptoImage"
                    ></Image>
                  </div>
                  <h5>Crypto-backed Assets</h5>
                </li>

                <li>
                  <div className={style["reason-img"]}>
                    <Image
                      unoptimized={true}
                      height={300}
                      width={300}
                      src={ProofImage}
                      alt="ProofImage"
                    ></Image>
                  </div>
                  <h5>Proof-of-Reserves</h5>
                </li>

                <li>
                  <div className={style["reason-img"]}>
                    <Image
                      unoptimized={true}
                      height={300}
                      width={300}
                      src={CustomerImage}
                      alt="CustomerImage"
                    ></Image>
                  </div>
                  <h5>Yield for Genesis Holders</h5>
                </li>

                <li>
                  <div className={style["reason-img"]}>
                    <Image
                      unoptimized={true}
                      height={300}
                      width={300}
                      src={GameImage}
                      alt="GameImage"
                    ></Image>
                  </div>
                  <h5>In-game Utilities</h5>
                </li>
                <li>
                  <div className={style["reason-img"]}>
                    <Image
                      unoptimized={true}
                      height={300}
                      width={300}
                      src={TradeImage}
                      alt="TradeImage"
                    ></Image>
                  </div>
                  <h5>Trade your Bat NFTs</h5>
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
