import TradeImage from "../../../images/drop/metaverse-section/trade-image.svg";
import TeamImage from "../../../images/drop/metaverse-section/team-image.svg";
import PlayImage from "../../../images/drop/metaverse-section/play-image.svg";
import CashImage from "../../../images/drop/metaverse-section/cash-image.svg";
import Badge from "../../../images/jump-trade/onedollar/Badge-Alone.svg";
import Image from "next/image";
import style from "./style.module.scss";

const BannerSection = () => {
  return (
    <section className={style["banner-section"]}>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className={style["head-section-block"]}>
              {/* <h1 className={style["head-section"]}>
                ENTER THE{" "}
                <span className={style["head-sec-title1"]}>CRICKET</span> <br />{" "}
                <span className={style["head-sec-title2"]}>METAVERSE</span> WITH
                JUST $1!
              </h1> */}
              {/* <p className={style["desc-section"]}>
                MCL RUSH is a brand new game format by Jump.trade that combines
                Skill, Strategy, and Decision-Making for an exciting metaverse
                cricket experience.
              </p> */}
              <div className={`${style["head-content-block"]}`}>
                <ul className={`${style["head-content-block-top"]}`}>
                  <li>
                    <h3>OWN</h3>
                    <h6>NFTs</h6>
                  </li>
                  <li>
                    <h3>PLAY</h3>
                    <h6>CRICKET</h6>
                  </li>
                  <li>
                    <h3>EARN</h3>
                    <h6>CASH DAILY</h6>
                  </li>
                </ul>

                <div className={`${style["badge-box"]}`}>
                  <Image
                    unoptimized={true}
                    height={250}
                    width={500}
                    src={Badge}
                    alt="TradeImage"
                  ></Image>
                  <div className={`${style["badge-content-box"]}`}>
                    <h3>
                      BUY ONCE @ $1 (₹81)<sup>*</sup>{" "}
                    </h3>
                    <h5>CRICKET DIGITAL COLLECTABLE - NFTs</h5>
                  </div>
                </div>
              </div>

              <ul className={style["hero-reason-block"]}>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
