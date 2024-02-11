import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUpgradeActiveSaleDetails } from "../../utils/base-methods";
import { currencyFormat } from "../../utils/common";
import style from "./style.module.scss";

const UpgradeData = ({ details }) => {
  const [upgradeData, setUpgradeData] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const randomValue = "d44df85afb2738e030821a3e";

  const handleUpgradeDetails = async ({ page, randomValue, load = false }) => {
    try {
      if (load) {
        setMoreLoading(true);
      } else {
        setLoading(true);
      }

      const result = await getUpgradeActiveSaleDetails({ page, randomValue });
      if (load) {
        setUpgradeData([...upgradeData, ...result?.data?.data?.histories]);
      } else {
        setUpgradeData(result?.data?.data?.histories);
      }

      setNextPage(result?.data?.data?.next_page);
      if (load) {
        setMoreLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log("🚀 ~ file: index.js:39 ~ handleUpgradeDetails ~ err:", err);
      setLoading(false);
      setMoreLoading(false);
      toast.error("Something went wrong.Please try again after some time.");
    }
  };

  const loadMore = () => {
    handleUpgradeDetails({ page: page + 1, randomValue, load: true });
    setPage(page + 1);
  };

  useEffect(() => {
    handleUpgradeDetails({ page, randomValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className={`${style["all-para-style"]} text-center py-5`}>
        <h2>Upgrade Details</h2>
        <section className={`${style["leaderboard-table"]} mt-5`}>
          {!loading ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Nft Name</th>
                    <th>Nft Image</th>
                    <th>Celebrity Id</th>
                    <th>Category</th>
                    <th>Rank</th>
                    <th>Role</th>
                    <th>Level</th>
                    <th>User Cards</th>
                    <th>From Level</th>
                    <th>To Level</th>
                    <th>Payment Type</th>
                    <th>Buy Value</th>
                    <th>Upgrade Date</th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {upgradeData?.length > 0 ? (
                      <>
                        {" "}
                        {upgradeData?.map((list, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{list?.name}</td>
                            <td>
                              {
                                <Image
                                  unoptimized={true}
                                  alt="Asset"
                                  src={list?.asset_url}
                                  height="50"
                                  width="50"
                                />
                              }
                            </td>
                            <td>{list?.celebrity_id}</td>
                            <td>{list?.core_statistics?.category?.value}</td>
                            <td>
                              {list?.core_statistics?.rank?.value} /{" "}
                              {list?.core_statistics?.rank?.maximum}
                            </td>
                            <td>{list?.core_statistics?.role?.value}</td>
                            <td>
                              {list?.core_statistics?.level?.value ? (
                                <p>{list?.core_statistics?.level?.value}</p>
                              ) : (
                                <>-</>
                              )}
                            </td>
                            <td>{list?.used_cards}</td>
                            <td>{list?.from_level}</td>
                            <td>{list?.to_level}</td>
                            <td>{list?.payment_type}</td>
                            <td>
                              {list?.payment_type === "assert" ? (
                                <p>{`${parseFloat(list?.buy_value)}JT`}</p>
                              ) : (
                                <p>{currencyFormat(list?.buy_value, "USD")}</p>
                              )}
                            </td>
                            <td>
                              {dayjs(list?.upgraded_at).format(
                                "DD MMM, YYYY hh:mm A"
                              )}
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={14} className="text-center">
                          No Records Found!
                        </td>
                      </tr>
                    )}
                  </>
                </tbody>
              </table>
              {nextPage && (
                <div className="col-md-12 text-center">
                  <button onClick={loadMore} className={style["load-more"]}>
                    <span>{!moreLoading ? "Load More" : "Loading ..."}</span>
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

export default UpgradeData;
