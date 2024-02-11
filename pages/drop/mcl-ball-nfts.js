import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/header";
import Footer from "../../components/footer";
import Faq from "../../components/mcl-ball-nfts/faq";

import "react-phone-input-2/lib/bootstrap.css";
import { isUserLoggedIn } from "../../redux/reducers/user_reducer";
import ReferWin from "../../components/mcl-action-nfts-components/refer-win";
import { getMetaDetails } from "../../utils/common";
import AppHelmet from "../../components/helmet";
import MclBallLootBoxSection from "../../components/mcl-ball-nfts";
import BannerSection from "../../components/mcl-ball-nfts/banner-section";

export async function getServerSideProps({ req }) {
  const pathName = req?.url;
  const metaDetails = getMetaDetails(pathName);
  // if (!process.env.NEXT_PUBLIC_DROP_MCL_SHOTS_SLUG)
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/404",
  //     },
  //   };
  return {
    props: {
      meta_information: metaDetails,
    },
  };
}

const MclBall = ({ meta_information }) => {
  const dispatch = useDispatch();
  const loginStatus = useSelector(isUserLoggedIn);

  const [lootItems, setLootItems] = useState(null);
  const [lootItems2, setLootItems2] = useState(null);

  const slugShots = process.env.NEXT_PUBLIC_DROP_MCL_SHOTS_SLUG;

  // const dispatchCallback = (result) => {
  //   if (result?.status === 200) {
  //     setLootItems(result?.data?.data?.loot);
  //   }
  // };

  useEffect(() => {
    dataReload();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus]);
  const dataReload = () => {
    setLootItems({
      slug: "pyvJXgn8TARZLdxm",
      name: "MCL Ball Nfts",
      auction_start_time: "2023-11-29T11:30:00.000Z",
      auction_end_time: "2023-11-30T11:30:00.000Z",
      total_quantity: 12000,
      buy_amount: "10.0",
      offer_quantity: null,
      offer_price: null,
      qty_per_order: 1,
      preorder_start_time: "2024-01-09T16:30:00.000Z",
      preorder_end_time: "2024-01-20T16:30:00.000Z",
      preorder_qty_per_user: 1,
      available_qty: 12000,
      preorder_og_start_time: "2024-01-09T16:30:00.000Z",
      preorder_offer_quantity: null,
      preorder_offer_price: null,
      preorder_qty_per_order: 1,
      current_time: "2023-09-12T06:36:04.385Z",
      flow_status: "buy",
      "preorder_need_kyc?": null,
      qty_per_user: 1,
      purchased_qty: 0,
      preorder_reserved_qty: 0,
      og_user: true,
      loot_asserts: [
        {
          name: "jump_point",
          percentage: "100.0",
        },
      ],
    });

    setLootItems2({
      slug: "pyvJXgn8TARZLdxm",
      name: "MCL Ball Nfts",
      auction_start_time: "2024-01-10T11:30:00.000Z",
      auction_end_time: "2024-01-11T11:30:00.000Z",
      total_quantity: 15000,
      buy_amount: "5.0",
      offer_quantity: null,
      offer_price: null,
      qty_per_order: 1,
      preorder_start_time: "2024-01-09T16:30:00.000Z",
      preorder_end_time: "2024-01-20T16:30:00.000Z",
      preorder_qty_per_user: 1,
      available_qty: 15000,
      preorder_og_start_time: "2024-01-09T16:30:00.000Z",
      preorder_offer_quantity: null,
      preorder_offer_price: null,
      preorder_qty_per_order: 1,
      current_time: "2023-09-12T06:36:04.385Z",
      flow_status: "buy",
      "preorder_need_kyc?": null,
      qty_per_user: 1,
      purchased_qty: 0,
      preorder_reserved_qty: 0,
      og_user: true,
      loot_asserts: [
        {
          name: "jump_point",
          percentage: "100.0",
        },
      ],
    });
    // dispatch(
    //   loot_details_thunk({
    //     data: { slug: slugShots },
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
      <Header />
      <BannerSection />

      {lootItems && (
        <MclBallLootBoxSection buySuccess={dataReload} details={lootItems} />
      )}
      {lootItems2 && (
        <MclBallLootBoxSection buySuccess={dataReload} details={lootItems2} />
      )}
      <Faq />
      <Footer />
    </>
  );
};

export default MclBall;
