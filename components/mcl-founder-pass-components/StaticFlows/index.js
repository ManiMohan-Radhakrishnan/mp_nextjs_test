import style from "./style.module.scss";

const StaticFlowsVipPass = () => {
  return (
    <>
      <section
        className={`${style["flow-section"]} ${style["shots-info-block"]}  shots-info-block`}
      >
        {/* <div className="container-fluid mb-5">
          <div className="row">
            <div className="col-sm-12">
              <h4 className={`${style["title"]} title`}>
                WHAT IS AN MCL SPECIAL SHOT NFT?
              </h4>
              <p className={`${style["description"]} description`}>
                {`The MCL Special Shots are a brand new set of tradeable,
                collectible, and playable NFTs created through Fusion, that
                enhance your MCL Premier batters with adaptive line-connect
                accuracy. These shots bring a lot more style and flamboyance
                from the best of the real-world cricket legends, powered by 360°
                Motion-Capture Technology. Don't miss the chance to own these
                unique shot NFTs that combine visual thrill and legendary shots.`}
              </p>
            </div>
          </div>
        </div> */}

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <h4 className={`${style["title"]} title`}>
                WHAT DO MCL FOUNDER PASS DO?
              </h4>
              <div className={`${style["shot_section"]} shot_section`}>
                <div className={`${style["shot-section-content"]}`}>
                  <div className={`${style["shot-section-content-items"]}`}>
                    <h1 className={style["head-section"]}>Card Upgrades</h1>
                    <p className={`${style["description"]}`}>
                      Enhance your cards by leveling them up ($8 per level)
                    </p>
                  </div>
                  <div className={`${style["shot-section-content-items"]}`}>
                    <h1 className={style["head-section"]}>
                      Fee-Free Transactions
                    </h1>
                    <p className={`${style["description"]}`}>
                      Enjoy three transactions without any service fees, up to
                      $100 each
                    </p>
                  </div>
                  <div className={`${style["shot-section-content-items"]}`}>
                    <h1 className={style["head-section"]}>
                      Mega Special Play Tournament
                    </h1>
                    <p className={`${style["description"]}`}>
                      Access to the monthly Mega Special Play tournaments twice
                      a month
                    </p>
                  </div>
                </div>
                <div className={`${style["shot-section-content"]}`}>
                  <div className={`${style["shot-section-content-items"]}`}>
                    <h1 className={style["head-section"]}>
                      Voice Chat Feature
                    </h1>
                    <p className={`${style["description"]}`}>
                      Communicate with other users using the premium voice chat
                      function
                    </p>
                  </div>
                  <div className={`${style["shot-section-content-items"]}`}>
                    <h1 className={style["head-section"]}>Exclusive Badges</h1>
                    <p className={`${style["description"]}`}>
                      Unlock and collect specially crafted elite badges with
                      unique benefits across the community
                    </p>
                  </div>
                  <div className={`${style["shot-section-content-items"]}`}>
                    <h1 className={style["head-section"]}>
                      Private Discord Channels
                    </h1>
                    <p className={`${style["description"]}`}>
                      Gain access to private channels on Discord, exclusive for
                      pass holders only
                    </p>
                  </div>
                </div>
                <div className={`${style["shot-section-content"]}`}>
                  <div className={`${style["shot-section-content-items"]}`}>
                    <h1 className={style["head-section"]}>
                      Monthly Spin Wheel
                    </h1>
                    <p className={`${style["description"]}`}>
                      Enjoy Spin the wheel once every month for exciting rewards
                      and surprises
                    </p>
                  </div>
                  <div className={`${style["shot-section-content-items"]}`}>
                    <h1 className={style["head-section"]}>
                      Exclusive Access to Animations
                    </h1>
                    <p className={`${style["description"]}`}>
                      Enjoy free shots and unique fielding animations in
                      selected matches as a primary owner. ( Monthly 3 times can
                      be used)
                    </p>
                  </div>
                  <div className={`${style["shot-section-content-items"]}`}>
                    <h1 className={style["head-section"]}>Premium Kit Bag</h1>
                    <p className={`${style["description"]}`}>
                      Receive one premium Kit bag containing exclusive NFTs and
                      other valuable items. (2500 emotes or shots, In game
                      currency [gems])
                    </p>
                  </div>
                </div>

                {/* <div className={`${style["shot-section-content-video"]}`}>
                  <Image unoptimized={true}
                    alt="SpecialShot"
                    src={images.special_shot_image}
                    className={`${style["pack-image"]}`}
                    height="1080"
                    width="1080"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StaticFlowsVipPass;
