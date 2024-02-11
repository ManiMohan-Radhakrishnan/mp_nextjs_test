import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { RiExchangeDollarLine } from "react-icons/ri";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { isUserLoggedIn } from "../../redux/reducers/user_reducer";
import { rentNft } from "../../utils/base-methods";
import {
  getRoleInfo,
  getPlayerCategoryInfo,
  getPlayerHandInfo,
  level,
  navigateToExternalLink,
  DEFAULT_REVENUE_SHARE,
  batPower,
} from "../../utils/common";

import GradientCircularLoader from "../loaders/gradient-circular-loader";

import tickAnimation from "../../images/json/Tick.json";
import images from "../../utils/images.json";

import style from "./style.module.scss";
import { EVENT_NAMES, invokeTrackEvent } from "../../utils/track-events";

const RentedCardDetails = ({
  nftDetails,
  data,
  onRentalSuccess = () => {},
  success = false,
  setSuccess = () => {},
  category,
  homePage = false,
}) => {
  const {
    available_levels = [],
    init_level = 0,
    max_level,
    revenue_share = {},
    statistics = {},
    image_url,
    role,
    dominant_hand,
    bowling_style,
    category: nftCategory,
    revoke_mins,
  } = data;

  const isUserSignedIn = useSelector(isUserLoggedIn);

  const [playerLevel, setPlayerLevel] = useState(
    available_levels[0] || init_level
  );
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState({});

  const roleData = getRoleInfo(role, dominant_hand || "");
  const playerCatData = getPlayerCategoryInfo(nftCategory);
  const batData = batPower(nftDetails?.twox_power);

  const playerHandDescription = getPlayerHandInfo(dominant_hand, bowling_style);
  const currentLevelStats = statistics[playerLevel] || [];

  const router = useRouter();
  let isPlayer;
  let isBat;
  let categoryType;

  if (homePage) {
    isPlayer = category == "Bowler" || category == "Batsman" ? "players" : "";
    isBat = category === "Bats" ? "bats" : "";
    categoryType = isPlayer ? "mcl_player" : "mcl_bat";
  } else {
    const { nftType = "players" } = router.query;
    isPlayer = nftType === "players";
    isBat = nftType === "bats";
    categoryType = isPlayer ? "mcl_player" : "mcl_bat";
  }

  const handleChange = (e) => {
    setPlayerLevel(e.target.value);
  };

  const invokeRentNft = async () => {
    setLoading(true);
    let request = {
      nft: {
        categorable_type: categoryType,
        categorable_slug: nftDetails?.categorable_slug,
        level: isPlayer ? playerLevel : 0,
      },
    };
    const {
      bowling_style,
      categorable_type,
      category,
      dominant_hand,
      gender,
      name,
      rent_available,
      rented_count,
      role,
      share_range,
    } = nftDetails;
    try {
      let response = await rentNft(request);
      if (response?.data?.success) {
        invokeTrackEvent(EVENT_NAMES?.BORROW_NFT_CLICKED, {
          bowling_style,
          categorable_type,
          category,
          dominant_hand,
          gender,
          name,
          rent_available,
          role,
          share_range,
        });
        setSuccess(true);
        setSuccessData(response?.data?.data?.rent || {});
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <GradientCircularLoader />
  ) : (
    <>
      {!success ? (
        <>
          <section className={`${style["rental-carc-detail-section"]}`}>
            <article className={`${style["rental-carc-detail-box"]}`}>
              <div className={`${style["rental-carc-detail-header"]}`}>
                <h4 className={`${style["title"]}`}>{data?.name}</h4>
                <div className={`${style["selec-group"]}`}>
                  {isPlayer && available_levels?.length ? (
                    <select value={playerLevel} onChange={handleChange}>
                      {available_levels.map((level) => (
                        <option
                          key={level}
                          value={level}
                        >{`Level ${level}`}</option>
                      ))}
                    </select>
                  ) : (
                    <></>
                  )}
                  <p>
                    <span>
                      <RiExchangeDollarLine />
                    </span>
                    {parseFloat(revenue_share[playerLevel]) ? (
                      <>{`${parseFloat(
                        revenue_share[playerLevel]
                      )}% revenue share`}</>
                    ) : (
                      <>{`${DEFAULT_REVENUE_SHARE} revenue share`}</>
                    )}
                  </p>
                </div>
              </div>
              <div className={`${style["rental-carc-detail-body"]}`}>
                <div className={`${style["image-box"]}`}>
                  {image_url && (
                    <Image
                      unoptimized={true}
                      src={image_url}
                      width={600}
                      height={600}
                      alt="det-image"
                    />
                  )}
                  <article className={style["player_stats"]}>
                    {roleData && (
                      <div className={style["player-type"]}>
                        <Image
                          unoptimized={true}
                          width="600"
                          height="600"
                          src={roleData?.value}
                          alt="Player-status"
                          loading="lazy"
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
                </div>

                <div className={`${style["content-box"]}`}>
                  <h2>
                    {isPlayer ? (
                      `Player Stats ${
                        playerHandDescription
                          ? `(${playerHandDescription})`
                          : ""
                      }`
                    ) : (
                      <></>
                    )}
                    {isBat ? <>{"Bat Stats"}</> : <></>}
                  </h2>

                  {isPlayer && (
                    <p>
                      All level {playerLevel} {data?.name} players will have
                      same stats
                    </p>
                  )}
                  {isPlayer ? <PlayerStats stats={currentLevelStats} /> : <></>}
                  {isBat ? <BatStats stats={nftDetails} /> : <></>}
                </div>
              </div>
            </article>
          </section>
          <article className={`${style["rental-carcbottom-fixed"]}`}>
            <div className={`${style["btn-block"]}`}>
              {isUserSignedIn ? (
                <button
                  disabled={loading || success}
                  // disabled={true}
                  className={`${style["theme-btn"]}`}
                  onClick={invokeRentNft}
                >
                  Borrow NFT
                </button>
              ) : (
                <button
                  className={`${style["theme-btn"]}`}
                  onClick={() => {
                    window.open(
                      `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/signin?redirect=${window.location.href}`,
                      "_self"
                    );
                  }}
                >
                  Sign in
                </button>
              )}
              <p className={`${style["hints"]}`}>
                {/* {`* NFT rental can be revoked only ${
                revoke_mins || ""
              } mins prior to the tournament`} */}
                You cannot return borrowed NFTs for 5 mins before and 15 mins
                after a tournament
              </p>
            </div>
          </article>
        </>
      ) : (
        <RentalSuccessModal
          show={success}
          data={successData}
          onClick={() => {
            navigateToExternalLink(
              `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/rented-nft`,
              "_self"
            );
            // window.open(
            //   `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/rented-nft`,
            //   "_self"
            // );
            onRentalSuccess();
          }}
        />
      )}
    </>
  );
};

const PlayerStats = ({ stats = [] }) => {
  return (
    <ul className={`${style["nft-stats"]}`}>
      {stats.map(({ name, value, maximum }) => (
        <li key={name}>
          <span className={`${style["key"]}`}>{name}</span>
          <span className={`${style["value"]}`}>{`${value}/${maximum}`}</span>
        </li>
      ))}
    </ul>
  );
};

const BatStats = ({ stats = {} }) => {
  return (
    <ul className={`${style["nft-stats"]}`}>
      <li>
        <span className={`${style["key"]}`}>Six Distance</span>
        <span className={`${style["value"]}`}>{stats?.six_distance}</span>
      </li>
      <li>
        <span className={`${style["key"]}`}>2X Power</span>
        <span className={`${style["value"]}`}>{stats?.twox_power}</span>
      </li>
      <li>
        <span className={`${style["key"]}`}>Negative Runs</span>
        <span className={`${style["value"]}`}>{stats?.negative_runs}</span>
      </li>
    </ul>
  );
};

const RentalSuccessModal = ({ show, data = {}, onClick = () => {} }) => {
  const [showStats, setShowStats] = useState(false);
  let { name, core_statistics = {}, asset_url, owner_share, asset_type } = data;
  let roleData = getRoleInfo(
    core_statistics?.role?.value,
    core_statistics?.dominant_hand?.value || "BAT"
  );
  let playerCatData = getPlayerCategoryInfo(core_statistics?.category?.value);
  let levelData = level(core_statistics?.level?.value);

  return show ? (
    <div className={style["modal-box"]}>
      <Lottie
        animationData={tickAnimation}
        className={style["lotti-icon"]}
        loop={false}
      />
      <h4 className="mt-4 w-100 text-center">NFT borrowed successfully</h4>
      <div className="d-flex flex-column gap-2">
        {asset_url && (
          <div className={`${style["image-box"]}`}>
            {asset_type.includes("image") && (
              <Image
                unoptimized={true}
                src={asset_url}
                className={style["nft-img"]}
                alt="Player-level"
                width="300"
                height="300"
                priority={true}
                loading="eager"
                placeholder={"blur"}
                onLoad={() => setShowStats(true)}
                blurDataURL={"/sample.gif"}
              />
            )}
            {asset_type.includes("video") && (
              <video
                loop
                muted
                autoPlay
                playsInline
                src={asset_url}
                className={style["nft-img"]}
                onCanPlay={() => setShowStats(true)}
              />
            )}
            {showStats && (
              <article className={style["player_stats"]}>
                {roleData && (
                  <div className={style["player-type"]}>
                    <Image
                      unoptimized={true}
                      width="600"
                      height="600"
                      src={roleData?.value}
                      alt="Player-status"
                      loading="lazy"
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
                {levelData && (
                  <div className={style["player-level"]}>
                    <h6>{levelData?.name}</h6>
                    <Image
                      unoptimized={true}
                      width="300"
                      height="300"
                      src={levelData?.value}
                      alt="Player-level"
                      priority={true}
                      placeholder={"blur"}
                      blurDataURL={"/sample.gif"}
                    />
                  </div>
                )}
              </article>
            )}
          </div>
        )}
      </div>
      {showStats && (
        <>
          <div className={`${style["rental-carc-detail-header"]}`}>
            <h4 className={`${style["title"]}`}>{name}</h4>
            <div className={`${style["selec-group"]}`}>
              {!isNaN(parseFloat(owner_share)) && (
                <p className="w-100 d-flex justify-content-center">
                  <span>
                    <RiExchangeDollarLine />
                  </span>
                  <>{`${parseFloat(owner_share)}% revenue share`}</>
                </p>
              )}
            </div>
          </div>
          <div className={style["btn-block"]}>
            <button className={style["theme-btn"]} onClick={onClick}>
              View NFTs
            </button>
          </div>
        </>
      )}
    </div>
  ) : (
    <></>
  );
};

export default RentedCardDetails;
