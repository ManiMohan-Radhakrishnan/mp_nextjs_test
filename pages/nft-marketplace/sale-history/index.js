import Footer from "../../../components/footer";
import Header from "../../../components/header";
import RecentlySoldList from "../../../components/recently-sold-list";
import { errorRedirect } from "../../../utils/common";
import { nftRecentlySoldApi } from "../../../utils/methods";

const RecentlySold = () => {
  return (
    <>
      <Header
        bgImage
        title="Recently Sold NFTs | Jump.Trade"
        description="Take a look at the cricket NFTs that got sold recently on the jump.trade NFT marketplace. We know you missed it! Go buy the ones that are live for sale."
      />
      <RecentlySoldList />
      <Footer />
    </>
  );
};

// export async function getServerSideProps(context) {
//   const sort_filters = context.query.sort
//     ? context.query.sort
//     : "recently_sold";

//   const info = {
//     sort: [
//       {
//         name: "Recently Sold",
//         value: "recently_sold",
//         checked: true,
//       },
//       {
//         name: "Price - High to Low",
//         value: "price_desc",
//         checked: false,
//       },
//       {
//         name: "Price - Low to High",
//         value: "price_asc",
//         checked: false,
//       },
//     ],
//   };

//   info.sort = info.sort.map((obj) => ({
//     ...obj,
//     checked: sort_filters ? sort_filters === obj.value : false,
//   }));
//   let response = {};
//   try {
//     response = await nftRecentlySoldApi("asd", sort_filters);
//   } catch (err) {
//     console.log(err);
//     // return errorRedirect(err?.status);
//   }

//   return {
//     props: {
//       input: response.data,
//       filters: info,
//     },
//   };
// }

export default RecentlySold;

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: "/404",
    },
  };
}
