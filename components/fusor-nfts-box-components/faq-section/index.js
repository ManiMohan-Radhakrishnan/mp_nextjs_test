import Image from "next/image";
import {
  Fusor,
  FieldingSpecialFaq,
  SpecialShotsFaq,
  PremierPlayerFaq,
} from "../common";

import FAQAccordian from "./accordian";
import FaqImage from "../../../images/drop/faq/faq-image.png";
import style from "./style.module.scss";
import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
const FaqSection = () => {
  const fusorFaq = [...Fusor];
  const premierPlayerFaq = [...PremierPlayerFaq];
  const specialShotsFaq = [...SpecialShotsFaq];
  const [showAnswer, setShowAnswer] = useState(false);
  const [showMclAnswer, setShowMclAnswer] = useState(false);
  const [showShotAnswer, setShowShotAnswer] = useState(false);
  const [showFieldAnswer, setShowFieldAnswer] = useState(false);
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
                  FREQUENTLY ASKED <span>QUESTIONS</span>
                </h4>
                <div
                  className={`${style["faq-group-parent"]} ${
                    showAnswer && style["active"]
                  }`}
                >
                  <h2
                    onClick={() => {
                      setShowAnswer(!showAnswer);
                      showMclAnswer === true && setShowMclAnswer(false);
                      showShotAnswer === true && setShowShotAnswer(false);
                      showFieldAnswer === true && setShowFieldAnswer(false);
                    }}
                  >
                    <span>Fusors</span>
                    {showAnswer ? <AiFillCaretDown /> : <AiFillCaretUp />}{" "}
                  </h2>
                  {showAnswer && (
                    <div className={style["faq-accordian-section"]}>
                      {fusorFaq.map((questions) => {
                        return (
                          <FAQAccordian key={questions.id} {...questions} />
                        );
                      })}
                    </div>
                  )}
                </div>
                <div
                  className={`${style["faq-group-parent"]} ${
                    showMclAnswer && style["active"]
                  }`}
                >
                  <h2
                    onClick={() => {
                      setShowMclAnswer(!showMclAnswer);
                      showAnswer === true && setShowAnswer(false);
                      showShotAnswer === true && setShowShotAnswer(false);
                      showFieldAnswer === true && setShowFieldAnswer(false);
                    }}
                  >
                    <span>MCL Premier Players</span>
                    {showMclAnswer ? (
                      <AiFillCaretDown />
                    ) : (
                      <AiFillCaretUp />
                    )}{" "}
                  </h2>
                  {showMclAnswer && (
                    <div className={style["faq-accordian-section"]}>
                      {premierPlayerFaq.map((questions) => {
                        return (
                          <FAQAccordian key={questions.id} {...questions} />
                        );
                      })}
                    </div>
                  )}
                </div>
                <div
                  className={`${style["faq-group-parent"]} ${
                    showShotAnswer && style["active"]
                  }`}
                >
                  <h2
                    onClick={() => {
                      setShowShotAnswer(!showShotAnswer);
                      showAnswer === true && setShowAnswer(false);
                      showMclAnswer === true && setShowMclAnswer(false);
                      showFieldAnswer === true && setShowFieldAnswer(false);
                    }}
                  >
                    <span>Special Shots</span>
                    {showShotAnswer ? (
                      <AiFillCaretDown />
                    ) : (
                      <AiFillCaretUp />
                    )}{" "}
                  </h2>
                  {showShotAnswer && (
                    <div className={style["faq-accordian-section"]}>
                      {specialShotsFaq.map((questions) => {
                        return (
                          <FAQAccordian key={questions.id} {...questions} />
                        );
                      })}
                    </div>
                  )}
                </div>
                <div
                  className={`${style["faq-group-parent"]} ${
                    showFieldAnswer && style["active"]
                  }`}
                >
                  <h2
                    onClick={() => {
                      setShowFieldAnswer(!showFieldAnswer);
                      showAnswer === true && setShowAnswer(false);
                      showMclAnswer === true && setShowMclAnswer(false);
                      showShotAnswer === true && setShowShotAnswer(false);
                    }}
                  >
                    <span>MCL Fielding Actions</span>
                    {showFieldAnswer ? (
                      <AiFillCaretDown />
                    ) : (
                      <AiFillCaretUp />
                    )}{" "}
                  </h2>
                  {showFieldAnswer && (
                    <div className={style["faq-accordian-section"]}>
                      {FieldingSpecialFaq.map((questions) => {
                        return (
                          <FAQAccordian key={questions.id} {...questions} />
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqSection;
