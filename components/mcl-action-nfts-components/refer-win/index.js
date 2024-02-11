import Image from "next/image";

// import ReferImage from "../../../images/drop/refer-section/refer-section-background-image.jpg";
import style from "./style.module.scss";
// import WebReferDollar from "../../../images/jump-trade/onedollar/refer_1_dollar_web.jpg";
// import MobileReferDollar from "../../../images/jump-trade/onedollar/refer_1_dollar_mobile.jpg";

import useWindowUtils from "../../../hooks/useWindowUtils";
import { useRouter } from "next/router";
import images from "../../../utils/images-new.json";

const ReferWin = () => {
  const router = useRouter();

  const Tab = useWindowUtils();
  const { width: innerWidth } = Tab;
  return (
    <>
      <section className={style["refer-treasurebox-section"]}>
        <div className={style["refer-heading"]}>
          <h4>
            SPIN AND WIN
            <span> PRIZES WORTH $6,000!</span>
          </h4>
          <p>
            Holders of the MCL Signature Shot get to SPIN-THE-WHEEL filled with
            rewards worth $6000 (₹5,00,000). Own the MCL Signature Shot on
            pre-book and successful allocation or by purchasing directly on the
            drop!
          </p>
        </div>

        <Image
          unoptimized={true}
          src={innerWidth > 540 ? images?.spin_wheel : images?.spin_wheel}
          alt="Treasure"
          height={1000}
          width={1000}
          className={style["refer-treasurebox-images"]}
        />
        <p className={style["spin-text"]}>
          This contest is open to everyone who bought the MCL Signature Shot NFT
          as part of PRE-BOOK allotment or DROP DAY purchase.
        </p>
        <button
          onClick={() =>
            window.open(
              `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/spin-wheel`,
              "_self"
            )
          }
          className={style["refer-treasurebox-button"]}
        >
          CLICK HERE
        </button>
      </section>
    </>
  );
};

export default ReferWin;
