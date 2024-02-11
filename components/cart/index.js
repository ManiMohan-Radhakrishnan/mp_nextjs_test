import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Offcanvas } from "react-bootstrap";
import { toast } from "react-toastify";
import { BiCheck } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";

import ErrorText from "./error-text";
import images from "../../utils/images.json";
import style from "./style.module.scss";
import {
  get_cart_list_thunk,
  remove_from_cart_thunk,
} from "../../redux/thunk/user_cart_thunk";
import { checkoutApi, getNftPriceBreakup } from "../../utils/methods";
import mixpanel from "mixpanel-browser";
import { EVENT_NAMES, invokeTrackEvent } from "../../utils/track-events";

const Cart = ({ cartPop = false, setCartPop, setCheckoutDevice }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useRouter();
  const { user, cart } = state;
  const userCart = cart?.data ? cart?.data : null;
  const [noBalance, setNoBalance] = useState(false);
  const [success, setSuccess] = useState(false);
  const [checkoutList, setCheckoutList] = useState([]);
  const [successData, setSuccessData] = useState({});
  // const [error, setError] = useState("");
  // const [totalAmount, setTotalAmount] = useState(0);
  const [nftPriceBreakup, setNftPriceBreakup] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [checkoutProcess, setCheckoutProcess] = useState({
    loading: false,
    processClass: "",
  });

  const [trackEventsData, setTrackEventsData] = useState({
    name: [],
    buyAmount: [],
  });

  const user_balance = parseFloat(user?.data?.user?.balance);
  const jump_point_balance = user?.data?.user?.assert_balances?.jump_point || 0;
  const reward_point_balance =
    user?.data?.user?.assert_balances?.reward_point || 0;

  useEffect(() => {
    cartPop &&
      invokeTrackEvent(EVENT_NAMES?.CART_VIEWED, {
        "Line Items": cartLineItems("lineitems"),
        "Total Quantity": userCart?.line_items?.length,
        totalAmount: cartLineItems("total"),
        "Service Fee": parseFloat(userCart?.service_fee),
        TDS: parseFloat(userCart?.tds_rate),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartPop, trackEventsData?.name]);

  const cartLineItems = (type = "lineitems") => {
    let lineItemsArray = [];
    let totalValue = 0;
    userCart?.line_items?.map((obj, index) => {
      lineItemsArray?.push({
        Name: obj?.name,
        BuyAmount: obj?.buy_amount,
      });
      totalValue += parseFloat(obj?.buy_amount);
    });
    if (type === "lineitems") return lineItemsArray;
    else return totalValue;
  };

  const getArrayNames = () => {
    let eventsData = {
      name: [],
      buyAmount: [],
    };
    for (let i = 0; i < userCart?.line_items.length; i++) {
      for (let j = 0; j < selectedItems?.length; j++) {
        if (userCart?.line_items[i]?.line_item_slug === selectedItems[j]) {
          eventsData?.name?.push(userCart?.line_items[i].name);
          eventsData?.buyAmount?.push(userCart?.line_items[i].buy_amount);
        }
      }
    }
    setTrackEventsData(eventsData);
  };

  const lineItemsTrack = () => {
    const lineitems = [];
    try {
      trackEventsData?.name?.map((obj, index) =>
        lineitems?.push({
          Name: trackEventsData.name[index],
          BuyAmount: trackEventsData.buyAmount[index],
        })
      );
    } catch {
      return lineitems;
    }
    return lineitems;
  };

  useEffect(() => {
    if (
      trackEventsData?.name?.length > 0 &&
      trackEventsData?.buyAmount?.length
    ) {
      invokeTrackEvent(EVENT_NAMES.CHECKOUT_COMPLETED, {
        Name: trackEventsData?.name.toString(),
        "Total Amount": parseFloat(nftPriceBreakup?.total),
        "Cash Rewards Points": parseInt(reward_point_balance),
        "JT Points": jump_point_balance,
        "Buy Price": parseFloat(nftPriceBreakup?.total),
        "Line Items": lineItemsTrack(),
        "Service Fee": parseFloat(userCart?.service_fee),
        Balance: user_balance ? parseFloat(user_balance) : null,
        category: null,
        collection: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackEventsData]);

  useEffect(() => {
    if (userCart?.line_items?.length > 0) {
      let items = [];
      userCart?.line_items
        .filter((obj) => obj.order_status === "onsale")
        .map((item) => items.push(item?.line_item_slug));
      items = items.filter(function (item, i, input) {
        return input.indexOf(item) === i;
      });
      setSelectedItems(items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCart]);

  const fetchPriceBreakup = async () => {
    let amount = 0;
    userCart?.line_items
      ?.filter((obj) => selectedItems.includes(obj.line_item_slug))
      .map((nft) => (amount = amount + parseFloat(nft?.buy_amount)));

    const result = await getNftPriceBreakup({ amount, assert_list: [] });
    setNftPriceBreakup(result?.data?.data);
    setNoBalance(parseFloat(user?.data?.user?.balance) < parseFloat(amount));
    // setTotalAmount(amount);
  };

  useEffect(() => {
    cartPop && fetchPriceBreakup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems, cartPop]);

  const handleCheckout = async () => {
    try {
      setCheckoutProcess({ processClass: "loading", loading: true });
      setCheckoutDevice(true);
      const result = await checkoutApi({ selectedItems });
      if (result.data.success) {
        if (process.env.NEXT_PUBLIC_MARKETING_SCRIPT === "enabled") {
          mixpanel.track("Purchased", {
            quantity: result.data.data.total_count,
            amount: result.data.data.total_amount,
          });
        }
        setSuccess(true);
        setCheckoutList(result.data.data.line_items);
        setSuccessData(result.data.data);
        setSelectedItems([]);
        getArrayNames();
      }
      setCheckoutProcess({ processClass: "", loading: false });
      setCheckoutDevice(false);
      dispatch(get_cart_list_thunk());
    } catch (err) {
      console.log(err);
      setCheckoutProcess({ processClass: "", loading: false });
      setCheckoutDevice(false);
      toast.error(
        "The request could not be processed at this time. Please try again."
      );
    }
  };

  const handleCheckNFT = (itemSlug) => {
    let items = [...selectedItems];
    const index = items.indexOf(itemSlug);
    if (index > -1) {
      items.splice(index, 1);
    } else {
      items.push(itemSlug);
    }
    setSelectedItems(items);
  };

  return (
    <Offcanvas
      show={cartPop}
      onHide={() => setCartPop(!cartPop)}
      placement="end"
      className="w-100 w-md-50 w-lg-42"
      backdrop={checkoutProcess.loading ? "static" : true}
    >
      <Offcanvas.Body
        className={`p-0 ${style["pop-body-container"]} ${style["pop-body-container-cart"]}`}
      >
        <>
          {checkoutProcess.loading && (
            <article className={style["loading-box"]}>
              <div className={style["load-card"]}>
                <div className={style["loader"]}></div>
                <h6>Order Processing...</h6>
              </div>
            </article>
          )}
          {!success ? (
            userCart?.line_items?.length > 0 ? (
              <div className={style["pop-cart-details"]}>
                <div className={style["pop-head-content"]}>
                  <div className={style["pop-cart-title"]}>
                    Cart{" "}
                    {userCart &&
                      `(${userCart?.total_count ? userCart?.total_count : 0})`}
                  </div>
                  <div
                    className={style["close-button-pop"]}
                    onClick={() => setCartPop(!cartPop)}
                  >
                    <Image
                      unoptimized={true}
                      height="100"
                      width="100"
                      alt="cart close"
                      src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e"
                    ></Image>
                  </div>
                </div>
                {/* error-progress -> error progress , loading -> progressing */}
                <div
                  className={`${style["pop-cart-progress"]} ${checkoutProcess.processClass}`}
                >
                  <div className={style["progress-complete"]}></div>
                </div>
                <div
                  className={`${style["pop-body-content"]} ${
                    selectedItems.length === 0 ? "selected-none" : ""
                  }`}
                >
                  <div className={style["error-float-container"]}>
                    {noBalance && <ErrorText type="nobalance" />}
                  </div>
                  <div className={style["pop-cart-info"]}>
                    {userCart?.line_items?.map((nft, i) => (
                      <>
                        {nft?.order_status !== "onsale" && (
                          <div
                            className={`${style["cart-error"]} mt-3`}
                            key={`cart-item-error-${i}`}
                          >
                            <div className="d-flex align-items-center">
                              <AiOutlineWarning size={16} color="#F11010" />
                              <span className="ms-2">
                                The NFT has either been sold or no longer
                                listed.
                              </span>
                            </div>
                          </div>
                        )}
                        <div
                          className={`d-flex align-items-center justify-content-between py-4 ${
                            style["cart-item"]
                          } ${
                            nft?.order_status !== "onsale" &&
                            style["cart-disabled"]
                          }`}
                          key={`cart-item-${i}`}
                        >
                          <div className="d-flex ">
                            <div>
                              <label className={style["checkbox"]}>
                                <input
                                  name="checkbox-group"
                                  type="checkbox"
                                  checked={selectedItems?.includes(
                                    nft?.line_item_slug
                                  )}
                                  onChange={() =>
                                    handleCheckNFT(nft?.line_item_slug)
                                  }
                                />
                                <span className={style["checkbox__mark"]}>
                                  <BiCheck />
                                </span>
                              </label>
                            </div>
                            <div
                              className={`${style["cart-img"]} ${
                                !selectedItems?.includes(nft?.line_item_slug)
                                  ? "uncheck"
                                  : ""
                              }`}
                              role={"button"}
                              onClick={() =>
                                window.open(
                                  `${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/order/details/${nft?.nft_slug}/${nft?.order_slug}`,
                                  "_blank"
                                )
                              }
                            >
                              {(() => {
                                if (nft?.asset_type?.includes("image")) {
                                  return (
                                    <Image
                                      unoptimized={true}
                                      height="100"
                                      width="100"
                                      alt="media nft"
                                      src={
                                        nft.asset_url
                                          ? nft.asset_url
                                          : "/sample.gif"
                                      }
                                    />
                                  );
                                } else if (nft?.asset_type?.includes("audio")) {
                                  return (
                                    <>
                                      <Image
                                        unoptimized={true}
                                        height="100"
                                        width="100"
                                        alt="media nft"
                                        src={
                                          nft.cover_url
                                            ? nft.cover_url
                                            : "/sample.gif"
                                        }
                                      />
                                    </>
                                  );
                                } else if (nft?.asset_type?.includes("video")) {
                                  return (
                                    <Image
                                      unoptimized={true}
                                      height="100"
                                      width="100"
                                      alt="media nft"
                                      src={
                                        nft.cover_url
                                          ? nft.cover_url
                                          : "/sample.gif"
                                      }
                                    />
                                  );
                                } else {
                                  return (
                                    <Image
                                      unoptimized={true}
                                      height="100"
                                      width="100"
                                      alt="media nft"
                                      src={
                                        nft.asset_url
                                          ? nft.asset_url
                                          : "/sample.gif"
                                      }
                                    />
                                  );
                                }
                              })()}
                            </div>
                            <div className={style["cart-nft-detail"]}>
                              <span
                                className={`${style["cart-subtitle"]} ${
                                  !selectedItems?.includes(nft?.line_item_slug)
                                    ? style["uncheck"]
                                    : ""
                                }`}
                              >
                                {nft?.category_name}
                              </span>
                              <div
                                className={`d-flex my-2 ${
                                  !selectedItems?.includes(nft?.line_item_slug)
                                    ? "uncheck"
                                    : ""
                                }`}
                              >
                                <h2
                                  role={"button"}
                                  onClick={() =>
                                    window.open(
                                      `${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/order/details/${nft?.nft_slug}/${nft?.order_slug}`,
                                      "_blank"
                                    )
                                  }
                                >
                                  {nft?.name}
                                </h2>
                              </div>
                              <div
                                className={`${
                                  style["remove-cart"]
                                }  d-flex align-items-center ${
                                  nft?.order_status !== "onsale" && "text-white"
                                }`}
                                onClick={() => {
                                  invokeTrackEvent(
                                    EVENT_NAMES?.REMOVED_FROM_CART,
                                    { name: nft?.name }
                                  );
                                  dispatch(
                                    remove_from_cart_thunk(nft?.line_item_slug)
                                  );
                                }}
                                role={"button"}
                              >
                                <MdDelete className="me-1" size={16} />{" "}
                                <span>Remove</span>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`${
                              style["nft-cart-price"]
                            } d-flex align-items-center ${
                              !selectedItems?.includes(nft?.line_item_slug)
                                ? style["uncheck"]
                                : ""
                            }`}
                          >
                            {`$${nft?.buy_amount}`}
                          </div>
                          <>
                            {nft.bundle_id && (
                              <div className={`${style["bundle-batch"]}`}>
                                <div className={style["bundle-badge"]}>
                                  Bundle
                                </div>
                              </div>
                            )}
                          </>
                        </div>
                      </>
                    ))}

                    {/* cart-disabled and className="text-white" for remove */}
                  </div>
                </div>
                {selectedItems.length > 0 && (
                  <div className={`${style["bottom-content-cart"]} py-4`}>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className={style["cart-servicefee"]}>
                        <p>
                          TOTAL ITEMS: <span>{selectedItems.length}</span>
                        </p>

                        <p>
                          SERVICE FEE: <span>{userCart?.service_fee}%</span>{" "}
                          {user?.data?.user?.apply_buy_tds && (
                            <>
                              + TDS Fee:<span>{userCart?.tds_rate}%</span>
                            </>
                          )}
                        </p>
                      </div>
                      <div className="cart-total text-end">
                        <span className="mb-3 d-block">TOTAL AMOUNT</span>
                        <h2>{`$${nftPriceBreakup?.total}`}</h2>
                      </div>
                    </div>
                  </div>
                )}
                <div className={style["cart-bottom-btn"]}>
                  <div className={`text-center ${style["flex-btn"]}`}>
                    <button
                      className={`${style["cart-btn"]} text-center btn-lg mt-2 rounded-pill full-width`}
                      onClick={handleCheckout}
                      disabled={
                        selectedItems.length === 0 ||
                        parseFloat(user?.data?.user?.balance) <
                          nftPriceBreakup?.total ||
                        user?.data?.user?.kyc_status !== "success" ||
                        checkoutProcess.loading
                      }
                    >
                      {checkoutProcess.loading ? "Processing..." : "BUY NFTs"}
                    </button>
                    <div className="mt-2 royalty-info"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={style["pop-cart-details"]}>
                <div className={style["pop-head-content"]}>
                  <div className={style["pop-cart-title"]}></div>
                  <div
                    className={style["close-button-pop"]}
                    onClick={() => setCartPop(!cartPop)}
                  >
                    <Image
                      unoptimized={true}
                      height="100"
                      width="100"
                      alt="cart close"
                      src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e"
                    ></Image>
                  </div>
                </div>
                {/* error-progress -> error progress , loading -> progressing */}

                <div
                  className={`${style["pop-body-content"]} d-flex align-items-center justify-content-center ${style["empty-cart-content"]}`}
                >
                  <div className={style["pop-cart-info"]}>
                    <div
                      className={`d-block text-center py-4 ${style["empty-cart-item"]}`}
                    >
                      <Image
                        unoptimized={true}
                        height="100"
                        width="100"
                        src={images.emptyCartSVG}
                        alt="empty-cart-item"
                        loading="lazy"
                      />
                    </div>
                    <div className={`text-center ${style["empty-cart"]}`}>
                      <h3>Your cart is empty!</h3>
                      <p className="mt-2">Let&apos;s explore the Listed NFTs</p>
                    </div>
                  </div>
                </div>

                <div className={style["cart-bottom-btn"]}>
                  <div className={`text-center ${style["flex-btn"]}`}>
                    <button
                      className={`text-center btn-lg mt-2 rounded-pill ${style["cart-btn"]}`}
                      onClick={() => {
                        setCartPop(!cartPop);
                        history.push("/nft-marketplace");
                      }}
                    >
                      Explore
                    </button>
                    <div className="mt-2 royalty-info"></div>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className={style["pop-cart-details"]}>
              <div className={style["pop-head-content"]}>
                <div className={style["pop-cart-title"]}>Checkout</div>
                <div
                  className={style["close-button-pop"]}
                  onClick={() => {
                    setCartPop(!cartPop);
                    setSuccess(false);
                  }}
                >
                  <Image
                    unoptimized={true}
                    height="100"
                    width="100"
                    alt="cart close"
                    src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e"
                  ></Image>
                </div>
              </div>
              {/* error-progress -> error progress , loading -> progressing */}
              <div className={`pop-cart-progress success`}>
                <div className="progress-complete"></div>
              </div>
              <div className={`${style["pop-body-content"]} success`}>
                {parseInt(successData?.final_amount) > 0 ? (
                  <div className={`${style["order-placed"]} text-center py-4`}>
                    <Image
                      unoptimized={true}
                      height="100"
                      width="100"
                      src={images.doneSVG}
                      alt="order-place"
                      loading="lazy"
                    />
                    <h2 className="py-4">Order Processed Successfully</h2>
                  </div>
                ) : (
                  <div className={`${style["order-placed"]} text-center py-4`}>
                    <Image
                      unoptimized={true}
                      height="100"
                      width="100"
                      src={images.cut}
                      alt="order-fail"
                      loading="lazy"
                    />
                    <h2 className="py-4">Order Processing Unsuccessful.</h2>
                  </div>
                )}

                <div className={style["pop-cart-info"]}>
                  {checkoutList.length > 0 &&
                    checkoutList.map((nft, i) => (
                      <>
                        {nft?.status === "failed" && (
                          <div className={`${style["cart-error"]}  mt-3`}>
                            <div className="d-flex align-items-center">
                              <AiOutlineWarning size={16} color="#F11010" />
                              <span className="ms-2">
                                The NFT has either been sold or no longer
                                listed.
                              </span>
                            </div>
                          </div>
                        )}
                        <div
                          className={`d-flex align-items-center justify-content-between py-4 ${
                            style["cart-item"]
                          } ${nft?.status === "failed" && "cart-disabled"}`}
                          key={`checkout-item-${i}`}
                        >
                          <div className="d-flex ">
                            <div className={style["cart-img"]}>
                              {(() => {
                                if (nft?.asset_type?.includes("image")) {
                                  return (
                                    <Image
                                      unoptimized={true}
                                      height="100"
                                      width="100"
                                      alt="media nft"
                                      src={
                                        nft.asset_url
                                          ? nft.asset_url
                                          : "/sample.gif"
                                      }
                                    />
                                  );
                                } else if (nft?.asset_type?.includes("audio")) {
                                  return (
                                    <>
                                      <Image
                                        unoptimized={true}
                                        height="100"
                                        width="100"
                                        alt="media nft"
                                        src={
                                          nft.cover_url
                                            ? nft.cover_url
                                            : "/sample.gif"
                                        }
                                      />
                                    </>
                                  );
                                } else if (nft?.asset_type?.includes("video")) {
                                  return (
                                    <Image
                                      unoptimized={true}
                                      height="100"
                                      width="100"
                                      alt="media nft"
                                      src={
                                        nft.cover_url
                                          ? nft.cover_url
                                          : "/sample.gif"
                                      }
                                    />
                                  );
                                } else {
                                  return (
                                    <Image
                                      unoptimized={true}
                                      height="100"
                                      width="100"
                                      alt="media nft"
                                      src={
                                        nft.asset_url
                                          ? nft.asset_url
                                          : "/sample.gif"
                                      }
                                    />
                                  );
                                }
                              })()}
                            </div>
                            <div className={style["cart-nft-detail"]}>
                              <span className={style["cart-subtitle"]}>
                                {nft?.category_name}
                              </span>
                              <div className="d-flex my-2">
                                <h2>{nft?.name}</h2>
                              </div>
                              <div
                                className={`${style["qty"]} d-flex align-items-center`}
                              >
                                <span>Qty: {nft?.quantity}</span>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`${style["nft-cart-price"]} d-flex align-items-center`}
                          >
                            {`$${nft?.buy_amount}`}
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              </div>

              <div className={`${style["bottom-content-cart"]} py-4`}>
                <div className={style["cart-fee-info-block"]}>
                  <div className={style["cart-fee-info"]}>
                    <span className="key">TOTAL ITEMS</span>
                    <h2 className="value">{successData?.total_count}</h2>
                  </div>
                  <div className={style["cart-fee-info"]}>
                    <span className="key">PRICE</span>
                    <h2 className="value">{`$${successData?.total_amount}`}</h2>
                  </div>
                  <div className={style["cart-fee-info"]}>
                    <span className="key">
                      SERVICE FEE ({successData?.service_fee}%)
                    </span>
                    <h2 className="value">
                      {`$${successData?.total_service_fee}`}
                    </h2>
                  </div>
                  <div className={`${"cart-fee-info"} ${"total-amount"}`}>
                    <span className="key">TOTAL AMOUNT</span>
                    <h2 className="value">{`$${successData?.final_amount}`}</h2>
                  </div>
                </div>
              </div>

              {/* <div className={style["cart-bottom-btn"]}>
                <div className={`text-center ${style["flex-btn"]}`}>
                  <button
                    className={`${"cart-btn"} text-center btn-lg mt-2 rounded-pill full-width`}
                    onClick={() => {
                      setCartPop(!cartPop);
                      setSuccess(false);
                      setSelectedItems([]);
                    }}
                  >
                    OKAY
                  </button>
                  <div className="mt-2 royalty-info"></div>
                </div>
              </div> */}
            </div>
          )}
        </>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
