import Image from "next/image";
// import { MCLElitePass } from "../common";
import { RaddxLandQuestions } from "../common";

import FAQAccordian from "./accordian";
import FaqImage from "../../../images/drop/faq/faq-image.png";
import style from "./style.module.scss";
import FaqHeadingImage from "../../../images/drop/vip-pass/faqfounder.png";
import { useState } from "react";
const RaddxLandFaqSection = () => {
  // const passFaq = [...MCLElitePass];
  const passFaq = [...RaddxLandQuestions];
  return (
    <>
      <section className={style["faq-section"]}>
        <div className={"container-fluid"}>
          <div className={"row"}>
            <div className={"col"}>
              <Image
                unoptimized={true}
                src={FaqImage}
                alt="faqImage"
                height="800"
                width="800"
                className={style["bg-faq"]}
              />
              <div className={style["faq-content-section"]}>
                <div className="row">
                  <div className="col-sm-12">
                    <div className={`${style["sec-header"]}`}>
                      <h2>FAQ</h2>
                      {/* <Image unoptimized={true}
                        alt="mcl-founder-pass"
                        src={FaqHeadingImage}
                        height={300}
                        width={1440}
                      /> */}
                    </div>
                  </div>
                </div>
                <div className={style["faq-group-parent"]}>
                  <div className={style["faq-accordian-section"]}>
                    {passFaq.map((questions) => {
                      return <FAQAccordian key={questions.id} {...questions} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RaddxLandFaqSection;
