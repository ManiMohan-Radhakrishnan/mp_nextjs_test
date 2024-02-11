import React, { useState } from "react";
import Image from "next/image";
import images from "../../../utils/images-new.json";
import HeroContentBg from "../../../images/hero-content-bg.svg";
import style from "./style.module.scss";
import { EVENT_NAMES, invokeTrackEvent } from "../../../utils/track-events";
import { getOS } from "../../../utils/common";
import { useWindowSize } from "../../../utils/useWindowSize";
import { useRouter } from "next/router";

const ProductBanner = () => {
  const [loadingVideoFirst, setLoadingVideoFirst] = useState(false);
  const router = useRouter();
  const { width } = useWindowSize();
  return (
    <>
      <section className="position-relative">
        <div className={style["hero-banner-sec"]}>
          {width && (
            <>
              {false ? (
                <Image
                  unoptimized={true}
                  height="512"
                  width="1024"
                  alt="Poster"
                  id="full-screenVideo"
                  className={`${style["image-fixed"]}`}
                  src={images.hero_poster}
                />
              ) : (
                <video
                  id="full-screenVideo"
                  loop
                  muted
                  autoPlay
                  playsInline
                  onLoadedData={() => setLoadingVideoFirst(false)}
                  poster={images.hero_poster}
                  controlsList="nodownload"
                  className={`${style["video-fixed"]}`}
                  src={
                    loadingVideoFirst ? images.hero_poster : images.nft_banner
                  }
                  type="video/mp4"
                ></video>
              )}
            </>
          )}
          <div className={style["hero-content-block"]}>
            <div className={style["hero-content-box"]}>
              <Image
                unoptimized={true}
                height="100"
                width="100"
                src={HeroContentBg}
                className={style["hero-contet-box-bg"]}
                alt="circle_image"
                priority={true}
              />
              <span className={style["hero-main-heading"]}>
                ASIA&apos;S LARGEST <br /> NFT MARKETPLACE
              </span>
              <p className={style["hero-desc"]}>
                Jump.trade - Your Destination For A Wide Range Of Astonishing
                Game &amp; Brand NFTs. Explore our NFT marketplace now!
              </p>
              <ul className={style["hero-data-count-list"]}>
                <li className={style["hero-data-count-item"]}>
                  <span className={style["hero-data-count-value"]}>242K+</span>
                  <span className={style["hero-data-count-title"]}>NFTs</span>
                </li>
                <li className={style["hero-data-count-item"]}>
                  <span className={style["hero-data-count-value"]}>265K+</span>
                  <span className={style["hero-data-count-title"]}>Trades</span>
                </li>

                <li className={style["hero-data-count-item"]}>
                  <span className={style["hero-data-count-value"]}>4.3M+</span>
                  <span className={style["hero-data-count-title"]}>
                    Matches
                  </span>
                </li>
              </ul>

              {/* <div className={style["hero-btn-block"]}>
                  <button
                    className={`${style["theme-btn"]} ${style["explore-btn"]} ${style["mr-1"]} ${style["pre-btn"]}`}
                    onClick={() => {
                      router.push("/nft-marketplace");
                      invokeTrackEvent(EVENT_NAMES.EXPLORE_NOW_CLICKED, {
                        "Page Name": "Home Banner",
                        "Page URL": window.location.href,
                      });
                    }}
                  >
                    <span>Explore Market</span>
                  </button>
                </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductBanner;
