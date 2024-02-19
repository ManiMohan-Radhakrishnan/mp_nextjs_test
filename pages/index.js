import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import * as fbq from "../utils/fbpixel";
import {
  active_code_thunk,
  loot_details_thunk,
} from "../redux/thunk/user_thunk";
import { getMetaDetails } from "../utils/common";

import Header from "../components/header";
import Footer from "../components/footer";
import MclTournaments from "../components/mcl-tournaments";
import HeroBanner from "../components/hero-banner";
import Community from "../components/community";
import TrendingGames from "../components/trending-games";
import DiscoverNFTs from "../components/discover-nfts";
import DownloadGame from "../components/download-game";
import HotAndTrendings from "../components/hot-trending-nfts";
import TrendingCallit from "../components/trending-callit";
import CallitEventsList from "../components/call-it-event-list";
import HomeMegaPlayPass from "../components/play-pass-mega-home";

// import ogImage from "../images/JT_OG_image.jpg";
import AppHelmet from "../components/helmet";
export const runtime = "experimental-edge";

export default function Home(props) {
  const router = useRouter();
  const tournamentRef = useRef(null);
  const playPassRef = useRef(null);
  const dispatch = useDispatch();
  const [ballNftDetails, setBallNftDetails] = useState({});
  const [megaPassDetails, setMegaPassDetails] = useState({});

  const ballNftSlug = process.env.NEXT_PUBLIC_DROP_BALL_NFT_SLUG;
  const mega_pass_slug = process.env.NEXT_PUBLIC_DROP_MCL_MEGA_GAME_CODE_SLUG;
  // const slug = process.env.NEXT_PUBLIC_DROP_MCL_MEGA_GAME_CODE_SLUG;

  useEffect(() => {
    process.env.NEXT_PUBLIC_MARKETING_SCRIPT === "enabled" && fbq.pageview();

    const handleRouteChange = () => {
      process.env.NEXT_PUBLIC_MARKETING_SCRIPT === "enabled" && fbq.pageview();
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events]);

  const ballNftDispatchCallback = (result) => {
    if (result?.status === 200) {
      setBallNftDetails(result?.data?.data?.loot);
    }
  };

  // const dispatchCallback = (result) => {
  //   if (result?.status === 200) {
  //     setMegaPassDetails(result?.data?.data?.tournament);
  //   }
  // };
  // const dispatchCallbackMegaPass = (result) => {
  //   if (result?.status === 200) {
  //     setLootItems(result?.data?.data?.tournament);
  //   }
  // };

  useEffect(() => {
    dataBallNft();
    // dataMegaPass();
    // dataReload();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataBallNft = () => {
    dispatch(
      loot_details_thunk({
        data: { slug: ballNftSlug },
        callback: ballNftDispatchCallback,
      })
    );
  };

  // const dataMegaPass = () => {
  //   dispatch(
  //     active_code_thunk({
  //       data: { slug: mega_pass_slug },
  //       callback: dispatchCallback,
  //     })
  //   );
  // };

  // const dataReload = () => {
  //   dispatch(
  //     active_code_thunk({
  //       data: { mega_pass_slug },
  //       callback: dispatchCallbackMegaPass,
  //     })
  //   );
  // };

  const metaInformation = props?.meta_info;

  return (
    <>
      <AppHelmet
        title={metaInformation?.title}
        description={metaInformation?.description}
        image={metaInformation?.image}
      />
      <Header
      // title={metaInformation?.title}
      // description={metaInformation?.description}
      // canonical={metaInformation?.canonical}
      // image={metaInformation?.image}
      />
      <main>
        <HeroBanner
          playPassRef={playPassRef}
          tournamentRef={tournamentRef}
          ballNftDetails={ballNftDetails}
          megaPassDetails={megaPassDetails}
        />

        {/* <div ref={playPassRef}></div> */}
        {/* {megaPassDetails && Object.keys(megaPassDetails).length !== 0 && (
          <HomeMegaPlayPass
            buySuccess={dataMegaPass}
            slug={mega_pass_slug}
            details={megaPassDetails}
          />
        )} */}

        {/* <TrendingCallit />
        <CallitEventsList /> */}

        <TrendingGames />

        <DiscoverNFTs />
        <HotAndTrendings />
        <DownloadGame />
        <MclTournaments ref={tournamentRef} />
        <Community />
      </main>
      <Footer />
    </>
  );
}

const getRecentlyListedRequest = (query) => {
  let page = 1;

  const category_filters = query.category ? query.category.split(",") : [];
  const sale_filters = query.sale ? query.sale.split(",") : [];
  const nft_filters = query.nft ? query.nft.split(",") : [];
  const sort_filters = query.sort ? query.sort : "recently_listed";
  const search_filter = query.search ? query.search : "";
  const sale_status = query.status ? query.status : "";
  const price_range = {
    from: query.minPrice ? query.minPrice : "",
    to: query.maxPrice ? query.maxPrice : "",
  };
  const sort = query.sort ? query.sort : "";
  const noMatchFound =
    sale_filters.length === 0 &&
    nft_filters.length === 0 &&
    price_range.from.length === 0 &&
    price_range.to.length === 0 &&
    sort.length === 0 &&
    category_filters.length === 0 &&
    search_filter.length === 0 &&
    sale_status.length === 0;

  if (noMatchFound && query.search) return false;

  let filter = {
    category: category_filters,
    type: nft_filters,
    sale_type: sale_filters,
    keyword: search_filter,
    sale_kind: sale_status,
    price_range,
  };

  return {
    page,
    per_page: 21,
    filter,
    sort: sort_filters === "relevance" ? null : sort_filters,
  };
};

// export async function getServerSideProps({ query }) {
//   let props = {};
//   try {
//     let page = 1;
//     let sort_by = "recently_sold";
//     let recentlyListedNFTreq = getRecentlyListedRequest(query);

//     if (!recentlyListedNFTreq)
//       return {
//         redirect: {
//           destination: "/",
//           permanent: false,
//         },
//       };

//     let [trendingNFTs] = await Promise.all([trendingNFTsApi(page)]);

//     props = {
//       trendingNFTs: trendingNFTs?.data,
//     };
//   } catch (err) {
//     console.error("Error", err, err.status);
//     return errorRedirect(err?.status);
//   }
//   return { props };
// }

export async function getServerSideProps({ req }) {
  const pathname = req?.url;

  const metaDetails = getMetaDetails(pathname);
  let props = {};
  return {
    props: {
      meta_info: metaDetails,
    },
  };
}
