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
import BannerSection from "../../../components/mcl-game-code-components/banner-section";
import ReferWin from "../../../components/loot-components/refer-win";
import Faq from "../../../components/mcl-game-code-components/faq";
import AboutMcl from "../../../components/loot-components/about-mcl";
import JoinWaitList from "../../../components/mcl-game-code-components/join-wait-list/index";
import PrizeBreakup from "../../../components/mcl-game-code-components/prize-breakup";

import "react-phone-input-2/lib/bootstrap.css";
import style from "../style.module.scss";
import RecentDropSection from "../../../components/mcl-game-code-components/recent-drops";
import { AiFillAndroid, AiFillWindows } from "react-icons/ai";
import PlayPass from "../../../components/play-pass";

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

const Drop = () => {
  const dispatch = useDispatch();
  const androidAPK = useSelector(getAndroidAPK);
  // const windowsEXE = useSelector(getWindowsEXE);
  const [lootItems, setLootItems] = useState(null);
  const loginStatus = useSelector(isUserLoggedIn);
  const slug = process.env.NEXT_PUBLIC_DROP_MCL_GAME_CODE_SLUG;

  // const dispatchCallback = (result) => {
  //   if (result?.status === 200) {
  //     setLootItems(result?.data?.data?.tournament);
  //   }
  // };

  useEffect(() => {
    dataReload();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus]);
  const dataReload = () => {
    setLootItems({
      slug: "5weAzVMseRW9Zy78",
      name: "MCL Crown Clash Tournament",
      start_time: "2023-02-10T15:00:00.000Z",
      end_time: "2023-02-10T16:00:00.000Z",
      total_quantity: 15000,
      qty_per_user: 1,
      qty_per_order: 1,
      available_qty: 0,
      buy_amount: "0.0",
      img_url:
        "https://cdn.guardianlink.io/product-hotspot/images/mclgame/crownclash_pass_announcement_jan30.png",
      purchased_qty: 0,
      current_time: "2023-09-12T15:34:12.024Z",
      loot_start_time: "2023-01-27T12:20:00.000Z",
      loot_end_time: "2023-02-09T12:30:00.000Z",
    });
    // dispatch(active_code_thunk({ data: { slug }, callback: dispatchCallback }));
    // setLootItems(loot);
  };

  return (
    <>
      <Header
        title="MCL Crown Clash Tournament Pass | Claim Pass For FREE | Jump.trade"
        description="Claim your FREE Pass to enter and play the $15000 MCL Crown Clash Tournament with 100% Winners! Only 15000 Passes are available. Hurry now!"
        image="https://cdn.guardianlink.io/product-hotspot/images/mclpass/The-Crown-Clash_padding-Feb10.png"
      />
      <BannerSection />
      {/* <LootBoxSection buySuccess={dataReload} slug={slug} details={lootItems} /> */}
      <PlayPass slug={slug} details={lootItems} />
      <PrizeBreakup />
      {/* <RecentDropSection /> */}
      {/* <JoinWaitList /> */}
      {/* <AboutMcl /> */}
      {/* <ReferWin /> */}
      {/* <div className={style["down-game"]}>
        <div
          className={`${style["live-upcoming-tour"]} ${style["btnblock-tour"]}`}
        >
          <h5 className={style["mclnotes_title"]}>
            DOWNLOAD
            <span> MCL GAME</span>
          </h5>
          <div className={`${style["btn-block"]} mt-2`}>
            <a
              href={androidAPK}
              // target="_blank"
              rel="noreferrer"
              className={`${style["download-icon-btn"]} ${style["theme-btn"]}`}
            >
              <span>
                {" "}
                <AiFillAndroid /> ANDROID
              </span>
            </a>
            <a
              href={windowsEXE}
              // target="_blank"
              rel="noreferrer"
              className={`${style["download-icon-btn"]} ${style["theme-btn"]}`}
            >
              <span>
                {" "}
                <AiFillWindows /> WINDOWS
              </span>
            </a>
          </div>
        </div>
      </div> */}

      <Faq />
      {/* <GetAppLinkSection /> */}
      <Footer />
    </>
  );
};

export default Drop;
