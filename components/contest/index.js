import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import images from "../../utils/images.json";
import useWindowUtils from "../../hooks/useWindowUtils";

import style from "./style.module.scss";

const ContestComponent = () => {
  const router = useRouter();
  const window = useWindowUtils();
  const { width: innerWidth } = window;
  return (
    <>
      <div className={style["contest-wrapper"]}>
        <Image
          unoptimized={true}
          role={"button"}
          alt="Banner"
          width={innerWidth < 425 ? 576 : 1440}
          height={innerWidth < 425 ? 1003 : 576}
          src={
            innerWidth < 425
              ? images?.banner_contest_mobile_terms
              : images?.banner_contest_web_terms
          }
          onClick={() =>
            router.push(
              `${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/blog/the-big-mad-winnings-winners-announcement-its-finally-here`
            )
          }
        />

        <div className="row">
          <div className="col-12">
            <article className={style["release-notes-card-box"]}>
              <p>
                Jump.trade brings to its energetic and enthusiastic community
                the <strong>$12,000 SUPER SANTA TREASURE BOX CONTEST…</strong> a
                chance to unlock and win EPIC prizes.
              </p>
              <p>
                Did you ever imagine your NFT buying and selling could be so
                rewarding?
              </p>
              <p>
                <strong>How to Participate?</strong>
              </p>
              <p>
                The <strong>Super Santa Treasure Box Contest</strong> begins
                today —{" "}
                <strong>Friday, 23 December 2022, at 8:00 PM IST</strong> and
                officially ends on{" "}
                <strong>Monday, 2 January 2023, at 11:59:59 PM IST.</strong>
              </p>
              <p>
                <strong>Random 100 NEW Buyers</strong> making their first-ever
                NFT purchase will receive a super-special{" "}
                <strong>Super Santa Treasure Box</strong> that is filled with
                goodies!
              </p>
              <p>
                In addition to this, <strong>Random 100 Sellers</strong> will
                also get a <strong>Super Santa Treasure Box!</strong>
              </p>
              <p>
                All-in-all there are{" "}
                <strong>200 Super Santa Treasure Boxes</strong> worth{" "}
                <strong>$12,000 (INR 10,00,000)</strong> up for grabs!
              </p>
              <div className={style["explore-btn"]}>
                <button
                  className={`${style["theme-btn"]}  text-center`}
                  onClick={() => router.push("/nft-marketplace")}
                >
                  <span>Explore Market</span>
                </button>
              </div>
              <p>
                <strong>Rules and regulations:</strong>
              </p>
              <div className="col-md-12">
                <div className="row justify-content-start">
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.context1}
                      />
                      <div className={style["winner-content"]}>
                        <p>
                          Power-Packed.& Style-Personified With Its German DNA
                        </p>
                        <div
                          className={`${style["winner-count"]} d-flex justify-content-between align-items-center`}
                        >
                          <p>Winners:</p>
                          <p>1</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.context2}
                      />
                      <div className={style["winner-content"]}>
                        <p>
                          With the latest, don&apos;t Be Just Stylish! Be
                          iStylish
                        </p>
                        <div
                          className={`${style["winner-count"]} d-flex justify-content-between align-items-center`}
                        >
                          <p>Winners:</p>
                          <p>1</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.context3}
                      />
                      <div className={style["winner-content"]}>
                        <p>
                          When your Gaming Rage Isn&apos;t Okay With Ordinary
                          Specs!
                        </p>
                        <div
                          className={`${style["winner-count"]} d-flex justify-content-between align-items-center`}
                        >
                          <p>Winners:</p>
                          <p>2</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.context4}
                      />
                      <div className={style["winner-content"]}>
                        <p>
                          The PS That Every Gamer says <br /> &lsquo;I Love
                          You&rsquo; To!
                        </p>
                        <div
                          className={`${style["winner-count"]} d-flex justify-content-between align-items-center`}
                        >
                          <p>Winners:</p>
                          <p>1</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        alt="Content"
                        width={250}
                        height={300}
                        src={images?.context5}
                      />
                      <div className={style["winner-content"]}>
                        <p>
                          Not Math! Not Relationships! But The X Everybody
                          Wants!
                        </p>
                        <div
                          className={`${style["winner-count"]} d-flex justify-content-between align-items-center`}
                        >
                          <p>Winners:</p>
                          <p>2</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        alt="Content"
                        width={250}
                        height={300}
                        src={images?.context6}
                      />
                      <div className={style["winner-content"]}>
                        <p>
                          Time To Add Some Handy Numbers To Your Fitness Goals!
                        </p>
                        <div
                          className={`${style["winner-count"]} d-flex justify-content-between align-items-center`}
                        >
                          <p>Winners:</p>
                          <p>6</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        alt="Content"
                        width={250}
                        height={300}
                        src={images?.context7}
                      />
                      <div className={style["winner-content"]}>
                        <p>
                          A Universe Of Possibilities With This
                          &lsquo;Galaxy&rsquo; of a Device!
                        </p>
                        <div
                          className={`${style["winner-count"]} d-flex justify-content-between align-items-center`}
                        >
                          <p>Winners:</p>
                          <p>1</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        alt="Content"
                        width={250}
                        height={300}
                        src={images?.context8}
                      />
                      <div className={style["winner-content"]}>
                        <p>
                          You&apos;ve Got A Bullet In Your Head.. & It Sounds
                          Awesome!
                        </p>
                        <div
                          className={`${style["winner-count"]} d-flex justify-content-between align-items-center`}
                        >
                          <p>Winners:</p>
                          <p>33</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        alt="Content"
                        width={250}
                        height={300}
                        src={images?.context9}
                      />
                      <div className={style["winner-content"]}>
                        <p>
                          A New-Gen Smartwatch To Add To To Your Style & Suave
                        </p>
                        <div
                          className={`${style["winner-count"]} d-flex justify-content-between align-items-center`}
                        >
                          <p>Winners:</p>
                          <p>1</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        alt="Content"
                        width={250}
                        height={300}
                        src={images?.context10}
                      />
                      <div className={style["winner-content"]}>
                        <p>
                          This TV Is OnePlus... But Its Features Make It A
                          Perfect 10
                        </p>
                        <div
                          className={`${style["winner-count"]} d-flex justify-content-between align-items-center`}
                        >
                          <p>Winners:</p>
                          <p>1</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        alt="Content"
                        width={250}
                        height={300}
                        src={images?.context11}
                      />
                      <div className={style["winner-content"]}>
                        <p>
                          You&apos;ve Heard Enough Of How This Nothing Is
                          Something, eh?
                        </p>
                        <div
                          className={`${style["winner-count"]} d-flex justify-content-between align-items-center`}
                        >
                          <p>Winners:</p>
                          <p>1</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        alt="Content"
                        width={250}
                        height={300}
                        src={images?.context12}
                      />
                      <div className={style["winner-content"]}>
                        <p>
                          Truly Wireless... And Truly Dope For The Audophile In
                          You!
                        </p>
                        <div
                          className={`${style["winner-count"]} d-flex justify-content-between align-items-center`}
                        >
                          <p>Winners:</p>
                          <p>20</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        alt="Content"
                        width={250}
                        height={300}
                        src={images?.context13}
                      />
                      <div className={style["winner-content"]}>
                        <p>
                          Portable Hi-Q Music To Teleport Your Senses Into
                          Bliss!
                        </p>
                        <div
                          className={`${style["winner-count"]} d-flex justify-content-between align-items-center`}
                        >
                          <p>Winners:</p>
                          <p>30</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="card-key-points">
                <li>{`As a new user, you will have to buy at least one MCL Player NFT or one MCL Bat NFT for the first time ever to be eligible to participate in this contest.`}</li>
                <li>{`Alternatively, you can sell at least one MCL Player NFT or one MCL Bat NFT to be eligible to participate in this contest.`}</li>
                <li>{`The contest is subject to the laws and regulations of the Republic of India.`}</li>
                <li>{`The organizer reserves the sole right and absolute discretion to extend or terminate the contest without any prior notice to any party.`}</li>
                <li>{`The winners of prices might be required to confirm their identity over a phone call or a video call. The participant understands this responsibility, and they consent to verify their identity. The participant also agrees that non-verification or inadequate verification might result in them forfeiting their prize.`}</li>
                <li>{`The participant agrees that they are cognizant of the rules and regulations of their states/jurisdictions regarding participation in such contests, and the participant agrees that they are solely responsible for any discrepancies that might arise.`}</li>
                <li>{`The organizer reserves the right to cancel the participation of participants engaging in unfair and malicious practices, including but not limited to using bots and wash trading.`}</li>
                <li>{`The participant consents to the bearing of additional costs and other deductions at source related to the prize. The organizer will not be responsible for the costs, and the organizer reserves the right to make their decision in case of such discrepancies.`}</li>
              </ul>
              <span className={style["contest-link"]}>
                <Link legacyBehavior href="/bmw-contest-terms-and-conditions">
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

export default ContestComponent;
