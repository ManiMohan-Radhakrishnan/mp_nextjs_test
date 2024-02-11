import Image from "next/image";

// import ReferImage from "../../../images/drop/refer-section/refer-section-background-image.jpg";
import style from "./style.module.scss";
import WebReferDollar from "../../../images/jump-trade/onedollar/refer_1_dollar_web.jpg";
import MobileReferDollar from "../../../images/jump-trade/onedollar/refer_1_dollar_mobile.jpg";
import useWindowUtils from "../../../hooks/useWindowUtils";

const ReferWin = () => {
  const window = useWindowUtils();
  const { width: innerWidth } = window;
  return (
    <>
      <section className={style["refer-treasurebox-section"]}>
        <div className={style["refer-heading"]}>
          <h4>
            REFER AND WIN{" "}
            <span className={style["theme-text"]}>A TREASURE BOX</span>
          </h4>
          <p>
            Share your referral code and invite friends to receive treasure
            boxes (filled with exciting prizes) when they make a successful
            purchase.
          </p>
        </div>

        <Image
          unoptimized={true}
          src={innerWidth > 540 ? WebReferDollar : MobileReferDollar}
          alt="Treasure"
          height={1000}
          width={1000}
          className={style["refer-treasurebox-images"]}
        />
        {/* <button className={style["refer-treasurebox-button"]}>REFER NOW</button> */}
      </section>
    </>
  );
};

export default ReferWin;
