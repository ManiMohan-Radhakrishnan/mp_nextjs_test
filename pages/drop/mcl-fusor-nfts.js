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
import FusorBoxDetails from "../../components/fusor-nfts-box-components";
import ExampleSec from "../../components/fusor-nfts-box-components/example-sec";
import AppHelmet from "../../components/helmet";
import FaqSection from "../../components/fusor-nfts-box-components/faq-section";
import StaticFlows from "../../components/fusor-nfts-box-components/StaticFlows";
import FieldingSpecial from "../../components/fusor-nfts-box-components/fielding-special";
import store from "../../redux/store";
export const runtime = "experimental-edge";

export async function getServerSideProps({ query, req }) {
  const pathName = req?.url;
  const metaDetails = getMetaDetails(pathName);
  let { hideMenus } = query;
  if (!process.env.NEXT_PUBLIC_MCL_FUSOR_NFT_SLUG)
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  if (hideMenus === "true") store.dispatch(setHideMenuStatus(true));

  return {
    props: {
      meta_information: metaDetails,
    },
  };
}

const MclFusorNfts = ({ meta_information }) => {
  const dispatch = useDispatch();
  const [lootItems, setLootItems] = useState({});
  const hideMenus = useSelector(getHideMenuStatus);

  const slugFusor = process.env.NEXT_PUBLIC_MCL_FUSOR_NFT_SLUG;

  // const dispatchCallback = (result) => {
  //   if (result?.status === 200) {
  //     setLootItems(result?.data?.data?.loot);
  //   }
  // };

  useEffect(() => {
    dataRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataRefresh = () => {
    setLootItems({
      slug: "wlmq0gqLTrj65p31",
      name: "FUSOR BOX",
      auction_start_time: "2023-05-02T12:30:00.000Z",
      auction_end_time: "2023-05-05T12:30:00.000Z",
      total_quantity: 10000,
      buy_amount: "5.0",
      offer_quantity: null,
      offer_price: null,
      qty_per_order: 10000,
      preorder_start_time: "2023-03-30T11:30:00.000Z",
      preorder_end_time: "2023-04-17T11:30:00.000Z",
      preorder_qty_per_user: 10000,
      available_qty: 0,
      preorder_og_start_time: "2023-03-30T11:30:00.000Z",
      preorder_offer_quantity: null,
      preorder_offer_price: null,
      preorder_qty_per_order: 10000,
      current_time: "2023-09-11T16:02:16.955Z",
      flow_status: "buy",
      "preorder_need_kyc?": null,
      qty_per_user: 10000,
      purchased_qty: 0,
      preorder_reserved_qty: 0,
      og_user: true,
      loot_asserts: [
        {
          name: "jump_point",
          percentage: "100.0",
        },
        {
          name: "reward_point",
          percentage: "100.0",
        },
      ],
    });
    // dispatch(
    //   loot_details_thunk({
    //     data: { slug: slugFusor },
    //     callback: dispatchCallback,
    //   })
    // );
  };

  const metaDetails = meta_information;

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

      <FusorBoxDetails buySuccess={dataRefresh} details={lootItems} />
      <ExampleSec />
      <StaticFlows />
      <FieldingSpecial />
      <FaqSection />
      {!hideMenus && <Footer />}
    </>
  );
};

export default MclFusorNfts;
