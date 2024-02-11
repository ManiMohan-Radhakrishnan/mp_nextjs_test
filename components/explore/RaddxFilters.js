import { useRouter } from "next/router";
import { forwardRef } from "react";
import { FormControl } from "react-bootstrap";
import { BiCheck } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { validateCurrency } from "../../utils/common";

import style from "./style.module.scss";

const RaddxFilters = ({
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
      {/* Categories / Roles */}
      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              showCategories: !filter.showCategories,
            })
          }
        >
          Role {filter.showCategories ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {filter.showCategories && (
          <ul>
            {filter.categories.map((obj, i) => (
              <li key={`nft-category-${i}`}>
                <label htmlFor={`${obj.name}`} className={style["checkbox"]}>
                  <input
                    id={`${obj.name}`}
                    name="checkbox-group"
                    type="checkbox"
                    checked={obj.checked}
                    onChange={() => handleFilterCheck(obj, obj.filterKey)}
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
      {/* Car Categories */}
      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              showCarCategories: !filter.showCarCategories,
            })
          }
        >
          Car Categories{" "}
          {filter.showCarCategories ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {filter.showCarCategories && (
          <ul>
            {filter.carCategories.map((obj, i) => (
              <li key={`nft-category-${i}`}>
                <label htmlFor={`${obj.name}`} className={style["checkbox"]}>
                  <input
                    id={`${obj.name}`}
                    name="checkbox-group"
                    type="checkbox"
                    checked={obj.checked}
                    onChange={() => handleFilterCheck(obj, obj.filterKey)}
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
      {/* Sub Categories */}
      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              showSubCategories: !filter.showSubCategories,
            })
          }
        >
          Car Sub Categories{" "}
          {filter.showSubCategories ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {filter.showSubCategories && (
          <ul>
            {filter.subCategories.map((obj, i) => (
              <li key={`collection-${i}`}>
                <label htmlFor={`${obj.name}`} className={style["checkbox"]}>
                  <input
                    id={`${obj.name}`}
                    name="checkbox-group"
                    type="checkbox"
                    checked={obj.checked}
                    onChange={() => handleFilterCheck(obj, obj.filterKey)}
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

      {/* Car Models */}
      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              showCarModels: !filter.showCarModels,
            })
          }
        >
          Car Models{" "}
          {filter.showCarModels ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {filter.showCarModels && (
          <ul>
            {filter.carModels.map((obj, i) => (
              <li key={`collection-${i}`}>
                <label htmlFor={`${obj.name}`} className={style["checkbox"]}>
                  <input
                    id={`${obj.name}`}
                    name="checkbox-group"
                    type="checkbox"
                    checked={obj.checked}
                    onChange={() => handleFilterCheck(obj, obj.filterKey)}
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
      {/* Body Surface */}
      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              showBodySurface: !filter.showBodySurface,
            })
          }
        >
          Car Body Surface{" "}
          {filter.showBodySurface ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {filter.showBodySurface && (
          <ul>
            {filter.bodySurface.map((obj, i) => (
              <li key={`collection-${i}`}>
                <label htmlFor={`${obj.name}`} className={style["checkbox"]}>
                  <input
                    id={`${obj.name}`}
                    name="checkbox-group"
                    type="checkbox"
                    checked={obj.checked}
                    onChange={() => handleFilterCheck(obj, obj.filterKey)}
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
      {/* Level */}
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
          Car Level {filter.showLevel ? <IoIosArrowUp /> : <IoIosArrowDown />}
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
                      handleFilterCheck(obj, obj.filterKey);
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
      {/* Land Sub Categories */}
      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              showLandSubcategories: !filter.showLandSubcategories,
            })
          }
        >
          Land Sub Categories{" "}
          {filter.showLandSubcategories ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {filter.showLandSubcategories && (
          <ul>
            {filter.landSubCategories.map((obj, i) => (
              <li key={`collection-${i}`}>
                <label htmlFor={`${obj.name}`} className={style["checkbox"]}>
                  <input
                    id={`${obj.name}`}
                    name="checkbox-group"
                    type="checkbox"
                    checked={obj.checked}
                    onChange={() => handleFilterCheck(obj, obj.filterKey)}
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
      {/* Building Sub Categories */}
      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              showBuildingSubCategories: !filter.showBuildingSubCategories,
            })
          }
        >
          Building Sub Categories{" "}
          {filter.showBuildingSubCategories ? (
            <IoIosArrowUp />
          ) : (
            <IoIosArrowDown />
          )}
        </h4>
        {filter.showBuildingSubCategories && (
          <ul>
            {filter.buildingSubCategories.map((obj, i) => (
              <li key={`collection-${i}`}>
                <label htmlFor={`${obj.name}`} className={style["checkbox"]}>
                  <input
                    id={`${obj.name}`}
                    name="checkbox-group"
                    type="checkbox"
                    checked={obj.checked}
                    onChange={() => handleFilterCheck(obj, obj.filterKey)}
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
      {/* Sale Type */}
      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              showSaleType: !filter.showSaleType,
            })
          }
        >
          Sale Type{" "}
          {filter.showSaleType ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {filter.showSaleType && (
          <ul>
            {filter.saleType.map((obj, i) => (
              <li key={`sale-type-${i}`}>
                <label htmlFor={`${obj.name}`} className={style["checkbox"]}>
                  <input
                    id={`${obj.name}`}
                    name="checkbox-group"
                    type="checkbox"
                    checked={obj.checked}
                    onChange={() => handleFilterCheck(obj, obj.filterKey)}
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
      {/* Sale Status */}
      <div className={style["filter-list-items"]}>
        <h4
          className={style["header"]}
          role={"button"}
          onClick={() =>
            setFilter({
              ...filter,
              showSaleKind: !filter.showSaleKind,
            })
          }
        >
          Sale Status{" "}
          {filter.showSaleKind ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h4>
        {filter.showSaleKind && (
          <ul>
            {filter.saleKind.map((obj, i) => (
              <li key={`sale-type-${i}`}>
                <label htmlFor={`${obj.name}`} className={style["checkbox"]}>
                  <input
                    id={`${obj.name}`}
                    name="checkbox-group"
                    type="checkbox"
                    checked={obj.checked}
                    onChange={() => handleFilterCheck(obj, obj.filterKey)}
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
      {/* Price Range */}
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
    </>
  );
};

export default RaddxFilters;
