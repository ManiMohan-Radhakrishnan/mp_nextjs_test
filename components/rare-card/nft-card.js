import Image from "next/image";
import Link from "next/link";

import images from "../../utils/images.json";
import { batPower, getRoleInfo } from "../../utils/common";

import style from "./style.module.scss";

const RareCollectionCard = ({
  index,
  nft,
  recentSold = false,
  callbackClick = {},
}) => {
  const roleData = getRoleInfo(
    nft?.core_statistics?.role?.value,
    nft?.core_statistics?.dominant_hand?.value
      ? nft?.core_statistics?.dominant_hand?.value
      : ""
  );
  const batData = batPower(nft?.core_statistics?.twox_power?.value);

  return (
    <article
      onClick={() => callbackClick(index)}
      className={`${style["rare-card"]}`}
    >
      {batData ? (
        <>
          {" "}
          <div className={style["bat-type-2x"]}>
            <Image
              unoptimized={true}
              width="600"
              height="600"
              src={batData?.value}
              alt="Player-status"
              loading="lazy"
              className={style["bat-type-2x-img"]}
              placeholder={"blur"}
              blurDataURL={"/sample.gif"}
            />
          </div>
        </>
      ) : (
        <>
          {roleData && nft?.core_statistics?.role?.value !== "Shot" ? (
            <>
              <div className={style["player-type"]}>
                <Image
                  unoptimized={true}
                  width="600"
                  height="600"
                  src={roleData?.value}
                  alt="Player-status"
                  loading="lazy"
                  className={style["player-type-img"]}
                  placeholder={"blur"}
                  blurDataURL={"/sample.gif"}
                />
              </div>
            </>
          ) : (
            <>
              {!["Fusor"].includes(nft?.core_statistics?.role?.value) && (
                <div className={style["player-type"]}>
                  <Image
                    unoptimized={true}
                    width="600"
                    height="600"
                    src={images?.shot}
                    alt="Player-status"
                    loading="lazy"
                    className={style["player-type-img"]}
                    placeholder={"blur"}
                    blurDataURL={"/sample.gif"}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* <Link
        href={(() => {
          if (recentSold) {
            return `/order/details/${nft?.slug}/${nft?.order_slug}`;
          } else {
            // return `/nft-marketplace/details/${nft?.slug}`;
          }
        })()}
      > */}
      <Image
        unoptimized={true}
        width="600"
        height="600"
        className={style["nft-card-img"]}
        alt="media_logo"
        src={(() => {
          if (nft?.asset_type?.includes("image")) {
            return nft.asset_url ? nft.asset_url : "/sample.gif";
          } else if (nft?.cover_url) {
            return nft.cover_url ? nft.cover_url : "/sample.gif";
          } else {
            return nft.asset_url ? nft.asset_url : "/sample.gif";
          }
        })()}
        role="button"
        priority={true}
        placeholder={"blur"}
        blurDataURL={"/sample.gif"}
      />
      {/* </Link> */}
      <div className={style["nft-card-info"]}>
        {nft?.core_statistics?.role?.value !== "Shot" ? (
          <>
            <h5 className={style["rare-nft-title"]}>
              {nft?.name.split("#")[0]}
            </h5>
            <h5 className={style["rare-nft-subtitle"]}>
              #{nft?.name.split("#")[1]}
            </h5>
          </>
        ) : (
          <>
            {" "}
            <h5 className={style["rare-nft-shot-title"]}>{nft?.name}</h5>
          </>
        )}
      </div>
    </article>
  );
};

export default RareCollectionCard;
