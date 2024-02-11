// import { useRouter } from "next/router";
import Image from "next/image";

// import useWindowUtils from "../../../hooks/useWindowUtils";
// import images from "../images.json";

import style from "./style.module.scss";

// import raddxBannerMobile from "../../../images/raddx-nft/Raddx-closed-Beta-Live-banner-optimized-mobile.webp";
// import raddxLogo from "../../../images/raddx-nft/raddxLogo.png";
import appStore from "../../../images/raddx-nft/playstore.png";
import playStore from "../../../images/raddx-nft/googlePlay.png";
import useWindowSize from "../../../hooks/useWindowSize";
import NEARLogo from "../../../images/raddx-nft/NEARLogo.png";
import images from "../../../utils/raddx-images.json";

const RaddxSection = () => {
  const { width } = useWindowSize();
  return (
    <>
      <section className={style["raddx-treasurebox-section"]}>
        <Image
          unoptimized={true}
          height={3840}
          width={1829}
          // src={raddxBannerWeb}
          alt="TreasureBox"
          className={style["raddx-treasurebox-images"]}
          src={images.raddx_page_banner}
        />

        <div className={`${style["raddx-details"]}`}>
          <p className={`${style["description"]}`}>
            RADDX - Racing Metaverse game is a futuristic Multiplayer Racing
            game with stunning locations, attractive EV cars, chasing cops,
            power-ups, Mystery Box, rewards for Premium Tournaments & much more!
          </p>
          <div className={style["game-details"]}>
            <p>The #1 Game ON</p>
            <Image
              unoptimized={true}
              alt="Near"
              src={NEARLogo}
              width="100"
              height="100"
              decoding="async"
              data-nimg="future"
              className={`${style["blockchain-logo"]}`}
            />
            <div className={`${style["download-section"]}`}>
              <a
                href="https://play.google.com/store/apps/details?id=com.chennaigames.mrracer"
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
                href="https://apps.apple.com/in/app/raddx-racing-metaverse/id1671159641"
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

export default RaddxSection;
