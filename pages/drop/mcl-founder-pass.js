import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loot_details_thunk } from "../../redux/thunk/user_thunk";
import {
  getHideMenuStatus,
  setHideMenuStatus,
} from "../../redux/reducers/user_reducer";
import { getMetaDetails } from "../../utils/common";

import Header from "../../components/header";
import Footer from "../../components/footer";
import FounderPassBoxDetails from "../../components/mcl-founder-pass-components";
import FaqSection from "../../components/mcl-founder-pass-components/faq-section";
import store from "../../redux/store";
import StaticFlowsVipPass from "../../components/mcl-founder-pass-components/StaticFlows";
import EliteFounderPassBoxDetails from "../../components/mcl-founder-pass-components/elite-founder-pass";
import OneFounder from "../../components/mcl-founder-pass-components/one-founder";
import AppHelmet from "../../components/helmet";
export const runtime = "experimental-edge";

export async function getServerSideProps({ query, req }) {
  const pathName = req?.url;
  const metaDetails = getMetaDetails(pathName);
  let { hideMenus } = query;
  if (
    !process.env.NEXT_PUBLIC_MCL_FOUNDER_PASS_SLUG &&
    !process.env.NEXT_PUBLIC_MCL_ELITE_FOUNDER_PASS_SLUG
  )
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  if (hideMenus === "true") store.dispatch(setHideMenuStatus(true));

  return { props: { meta_information: metaDetails } };
}

const MclVIPPass = ({ meta_information }) => {
  const dispatch = useDispatch();
  const [lootItems, setLootItems] = useState({});
  const [eliteFounderPass, setEliteFounderPass] = useState({});

  const hideMenus = useSelector(getHideMenuStatus);

  const slugMclFounderPass = process.env.NEXT_PUBLIC_MCL_FOUNDER_PASS_SLUG;

  const slugMclEliteFounderPass =
    process.env.NEXT_PUBLIC_MCL_ELITE_FOUNDER_PASS_SLUG;

  // const dispatchCallback = (result) => {
  //   if (result?.status === 200) {
  //     setLootItems(result?.data?.data?.loot);
  //   }
  // };

  // const dispatchCallbackEliteFounderPass = (result) => {
  //   if (result?.status === 200) {
  //     setEliteFounderPass(result?.data?.data?.loot);
  //   }
  // };

  const metaDetails = meta_information;

  useEffect(() => {
    dataRefresh();
    dataRefreshEliteFounder();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataRefresh = () => {
    setLootItems({
      slug: "Wk0JGgmATNOglzxX",
      name: "MCL Founder Pass",
      auction_start_time: null,
      auction_end_time: null,
      total_quantity: 2500,
      buy_amount: "20.0",
      offer_quantity: null,
      offer_price: null,
      qty_per_order: 1,
      preorder_start_time: "2023-06-30T13:30:00.000Z",
      preorder_end_time: "2023-07-14T11:30:00.000Z",
      preorder_qty_per_user: 2500,
      available_qty: 2500,
      preorder_og_start_time: "2023-06-30T13:30:00.000Z",
      preorder_offer_quantity: null,
      preorder_offer_price: null,
      preorder_qty_per_order: 5,
      current_time: "2023-09-11T15:59:51.843Z",
      flow_status: "book",
      "preorder_need_kyc?": null,
      qty_per_user: 1,
      purchased_qty: 0,
      preorder_reserved_qty: 0,
      og_user: true,
      loot_asserts: [],
    });
    // dispatch(
    //   loot_details_thunk({
    //     data: { slug: slugMclFounderPass },
    //     callback: dispatchCallback,
    //   })
    // );
  };

  const dataRefreshEliteFounder = () => {
    // dispatch(
    //   loot_details_thunk({
    //     data: { slug: slugMclEliteFounderPass },
    //     callback: dispatchCallbackEliteFounderPass,
    //   })
    // );
    setEliteFounderPass({
      slug: "1pljvgL5Td0PQarq",
      name: "MCL Elite Founder Pass",
      auction_start_time: null,
      auction_end_time: null,
      total_quantity: 30,
      buy_amount: "5000.0",
      offer_quantity: null,
      offer_price: null,
      qty_per_order: 1,
      preorder_start_time: "2023-06-30T11:30:00.000Z",
      preorder_end_time: "2023-07-01T11:30:00.000Z",
      preorder_qty_per_user: 31,
      available_qty: 30,
      preorder_og_start_time: "2023-06-30T11:30:00.000Z",
      preorder_offer_quantity: null,
      preorder_offer_price: null,
      preorder_qty_per_order: 31,
      current_time: "2023-09-11T15:55:04.822Z",
      flow_status: "book",
      "preorder_need_kyc?": null,
      qty_per_user: 1,
      purchased_qty: 0,
      preorder_reserved_qty: 0,
      og_user: true,
      loot_asserts: [],
    });
  };

  return (
    <>
      <AppHelmet
        title={metaDetails?.title}
        description={metaDetails?.description}
        image={metaDetails?.image}
      />
      {hideMenus ? (
        <></>
      ) : (
        <>
          {" "}
          <div className="loader-container">
            <div className="top-loader"></div>
          </div>
          <Header />
        </>
      )}

      <FounderPassBoxDetails buySuccess={dataRefresh} details={lootItems} />
      {/* <ExampleSec /> */}
      {/* <StaticFlowsVipPass /> */}
      {/* <FieldingSpecial /> */}
      <EliteFounderPassBoxDetails
        buySuccess={dataRefreshEliteFounder}
        details={eliteFounderPass}
      />
      <OneFounder />

      <FaqSection />
      {!hideMenus && <Footer />}
    </>
  );
};

export default MclVIPPass;
