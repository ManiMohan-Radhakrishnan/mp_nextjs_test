import ChainPills from "../chain-pills";
import style from "./style.module.scss";

const AdditionalPerks = ({ comics = [] }) => {
  return (
    <div className={style["chain-attributes"]}>
      <div className={style["chain-att-title"]}>
        Perks
        <span className={style["title-count"]}>({comics.length})</span>
      </div>
      <div className={`${style["chain-att-content"]} mt-2`}>
        {comics.map((comic, i) => (
          <ChainPills
            key={`chain-${i}`}
            first={comic.details}
            second={comic.name}
            pdf={true}
          />
        ))}
      </div>
    </div>
  );
};

export default AdditionalPerks;
