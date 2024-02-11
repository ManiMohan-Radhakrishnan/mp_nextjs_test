import Link from "next/link";
import { useRouter } from "next/router";

import images from "../../utils/images.json";
import useWindowUtils from "../../hooks/useWindowUtils";

import style from "./style.module.scss";
import { removeCookiesByName, setCookiesByName } from "../../utils/cookies";
import { useEffect } from "react";
import Image from "next/image";

const SpinWheelContest = () => {
  const router = useRouter();
  const Tab = useWindowUtils();
  const { width: innerWidth } = Tab;
  const fsz = router.query.fsz;

  useEffect(() => {
    if (fsz) {
      removeCookiesByName("fsz");
      sessionStorage.removeItem("fsz");
      setTimeout(() => {
        sessionStorage.setItem("fsz", fsz);
        setCookiesByName("fsz", fsz);
      }, 500);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fsz]);
  return (
    <>
      <div className={style["contest-wrapper"]}>
        <Image
          unoptimized={true}
          width={innerWidth < 425 ? 576 : 1440}
          height={innerWidth < 425 ? 1003 : 576}
          alt="Spin"
          src={
            innerWidth < 425 ? images?.spin_mob_image : images?.spin_web_image
          }
        />

        <div className="row">
          <div className="col-12">
            <article className={style["release-notes-card-box"]}>
              <p>
                Every owner of the MCL Signature Shot gets to SPIN-THE-WHEEL
                filled with rewards worth $6000 (₹5,00,000). You can own the MCL
                Signature Shot on pre-book and successful allocation or by
                purchasing directly on the drop!
              </p>
              <p>
                <strong>HOW TO PARTICIPATE?</strong>
              </p>
              <p>
                To enter the SPIN-THE-WHEEL Contest, users need to pre-book an{" "}
                <strong>MCL Signature Shot — Mystery Box</strong> between{" "}
                <strong>10:00 PM IST, Monday, 9 January 2023,</strong> and{" "}
                <strong>10:00 PM IST, Friday, 20 January 2023.</strong> Only on
                successful pre-book allocation or purchase of the Mystery Box on
                the drop date, you will get to SPIN-THE-WHEEL featuring epic
                prizes worth $6,000 (₹5,00,000)!
              </p>

              <p>
                Prizes include Bitcoin, Apple iPhone 14, Apple iPad, and many
                more!
              </p>
              <p>
                There are a total of{" "}
                <strong>10,000 MCL Signature Shot - Mystery Boxes.</strong> Make
                sure you get yours!
              </p>

              {/* <div className={style["explore-btn"]}>
                <button
                  className={`${style["theme-btn"]}  text-center`}
                  onClick={() => router.push("/drop/mcl-shot-nfts")}
                >
                  <span>Explore</span>
                </button>
              </div> */}
              <div className="col-md-12">
                <div className="row justify-content-start">
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.spin_reward_1}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.spin_reward_2}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.spin_reward_3}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.spin_reward_4}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.spin_reward_5}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.spin_reward_6}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.spin_reward_7}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.spin_reward_8}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.spin_reward_9}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.spin_reward_10}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.spin_reward_11}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.spin_reward_12}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.spin_reward_13}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.spin_reward_14}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.spin_reward_15}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.spin_reward_16}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={style["spin-win-page-text"]}>
                <p>
                  This contest is open to everyone who bought the MCL Signature
                  Shot NFT as part of PRE-BOOK allotment or DROP DAY purchase.
                </p>
              </div>
              <div className={style["explore-btn"]}>
                <button
                  className={`${style["theme-btn"]}  text-center`}
                  onClick={() =>
                    window.open(
                      `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/spin-wheel`,
                      "_self"
                    )
                  }
                >
                  <span>CLICK HERE</span>
                </button>
              </div>

              <p>
                <strong>Rules and regulations:</strong>
              </p>
              <ul className="card-key-points">
                <li>{`To enter this contest, between 10:00 PM IST, Monday, 9 January 2023 and 10:00 PM IST, Friday, 20 January 2023, users must successfully place a pre-book order for the MCL Signature Shot — Mystery Box and get successful allocation on the drop date. `}</li>
                <li>{`Users can also purchase the MCL Signature Shot — Mystery Box on the drop date [TBA] to enter the contest.`}</li>
                <li>{`The organizer reserves the sole right and absolute discretion to extend or terminate the contest without any prior notice to any party.`}</li>
                <li>{`The winners of prizes might be required to confirm their identity over a phone call or a video call. The participant understands this responsibility, and they consent to verify their identity. The participant also agrees that non-verification or inadequate verification might result in them forfeiting their prize.`}</li>
                <li>{`The participant agrees that they are cognizant of the rules and regulations of their states/jurisdictions regarding participation in such contests, and the participant agrees that they are solely responsible for any discrepancies that might arise.`}</li>
                <li>{`The organizer reserves the right to cancel the participation of participants engaging in unfair and malicious practices, including but not limited to using alternate accounts, etc.`}</li>
                <li>{`The participant consents to the bearing of additional costs and other deductions at source related to the prize. The organizer will not be responsible for the costs, and the organizer reserves the right to make their decision in case of such discrepancies.`}</li>
              </ul>
              <span className={style["contest-link"]}>
                <Link
                  legacyBehavior
                  href="/spin-wheel-contest-terms-and-conditions"
                >
                  Read the complete T&Cs here
                </Link>
              </span>
              <h6>
                Disclaimer: Crypto products and NFTs are unregulated and can be
                highly risky. There may be no regulatory recourse for any loss
                from such transactions.
              </h6>
            </article>
          </div>
        </div>
      </div>
      <div className="c-tab-body"></div>
    </>
  );
};

export default SpinWheelContest;
