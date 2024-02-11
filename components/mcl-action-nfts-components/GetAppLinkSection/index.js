import { useState } from "react";
import Image from "next/image";

import CryptoImage from "../../../images/drop/bat-drop/banner/crypto-image.svg";
import ProofImage from "../../../images/drop/bat-drop/banner/proof-image.svg";
import CustomerImage from "../../../images/drop/bat-drop/banner/customer-image.png";
import GameImage from "../../../images/drop/bat-drop/banner/game-utility.svg";
import TradeImage from "../../../images/drop/bat-drop/banner/trade-bat-image.svg";

import JoinWaitListAppLink from "./joinwaitlist-applink";
import style from "./style.module.scss";

const GetAppLinkSection = () => {
  const [phoneInfo, setPhoneInfo] = useState({
    phone_no: null,
    country_code: "in",
  });

  return (
    <section className={style["get-app-link-section"]}>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h4>
              CRYPTO BAT NFTs BACKED BY{" "}
              <span>BTC, ETH, BNB, DOGE, &amp; MATIC!</span>
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className={style["get-app-link-flex"]}>
              <ul className={style["reason-block"]}>
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
              <div className={style["joinwaitlist-box"]}>
                <JoinWaitListAppLink />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetAppLinkSection;
