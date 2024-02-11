import Image from "next/image";
import style from "./style.module.scss";
import raddxBannerWeb from "../../../images/raddx-nft/Raddx-closed-Beta-Live-banner-optimized-web.jpg";
import raddxBannerMobile from "../../../images/raddx-nft/Raddx-closed-Beta-Live-banner-optimized-mobile.webp";
// import mclLogo from "../../../images/mcl-product/mcl-players-bg.png";
import appStore from "../../../images/raddx-nft/playstore.png";
import playStore from "../../../images/raddx-nft/googlePlay.png";
import useWindowSize from "../../../hooks/useWindowSize";
import images from "../../../utils/images-new.json";
import PolygonLogo from "../../../images/mcl-product/Polygon_blockchain_logo.webp";

const MclSection = () => {
  const { width } = useWindowSize();
  return (
    <>
      <section className={style["mcl-playStore-section"]}>
        <Image
          unoptimized={true}
          height={1919}
          width={1240}
          // src={raddxBannerWeb}
          alt="background"
          className={style["mcl-playStore-images"]}
          src={images?.mcllogo}
        />
        <div className={style["mcl-playStore-details"]}>
          <p className={`${style["description"]}`}>
            Step into the world’s first Metaverse NFT Cricket Game and elevate
            your cricketing journey like never before! Experience lifelike 360°
            motion-captured shots and unique fielding actions from your beloved
            cricketers in this immersive NFT game.
          </p>

          <div className={style["game-details"]}>
            <p>The #2 Game ON</p>
            <Image
              unoptimized={true}
              alt="Polygon"
              src={PolygonLogo}
              width="100"
              height="100"
              decoding="async"
              data-nimg="future"
              className={`${style["blockchain-logo"]}`}
            />
            <div className={style["mcl-game-buttons"]}>
              <a
                href="https://play.google.com/store/apps/details?id=com.metacricketleague.app"
                target="_blank"
                rel="nofollow noopoener noreferrer"
              >
                <Image
                  unoptimized={true}
                  alt="PlayStore"
                  src={playStore}
                  width="100"
                  height="100"
                  decoding="async"
                  data-nimg="future"
                  className={`${style["download-logo"]}`}
                />
              </a>
              <a
                href="https://apps.apple.com/in/app/meta-cricket-league-nft-game/id1616152944"
                target="_blank"
                rel="nofollow noopoener noreferrer"
              >
                <Image
                  unoptimized={true}
                  alt="AppStore"
                  src={appStore}
                  width="100"
                  height="100"
                  decoding="async"
                  data-nimg="future"
                  className={`${style["download-logo"]}`}
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MclSection;
