import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BiCheck } from "react-icons/bi";
import { Offcanvas } from "react-bootstrap";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";

import RentalCard from "../rental-card";

import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getHideMenuStatus,
  setHideMenuStatus,
} from "../../redux/reducers/user_reducer";
import { EVENT_NAMES, invokeTrackEvent } from "../../utils/track-events";

const RentalNft = ({
  pageData = [],
  showCanvas = false,
  onHide = () => {},
}) => {
  return (
    <>
      <div className={`${style["rental-card-block"]}`}>
        <RentedNftFilters show={showCanvas} onHide={onHide} />

        <>
          {pageData?.length > 0 ? (
            <div className={"d-flex flex-wrap w-100 px-2"}>
              {pageData.map((nft, i) => (
                <div
                  key={nft?.categorable_slug || `nft-${i}`}
                  className={`${style["rental-card-box"]}`}
                >
                  <RentalCard details={nft} />
                </div>
              ))}
            </div>
          ) : (
            <div
              className={
                "d-flex flex-wrap w-100 px-2 align-items-center justify-content-center"
              }
            >
              <h4>No records Found</h4>
            </div>
          )}
        </>
      </div>
    </>
  );
};

const filterConfig = Object.freeze({
  players: {
    title: "Players",
    filters: [
      //Role
      {
        title: "Role",
        queryKey: "role_in",
        show: true,
        data: [
          {
            name: "Batsman",
            value: "Batsman",
            checked: false,
          },
          {
            name: "Bowler",
            value: "Bowler",
            checked: false,
          },
        ],
      },
      //Category
      {
        title: "Category",
        queryKey: "category_in",
        show: true,
        data: [
          {
            name: "Rookie",
            value: "ROOKIE",
            checked: false,
          },
          {
            name: "Rare",
            value: "RARE",
            checked: false,
          },
          {
            name: "Epic",
            value: "EPIC",
            checked: false,
          },
          {
            name: "Legend",
            value: "LEGEND",
            checked: false,
          },
        ],
      },
      //Bowling Style
      {
        title: "Bowling Style",
        queryKey: "bowling_style_in",
        show: true,
        data: [
          {
            name: "Fast",
            value: "Fast",
            checked: false,
          },
          {
            name: "Medium Fast",
            value: "Med Fast",
            checked: false,
          },
          {
            name: "Leg Spin",
            value: "Leg Spin",
            checked: false,
          },
          {
            name: "Off Spin",
            value: "Off Spin",
            checked: false,
          },
        ],
      },
    ],
  },
  bats: {
    title: "Bats",
    filters: [
      //Bat Types
      {
        title: "Bat Types",
        queryKey: "sub_category_in",
        show: true,
        data: [
          {
            name: "Dual Signed Immortal",
            value: "DualSignedImmortal",
            checked: false,
          },
          {
            name: "Single Signed Immortal",
            value: "SingleSignedImmortal",
            checked: false,
          },
          {
            name: "Dual Signed Ultra Rare",
            value: "DualSignedUltraRare",
            checked: false,
          },
          {
            name: "Dual Crypto Unique",
            value: "DualCryptoUnique",
            checked: false,
          },
          {
            name: "Single Signed Ultra Rare",
            value: "SingleSignedUltraRare",
            checked: false,
          },
          {
            name: "Single Crypto Unique",
            value: "SingleCryptoUnique",
            checked: false,
          },
          {
            name: "Single Crypto Premium",
            value: "SingleCryptoPremium",
            checked: false,
          },
          {
            name: "Single Signed Super Rare",
            value: "SingleSignedSuperRare",
            checked: false,
          },
          {
            name: "Single Crypto Superior",
            value: "SingleCryptoSuperior",
            checked: false,
          },
          {
            name: "Single Signed Rare",
            value: "SingleSignedRare",
            checked: false,
          },
          {
            name: "Single Crypto Standard",
            value: "SingleCryptoStandard",
            checked: false,
          },
        ],
      },
    ],
  },
});

const RentedNftFilters = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const hideMenu = useSelector(getHideMenuStatus);

  const router = useRouter();
  const { nftType: defaultNftType = "players", hideMenus } = router.query;

  const [isFiltersApplied, setIsFiltersApplied] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(
    filterConfig[defaultNftType].filters || []
  );

  //Page Refresh filter UnCheck

  useEffect(() => {
    if (Object.keys(router.query)?.length == 0) {
      let updatedFilters = [...filterConfig[defaultNftType].filters];
      updatedFilters.map((filter) => {
        filter.data.map((filterData) => {
          filterData.checked = false;
        });
      });
      setIsFiltersApplied(false);
      setAppliedFilters(updatedFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  useEffect(() => {
    if (!hideMenu && hideMenus) {
      dispatch(setHideMenuStatus(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideMenu]);
  const baseUrl =
    hideMenus === "true"
      ? `/nft-rental?nftType=${defaultNftType}&hideMenus=true`
      : `/nft-rental?nftType=${defaultNftType}`;

  const handleCategoryChange = (nftType) => {
    let updatedFilters = [...filterConfig[defaultNftType].filters];
    updatedFilters.map((filter) => {
      filter.data.map((filterData) => {
        filterData.checked = false;
      });
    });
    setIsFiltersApplied(false);
    setAppliedFilters(updatedFilters);
    router.push(
      hideMenus === "true"
        ? `/nft-rental?nftType=${nftType}&hideMenus=true`
        : `/nft-rental?nftType=${nftType}`
    );
  };

  const handleFilterChange = (key) => {
    let { queryString = "", filtersApplied } = getUpdatedFilters(key);
    setIsFiltersApplied(filtersApplied);
    invokeTrackEvent(EVENT_NAMES?.RENTAL_FILTER_APPLIED,{
      filter:`nftType=${defaultNftType}&${queryString}`
    })
    if (baseUrl) {
      queryString
        ? router.push(`${baseUrl}&${queryString}`)
        : router.push(baseUrl);
    }
  };

  const constructQueryArray = (k, v) => `q[${k}][]=${v}`;

  const getUpdatedFilters = (key) => {
    let final_qs = "";
    let updatedFilters = [...appliedFilters];
    let filtersApplied = false;
    updatedFilters.map((filter) => {
      let qs = "";
      filter.data.map((filterData) => {
        if (key === filterData.value) filterData.checked = !filterData.checked;
        if (filterData.checked) {
          let temp_qs = constructQueryArray(filter.queryKey, filterData.value);
          qs = qs ? `${qs}&${temp_qs}` : `${temp_qs}`;
          filtersApplied = true;
        }
      });
      if (qs) final_qs = final_qs ? `${final_qs}&${qs}` : qs;
    });
    return { filters: updatedFilters, queryString: final_qs, filtersApplied };
  };

  const collapseFilter = (key) => {
    let updatedFilters = [...appliedFilters];
    updatedFilters.map((filter) => {
      if (key === filter.queryKey) filter.show = !filter.show;
    });
    setAppliedFilters(updatedFilters);
  };

  useEffect(() => {
    let query = router.query;
    let updatedFilters = [...filterConfig[defaultNftType].filters];
    let filtersApplied = false;
    if (Object.keys(query).length !== 0) {
      updatedFilters.map((filter) => {
        let query_values = query[`q[${filter.queryKey}][]`];
        if (!Array.isArray(query_values)) query_values = [query_values];
        filter.data.map((filterData) => {
          if (query_values?.includes(filterData.value)) {
            filterData.checked = true;
            filtersApplied = true;
          }
        });
      });
    }
    setIsFiltersApplied(filtersApplied);
    setAppliedFilters(updatedFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <div
      className={`${style["filter-container"]} ${
        show ? style["active"] : ""
      }`.trim()}
    >
      <div className={style["filter-inner-box"]}>
        <span
          role="button"
          onClick={onHide}
          className={style["filter-close-btn"]}
        >
          <IoMdClose />
        </span>
        <div className={style["title-block"]}>
          <h4>Filters</h4>
          {isFiltersApplied ? (
            <span
              role={"button"}
              onClick={() => handleCategoryChange(defaultNftType)}
            >
              Clear All
            </span>
          ) : (
            <></>
          )}
        </div>
        <div className={style["filter-block"]}>
          <ul className={`nav ${style["rental-list-nav"]}`}>
            {Object.entries(filterConfig).map(([nftType]) => {
              let filterInfo = filterConfig[nftType];
              return (
                <li key={nftType} className={style["nav-item"]}>
                  <span
                    className={`${style["nav-link"]} ${
                      defaultNftType === nftType ? `${style["active"]}` : ""
                    }`.trim()}
                    aria-current="page"
                    role="button"
                    onClick={() => handleCategoryChange(nftType)}
                  >
                    {filterInfo.title}
                  </span>
                </li>
              );
            })}
          </ul>
          <section className={style["filter-section"]}>
            <aside className={`${style["filter-block"]}`}>
              {appliedFilters.map((filterInfo) => {
                return (
                  <div
                    key={filterInfo.queryKey}
                    className={style["filter-list-items"]}
                  >
                    <h4
                      className={style["header"]}
                      role={"button"}
                      onClick={() => {}}
                    >
                      {filterInfo.title}
                      <span onClick={() => collapseFilter(filterInfo.queryKey)}>
                        {filterInfo.show ? (
                          <IoIosArrowUp />
                        ) : (
                          <IoIosArrowDown />
                        )}
                      </span>
                    </h4>

                    <ul className={filterInfo.show ? "" : style["collapsed"]}>
                      {filterInfo.data.map(({ name, value, checked }) => {
                        return (
                          <li key={`${value}`}>
                            <label
                              htmlFor={`id-${value}`}
                              className={style["checkbox"]}
                            >
                              <input
                                id={`id-${value}`}
                                name="checkbox-group"
                                className="checkbox"
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleFilterChange(value)}
                              />
                              <span className={style["checkbox__mark"]}>
                                <BiCheck />
                              </span>

                              <span className={style["checkbox__info"]}>
                                <span className={style["title"]}>{name}</span>
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </aside>
          </section>
        </div>
      </div>
    </div>
  );
};

const RentalNftFilterCanvas = ({ children, show, onHide }) => {
  return (
    <Offcanvas
      className={style["filter-canvas"]}
      show={show}
      onHide={onHide}
      placement="end"
    >
      <Offcanvas.Header
        className={style["filter-canvas-header"]}
        closeButton
      ></Offcanvas.Header>
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
};

export default RentalNft;
