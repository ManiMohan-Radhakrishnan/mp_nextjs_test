import dayjs from "dayjs";
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  validatePhoneNumberLength,
} from "libphonenumber-js";
import { replace } from "lodash";
import { useSelector } from "react-redux";
import { getHideMenuStatus } from "../redux/reducers/user_reducer";
import store from "../redux/store";
import images from "../utils/images.json";
import raddx_images from "../utils/raddx-images.json";

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  const re = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  const sp_re = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return re.test(password) || sp_re.test(password);
};

export const validateName = (name) => {
  const re =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  return re.test(name);
};

export const formValidateName = (name) => {
  const re =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]+$/u;
  return re.test(name);
};

export const validateTelegramId = (telegramId) => {
  const tp = /([a-zA-Z0-9]+)/;
  return tp.test(telegramId);
};

export const validatePhone = (mobile) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; // eslint-disable-line
  return re.test(mobile);
};
export const getOS = () => {
  let userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = null;
  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (/Linux/.test(platform)) {
    os = "Linux";
  } else {
    os = "others";
  }
  // alert(os);

  return os;
};

export const validateNameReplace = (input) =>
  input
    .replace("  ", " ")
    .replace("--", "-")
    .replace(",,", ",")
    .replace("..", ".")
    .replace("''", "'")
    .replace("-,", "-")
    .replace("-.", "-")
    .replace("-'", "-")
    .replace(",-", ",")
    .replace(",.", ",")
    .replace(",'", ",")
    .replace(".-", ".")
    .replace(".,", ".")
    .replace(".'", ".")
    .replace("'-", "'")
    .replace("',", "'")
    .replace("'.", "'");

export const passwordLength = 6;

export const currencyFormat = (
  value = 0,
  type = "usd",
  fixedDecimalPoint = 2
) => {
  let x = parseFloat(value);
  if (isNaN(x)) return;
  return `${type?.toLowerCase() === "usd" ? "$" : ""}${x
    .toFixed(fixedDecimalPoint)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};

// export const abbreviateNumber = (value) => {
//   let newValue = value;
//   if (value >= 1000) {
//     const suffixes = ["", "K", "M", "B", "T"];
//     let suffixNum = Math.floor(("" + value).length / 3);
//     let shortValue = "";
//     for (let precision = 2; precision >= 1; precision--) {
//       shortValue = (
//         suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value
//       ).toPrecision(precision);
//       let dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
//       if (dotLessShortValue.length <= 2) {
//         break;
//       }
//     }
//     console.log(shortValue);
//     if (shortValue % 1 !== 0) shortValue = parseFloat(shortValue).toFixed(1);
//     newValue = shortValue + suffixes[suffixNum];
//   }
//   return newValue;
// };

const intlFormat = (num) => {
  return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
};
export const abbreviateNumber = (num) => {
  if (num >= 1000000000) return intlFormat(num / 1000000000) + "B";
  if (num >= 1000000) return intlFormat(num / 1000000) + "M";
  if (num >= 1000) return intlFormat(num / 1000) + "K";
  return intlFormat(num);
};

export const percDiff = (basePrice, newPrice) => {
  return (((newPrice - basePrice) / basePrice) * 100).toFixed(2);
};

export const validateCurrency = (value) => {
  // const re = /^(\d*)\.?(\d){0,10}$/;
  // const re = /^\d*\.?\d{0,2}$/;
  const re = /^[1-9][0-9]*$/;
  return re.test(value);
};

export const validateCurrencyShot = (value) => {
  // const re = /^(\d*)\.?(\d){0,10}$/;
  // const re = /^\d*\.?\d{0,2}$/;
  const re = /^\d{1,10}(\.\d{0,2})?$/;
  return re.test(value);
};

export const validateQuantity = (value) => {
  const re = /^[1-9][0-9]*$/;
  return re.test(value);
};
export const roundDown = (number, decimals = 2) => {
  number = parseFloat(number);
  return Number(number.toString().match(/^\d+(?:\.\d{0,2})?/));
};

export const precisionRoundMod = (number, precision) => {
  var factor = Math.pow(10, precision);
  var n = precision < 0 ? number : 0.01 / factor + number;
  return Math.round(n * factor) / factor;
};

export const bidBuyError = (code) => {
  // const OK = 200;
  const ERROR = 500;
  const ERROR404 = 404;
  const UNAUTHORIZED = 401;
  const AUCTION_UNBEGUN = 701;
  const AUCTION_ENDED = 702;
  const INVALID_QUANTITY = 703;
  const SOLD = 704;
  const OUT_OF_STOCK = 705;
  const LIMITED_OUT = 706;
  const INSUFFICIENT_BALANCE = 707;
  const INVALID_BID = 708;
  const LOW_BID = 709;
  const INVALID_NFT = 710;
  const INVALID_CATEGORY = 711;
  const KYC_VERIFY = 715;
  const AUCTION_CANCEL_BANNED = 718;
  const NOT_ELIGIBLE = 720;

  switch (code) {
    case ERROR:
      return {
        title: "Oops!",
        description:
          "The request could not be processed at this time. Please try again.!",
      };
    case ERROR404:
      return { title: "Oops!", description: "Not found!" };
    case UNAUTHORIZED:
      return { title: "Error", description: "Unauthorized" };
    case AUCTION_UNBEGUN:
      return { title: "Error", description: "Auction not yet begun" };
    case AUCTION_ENDED:
      return { title: "Error", description: "Auction ended" };
    case INVALID_QUANTITY:
      return { title: "Error", description: "Invalid Quantity" };
    case SOLD:
      return { title: "Oops!", description: "Sold out" };
    case OUT_OF_STOCK:
      return { title: "Oops!", description: "Out of stock" };
    case LIMITED_OUT:
      return { title: "Error", description: "Limited out" };
    case INSUFFICIENT_BALANCE:
      return { title: "Error", description: "Insufficient Balance" };
    case INVALID_BID:
      return { title: "Error", description: "Invalid Bid" };
    case LOW_BID:
      return { title: "Error", description: "Low Bid" };
    case INVALID_NFT:
      return { title: "Error", description: "Invalid NFT" };
    case INVALID_CATEGORY:
      return { title: "Error", description: "Invalid Category" };
    case KYC_VERIFY:
      return {
        title: "Error",
        description: "Please complete your user verification",
      };
    case AUCTION_CANCEL_BANNED:
      return {
        title: "Oops!",
        description: "Auction could not be cancel, there is an active bid!",
      };
    case NOT_ELIGIBLE:
      return {
        title: "Error",
        description:
          "You are not eligible to buy as your PAN Card details matches that of the seller's!",
      };

    default:
      return {
        title: "Oops!",
        description:
          "The request could not be processed at this time. Please try again.!",
      };
  }
};

export const validInternationalPhone = (input, country) => {
  return (
    isPossiblePhoneNumber(input, country) === true &&
    isValidPhoneNumber(input, country) === true &&
    validatePhoneNumberLength(input, country) === undefined
  );
};

export const validateURL = (url) => {
  const re =
    /^http(s?):\/\/(www\.)?(((\w+(([\.\-]{1}([a-z]{2,})+)+)(\/[a-zA-Z0-9\_\=\?\&\.\#\-\W]*)*$)|(\w+((\.([a-z]{2,})+)+)(\:[0-9]{1,5}(\/[a-zA-Z0-9\_\=\?\&\.\#\-\W]*)*$)))|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(([0-9]|([1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]+)+)(\/[a-zA-Z0-9\_\=\?\&\.\#\-\W]*)*)((\:[0-9]{1,5}(\/[a-zA-Z0-9\_\=\?\&\.\#\-\W]*)*$)*))$/; // eslint-disable-line
  // /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
  return re.test(url);
};

export const calculateTimeLeft = (input, cInput) => {
  var offset = new Date().getTimezoneOffset();
  var input_utc = new Date(input);
  input_utc.setMinutes(input_utc.getMinutes() - offset);

  let difference;
  if (cInput) {
    var cInput_utc = new Date(cInput);
    cInput_utc.setMinutes(cInput_utc.getMinutes() - offset);

    difference = +new Date(input_utc) - +new Date(cInput_utc);
  } else {
    var cInput_utc_1 = new Date();
    cInput_utc_1.setMinutes(cInput_utc_1.getMinutes() - offset);

    difference = +new Date(input_utc) - +new Date(cInput_utc_1);
  }

  var cInput_utc_2 = new Date();
  cInput_utc_2.setMinutes(cInput_utc_2.getMinutes() - offset);

  difference = +new Date(input_utc) - +new Date(cInput_utc_2);

  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0.1,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export const dot = (color = "#ccc") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

export const level = (value) => {
  const level = [
    {
      type: "1",
      name: "LVL 1",
      value: images.level1,
    },
    {
      type: "2",
      name: "LVL 2",
      value: images.level2,
    },
    {
      type: "3",
      name: "LVL 3",
      value: images.level3,
    },
    {
      type: "4",
      name: "LVL 4",
      value: images.level4,
    },
    {
      type: "5",
      name: "LVL 5",
      value: images.level5,
    },
    {
      type: "6",
      name: "LVL 6",
      value: images.level6,
    },
    {
      type: "7",
      name: "LVL 7",
      value: images.level7,
    },
    {
      type: "8",
      name: "LVL 8",
      value: images.level8,
    },
    {
      type: "9",
      name: "LVL 9",
      value: images.level9,
    },
    {
      type: "10",
      name: "LVL 10",
      value: images.level10,
    },
    {
      type: "11",
      name: "LVL 11",
      value: images.level11,
    },
    {
      type: "12",
      name: "LVL 12",
      value: images.level12,
    },
    {
      type: "13",
      name: "LVL 13",
      value: images.level13,
    },
    {
      type: "14",
      name: "LVL 14",
      value: images.level14,
    },
    {
      type: "15",
      name: "LVL 15",
      value: images.level15,
    },
  ];
  const levelData = level.find((obj) => obj.type === value?.toString());
  return levelData;
};

export const hurleyLevels = (value) => {
  const hurleyLevelsList = [
    {
      type: "1",
      name: "LVL 1",
      value: images.hlevel1,
    },
    {
      type: "2",
      name: "LVL 2",
      value: images.hlevel2,
    },
    {
      type: "3",
      name: "LVL 3",
      value: images.hlevel3,
    },
    {
      type: "4",
      name: "LVL 4",
      value: images.hlevel4,
    },
    {
      type: "5",
      name: "LVL 5",
      value: images.hlevel5,
    },
    {
      type: "6",
      name: "LVL 6",
      value: images.hlevel6,
    },
    {
      type: "7",
      name: "LVL 7",
      value: images.hlevel7,
    },
    {
      type: "8",
      name: "LVL 8",
      value: images.hlevel8,
    },
    {
      type: "9",
      name: "LVL 9",
      value: images.hlevel9,
    },
    {
      type: "10",
      name: "LVL 10",
      value: images.hlevel0,
    },
  ];

  const finalHulreyLevels = hurleyLevelsList.find(
    (obj) => obj.type === value?.toString()
  );
  return finalHulreyLevels;
};

export const getRoleInfo = (value, style) => {
  const role = [
    {
      type: "Batsman",
      name: "BATSMAN",
      style: "LH",
      value: images.batsmanLH,
    },
    {
      type: "Batsman",
      name: "BATSMAN",
      style: "RH",
      value: images.batsmanRH,
    },
    {
      type: "Bowler",
      name: "BOWLER",
      style: "LA",
      value: images.bowlerLA,
    },
    {
      type: "Bowler",
      name: "BOWLER",
      style: "RA",
      value: images.bowlerRA,
    },
    {
      type: "Bat",
      name: "BAT",
      style: "BAT",
      value: images.bat,
    },
    {
      type: "Fielder",
      name: "FIELDER",
      style: "Fielder",
      value: images.field,
    },
  ];
  const roleData = role.find(
    (obj) => obj.type === value && obj.style === style
  );
  return roleData;
};

export const getPlayerCategoryInfo = (value) => {
  const playerCategory = [
    {
      type: "ROOKIE",
      value: "RO",
      color: "blue_color",
      textColor: "#3b56ff",
    },
    {
      type: "RARE",
      value: "RA",
      color: "orange_color",
      textColor: "#f58220",
    },
    {
      type: "EPIC",
      value: "EP",
      color: "purple_color",
      textColor: "#9e6cef",
    },
    {
      type: "LEGEND",
      value: "LG",
      color: "multi_color",
      textColor: "linear-gradient(202deg, #e2ff00, #18e0e0, #e8318d)",
    },
    {
      type: "SUPER RARE",
      value: "SR",
      color: "lavender_color",
      textColor: "#803cef",
    },
    {
      type: "ULTRA RARE",
      value: "UR",
      color: "lavender_color",
      textColor: "#803cef",
    },
    {
      type: "IMMORTAL",
      value: "IM",
      color: "lavender_color",
      textColor: "#803cef",
    },
    {
      type: "ULTRA LEGEND",
      value: "UL",
      color: "lavender_color",
      textColor: "#803cef",
    },
    {
      type: "UNIQUE",
      value: "UN",
      color: "lavender_color",
      textColor: "#803cef",
    },
    {
      type: "PREMIUM",
      value: "PR",
      color: "lavender_color",
      textColor: "#803cef",
    },
    {
      type: "SUPERIOR",
      value: "SP",
      color: "lavender_color",
      textColor: "#803cef",
    },
    {
      type: "STANDARD",
      value: "ST",
      color: "lavender_color",
      textColor: "#803cef",
    },
  ];

  const playerCatData = playerCategory.find((obj) => obj.type === value);
  return playerCatData;
};

export const hurleyCategory = (value) => {
  const hurleyCategory = [
    {
      type: "RARE",
      value: "RA",
    },
    {
      type: "EPIC",
      value: "EP",
    },
    {
      type: "LEGENDARY",
      value: "LG",
    },
    {
      type: "IMMORTAL",
      value: "IM",
    },
    {
      type: "COMMON",
      value: "CO",
    },
    {
      type: "UNCOMMON",
      value: "UCO",
    },
  ];

  const finalHurleyCategoryData = hurleyCategory.find(
    (obj) => obj.type === value
  );
  return finalHurleyCategoryData;
};

export const getPlayerHandInfo = (hand, bowling_style = "") => {
  const handConfig = {
    LH: "Left Hand",
    RH: "Right Hand",
    LA: "Left Arm",
    RA: "Right Arm",
  };

  const bowlingConfig = {
    Fast: "Fast",
    "Med Fast": "Medium Fast",
    "Leg Spin": "Leg Spin",
    "Off Spin": "Off Spin",
  };

  return `${handConfig[hand] || ""} ${
    bowlingConfig[bowling_style] || ""
  }`.trim();
};

export const shotDirection = (value) => {
  const shotDirection = [
    {
      type: "0",
      name: "0",
      value: images.shot_direction_00,
    },
    {
      type: "1",
      name: "1",
      value: images.shot_direction_01,
    },
    {
      type: "2",
      name: "2",
      value: images.shot_direction_02,
    },
    {
      type: "3",
      name: "3",
      value: images.shot_direction_03,
    },
    {
      type: "4",
      name: "4",
      value: images.shot_direction_04,
    },
    {
      type: "5",
      name: "5",
      value: images.shot_direction_05,
    },
    {
      type: "6",
      name: "6",
      value: images.shot_direction_06,
    },
    {
      type: "7",
      name: "7",
      value: images.shot_direction_07,
    },
    {
      type: "8",
      name: "8",
      value: images.shot_direction_08,
    },
    {
      type: "9",
      name: "9",
      value: images.shot_direction_09,
    },
    {
      type: "10",
      name: "10",
      value: images.shot_direction_10,
    },
    {
      type: "11",
      name: "11",
      value: images.shot_direction_11,
    },
  ];
  const shotDirectionData = shotDirection.find((obj) => obj.type == value);
  return shotDirectionData;
};
export const fieldingDirection = (value) => {
  const fieldingDirection = [
    {
      type: "0",
      name: "0",
      value: images.shot_direction_00,
    },
    {
      type: "1",
      name: "1",
      value: images.shot_direction_01,
    },
    {
      type: "2",
      name: "2",
      value: images.shot_direction_02,
    },
    {
      type: "3",
      name: "3",
      value: images.shot_direction_03,
    },
    {
      type: "4",
      name: "4",
      value: images.shot_direction_04,
    },
    {
      type: "5",
      name: "5",
      value: images.shot_direction_05,
    },
    {
      type: "6",
      name: "6",
      value: images.shot_direction_06,
    },
    {
      type: "7",
      name: "7",
      value: images.shot_direction_07,
    },
    {
      type: "8",
      name: "8",
      value: images.shot_direction_08,
    },
    {
      type: "9",
      name: "9",
      value: images.shot_direction_09,
    },
    {
      type: "10",
      name: "10",
      value: images.shot_direction_10,
    },
    {
      type: "11",
      name: "11",
      value: images.shot_direction_11,
    },
  ];
  const fieldingDirectionData = fieldingDirection.find(
    (obj) => obj.type === value?.toString()
  );

  return fieldingDirectionData;
};

export const Nationality = (value) => {
  const Nationality = [
    {
      type: "India",
      name: "India",
      value: images.shot_country_india,
    },
    {
      type: "Australia",
      name: "Australia",
      value: images.shot_country_australia,
    },
    {
      type: "Bangladesh",
      name: "Bangladesh",
      value: images.shot_country_bangladesh,
    },
    {
      type: "England",
      name: "England",
      value: images.shot_country_england,
    },
    {
      type: "New Zealand",
      name: "New Zealand",
      value: images.shot_country_newZealand,
    },
    {
      type: "Pakistan",
      name: "Pakistan",
      value: images.shot_country_pakistan,
    },
    {
      type: "South Africa",
      name: "South Africa",
      value: images.shot_country_southAfrica,
    },
    {
      type: "Sri Lanka",
      name: "Sri Lanka",
      value: images.shot_country_srilanka,
    },
    {
      type: "Zimbabwe",
      name: "Zimbabwe",
      value: images.shot_country_zimbabwe,
    },
  ];
  const NationalityData = Nationality.find((obj) => obj.type === value);
  return NationalityData;
};

export const batPower = (value) => {
  const batPower = [
    {
      type: "1",
      name: "BAT",
      value: images.bat_power_01,
    },
    {
      type: "2",
      name: "BAT",
      value: images.bat_power_02,
    },
    {
      type: "3",
      name: "BAT",
      value: images.bat_power_03,
    },
  ];
  const batPowerData = batPower.find((obj) => obj.type == value?.toString());
  return batPowerData;
};

export const detectWhatsapp = (uri, window) => {
  const onIE = () => {
    return new Promise((resolve) => {
      window.navigator.msLaunchUri(
        uri,
        () => resolve(true),
        () => resolve(false)
      );
    });
  };
  const notOnIE = () => {
    return new Promise((resolve) => {
      const a =
        document.getElementById("wapp-launcher") || document.createElement("a");
      a.id = "wapp-launcher";
      a.href = uri;
      a.style.display = "none";
      document.body.appendChild(a);

      const start = Date.now();
      const timeoutToken = setTimeout(() => {
        if (Date.now() - start > 1250) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);

      const handleBlur = () => {
        clearTimeout(timeoutToken);
        resolve(true);
      };
      window.addEventListener("blur", handleBlur);

      a.click();
    });
  };

  return window.navigator.msLaunchUri ? onIE() : notOnIE();
};

export const errorRedirect = (statusCode) => {
  let props = {};
  switch (statusCode) {
    case 404:
      return { notFound: true };
    case 401:
      return {
        redirect: {
          permanent: false,
          destination: "https://jumpaccounts.guardiannft.org/signin",
        },
      };
    case 500:
      return {
        redirect: {
          permanent: false,
          destination: "/500",
        },
      };
    default:
      return { props };
  }
};

export const getExplorePageMetaData = (page = "default") => {
  const config = {
    default: {
      metaTitle: "Explore NFT Collection | Jump.trade",
      metaDescription:
        "Get your hands on some of the most prized and highly collectible cricket NFTs at Jump.trade. Buy, sell, & collect exclusive NFTs today.",
    },
    "sachin-tendulkar-nfts": {
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
    "don-bradman-nfts": {
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
    "rahul-dravid-nfts": {
      title: "RAHUL DRAVID NFTs",
      description:
        "Popularly and fittingly known as 'The Wall', Rahul Dravid's defensive play in the longer format would frustrate even the most efficient bowlers. Buy your Rahul Dravid NFTs on Jump.trade.",
      metaTitle: "Rahul Dravid NFTs | Rahul Dravid NFT Collection | Jump.Trade",
      metaDescription:
        "Own a Rahul Dravid NFT and add a solid collection of cricket NFTs to your wallet. Find more cricket NFTs, cricket player NFTs, and signed digital bats here!",
      name: "Rahul Dravid",
      value: "rahul-dravid-nfts",
      checked: false,
    },
    "ricky-ponting-nfts": {
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
    "shane-warne-nfts": {
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
    "viv-richards-nfts": {
      title: "VIV RICHARDS NFTs",
      description:
        "This West Indian, considered one of the greatest batsmen of all time, redefined attacking batting with his power-hitting capabilities. Buy your Vivian Richards NFTs and strike big with your collectibles!",
      metaTitle: "Viv Richards NFTs | Viv Richards NFT Collection | Jump.Trade",
      metaDescription:
        "Hold a piece of the history of cricket by owning a Viv Richards NFTs from Jump.trade. Access these legendary signed digital bat NFTs here. Sign up now!",
      name: "Viv Richards",
      value: "viv-richards-nfts",
      checked: false,
    },
    "shane-watson-nfts": {
      title: "SHANE WATSON NFTs",
      description:
        "An embodiment of versatility and dedication, Shane Watson is one of the few cricketers to open both batting and bowling for Australia & Chennai. Get your hands on these coveted Shane Watson NFTs.",
      metaTitle: "Shane Watson NFTs | Shane Watson NFT Collection | Jump.Trade",
      metaDescription:
        "Your only destination to buy Shane Watson NFTs. Access these authenticated cricket NFTs on Jump.trade to be a powerful hitter in the cricket metaverse. Sign up now!",
      name: "Shane Watson",
      value: "shane-watson-nfts",
      checked: false,
    },
    "harbhajan-singh-nfts": {
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
    "matthew-hayden-nfts": {
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
    "andrew-symonds-nfts": {
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
    "adam-gilchrist-nfts": {
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
    "glenn-mcgrath-nfts": {
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
    "darren-lehmann-nfts": {
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
    "clive-lloyd-nfts": {
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
    "michael-bevan-nfts": {
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
    "damien-martyn-nfts": {
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
    "2011-champions-nfts": {
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
    "2003-champions-nfts": {
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
    "1983-champions-nfts": {
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
  };

  return config[page];
};

export const prebookStartDate = (date) => dayjs(date).format("DD-MM-YYYY");
export const prebookEndDate = (date) => dayjs(date).format("DD-MM-YYYY");

export const tournamentTime = (date) => dayjs(date).format("hh:mm a");

export const dateFormat = (date = null, format = "YYYY-MM-DD HH:mm:ss") => {
  if (!date) return null;
  var input_date = new Date(date);
  return dayjs(input_date).format(format);
};

export const decodeURIComponentSafe = (s) => {
  if (!s) {
    return s;
  }
  return decodeURIComponent(s.replace(/%(?![0-9][0-9a-fA-F]+)/g, "%25"));
};

export function debounceFactory(fn, delay = 1000) {
  let timer;
  return async (...args) => {
    console.log(timer);
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export const getDecimalInfo = (value) => {
  const MIN_FIXED_PT = 1;
  const MAX_FIXED_PT = 6;

  let floatValue = parseFloat(value);
  if (!value || isNaN(floatValue)) return NaN;
  let decimalValue = floatValue.toString().split(".")[1];
  let ptsLength = decimalValue?.length;
  let fixedDecimalPts =
    ptsLength > MIN_FIXED_PT
      ? ptsLength <= 5
        ? ptsLength
        : MAX_FIXED_PT
      : MIN_FIXED_PT;

  return fixedDecimalPts;
};

export const dynamicDecimalPrecision = (value) => {
  let fixedDecimalPts = getDecimalInfo(value);
  return precisionRoundMod(value, fixedDecimalPts);
};

export const removeZeros = (num) => {
  return num.replace(/^0+/, "");
};

export const navigateToExternalLink = (url, target = "_self") => {
  const hideMenuStatus = store.getState()?.user?.hideMenuStatus;
  let modifiedUrl = hideMenuStatus ? `${url}?hideMenus=true` : url;
  window.open(modifiedUrl, target);
};

export const openWindowBlank = (url) => {
  window.open(url, "_blank");
};

export const DEFAULT_REVENUE_SHARE = "(TBA)%";
export const validateUpi = (upi) => {
  const re = /^[\w\.\-_]{3,}@[a-zA-Z]{3,}/;
  return re.test(upi);
};

export const validateNumber = (value) => {
  const re = /^[1-9][0-9]*$/;
  return re.test(value);
};

export const raddx_level = (value) => {
  const TOTAL_LEVELS = 30;
  const levels = [];

  for (let i = 1; i <= TOTAL_LEVELS; i++) {
    levels.push({
      type: `${i}`,
      name: `LVL ${i}`,
      value: raddx_images[`level_${i}`],
    });
  }
  const levelData = levels.find((obj) => obj.type === value?.toString());
  return levelData;
};

export const raddx_car_category = (value) => {
  const car_categories = [
    {
      type: "Battle",
      name: "Battle",
      value: raddx_images.car_category_battle,
    },
    {
      type: "Concept",
      name: "Concept",
      value: raddx_images.car_category_concept,
    },
    {
      type: "Hyper",
      name: "Hyper",
      value: raddx_images.car_category_hyper,
    },
    {
      type: "Super",
      name: "Super",
      value: raddx_images.car_category_super,
    },
    {
      type: "Tuner",
      name: "Tuner",
      value: raddx_images.car_category_tuner,
    },
    {
      type: "Vintage",
      name: "Vintage",
      value: raddx_images.car_category_vintage,
    },
  ];

  const data = car_categories.find((obj) => obj.type === value?.toString());
  return data;
};

export const raddx_category = (value) => {
  const raddxCategory = [
    {
      name: "COMMON",
      value: "CO",
      color: "blue_color",
      textColor: "#3b56ff",
    },
    {
      name: "IMMORTAL",
      value: "IM",
      color: "lavender_color",
      textColor: "#803cef",
    },
    {
      name: "RARE",
      value: "RA",
      color: "orange_color",
      textColor: "#f58220",
    },
    {
      name: "ALIEN",
      value: "AL",
      color: "lavender_color",
      textColor: "#803cef",
    },
    {
      name: "LEGENDARY",
      value: "LG",
      color: "multi_color",
      textColor: "linear-gradient(202deg, #e2ff00, #18e0e0, #e8318d)",
    },
    // Land Categories
    {
      name: "HEART",
      value: "HT",
      color: "blue_color",
      textColor: "#3b56ff",
    },
    {
      name: "PRIME",
      value: "PM",
      color: "lavender_color",
      textColor: "#803cef",
    },
    {
      name: "MAINLAND",
      value: "ML",
      color: "multi_color",
      textColor: "linear-gradient(202deg, #e2ff00, #18e0e0, #e8318d)",
    },
    {
      name: "DOWNTOWN",
      value: "DT",
      color: "orange_color",
      textColor: "#f58220",
    },

    //Building Categories
    {
      name: "PLATINUM",
      value: "PT",
      color: "lavender_color",
      textColor: "#803cef",
    },
    {
      name: "DIAMOND",
      value: "DM",
      color: "multi_color",
      textColor: "linear-gradient(202deg, #e2ff00, #18e0e0, #e8318d)",
    },
    {
      name: "GOLD",
      value: "GO",
      color: "gold_color",
      textColor: "#cebd48",
    },
    {
      name: "SILVER",
      value: "SL",
      color: "blue_color",
      textColor: "#3b56ff",
    },
  ];

  const data = raddxCategory.find((obj) => obj.name === value);
  return data;
};

export const raddx_roles = (value) => {
  const raddxRoles = [
    {
      name: "Land",
      value: raddx_images.land_icon,
    },
    {
      name: "Building",
      value: raddx_images.building_icon,
    },
  ];

  const data = raddxRoles.find((obj) => obj.name === value);
  return data;
};

export const dateToSeconds = (date) => {
  const dateOption = new Date(date);
  const secondsConvertion = dateOption.getTime() / 1000;
  return secondsConvertion;
};

export const ValidateTelegramUsername = (name) => {
  const valid = /^@[a-zA-Z0-9]{5,}$/;
  return valid.test(name);
};

export const formValidateTelegram = (name) => {
  const re = /^[@a-zA-Z0-9]+$/u;
  return re.test(name);
};

export const ParamsSerialize = (params) => {
  // console.log(encodeURIComponent(JSON.stringify(params, "params")));
  // return encodeURIComponent(JSON.stringify(params).toString());
  const parts = [];
  const encode = (val) => {
    return encodeURIComponent(val)
      .replace(/%3A/gi, ":")
      .replace(/%24/g, "$")
      .replace(/%2C/gi, ",")
      .replace(/%20/g, "+")
      .replace(/%5B/gi, "[")
      .replace(/%5D/gi, "]");
  };
  const convertPart = (key, val) => {
    if (val instanceof Date) val = val.toISOString();
    else if (val instanceof Object) val = JSON.stringify(val);
    parts.push(encode(key) + "=" + encode(val));
  };
  Object.entries(params).forEach(([key, val]) => {
    if (val === null || typeof val === "undefined") return;
    if (Array.isArray(val))
      val.forEach((v, i) => convertPart(`${key}[${i}]`, v));
    else convertPart(key, val);
  });
  return parts.join("&");
};

export const getMetaDetails = (path) => {
  const metaDetails = [
    {
      pathName: "/",
      description:
        "Jump.trade is Asia's largest Web3 gaming ecosystem, giving you a holistic gaming experience with games, digital collectibles, & a vast NFT marketplace!",
      title: "Asia's Largest Web3 Gaming Ecosystem",
      image:
        "https://cdn.guardianlink.io/product-hotspot/images/jumptrade/Asia_Largest_Web3_Gaming_Ecosystem_OG_Img.png",
      canonical: process.env.NEXT_PUBLIC_MARKETPLACE_URL,
    },
    {
      pathName: "/nft-marketplace/mcl",
      description:
        "Own, sell, and trade the fabulous Cricket NFTs on this thriving marketplace. Add some cricket magic to your gaming collections.",
      title: "Explore MCL Cricket NFTs | Cricket NFT Marketplace | Jump.trade",
      image:
        "https://cdn.guardianlink.io/product-hotspot/images/jumptrade/Asia_Largest_Web3_Gaming_Ecosystem_OG_Img.png",
      canonical: process.env.NEXT_PUBLIC_MARKETPLACE_URL,
    },
    {
      pathName: "/nft-marketplace/raddx",
      description:
        "Embrace the thrill of car racing with our stunning RaddX Car NFTs. The array of cars, lands, and buildings is your road to RaddX Racing Metaverse.",
      title: "Explore Raddx Car NFTs | Car NFT Collection | Jump.trade",
      image:
        "https://cdn.guardianlink.io/product-hotspot/images/jumptrade/Asia_Largest_Web3_Gaming_Ecosystem_OG_Img.png",
      canonical: process.env.NEXT_PUBLIC_MARKETPLACE_URL,
    },
    {
      pathName: "/nft-marketplace/hurley",
      description:
        "Embrace the thrill of car racing with our stunning RaddX Car NFTs. The array of cars, lands, and buildings is your road to RaddX Racing Metaverse.",
      title: "Explore Hurley  NFTs | Hurley NFT Collection | Jump.trade",
      image:
        "https://cdn.guardianlink.io/product-hotspot/images/jumptrade/Asia_Largest_Web3_Gaming_Ecosystem_OG_Img.png",
      canonical: process.env.NEXT_PUBLIC_MARKETPLACE_URL,
    },
    {
      pathName: "/tournaments",
      description:
        "Explore the schedule of our upcoming play-to-earn NFT game tournaments. Step into the arena, showcase your gaming prowess, and claim your share of the rewards in the exciting realm of gaming. Get ready for the thrill!",
      title:
        "Jump.trade NFT Game Tournament Schedule: Play, Compete, and Earn Rewards",
      image:
        "https://cdn.guardianlink.io/product-hotspot/images/jumptrade/Asia_Largest_Web3_Gaming_Ecosystem_OG_Img.png",
      canonical: process.env.NEXT_PUBLIC_MARKETPLACE_URL,
    },
    {
      pathName: "/nft-marketplace/live-auction",
      description:
        "Jump.trade is Asia's largest Web3 gaming ecosystem, giving you a holistic gaming experience with games, digital collectibles, & a vast NFT marketplace!",
      title: "Live Auction | Jump.Trade",
      image:
        "https://cdn.guardianlink.io/product-hotspot/images/jumptrade/Asia_Largest_Web3_Gaming_Ecosystem_OG_Img.png",
      canonical: process.env.NEXT_PUBLIC_MARKETPLACE_URL,
    },
    {
      pathName: "/drop/free-mcl-mega-pass",
      description:
        "Claim your FREE Mega Pass to enter and play the $25000 worth of Aptos Tokens MCL Mega Play Tournamen with 100% Winners! Only 25000 Passes are available. Hurry now!",
      title:
        "MCL Mega Play Tournament Pass | Claim Mega Pass For FREE | Jump.trade",
      image:
        "https://cdn.guardianlink.io/product-hotspot/images/drop/MegaPlayPass_Img_1.png",
      canonical: process.env.NEXT_PUBLIC_MARKETPLACE_URL,
    },
    {
      pathName: "/drop/mcl-founder-pass",
      description:
        "Experience unrivaled prestige with the all new MCL Founder Pass. Unlock extraordinary privileges, elevate your status, and indulge in the crest of ownership within the esteemed MCL community. Get your today for limitless opportunities.",
      title:
        "MCL Elite Founder Pass - Unlock Unrivaled Prestige and Limitless Opportunities | Jump.trade",
      image:
        "https://cdn.guardianlink.io/product-hotspot/images/jumptrade/MCLFounderPass_OG_Image.jpg",
      canonical: process.env.NEXT_PUBLIC_MARKETPLACE_URL,
    },
    {
      pathName: "/drop/mcl-fusor-nfts",
      description:
        "Buy The MCL Fusor NFTs to Create Three New NFTs from Two Existing MCL NFTs. MCL Premium Player NFTs, Special Shots NFTs & Fielding Action NFT!",
      title: "MCL Fusor NFTs | MCL Premium Player NFTs | Jump.trade",
      image:
        "https://cdn.guardianlink.io/product-hotspot/images/jumptrade/Fusor_NFT_OG_Image.jpg",
      canonical: process.env.NEXT_PUBLIC_MARKETPLACE_URL,
    },
    {
      pathName: "/drop/mcl-shot-nfts",
      description:
        "The MCL Signature Shot NFTs are motion-captured batting shots that are tradeable, collectible, and playable. Buy your MCL Signature Shots — Mystery Box today!",
      title: "MCL Signature Shots — Mystery Box | Jump.trade",
      image:
        "https://cdn.guardianlink.io/product-hotspot/images/MCL-Action-Shots-banner-with-padding.png",
      canonical: process.env.NEXT_PUBLIC_MARKETPLACE_URL,
    },
    {
      pathName: "/drop/crypto-bat-nfts",
      description:
        "Jump.trade presents an exclusive collection of playable crypto cricket bat NFTs with tradable crypto assets embedded. Buy cricket bat NFTs now!",
      title: "Crypto Bat NFT Drop | Buy Cricket Bat NFTs | Jump.trade",
      image:
        "https://cdn.guardianlink.io/product-hotspot/images/Crypto_bat_OG_Image.jpg",
      canonical: process.env.NEXT_PUBLIC_MARKETPLACE_URL,
    },
    {
      pathName: "/drop/mcl-ball-nfts",
      description:
        "Explore a world of exclusive Ball NFTs and digital collectibles on Jump.trade. Dive into the exciting realm of Gaming digital assets and Get your favorite Ball NFTs today",
      image:
        "https://cdn.guardianlink.io/product-hotspot/images/drops/mclballnft_og.png",
      canonical: process.env.NEXT_PUBLIC_MARKETPLACE_URL,
    },
  ];

  const finalData = metaDetails?.find((data) => data?.pathName === path);
  return finalData;
};
