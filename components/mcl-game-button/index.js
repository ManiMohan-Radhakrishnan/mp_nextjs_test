import Image from "next/image";
import Link from "next/link";

import style from "./style.module.scss";
import images from "../../utils/images.json";

const MclGameButton = () => {
  return (
    <>
      <section className={style["game-launch-button"]}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-4 col-sm-6 col-12">
              <Link legacyBehavior href="/nft-marketplace/" prefetch={false}>
                <a className={`${style["launch-anchor"]} mb-4`} target="_self">
                  <div
                    className={`${style["launch-btn"]} d-flex align-items-center justify-content-center`}
                  >
                    <div className={style["launch-icon"]}>
                      <Image
                        unoptimized={true}
                        height={100}
                        width={100}
                        alt="Search Icon"
                        src={images.Search}
                      />
                    </div>
                    <div className={style["launch-title"]}>
                      Explore <span>Marketplace</span>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
            <div className="col-md-4 col-sm-6 col-12">
              <Link
                legacyBehavior
                href="https://mcl-wp.jump.trade/"
                prefetch={false}
              >
                <a className={`${style["launch-anchor"]} mb-4`} target="_blank">
                  <div
                    className={`${style["launch-btn"]} d-flex align-items-center justify-content-center`}
                  >
                    <div className={style["launch-icon"]}>
                      <Image
                        unoptimized={true}
                        height={100}
                        width={100}
                        alt="Copy Icon"
                        src={images.Copy}
                      />
                    </div>
                    <div className={style["launch-title"]}>
                      Check-Out <span> Whitepaper</span>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
            <div className="col-md-4 col-sm-6 col-12">
              <Link legacyBehavior href="/mcl-game" prefetch={false}>
                <a target="_blank" className={`${style["launch-anchor"]} mb-2`}>
                  <div
                    className={`${style["launch-btn"]} d-flex align-items-center justify-content-center`}
                  >
                    <div className={style["launch-icon"]}>
                      <Image
                        unoptimized={true}
                        height={100}
                        width={100}
                        alt="Phone"
                        src={images.Phone}
                      />
                    </div>
                    <div className={style["launch-title"]}>
                      Download <span>MCL App</span>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MclGameButton;
