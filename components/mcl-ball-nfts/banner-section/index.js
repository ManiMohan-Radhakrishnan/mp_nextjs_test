import style from "./style.module.scss";
import MobBowlerEnergy from "../../../images/ball-nft/BG.webp";
import { useWindowSize } from "../../../utils/useWindowSize";
import { HiArrowNarrowRight } from "react-icons/hi";
import Image from "next/image";

const DescriptionHero = () => {
  return (
    <div className={style["description"]}>
      <p>
        The MCL Ball NFTs deliver the punch and thrill of Meta Cricket League
        from the other end of the pitch! Packing a spin of wizardry, a seam of
        capabilities, and a pace of power, these Ball NFTs have what it takes to
        bewilder batsmen with a jaffa and swing the game either way!
      </p>
    </div>
  );
};
const BannerSection = () => {
  const { width } = useWindowSize();

  return (
    <section className={`${style["banner-section"]}`}>
      <div className={style["banner-section-wrapper"]}>
        <div className={style["banner-wrapper"]}>
          <div className={style["intro-wrapper"]}>
            <h2>
              INTRODUCING
              <br />
              <span>MCL BALL NFT</span>
            </h2>
            {width <= 991 ? <DescriptionHero /> : ""}
            <button className={style["explore-btn"]}>
              <span>EXPLORE</span>
              <HiArrowNarrowRight color="#B4E52F" />
            </button>
          </div>
          <div className={style["bottom-text"]}>
            <h1>DELIVERING AWESOMENESS!</h1>
          </div>
          {width > 991 ? <DescriptionHero /> : ""}

          <div className={style["banner-image"]}>
            {/* <img src={MobBowlerEnergy} alt="image" /> */}
            <Image
              unoptimized={true}
              height="100"
              width="100"
              src={MobBowlerEnergy}
              alt="MobBowlerEnergy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
