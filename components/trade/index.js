import { useEffect, useState } from "react";
import { getUpgradeActiveSaleDetails } from "../../utils/base-methods";
import RecentSoldLoader from "../loaders/recentSoldCardLoader";
import NFTCard from "../nft-card";
import style from "./style.module.scss";
import images from "../../utils/images.json";
import { toast } from "react-toastify";

const Trade = () => {
  const [tradeData, setTradeData] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const randomValue = "c22003da1f4b7fdc26389954";

  const handleTradeDetails = async ({ page, randomValue, load = false }) => {
    try {
      if (load) {
        setMoreLoading(true);
      } else {
        setLoading(true);
      }

      const result = await getUpgradeActiveSaleDetails({ page, randomValue });
      if (load) {
        setTradeData([...tradeData, ...result?.data?.data?.nfts]);
      } else {
        setTradeData(result?.data?.data?.nfts);
      }

      setNextPage(result?.data?.data?.next_page);
      if (load) {
        setMoreLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setMoreLoading(false);
      console.log("err", err);
      toast.error("Something went wrong.Please try again after some time.");
    }
  };

  const loadMore = () => {
    handleTradeDetails({ page: page + 1, randomValue, load: true });
    setPage(page + 1);
  };

  useEffect(() => {
    handleTradeDetails({ page, randomValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={style["explore-nft-section"]}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div
                className={`${style["sec-heading"]} d-flex align-items-center mb-5 ${style["explore-heading"]}`}
              >
                <div className="col-md-8">
                  <h1 className="me-4 text-nowrap">RECENTLY SOLD</h1>
                  <p className={style["sub-heading-p"]}>
                    Take a look at some of the super-cool cricket NFTs you
                    missed out on buying. But no worries you can still head to
                    the listed NFTs section and buy your favorite cricket NFT.
                    There is no time for waiting anymore go get it now!
                  </p>
                </div>
              </div>
              {!loading ? (
                <div className="row">
                  {tradeData.length > 0 ? (
                    tradeData.map((nft, i) => (
                      <div
                        key={`list-nft-${i}`}
                        className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                      >
                        <NFTCard
                          nft={nft}
                          key={i}
                          imageUrl={"/sample.gif"}
                          recentSold
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center mb-5">
                      <h3 className="my-3 py-5">No Records Found!</h3>
                    </div>
                  )}
                  {!moreLoading ? (
                    <>
                      {nextPage && (
                        <div className="row mb-5">
                          <div className="col-md-12 text-center">
                            <button
                              className={style["load_more"]}
                              disabled={moreLoading}
                              onClick={loadMore}
                            >
                              {moreLoading ? "Loading..." : "Load More"}
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <RecentSoldLoader />
                  )}
                </div>
              ) : (
                <RecentSoldLoader />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Trade;
