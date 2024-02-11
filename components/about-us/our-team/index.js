import Image from "next/image";
import { useRouter } from "next/router";

import images from "../../../utils/images.json";
import style from "./style.module.scss";

const OurTeam = () => {
  const router = useRouter();
  return (
    <section className={style["our-team-section"]}>
      <div className="container-fluid">
        <div className="row mt-150">
          <div className="col-sm-12">
            <h2 className={style["sectionHeading"]}>GuardianLink Team</h2>
          </div>
        </div>
      </div>
      <section className={style["team-box"]}>
        <article className={style["team-member"]}>
          <div className={style["team-member-img"]}>
            <Image
              unoptimized={true}
              height="100"
              width="100"
              src={images.otram}
              alt="Ramkumar"
            />
          </div>

          <span className={style["team-member-role"]}>
            Co-Founder <br />
            &amp; CEO
          </span>
          <div className={style["team-member-name-desc"]}>
            <h3 className={style["team-member-name"]}>
              Ramkumar <br />
              Subramaniam
            </h3>
            <p className={style["team-member-desc"]}>
              Having helped in creating a $3B MarketCap for our partners, Ram,
              an early crypto-adopter and a diehard decentralisation fan, is a
              Co-Founder of GuardianLink. His vision is to just make sure 1
              Million artists make $1 Million each on GuardianLink.
            </p>
          </div>
        </article>

        <article className={style["team-member"]}>
          <div className={style["team-member-img"]}>
            <Image
              unoptimized={true}
              height="100"
              width="100"
              src={images.otkam}
              alt="Kameshwaran"
            />
          </div>

          <span className={style["team-member-role"]}>
            Co-Founder <br />
            &amp; COO
          </span>
          <div className={style["team-member-name-desc"]}>
            <h3 className={style["team-member-name"]}>
              Kameshwaran <br />
              Elangovan
            </h3>
            <p className={style["team-member-desc"]}>
              Coming from the traditional IT startup world, Kamesh founded a
              company during his college years and grew it up to be 400+ strong.
              He has executed 50+ of the most complex crypto project launches
              for our R&amp;D partners so that their communities trust their
              roadmaps.
            </p>
          </div>
        </article>
      </section>
    </section>
  );
};

export default OurTeam;
