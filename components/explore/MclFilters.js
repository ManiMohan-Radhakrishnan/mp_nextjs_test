import { useRouter } from "next/router";
import { forwardRef } from "react";
import { FormControl } from "react-bootstrap";
import { BiCheck } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { validateCurrency } from "../../utils/common";

import style from "./style.module.scss";

const MclFilters = ({
  filter,
  setFilter,
  priceRangeFilter,
  priceRange,
  setPriceRange,
  handleFilterCheck,
}) => {
  const router = useRouter();
  const query = router.query;
  const PriceDropdown = forwardRef(({ onClick }, ref) => (
    <div
      className={`${style["filter-drop-btn"]} me-2`}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      {priceRangeFilter.from && priceRangeFilter.to
        ? `Price Range $${priceRangeFilter.from} - $${priceRangeFilter.to}`
        : priceRangeFilter.from
        ? `Min $${priceRangeFilter.from}`
        : priceRangeFilter.to
        ? `Max $${priceRangeFilter.to}`
        : "Price Range"}
    </div>
  ));

  PriceDropdown.displayName = "PriceDropdown";
  return (
    <>
      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              showNFTCategory: !filter.showNFTCategory,
            })
          }
        >
          Role {filter.showNFTCategory ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {filter.showNFTCategory && (
          <ul>
            {filter.nftCategory.map((obj, i) => (
              <li key={`nft-category-${i}`}>
                <label htmlFor={`${obj.name}`} className={style["checkbox"]}>
                  <input
                    id={`${obj.name}`}
                    name="checkbox-group"
                    type="checkbox"
                    checked={obj.checked}
                    onChange={() =>
                      handleFilterCheck(obj, "NFT_category_check")
                    }
                  />
                  <span className={style["checkbox__mark"]}>
                    <BiCheck />
                  </span>

                  <span className={style["checkbox__info"]}>
                    <span className={style["title"]}>{obj.name}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              showNFTCollection: !filter.showNFTCollection,
            })
          }
        >
          Category{" "}
          {filter.showNFTCollection ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {filter.showNFTCollection && (
          <ul>
            {filter.nftCollection.map((obj, i) => (
              <li key={`collection-${i}`}>
                <label htmlFor={`${obj.name}`} className={style["checkbox"]}>
                  <input
                    id={`${obj.name}`}
                    name="checkbox-group"
                    type="checkbox"
                    checked={obj.checked}
                    onChange={() =>
                      handleFilterCheck(obj, "NFT_collection_check")
                    }
                  />
                  <span className={style["checkbox__mark"]}>
                    <BiCheck />
                  </span>

                  <span className={style["checkbox__info"]}>
                    <span className={style["title"]}>{obj.name}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              showCryptoAssets: !filter.showCryptoAssets,
            })
          }
        >
          Crypto Asset{" "}
          {filter.showCryptoAssets ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {filter.showCryptoAssets && (
          <ul>
            {filter.cryptoAssets.map((obj, i) => (
              <li key={`collection-${i}`}>
                <label htmlFor={`${obj.name}`} className={style["checkbox"]}>
                  <input
                    id={`${obj.name}`}
                    name="checkbox-group"
                    type="checkbox"
                    checked={obj.checked}
                    onChange={() =>
                      handleFilterCheck(obj, "Crypto_asset_check")
                    }
                  />
                  <span className={style["checkbox__mark"]}>
                    <BiCheck />
                  </span>

                  <span className={style["checkbox__info"]}>
                    <span className={style["title"]}>{obj.name}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              showBatTypes: !filter.showBatTypes,
            })
          }
        >
          Bat Types{" "}
          {filter.showBatTypes ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {filter.showBatTypes && (
          <ul>
            {filter.batTypes.map((obj, i) => (
              <li key={`collection-${i}`}>
                <label htmlFor={`${obj.name}`} className={style["checkbox"]}>
                  <input
                    id={`${obj.name}`}
                    name="checkbox-group"
                    type="checkbox"
                    checked={obj.checked}
                    onChange={() => handleFilterCheck(obj, "bat_type_check")}
                  />
                  <span className={style["checkbox__mark"]}>
                    <BiCheck />
                  </span>

                  <span className={style["checkbox__info"]}>
                    <span className={style["title"]}>{obj.name}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              showPlayers: !filter.showPlayers,
            })
          }
        >
          Signed By {filter.showPlayers ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {filter.showPlayers && (
          <ul className={style["scrollable-list"]}>
            {filter.players.map((obj, i) => (
              <li key={`has-glc-${i}`}>
                <label htmlFor={`${obj.name}`} className={style["checkbox"]}>
                  <input
                    id={`${obj.name}`}
                    name="checkbox-group"
                    type="checkbox"
                    checked={obj.checked}
                    onClick={() => {
                      handleFilterCheck(obj, "players");
                    }}
                  />
                  <span className={style["checkbox__mark"]}>
                    <BiCheck />
                  </span>

                  <span className={style["checkbox__info"]}>
                    <span className={style["title"]}>{obj.name}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              showLevel: !filter.showLevel,
            })
          }
        >
          Level {filter.showLevel ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {filter.showLevel && (
          <ul className={style["scrollable-list"]}>
            {filter.level.map((obj, i) => (
              <li key={`level-${i}`}>
                <label htmlFor={`${obj.name}`} className={style["checkbox"]}>
                  <input
                    id={`${obj.name}`}
                    name="checkbox-group"
                    type="checkbox"
                    checked={obj.checked}
                    onClick={() => {
                      handleFilterCheck(obj, "NFT_level");
                    }}
                  />
                  <span className={style["checkbox__mark"]}>
                    <BiCheck />
                  </span>

                  <span className={style["checkbox__info"]}>
                    <span className={style["title"]}>{obj.name}</span>
                  </span>
                </label>
              </li>
              //   }
              // />
            ))}
          </ul>
        )}
      </div>

      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              showSale: !filter.showSale,
            })
          }
        >
          Sale Type {filter.showSale ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {filter.showSale && (
          <ul>
            {filter.sale.map((obj, i) => (
              <li key={`sale-type-${i}`}>
                <label htmlFor={`${obj.name}`} className={style["checkbox"]}>
                  <input
                    id={`${obj.name}`}
                    name="checkbox-group"
                    type="checkbox"
                    checked={obj.checked}
                    onChange={() => handleFilterCheck(obj, "sale_check")}
                  />
                  <span className={style["checkbox__mark"]}>
                    <BiCheck />
                  </span>

                  <span className={style["checkbox__info"]}>
                    <span className={style["title"]}>{obj.name}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              showStatus: !filter.showStatus,
            })
          }
        >
          Sale Status{" "}
          {filter.showStatus ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {filter.showStatus && (
          <ul>
            {filter.status.map((obj, i) => (
              <li key={`sale-type-${i}`}>
                <label htmlFor={`${obj.name}`} className={style["checkbox"]}>
                  <input
                    id={`${obj.name}`}
                    name="checkbox-group"
                    type="checkbox"
                    checked={obj.checked}
                    onChange={() => handleFilterCheck(obj, "sale_status_NFT")}
                  />
                  <span className={style["checkbox__mark"]}>
                    <BiCheck />
                  </span>

                  <span className={style["checkbox__info"]}>
                    <span className={style["title"]}>{obj.name}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              auction: !filter.auction,
            })
          }
        >
          Auction {filter.auction ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {filter.auction && (
          <ul>
            {filter.sort
              .filter((o) =>
                ["auction_ending_soon", "auction_starting_soon"].includes(
                  o.value
                )
              )
              .map((obj, i) => (
                <li key={`sale-type-${i}`}>
                  <label htmlFor={`${obj.name}`} className={style["checkbox"]}>
                    <input
                      id={`${obj.name}`}
                      name="checkbox-group"
                      type="checkbox"
                      checked={obj.checked}
                      onChange={() => handleFilterCheck(obj, "sort_NFT")}
                    />
                    <span className={style["checkbox__mark"]}>
                      <BiCheck />
                    </span>

                    <span className={style["checkbox__info"]}>
                      <span className={style["title"]}>{obj.name}</span>
                    </span>
                  </label>
                </li>
              ))}
          </ul>
        )}
      </div>
      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              price: !filter.price,
            })
          }
        >
          Price {filter.price ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>

        {filter.price && (
          <ul>
            {priceRangeFilter.from ? (
              <>
                <PriceDropdown />
                <div className={style["prifilter-btn"]}>
                  <button
                    style={
                      priceRange.from
                        ? {
                            backgroundColor: "transparent",
                            borderColor: "#ed7e4b",
                            color: "#ed7e4b",
                          }
                        : {
                            backgroundColor: "#989e99",
                            pointerEvents: "none",
                            color: "black",
                          }
                    }
                    type="button"
                    className={style["border-dropdown-item-clr"]}
                    onClick={(e) => {
                      handleFilterCheck(priceRange, "price_range", true);
                      setPriceRange({
                        from: "",
                        to: "",
                      });
                    }}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    className={style["border-dropdown-item"]}
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
                      } else if (
                        priceRange.from === "" ||
                        priceRange.from === null ||
                        query["minPrice"]
                      ) {
                        return true;
                      } else {
                        return false;
                      }
                    })()}
                    onClick={(e) =>
                      handleFilterCheck(priceRange, "price_range")
                    }
                  >
                    <span>Apply</span>
                  </button>
                </div>
              </>
            ) : (
              <div>
                <div className={`${style["content-note"]} ${style["d-flex1"]}`}>
                  <span className={`${style["category-search-block"]} me-1`}>
                    <FormControl
                      className={style["category-search"]}
                      placeholder="Min"
                      // type="number"
                      onChange={(e) => {
                        if (e.target.value && e.target.value.length <= 9) {
                          if (validateCurrency(e.target.value)) {
                            setPriceRange({
                              ...priceRange,
                              from: parseInt(e.target.value),
                            });
                          }
                        } else {
                          setPriceRange({
                            ...priceRange,
                            from: "",
                          });
                        }
                      }}
                      value={priceRange.from}
                    />
                  </span>
                  <span className={style["category-search-block"]}>
                    <FormControl
                      className={style["category-search"]}
                      placeholder="Max"
                      // type="number"
                      onChange={(e) => {
                        if (e.target.value && e.target.value.length <= 9) {
                          if (validateCurrency(e.target.value)) {
                            setPriceRange({
                              ...priceRange,
                              to: parseInt(e.target.value),
                            });
                          }
                        } else {
                          setPriceRange({
                            ...priceRange,
                            to: "",
                          });
                        }
                      }}
                      value={priceRange.to}
                    />
                  </span>
                </div>

                <div className={style["prifilter-btn"]}>
                  <button
                    style={
                      priceRange.from
                        ? {
                            backgroundColor: "transparent",
                            borderColor: "#ed7e4b",
                            color: "#ed7e4b",
                          }
                        : {
                            backgroundColor: "#989e99",
                            pointerEvents: "none",
                            color: "black",
                          }
                    }
                    type="button"
                    className={style["border-dropdown-item-clr"]}
                    onClick={(e) => {
                      handleFilterCheck(priceRange, "price_range", true);
                      setPriceRange({
                        from: "",
                        to: "",
                      });
                    }}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    className={style["border-dropdown-item"]}
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
                      } else if (
                        priceRange.from === "" ||
                        priceRange.from === null ||
                        query["minPrice"]
                      ) {
                        return true;
                      } else {
                        return false;
                      }
                    })()}
                    onClick={(e) =>
                      handleFilterCheck(priceRange, "price_range")
                    }
                  >
                    <span>Apply</span>
                  </button>
                </div>
              </div>
            )}
          </ul>
        )}
      </div>

      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              showGlC: !filter.showGlC,
            })
          }
        >
          GL Coin Rewards{" "}
          {filter.showGlC ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {filter.showGlC && (
          <ul>
            {filter.glCoin.map((obj, i) => (
              <li key={`has-glc-${i}`}>
                <label htmlFor={`${obj.name}`} className={style["checkbox"]}>
                  <input
                    id={`${obj.name}`}
                    name="checkbox-group"
                    type="checkbox"
                    checked={obj.checked}
                    onChange={() => handleFilterCheck(obj, "has_GLC")}
                  />
                  <span className={style["checkbox__mark"]}>
                    <BiCheck />
                  </span>

                  <span className={style["checkbox__info"]}>
                    <span className={style["title"]}>{obj.name}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default MclFilters;
