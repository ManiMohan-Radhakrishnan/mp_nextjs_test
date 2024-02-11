import Image from "next/image";
import CommandoImage from "../../../images/captain-meta-cool.png";
import { getOS } from "../../../utils/common";
import images from "../../../utils/images.json";
import style from "./style.module.scss";
const FusorExplanation = () => {
  return (
    <section className={`${style["fusor-section"]}`}>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-12">
            <div className={`${style["sec-header"]}`}>
              <h3 className={`${style["sec-title"]}`}>WHAT, HOW AND WHY?</h3>
              <p>
                Fusors are tradeable and consumable NFTs, and come in different
                categories corresponding to MCL Players (Rookie, Rare, Epic, and
                Legendary).
              </p>
              <p>
                Using the Fusor NFTs, you can burn two MCL Player NFTs (along
                with the Fusor) and get your hands on three new NFTs - the MCL
                Premier Player NFT, the Special Shot NFT, and the Fielding
                Action NFT. Premier Player NFTs are upgraded in their levels,
                game experience, play style, attitude, and aggression!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid ">
        <div className="row">
          <div className="col-12">
            <div className={`${style["image-block"]}`}>
              {getOS === "iOS" || "macOS" ? (
                <>
                  <Image
                    unoptimized={true}
                    src={images.gif_for_chennai}
                    width="794"
                    height="900"
                    alt="Chennai"
                  />
                  <Image
                    unoptimized={true}
                    src={images.gif_for_bangalore}
                    width="794"
                    height="900"
                    alt="Bangalore"
                  />
                  <Image
                    unoptimized={true}
                    src={images.gif_for_mumbai}
                    width="794"
                    height="900"
                    alt="Mumbai"
                  />
                  <Image
                    unoptimized={true}
                    src={images.gif_for_gujarat}
                    width="794"
                    height="900"
                    alt="Gujarat"
                  />
                </>
              ) : (
                <>
                  {" "}
                  <div
                    className={`${style["gifanimeImages"]} ${style["image-box-1"]}`}
                  ></div>
                  <div
                    className={`${style["gifanimeImages"]} ${style["image-box-2"]}`}
                  ></div>
                  <div
                    className={`${style["gifanimeImages"]} ${style["image-box-3"]}`}
                  ></div>
                  <div
                    className={`${style["gifanimeImages"]} ${style["image-box-4"]}`}
                  ></div>
                </>
              )}
            </div>
            <div className={`${style["content-block"]}`}>
              <h4>MCL PREMIER PLAYERS</h4>
              <p>
                MCL Premier Players are special Player NFTs that simulate
                real-world cricket more closely than ever. Every Player
                represents teams corresponding to various Indian cities/states
                are{" "}
                <b className={style["cities-color"]}>
                  Delhi, Mumbai, Chennai, Bangalore, Hyderabad, Punjab, Kolkata,
                  Gujarat, Lucknow, Rajasthan
                </b>
                . They will have an edge of realism through iconic animations,
                signature mannerisms and body language, expressions, and more.
              </p>
              <p>
                The new MCL Premier NFTs are tradeable and playable, and they
                also can be used along with the Special Shot and Fielding Action
                NFTs.
              </p>
            </div>
            <div className={`${style["content-block"]}`}>
              <h4>FREE UPGRADES</h4>
              <p>
                In all cases, the new Premier Player NFTs will be slightly level
                upgraded.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FusorExplanation;
