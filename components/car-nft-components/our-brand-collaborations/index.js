import React from "react";
import style from "./style.module.scss";
import Image from "next/image";

import flipkart from "../../../images/mcl-product/flipkart.png";
import hurley from "../../../images/mcl-product/hurley.png";
import viacom from "../../../images/mcl-product/viacom.png";
import cabbury from "../../../images/mcl-product/cabbury.png";
import twitter from "../../../images/mcl-product/Twitter-X-Logo-PNG.png";
import mtv from "../../../images/mcl-product/mtv.png";
import pepsi from "../../../images/mcl-product/pepsi.png";
import glaxo from "../../../images/mcl-product/glaxo.png";
import mondelez from "../../../images/mcl-product/mondelez.png";

const OurBrandCollaborations = () => {
  return (
    <>
      <section className={style["our-brand-section"]}>
        <div className={style["our-brand-wrapper"]}>
          <div className={style["section-title"]}>
            <h2>Our Brand Collaborations</h2>
          </div>
          <div className={`row m-0 ${style["brand-logo-wrapper"]}`}>
            <div className={style["c-image"]}>
              <Image
                unoptimized={true}
                alt="brand"
                src={flipkart}
                width="100"
                height="100"
              />
            </div>
            <div className={style["c-image"]}>
              <Image
                unoptimized={true}
                alt="brand"
                src={hurley}
                width="100"
                height="100"
              />
            </div>
            <div className={style["c-image"]}>
              <Image
                unoptimized={true}
                alt="brand"
                src={viacom}
                width="100"
                height="100"
              />
            </div>
            <div className={style["c-image"]}>
              <Image
                unoptimized={true}
                alt="brand"
                src={cabbury}
                width="100"
                height="100"
              />
            </div>
            <div className={style["c-image"]}>
              <Image
                unoptimized={true}
                alt="brand"
                src={twitter}
                width="100"
                height="100"
              />
            </div>
            <div className={style["c-image"]}>
              <Image
                unoptimized={true}
                alt="brand"
                src={mtv}
                width="100"
                height="100"
              />
            </div>
            <div className={style["c-image"]}>
              <Image
                unoptimized={true}
                alt="brand"
                src={pepsi}
                width="100"
                height="100"
              />
            </div>
            <div className={style["c-image"]}>
              <Image
                unoptimized={true}
                alt="brand"
                src={glaxo}
                width="100"
                height="100"
              />
            </div>
            <div className={style["c-image"]}>
              <Image
                unoptimized={true}
                alt="brand"
                src={mondelez}
                width="100"
                height="100"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurBrandCollaborations;
