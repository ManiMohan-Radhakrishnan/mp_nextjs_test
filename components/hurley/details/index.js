import _ from "lodash";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Header from "../../header";
import Footer from "../../footer";
import BidHistory from "../bid-history";
import NFTMedia from "../nft-media";
import NFTBaseDetails from "../nft-basic-details";
import NFTSectionTitle from "../nft-section-title";
import NFTProperties from "../nft-properties";
import ChainAttributes from "../chain-attributes";
import NFTArtist from "../nft-artist";
import NFTPlayerStats from "../nft-player-stats";
import NFTTags from "../../nft-tags";
import toaster from "../../../utils/toaster";
import OwnerList from "../owner-list";
import NFTOrderDetails from "../../nft-order-details/index";
import useWindowUtils from "../../../hooks/useWindowUtils";
import { NFTLoader } from "../../nft-basic-details/content-loader";
import {
  listForSaleDetail,
  ownerDetails,
} from "../../../utils/actioncable-methods";
import { artistApi } from "../../../utils/base-methods";
import {
  nftDetailApi,
  nftOwnerApi,
  nftTransactionHistory,
  nftUpgradeHistory,
} from "../../../utils/methods";

const Details = ({ nftData }) => {
  const router = useRouter();
  const { slug } = router.query;

  const [nft, setNft] = useState({});
  const [nftOwner, setNFTOwner] = useState([]);
  const [erc721, setErc721] = useState(false);
  const [loader, setLoader] = useState(false);
  const [ownerLoader, setOwnerLoader] = useState(true);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [transactionLoader, setTransactionLoader] = useState(false);
  const [transactionHasNext, setTransactionHasNext] = useState(false);
  const [putOnSalePop, setPutOnSalePop] = useState(false);
  const [ownerOrdersList, setOwnerOrdersList] = useState([]);
  const [ownerCount, setOwnerCount] = useState(0);
  const [isQuantityAvailable, setIsQuantityAvailable] = useState(null);
  // const [page, setPage] = useState(1);
  const [artist, setArtist] = useState({});

  //NFT Upgrade Details

  const [upgradeHistory, setUpgradeHistory] = useState([]);
  const [upgradeLoader, setUpgradeLoader] = useState(false);
  const [upgradeHasNext, setUpgradeHasNext] = useState(false);

  const { user } = useSelector((state) => state.user.data);
  const isOwner = _.has(nft, "owner_details");
  const availableQty = _.get(nft, "owner_details.available_quantity", 0);
  const windowUtils = useWindowUtils();

  useEffect(() => {
    // document.body.scrollTop = document.documentElement.scrollTop = 0;

    if (slug) {
      nftDetail(slug);
      nftOwners();
      nftTransaction();
      nftUpgradeDetails();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (isOwner && availableQty && user?.kyc_status === "success") {
      if (windowUtils.hash === "#list-for-sale") {
        setPutOnSalePop(!putOnSalePop);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOwner, availableQty]);

  useEffect(() => {
    if (user && isOwner) {
      listForSaleDetail(slug, user.slug, (data) => {
        setIsQuantityAvailable(data.available);
        setOwnerOrdersList((ownerOrdersList) => [
          data.order,
          ...ownerOrdersList,
        ]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOwner]);

  useEffect(() => {
    ownerDetails(slug, (data) => {
      // console.log(data);
      // if (data?.owners?.length > 0) {
      //   let owners = [...nftOwner];
      //   const latest = data.owners?.[0];
      //   const index = owners.findIndex((obj) => obj.slug === latest.slug);
      //   console.log(index, "index");
      //   if (index !== -1) {
      //     let owner = {
      //       ...owners[index],
      //       sold_quantity: latest.sold_quantity,
      //     };
      //     owners[index] = owner;
      //     setNFTOwner(owners);
      //   } else {
      //     setNFTOwner((nftOwner) => [latest, ...nftOwner]);
      //   }
      // }
      nftOwners();
      nftTransaction();
      nftUpgradeDetails();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nftDetail = async (slug) => {
    try {
      setLoader(true);
      let response = await nftDetailApi({
        nft_slug: slug,
      });
      const NFT = response.data.data.nft;
      setNft(NFT);
      setErc721(NFT.nft_type === "erc721");
      if (NFT.owner_details) {
        setIsQuantityAvailable(NFT.owner_details.available_quantity);
        setOwnerOrdersList(NFT.owner_details.orders);
      }
      if (NFT.celebrity_slug) {
        artistDetail(NFT.celebrity_slug);
      }
      setLoader(false);
    } catch (err) {
      // setLoader(false);
      console.log(err);
      toaster(
        500,
        "The request could not be processed at this time. Please try again."
      );
    }
  };

  const nftOwners = async () => {
    try {
      setOwnerLoader(true);
      let owners = await nftOwnerApi({ nft_slug: slug, page: 1 });
      setNFTOwner(owners.data.data.owners);
      setOwnerCount(owners.data.data.total_count);
      setOwnerLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const nftUpgradeDetails = async () => {
    try {
      setUpgradeLoader(true);
      let transactions = await nftUpgradeHistory({
        nft_slug: slug,
        page: 1,
      });
      setUpgradeHistory(transactions.data.data.histories);
      setUpgradeHasNext(transactions.data.data.next_page);
      setUpgradeLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const nftTransaction = async () => {
    try {
      setTransactionLoader(true);
      let transactions = await nftTransactionHistory({
        nft_slug: slug,
        page: 1,
      });
      setTransactionHistory(transactions.data.data.nfts);
      setTransactionHasNext(transactions.data.data.next_page);
      setTransactionLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const artistDetail = async (slug) => {
    try {
      let response = await artistApi(slug);
      // console.log(response);
      setArtist(response.data.data.celebrity);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {nftData?.name && (
        <Header
          bgImage
          title={`${nftData?.name} | Jump.trade`}
          description={`${nftData?.name} is a Meta Cricket League ${nftData?.core_statistics?.role?.value} Playable NFT! Purchase This NFT Now to Play the MCL P2E Cricket Game & Win Cash Rewards!`}
          image={
            nftData?.asset_type?.includes("image")
              ? nftData?.asset_url
              : nftData?.cover_url
          }
        />
      )}
      {loader ? (
        <NFTLoader />
      ) : (
        <section className="detail-page-content background-set">
          <div className="bid_section_wrapper">
            <div className="container-fluid">
              <div className="row fit-to-height">
                <div className="col-12 col-lg-7">
                  <NFTMedia
                    nft={nftData}
                    title={nftData?.name}
                    slug={nftData?.slug}
                    isFav={nft?.is_user_fav}
                    statistics={nftData?.core_statistics}
                  />
                </div>
                <div className="col-12 col-lg-5">
                  <NFTBaseDetails
                    nft={nft}
                    putOnSalePop={putOnSalePop}
                    setPutOnSalePop={setPutOnSalePop}
                    isQuantityAvailable={isQuantityAvailable}
                    ownerOrdersList={ownerOrdersList}
                    owners={nftOwner}
                    nftData={nftData}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="property_section_wrapper">
            <div className="container-fluid">
              {isOwner && ownerOrdersList.length > 0 && (
                <>
                  <NFTSectionTitle title="ORDER DETAILS" />
                  <div className="row mt-5">
                    <NFTOrderDetails nft={nft} orderList={ownerOrdersList} />
                  </div>
                </>
              )}

              <NFTSectionTitle title="NFT DETAILS" />
              <div className="row mt-5">
                <div className="col-12 col-lg-6 order-lg-2 order-2 mb-4">
                  {(() => {
                    if (erc721) {
                      return (
                        nftOwner?.length > 0 && (
                          <BidHistory
                            nft={nft}
                            isOwner={isOwner}
                            // nftOwner={nftOwner[0]}
                            nftOwner={nftOwner?.length ? nftOwner[0] : {}}
                            // Transaction History
                            transactionHistory={transactionHistory}
                            transactionLoader={transactionLoader}
                            transactionHasNext={transactionHasNext}
                            // Upgrade History
                            setUpgradeHistory={setUpgradeHistory}
                            setUpgradeHasNext={setUpgradeHasNext}
                            upgradeHistory={upgradeHistory}
                            upgradeLoader={upgradeLoader}
                            upgradeHasNext={upgradeHasNext}
                          />
                        )
                      );
                    } else {
                      return (
                        nftOwner?.length > 0 && (
                          <OwnerList
                            isLoading={ownerLoader}
                            nft={nft}
                            nftOwners={nftOwner}
                            totalCount={ownerCount}
                            // Transaction History
                            transactionHistory={transactionHistory}
                            transactionLoader={transactionLoader}
                            transactionHasNext={transactionHasNext}
                            // Upgrade History
                            upgradeHistory={upgradeHistory}
                            upgradeLoader={upgradeLoader}
                            upgradeHasNext={upgradeHasNext}
                          />
                        )
                      );
                    }
                  })()}
                </div>
                <div className="col-12 col-lg-6 order-lg-1 order-1">
                  {nftData?.properties?.length > 0 && (
                    <NFTProperties
                      properties={nftData?.properties}
                      statistics={nftData?.core_statistics}
                    />
                  )}
                  <div className="mt-5"></div>
                  <ChainAttributes chains={nftData?.chain_attributes} />

                  {nftData?.core_statistics?.role?.value !== "Shot" &&
                    nftData?.core_statistics &&
                    nftData?.statistics.length > 0 && (
                      <>
                        <div className="mt-5"></div>
                        <NFTPlayerStats
                          nftData={nftData}
                          stats={nftData?.statistics}
                          core={nftData?.core_statistics}
                        />
                      </>
                    )}
                  {nftData?.tag_names?.length > 0 && (
                    <>
                      <div className="mt-5"></div>
                      {/* <NFTTags tags={nftData?.tag_names} /> */}
                    </>
                  )}
                  {/* {nft?.comic?.length > 0 && (
                    <>
                      <div className="mt-5"></div>
                      <AdditionalPerks comics={nft.comic} />
                    </>
                  )} */}
                </div>
              </div>
              {artist?.show_artist && (
                <>
                  <NFTSectionTitle title={artist?.title} />
                  <div className="mt-5">
                    <NFTArtist id={nft.celebrity_id} artist={artist} />
                  </div>
                  <br />
                  <br />
                </>
              )}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default Details;
