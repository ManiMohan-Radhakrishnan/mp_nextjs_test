import React, { useEffect, useState, forwardRef } from "react";
import { useRouter } from "next/router";
import { Dropdown } from "react-bootstrap";
import { FaCheckCircle, FaFilter, FaThList } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { VscClose } from "react-icons/vsc";
import { BiCaretDown, BiSearch, BiCheck } from "react-icons/bi";
import { FormControl } from "react-bootstrap";
import { AiOutlineBars } from "react-icons/ai";
import { BsFillGrid3X3GapFill, BsFillGridFill, BsFilter } from "react-icons/bs";
import NFTCards from "../nftCardsView";
import NFTLists from "../nftListsView";
import ExploreTitle from "./explore-title";
import Header from "../header";
import style from "./style.module.scss";
import NFTCardLoader from "../loaders/nft-card-loader";
import images from "../../utils/images.json";
import { nftShowAllApi } from "../../utils/methods";
import useWindowUtils from "../../hooks/useWindowUtils";
import { EVENT_NAMES, invokeTrackEvent } from "../../utils/track-events";
import { CELEBRITIES, isValidCelebrity } from "../../utils/celebrity-config";
import { FILTERS } from "./filter-config";
import MclFilters from "./MclFilters";
import RaddxFilters from "./RaddxFilters";
import RaddxNFTCard from "../raddx/nft-card";
import { RiLayoutMasonryFill } from "react-icons/ri";
import NFTcardsImages from "../nftCardsImages";
import { setCookie, getCookie } from "cookies-next";
import NFTListLoader from "../loaders/nft-list-loader";
import NFTMiniCardLoader from "../loaders/nft-mini-card-loader";
import HurleyFilters from "./HurleyFilters";
// import ogImage from "../../images/JT_OG_image.jpg";
const HEADER_META_DATA = {
  [CELEBRITIES.mcl.name]: {
    metaImage: images?.Og_Image,
    metaTitle:
      "Explore MCL Cricket NFTs | Cricket NFT Marketplace | Jump.trade",
    metaDescription:
      "Own, sell, and trade the fabulous Cricket NFTs on this thriving marketplace. Add some cricket magic to your gaming collections.",
  },
  // ! CHANGE THE CONTENT BELOW
  [CELEBRITIES.raddx.name]: {
    metaImage: images?.Og_Image,
    metaTitle: "Explore Raddx Car NFTs | Car NFT Collection | Jump.trade",
    metaDescription:
      "Embrace the thrill of car racing with our stunning RaddX Car NFTs. The array of cars, lands, and buildings is your road to RaddX Racing Metaverse.",
  },
  [CELEBRITIES.hurley.name]: {
    metaImage: images?.Og_Image,
    metaTitle: "Explore Hurley  NFTs | Hurley NFT Collection | Jump.trade",
    metaDescription:
      "Embrace the thrill of car racing with our stunning RaddX Car NFTs. The array of cars, lands, and buildings is your road to RaddX Racing Metaverse.",
  },
};

const ExploreAllNFT = ({ data, metaData = null, celebrity }) => {
  const { width } = useWindowUtils();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [list, setList] = useState(data?.data?.nfts || []);
  // const [listView, setListView] = useState("largeCard");
  const [listView, setListView] = useState(
    getCookie("Explore_view") ? getCookie("Explore_view") : "largeCard"
  );

  const [hasNext, setHasNext] = useState(data?.data?.next_page || false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const exploreHeaderMetaData = HEADER_META_DATA[celebrity];
  const pageHeaderMetaData = metaData || exploreHeaderMetaData;
  const query = router.query;
  const isMcl = celebrity === CELEBRITIES.mcl.name;
  const isRaddx = celebrity === CELEBRITIES.raddx.name;
  const isHurley = celebrity === CELEBRITIES.hurley.name;

  useEffect(() => {
    if (width > 990) {
      setToggle(!toggle);
    } else {
      setToggle(toggle);
    }
  }, [width]);

  const [search, setSearch] = useState(
    router.query.search ? router.query.search : ""
  );

  const [priceRangeFilter, setPriceRangeFilter] = useState({
    from: "",
    to: "",
  });

  const [filter, setFilter] = useState(FILTERS[celebrity]);

  const handleTabClick = (tab) => {
    if (isValidCelebrity(tab)) router.push(CELEBRITIES[tab].exploreUrl);
  };

  const updateMclFilters = () => {
    const sale_filters = query.sale ? query.sale.split(",") : [];
    const nft_filters = query.nft ? query.nft.split(",") : [];
    const sort_filters = query.sort ? query.sort : "recently_listed";
    const nft_category = query["nft-category"]
      ? query["nft-category"].split(",")
      : [];
    const status_list = query.status ? query.status.split(",") : [];
    const price_range = {
      from: query.minPrice ? query.minPrice : "",
      to: query.maxPrice ? query.maxPrice : "",
    };

    const nft_collection = query["nft-collection"]
      ? query["nft-collection"].split(",")
      : [];
    const asset_names = query["crypto-asset"]
      ? query["crypto-asset"].split(",")
      : [];
    const bat_types = query["bat-types"] ? query["bat-types"].split(",") : [];

    const search_filter = query.search ? query.search : "";
    const has_coin = query.coin ? query.coin : "";
    const nft_level = query.level ? query.level.split(",") : [];

    let player_path = router.query.player;
    const info = { ...filter };

    info.sale = filter.sale.map((obj) => ({
      ...obj,
      checked: sale_filters.includes(obj.value),
    }));
    info.nft = filter.nft.map((obj) => ({
      ...obj,
      checked: nft_filters.includes(obj.value),
    }));
    info.sort = filter.sort.map((obj) => ({
      ...obj,
      checked: sort_filters ? sort_filters === obj.value : false,
    }));
    info.nftCategory = filter.nftCategory.map((obj) => ({
      ...obj,
      checked: nft_category.includes(obj.value),
    }));

    info.status = filter.status.map((obj) => ({
      ...obj,
      checked: status_list.includes(obj.value),
    }));
    info.nftCollection = filter.nftCollection.map((obj) => ({
      ...obj,
      checked: nft_collection.includes(obj.value),
    }));
    info.glCoin = filter.glCoin.map((obj) => ({
      ...obj,
      checked: has_coin ? has_coin === obj.value : false,
    }));

    info.level = filter.level.map((obj) => ({
      ...obj,
      checked: nft_level.includes(obj.value),
    }));
    info.cryptoAssets = filter.cryptoAssets.map((obj) => ({
      ...obj,
      checked: asset_names.includes(obj.value),
    }));
    info.batTypes = filter.batTypes.map((obj) => ({
      ...obj,
      checked: bat_types.includes(obj.value),
    }));
    info.players = filter.players.map((p) => {
      let checked = p.value === player_path;
      player_path = !checked ? player_path : "";
      return { ...p, checked };
    });

    if (player_path) alert("Not found");
    setFilter(info);
    setPage(1);
    setPriceRangeFilter(price_range);
    setSearch(search_filter);
  };

  const updateRaddxFilters = () => {
    let nft_category = query.nft_category ? query.nft_category.split(",") : [];
    let car_category = query.car_category ? query.car_category.split(",") : [];
    let nft_collection = query.nft_collection
      ? query.nft_collection.split(",")
      : [];
    let car_model = query.car_model ? query.car_model.split(",") : [];
    let body_surface = query.body_surface || "";
    let nft_level = query.nft_level ? query.nft_level.split(",") : [];
    let sale_kind = query.sale_kind || "";
    let sale_type = query.sale_type ? query.sale_type.split(",") : [];
    let price_range = {
      from: query.minPrice ? query.minPrice : "",
      to: query.maxPrice ? query.maxPrice : "",
    };
    let sort_filters = query.sort_filters
      ? query.sort_filters
      : "recently_listed";
    // let search_filter = query.search ? query.search.replace("#", "%23") : "";

    const search_filter = query.search ? query.search : "";

    const info = { ...filter };

    info.categories = filter.categories.map((obj) => ({
      ...obj,
      checked: nft_category.includes(obj.value),
    }));

    info.carCategories = filter.carCategories.map((obj) => ({
      ...obj,
      checked: car_category.includes(obj.value),
    }));

    info.subCategories = filter.subCategories.map((obj) => ({
      ...obj,
      checked: nft_collection.includes(obj.value),
    }));
    info.landSubCategories = filter.landSubCategories.map((obj) => ({
      ...obj,
      checked: nft_collection.includes(obj.value),
    }));
    info.buildingSubCategories = filter.buildingSubCategories.map((obj) => ({
      ...obj,
      checked: nft_collection.includes(obj.value),
    }));

    info.carModels = filter.carModels.map((obj) => ({
      ...obj,
      checked: car_model.includes(obj.value),
    }));

    info.bodySurface = filter.bodySurface.map((obj) => ({
      ...obj,
      checked: body_surface ? body_surface === obj.value : false,
    }));

    info.level = filter.level.map((obj) => ({
      ...obj,
      checked: nft_level.includes(obj.value),
    }));

    info.saleKind = filter.saleKind.map((obj) => ({
      ...obj,
      checked: sale_kind ? sale_kind === obj.value : false,
    }));

    info.saleType = filter.saleType.map((obj) => ({
      ...obj,
      checked: sale_type.includes(obj.value),
    }));

    info.sort = filter.sort.map((obj) => ({
      ...obj,
      checked: sort_filters ? sort_filters === obj.value : false,
    }));

    setPriceRangeFilter(price_range);
    setSearch(search_filter);
    setFilter(info);
    setPage(1);
  };
  const updateHurleyFilters = () => {
    let nft_collection = query.nft_collection
      ? query.nft_collection.split(",")
      : [];
    let nft_level = query.nft_level ? query.nft_level.split(",") : [];
    let sale_kind = query.sale_kind || "";
    let sale_type = query.sale_type ? query.sale_type.split(",") : [];
    let gender = query.gender ? query.gender.split(",") : [];
    let price_range = {
      from: query.minPrice ? query.minPrice : "",
      to: query.maxPrice ? query.maxPrice : "",
    };
    let sort_filters = query.sort_filters
      ? query.sort_filters
      : "recently_listed";
    // let search_filter = query.search ? query.search.replace("#", "%23") : "";

    const search_filter = query.search ? query.search : "";

    const info = { ...filter };

    info.categories = filter.categories.map((obj) => ({
      ...obj,
      checked: nft_collection.includes(obj.value),
    }));

    info.gender = filter.gender.map((obj) => ({
      ...obj,
      checked: gender.includes(obj.value),
    }));

    info.level = filter.level.map((obj) => ({
      ...obj,
      checked: nft_level.includes(obj.value),
    }));

    info.saleKind = filter.saleKind.map((obj) => ({
      ...obj,
      checked: sale_kind ? sale_kind === obj.value : false,
    }));

    info.saleType = filter.saleType.map((obj) => ({
      ...obj,
      checked: sale_type.includes(obj.value),
    }));

    info.sort = filter.sort.map((obj) => ({
      ...obj,
      checked: sort_filters ? sort_filters === obj.value : false,
    }));

    setPriceRangeFilter(price_range);
    setSearch(search_filter);
    setFilter(info);
    setPage(1);
  };

  useEffect(() => {
    if (width <= 767)
      setFilter({
        ...filter,
        showSale: false,
        showStatus: false,
        auction: false,
        showGender: false,
        showNFTCategory: true,
        showNFTCollection: false,
        showNFTRange: false,
        showGlC: false,
        showPlayers: false,
        showLevel: false,
        price: false,
        showCryptoAssets: false,
        showBatTypes: false,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  useEffect(() => {
    if (isMcl) updateMclFilters();
    if (isRaddx) updateRaddxFilters();
    if (isHurley) updateHurleyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, query.search]);

  useEffect(() => {
    setLoading(false);
    setList(data?.data?.nfts || []);
    setHasNext(data?.data?.next_page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const showAllMclNFTs = async (
    page,
    type,
    saleType,
    sort = "recently_listed",
    searchText,
    nft_category,
    nft_collection,
    status_filters,
    price_range,
    has_coin,
    players,
    nft_level,
    asset_names,
    bat_types
  ) => {
    try {
      setLoadingMore(true);
      const response = await nftShowAllApi({
        page,
        per_page: 21,
        filter: {
          type: type,
          sale_type: saleType,
          keyword: searchText,
          nft_category,
          nft_collection,
          sale_kind: status_filters,
          price_range,
          has_coin: has_coin === "has_coin" ? true : false,
          players,
          nft_level,
          asset_names,
          bat_types,
          game_names: [CELEBRITIES.mcl.name],
        },
        sort: sort === "relevance" ? null : sort,
      });

      setList([...list, ...response?.data?.data?.nfts]);
      setHasNext(response?.data?.data?.next_page);
      setLoadingMore(false);
    } catch (err) {
      console.log(err);
    }
  };

  const showAllRaddxNFTs = async (
    page,
    nft_category,
    car_category,
    nft_collection,
    car_model,
    body_surface,
    nft_level,
    sale_kind,
    sale_type,
    price_range,
    sort_filters,
    search_exist
  ) => {
    try {
      setLoadingMore(true);
      const response = await nftShowAllApi({
        page,
        per_page: 21,
        filter: {
          nft_category,
          car_category,
          nft_collection,
          car_model,
          body_surface,
          nft_level,
          sale_kind,
          sale_type,
          price_range,
          keyword: search_exist,
          game_names: [CELEBRITIES.raddx.name],
        },
        sort: sort_filters === "relevance" ? null : sort_filters,
      });

      setList([...list, ...response?.data?.data?.nfts]);
      setHasNext(response?.data?.data?.next_page);
      setLoadingMore(false);
    } catch (err) {
      console.log(err);
    }
  };

  const showAllHurleyNFTs = async (
    page,
    nft_collection,
    gender,
    nft_level,
    sale_kind,
    sale_type,
    price_range,
    sort_filters,
    search_exist
  ) => {
    try {
      setLoadingMore(true);
      const response = await nftShowAllApi({
        page,
        per_page: 21,
        filter: {
          nft_collection,
          gender,
          nft_level,
          sale_kind,
          sale_type,
          price_range,
          keyword: search_exist,
          game_names: [CELEBRITIES.hurley.name],
        },
        sort: sort_filters === "relevance" ? null : sort_filters,
      });

      setList([...list, ...response?.data?.data?.nfts]);
      setHasNext(response?.data?.data?.next_page);
      setLoadingMore(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilterView = (view) => {
    setCookie("Explore_view", view);
    setListView(getCookie("Explore_view"));
  };

  const clearMclFilters = () => {
    setPriceRangeFilter({
      from: "",
      to: "",
    });
    setPriceRange({
      from: "",
      to: "",
    });
    router.push(CELEBRITIES.mcl.exploreUrl);
    // invokeTrackEvent(EVENT_NAMES?.FILTER_REMOVED, {});
  };

  const clearRaddxFilters = () => {
    setPriceRangeFilter({
      from: "",
      to: "",
    });
    setPriceRange({
      from: "",
      to: "",
    });
    router.push(CELEBRITIES.raddx.exploreUrl);
  };

  const clearHurleyFilters = () => {
    setPriceRangeFilter({
      from: "",
      to: "",
    });
    setPriceRange({
      from: "",
      to: "",
    });
    router.push(CELEBRITIES.hurley.exploreUrl);
  };

  const clearFilter = () => {
    if (isMcl) clearMclFilters();
    if (isRaddx) clearRaddxFilters();
    if (isHurley) clearHurleyFilters();
  };

  const fetchMoreMclNfts = () => {
    if (hasNext) {
      const sale_filters = query.sale ? query.sale.split(",") : [];
      const nft_filters = query.nft ? query.nft.split(",") : [];
      const sort_filters = query.sort ? query.sort : "recently_listed";
      const price_range = {
        from: query.minPrice ? query.minPrice : "",
        to: query.maxPrice ? query.maxPrice : "",
      };
      const search_filters = query.search;
      const nft_category = query["nft-category"]
        ? query["nft-category"].split(",")
        : [];

      const nft_collection = query["nft-collection"]
        ? query["nft-collection"].split(",")
        : [];
      const asset_names = query["crypto-asset"]
        ? query["crypto-asset"].split(",")
        : [];
      const bat_types = query["bat-types"] ? query["bat-types"].split(",") : [];
      const status_filters = query.status ? query.status : "";
      const has_coin = query.coin ? query.coin : "";

      const player = router.query.player;
      const playerObj = filter.players.find((p) => p.value === player);

      let players = [];
      if (playerObj?.key) players = playerObj?.key ? [playerObj?.key] : [];
      else players = playerObj?.name ? [playerObj?.name] : [];
      const nft_level = query.level ? query.level.split(",") : [];

      showAllMclNFTs(
        page + 1,
        nft_filters,
        sale_filters,
        sort_filters,
        search_filters,
        nft_category,
        nft_collection,
        status_filters,
        price_range,
        has_coin,
        players,
        nft_level,
        asset_names,
        bat_types
      );
      setPage(page + 1);
    }
  };

  const fetchMoreRaddxNfts = () => {
    if (hasNext) {
      let nft_category = query.nft_category
        ? query.nft_category.split(",")
        : [];
      let car_category = query.car_category
        ? query.car_category.split(",")
        : [];
      let nft_collection = query.nft_collection
        ? query.nft_collection.split(",")
        : [];
      let car_model = query.car_model ? query.car_model.split(",") : [];
      let body_surface = query.body_surface;
      let nft_level = query.nft_level ? query.nft_level.split(",") : [];
      let sale_kind = query.sale_kind;
      let sale_type = query.sale_type ? query.sale_type.split(",") : [];
      let price_range = {
        from: query.minPrice ? query.minPrice : "",
        to: query.maxPrice ? query.maxPrice : "",
      };
      let sort_filters = query.sort_filters
        ? query.sort_filters
        : "recently_listed";
      let search_exist = query.search || "";

      showAllRaddxNFTs(
        page + 1,
        nft_category,
        car_category,
        nft_collection,
        car_model,
        body_surface,
        nft_level,
        sale_kind,
        sale_type,
        price_range,
        sort_filters,
        search_exist
      );
      setPage(page + 1);
    }
  };
  const fetchMoreHurleyNfts = () => {
    if (hasNext) {
      // let nft_category = query.nft_category
      //   ? query.nft_category.split(",")
      //   : [];
      let nft_collection = query.nft_collection
        ? query.nft_collection.split(",")
        : [];
      let gender = query.gender ? query.gender.split(",") : [];
      let nft_level = query.nft_level ? query.nft_level.split(",") : [];
      let sale_kind = query.sale_kind;
      let sale_type = query.sale_type ? query.sale_type.split(",") : [];
      let price_range = {
        from: query.minPrice ? query.minPrice : "",
        to: query.maxPrice ? query.maxPrice : "",
      };
      let sort_filters = query.sort_filters
        ? query.sort_filters
        : "recently_listed";
      let search_exist = query.search || "";

      showAllHurleyNFTs(
        page + 1,
        nft_collection,
        gender,
        nft_level,
        sale_kind,
        sale_type,
        price_range,
        sort_filters,
        search_exist
      );
      setPage(page + 1);
    }
  };

  const fetchMore = () => {
    if (isMcl) fetchMoreMclNfts();
    if (isRaddx) fetchMoreRaddxNfts();
    if (isHurley) fetchMoreHurleyNfts();
  };

  const ShowAllSort = forwardRef(({ onClick }, ref) => (
    <div
      className={style["filter-drop-sort-btn"]}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {filter.sort.find((obj) => obj.checked === true)?.name
        ? `Sort By: ${filter.sort.find((obj) => obj.checked === true).name}`
        : "Sort By"}
      <BiCaretDown />
    </div>
  ));

  ShowAllSort.displayName = "ShowAllSort";

  const handleKeyPressEvent = (event) => {
    if (event.key === "Enter") {
      handleFilterCheck("", "text_search");
    }
  };

  const handleBlurEvent = (event) => {
    if (event.target.value.trim() === "") {
      handleFilterCheck("", "text_search");
    }
  };

  const handleMCLFilters = (input, type, remove) => {
    let baseUrl = CELEBRITIES.mcl.exploreUrl;
    let sale_exist = query.sale ? query.sale.split(",") : [];
    let nft_exist = query.nft ? query.nft.split(",") : [];
    let sort_exist = query.sort;
    let sort_exist_temp = query.sort;
    let price_range = {
      from: query.minPrice ? query.minPrice : "",
      to: query.maxPrice ? query.maxPrice : "",
    };
    let search_exist = query.search ? query.search.replace("#", "%23") : "";
    let nft_category = query["nft-category"]
      ? query["nft-category"].split(",")
      : [];

    let status_list = query.status ? query.status.split(",") : [];

    let nft_collection = query["nft-collection"]
      ? query["nft-collection"].split(",")
      : [];
    let asset_names = query["crypto-asset"]
      ? query["crypto-asset"].split(",")
      : [];
    let bat_types = query["bat-types"] ? query["bat-types"].split(",") : [];

    let sale_status = query.status;
    let has_coin = query.coin;
    let has_coin_temp = query.coin;
    let player_path = router.query.player ? router.query.player : "";
    let player_list = filter.players;
    let nft_level = query.level ? query.level.split(",") : [];

    switch (type) {
      case "sale_check":
        if (sale_exist.includes(input.value)) {
          sale_exist = sale_exist.filter((obj) => obj !== input.value);
        } else {
          sale_exist.push(input.value);
        }
        break;
      case "sale_status_NFT":
        sale_status = remove
          ? null
          : status_list.includes(input.value)
          ? null
          : input.value;

        break;

      case "NFT_check":
        if (nft_exist.includes(input.value)) {
          nft_exist = nft_exist.filter((obj) => obj !== input.value);
        } else {
          nft_exist.push(input.value);
        }
        break;
      case "sort_NFT":
        sort_exist = input.value
          ? sort_exist_temp === input.value
            ? null
            : input.value
          : null;
        break;
      case "text_search":
        search_exist = search.replace("#", "%23");
        break;
      case "NFT_category_check":
        if (nft_category.includes(input.value)) {
          nft_category = nft_category.filter((obj) => obj !== input.value);
        } else {
          nft_category.push(input.value);
        }
        break;

      case "NFT_collection_check":
        if (nft_collection.includes(input.value)) {
          nft_collection = nft_collection.filter((obj) => obj !== input.value);
        } else {
          nft_collection.push(input.value);
        }

        break;
      case "Crypto_asset_check":
        if (asset_names.includes(input.value)) {
          asset_names = asset_names.filter((obj) => obj !== input.value);
        } else {
          asset_names.push(input.value);
        }

        break;
      case "bat_type_check":
        if (bat_types.includes(input.value)) {
          bat_types = bat_types.filter((obj) => obj !== input.value);
        } else {
          bat_types.push(input.value);
        }

        break;
      case "price_range":
        setPriceRangeFilter({ ...input });
        price_range = remove ? { from: null, to: null } : input;
        if (remove) {
          setPriceRangeFilter(price_range);
        }
        break;

      case "has_GLC":
        has_coin = input.value
          ? has_coin_temp === input.value
            ? null
            : input.value
          : null;
        break;

      case "players":
        for (let p in player_list) {
          if (player_list[p].value === input.value) {
            player_path =
              player_path !== input.value ? player_list[p].value : "";
            break;
          }
        }
        break;
      case "NFT_level":
        if (nft_level.includes(input.value)) {
          nft_level = nft_level.filter((obj) => obj !== input.value);
        } else {
          nft_level.push(input.value);
        }
        break;

      default:
    }

    let query_string = "";

    if (sale_exist.length > 0) {
      query_string += query_string
        ? `&sale=${sale_exist}`
        : `sale=${sale_exist}`;
    }

    if (nft_exist.length > 0) {
      query_string += query_string ? `&nft=${nft_exist}` : `nft=${nft_exist}`;
    }

    if (nft_category.length > 0) {
      query_string += query_string
        ? `&nft-category=${nft_category}`
        : `nft-category=${nft_category}`;
    }
    if (nft_level.length > 0) {
      query_string += query_string
        ? `&level=${nft_level}`
        : `level=${nft_level}`;
    }

    if (price_range.from || price_range.to) {
      query_string += query_string
        ? `&minPrice=${price_range.from}&maxPrice=${price_range.to}`
        : `minPrice=${price_range.from}&maxPrice=${price_range.to}`;
    }

    if (nft_collection.length > 0) {
      query_string += query_string
        ? `&nft-collection=${nft_collection}`
        : `nft-collection=${nft_collection}`;
    }

    if (asset_names.length > 0) {
      query_string += query_string
        ? `&crypto-asset=${asset_names}`
        : `crypto-asset=${asset_names}`;
    }

    if (bat_types.length > 0) {
      query_string += query_string
        ? `&bat-types=${bat_types}`
        : `bat-types=${bat_types}`;
    }

    if (sort_exist) {
      query_string += query_string
        ? `&sort=${sort_exist}`
        : `sort=${sort_exist}`;
    }

    if (search_exist) {
      query_string += query_string
        ? `&search=${search_exist}`
        : `search=${search_exist}`;
    }
    if (sale_status) {
      query_string += query_string
        ? `&status=${sale_status}`
        : `status=${sale_status}`;
    }

    if (has_coin) {
      query_string += query_string ? `&coin=${has_coin}` : `coin=${has_coin}`;
    }

    if (player_path) {
      baseUrl = `/nft-marketplace/cricket-nfts/${player_path}`;
      // invokeTrackEvent(EVENT_NAMES?.FILTER_APPLIED, {
      //   filter: query_string,
      //   player_path: player_path ? player_path : null,
      // });
      // } else {
      //   invokeTrackEvent(EVENT_NAMES?.FILTER_APPLIED, {
      //     filter: query_string,
      //   });
    }
    router.push(query_string ? `${baseUrl}?${query_string}` : baseUrl);
  };

  const handleRaddxFilters = (input, type, remove) => {
    let baseUrl = CELEBRITIES.raddx.exploreUrl;
    let nft_category = query.nft_category ? query.nft_category.split(",") : [];
    let car_category = query.car_category ? query.car_category.split(",") : [];
    let nft_collection = query.nft_collection
      ? query.nft_collection.split(",")
      : [];
    let car_model = query.car_model ? query.car_model.split(",") : [];
    let body_surface = query.body_surface;
    let nft_level = query.nft_level ? query.nft_level.split(",") : [];
    let sale_kind = query.sale_kind;
    let sale_type = query.sale_type ? query.sale_type.split(",") : [];
    let price_range = {
      from: query.minPrice ? query.minPrice : "",
      to: query.maxPrice ? query.maxPrice : "",
    };
    let sort_filters = query.sort_filters;
    let search_exist = query.search ? query.search.replace("#", "%23") : "";

    switch (type) {
      case "nft_category":
        if (nft_category.includes(input.value))
          nft_category = nft_category.filter((obj) => obj !== input.value);
        else nft_category.push(input.value);
        break;
      case "car_category":
        if (car_category.includes(input.value))
          car_category = car_category.filter((obj) => obj !== input.value);
        else car_category.push(input.value);
        break;
      case "nft_collection":
        if (nft_collection.includes(input.value))
          nft_collection = nft_collection.filter((obj) => obj !== input.value);
        else nft_collection.push(input.value);
        break;
      case "car_model":
        if (car_model.includes(input.value))
          car_model = car_model.filter((obj) => obj !== input.value);
        else car_model.push(input.value);
        break;
      case "body_surface":
        body_surface =
          remove || body_surface === input.value ? null : input.value;
        break;
      case "nft_level":
        if (nft_level.includes(input.value))
          nft_level = nft_level.filter((obj) => obj !== input.value);
        else nft_level.push(input.value);
        break;
      case "sale_kind":
        sale_kind = remove || sale_kind === input.value ? null : input.value;
        break;
      case "sale_type":
        if (sale_type.includes(input.value))
          sale_type = sale_type.filter((obj) => obj !== input.value);
        else sale_type.push(input.value);
        break;
      case "price_range":
        price_range = remove ? { from: null, to: null } : { ...input };
        setPriceRangeFilter(price_range);
        break;
      case "sort_NFT":
        sort_filters =
          !input.value || sort_filters === input.value ? null : input.value;
        break;
      case "text_search":
        search_exist = search.replace("#", "%23");
        break;
      default:
    }

    let query_string = "";

    if (nft_category.length > 0) {
      query_string += query_string
        ? `&nft_category=${nft_category}`
        : `nft_category=${nft_category}`;
    }
    if (car_category.length > 0) {
      query_string += query_string
        ? `&car_category=${car_category}`
        : `car_category=${car_category}`;
    }

    if (nft_collection.length > 0) {
      query_string += query_string
        ? `&nft_collection=${nft_collection}`
        : `nft_collection=${nft_collection}`;
    }

    if (car_model.length > 0) {
      query_string += query_string
        ? `&car_model=${car_model}`
        : `car_model=${car_model}`;
    }

    if (body_surface) {
      query_string += query_string
        ? `&body_surface=${body_surface}`
        : `body_surface=${body_surface}`;
    }

    if (nft_level.length > 0) {
      query_string += query_string
        ? `&nft_level=${nft_level}`
        : `nft_level=${nft_level}`;
    }

    if (sale_kind) {
      query_string += query_string
        ? `&sale_kind=${sale_kind}`
        : `sale_kind=${sale_kind}`;
    }

    if (sale_type.length > 0) {
      query_string += query_string
        ? `&sale_type=${sale_type}`
        : `sale_type=${sale_type}`;
    }

    if (price_range.from || price_range.to) {
      query_string += query_string
        ? `&minPrice=${price_range.from}&maxPrice=${price_range.to}`
        : `minPrice=${price_range.from}&maxPrice=${price_range.to}`;
    }

    if (sort_filters) {
      query_string += query_string
        ? `&sort_filters=${sort_filters}`
        : `sort_filters=${sort_filters}`;
    }

    if (search_exist) {
      query_string += query_string
        ? `&search=${search_exist}`
        : `search=${search_exist}`;
    }

    router.push(query_string ? `${baseUrl}?${query_string}` : baseUrl);
  };
  const handleHurleyFilters = (input, type, remove) => {
    let baseUrl = CELEBRITIES.hurley.exploreUrl;
    // let nft_category = query.nft_category ? query.nft_category.split(",") : [];
    let nft_collection = query.nft_collection
      ? query.nft_collection.split(",")
      : [];
    let gender = query.gender ? query.gender.split(",") : [];
    let nft_level = query.nft_level ? query.nft_level.split(",") : [];
    let sale_kind = query.sale_kind;
    let sale_type = query.sale_type ? query.sale_type.split(",") : [];
    let price_range = {
      from: query.minPrice ? query.minPrice : "",
      to: query.maxPrice ? query.maxPrice : "",
    };
    let sort_filters = query.sort_filters;
    let search_exist = query.search ? query.search.replace("#", "%23") : "";

    switch (type) {
      // case "nft_category":
      //   if (nft_category.includes(input.value))
      //     nft_category = nft_category.filter((obj) => obj !== input.value);
      //   else nft_category.push(input.value);
      //   break;

      case "NFT_collection_check":
        if (nft_collection.includes(input.value))
          nft_collection = nft_collection.filter((obj) => obj !== input.value);
        else nft_collection.push(input.value);
        break;

      case "nft_level":
        if (nft_level.includes(input.value))
          nft_level = nft_level.filter((obj) => obj !== input.value);
        else nft_level.push(input.value);
        break;
      case "nft_gender":
        if (gender.includes(input.value))
          gender = gender.filter((obj) => obj !== input.value);
        else gender.push(input.value);
        break;
      case "sale_kind":
        sale_kind = remove || sale_kind === input.value ? null : input.value;
        break;
      case "sale_type":
        if (sale_type.includes(input.value))
          sale_type = sale_type.filter((obj) => obj !== input.value);
        else sale_type.push(input.value);
        break;
      case "price_range":
        price_range = remove ? { from: null, to: null } : { ...input };
        setPriceRangeFilter(price_range);
        break;
      case "sort_NFT":
        sort_filters =
          !input.value || sort_filters === input.value ? null : input.value;
        break;
      case "text_search":
        search_exist = search.replace("#", "%23");
        break;
      default:
    }

    let query_string = "";

    // if (nft_category.length > 0) {
    //   query_string += query_string
    //     ? `&nft_category=${nft_category}`
    //     : `nft_category=${nft_category}`;
    // }

    if (nft_collection.length > 0) {
      query_string += query_string
        ? `&nft_collection=${nft_collection}`
        : `nft_collection=${nft_collection}`;
    }

    if (nft_level.length > 0) {
      query_string += query_string
        ? `&nft_level=${nft_level}`
        : `nft_level=${nft_level}`;
    }

    if (gender.length > 0) {
      query_string += query_string ? `&gender=${gender}` : `gender=${gender}`;
    }

    if (sale_kind) {
      query_string += query_string
        ? `&sale_kind=${sale_kind}`
        : `sale_kind=${sale_kind}`;
    }

    if (sale_type.length > 0) {
      query_string += query_string
        ? `&sale_type=${sale_type}`
        : `sale_type=${sale_type}`;
    }

    if (price_range.from || price_range.to) {
      query_string += query_string
        ? `&minPrice=${price_range.from}&maxPrice=${price_range.to}`
        : `minPrice=${price_range.from}&maxPrice=${price_range.to}`;
    }

    if (sort_filters) {
      query_string += query_string
        ? `&sort_filters=${sort_filters}`
        : `sort_filters=${sort_filters}`;
    }

    if (search_exist) {
      query_string += query_string
        ? `&search=${search_exist}`
        : `search=${search_exist}`;
    }

    router.push(query_string ? `${baseUrl}?${query_string}` : baseUrl);
  };

  const handleFilterCheck = (input, type, remove = false) => {
    setLoading(true);
    if (isMcl) handleMCLFilters(input, type, remove);
    if (isRaddx) handleRaddxFilters(input, type, remove);
    if (isHurley) handleHurleyFilters(input, type, remove);
  };

  const PriceDropdown = forwardRef(({ onClick }, ref) => (
    <div
      className={`${style["filter-drop-btn"]} me-2`}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      {priceRangeFilter.from && priceRangeFilter.to
        ? `Price Range $${priceRangeFilter.from} - $${priceRangeFilter.to}`
        : priceRangeFilter.from
        ? `Min $${priceRangeFilter.from}`
        : priceRangeFilter.to
        ? `Max $${priceRangeFilter.to}`
        : "Price Range"}
    </div>
  ));

  PriceDropdown.displayName = "PriceDropdown";
  const [priceRange, setPriceRange] = useState({
    from: query?.minPrice ? query?.minPrice : "",
    to: query?.maxPrice ? query?.maxPrice : "",
  });

  let filterCount = () => {
    let count = -1;
    for (let obj of Object.values(filter)) {
      count += Array.isArray(obj)
        ? obj.filter((obj) => obj.checked === true).length
        : 0;
    }
    return count;
  };

  return (
    <>
      {pageHeaderMetaData.metaTitle && (
        <Header
          bgImage
          image={pageHeaderMetaData.metaImage}
          title={pageHeaderMetaData.metaTitle}
          description={pageHeaderMetaData.metaDescription}
        />
      )}

      <section className={style["explore-nft-section"]}>
        {router.query.player && (
          <article className={style["explorer-detail"]}>
            <div className={"container-fluid"}>
              <div className="row">
                <ExploreTitle
                  image={images?.Og_Image}
                  title={pageHeaderMetaData.title}
                  description={pageHeaderMetaData.description}
                />
              </div>
            </div>
          </article>
        )}
        <article className={style["explorer-nft-list"]}>
          <div className={"container-fluid"}>
            <div className="row">
              <div className="col-sm-12">
                {" "}
                <h4 className={style["explorer-nft-list-title"]}>
                  Listed NFTs
                  <span className={style["filter-tab-block"]}>
                    <span
                      className={`${style["filter-tab"]} ${
                        style[isMcl ? "active" : ""]
                      }`}
                      onClick={() => handleTabClick(CELEBRITIES.mcl.name)}
                    >
                      MCL
                    </span>
                    <span
                      className={`${style["filter-tab"]} ${
                        style[isRaddx ? "active" : ""]
                      }`}
                      onClick={() => handleTabClick(CELEBRITIES.raddx.name)}
                    >
                      RADDX
                    </span>
                    <span
                      className={`${style["filter-tab"]} ${
                        style[isHurley ? "active" : ""]
                      }`}
                      onClick={() => handleTabClick(CELEBRITIES.hurley.name)}
                    >
                      HURLEY
                    </span>
                    {/* <span
                      className={`${style["filter-tab"]} ${
                        style[isBns ? "active" : ""]
                      }`}
                      onClick={() => handleTabClick(CELEBRITIES.bns.name)}
                    >
                      BNS
                    </span> */}
                  </span>
                </h4>
              </div>
            </div>
          </div>

          {/* <div className={`${style["sticky-sm-top"]}top-25`}>
            <div className={"container-fluid"}>
              <div className="row">
                <div className="col-sm-12"></div>
              </div>
            </div>
            <div className={"container-fluid"}>
              <div className="row">
                <div className="col-sm-12">
                  <div
                    className={`${style["sec-heading"]} d-flex align-items-center mb-2 ${style["explore-heading"]}`}
                  >
                    <span
                      className={`me-4 mt-2 text-nowrap ${style["sec-title"]}`}
                    >
                      LISTED NFTs
                    </span>
                  </div> */}
          {/* <ul
                      className={`${style["explore-filter-view-icon"]} d-flex align-items-center`}
                    >
                      {console.log(listView)}
                      <li
                        className={`${
                          listView === "list" ? `${style["active"]}` : ""
                        }`}
                        onClick={() => handleFilterView("list")}
                      >
                        <AiOutlineBars />
                      </li>
                      <li
                        className={`${
                          listView === "mediumlist" ? `${style["active"]}` : ""
                        }`}
                        onClick={() => handleFilterView("mediumlist")}
                      >
                        <FaThList />
                      </li>
                      <li
                        className={`${
                          listView === "card" ? `${style["active"]}` : ""
                        }`}
                        onClick={() => handleFilterView("card")}
                      >
                        <BsFillGrid3X3GapFill />
                      </li>
                      <li
                        className={`${
                          listView === "largeCard" ? `${style["active"]}` : ""
                        }`}
                        onClick={() => handleFilterView("largeCard")}
                      >
                        <BsFillGridFill />
                      </li>
                      <li
                        className={`${
                          listView === "nftImage" ? `${style["active"]}` : ""
                        }`}
                        onClick={() => handleFilterView("nftImage")}
                      >
                        <RiLayoutMasonryFill />
                      </li>
                    </ul> */}
          {/* </div>
              </div>
            </div>
          </div> */}

          <div className={`${style["explore-heading-block"]}`}>
            <span
              onClick={() => setToggle(!toggle)}
              className={style["filter-open-btn"]}
            >
              <BsFilter size={10} />{" "}
              <span className={style["filter-text"]}>Filters</span>
              {filterCount() > 0 ? (
                <span className={style["filter-count"]}> {filterCount()}</span>
              ) : (
                ""
              )}
            </span>

            <div className={style["filt-flex-search"]}>
              <input
                type="text"
                className={style["search-box-add"]}
                value={search}
                onKeyPress={handleKeyPressEvent}
                onBlur={handleBlurEvent}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by NFT name"
              />{" "}
              <span
                role="button"
                className={style["search-button"]}
                onClick={(e) => handleFilterCheck("", "text_search")}
              >
                <BiSearch size={15} />
              </span>
            </div>
            <span className={`${style["filter-blocks"]}`}>
              <div className={`d-flex flex-wrap ${style["filter-box"]}`}></div>
              <div
                className={`${style["filt-flex-box"]} ${style["explore_block"]}`}
              >
                <Dropdown className={`${style["dropdown"]}`}>
                  <Dropdown.Toggle
                    align="start"
                    drop="start"
                    as={ShowAllSort}
                  ></Dropdown.Toggle>

                  <Dropdown.Menu align="start">
                    {filter.sort.map((obj, i) => (
                      <Dropdown.Item
                        key={`nft${i}`}
                        as="button"
                        onClick={() => handleFilterCheck(obj, "sort_NFT")}
                      >
                        <FaCheckCircle
                          color={obj.checked ? "green" : "#ccc"}
                          className="mb-1 me-2"
                          size={17}
                        />{" "}
                        {obj.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </span>
            <ul
              className={`${style["explore-filter-view-icon"]} d-flex align-items-center`}
            >
              <li
                className={`${listView === "list" ? `${style["active"]}` : ""}`}
                onClick={() => handleFilterView("list")}
              >
                <AiOutlineBars />
              </li>
              {/* <li
                className={`${
                  listView === "mediumlist" ? `${style["active"]}` : ""
                }`}
                onClick={() => handleFilterView("mediumlist")}
              >
                <FaThList />
              </li> */}

              {/* {width >= 420 ? ( ) : (
                <></>
              )} */}
              <li
                className={`${listView === "card" ? `${style["active"]}` : ""}`}
                onClick={() => handleFilterView("card")}
              >
                <BsFillGrid3X3GapFill />
              </li>

              <li
                className={`${
                  listView === "largeCard" ? `${style["active"]}` : ""
                }`}
                onClick={() => handleFilterView("largeCard")}
              >
                <BsFillGridFill />
              </li>
              <li
                className={`${
                  listView === "nftImage" ? `${style["active"]}` : ""
                }`}
                onClick={() => handleFilterView("nftImage")}
              >
                <RiLayoutMasonryFill />
              </li>
            </ul>
          </div>

          {/* <div className="container-fluid">
            <div className="mb-2">
              
            </div>
          </div> */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <section className={style["explorer-nft-group"]}>
                  <aside
                    className={`${style["filter-block"]} ${
                      toggle && style["open-aside"]
                    }`}
                  >
                    <div className={`bg-dark ${style["stick-top-custom"]}`}>
                      <span
                        onClick={() => setToggle(!toggle)}
                        className={style["filter-close-btn"]}
                      >
                        <VscClose />
                      </span>
                      <div className={style["heading-box"]}>
                        <h4>Filters</h4>
                        <span
                          className={`${style["clear-btn"]} ${
                            Object.keys(router.query).length === 0
                              ? `${style["disabled"]}`
                              : ""
                          }`}
                          onClick={() => clearFilter()}
                        >
                          Clear all
                        </span>
                      </div>
                      {isMcl && (
                        <MclFilters
                          filter={filter}
                          setFilter={setFilter}
                          priceRangeFilter={priceRangeFilter}
                          priceRange={priceRange}
                          setPriceRange={setPriceRange}
                          handleFilterCheck={handleFilterCheck}
                        />
                      )}
                      {isRaddx && (
                        <RaddxFilters
                          filter={filter}
                          setFilter={setFilter}
                          priceRangeFilter={priceRangeFilter}
                          priceRange={priceRange}
                          setPriceRange={setPriceRange}
                          handleFilterCheck={handleFilterCheck}
                        />
                      )}
                      {isHurley && (
                        <HurleyFilters
                          filter={filter}
                          setFilter={setFilter}
                          priceRangeFilter={priceRangeFilter}
                          priceRange={priceRange}
                          setPriceRange={setPriceRange}
                          handleFilterCheck={handleFilterCheck}
                        />
                      )}
                    </div>
                  </aside>

                  <article
                    className={`${style["nft-list"]} ${
                      !toggle && style["expand-main"]
                    }`}
                  >
                    {!loading ? (
                      <>
                        <div className="row">
                          {(() => {
                            if (["card", "largeCard"].includes(listView)) {
                              return (
                                <>
                                  <NFTCards
                                    classNames={`${
                                      listView === "card"
                                        ? "mini-card"
                                        : "large-card"
                                    }`}
                                    expandView={!toggle && "expand-cards"}
                                    celebrity={
                                      isMcl
                                        ? "isMcl"
                                        : isRaddx
                                        ? "isRaddx"
                                        : "isHurley"
                                    }
                                    list={list}
                                    imageUrl={"/sample.gif"}
                                    isExplore
                                    relativeUrl={
                                      router.query.player
                                        ? `nft-marketplace/cricket-nfts/${router.query.player}`
                                        : "nft-marketplace"
                                    }
                                  />
                                  {/* {loadingMore && <NFTCardLoader />} */}
                                  {/* {hasNext && (
                                    <div className="row mb-5">
                                      <div className="col-md-12 text-center">
                                        <button
                                          className={style["load_more"]}
                                          disabled={loadingMore}
                                          onClick={fetchMore}
                                        >
                                          {loadingMore
                                            ? "Loading..."
                                            : "Load More"}
                                        </button>
                                      </div>
                                    </div>
                                  )} */}
                                </>
                              );
                            } else if (
                              ["list", "mediumlist"].includes(listView)
                            ) {
                              return (
                                <>
                                  <section
                                    className={`${style["nft-list-flex-container"]}`}
                                  >
                                    <NFTLists
                                      classNames={`${
                                        listView === "list"
                                          ? "mini-list"
                                          : "large-list"
                                      }`}
                                      list={list}
                                      image={"/sample.gif"}
                                      isExplore
                                      relativeUrl={
                                        router.query.player
                                          ? `nft-marketplace/cricket-nfts/${router.query.player}`
                                          : "nft-marketplace"
                                      }
                                    />

                                    {/* {loadingMore && <NFTCardLoader />} */}
                                    {/* {hasNext && (
                                      <div className="row mb-2">
                                        <div className="col-md-12 text-center">
                                          <button
                                            className={`${style["load_more"]} ${style["load_more_list"]}`}
                                            disabled={loadingMore}
                                            onClick={fetchMore}
                                          >
                                            {loadingMore
                                              ? "Loading..."
                                              : "Load More"}
                                          </button>
                                        </div>
                                      </div>
                                    )} */}
                                  </section>
                                </>
                              );
                            } else if (["nftImage"].includes(listView)) {
                              return (
                                <>
                                  <NFTcardsImages
                                    classNames={`${
                                      listView === "nftImage"
                                        ? "mini-card"
                                        : "large-card"
                                    }`}
                                    expandView={!toggle && "expand-cards"}
                                    topClassName={`nft-images`}
                                    list={list}
                                    image={"/sample.gif"}
                                    isExplore
                                    relativeUrl={
                                      router.query.player
                                        ? `nft-marketplace/cricket-nfts/${router.query.player}`
                                        : "nft-marketplace"
                                    }
                                  />
                                  {/* {loadingMore && <NFTCardLoader />} */}
                                  {/* {hasNext && (
                                    <div className="row mb-5">
                                      <div className="col-md-12 text-center">
                                        <button
                                          className={style["load_more"]}
                                          disabled={loadingMore}
                                          onClick={fetchMore}
                                        >
                                          {loadingMore
                                            ? "Loading..."
                                            : "Load More"}
                                        </button>
                                      </div>
                                    </div>
                                  )} */}
                                </>
                              );
                            } else {
                              return (
                                <>
                                  <NFTCards
                                    classNames={"large-card"}
                                    list={list}
                                    image={"/sample.gif"}
                                    isExplore
                                    relativeUrl={
                                      router.query.player
                                        ? `nft-marketplace/cricket-nfts/${router.query.player}`
                                        : "nft-marketplace"
                                    }
                                  />
                                  {/* {loadingMore && <NFTCardLoader />} */}
                                  {hasNext && (
                                    <div className="row mb-5">
                                      <div className="col-md-12 text-center">
                                        <button
                                          className={style["load_more"]}
                                          disabled={loadingMore}
                                          onClick={fetchMore}
                                        >
                                          {loadingMore
                                            ? "Loading..."
                                            : "Load More"}
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </>
                              );
                            }
                          })()}
                          {/* <div className={`text-center ${style["explore-note"]}`}>
                          MCL Player Rarity Score and Ranking updates at 12 AM
                          IST every day.
                        </div>{" "} */}
                        </div>
                        {loadingMore &&
                          (() => {
                            if (["card", "nftImage"].includes(listView)) {
                              return <NFTMiniCardLoader />;
                            } else if (
                              ["list", "mediumlist"].includes(listView)
                            ) {
                              return <NFTListLoader />;
                            } else if (["largeCard"].includes(listView)) {
                              return <NFTCardLoader />;
                            } else {
                              return <NFTCardLoader />;
                            }
                          })()}
                        {hasNext && (
                          <div className="row mb-5">
                            <div className="col-md-12 text-center">
                              <button
                                className={style["load_more"]}
                                disabled={loadingMore}
                                onClick={fetchMore}
                              >
                                {loadingMore ? "Loading..." : "Load More"}
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      // <NFTCardLoader />
                      (() => {
                        if (["card", "nftImage"].includes(listView)) {
                          return <NFTMiniCardLoader />;
                        } else if (["list", "mediumlist"].includes(listView)) {
                          return <NFTListLoader />;
                        } else if (["largeCard"].includes(listView)) {
                          return <NFTCardLoader />;
                        } else {
                          return <NFTCardLoader />;
                        }
                      })()
                    )}
                  </article>
                </section>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default ExploreAllNFT;
