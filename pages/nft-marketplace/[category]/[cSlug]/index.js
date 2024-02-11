import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Explore from "../../../../components/explore";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import {
  nftCategoryDetailApi,
  nftCategoryListApi,
} from "../../../../utils/methods";
import { setCookiesByName } from "../../../../utils/cookies";

const ExploreList = ({ exploreListedNFTs, categoryListedNFTs }) => {
  const router = useRouter();
  const [categoryDetail, setCategoryDetail] = useState(
    exploreListedNFTs?.data?.category || {}
  );
  const query = router.query;
  const { cSlug, category } = query;
  const fsz = query.fsz;

  useEffect(() => {
    if (fsz) {
      sessionStorage.setItem("fsz", fsz);
      setCookiesByName("fsz", fsz);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header
        bgImage
        title={
          (category === "cricket-player-nfts" &&
            "Meta Cricket League Players | Jump.Trade") ||
          (category === "cricket-bat-nfts" &&
            "Meta Cricket League Signed Bat | Jump.Trade") ||
          (category === "raddx-car-nfts" && "Raddx Car Nfts | Jump.Trade")
        }
        description={
          (category === "cricket-player-nfts" &&
            "Explore the stunning collection of Meta Cricket League player NFTs here. Buy your favourite players and gear up to play in the cricket metaverse.") ||
          (category === "cricket-bat-nfts" &&
            "We bring you the Meta Cricket League Signed bat NFT collections. Find out signed bats of legendary players here. Buy them and power up your game in the cricket metaverse.") ||
          (category === "raddx-car-nfts" && "Best Raddx car nfts collections")
        }
      />

      <Explore
        categoryDetail={categoryDetail}
        slug={categoryDetail?.slug}
        categoryList={categoryListedNFTs}
      />

      <Footer />
    </>
  );
};

export default ExploreList;

const exploreListRequest = (query) => {
  const { cSlug: slug } = query;
  let page = 1;
  let filter = {};
  const sale_filters = query.sale ? query.sale.split(",") : [];
  const nft_filters = query.nft ? query.nft.split(",") : [];
  const search_filters = query.search ? query.search : "";
  const status_filters = query.status ? query.status : "";
  const price_range = {
    from: query.minPrice ? query.minPrice : "",
    to: query.maxPrice ? query.maxPrice : "",
  };
  const sort_filters = query.sort ? query.sort : "recently_listed";
  const nft_category = query["nft-category"]
    ? query["nft-category"].split(",")
    : [];
  const nft_collection = query["nft-collection"]
    ? query["nft-collection"].split(",")
    : [];

  const car_category = query["car-category"]
    ? query["car-category"].split(",")
    : [];

  const sub_category = query["sub-category"]
    ? query["sub-category"].split(",")
    : [];

  const asset_names = query["crypto-asset"]
    ? query["crypto-asset"].split(",")
    : [];

  const has_coin = query.coin ? query.coin : "";
  const signed_by = query["signed-by"]
    ? decodeURIComponent(query["signed-by"])
    : "";

  const bat_types = query["bat-types"] ? query["bat-types"].split(",") : [];

  let noMatchFound =
    sale_filters.length === 0 &&
    nft_filters.length === 0 &&
    search_filters.length === 0 &&
    status_filters.length === 0 &&
    price_range.from.length === 0 &&
    price_range.to.length === 0 &&
    !query.sort &&
    nft_category.length === 0 &&
    nft_collection.length === 0 &&
    asset_names.length === 0 &&
    has_coin.length === 0 &&
    bat_types.length === 0 &&
    signed_by.length === 0 &&
    car_category.length === 0 &&
    sub_category.length === 0;

  if (
    query.category !== "cricket-bat-nfts" &&
    query.category !== "cricket-player-nfts" &&
    query.category !== "cricket-shot-nfts" &&
    query.category !== "cricket-fusor-nfts" &&
    query.category !== "raddx-car-nfts" &&
    query.category !== "raddx-land-nfts" &&
    query.category !== "raddx-building-nfts"
  )
    return false;
  if (noMatchFound && query.search) return false;

  filter = {
    type: nft_filters,
    sale_type: sale_filters,
    keyword: search_filters,
    sort_filters,
    nft_category,
    nft_collection,
    car_category,
    sub_category,
    sale_kind: status_filters,
    price_range,
    has_coin,
    signed_by,
    asset_names,
    bat_types,
    players: signed_by,
  };
  return {
    slug,
    page,
    per_page: 21,
    filter,
    sort: sort_filters === "relevance" ? null : sort_filters,
  };
};

export async function getServerSideProps({ query }) {
  const { cSlug } = query;
  let props = {};
  try {
    let exploreNFTs = await nftCategoryDetailApi({ slug: cSlug });
    props = {
      exploreListedNFTs: exploreNFTs?.data,
    };

    let listedNFTreq = exploreListRequest(query);
    if (!listedNFTreq)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };

    if (cSlug) {
      let categoryList = await nftCategoryListApi(listedNFTreq);
      props.categoryListedNFTs = categoryList?.data;
    }
  } catch (err) {
    console.error("Error", err);
    // return errorRedirect(err?.status);
  }
  return { props };
}
