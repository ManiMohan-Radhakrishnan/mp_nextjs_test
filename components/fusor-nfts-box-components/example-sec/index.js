import Image from "next/image";
import useWindowSize from "../../../hooks/useWindowSize";

import FusionFlowWeb from "../../../images/updated-fusion-web.png";
import FusionFlowMob from "../../../images/updated-fusion-mob.png";
import style from "./style.module.scss";
const ExampleSec = () => {
  const { width } = useWindowSize();
  return (
    <section className={`${style["fusor-example-section"]}`}>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-12">
            <div className={`${style["sec-header"]}`}>
              <h3 className={`${style["sec-title"]}`}>HOW DOES FUSION WORK?</h3>
              <h4>EXAMPLE</h4>
              <p className={`${style["sec-info-block"]}`}>
                {
                  "Rookie + Rookie + Rookie Fusor => Rookie MCL Premier Player + 1 Fielding Action + 1 MCL Special Shot"
                }
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-12">
            <div className={`${style["image-block"]}`}>
              {width > 767 ? (
                <Image
                  unoptimized={true}
                  alt="fusion image"
                  src={FusionFlowWeb}
                  width="1354"
                  height="561"
                />
              ) : (
                <Image
                  unoptimized={true}
                  alt="fusion image"
                  src={FusionFlowMob}
                  width="588"
                  height="1063"
                />
              )}
            </div>
            <div className={`${style["content-block"]}`}>
              <p>
                You can fuse any two MCL Players of any category (Rookie, Rare,
                Epic, Legendary) and any type (batter/bowler). Fusing two
                batters or two bowlers produces either a new MCL Premier batter
                or a Premier bowler. And Fusing an MCL batter with an MCL bowler
                will produce either an MCL Premier batter or bowler at random.
                The Fusor is burned in the process.
              </p>
              <p>
                Depending on that category (Rookie, Rare, Epic, Legendary),
                you&apos;ll need an appropriate category Fusor. E.g. if you fuse
                a Rookie and a Rare NFT using a Rare Fusor, the new MCL Premier
                NFT which is the highest of the two.
              </p>
              <p>
                The Fusor NFTs need to be matched with the higher category of
                the two fusing NFTs to work properly. If you fuse a Level 2
                Rookie NFT and a Level 6 Rare NFT using the Rare Fusor, the new
                NFT will be either a Level 7 or a Level 8 Rare MCL Premium
                Player NFT!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid ">
        <div className="row">
          <div className="col-12">
            <div
              className={`${style["content-block"]} ${style["combine-case"]}`}
            >
              <h4>A FEW COMBINATION CASES</h4>
              <p>
                {
                  "Level 1 Rookie NFT + Level 2 Rookie NFT + Rookie Fusor => Level 3 or 4 Rookie MCL Premier NFT"
                }
              </p>
              <p>
                {
                  "Level 6 Rare NFT + Level 8 Epic NFT + Epic Fusor => Level 9 or 10 Epic MCL Premier NFT"
                }
              </p>
              <p>
                {
                  "Level 7 Rare NFT + Level 10 Legendary NFT + Epic Fusor => Won’t Work! (You need the right Fusor corresponding to the higher level of MCL NFT you have!)"
                }
              </p>
              <p>
                {
                  "Level 15 Epic NFT + Level 15 Legendary NFT + Legendary Fusor => Level 15 Legendary MCL Premier NFT"
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExampleSec;
