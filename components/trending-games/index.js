import React from "react";
import { useRouter } from "next/router";
import { IoDiamondSharp } from "react-icons/io5";
import Image from "next/image";
import { FaCrown } from "react-icons/fa";
import HurlyCardImage from "../../images/jump-trade/hurley/Hurley_nfts_collection.png";
import images from "../../utils/images.json";

import style from "./style.module.scss";

const TrendingGames = () => {
  const router = useRouter();
  return (
    <section className={style["trending-games-section"]}>
      <div className={style["title-block"]}>
        <h6>Explore ✦</h6>
        <h4>Top Collections</h4>
      </div>
      <div className={style["trend-card-block"]}>
        <div className={`${style["trend-card-box"]} ${style["mcl-card-box"]}`}>
          <div className={style["content-box"]}>
            <div className={style["badge-box"]}>
              <span className={style["icon-box"]}>
                <IoDiamondSharp />
              </span>
              <span className={style["info"]}>TRENDING</span>
            </div>
            <h3>
              Cricket NFTs<span> MCL </span>
            </h3>
            <button className={`${style["btn-box"]} btn`}>
              <span onClick={() => router.push("/nft-marketplace/mcl")}>
                EXPLORE
              </span>
            </button>
          </div>
          <div className={style["img-box"]}>
            <Image
              unoptimized={true}
              src={images.top_collection_player_image}
              height={504}
              width={606}
              alt="player_image"
            />
          </div>
        </div>
        <div
          className={`${style["trend-card-box"]} ${style["raddx-card-box"]}`}
        >
          <div className={style["content-box"]}>
            <div className={style["badge-box"]}>
              <span className={style["icon-box"]}>
                <FaCrown />
              </span>
              <span className={style["info"]}>NEW</span>
            </div>
            <h3>
              Racing NFTs<span> RADDX </span>
            </h3>
            <button className={`${style["btn-box"]} btn`}>
              <span onClick={() => router.push("/nft-marketplace/raddx")}>
                EXPLORE
              </span>
            </button>
          </div>
          <div className={style["img-box"]}>
            <Image
              unoptimized={true}
              src={images.top_collection_car_image}
              height={601}
              width={250}
              alt="car_image"
            />
          </div>
        </div>

        <div
          className={`${style["trend-card-box"]} ${style["hurley-card-box"]}`}
        >
          <div className={style["content-box"]}>
            <div className={style["badge-box"]}>
              <span className={style["icon-box"]}>
                <FaCrown />
              </span>
              <span className={style["info"]}>NEW</span>
            </div>
            <h3>
              Surfing Sloths NFTs<span> HURLEY </span>
            </h3>
            <button className={`${style["btn-box"]} btn`}>
              <span onClick={() => router.push("/nft-marketplace/hurley")}>
                EXPLORE
              </span>
            </button>
          </div>
          <div className={`${style["img-box"]} ${style["hurley-img"]}`}>
            <Image
              unoptimized={true}
              src={HurlyCardImage.src}
              height={601}
              width={250}
              alt="car_image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingGames;
