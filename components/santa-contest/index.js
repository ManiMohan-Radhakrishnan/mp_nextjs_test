import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import images from "../../utils/images.json";
import useWindowUtils from "../../hooks/useWindowUtils";

import style from "./style.module.scss";
import { removeCookiesByName, setCookiesByName } from "../../utils/cookies";
import { useEffect, useRef, useState } from "react";
import { topEarners } from "../../utils/base-methods";

const ContestComponent = () => {
  const router = useRouter();
  const window = useWindowUtils();
  const { width: innerWidth } = window;
  const fsz = router.query.fsz;
  const leaderBoardRef = useRef(null);
  const [topEarnersList, setTopEarnersList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (router.query.winners) {
      setTimeout(
        () => leaderBoardRef?.current?.scrollIntoView({ behavior: "smooth" }),
        750
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.winners]);

  // const prizeList = [
  //   {
  //     nickname: "hmmmJH",
  //     jtcoins: "23816918",
  //     usd: "2,381.69",
  //   },
  //   {
  //     nickname: "ENFmmJH",
  //     jtcoins: "21547686",
  //     usd: "2,154.77",
  //   },
  //   { nickname: "APSR369_ENF", jtcoins: "15642744", usd: "1,564.27" },
  //   { nickname: "", jtcoins: "", usd: "" },
  //   { nickname: "", jtcoins: "", usd: "" },
  //   { nickname: "", jtcoins: "", usd: "" },
  //   { nickname: "", jtcoins: "", usd: "" },
  //   { nickname: "", jtcoins: "", usd: "" },
  //   { nickname: "", jtcoins: "", usd: "" },
  // ];

  // const prizeList = [
  //   { nick_name: `hmmmJH`, jt_coins: `23816918`, usd: `$2,381.69` },
  //   { nick_name: `Hummer ENF`, jt_coins: `21547686`, usd: `$2,154.77` },
  //   { nick_name: `APSR369_ENF`, jt_coins: `15642744`, usd: `$1,564.27` },
  //   { nick_name: `ACommanMan_ENF`, jt_coins: `15491115`, usd: `$1,549.11` },
  //   { nick_name: `Errornotfnd_ENF`, jt_coins: `13840315`, usd: `$1,384.03` },
  //   { nick_name: `messi`, jt_coins: `13761036`, usd: `$1,376.10` },
  //   { nick_name: `MTG MTG`, jt_coins: `13600049`, usd: `$1,360.00` },
  //   { nick_name: `Gamer_LDH`, jt_coins: `12394948`, usd: `$1,239.49` },
  //   { nick_name: `SPARTANS ENF`, jt_coins: `12266663`, usd: `$1,226.67` },
  //   { nick_name: `YARU_ENF`, jt_coins: `12045641`, usd: `$1,204.56` },
  //   { nick_name: `K R ¥ ENF`, jt_coins: `11578858`, usd: `$1,157.89` },
  //   { nick_name: `summik`, jt_coins: `11419080`, usd: `$1,141.91` },
  //   { nick_name: `Master`, jt_coins: `11033646`, usd: `$1,103.36` },
  //   { nick_name: `ibegJTpoints`, jt_coins: `11011290`, usd: `$1,101.13` },
  //   { nick_name: `Girl Power`, jt_coins: `10537221`, usd: `$1,053.72` },
  //   { nick_name: `ALPH4`, jt_coins: `10287139`, usd: `$1,028.71` },
  //   { nick_name: `MTG ARUN`, jt_coins: `10235463`, usd: `$1,023.55` },
  //   { nick_name: `MTG SIDDIQ`, jt_coins: `10231933`, usd: `$1,023.19` },
  //   { nick_name: `Cristianoooo`, jt_coins: `10030818`, usd: `$1,003.08` },
  //   { nick_name: `MOKKA_BAT_ENF`, jt_coins: `9816583`, usd: `$981.66` },
  //   { nick_name: `User_100 enf`, jt_coins: `9706237`, usd: `$970.62` },
  //   { nick_name: `$$DK$$_ENF`, jt_coins: `9599976`, usd: `$960.00` },
  //   { nick_name: `MTG BIN LADIN`, jt_coins: `9272180`, usd: `$927.22` },
  //   { nick_name: `MTG Joker JFC`, jt_coins: `9250722`, usd: `$925.07` },
  //   { nick_name: `Mr.Kartik Diwan`, jt_coins: `9026611`, usd: `$902.66` },
  //   { nick_name: `phoenix`, jt_coins: `8770713`, usd: `$877.07` },
  //   { nick_name: `DAACHI`, jt_coins: `8756817`, usd: `$875.68` },
  //   { nick_name: `MYSTERY MAN_ENF`, jt_coins: `8735583`, usd: `$873.56` },
  //   { nick_name: `nikolas`, jt_coins: `8730109`, usd: `$873.01` },
  //   { nick_name: `RANGU`, jt_coins: `8678158`, usd: `$867.82` },
  //   { nick_name: `MTG NABAN`, jt_coins: `8435394`, usd: `$843.54` },
  //   { nick_name: `Metalegend 007`, jt_coins: `8137891`, usd: `$813.79` },
  //   { nick_name: `..........`, jt_coins: `8102512`, usd: `$810.25` },
  //   { nick_name: `ENF_717`, jt_coins: `7964228`, usd: `$796.42` },
  //   { nick_name: `virat_Enf`, jt_coins: `7935265`, usd: `$793.53` },
  //   { nick_name: `Mansoor-SHD`, jt_coins: `7897781`, usd: `$789.78` },
  //   { nick_name: `Sabya`, jt_coins: `7830332`, usd: `$783.03` },
  //   { nick_name: `ENF_INDIA`, jt_coins: `7764632`, usd: `$776.46` },
  //   { nick_name: `yksrocks`, jt_coins: `7712677`, usd: `$771.27` },
  //   { nick_name: `MTG DK`, jt_coins: `7656662`, usd: `$765.67` },
  //   { nick_name: `#SANTOSH#`, jt_coins: `7585104`, usd: `$758.51` },
  //   { nick_name: `KUMARAN`, jt_coins: `7584091`, usd: `$758.41` },
  //   { nick_name: `iKINGCHAUHAN`, jt_coins: `7558733`, usd: `$755.87` },
  //   { nick_name: `ShukrALLAH`, jt_coins: `7505742`, usd: `$750.57` },
  //   { nick_name: `Mr....K`, jt_coins: `7379641`, usd: `$737.96` },
  //   { nick_name: `INVISIBLE MAN`, jt_coins: `7342018`, usd: `$734.20` },
  //   { nick_name: `MTG - Faizy`, jt_coins: `7292939`, usd: `$729.29` },
  //   { nick_name: `viju 11`, jt_coins: `7287650`, usd: `$728.77` },
  //   { nick_name: `p8yt8[9`, jt_coins: `7266256`, usd: `$726.63` },
  //   { nick_name: `HKKLLJ`, jt_coins: `7170975`, usd: `$717.10` },
  //   { nick_name: `LuvKush`, jt_coins: `7083488`, usd: `$708.35` },
  //   { nick_name: `PS500`, jt_coins: `7040153`, usd: `$704.02` },
  //   { nick_name: `KEVON`, jt_coins: `7004058`, usd: `$700.41` },
  //   { nick_name: `Varun`, jt_coins: `6986497`, usd: `$698.65` },
  //   { nick_name: `SKY_360_ENF`, jt_coins: `6981012`, usd: `$698.10` },
  //   { nick_name: `Anonymous`, jt_coins: `6919765`, usd: `$691.98` },
  //   { nick_name: `MTG-ABD-JFC`, jt_coins: `6865865`, usd: `$686.59` },
  //   { nick_name: `***A***`, jt_coins: `6853329`, usd: `$685.33` },
  //   { nick_name: `ch.srikanth`, jt_coins: `6830397`, usd: `$683.04` },
  //   { nick_name: `qwertpoiuy`, jt_coins: `6738677`, usd: `$673.87` },
  //   { nick_name: `ENF_Black`, jt_coins: `6722295`, usd: `$672.23` },
  //   { nick_name: `MTG RAO`, jt_coins: `6681692`, usd: `$668.17` },
  //   { nick_name: `MTG V1CKY`, jt_coins: `6656216`, usd: `$665.62` },
  //   { nick_name: `SKD_94`, jt_coins: `6652193`, usd: `$665.22` },
  //   { nick_name: `shobit`, jt_coins: `6638250`, usd: `$663.83` },
  //   { nick_name: `Mindrage`, jt_coins: `6556867`, usd: `$655.69` },
  //   { nick_name: `Robcop_Enf`, jt_coins: `6516814`, usd: `$651.68` },
  //   { nick_name: `ENF_!$p@rky`, jt_coins: `6509775`, usd: `$650.98` },
  //   { nick_name: `Mr. 360°`, jt_coins: `6404791`, usd: `$640.48` },
  //   { nick_name: `ugofree`, jt_coins: `6364548`, usd: `$636.45` },
  //   { nick_name: `000aaa`, jt_coins: `6360629`, usd: `$636.06` },
  //   { nick_name: `User_463`, jt_coins: `6334818`, usd: `$633.48` },
  //   { nick_name: `User_1005`, jt_coins: `6287110`, usd: `$628.71` },
  //   { nick_name: `F A Z A L _ SHD`, jt_coins: `6284599`, usd: `$628.46` },
  //   { nick_name: `META.ETH`, jt_coins: `6276297`, usd: `$627.63` },
  //   { nick_name: `AMAN KUMAR`, jt_coins: `6246281`, usd: `$624.63` },
  //   { nick_name: `MTG_LEGEND_JFC`, jt_coins: `6205237`, usd: `$620.52` },
  //   { nick_name: `MTG KIRAN`, jt_coins: `6201145`, usd: `$620.11` },
  //   { nick_name: `Shiza Hussain`, jt_coins: `6168466`, usd: `$616.85` },
  //   { nick_name: `venkates`, jt_coins: `6123003`, usd: `$612.30` },
  //   { nick_name: `MTG UMAR`, jt_coins: `6063190`, usd: `$606.32` },
  //   { nick_name: `MUHAMMAD MUSA`, jt_coins: `6052071`, usd: `$605.21` },
  //   { nick_name: `Gerizim ENF`, jt_coins: `6050667`, usd: `$605.07` },
  //   { nick_name: `sjubiplob`, jt_coins: `6044649`, usd: `$604.46` },
  //   { nick_name: `WhoThe_Gangstaa`, jt_coins: `6032833`, usd: `$603.28` },
  //   { nick_name: `mandyawesome`, jt_coins: `6019385`, usd: `$601.94` },
  //   { nick_name: `raju bhai`, jt_coins: `5987015`, usd: `$598.70` },
  //   { nick_name: `BIG 6`, jt_coins: `5956815`, usd: `$595.68` },
  //   { nick_name: `MTG JOHN369`, jt_coins: `5949307`, usd: `$594.93` },
  //   { nick_name: `Duckk`, jt_coins: `5916000`, usd: `$591.60` },
  //   { nick_name: `MTG NISHANTH`, jt_coins: `5869798`, usd: `$586.98` },
  //   { nick_name: `Rameshwari@SLP`, jt_coins: `5838250`, usd: `$583.83` },
  //   { nick_name: `stantor`, jt_coins: `5793255`, usd: `$579.33` },
  //   { nick_name: `Sachin Tichkule`, jt_coins: `5786778`, usd: `$578.68` },
  //   { nick_name: `NasDaily`, jt_coins: `5783555`, usd: `$578.36` },
  //   { nick_name: `neocris`, jt_coins: `5780117`, usd: `$578.01` },
  //   { nick_name: `AGUNI`, jt_coins: `5745798`, usd: `$574.58` },
  //   { nick_name: `Ajay Sharma`, jt_coins: `5744002`, usd: `$574.40` },
  //   { nick_name: `Sunil8687`, jt_coins: `5702828`, usd: `$570.28` },
  // ];

  useEffect(() => {
    getTopEarners();
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

  const getTopEarners = async () => {
    try {
      setLoading(true);
      let result = await topEarners();
      // console.log("setTopEarnersList", result);
      setTopEarnersList(result?.data?.data?.top_earners);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <div className={style["contest-wrapper"]}>
        <Image
          unoptimized={true}
          alt="alt"
          width={innerWidth < 425 ? 576 : 1440}
          height={innerWidth < 425 ? 1003 : 576}
          src={
            innerWidth < 425
              ? images?.santa_banner_contest_mobile
              : images?.santa_banner_contest_web
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
                <strong>Friday, 24 December 2022, at 12:00 PM IST</strong> and
                officially ends on{" "}
                <strong>Monday, 2 January 2023, at 11:59:59 PM IST.</strong>
              </p>
              <p>
                During the contest period, you get to decide the base price on
                the Jump.trade marketplace!
              </p>
              <p>
                <strong>Random 100 NEW Buyers</strong> making their first-ever
                NFT purchases of at least ONE MCL Batsman NFT and ONE MCL Bowler
                NFT will receive a super-special{" "}
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
              <div className="col-md-12">
                <div className="row justify-content-start">
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className={style["contest-card"]}>
                      <Image
                        unoptimized={true}
                        width={250}
                        height={300}
                        alt="Content"
                        src={images?.santa_reward_1}
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
                        src={images?.santa_reward_2}
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
                        src={images?.santa_reward_3}
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
                        src={images?.santa_reward_4}
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
                        src={images?.santa_reward_5}
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
                        src={images?.santa_reward_6}
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
                        src={images?.santa_reward_7}
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
                        src={images?.santa_reward_8}
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
                        src={images?.santa_reward_9}
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
                        src={images?.santa_reward_10}
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
                        src={images?.santa_reward_11}
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
                        src={images?.santa_reward_12}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={style["explore-btn"]}>
                <button
                  className={`${style["theme-btn"]}  text-center`}
                  onClick={() => router.push("/nft-marketplace")}
                >
                  <span>Explore Market</span>
                </button>
              </div>
              {/* <div
                ref={leaderBoardRef}
                className={`${style["all-para-style"]} text-center py-5`}
              >
                <h2>The Meta Cricket Tycoons</h2>
                <p>The Top Earners Of The Season</p>

                <section className={`${style["leaderboard-table"]} mt-5`}>
                  <table>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Nickname</th>
                        <th>JT Points</th>
                        <th>USD</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topEarnersList?.map((list, i) => (
                        <tr key={i}>
                          <td>{list?.serial_number}</td>

                          <td>
                            <div>{list?.nickname}</div>
                          </td>
                          <td>{list?.jt_points}</td>
                          <td>{list?.usd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
                
              </div> */}
              <p>
                <strong>Rules and regulations:</strong>
              </p>
              <ul className="card-key-points">
                <li>{`As a new user, you will have to buy at least one MCL Batsman NFT and one MCL Bowler NFT for the first time ever to be eligible to participate in this contest.`}</li>
                <li>{`Alternatively, you can sell at least one MCL Player NFT or one MCL Bat NFT to be eligible to participate in this contest.`}</li>
                <li>{`The organizer reserves the sole right and absolute discretion to extend or terminate the contest without any prior notice to any party.`}</li>
                <li>{`The winners of prices might be required to confirm their identity over a phone call or a video call. The participant understands this responsibility, and they consent to verify their identity. The participant also agrees that non-verification or inadequate verification might result in them forfeiting their prize.`}</li>
                <li>{`The participant agrees that they are cognizant of the rules and regulations of their states/jurisdictions regarding participation in such contests, and the participant agrees that they are solely responsible for any discrepancies that might arise.`}</li>
                <li>{`The organizer reserves the right to cancel the participation of participants engaging in unfair and malicious practices, including but not limited to using bots and wash trading.`}</li>
                <li>{`The participant consents to the bearing of additional costs and other deductions at source related to the prize. The organizer will not be responsible for the costs, and the organizer reserves the right to make their decision in case of such discrepancies.`}</li>
              </ul>
              <span className={style["contest-link"]}>
                <Link
                  legacyBehavior
                  href="/supersanta-treasurebox-contest-terms-and-conditions"
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

export default ContestComponent;
