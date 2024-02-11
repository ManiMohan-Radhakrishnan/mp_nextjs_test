import style from "./style.module.scss";
import { useEffect } from "react";
const Kyc = () => {
  useEffect(() => {
    window.open(`jumptradekyc://`, "_self");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <article className={style["kyc-redirect-block"]}>
        <p>Thank You</p>
      </article>
    </>
  );
};

export default Kyc;
