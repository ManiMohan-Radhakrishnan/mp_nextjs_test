import { useState } from "react";
import Image from "next/image";

import InputPhone from "../InputPhone";

import TradeImage from "../../images/drop/metaverse-section/trade-image.svg";
import TeamImage from "../../images/drop/metaverse-section/team-image.svg";
import PlayImage from "../../images/drop/metaverse-section/play-image.svg";
import CashImage from "../../images/drop/metaverse-section/cash-image.svg";
import BorderLine from "../../images/drop/border-line.svg";

import style from "./style.module.scss";
import JoinWaitListAppLink from "./joinwaitlist-applink";

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
              METAVERSE CRICKET FOR{" "}
              <span className={style["theme-text"]}>THE MASSES</span>
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
                      src={TradeImage}
                      alt="TradeImage"
                    ></Image>
                  </div>
                  <h5>Trade Player NFTs</h5>
                </li>

                <li>
                  <div className={style["reason-img"]}>
                    <Image
                      unoptimized={true}
                      height={300}
                      width={300}
                      src={TeamImage}
                      alt="TeamImage"
                    ></Image>
                  </div>
                  <h5>Create Teams</h5>
                </li>

                <li>
                  <div className={style["reason-img"]}>
                    <Image
                      unoptimized={true}
                      height={300}
                      width={300}
                      src={PlayImage}
                      alt="PlayImage"
                    ></Image>
                  </div>
                  <h5>Play Tournaments</h5>
                </li>

                <li>
                  <div className={style["reason-img"]}>
                    <Image
                      unoptimized={true}
                      height={300}
                      width={300}
                      src={CashImage}
                      alt="CashImage"
                    ></Image>
                  </div>
                  <h5>Win Rewards Daily</h5>
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
