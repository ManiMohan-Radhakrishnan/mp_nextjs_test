import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  active_code_thunk,
  loot_details_thunk,
} from "../../../redux/thunk/user_thunk";
import {
  getAndroidAPK,
  isUserLoggedIn,
} from "../../../redux/reducers/user_reducer";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import LootBoxSection from "../../../components/mcl-game-code-components";
import GetAppLinkSection from "../../../components/GetAppLinkSection";
import ReferWin from "../../../components/loot-components/refer-win";
import AboutMcl from "../../../components/loot-components/about-mcl";
import JoinWaitList from "../../../components/mcl-game-code-components/join-wait-list/index";
import PrizeBreakup from "../../../components/mcl-game-code-components/prize-breakup";

import "react-phone-input-2/lib/bootstrap.css";
import style from "../style.module.scss";
import RecentDropSection from "../../../components/mcl-game-code-components/recent-drops";
import { AiFillAndroid, AiFillWindows } from "react-icons/ai";
import PlayPass from "../../../components/play-pass";
import StaticFlows from "../../../components/mcl-action-nfts-components/StaticFlowsMega";
import MegaMCLPassFaq from "../../../components/mcl-mega-game-code-components/faq-mega";
import MegaBannerSection from "../../../components/mcl-mega-game-code-components/banner-section-mega";
import MegaPlayPass from "../../../components/play-pass-mega";
import ComingSoonSection from "../../../components/mcl-mega-game-code-components/coming-soon-sec";
import MegaPassShortBoxDetails from "../../../components/mcl-mega-pass-short-nft";
import PrizeBreakupMega from "../../../components/mcl-game-code-components/prize-breakup-mega";
import { getMetaDetails } from "../../../utils/common";
import AppHelmet from "../../../components/helmet";

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

const Drop = ({ meta_information }) => {
  const dispatch = useDispatch();
  const androidAPK = useSelector(getAndroidAPK);
  // const windowsEXE = useSelector(getWindowsEXE);
  const [lootItems, setLootItems] = useState(null);
  const loginStatus = useSelector(isUserLoggedIn);
  const slug = process.env.NEXT_PUBLIC_DROP_MCL_MEGA_GAME_CODE_SLUG;
  const current_time = new Date();
  const utc_time = current_time.toUTCString();
  const [eliteFounderPass, setEliteFounderPass] = useState({});

  const slugMclEliteFounderPass =
    process.env.NEXT_PUBLIC_MCL_MEGA_PASS_SHORT_NFT_SLUG;

  // const dispatchCallback = (result) => {
  //   if (result?.status === 200) {
  //     setLootItems(result?.data?.data?.tournament);
  //   }
  // };
  const dispatchCallbackEliteFounderPass = (result) => {
    if (result?.status === 200) {
      setEliteFounderPass(result?.data?.data?.loot);
    }
  };
  const dispatchCallback = (result) => {
    if (result?.status === 200) {
      setLootItems(result?.data?.data?.tournament);
    }
  };

  useEffect(() => {
    dataReload();
    dataRefreshEliteFounder();

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

  const dataRefreshEliteFounder = () => {
    dispatch(
      loot_details_thunk({
        data: { slug: slugMclEliteFounderPass },
        callback: dispatchCallbackEliteFounderPass,
      })
    );
  };

  const metaDetails = meta_information;

  return (
    <>
      <AppHelmet
        title={metaDetails?.title}
        description={metaDetails?.description}
        image={metaDetails?.image}
      />
      <Header />
      <MegaBannerSection />
      <MegaPlayPass buySuccess={dataReload} slug={slug} details={lootItems} />
      <MegaPassShortBoxDetails
        buySuccess={dataRefreshEliteFounder}
        details={eliteFounderPass}
      />
      <StaticFlows />
      <PrizeBreakupMega />
      <MegaMCLPassFaq />
      <Footer />
    </>
  );
};

export default Drop;

export async function getServerSideProps({ req }) {
  const pathName = req?.url;
  const metaDetails = getMetaDetails(pathName);
  return {
    props: {
      meta_information: metaDetails,
    },
  };
}
