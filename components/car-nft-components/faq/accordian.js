import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import style from "./style.module.scss";

const FAQAccordian = ({
  title,
  info,
  elementIndex,
  isActive,
  setActiveElement,
}) => {
  return (
    <>
      <div className={`${style["accord-content-block"]}`}>
        <h2 onClick={() => setActiveElement(isActive ? "" : elementIndex)}>
          {isActive ? <AiOutlineMinus /> : <AiOutlinePlus />}{" "}
          <span>{title}</span>
        </h2>
        {isActive && (
          <div className={style["accord-collapse-block"]}>
            <p>{info}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FAQAccordian;
