import { useRouter } from "next/router";
import Image from "next/image";

import WebReferDollar from "../../../images/drop/car-nft-images/updated-refer-banner.jpg";
import useWindowUtils from "../../../hooks/useWindowUtils";
import images from "../images.json";

import style from "./style.module.scss";

const ReferWin = () => {
  const router = useRouter();
  const tab = useWindowUtils();
  const { width: innerWidth } = tab;
  return (
    <>
      <section className={style["refer-treasurebox-section"]}>
        <div className={style["refer-heading"]}>
          <h4>REFER AND WIN A TREASURE BOX</h4>
          <p>
            Share your referral code and invite friends to receive Treasure
            Boxes (filled with exciting prizes as shown below) when they make a
            successful purchase during the drop.
          </p>
        </div>

        <Image
          unoptimized={true}
          height={1919}
          width={1240}
          src={
            innerWidth > 767
              ? images?.raddx_refer
              : images?.referral_mobile_view
          }
          alt="TreasureBox"
          className={style["refer-treasurebox-images"]}
        />
        <button
          className={style["refer-treasurebox-button"]}
          onClick={() =>
            window.open(
              `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/referral`,
              "_self"
            )
          }
        >
          REFER NOW
        </button>
      </section>
    </>
  );
};

export default ReferWin;
