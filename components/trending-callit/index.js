import React from "react";
import { useRouter } from "next/router";

import TrendingContent from "../../images/callit/airdrop.png";
import alertImg from "../../images/callit/alert.png";

import style from "./style.module.scss";
import Image from "next/image";

const TrendingCallit = () => {
  const router = useRouter();
  return (
    <section className={style["trending-callit-section"]}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className={style["title-block"]}>
              {/* <h6>ANSWER ✦</h6> */}
              <h4>TRENDING</h4>
            </div>

            <div className={style["trending-card"]}>
              <Image
                unoptimized={true}
                src={alertImg.src}
                height={500}
                width={500}
                className={`${style["alert-img"]}`}
                alt="Callit"
              />
              <Image
                unoptimized={true}
                src={TrendingContent.src}
                height={500}
                width={500}
                className={`${style["content-img"]}`}
                alt="Callit"
              />
              <div className={`${style["content-block"]}`}>
                <h2>
                  Get Your Exclusive Tokens Over Airdrops! Complete Specific
                  Tasks! Get Closer To The Chances Of Big Wins!
                </h2>
                <p>
                  Tweet… Tag… Share… and Win Big With CallIt AirDrop Program!!
                </p>
                <button
                  className={`${style["theme-btn"]} `}
                  // onClick={() => {
                  //   router.push("/nft-marketplace");
                  //   invokeTrackEvent(EVENT_NAMES.EXPLORE_NOW_CLICKED, {
                  //     "Page Name": "Home Banner",
                  //     "Page URL": window.location.href,
                  //   });
                  // }}
                  onClick={() => {
                    window.open(process.env.NEXT_PUBLIC_GIVEWAY_URL, "_self");
                  }}
                >
                  <span>EXPLORE AIRDROPS!</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingCallit;
