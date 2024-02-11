import style from "./style.module.scss";

const ChainPills = ({ first, second, type, pdf = false }) => {
  return (
    <div
      className={`${style["chain-pills"]} rounded-pill border border-dark ${
        !second && `${style["one-pill"]}`
      }
      }`}
    >
      {type === "array" ? (
        <div className={style["first"]}>
          {second && (
            <div
              className={`${style["second"]} rounded-pill border border-dark`}
            >
              {second}
            </div>
          )}
          <a href={first[1]} target={"_blank"} rel="noreferrer">
            {first[0]}
          </a>
        </div>
      ) : (
        <div className={style["first"]}>
          {second && (
            <div
              className={`${style["second"]} rounded-pill border border-dark`}
            >
              {second}
            </div>
          )}
          {(() => {
            if (pdf) {
              return (
                <a
                  href={first}
                  role={"button"}
                  rel="noreferrer"
                  target="_blank"
                  download
                >
                  PDF
                </a>
              );
            } else {
              return first;
            }
          })()}
        </div>
      )}
    </div>
  );
};

export default ChainPills;
