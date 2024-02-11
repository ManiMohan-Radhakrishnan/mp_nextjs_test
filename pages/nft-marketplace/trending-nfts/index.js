import React from "react";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import TrendingList from "../../../components/trending-list";
import { trendingNFTsApi } from "../../../utils/methods";

const TrendingNFTs = () => {
  return (
    <>
      <Header
        bgImage
        title="Trending NFTs | Jump.Trade"
        description="Make your bid on the trending cricket NFTs on the jump.trade NFT marketplace and own these supreme NFTs now!"
      />
      <TrendingList />
      <Footer />
    </>
  );
};

export default TrendingNFTs;

// export async function getServerSideProps(context) {
//   const sort_filters = context.query.sort ? context.query.sort : "price_desc";
//   const price_range = {
//     from: context.query.minPrice ? context.query.minPrice : "",
//     to: context.query.maxPrice ? context.query.maxPrice : "",
//   };
//   const price_filter = {
//     price_range,
//   };

//   const info = {
//     sort: [
//       {
//         name: "Price - High to Low",
//         value: "price_desc",
//         checked: true,
//       },
//       {
//         name: "Price - Low to High",
//         value: "price",
//         checked: false,
//       },
//       {
//         name: "Bid Count - High to Low",
//         value: "bid_count_desc",
//         checked: false,
//       },
//       {
//         name: "Bid Count - Low to High",
//         value: "bid_count",
//         checked: false,
//       },
//       {
//         name: "Auction Ending Soon",
//         value: "auction_ending_soon",
//         checked: false,
//       },
//     ],
//   };

//   info.sort = info.sort.map((obj) => ({
//     ...obj,
//     checked: sort_filters ? sort_filters === obj.value : false,
//   }));
//   let trendingNFTs = {};
//   try {
//     trendingNFTs = await trendingNFTsApi(1, sort_filters, price_filter);
//   } catch (err) {
//     console.log(err);
//   }

//   return {
//     props: {
//       trendingNFTsList: trendingNFTs?.data,
//       filters: info,
//     },
//   };
// }
