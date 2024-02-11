import _ from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";

import { calculateTimeLeft, currencyFormat } from "../../utils/common";

import BidValue from "../bid-value";
import ToolTip from "../tooltip";
import NFTPutOnSale from "../nft-put-on-sale";
import ShotPitchStatsDirection from "../shot-pitch-stats-direction";
import NFTCounter from "../nft-counter";
import FieldingPitchStatsDirection from "../fielding-pitch-stats-direction";
import BallNftStatsDetails from "../ball-nft-stats-details";

// import cardsvg from "../../images/card-svg.svg";

const NFTBaseDetails = ({
  nft,
  putOnSalePop,
  setPutOnSalePop,
  isQuantityAvailable,
  ownerOrdersList,
  owners,
  nftData,
}) => {
  const router = useRouter();
  const state = useSelector((state) => state.user);

  const { user } = state.data;

  const erc721 = nft?.nft_type === "erc721";
  const isOwner = _.has(nft, "owner_details");
  const availableQuantity = _.get(nft, "owner_details.available_quantity", 0);

  const { days, hours, minutes, seconds } = calculateTimeLeft(nft?.launch_time);

  const [enable, setEnable] = useState(false);

  // console.log(nft?.launch_time, "nft?.launch_time");
  // console.log(enable, "enable");

  var rem_text = "";

  if (days > 0) {
    rem_text += days + "d ";
  }
  if (hours > 0) {
    rem_text += hours + "h ";
  }
  if (minutes > 0) {
    rem_text += minutes + "m ";
  }
  // if (seconds > 0) {
  //   rem_text += seconds + "s ";
  // }

  const popover = () => (
    <Popover>
      <Popover.Body>
        <p className="password-terms">
          {/* Your NFT will be available to be listed for sale in <b>{rem_text}</b> */}
          Your NFT will be available to be listed for sale in{" "}
          <div className="count-reducer">
            <NFTCounter
              time={nft?.launch_time}
              handleEndEvent={() => setEnable(true)}
            />
          </div>
        </p>
      </Popover.Body>
    </Popover>
  );

  const KycPopOver = () => (
    <Popover>
      <Popover.Body>
        <p className="password-terms">
          {user?.kyc_status !== "success"
            ? "Please complete your user verification process to be eligible for listing NFTs for sale."
            : "You do not have permission to initiate this action."}
        </p>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <div className={`creator mt-3 mb-3`}>
        <span
          className="link"
          // onClick={() => {
          //   if (
          //     nftData?.core_statistics?.role?.value?.toLowerCase() ===
          //       "batsman" ||
          //     nftData?.core_statistics?.role?.value?.toLowerCase() === "bowler"
          //   )
          //     return router.push(
          //       `/nft-marketplace/cricket-player-nfts/${nftData?.category_slug}`
          //     );
          //   if (nftData?.core_statistics?.role?.value?.toLowerCase() === "bat")
          //     return router.push(
          //       `/nft-marketplace/cricket-bat-nfts/${nftData?.category_slug}`
          //     );
          //   if (nftData?.core_statistics?.role?.value === "Shot")
          //     return router.push(
          //       `/nft-marketplace/cricket-shot-nfts/${nftData?.category_slug}`
          //     );
          //   if (nftData?.core_statistics?.role?.value === "Fusor")
          //     return router.push(
          //       `/nft-marketplace/cricket-fusor-nfts/${nftData?.category_slug}`
          //     );
          // }}
        >
          {nftData?.category_name}
        </span>{" "}
        | {nftData?.celebrity_name} Exclusive NFTs
        <ToolTip
          icon={<FaCheckCircle size={16} className={`ms-2 check-icon`} />}
          content="Verified Artist"
          placement="right"
        />
      </div>
      <div className={"nft-title-container"}>
        <h1 className={"nft-title"}>{nftData?.name}</h1>
      </div>
      <div className={`text-secondary mt-1 mb-5 nft-desc`}>
        {nftData?.description && <p>{nftData?.description}</p>}
      </div>
      {nftData?.core_statistics?.role?.value === "Shot" && (
        <>
          <hr className="custom-divider dashed-divider" />
          <div className="bottom-content-box">
            <ShotPitchStatsDirection ShotsData={nftData?.core_statistics} />
          </div>
        </>
      )}

      {nftData?.core_statistics?.role?.value === "Ball" && (
        <>
          <hr className="custom-divider dashed-divider" />
          <div className="bottom-content-box">
            <BallNftStatsDetails
              ballAttributes={nftData?.core_statistics?.ability_list?.value}
            />
          </div>
        </>
      )}

      {nftData?.core_statistics?.role?.value === "Fielder" && (
        <>
          <hr className="custom-divider dashed-divider" />
          <div className="bottom-content-box">
            <FieldingPitchStatsDirection
              FieldingData={nftData?.statistics[0]}
            />
          </div>
        </>
      )}

      <div className={"bottom-content"}>
        {erc721 && owners?.length > 0 && (
          <>
            <div className={"d-flex"}>
              <BidValue
                ClassNames="ownerName"
                title="Owned By"
                avatar={owners[0].avatar_url}
                name={owners[0].user_name}
                userSlug={owners[0].slug}
                seller={true}
                owner={owners[0]}
                isEnd
              />
            </div>
          </>
        )}
        <div className="bottom-content-box">
          <div className={"d-flex"}>
            {(() => {
              if (erc721 && isOwner) {
                return (
                  <BidValue
                    title="You Own"
                    value="1 of 1"
                    isLeft
                    isOwner={isOwner}
                  />
                );
              } else if (erc721 && !isOwner) {
                return (
                  <BidValue title="Limited Edition" value="1 of 1" isLeft />
                );
              } else if (!erc721 && isOwner) {
                return (
                  <BidValue
                    title="You Own"
                    value={`${_.get(nft, "owner_details.total_quantity")} / ${
                      nft?.total_quantity
                    }`}
                    isOwner
                  />
                );
              } else {
                return (
                  <BidValue title="Edition(s)" value={nft?.total_quantity} />
                );
              }
            })()}
          </div>
          {nft?.show_crypto_assets && (
            <>
              <hr className="custom-divider" />

              <div className={"d-flex"}>
                <>
                  {" "}
                  <div className="d-flex">
                    <BidValue
                      title="Asset Quantity"
                      value={nft?.asset_quantity}
                      withBlink
                    />
                    <div className="d-flex">
                      <BidValue
                        title="Asset Value"
                        withBlink
                        // value={
                        //   "~" + " " + currencyFormat(nft?.asset_value, "USD")
                        // }
                        value={
                          nft?.asset_value === "-"
                            ? "-"
                            : "~" +
                              " " +
                              currencyFormat(nft?.asset_value, "USD")
                        }
                        toolTip={
                          "The value of crypto assets will fluctuate, sometimes dramatically."
                        }
                      />
                    </div>
                  </div>
                </>
              </div>
              <hr className="custom-divider" />
            </>
          )}

          {nft?.allow_rent && nft?.core_statistics?.role?.value !== "Shot" && (
            <div className="text-center text-danger">
              This NFT has been opted-in for rentals.
            </div>
          )}

          <div className={`text-center d-flex gap-4`}>
            <NFTPutOnSale
              nft={nft}
              putOnSalePop={putOnSalePop}
              setPutOnSalePop={setPutOnSalePop}
              isQuantityAvailable={isQuantityAvailable}
            />

            {(() => {
              if (!user) {
                return (
                  <button
                    disabled={false}
                    className={`btn btn-dark text-center btn-lg mt-2 place-bid-btn`}
                    onClick={() =>
                      window.open(
                        `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/signin?redirect=${window.location.href}`,
                        "_self"
                      )
                    }
                  >
                    Sign In
                  </button>
                );
              } else if (isOwner && ownerOrdersList.length === 0) {
                return user?.kyc_status !== "success" || !nft?.put_on_sale ? (
                  <OverlayTrigger
                    trigger={["click"]}
                    rootClose={true}
                    placement="top"
                    overlay={KycPopOver()}
                  >
                    <button
                      disabled={false}
                      className={`btn btn-dark text-center btn-lg mt-2  place-bid-btn`}
                    >
                      List for sale
                    </button>
                  </OverlayTrigger>
                ) : days === 0 &&
                  hours === 0 &&
                  minutes === 0 &&
                  seconds < 0.2 ? (
                  <>
                    {/* Upgrade button hide */}
                    {/* {nft?.upgradable_cards?.total_needed > 0 ? (
                      <>
                        <button
                          className={`btn text-center mt-2 rounded-pill place-bid-btn upgrade-btn d-flex g-2 ${
                            !nft?.can_upgrade ? "disabled_button" : ""
                          }`}
                          onClick={() =>
                            router.push(
                              `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/mycards`
                            )
                          }
                          disabled={nft?.can_upgrade ? false : true}
                        >
                          <div className="card-svg-icon d-flex">
                            <div className="imgBlock">
                              <Image unoptimized={true}  height={50} width={50} src={cardsvg} alt="card" />
                              <p>{nft?.upgradable_cards?.total_needed}</p>
                            </div>
                            {`Upgrade`}
                          </div>
                        </button>
                      </>
                    ) : (
                      ""
                    )} */}
                    <button
                      disabled={false}
                      className={`btn btn-dark text-center btn-lg mt-2 place-bid-btn`}
                      onClick={() => setPutOnSalePop(!putOnSalePop)}
                    >
                      List for sale
                    </button>
                  </>
                ) : (
                  <OverlayTrigger
                    trigger={["click"]}
                    rootClose={true}
                    placement="top"
                    overlay={popover()}
                  >
                    <button
                      disabled={false}
                      className={`btn btn-dark text-center btn-lg mt-2 place-bid-btn`}
                    >
                      List for sale
                    </button>
                  </OverlayTrigger>
                );
              } else if (isOwner && ownerOrdersList.length > 0) {
                if (isQuantityAvailable != null && isQuantityAvailable > 0) {
                  return user?.kyc_status !== "success" || !nft?.put_on_sale ? (
                    <OverlayTrigger
                      trigger={["click"]}
                      rootClose={true}
                      placement="top"
                      overlay={KycPopOver()}
                    >
                      <button
                        disabled={false}
                        className={`btn btn-dark text-center btn-lg mt-2  place-bid-btn`}
                      >
                        {erc721
                          ? "List for sale"
                          : `List for sale (${
                              isQuantityAvailable
                                ? isQuantityAvailable
                                : availableQuantity
                            })`}
                      </button>
                    </OverlayTrigger>
                  ) : days === 0 &&
                    hours === 0 &&
                    minutes === 0 &&
                    seconds < 0.2 &&
                    enable ? (
                    <>
                      {/* Upgrade button hide */}
                      {/* {nft?.upgradable_cards?.total_needed > 0 ? (
                        <>
                          <button
                            className={`btn text-center mt-2 rounded-pill place-bid-btn upgrade-btn d-flex g-2 ${
                              !nft?.can_upgrade ? "disabled_button" : ""
                            }`}
                            onClick={() =>
                              router.push(
                                `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/mycards`
                              )
                            }
                            disabled={nft?.can_upgrade ? false : true}
                          >
                            <div className="card-svg-icon d-flex">
                              <div className="imgBlock">
                                <Image unoptimized={true}  height={50} width={50} src={cardsvg} alt="card" />
                                <p>{nft?.upgradable_cards?.total_needed}</p>
                              </div>
                              {`Upgrade`}
                            </div>
                          </button>
                        </>
                      ) : (
                        ""
                      )} */}
                      <button
                        disabled={false}
                        className={`btn btn-dark text-center btn-lg mt-2 place-bid-btn`}
                        onClick={() => setPutOnSalePop(!putOnSalePop)}
                      >
                        {erc721
                          ? "List for sale"
                          : `List for sale (${
                              isQuantityAvailable
                                ? isQuantityAvailable
                                : availableQuantity
                            })`}
                      </button>
                    </>
                  ) : (
                    <OverlayTrigger
                      trigger={["click"]}
                      rootClose={true}
                      placement="top"
                      overlay={popover()}
                    >
                      <button
                        disabled={false}
                        className={`btn btn-dark text-center btn-lg mt-2 place-bid-btn`}
                      >
                        {erc721
                          ? "List for sale"
                          : `List for sale (${
                              isQuantityAvailable
                                ? isQuantityAvailable
                                : availableQuantity
                            })`}
                      </button>
                    </OverlayTrigger>
                  );
                } else {
                  return (
                    <button
                      disabled={true}
                      className={`btn btn-dark text-center btn-lg mt-2 place-bid-btn`}
                    >
                      Listed on sale
                    </button>
                  );
                }
              }
            })()}
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTBaseDetails;
