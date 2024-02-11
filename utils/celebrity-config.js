import Details from "../components/details";
import DetailsRaddx from "../components/raddx/details";
import OrderDetails from "../components/order-details";
import OrderDetailsRaddx from "../components/raddx/order-details";
import DetailsHurley from "../components/hurley/details";
import OrderDetailsHurley from "../components/hurley/order-details";

export const CELEBRITIES = Object.freeze({
  mcl: {
    name: "mcl",
    gameName: "mcl",
    exploreUrl: "/nft-marketplace/mcl",
    celebrityName: "Cricket Jump",
    orderdetails: OrderDetails,
    details: Details,
  },
  raddx: {
    name: "raddx",
    gameName: "raddx",
    exploreUrl: "/nft-marketplace/raddx",
    celebrityName: "Raddx", //! TEMPORARY CELEBRITY NAME - THIS MIGHT CHANGE IN THE FUTURE
    orderdetails: OrderDetailsRaddx,
    details: DetailsRaddx,
  },
  hurley: {
    name: "hurley",
    gameName: "hurley",
    exploreUrl: "/nft-marketplace/hurley",
    celebrityName: "Hurley", //! TEMPORARY CELEBRITY NAME - THIS MIGHT CHANGE IN THE FUTURE
    orderdetails: OrderDetailsHurley,
    details: DetailsHurley,
  },
  DEFAULT: {
    name: "mcl",
    gameName: "mcl",
    exploreUrl: "/nft-marketplace/mcl",
    celebrityName: "Cricket Jump",
    orderdetails: OrderDetails,
    details: Details,
  },
});

export const VALID_CELEBRITIES = [
  CELEBRITIES.mcl.name,
  CELEBRITIES.raddx.name,
  CELEBRITIES.hurley.name,
];

export const isValidCelebrity = (celebrity) =>
  VALID_CELEBRITIES.includes(celebrity);

export const getCelebrityNameByUrl = (url) => {
  const [_, celebrity = CELEBRITIES.DEFAULT] = Object.entries(CELEBRITIES).find(
    ([_, celebrity]) => celebrity?.exploreUrl === url
  );
  return celebrity?.name;
};

export const getOrderDetailsComponent = (page, game_name) => {
  const CURRENT_PAGE = "orderdetails";
  if (CURRENT_PAGE !== page) return null;
  let celebrityObj =
    Object.values(CELEBRITIES).find(
      (celebrity) => celebrity.gameName === game_name
    ) || CELEBRITIES.DEFAULT;

  return celebrityObj[CURRENT_PAGE] || null;
};

export const getDetailsComponent = (page, game_name) => {
  const CURRENT_PAGE = "details";
  if (CURRENT_PAGE !== page) return null;
  let celebrityObj =
    Object.values(CELEBRITIES).find(
      (celebrity) => celebrity.gameName === game_name
    ) || CELEBRITIES.DEFAULT;
  return celebrityObj[CURRENT_PAGE] || null;
};
