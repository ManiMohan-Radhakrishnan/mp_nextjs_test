import style from "./style.module.scss";

const GradientCircularLoader = ({ text = "" }) => {
  return (
    <article className={style["loading-box"]}>
      <div className={style["load-card"]}>
        <div className={style["loader"]}></div>
        {text ? <h6>{text}</h6> : <></>}
      </div>
    </article>
  );
};

export default GradientCircularLoader;
