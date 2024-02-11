import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import _ from "lodash";
import {
  nftActiveOrders,
  nftDetailApi,
  nftOwnerApi,
  nftTransactionHistory,
  nftUpgradeHistory,
} from "../../../utils/methods";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import NFTMedia from "../../../components/nft-media";
import NFTBaseDetails from "../../../components/nft-basic-details";
import NFTSectionTitle from "../../../components/nft-section-title";
import NFTProperties from "../../../components/nft-properties";
import ChainAttributes from "../../../components/chain-attributes";
import NFTPlayerStats from "../../../components/nft-player-stats";
import NFTTags from "../../../components/nft-tags";
import BidHistory from "../../../components/bid-history";
import NFTOrderDetails from "../../../components/nft-order-details";
import OwnerList from "../../../components/owner-list";
import { errorRedirect } from "../../../utils/common";

const Details = ({
  nft,
  isOrder = false,
  nftOwner = [],
  ownerCount,
  transactionHistory,
  transactionHasNext,
  upgradeHistory,
  upgradeHasNext,
}) => {
  const router = useRouter();
  const [putOnSalePop, setPutOnSalePop] = useState(false);
  const [isQuantityAvailable, setIsQuantityAvailable] = useState(null);
  const [ownerOrdersList, setOwnerOrdersList] = useState([]);

  //NFT Upgrade Details
  const [upgradeLoader, setUpgradeLoader] = useState(false);

  const { user } = useSelector((state) => state.user.data);
  const isOwner = _.has(nft, "owner_details");
  const availableQty = _.get(nft, "owner_details.available_quantity", 0);

  return (
    <>
      <Header
        bgImage
        title={`${nft?.name} | MCL NFT Marketplace | Jump.trade`}
        description={`${nft?.name} is a Meta Cricket League ${nft?.core_statistics?.role?.value} Playable NFT! Purchase This NFT Now to Play the MCL P2E Cricket Game & Win Cash Rewards!`}
        image={
          nft?.asset_type?.includes("image") ? nft?.asset_url : nft?.cover_url
        }
      />
      <section className="detail-page-content background-set">
        <div className="bid_section_wrapper">
          <div className="container-fluid">
            <div className="row fit-to-height">
              <div className="col-12 col-lg-7">
                <NFTMedia
                  nft={nft}
                  title={nft?.name}
                  slug={nft?.slug}
                  isFav={nft?.is_user_fav}
                  statistics={nft?.core_statistics}
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
                  if (nft?.nft_type === "erc721") {
                    return (
                      nftOwner?.length > 0 && (
                        <BidHistory
                          nft={nft}
                          isOwner={isOwner}
                          // nftOwner={nftOwner[0]}
                          nftOwner={nftOwner?.length ? nftOwner[0] : {}}
                          // Transaction History
                          transactionHistory={transactionHistory}
                          // transactionLoader={transactionLoader}
                          transactionHasNext={transactionHasNext}
                          // Upgrade History
                          // setUpgradeHistory={setUpgradeHistory}
                          // setUpgradeHasNext={setUpgradeHasNext}
                          upgradeHistory={upgradeHistory}
                          // upgradeLoader={upgradeLoader}
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
                {nft?.properties?.length > 0 && (
                  <NFTProperties
                    properties={nft?.properties}
                    statistics={nft?.core_statistics}
                  />
                )}

                <div className="mt-5"></div>
                <ChainAttributes chains={nft?.chain_attributes} />

                {nft?.core_statistics && nft?.statistics.length > 0 && (
                  <>
                    <div className="mt-5"></div>
                    <NFTPlayerStats
                      nftData={nftData}
                      stats={nft?.statistics}
                      core={nft?.core_statistics}
                    />
                  </>
                )}

                {nft?.tag_names?.length > 0 && (
                  <>
                    <div className="mt-5"></div>
                    <NFTTags tags={nft?.tag_names} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Details;

export async function getServerSideProps(context) {
  const { slug } = context.query;
  let props = {};
  try {
    let page = 1;
    let activeOrders = await nftActiveOrders({
      nft_slug: slug,
    });

    if (activeOrders?.data?.data?.orders.length) {
      const [orderSlug] = activeOrders?.data?.data?.orders;
      let [nft] = await Promise.all([
        nftDetailApi({
          nft_slug: slug,
          order_slug: orderSlug,
        }),
      ]);
      props = {
        nft: nft?.data?.data?.nft,
        isOrder: true,
      };
    } else {
      let [nft, owners, transactions, upgradeHistory] = await Promise.all([
        nftDetailApi({
          nft_slug: slug,
        }),
        nftOwnerApi({ nft_slug: slug, page }),
        nftTransactionHistory({
          nft_slug: slug,
          page,
        }),
        nftUpgradeHistory({
          nft_slug: slug,
          page,
        }),
      ]);

      props = {
        nft: nft?.data?.data?.nft,
        isOrder: false,
        nftOwner: owners?.data?.data?.owners,
        ownerCount: owners?.data?.data?.total_count,
        transactionHistory: transactions?.data?.data?.nfts,
        transactionHasNext: transactions?.data?.data?.next_page,
        upgradeHistory: upgradeHistory?.data?.data?.histories,
        upgradeHasNext: upgradeHistory?.data?.data?.next_page,
      };
    }
  } catch (err) {
    console.error("Error", err);
    // return errorRedirect(err?.status);
  }
  return { props };
}
