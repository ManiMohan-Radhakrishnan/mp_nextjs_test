const listedNftRequest = (query, game_name) => {
  let page = 1;
  let filter = {};
  const info = {
    players: [
      {
        title: "SACHIN TENDULKAR NFTs",
        description:
          "Considered the greatest batsman to play cricket across both big formats all over the world, and by Indians as 'God of Cricket', Sachin Tendulkar NFTs are a pride to possess for any cricket fan anywhere in the world!",
        metaTitle: "Sachin NFTs | Sachin Tendulkar NFT Collection| Jump.Trade",
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
        metaTitle: "Don Bradman NFTs | Don Bradman NFT Collection | Jump.Trade",
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
        metaTitle: "Shane Warne NFTs | Shane Warne NFT Collection | Jump.Trade",
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
        metaTitle: "Clive Lloyd NFTs | Clive Lloyd NFT Collection | Jump.Trade",
        metaDescription:
          "Your only cricket NFT marketplace to buy Clive Lloyd NFTs. Discover many more authentic cricket NFTs of legendary cricket players here! Sign up now!",
        name: "Clive Lloyd",
        value: "clive-lloyd-nfts",
        checked: false,
      },
      {
        title: "MICHAEL BEVAN NFTs",
        description:
          "Perhaps the first player to ever earn the 'finisher' tag in ODI cricket, Micheal Bevan bailed out Australia from the most impossible situations. Buy your Micheal Bevan NFTs on Jump.trade.",
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
  };
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
  const asset_names = query["crypto-asset"]
    ? query["crypto-asset"].split(",")
    : [];
  const bat_types = query["bat-types"] ? query["bat-types"].split(",") : [];

  const has_coin = query.coin ? query.coin : "";
  const nft_level = query.level ? query.level.split(",") : [];

  const player = query.player;
  const playerObj = info.players.find((p) => p.value === player);

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
    nft_level.length === 0 &&
    bat_types.length === 0;

  let players = [];
  if (playerObj?.key) players = playerObj?.key ? [playerObj?.key] : [];
  else players = playerObj?.name ? [playerObj?.name] : [];

  if (noMatchFound && query.search) return false;

  filter = {
    type: nft_filters,
    sale_type: sale_filters,
    sort_filters,
    keyword: search_filters,
    nft_category,
    nft_collection,
    asset_names,
    sale_kind: status_filters,
    price_range,
    has_coin: has_coin,
    players,
    nft_level,
    bat_types,
    game_names: [game_name],
  };

  return {
    page,
    per_page: 21,
    filter,
    sort: sort_filters === "relevance" ? null : sort_filters,
  };
};

export const listedRaddxNftRequest = (query, game_name) => {
  let page = 1;
  let filter = {};
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
  let search_filter = query.search || "";

  let noMatchFound =
    nft_category.length === 0 &&
    car_category.length === 0 &&
    nft_collection.length === 0 &&
    car_model.length === 0 &&
    body_surface.length === 0 &&
    nft_level.length === 0 &&
    sale_kind.length === 0 &&
    sale_type.length === 0 &&
    price_range.from.length === 0 &&
    price_range.to.length === 0 &&
    !query.sort_filters &&
    search_filter.length === 0;

  if (noMatchFound && query.search) return false;

  filter = {
    nft_category,
    car_category,
    nft_collection,
    car_model,
    body_surface,
    nft_level,
    sale_kind,
    sale_type,
    price_range,
    keyword: search_filter,
    game_names: [game_name],
  };

  return {
    page,
    per_page: 21,
    filter,
    sort: sort_filters === "relevance" ? null : sort_filters,
  };
};
export const listedHurleyRequest = (query, game_name) => {
  let page = 1;
  let filter = {};
  let nft_category = query.nft_category ? query.nft_category.split(",") : [];
  let nft_collection = query.nft_collection
    ? query.nft_collection.split(",")
    : [];
  let gender = query.gender ? query.gender.split(",") : [];
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
  let search_filter = query.search || "";

  let noMatchFound =
    nft_category.length === 0 &&
    gender.length === 0 &&
    nft_collection.length === 0 &&
    nft_level.length === 0 &&
    sale_kind.length === 0 &&
    sale_type.length === 0 &&
    price_range.from.length === 0 &&
    price_range.to.length === 0 &&
    !query.sort_filters &&
    search_filter.length === 0;

  if (noMatchFound && query.search) return false;

  filter = {
    nft_category,
    gender,
    nft_collection,
    nft_level,
    sale_kind,
    sale_type,
    price_range,
    keyword: search_filter,
    game_names: [game_name],
  };

  return {
    page,
    per_page: 21,
    filter,
    sort: sort_filters === "relevance" ? null : sort_filters,
  };
};

export default listedNftRequest;
