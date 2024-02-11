import { useState } from "react";
import Image from "next/image";
import FaqDetails from "../common";
import FAQAccordian from "./accordian";
import FaqImage from "../../../images/drop/faq/faq-image.png";
import style from "./style.module.scss";
const Faq = () => {
  const [faqItems, setFaqItems] = useState(FaqDetails || []);
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
                <h4 className={style["faq-heading"]}>
                  FREQUENTLY ASKED{" "}
                  <span className={style["theme-text"]}>QUESTIONS</span>
                  {/* <span className={style["web"]}></span>{" "} */}
                  {/* <span className={style["mobile"]}> FAQ</span> */}
                </h4>
                <div className={style["faq-accordian-section"]}>
                  {faqItems?.map((questions) => {
                    return <FAQAccordian key={questions.id} {...questions} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
