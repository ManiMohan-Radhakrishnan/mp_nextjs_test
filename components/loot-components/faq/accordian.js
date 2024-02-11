import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import style from "./style.module.scss";
const FAQAccordian = ({ title, info }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <>
      <div className={`${style["accord-content-block"]}`}>
        <h2 onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? <AiOutlineMinus /> : <AiOutlinePlus />}{" "}
          <span>{title}</span>
        </h2>
        {showAnswer && (
          <div className={style["accord-collapse-block"]}>
            <p>{info}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FAQAccordian;
