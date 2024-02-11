export const FILTERS = {
  mcl: {
    sale: [
      {
        name: "Bid",
        value: "bid",
        checked: false,
        filterKey: "sale_check",
      },
      {
        name: "Buy",
        value: "buy",
        checked: false,
        filterKey: "sale_check",
      },
    ],
    status: [
      {
        name: "Timed Auction",
        value: "timed_auction",
        checked: false,
        filterKey: "sale_status_NFT",
      },
      {
        name: "Listed for sale",
        value: "onsale",
        checked: false,
        filterKey: "sale_status_NFT",
      },
      {
        name: "Not on sale",
        value: "not_on_sale",
        checked: false,
        filterKey: "sale_status_NFT",
      },
    ],
    nft: [
      {
        name: "Single",
        value: "erc721",
        checked: false,
        filterKey: "NFT_check",
      },
      {
        name: "Multiple",
        value: "erc1155",
        checked: false,
        filterKey: "NFT_check",
      },
    ],
    price: [
      {
        name: "Min",
        value: "",
        checked: false,
        filterKey: "price_range",
      },
      {
        name: "Max",
        value: "",
        checked: false,
        filterKey: "price_range",
      },
    ],
    sort: [
      {
        name: "Recently Listed",
        value: "recently_listed",
        checked: true,
        filterKey: "sort_NFT",
      },
      {
        name: "Price - High to Low",
        value: "price_desc",
        checked: false,
        filterKey: "sort_NFT",
      },
      {
        name: "Price - Low to High",
        value: "price",
        checked: false,
        filterKey: "sort_NFT",
      },
      {
        name: "Auction Ending Soon",
        value: "auction_ending_soon",
        checked: false,
        filterKey: "sort_NFT",
      },
      {
        name: "Auction Starting Soon",
        value: "auction_starting_soon",
        checked: false,
        filterKey: "sort_NFT",
      },
      {
        name: "Relevance",
        value: "relevance",
        checked: false,
        filterKey: "sort_NFT",
      },
    ],

    nftCategory: [
      {
        name: "Batsman",
        value: "Batsman",
        checked: false,
        filterKey: "NFT_category_check",
      },
      {
        name: "Bowler",
        value: "Bowler",
        checked: false,
        filterKey: "NFT_category_check",
      },
      {
        name: "Bat",
        value: "Bat",
        checked: false,
        filterKey: "NFT_category_check",
      },
      {
        name: "Shot",
        value: "Shot",
        checked: false,
        filterKey: "NFT_category_check",
      },
      {
        name: "Fusor",
        value: "Fusor",
        checked: false,
        filterKey: "NFT_category_check",
      },
      {
        name: "Fielder",
        value: "Fielder",
        checked: false,
        filterKey: "NFT_category_check",
      },
      {
        name: "Ball",
        value: "Ball",
        checked: false,
        filterKey: "NFT_category_check",
      },
    ],

    nftCollection: [
      {
        name: "Rookie",
        value: "ROOKIE",
        checked: false,
        filterKey: "NFT_collection_check",
      },
      {
        name: "Rare",
        value: "RARE",
        checked: false,
        filterKey: "NFT_collection_check",
      },
      {
        name: "Epic",
        value: "EPIC",
        checked: false,
        filterKey: "NFT_collection_check",
      },
      {
        name: "Legend",
        value: "LEGEND",
        checked: false,
        filterKey: "NFT_collection_check",
      },
      {
        name: "Ultra Legend",
        value: "ULTRA LEGEND",
        checked: false,
        filterKey: "NFT_collection_check",
      },
      {
        name: "Immortal",
        value: "IMMORTAL",
        checked: false,
        filterKey: "NFT_collection_check",
      },
    ],

    cryptoAssets: [
      {
        name: "BTC",
        value: "wBTC",
        checked: false,
        filterKey: "Crypto_asset_check",
      },
      {
        name: "MATIC",
        value: "wMATIC",
        checked: false,
        filterKey: "Crypto_asset_check",
      },
      {
        name: "ETH",
        value: "wETH",
        checked: false,
        filterKey: "Crypto_asset_check",
      },
    ],

    batTypes: [
      {
        name: "Dual Signed Immortal",
        value: "DualSignedImmortal",
        checked: false,
        filterKey: "bat_type_check",
      },
      {
        name: "Single Signed Immortal",
        value: "SingleSignedImmortal",
        checked: false,
        filterKey: "bat_type_check",
      },
      {
        name: "Dual Signed Ultra Rare",
        value: "DualSignedUltraRare",
        checked: false,
        filterKey: "bat_type_check",
      },
      {
        name: "Dual Crypto Unique",
        value: "DualCryptoUnique",
        checked: false,
        filterKey: "bat_type_check",
      },
      {
        name: "Single Signed Ultra Rare",
        value: "SingleSignedUltraRare",
        checked: false,
        filterKey: "bat_type_check",
      },
      {
        name: "Single Crypto Unique",
        value: "SingleCryptoUnique",
        checked: false,
        filterKey: "bat_type_check",
      },
      {
        name: "Single Crypto Premium",
        value: "SingleCryptoPremium",
        checked: false,
        filterKey: "bat_type_check",
      },
      {
        name: "Single Signed Super Rare",
        value: "SingleSignedSuperRare",
        checked: false,
        filterKey: "bat_type_check",
      },
      {
        name: "Single Crypto Superior",
        value: "SingleCryptoSuperior",
        checked: false,
        filterKey: "bat_type_check",
      },
      {
        name: "Single Signed Rare",
        value: "SingleSignedRare",
        checked: false,
        filterKey: "bat_type_check",
      },
      {
        name: "Single Crypto Standard",
        value: "SingleCryptoStandard",
        checked: false,
        filterKey: "bat_type_check",
      },
    ],

    glCoin: [
      {
        name: "With GL Coins",
        value: "has_coin",
        checked: false,
        filterKey: "has_GLC",
      },
    ],
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
        filterKey: "players",
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
        filterKey: "players",
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
        filterKey: "players",
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
        filterKey: "players",
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
        filterKey: "players",
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
        filterKey: "players",
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
        filterKey: "players",
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
        filterKey: "players",
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
        filterKey: "players",
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
        filterKey: "players",
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
        filterKey: "players",
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
        filterKey: "players",
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
        filterKey: "players",
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
        filterKey: "players",
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
        filterKey: "players",
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
        filterKey: "players",
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
        filterKey: "players",
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
        filterKey: "players",
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
        filterKey: "players",
      },
    ],
    level: [
      {
        name: "Level 1",
        value: "1",
        checked: false,
        filterKey: "NFT_level",
      },
      {
        name: "Level 2",
        value: "2",
        checked: false,
        filterKey: "NFT_level",
      },
      {
        name: "Level 3",
        value: "3",
        checked: false,
        filterKey: "NFT_level",
      },
      {
        name: "Level 4",
        value: "4",
        checked: false,
        filterKey: "NFT_level",
      },
      {
        name: "Level 5",
        value: "5",
        checked: false,
        filterKey: "NFT_level",
      },
      {
        name: "Level 6",
        value: "6",
        checked: false,
        filterKey: "NFT_level",
      },
      {
        name: "Level 7",
        value: "7",
        checked: false,
        filterKey: "NFT_level",
      },
      {
        name: "Level 8",
        value: "8",
        checked: false,
        filterKey: "NFT_level",
      },
      {
        name: "Level 9",
        value: "9",
        checked: false,
        filterKey: "NFT_level",
      },
      {
        name: "Level 10",
        value: "10",
        checked: false,
        filterKey: "NFT_level",
      },
      {
        name: "Level 11",
        value: "11",
        checked: false,
        filterKey: "NFT_level",
      },
      {
        name: "Level 12",
        value: "12",
        checked: false,
        filterKey: "NFT_level",
      },
      {
        name: "Level 13",
        value: "13",
        checked: false,
        filterKey: "NFT_level",
      },
      {
        name: "Level 14",
        value: "14",
        checked: false,
        filterKey: "NFT_level",
      },
      {
        name: "Level 15",
        value: "15",
        checked: false,
        filterKey: "NFT_level",
      },
    ],

    showSale: false,
    showStatus: false,
    auction: false,
    showNFT: false,
    showNFTCategory: true,
    showNFTCollection: false,
    showNFTRange: false,
    showGlC: false,
    showPlayers: false,
    showLevel: false,
    showCryptoAssets: false,
    showBatTypes: false,
  },
  raddx: {
    categories: [
      {
        name: "Car",
        value: "Car",
        checked: false,
        filterKey: "nft_category",
      },
      {
        name: "Land",
        value: "Land",
        checked: false,
        filterKey: "nft_category",
      },
      {
        name: "Building",
        value: "Building",
        checked: false,
        filterKey: "nft_category",
      },
    ],
    carCategories: [
      {
        name: "Tuner",
        value: "Tuner",
        checked: false,
        filterKey: "car_category",
      },
      {
        name: "Battle",
        value: "Battle",
        checked: false,
        filterKey: "car_category",
      },
      {
        name: "Vintage",
        value: "Vintage",
        checked: false,
        filterKey: "car_category",
      },
      {
        name: "Super",
        value: "Super",
        checked: false,
        filterKey: "car_category",
      },
      {
        name: "Hyper",
        value: "Hyper",
        checked: false,
        filterKey: "car_category",
      },
      {
        name: "Concept",
        value: "Concept",
        checked: false,
        filterKey: "car_category",
      },
    ],
    subCategories: [
      {
        name: "Common",
        value: "COMMON",
        checked: false,
        filterKey: "nft_collection",
      },
      {
        name: "Rare",
        value: "RARE",
        checked: false,
        filterKey: "nft_collection",
      },
      {
        name: "Legendary",
        value: "LEGENDARY",
        checked: false,
        filterKey: "nft_collection",
      },
      {
        name: "Alien",
        value: "ALIEN",
        checked: false,
        filterKey: "nft_collection",
      },
      {
        name: "Immortal",
        value: "IMMORTAL",
        checked: false,
        filterKey: "nft_collection",
      },
    ],
    landSubCategories: [
      {
        name: "Downtown",
        value: "DOWNTOWN",
        checked: false,
        filterKey: "nft_collection",
      },
      {
        name: "Mainland",
        value: "MAINLAND",
        checked: false,
        filterKey: "nft_collection",
      },
      {
        name: "Prime",
        value: "PRIME",
        checked: false,
        filterKey: "nft_collection",
      },
      {
        name: "Heart",
        value: "HEART",
        checked: false,
        filterKey: "nft_collection",
      },
    ],
    buildingSubCategories: [
      {
        name: "Silver",
        value: "SILVER",
        checked: false,
        filterKey: "nft_collection",
      },
      {
        name: "Gold",
        value: "GOLD",
        checked: false,
        filterKey: "nft_collection",
      },
      {
        name: "Platinum",
        value: "PLATINUM",
        checked: false,
        filterKey: "nft_collection",
      },
      {
        name: "Diamond",
        value: "DIAMOND",
        checked: false,
        filterKey: "nft_collection",
      },
    ],
    carModels: [
      {
        name: "Streetdon",
        value: "Streetdon",
        checked: false,
        filterKey: "car_model",
      },
      {
        name: "Stallion",
        value: "Stallion",
        checked: false,
        filterKey: "car_model",
      },
      {
        name: "Mauler",
        value: "Mauler",
        checked: false,
        filterKey: "car_model",
      },
      {
        name: "Fightcat",
        value: "Fightcat",
        checked: false,
        filterKey: "car_model",
      },
      {
        name: "Classico",
        value: "Classico",
        checked: false,
        filterKey: "car_model",
      },
      {
        name: "Macho",
        value: "Macho",
        checked: false,
        filterKey: "car_model",
      },
      {
        name: "Royale",
        value: "Royale",
        checked: false,
        filterKey: "car_model",
      },
      {
        name: "Toro GT",
        value: "Toro GT",
        checked: false,
        filterKey: "car_model",
      },
      {
        name: "Squadra GT",
        value: "Squadra GT",
        checked: false,
        filterKey: "car_model",
      },
      {
        name: "Jaws",
        value: "Jaws",
        checked: false,
        filterKey: "car_model",
      },
      {
        name: "Hypra GT",
        value: "Hypra GT",
        checked: false,
        filterKey: "car_model",
      },
      {
        name: "Concept X",
        value: "Concept X",
        checked: false,
        filterKey: "car_model",
      },
    ],
    bodySurface: [
      {
        name: "Glossy",
        value: "Glossy",
        checked: false,
        filterKey: "body_surface",
      },
      {
        name: "Matte",
        value: "Matte",
        checked: false,
        filterKey: "body_surface",
      },
    ],
    level: [
      {
        name: "Level 1",
        value: "1",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 2",
        value: "2",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 3",
        value: "3",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 4",
        value: "4",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 5",
        value: "5",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 6",
        value: "6",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 7",
        value: "7",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 8",
        value: "8",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 9",
        value: "9",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 10",
        value: "10",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 11",
        value: "11",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 12",
        value: "12",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 13",
        value: "13",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 14",
        value: "14",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 15",
        value: "15",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 16",
        value: "16",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 17",
        value: "17",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 18",
        value: "18",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 19",
        value: "19",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 20",
        value: "20",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 21",
        value: "21",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 22",
        value: "22",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 23",
        value: "23",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 24",
        value: "24",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 25",
        value: "25",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 26",
        value: "26",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 27",
        value: "27",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 28",
        value: "28",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 29",
        value: "29",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 30",
        value: "30",
        checked: false,
        filterKey: "nft_level",
      },
    ],
    saleType: [
      {
        name: "Bid",
        value: "bid",
        checked: false,
        filterKey: "sale_type",
      },
      {
        name: "Buy",
        value: "buy",
        checked: false,
        filterKey: "sale_type",
      },
    ],
    sort: [
      {
        name: "Recently Listed",
        value: "recently_listed",
        checked: true,
        filterKey: "sort_filters",
      },
      {
        name: "Price - High to Low",
        value: "price_desc",
        checked: false,
        filterKey: "sort_filters",
      },
      {
        name: "Price - Low to High",
        value: "price",
        checked: false,
        filterKey: "sort_filters",
      },
      {
        name: "Auction Ending Soon",
        value: "auction_ending_soon",
        checked: false,
        filterKey: "sort_filters",
      },
      {
        name: "Auction Starting Soon",
        value: "auction_starting_soon",
        checked: false,
        filterKey: "sort_filters",
      },
      {
        name: "Relevance",
        value: "relevance",
        checked: false,
        filterKey: "sort_filters",
      },
    ],
    //Doubt
    others: [
      {
        name: "Bid",
        value: "bid",
        checked: false,
        filterKey: "others",
      },
    ],
    //Doubt
    saleKind: [
      {
        name: "Timed Auction",
        value: "timed_auction",
        checked: false,
        filterKey: "sale_kind",
      },
      {
        name: "Listed for sale",
        value: "onsale",
        checked: false,
        filterKey: "sale_kind",
      },
      {
        name: "Not on sale",
        value: "not_on_sale",
        checked: false,
        filterKey: "sale_kind",
      },
    ],
    //Doubt
    Auction: [
      {
        name: "Bid",
        value: "bid",
        checked: false,
        filterKey: "auction",
      },
    ],
    showCategories: true,
    showCarCategories: false,
    showSubCategories: false,
    showLandSubCategories: false,
    showBuildingSubCategories: false,
    showCarModels: false,
    showBodySurface: false,
    showOthers: false,
    showLevel: false,
    showSaleType: false,
    showSaleKind: false,
    showAuction: false,
  },
  hurley: {
    categories: [
      {
        name: "Rare",
        value: "RARE",
        checked: false,
        filterKey: "NFT_collection_check",
      },
      {
        name: "Epic",
        value: "EPIC",
        checked: false,
        filterKey: "NFT_collection_check",
      },
      {
        name: "Legendary",
        value: "LEGENDARY",
        checked: false,
        filterKey: "NFT_collection_check",
      },
      {
        name: "Immortal",
        value: "IMMORTAL",
        checked: false,
        filterKey: "NFT_collection_check",
      },
      {
        name: "Common",
        value: "COMMON",
        checked: false,
        filterKey: "NFT_collection_check",
      },
      {
        name: "Uncommon",
        value: "UNCOMMON",
        checked: false,
        filterKey: "NFT_collection_check",
      },
    ],
    gender: [
      {
        name: "Reef",
        value: "Male",
        checked: false,
        filterKey: "nft_gender",
      },
      {
        name: "Sandy",
        value: "Female",
        checked: false,
        filterKey: "nft_gender",
      },
    ],
    level: [
      {
        name: "Level 1",
        value: "1",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 2",
        value: "2",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 3",
        value: "3",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 4",
        value: "4",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 5",
        value: "5",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 6",
        value: "6",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 7",
        value: "7",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 8",
        value: "8",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 9",
        value: "9",
        checked: false,
        filterKey: "nft_level",
      },
      {
        name: "Level 10",
        value: "10",
        checked: false,
        filterKey: "nft_level",
      },
    ],
    saleType: [
      {
        name: "Bid",
        value: "bid",
        checked: false,
        filterKey: "sale_type",
      },
      {
        name: "Buy",
        value: "buy",
        checked: false,
        filterKey: "sale_type",
      },
    ],
    sort: [
      {
        name: "Recently Listed",
        value: "recently_listed",
        checked: true,
        filterKey: "sort_filters",
      },
      {
        name: "Price - High to Low",
        value: "price_desc",
        checked: false,
        filterKey: "sort_filters",
      },
      {
        name: "Price - Low to High",
        value: "price",
        checked: false,
        filterKey: "sort_filters",
      },
      {
        name: "Auction Ending Soon",
        value: "auction_ending_soon",
        checked: false,
        filterKey: "sort_filters",
      },
      {
        name: "Auction Starting Soon",
        value: "auction_starting_soon",
        checked: false,
        filterKey: "sort_filters",
      },
      {
        name: "Relevance",
        value: "relevance",
        checked: false,
        filterKey: "sort_filters",
      },
    ],
    //Doubt
    others: [
      {
        name: "Bid",
        value: "bid",
        checked: false,
        filterKey: "others",
      },
    ],
    //Doubt
    saleKind: [
      {
        name: "Timed Auction",
        value: "timed_auction",
        checked: false,
        filterKey: "sale_kind",
      },
      {
        name: "Listed for sale",
        value: "onsale",
        checked: false,
        filterKey: "sale_kind",
      },
      {
        name: "Not on sale",
        value: "not_on_sale",
        checked: false,
        filterKey: "sale_kind",
      },
    ],
    //Doubt
    Auction: [
      {
        name: "Bid",
        value: "bid",
        checked: false,
        filterKey: "auction",
      },
    ],
    showCategories: true,
    showOthers: false,
    showLevel: false,
    showSaleType: false,
    showSaleKind: false,
    showAuction: false,
  },
};
