import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import style from "./style.module.scss";

const Packs = () => {
  return (
    <>
      <div className={style["pack-head"]}>
        <div className={style["content"]}>
          <h2>MCL RUSH DROP — Coming Soon</h2>
          <p>
            MCL RUSH is a brand new game mode by Jump.trade that combines skill,
            strategy, and decision-making!
          </p>
          <button
            type="button"
            className={`${style["theme-btn"]} ${style["rounded-bordered"]}`}
          >
            Learn More
          </button>
        </div>
      </div>
    </>
  );
};

export default Packs;
