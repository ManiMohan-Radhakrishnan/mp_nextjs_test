/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState, forwardRef } from "react";
import { useRouter } from "next/router";
import { Dropdown } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

import NFTCard from "../nft-card";
import images from "../../utils/images.json";
import style from "./style.module.scss";
import RecentSoldLoader from "../loaders/recentSoldCardLoader";
import { BiCaretDown } from "react-icons/bi";
import {
  nftRecentlySoldApi,
  nftRecentlySoldApiList,
} from "../../utils/methods";
import RaddxNFTCard from "../raddx/nft-card";
import HurleyNFTCard from "../hurley/nft-card";

const RecentlySoldList = () => {
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
        name: "Recently Sold",
        value: "recently_sold",
        checked: true,
      },
      {
        name: "Price - High to Low",
        value: "price_desc",
        checked: false,
      },
      {
        name: "Price - Low to High",
        value: "price_asc",
        checked: false,
      },
    ],
  });

  useEffect(() => {
    const sort_filters = query.sort ? query.sort : "recently_sold";

    const info = { ...filter };

    info.sort = filter.sort.map((obj) => ({
      ...obj,
      checked: sort_filters ? sort_filters === obj.value : false,
    }));
    showAllFilteredNFTs(1, sort_filters);
    setPage(1);
    setFilter(info);
    // setList(inputData.data.nfts || []);
    // setFilter(filters)
    // setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // const [filter,setFilter] = useState(filters);

  const showAllNFTs = async (page, sort = "recently_sold") => {
    try {
      page === 1 && setLoading(true);
      setLoadingMore(true);
      let response = await nftRecentlySoldApiList(page, sort);
      setList([...list, ...response.data.data.nfts]);
      setHasNext(response.data.data.next_page);
      page === 1 && setLoading(false);
      setLoadingMore(false);
    } catch (err) {
      console.log(err);
    }
  };

  const showAllFilteredNFTs = async (page, sort = "recently_sold") => {
    try {
      page === 1 && setLoading(true);
      setLoadingMore(true);
      let response = await nftRecentlySoldApiList(page, sort);
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
      const sort_filters = query.sort ? query.sort : "recently_sold";

      showAllNFTs(page + 1, sort_filters);
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

    let query_string = "";

    if (sort_exist) {
      query_string += query_string
        ? `&sort=${sort_exist}`
        : `sort=${sort_exist}`;
    }

    router.push(`/nft-marketplace/sale-history?${query_string}`);
  };

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

                {/* <span
                  className={`d-flex justify-content-end mt-2 w-100 ${style["filter-blocks"]}`}
                >
                  <div className="filt-flex-box">
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
                </span> */}
              </div>
              {!loading ? (
                <div className="row">
                  {list.length > 0 ? (
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
                            recentSold
                          />
                        ) : nft?.game_name === "raddx" ? (
                          <RaddxNFTCard
                            nft={nft}
                            key={i}
                            imageUrl={"/sample.gif"}
                            recentSold
                          />
                        ) : nft?.game_name === "hurley" ? (
                          <HurleyNFTCard
                            nft={nft}
                            key={i}
                            imageUrl={"/sample.gif"}
                            recentSold
                          />
                        ) : (
                          <NFTCard
                            nft={nft}
                            key={i}
                            imageUrl={"/sample.gif"}
                            recentSold
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

                  {/* {hasNext && (
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
                  )} */}
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

export default RecentlySoldList;
