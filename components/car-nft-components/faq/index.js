import { Questions } from "../common";
import FAQAccordian from "./accordian";

// import Images from "../images.json";
import FaqImage from "../../../images/drop/car-nft-images/faq-background.png";

import style from "./style.module.scss";
import { useState } from "react";

const Faq = () => {
  const faqItems = [...Questions];
  const [activeElement, setActiveElement] = useState("");

  return (
    <>
      <section
        className={style["faq-section"]}
        // style={{
        //   backgroundImage: `url(${FaqImage.src})`,
        // }}
      >
        <div className={"container-fluid"}>
          <div className={"row"}>
            <div className={"col"}>
              <div className={style["faq-content-section"]}>
                <h4 className={style["faq-heading"]}>FAQs</h4>
                <div className={style["faq-accordian-section"]}>
                  {faqItems.map((questions, index) => {
                    return (
                      <FAQAccordian
                        key={questions.id}
                        elementIndex={index}
                        isActive={activeElement === index}
                        setActiveElement={setActiveElement}
                        {...questions}
                      />
                    );
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
