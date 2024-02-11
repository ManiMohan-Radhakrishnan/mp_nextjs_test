import React, { useEffect, useState, forwardRef } from "react";
import { Dropdown } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { FormControl } from "react-bootstrap";
import NFTCard from "../nft-card";
import RecentSoldLoader from "../loaders/recentSoldCardLoader";
import images from "../../utils/images.json";
import style from "./style.module.scss";
import { BiCaretDown } from "react-icons/bi";
import { validateCurrency } from "../../utils/common";
import { useRouter } from "next/router";
import { liveAuctionNFTsApi } from "../../utils/methods";
import RaddxNFTCard from "../raddx/nft-card";
import HurleyNFTCard from "../hurley/nft-card";

const LiveAuctionsList = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const query = router.query;
  const { slug } = router.query;
  const [filter, setFilter] = useState({
    sort: [
      {
        name: "Auction Ending Soon",
        value: "auction_ending_soon",
        checked: true,
      },
      {
        name: "Auction Starting Soon",
        value: "auction_starting_soon",
        checked: false,
      },
    ],
  });
  // const [filter, setFilter] = useState(filters);

  useEffect(() => {
    const sort_filters = query.sort ? query.sort : "auction_ending_soon";
    const price_range = {
      from: query.minPrice,
      to: query.maxPrice,
    };

    const info = { ...filter };

    info.sort = filter.sort.map((obj) => ({
      ...obj,
      checked: sort_filters ? sort_filters === obj.value : false,
    }));
    setPage(1);
    setFilter(info);
    if (price_range.from || price_range.to) {
      setPriceRangeFilter(price_range);
    }

    // setFilter(filters);
    // setList(inputData?.data?.nfts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    const sort_filters = query.sort ? query.sort : "auction_ending_soon";

    const price_range = {
      from: query.minPrice ? query.minPrice : "",
      to: query.maxPrice ? query.maxPrice : "",
    };

    showAllFilteredNFTs(1, sort_filters, price_range);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const showAllNFTs = async (
    page,
    sort = "auction_ending_soon",
    price_range
  ) => {
    try {
      let filter = {
        price_range,
      };
      page === 1 && setLoading(true);
      setLoadingMore(true);
      let response = await liveAuctionNFTsApi(page, sort, filter);
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
    sort = "auction_ending_soon",
    price_range
  ) => {
    try {
      let filter = {
        price_range,
      };
      page === 1 && setLoading(true);
      setLoadingMore(true);

      let response = await liveAuctionNFTsApi(page, sort, filter);
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
      const sort_filters = query.sort ? query.sort : "auction_ending_soon";
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

  const PriceDropdown = forwardRef(({ onClick }, ref) => (
    <div
      className={style["filter-drop-btn"]}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {priceRangeFilter.from && priceRangeFilter.to
        ? `Price Range $${priceRangeFilter.from} - $${priceRangeFilter.to}`
        : priceRangeFilter.from
        ? `Min $${priceRangeFilter.from}`
        : priceRangeFilter.to
        ? `Max $${priceRangeFilter.to}`
        : "Price Range"}
      <BiCaretDown />
    </div>
  ));

  PriceDropdown.displayName = "PriceDropdown";

  const [priceRangeFilter, setPriceRangeFilter] = useState({
    from: "",
    to: "",
  });

  const PriceMenu = forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [priceRange, setPriceRange] = useState({
        from: query.minPrice ? query.minPrice : "",
        to: query.maxPrice ? query.maxPrice : "",
      });

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <div className="d-flex">
            <span className={`${style["category-search-block"]}  me-1`}>
              <FormControl
                autoFocus
                className={style["category-search"]}
                placeholder="Min"
                type="number"
                onChange={(e) => {
                  if (e.target.value && e.target.value.length <= 9) {
                    if (validateCurrency(e.target.value)) {
                      setPriceRange({ ...priceRange, from: e.target.value });
                    }
                  } else {
                    setPriceRange({ ...priceRange, from: "" });
                  }
                }}
                value={priceRange.from}
              />
            </span>
            <span className={style["category-search-block"]}>
              <FormControl
                className={style["category-search"]}
                placeholder="Max"
                type="number"
                onChange={(e) => {
                  if (e.target.value && e.target.value.length <= 9) {
                    if (validateCurrency(e.target.value)) {
                      setPriceRange({ ...priceRange, to: e.target.value });
                    }
                  } else {
                    setPriceRange({ ...priceRange, to: "" });
                  }
                }}
                value={priceRange.to}
              />
            </span>
          </div>
          {/* <hr className="mt-2 mb-1 bot-border-hr" /> */}
          <div className={`${style["prifilter-btn"]} prifilter-btn`}>
            <button
              type="button"
              className="justify-content-center border dropdown-item"
              onClick={(e) => handlePriceRange(priceRange, true)}
            >
              Clear
            </button>
            <button
              type="button"
              className="justify-content-center border dropdown-item apply-btn"
              disabled={(() => {
                if (
                  parseInt(priceRange.from) < 0 ||
                  parseInt(priceRange.to) < 0
                ) {
                  return true;
                } else if (
                  parseInt(priceRange.from) > parseInt(priceRange.to)
                ) {
                  return true;
                } else {
                  return false;
                }
              })()}
              onClick={(e) => handlePriceRange(priceRange)}
            >
              Apply
            </button>
            {React.Children.toArray(children).filter((child) => child)}
          </div>
        </div>
      );
    }
  );

  PriceMenu.displayName = "PriceMenu";

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

    router.push(`/nft-marketplace/live-auction?${query_string}`);
  };
  const handlePriceRange = (priceRange, remove = false) => {
    setPriceRangeFilter({ ...priceRange });

    const sort_exist = query.sort;

    const price_range = remove ? { from: null, to: null } : priceRange;

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

    if (remove) {
      setPriceRangeFilter(price_range);
    }
    if (query_string) {
      router.push(`/nft-marketplace/live-auction?${query_string}`);
    } else {
      router.push("/nft-marketplace/live-auction");
    }
  };

  const reloadNFTList = async () => {
    try {
      let response = await liveAuctionNFTsApi({ page });
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
                <div className="col-md-7">
                  <h1 className="text-nowrap me-4">LIVE AUCTIONS</h1>
                  {/* <div className="d-flex flex-wrap filter-box">
                    <span className="d-flex justify-content-end w-100 filter-blocks">
                      
                    </span>
                  </div> */}
                  <p className={style["sub-heading-p"]}>
                    Find the hottest cricket NFTs that are live on auction on
                    jump.trade marketplace. Get ready for a bidding war against
                    your fellow cricket NFT lovers to get your hands on these
                    awesome digital assets. Start bidding on your favorite NFTs!{" "}
                  </p>
                </div>
                <span
                  className={`d-flex justify-content-end w-100 ${style["liveauction-detail-filter-blocks"]}`}
                >
                  <div
                    className={`d-flex flex-wrap ${style["liveauction-detail-filter-box"]}`}
                  >
                    <Dropdown className={style["price-range"]}>
                      <Dropdown.Toggle
                        align="start"
                        drop="down"
                        as={PriceDropdown}
                      ></Dropdown.Toggle>

                      <Dropdown.Menu
                        align="start"
                        as={PriceMenu}
                      ></Dropdown.Menu>
                    </Dropdown>
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
                  {list?.length > 0 ? (
                    list.map((nft, i) => (
                      <div
                        key={`list-nft-${i}`}
                        className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                      >
                        {nft?.game_name === "mcl" ? (
                          <NFTCard
                            nft={nft}
                            key={i}
                            imageUrl={"/sample.gif"}
                            liveAuction
                          />
                        ) : nft?.game_name === "raddx" ? (
                          <RaddxNFTCard
                            nft={nft}
                            key={i}
                            imageUrl={"/sample.gif"}
                            liveAuction
                          />
                        ) : nft?.game_name === "hurley" ? (
                          <HurleyNFTCard
                            nft={nft}
                            key={i}
                            imageUrl={"/sample.gif"}
                            liveAuction
                          />
                        ) : (
                          <NFTCard
                            nft={nft}
                            key={i}
                            imageUrl={"/sample.gif"}
                            liveAuction
                          />
                        )}
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

export default LiveAuctionsList;
