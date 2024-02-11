import { useEffect, useState } from "react";
import { getUpgradeActiveSaleDetails } from "../../utils/base-methods";
import RecentSoldLoader from "../loaders/recentSoldCardLoader";
import NFTCard from "../nft-card";
import style from "./style.module.scss";
import images from "../../utils/images.json";
import Image from "next/image";
import { currencyFormat } from "../../utils/common";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const ActiveDetails = () => {
  const [activeBidData, setActiveBidData] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const randomValue = "bb015cc55ec42aaad977b2dd";

  const handleActiveBidDetails = async ({
    page,
    randomValue,
    load = false,
  }) => {
    try {
      if (load) {
        setMoreLoading(true);
      } else {
        setLoading(true);
      }

      const result = await getUpgradeActiveSaleDetails({ page, randomValue });
      if (load) {
        setActiveBidData([...activeBidData, ...result?.data?.data?.bids]);
      } else {
        setActiveBidData(result?.data?.data?.bids);
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
    handleActiveBidDetails({ page: page + 1, randomValue, load: true });
    setPage(page + 1);
  };

  useEffect(() => {
    handleActiveBidDetails({ page, randomValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={`${style["all-para-style"]} text-center py-5`}>
        <h2>Active Bid Details</h2>
        <section className={`${style["leaderboard-table"]} mt-5`}>
          {!loading ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Amount</th>
                    <th>Celebrity Id</th>
                    <th>Nft Name</th>
                    <th>Nft Image</th>
                    <th>Order Slug</th>
                    <th>Slug</th>
                    <th>Service Fee</th>
                    <th>Bidding Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activeBidData?.length > 0 ? (
                    <>
                      {activeBidData?.map((list, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>
                            {currencyFormat(parseInt(list?.amount), "USD")}
                          </td>
                          <td>{list?.celebrity_id}</td>
                          <td>{list?.name}</td>
                          <td>
                            {list?.image_url && (
                              <Image
                                unoptimized={true}
                                alt="Celebrity"
                                src={list?.image_url}
                                height="50"
                                width="50"
                              />
                            )}
                          </td>
                          <td>{list?.order_slug}</td>
                          <td>{list?.slug}</td>
                          <td>{list?.service_fee}</td>
                          <td>
                            {dayjs(list?.created_at).format(
                              "DD MMM, YYYY hh:mm A"
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center">
                        No Records Found!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {nextPage && (
                <div className={"col-md-12 text-center"}>
                  <button onClick={loadMore} className={style["load-more"]}>
                    {!moreLoading ? "Load More" : "Loading.."}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={style["loading-text"]}>Loading...</div>
          )}
        </section>
      </div>
    </>
  );
};

export default ActiveDetails;
