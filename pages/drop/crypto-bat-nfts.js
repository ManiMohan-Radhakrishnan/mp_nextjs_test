import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loot_details_thunk } from "../../redux/thunk/user_thunk";
import { isUserLoggedIn } from "../../redux/reducers/user_reducer";
import { getMetaDetails } from "../../utils/common";

import Header from "../../components/header";
import Footer from "../../components/footer";
import BatNftSection from "../../components/bat-nft-components";
import GetAppLinkSection from "../../components/bat-nft-components/GetAppLinkSection";
import Faq from "../../components/bat-nft-components/faq";
import StaticFlows from "../../components/bat-nft-components/StaticFlows";
import AppHelmet from "../../components/helmet";

import "react-phone-input-2/lib/bootstrap.css";

export async function getServerSideProps({ req }) {
  const pathName = req?.url;
  const metaDetails = getMetaDetails(pathName);
  if (!process.env.NEXT_PUBLIC_DROP_CATEGORY_SLUG)
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  return { props: { meta_information: metaDetails } };
}

const BatNFTsDrop = ({ meta_information }) => {
  const dispatch = useDispatch();
  const [lootItems, setLootItems] = useState(null);
  const slug = process.env.NEXT_PUBLIC_DROP_CATEGORY_SLUG;
  const loginStatus = useSelector(isUserLoggedIn);

  const metaDetails = meta_information;

  // const dispatchCallback = (result) => {
  //   if (result?.status === 200) {
  //     setLootItems(result?.data?.data?.loot);
  //   }
  // };

  const fetchBatNftDropInfo = () => {
    setLootItems({
      slug: "wlmq0gqLT265p314",
      name: "Crypto Bat NFT Super Loot Box",
      auction_start_time: "2022-12-09T13:30:00.000Z",
      auction_end_time: "2022-12-12T11:30:00.000Z",
      total_quantity: 2000,
      buy_amount: "50.0",
      offer_quantity: null,
      offer_price: null,
      qty_per_order: 500,
      preorder_start_time: "2022-11-17T12:30:00.000Z",
      preorder_end_time: "2022-11-25T12:30:00.000Z",
      preorder_qty_per_user: 4000,
      available_qty: 0,
      preorder_og_start_time: "2022-11-17T12:30:00.000Z",
      preorder_offer_quantity: null,
      preorder_offer_price: null,
      preorder_qty_per_order: 100,
      current_time: "2023-09-12T07:20:28.861Z",
      flow_status: "buy",
      "preorder_need_kyc?": null,
      qty_per_user: 2000,
      purchased_qty: 0,
      preorder_reserved_qty: 0,
      og_user: true,
      loot_asserts: [],
    });
    // dispatch(
    //   loot_details_thunk({ data: { slug }, callback: dispatchCallback })
    // );
  };

  useEffect(() => {
    fetchBatNftDropInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus]);

  return (
    <>
      <AppHelmet
        title={metaDetails?.title}
        description={metaDetails?.description}
        image={metaDetails?.image}
      />
      <Header />
      <BatNftSection
        refetch={fetchBatNftDropInfo}
        slug={slug}
        details={lootItems}
      />
      <StaticFlows />
      <Faq />
      <GetAppLinkSection />
      <Footer />
    </>
  );
};

export default BatNFTsDrop;
