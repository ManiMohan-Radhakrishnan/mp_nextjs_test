import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { active_code_thunk } from "../../../redux/thunk/user_thunk";
import {
  getAndroidAPK,
  isUserLoggedIn,
} from "../../../redux/reducers/user_reducer";
import Header from "../../../components/header";
import Footer from "../../../components/footer";

import "react-phone-input-2/lib/bootstrap.css";
import StaticFlows from "../../../components/mcl-action-nfts-components/StaticFlowsMega";
import MegaMCLPassFaq from "../../../components/mcl-mega-game-code-components/faq-mega";
import MegaBannerSection from "../../../components/mcl-mega-game-code-components/banner-section-mega";
import PrizeBreakupMega from "../../../components/mcl-game-code-components/prize-breakup-mega";
import MclSeasonPass from "../../../components/mcl-season-pass";
import MclSeasonPassFaq from "../../../components/mcl-free-season-pass/faq-mcl-season-pass";
import MclSeasonPassBanner from "../../../components/mcl-free-season-pass/mcl-season-pass-banner";
import PrizeBreakupSeasonPass from "../../../components/mcl-free-season-pass/prize-breakup-season-pass";
import StaticFlowsSeasonPass from "../../../components/mcl-free-season-pass/static-flows-mcl-season-pass";

// const loot = {
//   available_qty: 15000,
//   buy_amount: "0.0",
//   current_time: "2022-12-06T17:47:31.964Z",
//   loot_end_time: "2023-02-01T12:30:30.000Z",
//   loot_start_time: "2023-01-24T12:30:30.000Z",
//   start_time: "2023-01-07T11:30:30.000Z",
//   end_time: "2023-01-08T11:30:30.000Z",
//   img_url:
//     "https://cdn.guardianlink.io/product-hotspot/images/StarLightlogo01.png",
//   name: "paid coupon",
//   purchased_qty: 0,
//   qty_per_order: 1,
//   qty_per_user: 1,
//   slug: "aNk29eesLW691bQr",
//   total_quantity: 15000,
// };

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: "/404",
    },
  };
}

const Drop = () => {
  const dispatch = useDispatch();
  const androidAPK = useSelector(getAndroidAPK);
  // const windowsEXE = useSelector(getWindowsEXE);
  const [lootItems, setLootItems] = useState(null);
  const loginStatus = useSelector(isUserLoggedIn);
  const slug = process.env.NEXT_PUBLIC_MCL_SEASON_PASS_SLUG;
  const current_time = new Date();
  const utc_time = current_time.toUTCString();

  const dispatchCallback = (result) => {
    if (result?.status === 200) {
      setLootItems(result?.data?.data?.tournament);
    }
  };

  useEffect(() => {
    dataReload();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus]);
  const dataReload = () => {
    // setLootItems({
    //   slug: "5weAzVMseRW9Zy78",
    //   name: "MCL MEGA PLAY TOURNAMENT",
    //   start_time: "2023-10-10T15:00:00.000Z",
    //   end_time: "2023-10-10T16:00:00.000Z",
    //   total_quantity: 15000,
    //   qty_per_user: 1,
    //   qty_per_order: 1,
    //   available_qty: 15000,
    //   buy_amount: "0.0",
    //   img_url:
    //     "https://cdn.guardianlink.io/product-hotspot/images/mclgame/crownclash_pass_announcement_jan30.png",
    //   purchased_qty: 0,
    //   current_time: utc_time,
    //   loot_start_time: "2023-01-27T12:20:00.000Z",
    //   loot_end_time: "2023-02-09T12:30:00.000Z",
    // });
    dispatch(active_code_thunk({ data: { slug }, callback: dispatchCallback }));
    // setLootItems(loot);
  };

  return (
    <>
      <Header
        title="MCL Seasonal Tournament Pass is NOW LIVE! Grab Yours FREE Before it's Gone!"
        description="Unleash your skills in the MCL Seasonal Series! Claim your FREE Tournament Pass and dominate the battlefield! Hurry Up before its gone!"
        image="https://cdn.guardianlink.io/product-hotspot/images/jumptrade/MCL_Seasonal_Series_OG-min.jpg"
      />
      <MclSeasonPassBanner />
      <MclSeasonPass buySuccess={dataReload} slug={slug} details={lootItems} />

      {/* <StaticFlowsSeasonPass /> */}
      {/* <PrizeBreakupSeasonPass /> */}
      <MclSeasonPassFaq />
      <Footer />
    </>
  );
};

export default Drop;
