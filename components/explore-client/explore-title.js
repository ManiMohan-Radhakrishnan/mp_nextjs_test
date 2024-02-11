import style from "./style.module.scss";
const ExploreTitle = ({ title, description }) => {
  return (
    <div className="col-md-12">
      <h1 className={style["explorer_title"]}>{title}</h1>
      <p className={style["explorer_desc"]}>{description}</p>
    </div>
  );
};

export default ExploreTitle;
