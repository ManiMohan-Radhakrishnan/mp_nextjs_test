import React, { useEffect, useState, forwardRef } from "react";
import { Dropdown } from "react-bootstrap";
import { FaCheckCircle, FaFilter } from "react-icons/fa";
import { BiCaretDown, BiSearch, BiCheck } from "react-icons/bi";
import { FormControl } from "react-bootstrap";
import { useRouter } from "next/router";

import NFTCard from "../nft-card";
import ExploreTitle from "./explore-title";
import useDebounce from "../../hooks/useDebounce";
import images from "../../utils/images.json";
import style from "./style.module.scss";
import NFTCardLoader from "../loaders/nft-card-loader";
import { validateCurrency } from "../../utils/common";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { VscClose } from "react-icons/vsc";
import { nftCategoryListApi } from "../../utils/methods";

const Explore = ({ categoryDetail, slug, clientUrl = "", categoryList }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [list, setList] = useState(categoryList?.data?.nfts || []);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(
    categoryList?.data?.next_page || false
  );
  const [loadingMore, setLoadingMore] = useState(false);
  const [toggle, setToggle] = useState(false);

  const [popDetails, setPopDetails] = useState({
    show: false,
    children: null,
  });

  const query = router.query;

  const [search, setSearch] = useState(query.search ? query.search : "");

  const [priceRangeFilter, setPriceRangeFilter] = useState({
    from: "",
    to: "",
  });

  const [filter, setFilter] = useState(() => {
    let nftCategory = [
      {
        name: "Batsman",
        value: "Batsman",
        checked: false,
      },
      {
        name: "Bowler",
        value: "Bowler",
        checked: false,
      },
      {
        name: "Bat",
        value: "Bat",
        checked: false,
      },
    ];

    if (query.category === "cricket-player-nfts")
      nftCategory = [
        {
          name: "Batsman",
          value: "Batsman",
          checked: false,
        },
        {
          name: "Bowler",
          value: "Bowler",
          checked: false,
        },
      ];

    if (query.category === "cricket-bat-nfts")
      nftCategory = [
        {
          name: "Bat",
          value: "Bat",
          checked: false,
        },
      ];
    if (query.category === "cricket-shot-nfts")
      nftCategory = [
        {
          name: "Shot",
          value: "Shot",
          checked: false,
        },
      ];

    return {
      sale: [
        {
          name: "Bid",
          value: "bid",
          checked: false,
        },
        {
          name: "Buy",
          value: "buy",
          checked: false,
        },
      ],
      status: [
        {
          name: "Timed Auction",
          value: "timed_auction",
          checked: false,
        },
        {
          name: "Listed for sale",
          value: "onsale",
          checked: false,
        },
        {
          name: "Not on sale",
          value: "not_on_sale",
          checked: false,
        },
      ],
      nft: [
        {
          name: "Single",
          value: "erc721",
          checked: false,
        },
        {
          name: "Multiple",
          value: "erc1155",
          checked: false,
        },
      ],
      price: [
        {
          name: "Min",
          value: "",
          checked: false,
        },
        {
          name: "Max",
          value: "",
          checked: false,
        },
      ],
      sort: [
        {
          name: "Recently Listed",
          value: "recently_listed",
          checked: true,
        },
        {
          name: "Price - High to Low",
          value: "price_desc",
          checked: false,
        },
        {
          name: "Price - Low to High",
          value: "price",
          checked: false,
        },
        {
          name: "Auction Ending Soon",
          value: "auction_ending_soon",
          checked: false,
        },
        {
          name: "Auction Starting Soon",
          value: "auction_starting_soon",
          checked: false,
        },
        {
          name: "Relevance",
          value: "relevance",
          checked: false,
        },
      ],
      nftCategory,
      nftCollection: [
        {
          name: "Rare",
          value: "RARE",
          checked: false,
        },
        {
          name: "Rookie",
          value: "ROOKIE",
          checked: false,
        },
        {
          name: "Epic",
          value: "EPIC",
          checked: false,
        },
        {
          name: "Legend",
          value: "LEGEND",
          checked: false,
        },
        {
          name: "Super Rare",
          value: "SUPER RARE",
          checked: false,
        },
        {
          name: "Ultra Rare",
          value: "ULTRA RARE",
          checked: false,
        },
        {
          name: "Immortal",
          value: "IMMORTAL",
          checked: false,
        },
      ],

      glCoin: [
        {
          name: "With GL Coins",
          value: "has_coin",
          checked: false,
        },
      ],
      players: [
        {
          title: "SACHIN TENDULKAR NFTs",
          description:
            "Considered the greatest batsman to play cricket across both big formats all over the world, and by Indians as 'God of Cricket', Sachin Tendulkar NFTs are a pride to possess for any cricket fan anywhere in the world!",
          metaTitle:
            "Sachin NFTs | Sachin Tendulkar NFT Collection| Jump.Trade",
          metaDescription:
            "Get your hands on the exclusive Sachin Tendulkar NFTs from jump.trade. Discover the signed digital bat NFTs of the Master Blaster himself here. Sign up now!",
          name: "Sachin Tendulkar",
          value: "sachin-tendulkar-nfts",
          checked: false,
        },
        {
          title: "DON BRADMAN NFTs",
          description:
            "Widely regarded as the greatest human ever to play Cricket, the Don averaged 99.94 in tests, the highest-ever by a distance. Buy your Sir Don Bradman NFTs and up your collection-game in cricket.",
          metaTitle:
            "Don Bradman NFTs | Don Bradman NFT Collection | Jump.Trade",
          metaDescription:
            "Be a part of the legacy of cricket by owning Don Bradman NFTs from Jump.trade. Access these super-exclusive cricket NFTs of legendary players here. Sign up now!",
          name: "Don Bradman",
          value: "don-bradman-nfts",
          checked: false,
        },
        {
          title: "RAHUL DRAVID NFTs",
          description:
            "Popularly and fittingly known as 'The Wall', Rahul Dravid's defensive play in the longer format would frustrate even the most efficient bowlers. Buy your Rahul Dravid NFTs on Jump.trade.",
          metaTitle:
            "Rahul Dravid NFTs | Rahul Dravid NFT Collection | Jump.Trade",
          metaDescription:
            "Own a Rahul Dravid NFT and add a solid collection of cricket NFTs to your wallet. Find more cricket NFTs, cricket player NFTs, and signed digital bats here!",
          name: "Rahul Dravid",
          value: "rahul-dravid-nfts",
          checked: false,
        },
        {
          title: "RICKY PONTING NFTs",
          description:
            "The most successful captain in history led the Australian team in an era of unsurpassed glory. Buy your Ricky Ponting NFTs to experience the essence of this awesome captain, wristy batsman, and fielder.",
          metaTitle:
            "Ricky Ponting NFTs | Ricky Ponting NFT Collection | Jump.Trade",
          metaDescription:
            "Buy the authenticated Ricky Ponting NFTs here. Explore the digital signed bat NFTs of several legendary cricket players here. Sign up with Jump.trade now!",
          name: "Ricky Ponting",
          value: "ricky-ponting-nfts",
          checked: false,
        },
        {
          title: "SHANE WARNE NFTs",
          description:
            "The undoubted king of leg spin has more than 700 test wickets to his credit, and he captained Rajasthan team to their first victory. Spin your way into cricket NFTs by buying your Shane Warne NFTs.",
          metaTitle:
            "Shane Warne NFTs | Shane Warne NFT Collection | Jump.Trade",
          metaDescription:
            "Own a Shane Warne NFT and cherish it forever.  Collect this signed digital bat and have an upperhand in the cricket metaverse. Explore more such authentic cricket player signed bat NFTs here!",
          name: "Shane Warne",
          value: "shane-warne-nfts",
          checked: false,
        },
        {
          title: "VIV RICHARDS NFTs",
          description:
            "This West Indian, considered one of the greatest batsmen of all time, redefined attacking batting with his power-hitting capabilities. Buy your Vivian Richards NFTs and strike big with your collectibles!",
          metaTitle:
            "Viv Richards NFTs | Viv Richards NFT Collection | Jump.Trade",
          metaDescription:
            "Hold a piece of the history of cricket by owning a Viv Richards NFTs from Jump.trade. Access these legendary signed digital bat NFTs here. Sign up now!",
          name: "Viv Richards",
          value: "viv-richards-nfts",
          checked: false,
        },
        {
          title: "SHANE WATSON NFTs",
          description:
            "An embodiment of versatility and dedication, Shane Watson is one of the few cricketers to open both batting and bowling for Australia & Chennai. Get your hands on these coveted Shane Watson NFTs.",
          metaTitle:
            "Shane Watson NFTs | Shane Watson NFT Collection | Jump.Trade",
          metaDescription:
            "Your only destination to buy Shane Watson NFTs. Access these authenticated cricket NFTs on Jump.trade to be a powerful hitter in the cricket metaverse. Sign up now!",
          name: "Shane Watson",
          value: "shane-watson-nfts",
          checked: false,
        },
        {
          title: "HARBHAJAN SINGH NFTs",
          description:
            "Popularly known as The Turbanator, this Doosra-specialist off-spinner is the first ever Indian to take a hat-trick and has broken partnerships in tests. Buy your Harbhajan Singh NFTs now!",
          metaTitle:
            "Harbhajan Singh NFTs | Harbhajan Singh NFT Collection | Jump.Trade",
          metaDescription:
            "Own a Harbhajan Singh NFT and make a leg-breaker move in your NFT collecting experience. Access these super rare cricket NFTs only on Jump.trade. Sign up now!",
          name: "Harbhajan Singh",
          value: "harbhajan-singh-nfts",
          checked: false,
        },
        {
          title: "MATTHEW HAYDEN NFTs",
          description:
            "Matthew Hayden redefined blitzkrieg opening in all forms of the game and his contribution to the Chennai team are also remarkable. Get your hands on these prized Matthew Hayden NFTs.",
          metaTitle:
            "Matthew Hayden NFTs | Matthew Hayden NFT Collection | Jump.Trade",
          metaDescription:
            "Take pride in owning the incredible Matthew Hayden NFTs from Jump.trade. Explore this space to find authentic signed digital bats of legendary cricket players. Sign up now!",
          name: "Matthew Hayden",
          value: "matthew-hayden-nfts",
          checked: false,
        },
        {
          title: "ANDREW SYMONDS NFTs",
          description:
            "Popularly known as Roy, this prolific all-rounder who passed away recently created an unparalleled legacy in cricket with his aggressive performance. Buy your Andrew Symonds NFTs.",
          metaTitle:
            "Andrew Symonds NFTs | Andrew Symonds NFT Collection | Jump.Trade",
          metaDescription:
            "Get your hands on the supreme Andrew Symonds NFTs from Jump.trade. Explore authentic signed cricket bat NFTs and cricket player NFTs here. Sign up now!",
          name: "Andrew Symonds",
          value: "andrew-symonds-nfts",
          checked: false,
        },
        {
          title: "ADAM GILCHRIST NFTs",
          description:
            "Adam Gilchrist has the distinction of having won all the World Cups he played. One of the best ever wicket keeping batsmen, he sparked many Aussie innings. Buy your Adam Gilchrist NFTs right now!",
          metaTitle:
            "Adam Gilchrist NFTs | Adam Gilchrist NFT Collection | Jump.Trade",
          metaDescription:
            "Be a keeper of your NFTs by owning the most-privileged Adam Gilchrist NFTs. Find some amazing digital bats signed by legendary players here. Sign up now!",
          name: "Adam Gilchrist",
          value: "adam-gilchrist-nfts",
          checked: false,
        },
        {
          title: "GLENN MCGRATH NFTs",
          description:
            "Glenn McGrath, the spearhead of Aussie bowling was known for his perfection in line and length, and could stun any batsman with his deliveries. Buy your Glenn McGrath NFTs now!",
          metaTitle:
            "Glenn Mcgrath NFTs | Glenn Mcgrath NFT Collection | Jump.Trade",
          metaDescription:
            "Own a piece of the legacy of cricket by getting your hands on Glenn Mcgrath NFTs from Jump.trade. Access these super-exclusive cricket NFTs here. Sign up now!",
          name: "Glenn McGrath",
          value: "glenn-mcgrath-nfts",
          checked: false,
        },
        {
          title: "DARREN LEHMANN NFTs",
          description:
            "This Australian all-rounder was a dependable lower middle order striker who saved the Aussie team from some of the most critical situations. Don't miss out on Darren Lehmann NFTs.",
          metaTitle:
            "Darren Lehmann NFTs | Darren Lehmann NFT Collection | Jump.Trade",
          metaDescription:
            "Own your first Darren Lehmann NFTs from Jump.trade NFT marketplace. Explore cricket player NFTs and authentic signed digital bat NFTs  here! Sign up now!",
          name: "Darren Lehmann",
          value: "darren-lehmann-nfts",
          checked: false,
        },
        {
          title: "CLIVE LLOYD NFTs",
          description:
            "The person to hold the title of being the first-ever successful captain in limited overs led the mighty West Indies team to the first two World Cup. Get your hands on Clive Lloyd NFTs.",
          metaTitle:
            "Clive Lloyd NFTs | Clive Lloyd NFT Collection | Jump.Trade",
          metaDescription:
            "Your only cricket NFT marketplace to buy Clive Lloyd NFTs. Discover many more authentic cricket NFTs of legendary cricket players here! Sign up now!",
          name: "Clive Lloyd",
          value: "clive-lloyd-nfts",
          checked: false,
        },
        {
          title: "MICHAEL BEVAN NFTs",
          description: `Perhaps the first player to ever earn the 'finisher' tag in ODI cricket, Micheal Bevan bailed out Australia from the most impossible situations. Buy your Micheal Bevan NFTs on Jump.trade.`,
          metaTitle:
            "Michael Bevan NFTs | Michael Bevan NFT Collection | Jump.Trade",
          metaDescription:
            "Owning Michael Bevan NFTs is a legacy to hold onto and be proud about. Explore authentic cricket player NFTs and digital signed bat NFTs on jump.trade. Sign up now!",
          name: "Michael Bevan",
          value: "michael-bevan-nfts",
          checked: false,
        },
        {
          title: "DAMIEN MARTYN NFTs",
          description:
            "An example of perseverance, Damien's elegant stroke production made him one of the most dependable Aussie batsmen on subcontinent pitches. Buy your Damien Martyn NFTs.",
          metaTitle:
            "Damien Martyn NFTs | Damien Martyn NFT Collection | Jump.Trade",
          metaDescription:
            "Own your first Damien Martyn NFTs on jump.trade NFT marketplace. Explore authentic signed cricket bat NFTs of legendary cricket players here. Sign up now!",
          name: "Damien Martyn",
          value: "damien-martyn-nfts",
          checked: false,
        },
        {
          title: "2011 CHAMPIONS NFTs",
          description:
            "2011 marked India lifting the World Cup after 28 years with Dhoni's iconic sixer - one of the most momentous events! Don't miss out on owning a piece of this legacy with the 2011 World Cup NFTs.",
          metaTitle:
            "2011 Cricket World Cup NFT | World Cup Champions NFT | Jump.Trade",
          metaDescription:
            "Start your NFT collecting experience by owning one of the biggest moments in the history of Indian cricket. Lift this digital signed bat by the winners of 2011 world cup in style by signing up now!",
          name: "2011 CHAMPIONS",
          value: "2011-champions-nfts",
          checked: false,
        },
        {
          title: "2003 CHAMPIONS & FINALISTS NFTs",
          description:
            "The 2003 World Cup finals is considered to be one of the biggest clashes in the history of the game with India facing Australia. Become a proud owner of the 2003 World Cup cricket NFTs.",
          metaTitle:
            "2003 Cricket World Cup NFT | Cricket World Cup Winner NFT| Jump.Trade",
          metaDescription:
            "Get your hands on the signed digital bats of the 2003 cricket worldcup finalists. Access this 2003 World cup champion NFT only on Jump.trade. Sign up now!",
          name: "2003 CHAMPIONS & FINALISTS",
          key: "2003 CHAMPIONS",
          value: "2003-champions-nfts",
          checked: false,
        },
        {
          title: "1983 CHAMPIONS NFTs",
          description:
            "The 1983 Indian cricket team emerged from being the least expected to become the toppers of the league. You can now buy NFTs of this awesome cricket team on Jump.trade.",
          metaTitle:
            "1983 Cricket World Cup NFT |  World Cup Winner NFT | Jump.Trade",
          metaDescription:
            "Own the 1983 World Cup Champion NFTs and take pride in holding a piece of the legacy of this historical moment. Access many more exclusive cricket NFTs here. Sign up now!",
          name: "1983 CHAMPIONS",
          value: "1983-champions-nfts",
          checked: false,
        },
      ],

      showSale: true,
      showStatus: true,
      auction: true,
      showNFT: true,
      showNFTCategory: true,
      showNFTCollection: true,
      showNFTRange: true,
      showGlC: true,
      showPlayers: true,
    };
  });

  const handleCallback = () => {
    if (search || query.search) handleFilterCheck("", "text_search");
  };

  useDebounce(handleCallback, 500, search);

  useEffect(() => {
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

    const search_filter = query.search ? query.search : "";
    const has_coin = query.coin ? query.coin : "";
    const signed_by = query["signed-by"]
      ? decodeURIComponent(query["signed-by"])
      : "";

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
    info.players = filter.players.map((p) => {
      let checked = false;
      checked = p?.key ? p?.key === signed_by : p?.name === signed_by;
      return {
        ...p,
        checked,
      };
    });

    setFilter(info);
    setPage(1);
    setPriceRangeFilter(price_range);

    setSearch(search_filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    setList(categoryList?.data?.nfts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const showAllNFTs = async (
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
    playerName
  ) => {
    try {
      page === 1 && setLoading(true);
      setLoadingMore(true);
      let response = {};
      if (slug) {
        response = await nftCategoryListApi({
          slug,
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
            players: playerName ? [`${playerName}`] : [],
          },
          sort: sort === "relevance" ? null : sort,
        });
      }
      setList([...list, ...response?.data?.data?.nfts]);
      setHasNext(response?.data?.data?.next_page);
      page === 1 && setLoading(false);
      setLoadingMore(false);
    } catch (err) {
      console.log(err);
    }
  };

  const clearFilter = () => {
    router.push(`/nft-marketplace/${query.category}/${slug}`);
    setPriceRangeFilter({
      from: "",
      to: "",
    });
  };

  const fetchMore = () => {
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
      const status_filters = query.status ? query.status : "";
      const has_coin = query.coin ? query.coin : "";
      const signed_by = query["signed-by"]
        ? decodeURIComponent(query["signed-by"])
        : "";
      // let player_name = "";
      // filter.players.map((p) => {
      //   player_name = p.checked && !player_name ? p.name : player_name;
      // });

      showAllNFTs(
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
        signed_by
      );
      setPage(page + 1);
    }
  };

  const handleKeyPressEvent = (event) => {
    if (event.key === "Enter") {
      handleFilterCheck("", "text_search");
    }
  };

  function handleFilterCheck(input, type, remove = false) {
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

    let sale_status = query.status;
    let has_coin = query.coin;
    let has_coin_temp = query.coin;
    let player_list = filter.players;
    let player_name = query["signed-by"]
      ? decodeURIComponent(query["signed-by"])
      : "";

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
      case "price_range":
        setPriceRangeFilter({ ...input });
        price_range = remove ? { from: null, to: null } : input;
        if (remove) {
          setPriceRangeFilter(price_range);
        }
        //setPriceFilter(true);
        setToggle(!toggle);
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
          if (player_list[p].name === input.name) {
            player_name = !player_list[p].checked
              ? player_list[p]?.key
                ? player_list[p]?.key
                : player_list[p]?.name
              : "";
            break;
          }
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

    if (player_name) {
      query_string += query_string
        ? `&signed-by=${encodeURIComponent(player_name)}`
        : `signed-by=${encodeURIComponent(player_name)}`;
    }

    router.push(
      `/nft-marketplace/${query.category}/${slug}${
        query_string ? "?" + query_string : ""
      }`
    );
  }

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

  const PriceMenu = forwardRef(
    (
      { children, style: styles, className, "aria-labelledby": labeledBy },
      ref
    ) => {
      const [priceRange, setPriceRange] = useState({
        from: query.minPrice ? query.minPrice : "",
        to: query.maxPrice ? query.maxPrice : "",
      });

      return (
        <div
          ref={ref}
          style={styles}
          className={className}
          aria-labelledby={labeledBy}
        >
          {priceRangeFilter.from ? (
            <PriceDropdown />
          ) : (
            <div className={style["d-flex1"]}>
              <span className={`${style["category-search-block"]} me-1`}>
                <FormControl
                  className={style["category-search"]}
                  placeholder="Min"
                  type="number"
                  onChange={(e) => {
                    if (e.target.value && e.target.value.length <= 9) {
                      if (validateCurrency(e.target.value)) {
                        setPriceRange({ ...priceRange, from: e.target.value });
                      }
                    } else {
                      setPriceRange({ ...priceRange, from: "" });
                    }
                  }}
                  value={priceRange.from}
                />
              </span>
              <span className={style["category-search-block"]}>
                <FormControl
                  className={style["category-search"]}
                  placeholder="Max"
                  type="number"
                  onChange={(e) => {
                    if (e.target.value && e.target.value.length <= 9) {
                      if (validateCurrency(e.target.value)) {
                        setPriceRange({ ...priceRange, to: e.target.value });
                      }
                    } else {
                      setPriceRange({ ...priceRange, to: "" });
                    }
                  }}
                  value={priceRange.to}
                />
              </span>
            </div>
          )}

          <div className={style["prifilter-btn"]}>
            <button
              style={
                priceRange.from
                  ? { backgroundColor: "white" }
                  : { backgroundColor: "#989e99", pointerEvents: "none" }
              }
              type="button"
              className={style["border-dropdown-item-clr"]}
              onClick={(e) =>
                handleFilterCheck(priceRange, "price_range", true)
              }
              // disabled={(() => {
              //   if (parseInt(priceRange.from) == "") {
              //     return true;
              //   } else {
              //     return false;
              //   }
              // })()}
            >
              Clear
            </button>
            <button
              type="button"
              className={style["border-dropdown-item"]}
              disabled={(() => {
                if (
                  parseInt(priceRange.from) < 0 ||
                  parseInt(priceRange.to) < 0
                ) {
                  return true;
                } else if (
                  parseInt(priceRange.from) > parseInt(priceRange.to)
                ) {
                  return true;
                } else if (
                  priceRange.from === "" ||
                  priceRange.from === null ||
                  query.get("minPrice")
                ) {
                  return true;
                } else {
                  return false;
                }
              })()}
              onClick={(e) => handleFilterCheck(priceRange, "price_range")}
            >
              Apply
            </button>
            {React.Children.toArray(children).filter((child) => child)}
          </div>
        </div>
      );
    }
  );

  PriceMenu.displayName = "PriceMenu";

  return (
    <>
      <section className={style["explore-nft-section"]}>
        <article className={style["explorer-detail"]}>
          <div className="container-fluid">
            <div className={`row ${style["explore-title"]}`}>
              {!popDetails.show && (
                <ExploreTitle
                  title={categoryDetail.name}
                  description={categoryDetail.description}
                />
              )}
            </div>
          </div>
        </article>
        <article className={style["explorer-nft-list"]}>
          <div className={`${style["sticky-sm-top"]} top-25`}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <div
                    className={`${style["sec-heading"]} d-flex align-items-center mb-2 ${style["explore-heading"]}`}
                  >
                    <span
                      className={`me-4 mt-2 text-nowrap ${style["sec-title"]}`}
                    >
                      LISTED NFTs
                      <span
                        onClick={() => setToggle(!toggle)}
                        className={style["filter-open-btn"]}
                      >
                        <FaFilter /> <span className="ms-2">Filters</span>
                      </span>
                    </span>
                    <span
                      className={`d-flex justify-content-between mt-2 w-100 ${style["filter-blocks"]}`}
                    >
                      <div
                        className={`d-flex flex-wrap ${style["filter-box"]}`}
                      ></div>
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
                                onClick={() =>
                                  handleFilterCheck(obj, "sort_NFT")
                                }
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
                    <div className={style["filt-flex-search"]}>
                      <input
                        type="text"
                        className={style["search-box-add"]}
                        value={search}
                        onKeyPress={handleKeyPressEvent}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search here"
                      />{" "}
                      <span
                        role="button"
                        className={style["search-button"]}
                        onClick={(e) => handleFilterCheck("", "text_search")}
                      >
                        <BiSearch size={15} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <section className={style["explorer-nft-group"]}>
                  <aside
                    className={`${style["filter-block"]} ${
                      toggle && "open-aside"
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
                            Object.keys(query).length === 2
                              ? `${style["disabled"]}`
                              : ""
                          }`}
                          onClick={() => clearFilter()}
                        >
                          Clear all
                        </span>
                      </div>
                      {query.category === "cricket-bat-nfts" && (
                        <div className={style["filter-list-items"]}>
                          <h4
                            className={style["header"]}
                            role={"button"}
                            onClick={() =>
                              setFilter({
                                ...filter,
                                showPlayers: !filter.showPlayers,
                              })
                            }
                          >
                            Signed By{" "}
                            {filter.showPlayers ? (
                              <IoIosArrowUp />
                            ) : (
                              <IoIosArrowDown />
                            )}
                          </h4>
                          {filter.showPlayers && (
                            <ul className={style["scrollable-list"]}>
                              {filter.players.map((obj, i) => (
                                // <Link
                                //   to={`/nft-marketplace/cricket-nfts/${obj.value}`}
                                //   as={
                                <li key={`has-glc-${i}`}>
                                  <label
                                    htmlFor={`${obj.name}`}
                                    className={style["checkbox"]}
                                  >
                                    <input
                                      id={`${obj.name}`}
                                      name="checkbox-group"
                                      type="checkbox"
                                      checked={obj.checked}
                                      onClick={() => {
                                        // history.push(
                                        //   `/nft-marketplace/cricket-nfts/${obj.value}`
                                        // )
                                        handleFilterCheck(obj, "players");
                                      }}
                                    />
                                    <span className={style["checkbox__mark"]}>
                                      <BiCheck />
                                    </span>

                                    <span className={style["checkbox__info"]}>
                                      <span className="title">{obj.name}</span>
                                    </span>
                                  </label>
                                </li>
                                //   }
                                // />
                              ))}
                            </ul>
                          )}
                        </div>
                      )}

                      <div className={style["filter-list-items"]}>
                        <h4
                          className={style["header"]}
                          role={"button"}
                          onClick={() =>
                            setFilter({
                              ...filter,
                              showNFTCategory: !filter.showNFTCategory,
                            })
                          }
                        >
                          Role{" "}
                          {filter.showNFTCategory ? (
                            <IoIosArrowUp />
                          ) : (
                            <IoIosArrowDown />
                          )}
                        </h4>
                        {filter.showNFTCategory && (
                          <ul>
                            {filter.nftCategory.map((obj, i) => (
                              <li key={`nft-category-${i}`}>
                                <label
                                  htmlFor={`${obj.name}`}
                                  className={style["checkbox"]}
                                >
                                  <input
                                    id={`${obj.name}`}
                                    name="checkbox-group"
                                    type="checkbox"
                                    checked={obj.checked}
                                    onChange={() =>
                                      handleFilterCheck(
                                        obj,
                                        "NFT_category_check"
                                      )
                                    }
                                  />
                                  <span className={style["checkbox__mark"]}>
                                    <BiCheck />
                                  </span>

                                  <span className={style["checkbox__info"]}>
                                    <span className="title">{obj.name}</span>
                                  </span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className={style["filter-list-items"]}>
                        <h4
                          className={style["header"]}
                          role={"button"}
                          onClick={() =>
                            setFilter({
                              ...filter,
                              showNFTCollection: !filter.showNFTCollection,
                            })
                          }
                        >
                          Category{" "}
                          {filter.showNFTCollection ? (
                            <IoIosArrowUp />
                          ) : (
                            <IoIosArrowDown />
                          )}
                        </h4>
                        {filter.showNFTCollection && (
                          <ul>
                            {filter.nftCollection.map((obj, i) => (
                              <li key={`collection-${i}`}>
                                <label
                                  htmlFor={`${obj.name}`}
                                  className={style["checkbox"]}
                                >
                                  <input
                                    id={`${obj.name}`}
                                    name="checkbox-group"
                                    type="checkbox"
                                    checked={obj.checked}
                                    onChange={() =>
                                      handleFilterCheck(
                                        obj,
                                        "NFT_collection_check"
                                      )
                                    }
                                  />
                                  <span className={style["checkbox__mark"]}>
                                    <BiCheck />
                                  </span>

                                  <span className={style["checkbox__info"]}>
                                    <span className="title">{obj.name}</span>
                                  </span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className={style["filter-list-items"]}>
                        <h4
                          className={style["header"]}
                          role={"button"}
                          onClick={() =>
                            setFilter({
                              ...filter,
                              showSale: !filter.showSale,
                            })
                          }
                        >
                          Sale Type{" "}
                          {filter.showSale ? (
                            <IoIosArrowUp />
                          ) : (
                            <IoIosArrowDown />
                          )}
                        </h4>
                        {filter.showSale && (
                          <ul>
                            {filter.sale.map((obj, i) => (
                              <li key={`sale-type-${i}`}>
                                <label
                                  htmlFor={`${obj.name}`}
                                  className={style["checkbox"]}
                                >
                                  <input
                                    id={`${obj.name}`}
                                    name="checkbox-group"
                                    type="checkbox"
                                    checked={obj.checked}
                                    onChange={() =>
                                      handleFilterCheck(obj, "sale_check")
                                    }
                                  />
                                  <span className={style["checkbox__mark"]}>
                                    <BiCheck />
                                  </span>

                                  <span className={style["checkbox__info"]}>
                                    <span className="title">{obj.name}</span>
                                  </span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className={style["filter-list-items"]}>
                        <h4
                          className={style["header"]}
                          role={"button"}
                          onClick={() =>
                            setFilter({
                              ...filter,
                              showStatus: !filter.showStatus,
                            })
                          }
                        >
                          Sale Status{" "}
                          {filter.showStatus ? (
                            <IoIosArrowUp />
                          ) : (
                            <IoIosArrowDown />
                          )}
                        </h4>
                        {filter.showStatus && (
                          <ul>
                            {filter.status.map((obj, i) => (
                              <li key={`sale-type-${i}`}>
                                <label
                                  htmlFor={`${obj.name}`}
                                  className={style["checkbox"]}
                                >
                                  <input
                                    id={`${obj.name}`}
                                    name="checkbox-group"
                                    type="checkbox"
                                    checked={obj.checked}
                                    onChange={() =>
                                      handleFilterCheck(obj, "sale_status_NFT")
                                    }
                                  />
                                  <span className={style["checkbox__mark"]}>
                                    <BiCheck />
                                  </span>

                                  <span className={style["checkbox__info"]}>
                                    <span className="title">{obj.name}</span>
                                  </span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className={style["filter-list-items"]}>
                        <h4
                          className={style["header"]}
                          role={"button"}
                          onClick={() =>
                            setFilter({
                              ...filter,
                              auction: !filter.auction,
                            })
                          }
                        >
                          Auction{" "}
                          {filter.auction ? (
                            <IoIosArrowUp />
                          ) : (
                            <IoIosArrowDown />
                          )}
                        </h4>
                        {filter.auction && (
                          <ul>
                            {filter.sort
                              .filter((o) =>
                                [
                                  "auction_ending_soon",
                                  "auction_starting_soon",
                                ].includes(o.value)
                              )
                              .map((obj, i) => (
                                <li key={`sale-type-${i}`}>
                                  <label
                                    htmlFor={`${obj.name}`}
                                    className={style["checkbox"]}
                                  >
                                    <input
                                      id={`${obj.name}`}
                                      name="checkbox-group"
                                      type="checkbox"
                                      checked={obj.checked}
                                      onChange={() =>
                                        handleFilterCheck(obj, "sort_NFT")
                                      }
                                    />
                                    <span className={style["checkbox__mark"]}>
                                      <BiCheck />
                                    </span>

                                    <span className={style["checkbox__info"]}>
                                      <span className="title">{obj.name}</span>
                                    </span>
                                  </label>
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                      <div className={style["filter-list-items"]}>
                        <h4
                          className={style["header"]}
                          role={"button"}
                          onClick={() =>
                            setFilter({
                              ...filter,
                              price: !filter.price,
                            })
                          }
                        >
                          Price{" "}
                          {filter.price ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </h4>

                        {filter.price && (
                          <ul>
                            <PriceMenu />
                          </ul>
                        )}
                      </div>

                      <div className={style["filter-list-items"]}>
                        <h4
                          className={style["header"]}
                          role={"button"}
                          onClick={() =>
                            setFilter({
                              ...filter,
                              showGlC: !filter.showGlC,
                            })
                          }
                        >
                          GL Coin Rewards{" "}
                          {filter.showGlC ? (
                            <IoIosArrowUp />
                          ) : (
                            <IoIosArrowDown />
                          )}
                        </h4>
                        {filter.showGlC && (
                          <ul>
                            {filter.glCoin.map((obj, i) => (
                              <li key={`has-glc-${i}`}>
                                <label
                                  htmlFor={`${obj.name}`}
                                  className={style["checkbox"]}
                                >
                                  <input
                                    id={`${obj.name}`}
                                    name="checkbox-group"
                                    type="checkbox"
                                    checked={obj.checked}
                                    onChange={() =>
                                      handleFilterCheck(obj, "has_GLC")
                                    }
                                  />
                                  <span className={style["checkbox__mark"]}>
                                    <BiCheck />
                                  </span>

                                  <span className={style["checkbox__info"]}>
                                    <span className="title">{obj.name}</span>
                                  </span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </aside>

                  <article className={style["nft-list"]}>
                    <div className="row">
                      {list && list.length > 0 ? (
                        list.map((nft, i) => (
                          <div
                            key={`list-nft-${i}`}
                            className="col-xl-4 col-lg-6 col-sm-6"
                          >
                            <NFTCard
                              nft={nft}
                              key={i}
                              image={"/sample.gif"}
                              isExplore
                              relativeUrl={`nft-marketplace/${query.category}/${query.cSlug}`}
                              exploreSlug={slug}
                              clientUrl={clientUrl}
                            />
                          </div>
                        ))
                      ) : (
                        <div className="col-12 text-center mb-5">
                          <h3 className="my-3 py-5">No Records Found!</h3>
                        </div>
                      )}

                      {loadingMore && <NFTCardLoader />}

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
                    </div>
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

export default Explore;
