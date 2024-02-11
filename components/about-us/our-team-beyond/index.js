import Image from "next/image";
import { useRouter } from "next/router";

import style from "./style.module.scss";
import otbgpg from "../../../images/jump-trade/our-team-beyond/new/playstore1.png";
import otbspt from "../../../images/jump-trade/our-team-beyond/new/spotify.png";
import otbap from "../../../images/jump-trade/our-team-beyond/new/Apple.png";
import otbpg from "../../../images/jump-trade/our-team-beyond/new/prime-gaming.png";
import otborc from "../../../images/jump-trade/our-team-beyond/new/Oracle.png";
import otbfox from "../../../images/jump-trade/our-team-beyond/new/FOX.png";
import otbtw from "../../../images/jump-trade/our-team-beyond/new/twitter.png";
import otbibm from "../../../images/jump-trade/our-team-beyond/new/IBM.png";

const OurTeamBeyond = () => {
  const router = useRouter();
  return (
    <section className={style["our-teambeyond-section"]}>
      <div className="container-fluid">
        <div className="row mt-150">
          <div className="col-sm-12">
            <h2 className={style["sectionHeading"]}>
              OUR TEAM <span>BEYOND</span>
            </h2>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <p className={style["our-teambeyond-desc"]}>
              We are a team 400+ Blockchain Pioneers, NFT Specialists, Crazy
              Coders, and prolific creators based in India, Japan, &amp;
              Singapore. Our team &amp; our mentors have collectively created
              groundbreaking disruptions and come from these companies.
            </p>

            <div className={style["cmp_logo"]}>
              <Image
                unoptimized={true}
                height="100"
                width="100"
                src={otbgpg}
                alt="GuardianLink academy"
                className={style["invert-reverse"]}
              />
              <Image
                unoptimized={true}
                height="100"
                width="100"
                src={otbspt}
                alt="GuardianLink prod img"
              />
              <Image
                unoptimized={true}
                height="100"
                width="100"
                src={otbap}
                alt="GuardianLink prod img"
              />
              <Image
                unoptimized={true}
                height="100"
                width="100"
                src={otbpg}
                alt="GuardianLink prod img"
              />
              <Image
                unoptimized={true}
                height="100"
                width="100"
                src={otborc}
                alt="GuardianLink prod img"
              />
              <Image
                unoptimized={true}
                height="100"
                width="100"
                src={otbfox}
                alt="GuardianLink prod img"
              />
              <Image
                unoptimized={true}
                height="100"
                width="100"
                src={otbtw}
                alt="GuardianLink"
              />
              <Image
                unoptimized={true}
                height="100"
                width="100"
                src={otbibm}
                alt="GuardianLink"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeamBeyond;
