import { ProgressBar } from "react-bootstrap";
import style from "./style.module.scss";

const NftDetailsSection = ({
  performance = {},
  upgrade = [],
  className,
  bundleInfo,
  isBundle,
  switchNftDataInBundle,
  nft,
}) => {
  let {
    acceleration = {},
    brake = {},
    handling = {},
    top_speed = {},
  } = performance;
  let perf_stats = [top_speed, acceleration, handling, brake];
  let isPerformanceEmpty = Object.keys(performance)?.length === 0;
  let isUpgradeEmpty = upgrade?.length === 0;
  return (
    <section className={`${style["nft-detail-progress-section"]} ${className}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className={style["nft-detail-wrapper"]}>
              <div className={style["section-title"]}>
                NFT Details
                {isBundle && (
                  <ul className={`${style["bundle-list"]}`}>
                    {bundleInfo.map((bundle, i) => {
                      return (
                        <li
                          key={bundle?.nft_slug || i}
                          className={`${style["bundle-list-item"]} ${
                            style[
                              nft?.slug === bundle?.nft_slug ? "active" : ""
                            ]
                          }`.trim()}
                          onClick={() =>
                            switchNftDataInBundle(bundle?.nft_slug)
                          }
                        >
                          <span>{bundle?.name}</span>
                          {/* <span>${bundle?.buy_amount || 0}</span>  */}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              {!isPerformanceEmpty && !isUpgradeEmpty ? (
                <div className="row">
                  <div className="col-md-6">
                    <div className={style["performance-traits"]}>
                      <div className={style["title-block"]}>
                        <h4>Performance</h4>
                      </div>
                      <div className={style["trait-block"]}>
                        {perf_stats.map((trait, i) => {
                          let { name, value, maximum, display_value } = trait;
                          return (
                            <div
                              key={`performance-trait-${i}`}
                              className={style["trait"]}
                            >
                              <h6 className={style["trait-title"]}>{name}</h6>
                              <div className={style["trait-progress-block"]}>
                                <ProgressBar
                                  min={0}
                                  max={maximum}
                                  className={style["trait-progress-box"]}
                                >
                                  <ProgressBar
                                    min={0}
                                    max={maximum}
                                    now={value}
                                    className={style["primary-progress-bar"]}
                                  ></ProgressBar>
                                  {/* <ProgressBar
                                  variant="warning"
                                  min={0}
                                  max={100}
                                  now={20}
                                  className={style["secondary-progress-bar"]}
                                ></ProgressBar> */}
                                </ProgressBar>
                                <h6 className={style["progress-text"]}>
                                  {display_value}
                                </h6>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={style["upgrade-traits"]}>
                      <div className={style["title-block"]}>
                        <h4>Upgrade</h4>
                      </div>
                      <div className={style["trait-block"]}>
                        {upgrade.map((trait, i) => {
                          let { name, value, maximum } = trait;
                          return (
                            <div
                              key={`upgrade-trait-${i}`}
                              className={style["trait"]}
                            >
                              <h6 className={style["trait-title"]}>{name}</h6>
                              <div className={style["trait-progress-block"]}>
                                <ProgressBar
                                  min={0}
                                  max={maximum}
                                  className={style["trait-progress-box"]}
                                >
                                  <ProgressBar
                                    min={0}
                                    max={maximum}
                                    now={value}
                                    className={style["primary-progress-bar"]}
                                  ></ProgressBar>
                                </ProgressBar>
                                <h6 className={style["progress-text"]}>
                                  {value}
                                  <span>{`/${maximum}`}</span>
                                </h6>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {!isPerformanceEmpty && !isUpgradeEmpty ? (
            <div className={`${style["dashed-border"]}`}></div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
};

export default NftDetailsSection;
