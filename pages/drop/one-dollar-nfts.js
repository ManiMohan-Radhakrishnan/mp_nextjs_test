import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { loot_details_thunk } from "../../redux/thunk/user_thunk";
import Header from "../../components/header";
import Footer from "../../components/footer";
import LootBoxSection from "../../components/loot-box-section";
import GetAppLinkSection from "../../components/GetAppLinkSection";
import BannerSection from "../../components/loot-box-section/banner-section";
import ReferWin from "../../components/loot-components/refer-win";
import Faq from "../../components/loot-components/faq";
import AboutMcl from "../../components/loot-components/about-mcl";

import "react-phone-input-2/lib/bootstrap.css";
import style from "./style.module.scss";

export async function getServerSideProps() {
  if (!process.env.NEXT_PUBLIC_DROP_ONE_DOLLAR_SLUG)
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  return { props: {} };
}

const Drop = () => {
  const dispatch = useDispatch();
  const [lootItems, setLootItems] = useState(null);

  const slug = process.env.NEXT_PUBLIC_DROP_ONE_DOLLAR_SLUG;

  // const dispatchCallback = (result) => {
  //   if (result?.status === 200) {
  //     setLootItems(result?.data?.data?.loot);
  //   }
  // };

  useEffect(() => {
    // dispatch(
    //   loot_details_thunk({ data: { slug }, callback: dispatchCallback })
    // );
    setLootItems({
      slug: process.env.NEXT_PUBLIC_DROP_ONE_DOLLAR_SLUG,
      name: "One Doller Nfts",
      auction_start_time: "2022-12-09T12:30:00.906Z",
      auction_end_time: "2022-12-14T12:30:00.906Z",
      total_quantity: 100,
      buy_amount: "1.0",
      qty_per_order: 1,
      qty_per_user: 1,
      available_qty: 100,
      preorder_start_time: "2022-11-21T12:30:00.684Z",
      preorder_end_time: "2022-11-29T12:30:00.685Z",
      preorder_qty_per_user: 1,
      preorder_qty_per_order: 1,
      current_time: "2022-11-18T07:39:45.628Z",
      purchased_qty: 0,
      preorder_reserved_qty: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <BannerSection />
      <LootBoxSection details={lootItems} />
      <AboutMcl />
      <ReferWin />
      <Faq />
      <GetAppLinkSection />
      <Footer />
    </>
  );
};

export default Drop;
