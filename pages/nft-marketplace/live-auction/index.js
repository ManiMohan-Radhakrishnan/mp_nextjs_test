import Header from "../../../components/header";
import Footer from "../../../components/footer";
import LiveAuctionsList from "../../../components/live-auction-list";
import { filter } from "lodash";
import { errorRedirect, getMetaDetails } from "../../../utils/common";

const Page = ({ meta_information }) => {
  const metaDetails = meta_information;
  return (
    <>
      <Header
        bgImage
        title={metaDetails?.title}
        description={metaDetails?.description}
        image={metaDetails?.image}
      />
      <LiveAuctionsList />
      <Footer />
    </>
  );
};
// export async function getServerSideProps(context) {
//   console.log("data",context.query.sort)
//   const sort_filters = context.query.sort
//     ? context.query.sort
//     : "auction_ending_soon";
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
//         name: "Auction Ending Soon",
//         value: "auction_ending_soon",
//         checked: true,
//       },
//       {
//         name: "Auction Starting Soon",
//         value: "auction_starting_soon",
//         checked: false,
//       },
//     ],
//   };

//   info.sort = info.sort.map((obj) => ({
//     ...obj,
//     checked: sort_filters ? sort_filters === obj.value : false,
//   }));
//   // setPage(1);
//   // setFilter(info);
//   // if (price_range.from || price_range.to) {
//   //   setPriceRangeFilter(price_range);
//   // }
//   let response = {};
//   try {
//     response = await liveAuctionNFTsApi(1, sort_filters, price_filter);
//   } catch (err) {
//     console.log(err);
//     // return errorRedirect(err?.status);
//   }

//   return {
//     props: {
//       input: response?.data,
//       filters: info,
//     },
//   };
// }

export default Page;

export async function getServerSideProps({ req }) {
  const pathName = req?.url;
  const metaDetails = getMetaDetails(pathName);
  return {
    props: {
      meta_information: metaDetails,
    },
  };
}
