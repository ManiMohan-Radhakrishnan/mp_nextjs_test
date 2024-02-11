import ContentLoader from "react-content-loader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import NFTCard from "../nft-card/index";
import RaddxNFTCard from "../raddx/nft-card/index";
import style from "./style.module.scss";
import {
  sellerFavedNFTSApi,
  sellerOwnedNFTsApi,
  userOnsaleNFTsApi,
} from "../../utils/methods";
import RecentSoldLoader from "../loaders/recentSoldCardLoader";
import { CELEBRITIES } from "../../utils/celebrity-config";
import { BiLock, BiXCircle } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import HurleyNFTCard from "../hurley/nft-card";

const UserDetailsBlock = ({ userDetail }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [key, setKey] = useState("onsale");
  const [ownPage, setOwnPage] = useState(1);
  const [favPage, setFavPage] = useState(1);
  const [onsalePage, setOnsalePage] = useState(1);
  const [ownedLoading, setOwnedLoading] = useState(false);
  const [onsaleLoading, setOnsaleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [favedLoadingMore, setFavedLoadingMore] = useState(false);
  const [onsaleLoadingMore, setOnsaleLoadingMore] = useState(false);
  const [ownedList, setOwnedList] = useState([]);
  const [favedList, setFavedList] = useState([]);
  const [onsaleList, setOnsaleList] = useState([]);

  const [favedCount, setFavedCount] = useState(0);

  const [ownedCount, setOwnedCount] = useState(0);
  const [onsaleCount, setOnsaleCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasNextFaved, setHasNextFaved] = useState(false);
  const [hasNextOnsale, setHasNextOnsale] = useState(false);
  const [privateNfts, setPrivateNfts] = useState();

  //const { user } = useSelector((state) => state.user.data);

  const getSellerOwnedNFTs = async (page) => {
    try {
      page === 1 && setOwnedLoading(true);
      setLoadingMore(true);
      const result = await sellerOwnedNFTsApi({ slug, page });
      setOwnedList([...ownedList, ...result.data.data.nfts]);

      setOwnedCount(result.data.data.total_count);
      setHasNext(result.data.data.next_page);
      page === 1 && setOwnedLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.log(error);
      setOwnedLoading(false);
    }
  };

  const getSellerFavedNFTs = async (page) => {
    try {
      page === 1 && setLoading(true);
      setFavedLoadingMore(true);
      const result = await sellerFavedNFTSApi({ slug, page });
      setFavedList([...favedList, ...result.data.data.nfts]);
      setFavedCount(result.data.data.total_count);
      setHasNextFaved(result.data.data.next_page);
      page === 1 && setLoading(false);
      setFavedLoadingMore(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getUserOnsaleNFTs = async (page) => {
    try {
      page === 1 && setOnsaleLoading(true);
      setOnsaleLoadingMore(true);
      const result = await userOnsaleNFTsApi({ slug, page });
      setOnsaleList([...onsaleList, ...result.data.data.nfts]);
      setPrivateNfts(result.data.data.private_user);

      setOnsaleCount(result.data.data.total_count);
      setHasNextOnsale(result.data.data.next_page);
      page === 1 && setOnsaleLoading(false);
      setOnsaleLoadingMore(false);
    } catch (error) {
      // console.log(error);
      setOnsaleLoading(false);
    }
  };

  useEffect(() => {
    slug && getUserOnsaleNFTs(onsalePage);
    slug && getSellerOwnedNFTs(ownPage);
    slug && getSellerFavedNFTs(favPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchMoreOwnedNFTs = () => {
    if (hasNext) {
      getSellerOwnedNFTs(ownPage + 1);
      setOwnPage(ownPage + 1);
    }
  };

  const fetchMoreFavedNFTs = () => {
    if (hasNextFaved) {
      getSellerFavedNFTs(favPage + 1);
      setFavPage(favPage + 1);
    }
  };

  const fetchMoreOnsaleNFTs = () => {
    if (hasNextOnsale) {
      getUserOnsaleNFTs(onsalePage + 1);
      setOnsalePage(onsalePage + 1);
    }
  };

  return (
    <>
      <section className={style["user-details-block"]}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={style["user-flexblock"]}>
                <div className={style["user-collection-box"]}>
                  <div className="row">
                    <div className="col-sm-12">
                      {/* Place tab and filter here */}
                      <ul className={`nav ${style["user-block-nav"]}`}>
                        <li className={style["nav-item"]}>
                          <span
                            className={`${style["nav-link"]} ${
                              key === "onsale" ? `${style["active"]}` : ""
                            }`}
                            aria-current="page"
                            role="button"
                            onClick={() => setKey("onsale")}
                          >
                            Onsale{" "}
                            {!privateNfts ? `(${onsaleCount})` : <BiLock />}
                          </span>
                        </li>
                        <li className={style["nav-item"]}>
                          <span
                            className={`${style["nav-link"]} ${
                              key === "owned" ? `${style["active"]}` : ""
                            }`}
                            aria-current="page"
                            role="button"
                            onClick={() => setKey("owned")}
                          >
                            Owned{" "}
                            {!privateNfts ? `(${ownedCount})` : <BiLock />}
                          </span>
                        </li>
                        <li className={style["nav-item"]}>
                          <span
                            className={`${style["nav-link"]}${
                              key === "liked" ? ` ${style["active"]}` : ""
                            }`}
                            aria-current="page"
                            role="button"
                            onClick={() => setKey("liked")}
                          >
                            Favorites{" "}
                            {!privateNfts ? `(${favedCount})` : <BiLock />}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    {(() => {
                      if (key === "owned") {
                        return !ownedLoading ? (
                          ownedList.length > 0 ? (
                            <>
                              {ownedList.map((nft, i) => {
                                const isMcl =
                                  nft?.game_name === CELEBRITIES.mcl.gameName;
                                const isRaddx =
                                  nft?.game_name === CELEBRITIES.raddx.gameName;
                                const isHurley =
                                  nft?.game_name ===
                                  CELEBRITIES.hurley.gameName;
                                return (
                                  <div
                                    className="col-xl-3 col-lg-3 col-md-4 col-sm-6"
                                    key={`owned-${i}`}
                                  >
                                    {isMcl ? (
                                      <NFTCard nft={nft} ownedCard={true} />
                                    ) : isRaddx ? (
                                      <RaddxNFTCard
                                        nft={nft}
                                        ownedCard={true}
                                      />
                                    ) : isHurley ? (
                                      <HurleyNFTCard
                                        nft={nft}
                                        ownedCard={true}
                                      />
                                    ) : (
                                      <NFTCard nft={nft} ownedCard={true} />
                                    )}
                                  </div>
                                );
                              })}

                              {!ownedLoading && loadingMore && (
                                <RecentSoldLoader />
                              )}

                              {hasNext && (
                                <div className="row mb-5">
                                  <div className="col-md-12 text-center">
                                    <button
                                      className={style["load_more"]}
                                      disabled={loadingMore}
                                      onClick={fetchMoreOwnedNFTs}
                                    >
                                      {loadingMore ? "Loading..." : "Load More"}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              {privateNfts ? (
                                <>
                                  <div className="col-12 text-center">
                                    <BiLock size={70} />
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="col-12 text-center">
                                    <h3 className="my-3">No Owned NFTs Yet!</h3>
                                  </div>
                                </>
                              )}
                            </>
                          )
                        ) : (
                          <RecentSoldLoader />
                        );
                      } else if (key === "liked") {
                        return !loading ? (
                          favedList.length > 0 ? (
                            <>
                              {favedList.map((nft, i) => {
                                const isMcl =
                                  nft?.game_name === CELEBRITIES.mcl.gameName;
                                const isRaddx =
                                  nft?.game_name === CELEBRITIES.raddx.gameName;
                                const isHurley =
                                  nft?.game_name ===
                                  CELEBRITIES.hurley.gameName;
                                return (
                                  <div
                                    className="col-xl-3 col-lg-3 col-md-4 col-sm-6"
                                    key={`liked-${i}`}
                                  >
                                    {isMcl ? (
                                      <NFTCard nft={nft} faved={true} />
                                    ) : isRaddx ? (
                                      <RaddxNFTCard nft={nft} faved={true} />
                                    ) : isHurley ? (
                                      <HurleyNFTCard nft={nft} faved={true} />
                                    ) : (
                                      <NFTCard nft={nft} faved={true} />
                                    )}
                                  </div>
                                );
                              })}

                              {!loading && favedLoadingMore && (
                                <RecentSoldLoader />
                              )}

                              {hasNextFaved && (
                                <div className="row mb-5">
                                  <div className="col-md-12 text-center">
                                    <button
                                      className={style["load_more"]}
                                      disabled={favedLoadingMore}
                                      onClick={fetchMoreFavedNFTs}
                                    >
                                      {favedLoadingMore
                                        ? "Loading..."
                                        : "Load More"}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              {privateNfts ? (
                                <>
                                  <div className="col-12 text-center">
                                    <BiLock size={70} />
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="col-12 text-center">
                                    <h3 className="my-3">No Favorites Yet!</h3>
                                  </div>
                                </>
                              )}
                            </>
                          )
                        ) : (
                          <RecentSoldLoader />
                        );
                      } else if (key === "onsale") {
                        return !onsaleLoading ? (
                          onsaleList.length > 0 ? (
                            <>
                              {onsaleList.map((nft, i) => {
                                const isMcl =
                                  nft?.game_name === CELEBRITIES.mcl.gameName;
                                const isRaddx =
                                  nft?.game_name === CELEBRITIES.raddx.gameName;
                                const isHurley =
                                  nft?.game_name ===
                                  CELEBRITIES.hurley.gameName;
                                return (
                                  <div
                                    className="col-xl-3 col-lg-3 col-md-4 col-sm-6"
                                    key={`onsale-${i}`}
                                  >
                                    {isMcl ? (
                                      <NFTCard nft={nft} />
                                    ) : isRaddx ? (
                                      <RaddxNFTCard nft={nft} />
                                    ) : isHurley ? (
                                      <HurleyNFTCard nft={nft} />
                                    ) : (
                                      <NFTCard nft={nft} />
                                    )}
                                  </div>
                                );
                              })}

                              {!onsaleLoading && onsaleLoadingMore && (
                                <RecentSoldLoader />
                              )}

                              {hasNextOnsale && (
                                <div className="row mb-5">
                                  <div className="col-md-12 text-center">
                                    <button
                                      className={style["load_more"]}
                                      disabled={onsaleLoadingMore}
                                      onClick={fetchMoreOnsaleNFTs}
                                    >
                                      {onsaleLoadingMore
                                        ? "Loading..."
                                        : "Load More"}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              {privateNfts ? (
                                <>
                                  <div className="col-12 text-center">
                                    <BiLock size={70} />
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="col-12 text-center">
                                    <h3 className="my-3">No Orders Yet!</h3>
                                  </div>
                                </>
                              )}
                            </>
                          )
                        ) : (
                          <RecentSoldLoader />
                        );
                      }
                    })()}
                  </div>
                </div>
              </div>
            </div>
            {/* )} */}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserDetailsBlock;
