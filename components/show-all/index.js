import React, { useEffect, useState, forwardRef } from "react";
import { Dropdown } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/router";

import NFTCard from "../nft-card";
import images from "../../utils/images.json";
import style from "./style.module.scss";
import RecentSoldLoader from "../loaders/recentSoldCardLoader";
import { BiCaretDown, BiSearch, BiX } from "react-icons/bi";
import { nftShowAllApi } from "../../utils/methods";
import { FormControl } from "react-bootstrap";
import { validateCurrency } from "../../utils/common";

const ShowAll = ({ categories }) => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const query = router.query;

  const [search, setSearch] = useState(
    router.query.search ? router.query.search : ""
  );

  const [filter, setFilter] = useState({
    category: [],
    sale: [
      {
        name: "Bid",
        value: "bid",
        checked: false,
      },
      {
        name: "Buy",
        value: "buy",
        checked: false,
      },
    ],
    nft: [
      {
        name: "Single",
        value: "erc721",
        checked: false,
      },
      {
        name: "Multiple",
        value: "erc1155",
        checked: false,
      },
    ],
    sort: [
      {
        name: "Recently Listed",
        value: "recently_listed",
        checked: true,
      },
      {
        name: "Price - High to Low",
        value: "price_desc",
        checked: false,
      },
      {
        name: "Price - Low to High",
        value: "price",
        checked: false,
      },
      {
        name: "Auction Starting Soon",
        value: "auction_starting_soon",
        checked: false,
      },
      {
        name: "Auction Ending Soon",
        value: "auction_ending_soon",
        checked: false,
      },
      {
        name: "Relevance",
        value: "relevance",
        checked: false,
      },
    ],
    status: [
      {
        name: "Timed Auction",
        value: "timed_auction",
        checked: false,
      },
      {
        name: "Listed for sale",
        value: "onsale",
        checked: false,
      },
      {
        name: "Not on sale",
        value: "not_on_sale",
        checked: false,
      },
    ],
  });

  useEffect(() => {
    let category_filters = query.category ? query.category.split(",") : [];
    const sale_filters = query.sale ? query.sale.split(",") : [];
    const nft_filters = query.nft ? query.nft.split(",") : [];
    const sort_filters = query.sort ? query.sort : "recently_listed";
    const sale_status = query.status;
    const price_range = {
      from: query?.minPrice ? query?.minPrice : "",
      to: query?.maxPrice ? query?.maxPrice : "",
    };

    let categoryList = [];
    categories.forEach((category) => {
      const categoryDetail = {
        name: category.name,
        value: category.slug,
        checked: category_filters.includes(category.slug) ? true : false,
      };
      categoryList.push(categoryDetail);
    });

    const info = { ...filter };
    info.category = categoryList;
    info.sale = filter.sale.map((obj) => ({
      ...obj,
      checked: sale_filters.includes(obj.value),
    }));
    info.nft = filter.nft.map((obj) => ({
      ...obj,
      checked: nft_filters.includes(obj.value),
    }));
    info.sort = filter.sort.map((obj) => ({
      ...obj,
      checked: sort_filters ? sort_filters === obj.value : false,
    }));
    info.status = filter.status.map((obj) => ({
      ...obj,
      checked: sale_status ? sale_status === obj.value : false,
    }));
    setFilter(info);
    setPage(1);
    if (price_range.from || price_range.to) {
      setPriceRangeFilter(price_range);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, router.query]);

  useEffect(() => {
    const category_filters = query.category ? query.category.split(",") : [];
    const sale_filters = query.sale ? query.sale.split(",") : [];
    const nft_filters = query.nft ? query.nft.split(",") : [];
    const sort_filters = query.sort ? query.sort : "recently_listed";

    const search_filter = query.search ? query.search : "";
    const sale_status = query.status ? query.status : "";
    const sort = query.sort ? query.sort : "";
    const noMatchFound =
      sale_filters.length === 0 &&
      nft_filters.length === 0 &&
      sort.length === 0 &&
      category_filters.length === 0 &&
      search_filter.length === 0 &&
      sale_status.length === 0;
    if (noMatchFound && router.query.search) window.open("/", "_self");

    showAllFilteredNFTs(
      1,
      category_filters,
      nft_filters,
      sale_filters,
      sort_filters,
      search_filter,
      sale_status
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const showAllFilteredNFTs = async (
    page,
    category,
    type,
    saleType,
    sort = "recently_listed",
    searchText,
    saleStatus
  ) => {
    try {
      let filter = {
        category: category,
        type: type,
        sale_type: saleType,
        keyword: searchText,
        sale_kind: saleStatus,
      };

      page === 1 && setLoading(true);
      setLoadingMore(true);
      let response = await nftShowAllApi({
        page,
        per_page: 21,
        filter,
        sort: sort === "relevance" ? null : sort,
      });
      setList(response.data.data.nfts);
      setHasNext(response.data.data.next_page);
      // setTotalCount(response.data.data.total_count);
      page === 1 && setLoading(false);
      setLoadingMore(false);
    } catch (err) {
      console.log(err);
    }
  };

  const showAllNFTs = async (
    page,
    category,
    type,
    saleType,
    sort = "recently_listed",
    searchText,
    saleStatus,
    price_range
  ) => {
    try {
      let filter = {
        category: category,
        type: type,
        sale_type: saleType,
        keyword: searchText,
        sale_kind: saleStatus,
        price_range,
      };
      page === 1 && setLoading(true);
      setLoadingMore(true);
      let response = await nftShowAllApi({
        page,
        per_page: 21,
        filter,
        sort: sort === "relevance" ? null : sort,
      });
      setList([...list, ...response?.data?.data?.nfts]);
      setHasNext(response?.data?.data?.next_page);
      // setTotalCount(response.data.data.total_count);
      page === 1 && setLoading(false);
      setLoadingMore(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMore = () => {
    if (hasNext) {
      const category_filters = query.category ? query.category.split(",") : [];
      const sale_filters = query.sale ? query.sale.split(",") : [];
      const nft_filters = query.nft ? query.nft.split(",") : [];
      const sort_filters = query.sort ? query.sort : "recently_listed";
      const search_filters = query.search;
      const sale_status = query.status;
      const price_range = {
        from: query.minPrice ? query.minPrice : "",
        to: query.maxPrice ? query.maxPrice : "",
      };

      showAllNFTs(
        page + 1,
        category_filters,
        nft_filters,
        sale_filters,
        sort_filters,
        search_filters,
        sale_status,
        price_range
      );
      setPage(page + 1);
    }
  };

  const CategoryDropdown = forwardRef(({ onClick }, ref) => (
    <div
      className={style["filter-drop-btn"]}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      Category <BiCaretDown />
    </div>
  ));

  CategoryDropdown.displayName = "CategoryDropdown";

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

  const SaleTypeDropdown = forwardRef(({ onClick }, ref) => (
    <div
      className={style["filter-drop-btn"]}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      Sale Type <BiCaretDown />
    </div>
  ));

  SaleTypeDropdown.displayName = "SaleTypeDropdown";

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
      <BiCaretDown />
    </div>
  ));

  ShowAllSort.displayName = "ShowAllSort";

  const SaleStatus = forwardRef(({ onClick }, ref) => (
    <div
      className={style["filter-drop-btn"]}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      Sale Status
      <BiCaretDown />
    </div>
  ));

  SaleStatus.displayName = "SaleStatus";

  const CustomMenu = forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <span className="category-search-block">
            <FormControl
              autoFocus
              className="category-search"
              placeholder="Search Category"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            <BiSearch className="category-search-icon" size={15} />
          </span>
          <ul className="list-unstyled scroll-fixed">
            {React.Children.toArray(children).filter(
              (child) =>
                !value ||
                child.props.children[1]
                  .toLowerCase()
                  .includes(value.toLocaleLowerCase())
            )}
          </ul>
        </div>
      );
    }
  );

  CustomMenu.displayName = "CustomMenu";

  const [priceRangeFilter, setPriceRangeFilter] = useState({
    from: "",
    to: "",
  });

  const PriceMenu = forwardRef(
    (
      { children, style, className, "aria-labelledby": labeledBy },
      innerRef
    ) => {
      const [priceRange, setPriceRange] = useState({
        from: query.minPrice ? query.minPrice : "",
        to: query.maxPrice ? query.maxPrice : "",
      });

      return (
        <div
          // ref={innerRef}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <div className="d-flex">
            <span className={`${style["category-search-block"]} me-1`}>
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
          <div className="prifilter-btn">
            <button
              type="button"
              className="justify-content-center border dropdown-item"
              onClick={(e) => handlePriceRange(priceRange, true)}
            >
              Clear
            </button>
            <button
              type="button"
              className={`justify-content-center border dropdown-item apply-btn`}
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

  const handleCategoryCheck = (input) => {
    let category_exist = query.category ? query.category.split(",") : [];
    const sale_exist = query.sale ? query.sale.split(",") : [];
    const nft_exist = query.nft ? query.nft.split(",") : [];
    const sort_exist = query.sort;
    const search_exist = search ? search.replace("#", "%23") : "";
    const sale_status = query.status;
    const price_range = {
      from: query.minPrice ? query.minPrice : "",
      to: query.maxPrice ? query.maxPrice : "",
    };

    if (category_exist.includes(input.value)) {
      category_exist = category_exist.filter((obj) => obj !== input.value);
    } else {
      category_exist.push(input.value);
    }

    let query_string = "";
    if (category_exist.length > 0) {
      query_string += query_string
        ? `&category=${category_exist}`
        : `category=${category_exist}`;
    }

    if (sale_exist.length > 0) {
      query_string += query_string
        ? `&sale=${sale_exist}`
        : `sale=${sale_exist}`;
    }

    if (nft_exist.length > 0) {
      query_string += query_string ? `&nft=${nft_exist}` : `nft=${nft_exist}`;
    }

    if (sort_exist) {
      query_string += query_string
        ? `&sort=${sort_exist}`
        : `sort=${sort_exist}`;
    }

    if (search_exist) {
      query_string += query_string
        ? `&search=${search_exist}`
        : `search=${search_exist}`;
    }

    if (sale_status) {
      query_string += query_string
        ? `&status=${sale_status}`
        : `status=${sale_status}`;
    }

    if (price_range.from || price_range.to) {
      query_string += query_string
        ? `&minPrice=${price_range.from}&maxPrice=${price_range.to}`
        : `minPrice=${price_range.from}&maxPrice=${price_range.to}`;
    }

    if (query_string) {
      // router.push(`/?${encodeURIComponent(query_string)}`);
      router.push(`/?${query_string}`, undefined, { scroll: false });
    } else {
      router.push("/", undefined, { scroll: false });
    }
  };

  const handleSaleCheck = (input) => {
    const category_exist = query.category ? query.category.split(",") : [];
    let sale_exist = query.sale ? query.sale.split(",") : [];
    const nft_exist = query.nft ? query.nft.split(",") : [];
    const sort_exist = query.sort;
    const search_exist = search ? search.replace("#", "%23") : "";
    const sale_status = query.status;
    const price_range = {
      from: query.minPrice ? query.minPrice : "",
      to: query.maxPrice ? query.maxPrice : "",
    };

    if (sale_exist.includes(input.value)) {
      sale_exist = sale_exist.filter((obj) => obj !== input.value);
    } else {
      sale_exist.push(input.value);
    }

    let query_string = "";
    if (category_exist.length > 0) {
      query_string += query_string
        ? `&category=${category_exist}`
        : `category=${category_exist}`;
    }

    if (sale_exist.length > 0) {
      query_string += query_string
        ? `&sale=${sale_exist}`
        : `sale=${sale_exist}`;
    }

    if (nft_exist.length > 0) {
      query_string += query_string ? `&nft=${nft_exist}` : `nft=${nft_exist}`;
    }

    if (sort_exist) {
      query_string += query_string
        ? `&sort=${sort_exist}`
        : `sort=${sort_exist}`;
    }

    if (search_exist) {
      query_string += query_string
        ? `&search=${search_exist}`
        : `search=${search_exist}`;
    }

    if (sale_status) {
      query_string += query_string
        ? `&status=${sale_status}`
        : `status=${sale_status}`;
    }

    if (price_range.from || price_range.to) {
      query_string += query_string
        ? `&minPrice=${price_range.from}&maxPrice=${price_range.to}`
        : `minPrice=${price_range.from}&maxPrice=${price_range.to}`;
    }

    if (query_string) {
      // router.push(`/?${encodeURIComponent(query_string)}`);
      router.push(`/?${query_string}`, undefined, { scroll: false });
    } else {
      router.push("/", undefined, { scroll: false });
    }
  };

  const handleNFTCheck = (input) => {
    const category_exist = query.category ? query.category.split(",") : [];
    const sale_exist = query.sale ? query.sale.split(",") : [];
    let nft_exist = query.nft ? query.nft.split(",") : [];
    const sort_exist = query.sort;
    const search_exist = search ? search.replace("#", "%23") : "";
    const sale_status = query.status;
    const price_range = {
      from: query.minPrice ? query.minPrice : "",
      to: query.maxPrice ? query.maxPrice : "",
    };

    if (nft_exist.includes(input.value)) {
      nft_exist = nft_exist.filter((obj) => obj !== input.value);
    } else {
      nft_exist.push(input.value);
    }

    let query_string = "";
    if (category_exist.length > 0) {
      query_string += query_string
        ? `&category=${category_exist}`
        : `category=${category_exist}`;
    }

    if (sale_exist.length > 0) {
      query_string += query_string
        ? `&sale=${sale_exist}`
        : `sale=${sale_exist}`;
    }

    if (nft_exist.length > 0) {
      query_string += query_string ? `&nft=${nft_exist}` : `nft=${nft_exist}`;
    }

    if (sort_exist) {
      query_string += query_string
        ? `&sort=${sort_exist}`
        : `sort=${sort_exist}`;
    }

    if (search_exist) {
      query_string += query_string
        ? `&search=${search_exist}`
        : `search=${search_exist}`;
    }

    if (sale_status) {
      query_string += query_string
        ? `&status=${sale_status}`
        : `status=${sale_status}`;
    }

    if (price_range.from || price_range.to) {
      query_string += query_string
        ? `&minPrice=${price_range.from}&maxPrice=${price_range.to}`
        : `minPrice=${price_range.from}&maxPrice=${price_range.to}`;
    }

    if (query_string) {
      // router.push(`/?${encodeURIComponent(query_string)}`);
      router.push(`/?${query_string}`, undefined, { scroll: false });
    } else {
      router.push("/", undefined, { scroll: false });
    }
  };

  const handleSortNFT = (input) => {
    const category_exist = query.category ? query.category.split(",") : [];
    const sale_exist = query.sale ? query.sale.split(",") : [];
    const nft_exist = query.nft ? query.nft.split(",") : [];
    const sort_exist = input.value;
    const search_exist = search ? search.replace("#", "%23") : "";
    const sale_status = query.status;
    const price_range = {
      from: query.minPrice ? query.minPrice : "",
      to: query.maxPrice ? query.maxPrice : "",
    };

    let query_string = "";
    if (category_exist.length > 0) {
      query_string += query_string
        ? `&category=${category_exist}`
        : `category=${category_exist}`;
    }

    if (sale_exist.length > 0) {
      query_string += query_string
        ? `&sale=${sale_exist}`
        : `sale=${sale_exist}`;
    }

    if (nft_exist.length > 0) {
      query_string += query_string ? `&nft=${nft_exist}` : `nft=${nft_exist}`;
    }

    if (sort_exist) {
      query_string += query_string
        ? `&sort=${sort_exist}`
        : `sort=${sort_exist}`;
    }

    if (search_exist) {
      query_string += query_string
        ? `&search=${search_exist}`
        : `search=${search_exist}`;
    }

    if (sale_status) {
      query_string += query_string
        ? `&status=${sale_status}`
        : `status=${sale_status}`;
    }

    if (price_range.from || price_range.to) {
      query_string += query_string
        ? `&minPrice=${price_range.from}&maxPrice=${price_range.to}`
        : `minPrice=${price_range.from}&maxPrice=${price_range.to}`;
    }

    if (query_string) {
      // router.push(`/?${encodeURIComponent(query_string)}`);
      router.push(`/?${query_string}`, undefined, { scroll: false });
    } else {
      router.push("/", undefined, { scroll: false });
    }
  };

  const handleSaleStatusNFT = (input, remove = false) => {
    const category_exist = query.category ? query.category.split(",") : [];
    const sale_exist = query.sale ? query.sale.split(",") : [];
    const nft_exist = query.nft ? query.nft.split(",") : [];
    const sort_exist = query.sort;
    const search_exist = search ? search.replace("#", "%23") : "";
    const sale_status = remove ? null : input.value;
    const price_range = {
      from: query.minPrice ? query.minPrice : "",
      to: query.maxPrice ? query.maxPrice : "",
    };

    let query_string = "";
    if (category_exist.length > 0) {
      query_string += query_string
        ? `&category=${category_exist}`
        : `category=${category_exist}`;
    }

    if (sale_exist.length > 0) {
      query_string += query_string
        ? `&sale=${sale_exist}`
        : `sale=${sale_exist}`;
    }

    if (nft_exist.length > 0) {
      query_string += query_string ? `&nft=${nft_exist}` : `nft=${nft_exist}`;
    }

    if (sort_exist) {
      query_string += query_string
        ? `&sort=${sort_exist}`
        : `sort=${sort_exist}`;
    }

    if (search_exist) {
      query_string += query_string
        ? `&search=${search_exist}`
        : `search=${search_exist}`;
    }

    if (sale_status) {
      query_string += query_string
        ? `&status=${sale_status}`
        : `status=${sale_status}`;
    }

    if (price_range.from || price_range.to) {
      query_string += query_string
        ? `&minPrice=${price_range.from}&maxPrice=${price_range.to}`
        : `minPrice=${price_range.from}&maxPrice=${price_range.to}`;
    }

    if (query_string) {
      // router.push(`/?${encodeURIComponent(query_string)}`);
      router.push(`/?${query_string}`, undefined, { scroll: false });
    } else {
      router.push("/", undefined, { scroll: false });
    }
  };

  const handleTextSearch = () => {
    const category_exist = query.category ? query.category.split(",") : [];
    const sale_exist = query.sale ? query.sale.split(",") : [];
    const nft_exist = query.nft ? query.nft.split(",") : [];
    const sort_exist = query.sort;
    const search_exist = search.replace("#", "%23");
    const sale_status = query.status;
    const price_range = {
      from: query.minPrice ? query.minPrice : "",
      to: query.maxPrice ? query.maxPrice : "",
    };

    let query_string = "";
    if (category_exist.length > 0) {
      query_string += query_string
        ? `&category=${category_exist}`
        : `category=${category_exist}`;
    }

    if (sale_exist.length > 0) {
      query_string += query_string
        ? `&sale=${sale_exist}`
        : `sale=${sale_exist}`;
    }

    if (nft_exist.length > 0) {
      query_string += query_string ? `&nft=${nft_exist}` : `nft=${nft_exist}`;
    }

    if (sort_exist) {
      query_string += query_string
        ? `&sort=${sort_exist}`
        : `sort=${sort_exist}`;
    }

    if (search_exist) {
      query_string += query_string
        ? `&search=${search_exist}`
        : `search=${search_exist}`;
    }

    if (sale_status) {
      query_string += query_string
        ? `&status=${sale_status}`
        : `status=${sale_status}`;
    }

    if (price_range.from || price_range.to) {
      query_string += query_string
        ? `&minPrice=${price_range.from}&maxPrice=${price_range.to}`
        : `minPrice=${price_range.from}&maxPrice=${price_range.to}`;
    }

    if (query_string) {
      // router.push(`/?${encodeURIComponent(query_string)}`);
      router.push(`/?${query_string}`, undefined, { scroll: false });
    } else {
      router.push("/", undefined, { scroll: false });
    }
  };

  const handlePriceRange = (priceRange, remove = false) => {
    setPriceRangeFilter({ ...priceRange });
    const category_exist = query.category ? query.category.split(",") : [];
    const sale_exist = query.sale ? query.sale.split(",") : [];
    const nft_exist = query.nft ? query.nft.split(",") : [];
    const sort_exist = query.sort;
    const search_exist = search ? search.replace("#", "%23") : "";
    const sale_status = query.status;
    const price_range = remove ? { from: null, to: null } : priceRange;

    let query_string = "";
    if (category_exist.length > 0) {
      query_string += query_string
        ? `&category=${category_exist}`
        : `category=${category_exist}`;
    }

    if (sale_exist.length > 0) {
      query_string += query_string
        ? `&sale=${sale_exist}`
        : `sale=${sale_exist}`;
    }

    if (nft_exist.length > 0) {
      query_string += query_string ? `&nft=${nft_exist}` : `nft=${nft_exist}`;
    }

    if (sort_exist) {
      query_string += query_string
        ? `&sort=${sort_exist}`
        : `sort=${sort_exist}`;
    }

    if (search_exist) {
      query_string += query_string
        ? `&search=${search_exist}`
        : `search=${search_exist}`;
    }

    if (sale_status) {
      query_string += query_string
        ? `&status=${sale_status}`
        : `status=${sale_status}`;
    }

    if (price_range.from || price_range.to) {
      query_string += query_string
        ? `&minPrice=${price_range.from}&maxPrice=${price_range.to}`
        : `minPrice=${price_range.from}&maxPrice=${price_range.to}`;
    }

    if (remove) {
      setPriceRangeFilter(price_range);
    }

    if (query_string) {
      router.push(`/?${query_string}`, undefined, { scroll: false });
    } else {
      router.push("/", undefined, { scroll: false });
    }
  };

  const handleKeyPressEvent = (event) => {
    if (event.key === "Enter") {
      handleTextSearch();
    }
  };

  return (
    <>
      <section className={style["showall-nft-section"]}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div
                className={`${style["sec-heading"]} d-flex align-items-center mb-2 ${style["showall-heading"]}`}
              >
                <span className="me-2 mt-2 text-nowrap">LISTED NFTs</span>

                <div className={style["filt-flex-search"]}>
                  <div className="position-relative me-4">
                    <input
                      type="text"
                      className={style["search-box-add"]}
                      value={search}
                      placeholder="Search here"
                      onKeyPress={handleKeyPressEvent}
                      onChange={(e) => setSearch(e.target.value)}
                    />{" "}
                    <span
                      role="button"
                      className={style["search-button"]}
                      onClick={handleTextSearch}
                    >
                      <BiSearch size={15} />
                    </span>
                  </div>
                  <div className={style["vr"]}></div>
                  <div className={`ms-2 ${style["explore-all-text"]}`}>
                    <span
                      onClick={() =>
                        router.push("/nft-marketplace", undefined, {
                          scroll: false,
                        })
                      }
                    >
                      Explore
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`d-flex justify-content-center mt-2 w-100 ${style["showall-filter-blocks"]}`}
        >
          <div
            className={`d-flex flex-wrap ${style["filter-box"]} listnft-filter-box`}
          >
            {/* <Dropdown>
              <Dropdown.Toggle
                align="start"
                drop="start"
                as={CategoryDropdown}
              ></Dropdown.Toggle>

              <Dropdown.Menu align="start" as={CustomMenu}>
                {filter.category.map((obj, i) => (
                  <Dropdown.Item
                    key={`category${i}`}
                    as="button"
                    onClick={() => handleCategoryCheck(obj)}
                  >
                    <FaCheckCircle
                      color={obj.checked ? "green" : "#ccc"}
                      className="mb-1 me-2"
                      size={17}
                    />
                    {obj.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown> */}
            <Dropdown>
              <Dropdown.Toggle
                align="start"
                drop="start"
                as={SaleTypeDropdown}
              ></Dropdown.Toggle>

              <Dropdown.Menu align="start">
                {filter.sale.map((obj, i) => (
                  <Dropdown.Item
                    key={`sale${i}`}
                    as="button"
                    onClick={() => handleSaleCheck(obj)}
                  >
                    <FaCheckCircle
                      color={obj.checked ? "green" : "#ccc"}
                      className="mb-1 me-2"
                      size={17}
                    />
                    {obj.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle
                align="end"
                drop="end"
                as={SaleStatus}
              ></Dropdown.Toggle>

              <Dropdown.Menu align="end">
                {filter.status.map((obj, i) => (
                  <Dropdown.Item
                    key={`nft${i}`}
                    as="button"
                    onClick={() => handleSaleStatusNFT(obj)}
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
          <div className={`${style["filt-flex-box"]} listnft-filt-flex-box`}>
            {/* <Dropdown className={style["price-range"]}>
              <Dropdown.Toggle
                align="start"
                drop="down"
                as={PriceDropdown}
              ></Dropdown.Toggle>

              <Dropdown.Menu align="start" as={PriceMenu}></Dropdown.Menu>
            </Dropdown> */}
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
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="mt-2 mb-4 d-flex flex-wrap justify-content-center">
                {filter.category
                  .filter((xx) => xx.checked === true)
                  .map((obj, i) => (
                    <div
                      key={`filter-pill${i}`}
                      className={style["filter-pill-button"]}
                    >
                      <div className={style["first"]}>{obj.name}</div>
                      <div className={style["last"]}>
                        <BiX
                          role="button"
                          size={20}
                          onClick={() => handleCategoryCheck(obj)}
                        />
                      </div>
                    </div>
                  ))}

                {filter.sale
                  .filter((xx) => xx.checked === true)
                  .map((obj, i) => (
                    <div
                      key={`filter-pill${i}`}
                      className={style["filter-pill-button"]}
                    >
                      <div className={style["first"]}>{obj.name}</div>
                      <div className={style["last"]}>
                        <BiX
                          role="button"
                          size={20}
                          onClick={() => handleSaleCheck(obj)}
                        />
                      </div>
                    </div>
                  ))}

                {filter.nft
                  .filter((xx) => xx.checked === true)
                  .map((obj, i) => (
                    <div
                      key={`filter-pill${i}`}
                      className={style["filter-pill-button"]}
                    >
                      <div className={style["first"]}>{obj.name}</div>
                      <div className={style["last"]}>
                        <BiX
                          role="button"
                          size={20}
                          onClick={() => handleNFTCheck(obj)}
                        />
                      </div>
                    </div>
                  ))}

                {filter.status
                  .filter((xx) => xx.checked === true)
                  .map((obj, i) => (
                    <div
                      key={`filter-pill${i}`}
                      className={style["filter-pill-button"]}
                    >
                      <div className={style["first"]}>{obj.name}</div>
                      <div className={style["last"]}>
                        <BiX
                          role="button"
                          size={20}
                          onClick={() => handleSaleStatusNFT(obj, true)}
                        />
                      </div>
                    </div>
                  ))}
              </div>
              {!loading ? (
                <div className="row">
                  {list?.length > 0 ? (
                    list?.map((nft, i) => (
                      <div
                        key={`list-nft-${i}`}
                        className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                      >
                        <NFTCard
                          nft={nft}
                          key={i}
                          imageUrl={"/sample.gif"}
                          relativeUrl={`nft-marketplace`}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center">
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

export default ShowAll;
