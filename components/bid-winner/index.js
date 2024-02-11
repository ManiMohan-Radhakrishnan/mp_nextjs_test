import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Modal, Table } from "react-bootstrap";
import { BiX } from "react-icons/bi";

import BidName from "../bid-history/bid-name";
import images from "../../utils/images.json";
import style from "./style.module.scss";
import { orderBidHistory } from "../../utils/methods";
import { currencyFormat } from "../../utils/common";
import { TableLoader } from "../nft-basic-details/content-loader";

const BidWinner = ({ winner, orderSlug, histories }) => {
  const [modalShow, setModalShow] = useState(false);
  const [bidHistories, setBidHistories] = useState({});
  const [page, setPage] = useState(1);
  const [bidHistoryList, setBidHistoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user.data);

  const fetchHistory = async (pageNo) => {
    try {
      let result = await orderBidHistory({
        order_slug: orderSlug,
        page: pageNo,
      });
      setBidHistoryList([...bidHistoryList, ...result.data.data.histories]);
      setBidHistories(result.data.data);
    } catch (error) {
      console.log(error);
      toast.error(
        "The request could not be processed at this time. Please try again."
      );
    }
  };

  const fetchMoreHistory = () => {
    if (bidHistories.next_page) {
      fetchHistory(page + 1);
      setPage(page + 1);
    }
  };

  const handleClick = async () => {
    setModalShow(true);
    try {
      setLoading(true);
      let history = await orderBidHistory({
        order_slug: orderSlug,
        page: page,
      });
      setBidHistories(history.data.data);
      setBidHistoryList(history.data.data.histories);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(
        "The request could not be processed at this time. Please try again."
      );
    }
  };

  const handleClose = () => {
    setModalShow(false);
    setPage(1);
    setBidHistories({});
    setBidHistoryList([]);
  };

  return (
    <>
      <div className={style["bid-winner"]}>
        <div className={style["winner-title"]}>
          <div className={style["winner-text"]}>WINNER</div>
        </div>

        <div className={style["winner-user-details"]}>
          <Image
            unoptimized={true}
            height={30}
            width={30}
            alt="avatar"
            src={
              !winner.private && winner.avatar_url
                ? winner.avatar_url
                : user?.slug === winner.slug && winner.avatar_url
                ? winner.avatar_url
                : images.userJPG
            }
          />
          <div className={style["winner-id"]}>
            {!winner.private && winner.user_name
              ? winner.user_name
              : user?.slug === winner.slug
              ? `@${user.first_name}${user.last_name}`
              : winner.user_name}
          </div>
        </div>

        <div className={style["nft-sold-details"]}>
          <div className={style["sold-for"]}>
            <div className={style["sold-for-title"]}>NFT sold for</div>
            <div className={style["sold-for-value"]}>
              {currencyFormat(winner.sold_amount, "USD")}
            </div>
          </div>
          <div className={style["sold-on"]}>
            <div className={style["sold-on-title"]}>NFT sold on</div>
            <div className={style["sold-on-value"]}>
              {dayjs(winner.sold_at).format("MMM D, YYYY hh:mm A")}
            </div>
          </div>
        </div>

        <div className={style["nft-lastbid-details"]}>
          <div className={style["lastbid-left"]}>
            <div className={style["lastbid-title"]}>Last Bid</div>
            <div className={style["lastbid-value"]}>
              {currencyFormat(winner.last_bid, "USD")}
            </div>
          </div>
          <div className={style["lastbid-right"]}>
            <div className={style["lastbid-date-title"]}>Last Bid Date</div>
            <div className={style["lastbid-date-value"]}>
              {dayjs(winner.last_bid_at).format("MMM D, YYYY hh:mm A")}
            </div>
          </div>
        </div>

        <div className={style["bottom-section"]}>
          <button
            type="button"
            className={`btn btn-dark rounded-pill border border-white ${"bidding-history-btn"}`}
            onClick={handleClick}
          >
            Bidding History
          </button>
        </div>
      </div>

      <Modal size="xl" centered show={modalShow} className={"history-modal"}>
        <Modal.Header className="bg-dark p-0">
          <Modal.Title className="flex-fill">
            <div className={"modal-bid-history-title-content"}>
              <div className={"modal-bid-history-title"}>History</div>
              <div className={"modal-bid-history-filter"}>
                <BiX
                  role="button"
                  style={{ color: "#fff" }}
                  size={25}
                  onClick={handleClose}
                />
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <TableLoader />
          ) : (
            <Table responsive="lg" className={`mb-0 ${"history-table-expand"}`}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Event</th>
                  <th>Bider</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Price Change</th>
                  <th className="text-center">Date</th>
                </tr>
              </thead>
              <tbody>
                {bidHistoryList.map((history, i) => (
                  <tr key={history.slug || i}>
                    <td>{i + 1}</td>
                    <td>Bid placed by</td>
                    <td>
                      <BidName
                        imgUrl={
                          !history.private && history.avatar_url
                            ? history.avatar_url
                            : user?.slug === history.slug && history.avatar_url
                            ? history.avatar_url
                            : images.userJPG
                        }
                        text={
                          !history.private && history.user_name
                            ? history.user_name
                            : user?.slug === history.slug
                            ? `@${user.first_name}${user.last_name}`
                            : history.user_name
                        }
                        isTable
                        slug={history.slug}
                      />
                    </td>
                    <td className="text-center">
                      <div className="usd-value">
                        {currencyFormat(history.bid_amount, "USD")}
                      </div>
                    </td>
                    <td className="text-center text-success">
                      {`${history.bid_change.toFixed(2)}%`}
                    </td>
                    <td className="text-center">
                      <div className="date">
                        {dayjs(history.created_at).format(
                          "MMM D, YYYY hh:mm A"
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {bidHistories.next_page ? (
                  <tr>
                    <td className="text-center text-secondary p-3" colSpan="6">
                      <span role="button" onClick={fetchMoreHistory}>
                        Load More
                      </span>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td className="text-center text-secondary p-3" colSpan="6">
                      {/* You've reached the end of the list */}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BidWinner;
