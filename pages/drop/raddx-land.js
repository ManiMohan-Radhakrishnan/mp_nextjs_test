import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loot_details_thunk } from "../../redux/thunk/user_thunk";
import {
  getHideMenuStatus,
  setHideMenuStatus,
} from "../../redux/reducers/user_reducer";

import Header from "../../components/header";
import Footer from "../../components/footer";
import FounderPassBoxDetails from "../../components/mcl-founder-pass-components";
import FaqSection from "../../components/mcl-founder-pass-components/faq-section";
import store from "../../redux/store";
import StaticFlowsVipPass from "../../components/mcl-founder-pass-components/StaticFlows";
import EliteFounderPassBoxDetails from "../../components/mcl-founder-pass-components/elite-founder-pass";
import OneFounder from "../../components/mcl-founder-pass-components/one-founder";
import RaddxLandBannerSection from "../../components/raddx-land/banner-section";
import HowToMonetize from "../../components/raddx-land/how-to-monetize";
import RaddxPrebookBoxDetails from "../../components/raddx-land/raddx-prebook-box";
import RaddxLandFaqSection from "../../components/raddx-land/faq-section";
import RaddxLandCommunity from "../../components/community-raddx";
import RaddxLandBenefits from "../../components/raddx-land/how-to-monetize";
// import Community from "../../components/car-nft-components/car-community";
// import Community from "../../components/community";

// export async function getServerSideProps({ query }) {
//   let { hideMenus } = query;
//   if (!process.env.NEXT_PUBLIC_RADDX_LAND_LOOT_BOX_SLUG)
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/404",
//       },
//     };
//   if (hideMenus === "true") store.dispatch(setHideMenuStatus(true));

//   return { props: {} };
// }
export const runtime = "experimental-edge";
const RaddxLandDrop = () => {
  const dispatch = useDispatch();
  const [raddxLandLootDetails, setLandLootDetails] = useState({});
  const current_time = new Date();
  const utc_time = current_time.toUTCString();

  const hideMenus = useSelector(getHideMenuStatus);

  const raddxLandLootPreebook =
    process.env.NEXT_PUBLIC_RADDX_LAND_LOOT_BOX_SLUG;

  // const dispatchCallbackRaddxLootBox = (result) => {
  //   if (result?.status === 200) {
  //     setLandLootDetails(result?.data?.data?.loot);
  //   }
  // };

  useEffect(() => {
    raddxLandLootBoxDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const raddxLandLootBoxDetails = () => {
    // dispatch(
    //   loot_details_thunk({
    //     data: { slug: raddxLandLootPreebook },
    //     callback: dispatchCallbackRaddxLootBox,
    //   })
    // );
    setLandLootDetails({
      slug: "4zxW7QY2izmaYOKg",
      name: "RADDX Landing 2.0",
      auction_start_time: null,
      auction_end_time: null,
      total_quantity: 300,
      buy_amount: "3000.0",
      offer_quantity: null,
      offer_price: null,
      qty_per_order: 300,
      preorder_start_time: "2023-09-30T11:30:00Z",
      preorder_end_time: "2023-10-14T11:30:00Z",
      preorder_qty_per_user: 300,
      available_qty: 300,
      preorder_og_start_time: "2023-09-29T20:40:47.281Z",
      preorder_offer_quantity: null,
      preorder_offer_price: null,
      preorder_qty_per_order: 300,
      current_time: utc_time,
      flow_status: "book",
      "preorder_need_kyc?": null,
      qty_per_user: 300,
      purchased_qty: 0,
      preorder_reserved_qty: 0,
      og_user: false,
      loot_asserts: [],
    });
  };

  return (
    <>
      {hideMenus ? (
        <></>
      ) : (
        <>
          {" "}
          <div className="loader-container">
            <div className="top-loader"></div>
          </div>
          <Header
            title="RADDX Car NFTs | Metaverse Racing Game | Jump.Trade"
            description="RADDX Is The First-Of-Its-Kind Metaverse Car Racing Game You Can Play With $1 Car NFTs & Win Big Cash Rewards. Prebook Your Digital Car Now!"
            image="https://cdn.guardianlink.io/product-hotspot/images/Raddx_OG_Image_v1.jpg"
          />
        </>
      )}
      <RaddxLandBannerSection />
      {/* <FounderPassBoxDetails buySuccess={dataRefresh} details={lootItems} /> */}
      {/* <ExampleSec /> */}
      {/* <StaticFlowsVipPass /> */}
      {/* <FieldingSpecial /> */}
      <RaddxPrebookBoxDetails
        buySuccess={raddxLandLootBoxDetails}
        details={raddxLandLootDetails}
      />
      <RaddxLandBenefits />
      <RaddxLandFaqSection />
      {/* <Community /> */}
      <RaddxLandCommunity />
      {!hideMenus && <Footer />}
    </>
  );
};

export default RaddxLandDrop;
