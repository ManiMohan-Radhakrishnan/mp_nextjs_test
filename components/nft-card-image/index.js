import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, OverlayTrigger } from "react-bootstrap";

import style from "./style.module.scss";
import images from "../../utils/images.json";
import NFTCounter from "../nft-counter";
import { batPower, currencyFormat, Nationality } from "../../utils/common";
import { add_to_cart_thunk } from "../../redux/thunk/user_cart_thunk";
import { level, getRoleInfo, getPlayerCategoryInfo } from "../../utils/common";
import { BsFillTrophyFill } from "react-icons/bs";

const NFTCardImage = ({
  className,
  topClassName,
  nft,
  ownedCard = false,
  recentSold = false,
  liveAuction = false,
  favouriteNFTs = false,
  onsale = false,
  textColor,
  reloadNFTList,
  isExplore = false,
  relativeUrl = "",
  searchPrefix = "",
  exploreSlug = "",
  isFaltoo = false,
  clientUrl = "",
  faved = false,
  imageUrl,
}) => {
  const [imageloaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`${style["more-card"]} ${style["jt-card"]} ${style[className]} ${style[topClassName]} `}
    >
      <Link
        legacyBehavior
        href={(() => {
          if (recentSold) {
            return `/order/details/${nft?.slug}/${nft?.order_slug}`;
          } else {
            return `/nft-marketplace/details/${nft?.slug}`;
          }
        })()}
      >
        {/* <a> */}
        <Image
          unoptimized={true}
          width="300"
          height="300"
          priority={true}
          loading="eager"
          placeholder={"blur"}
          blurDataURL={imageUrl? imageUrl : "/sample.gif"}
          alt="media_logo"
          src={(() => {
            if (nft?.asset_type?.includes("image")) {
              return nft.asset_url ? nft.asset_url : imageUrl;
            } else if (nft?.cover_url) {
              return nft.cover_url ? nft.cover_url : imageUrl;
            } else {
              return nft.asset_url ? nft.asset_url : imageUrl;
            }
          })()}
          role="button"
          onLoad={() => setImageLoaded(true)}
        />
        {/* </a> */}
      </Link>
    </div>
  );
};

export default NFTCardImage;
