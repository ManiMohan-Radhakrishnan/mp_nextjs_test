import { useEffect, useState, forwardRef } from "react";
import { Dropdown } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

import NFTCard from "../nft-card";
import images from "../../utils/images.json";
import style from "./style.module.scss";
import { BiCaretDown } from "react-icons/bi";
import { useRouter } from "next/router";
import { trendingNFTsApi } from "../../utils/methods";
import RecentSoldLoader from "../loaders/recentSoldCardLoader";

const TrendingList = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const query = router.query;
  const [filter, setFilter] = useState({
    sort: [
      {
        name: "Price - High to Low",
        value: "price_desc",
        checked: true,
      },
      {
        name: "Price - Low to High",
        value: "price",
        checked: false,
      },
      {
        name: "Bid Count - High to Low",
        value: "bid_count_desc",
        checked: false,
      },
      {
        name: "Bid Count - Low to High",
        value: "bid_count",
        checked: false,
      },
      {
        name: "Auction Ending Soon",
        value: "auction_ending_soon",
        checked: false,
      },
    ],
  });

  // const [filter, setFilter] = useState(filters);

  useEffect(() => {
    const sort_filters = query.sort ? query.sort : "price_desc";

    const info = { ...filter };

    info.sort = filter.sort.map((obj) => ({
      ...obj,
      checked: sort_filters ? sort_filters === obj.value : false,
    }));
    setPage(1);
    setFilter(info);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    const sort_filters = query.sort ? query.sort : "price_desc";

    const price_range = {
      from: query.minPrice ? query.minPrice : "",
      to: query.maxPrice ? query.maxPrice : "",
    };

    showAllFilteredNFTs(1, sort_filters, price_range);
    // setList(data?.data?.nfts || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const showAllNFTs = async (page, sort = "price_desc", price_range) => {
    try {
      let filter = {
        price_range,
      };
      page === 1 && setLoading(true);
      setLoadingMore(true);
      let response = await trendingNFTsApi(page, sort, filter);
      setList([...list, ...response.data.data.nfts]);
      setHasNext(response.data.data.next_page);
      page === 1 && setLoading(false);
      setLoadingMore(false);
    } catch (err) {
      console.log(err);
    }
  };

  const showAllFilteredNFTs = async (
    page,
    sort = "price_desc",
    price_range
  ) => {
    try {
      let filter = {
        price_range,
      };
      page === 1 && setLoading(true);
      setLoadingMore(true);

      let response = await trendingNFTsApi(page, sort, filter);
      setList(response.data.data.nfts);
      setHasNext(response.data.data.next_page);
      page === 1 && setLoading(false);
      setLoadingMore(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMore = () => {
    if (hasNext) {
      const sort_filters = query.sort ? query.sort : "price_desc";
      const price_range = {
        from: query.minPrice ? query.minPrice : "",
        to: query.maxPrice ? query.maxPrice : "",
      };

      setPage(page + 1);
      showAllNFTs(page + 1, sort_filters, price_range);
      setPage(page + 1);
    }
  };

  const ShowAllSort = forwardRef(({ onClick }, ref) => (
    <div
      className={style["filter-drop-sort-btn"]}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {filter.sort.find((obj) => obj.checked === true)?.name
        ? `Sort By: ${filter.sort.find((obj) => obj.checked === true).name}`
        : "Sort By"}
      <BiCaretDown className="mb-1" />
    </div>
  ));
  ShowAllSort.displayName = "ShowAllSort";

  const handleSortNFT = (input) => {
    const sort_exist = input.value;
    const price_range = {
      from: query.minPrice ? query.minPrice : "",
      to: query.maxPrice ? query.maxPrice : "",
    };
    let query_string = "";

    if (sort_exist) {
      query_string += query_string
        ? `&sort=${sort_exist}`
        : `sort=${sort_exist}`;
    }
    if (price_range.from || price_range.to) {
      query_string += query_string
        ? `&minPrice=${price_range.from}&maxPrice=${price_range.to}`
        : `&minPrice=${price_range.from}&maxPrice=${price_range.to}`;
    }

    router.push(`/nft-marketplace/trending-nfts?${query_string}`);
  };

  const reloadNFTList = async () => {
    try {
      let response = await trendingNFTsApi({ page });
      setList(response.data.data.nfts);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className={style["explore-nft-section"]}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div
                className={`${style["sec-heading"]} d-flex align-items-center mb-5 ${style["liveauction-detail-heading"]}`}
              >
                <div className="col-md-9">
                  <h1 className="text-nowrap me-4">TRENDING NFTs</h1>

                  <p className={style["sub-heading-p"]}>
                    Take a look at the marvelous cricket NFTs that are currently
                    trending on the jump.trade NFT marketplace. Don’t wait any
                    more go ahead and start bidding on these supreme NFTs to add
                    them to your collection today. Clock is ticking already!
                  </p>
                </div>

                <span
                  className={`d-flex justify-content-end w-100 ${style["liveauction-detail-filter-blocks"]}`}
                >
                  <div
                    className={`d-flex flex-wrap ${style["liveauction-detail-filter-box"]}`}
                  >
                    <Dropdown>
                      <Dropdown.Toggle
                        align="start"
                        drop="start"
                        as={ShowAllSort}
                      ></Dropdown.Toggle>

                      <Dropdown.Menu align="start">
                        {filter.sort.map((obj, i) => (
                          <Dropdown.Item
                            key={`nft${i}`}
                            as="button"
                            onClick={() => handleSortNFT(obj)}
                          >
                            <FaCheckCircle
                              color={obj.checked ? "green" : "#ccc"}
                              className="mb-1 me-2"
                              size={17}
                            />{" "}
                            {obj.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </span>
              </div>
              {!loading ? (
                <div className="row">
                  {list.length > 0 ? (
                    list.map((nft, i) => (
                      <div
                        key={`list-nft-${i}`}
                        className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                      >
                        <NFTCard
                          nft={nft}
                          key={i}
                          imageUrl={"/sample.gif"}
                          reloadNFTList={reloadNFTList}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center mb-5">
                      <h3 className="my-3 py-5">No Records Found!</h3>
                    </div>
                  )}

                  {!loading && loadingMore && <RecentSoldLoader />}

                  {hasNext && (
                    <div className="row mb-5">
                      <div className="col-md-12 text-center">
                        <button
                          className={style["load_more"]}
                          disabled={loadingMore}
                          onClick={fetchMore}
                        >
                          {loadingMore ? "Loading..." : "Load More"}
                        </button>
                      </div>
                    </div>
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

export default TrendingList;
