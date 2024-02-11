import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { AiOutlineDollarCircle } from "react-icons/ai";

import {
  batPower,
  getPlayerCategoryInfo,
  getRoleInfo,
} from "../../utils/common";
import { getRentedNftList } from "../../utils/base-methods";

import RentNftDetailCanvas from "../rental-nft-detail-canvas";

import NftCard from "../../images/nft-card.webp";
import images from "../../utils/images.json";

import style from "./style.module.scss";

const RentalCard = ({ details }) => {
  const [show, setShow] = useState(false);
  const [rentNftDetails, setRentNftDetails] = useState({});
  const router = useRouter();
  const { nftType = "players" } = router.query;
  const isPlayer = nftType === "players";
  const isBat = nftType === "bats";
  let category = isPlayer ? "mcl_player" : "mcl_bat";

  const roleData = getRoleInfo(
    isPlayer ? details?.role : "",
    details?.dominant_hand ? details?.dominant_hand : ""
  );

  const [imageloaded, setImageLoaded] = useState(false);

  // const batData = batPower(
  //   isBat ? details?.role : "",
  //   details?.dominant_hand ? details?.dominant_hand : ""
  // );

  // const roleData = getRoleInfo(
  //   details?.role,
  //   details?.dominant_hand ? details?.dominant_hand : "BAT"
  // );

  const batData = batPower(details?.twox_power);

  const playerCatData = getPlayerCategoryInfo(details?.category);
  const isRentDisabled = details?.rent_available === 0;

  const handleHideCanvas = () => {
    setRentNftDetails({});
    setShow(false);
  };

  const handleNftDetails = async (slug) => {
    if (isRentDisabled) return;
    try {
      const response = await getRentedNftList({ slug, category });
      if (isPlayer && response?.data?.data?.player) {
        setRentNftDetails(response?.data?.data?.player || {});
        setShow(true);
      }
      if (isBat && response?.data?.data?.bat) {
        setRentNftDetails(response?.data?.data?.bat || {});
        setShow(true);
      }
    } catch (error) {
      console.error("Error in fetching the NFT detail", error);
    }
  };

  return (
    <>
      <article
        className={`${style["rental-card"]} ${
          isRentDisabled ? style["rental-card-disabled"] : ""
        }`.trim()}
      >
        <>
          <article className={style["player_stats"]}>
            {roleData && (
              <div className={style["player-type"]}>
                <Image
                  unoptimized={true}
                  width="300"
                  height="300"
                  loading="eager"
                  src={roleData?.value}
                  alt="Player-type"
                  priority={true}
                  placeholder={"blur"}
                  blurDataURL={"/sample.gif"}
                />
              </div>
            )}

            {batData && (
              <div className={style["bat-type-2x"]}>
                <Image
                  unoptimized={true}
                  width="300"
                  height="300"
                  loading="eager"
                  src={batData?.value}
                  alt="Player-type"
                  priority={true}
                  placeholder={"blur"}
                  blurDataURL={"/sample.gif"}
                />
              </div>
            )}

            {playerCatData && (
              <div className={style["player-range"]}>
                <span
                  className={style["band"]}
                  style={{
                    background: playerCatData?.textColor
                      ? playerCatData?.textColor
                      : "",
                  }}
                >
                  {playerCatData?.value}
                </span>
              </div>
            )}
          </article>
          <div className={`${style["rental-img-box"]}`}>
            {details?.image_url && (
              <Image
                unoptimized={true}
                src={details?.image_url}
                width={600}
                height={600}
                alt="card_image"
                onClick={() => handleNftDetails(details?.categorable_slug)}
                priority={true}
                loading="eager"
                placeholder="blur"
                blurDataURL={"/sample.gif"}
                onLoad={() => setImageLoaded(true)}
              />
            )}
          </div>
          <div className={`${style["rental-content-box"]}`}>
            <h4>{details?.name}</h4>
            <h6>
              {" "}
              {details?.rent_available ? (
                <span>{details?.rent_available}</span>
              ) : (
                "No"
              )}{" "}
              {` ${isPlayer ? "players" : "bats"} available`}
            </h6>
            <h6>
              {" "}
              <AiOutlineDollarCircle /> {details?.share_range} revenue share
            </h6>

            {/* <div className={`${style["rented-count-flex"]}`}>
              <h6>
                <span className={`${style["key"]}`}> Available</span>
                <span
                  className={`${style["value"]}`}
                >{`${details?.rent_available}`}</span>
              </h6>
              <h6>
                <span className={`${style["key"]}`}> Rented</span>
                <span
                  className={`${style["value"]}`}
                >{`${details?.rented_count} `}</span>
              </h6>
            </div> */}
          </div>
          <RentNftDetailCanvas
            details={details}
            data={rentNftDetails}
            show={show}
            onHide={handleHideCanvas}
          />
        </>
      </article>
    </>
  );
};

export default RentalCard;
