import Image from "next/image";

import style from "./style.module.scss";
import images from "../../../utils/images-new.json";
import useWindowUtils from "../../../hooks/useWindowUtils";

const RecentDropSection = () => {
  const { width: innerWidth } = useWindowUtils;
  return (
    <>
      <div className={style["background"]}>
        <h4 className={style["title"]}>
          <span>RECENT</span> DROP
        </h4>
        <section className={style["main-loot-section"]}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className={style["loot-block"]}>
                  <div className={style["loot-section"]}>
                    <div className={`${style["items"]} ${style["one"]}`}>
                      <h2 className="text-center">
                        <span className={style["theme-text"]}>
                          &quot;MCL CHAMPION PLAY - III&quot; PASS
                        </span>
                      </h2>
                    </div>
                    <div className={`${style["items"]} ${style["two"]}`}>
                      <div className={`${style["box-block"]}`}>
                        <h6>PLAY PASS PRICE</h6>
                        <h4 className={style["pack-price"]}>$3/PASS</h4>
                      </div>
                    </div>
                    <div className={`${style["items"]} ${style["three"]}`}>
                      <div className={`${style["box-block"]}`}>
                        <h6>TOTAL SUPPLY</h6>
                        <h4 className={style["pack-count"]}>200</h4>
                      </div>
                    </div>
                    <div className={`${style["items"]} ${style["four"]}`}>
                      <div className={`${style["box-block"]}`}>
                        <h6>DROP ENDED ON</h6>
                        <h4 className={style["pack-count"]}>21-12-2022</h4>
                      </div>
                    </div>
                  </div>

                  <div className={style["pack-section"]}>
                    <Image
                      unoptimized={true}
                      height={400}
                      width={400}
                      alt="PlayPass"
                      src={
                        innerWidth > 767
                          ? images?.champion_sold_out
                          : images?.champion_sold_out
                      }
                      className={style["pack-image"]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RecentDropSection;
