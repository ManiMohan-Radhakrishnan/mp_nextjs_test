import dayjs from "dayjs";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Offcanvas } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";

import ErrorText from "./error-text";
import images from "../../utils/images.json";
import ToolTip from "../tooltip/index";
import useDebounce from "../../utils/useDebounce";
import {
  bidBuyError,
  currencyFormat,
  debounceFactory,
  validateCurrency,
  validateCurrencyShot,
} from "../../utils/common";
import { getNftPriceBreakup, nftBidApi } from "../../utils/methods";
import { EVENT_NAMES, invokeTrackEvent } from "../../utils/track-events";

const NFTPlaceBid = ({
  placeBidPop = false,
  setPlaceBidPop,
  nft,
  orderDetails,
  // socketData,
  price,
  soldOut,
  transferringNFT,
  // isOrderOnSale,
  isOrderCancelled,
  isAuctionEnded,
  orderSlug,
  ownedBy,
  auctionEndTime,
}) => {
  const { user } = useSelector((state) => state.user.data);
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState({});

  const erc721 = nft.nft_type === "erc721";
  const [noBalance, setNoBalance] = useState(false);

  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [nftPriceBreakup, setNftPriceBreakup] = useState({});

  const taxCalculator = async (amount) => {
    try {
      setLoading(true);
      const result = await getNftPriceBreakup({
        amount,
        assert_list: [],
      });
      setNftPriceBreakup(result?.data?.data);
    } catch (error) {
      console.log("Error in payment splits", error);
    } finally {
      setLoading(false);
    }
  };

  useDebounce(() => taxCalculator(bidAmount), 500, bidAmount);

  // const debouncedTaxCalculator = useCallback(
  //   debounceFactory(taxCalculator, 500),
  //   []
  // );

  const [buy, setBuy] = useState({
    amountClass: "",
    progressError: "",
    buttonDisable: true,
    processClass: "",
    buttonName: "Buy NFTs",
    isError: false,
    errorTitle: "",
    errorDescription: "",
  });

  const [bid, setBid] = useState({
    bidError: "",
    progressError: "",
    buttonDisable: true,
    processClass: "",
    buttonName: "Place Bid",
    isError: false,
    errorTitle: "",
    errorDescription: "",
  });

  //pop up reset
  useEffect(() => {
    setNoBalance(false);
    setBidAmount("");
    setError("");
    setBid({
      bidError: "",
      progressError: "",
      buttonDisable: true,
      processClass: "",
      buttonName: "Place Bid",
      isError: false,
      errorTitle: "",
      errorDescription: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBid = async () => {
    if (!user)
      window.open(
        `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/signin?redirect=${window.location.href}`,
        "_self"
      );

    try {
      setBid({
        ...bid,
        progressError: "loading",
        processClass: "process",
        buttonName: "Processing...",
        buttonDisable: true,
      });
      const result = await nftBidApi({
        order_slug: orderSlug,
        order: { amount: parseFloat(bidAmount) },
      });
      if (result.data.success) {
        setSuccess(true);
        setSuccessData(result.data.data.bid);
        setBid({
          ...bid,
          progressError: "",
          processClass: "",
          buttonName: "Place Bid",
          buttonDisable: false,
        });
      }
    } catch (error) {
      if (error.response.data.status === 422) {
        const err = bidBuyError(error.response.data.fail_status);
        setBid({
          ...bid,
          isError: true,
          progressError: "error-progress",
          errorTitle: err.title,
          errorDescription: err.description,
        });
      } else if (error.response.data.status === 404) {
        const err = bidBuyError(404);
        setBid({
          ...buy,
          isError: true,
          progressError: "error-progress",
          errorTitle: err.title,
          errorDescription: err.description,
        });
      }

      const err = bidBuyError(error.response.data.fail_status);
      setBid({
        ...bid,
        isError: true,
        progressError: "error-progress",
        errorTitle: err.title,
        errorDescription: err.description,
      });
    }
  };

  const handleSuccess = () => {
    setPlaceBidPop(!placeBidPop);
    setSuccess(false);
    // setBuyQuantity("");
    // setBuyAmount(0);
    setBuy({
      ...buy,
      amountClass: "",
      buttonDisable: true,
    });
    setBidAmount("");
    setBid({
      ...bid,
      buttonDisable: true,
    });
  };

  const handleBidInputChange = async (e) => {
    if (
      e.target.value &&
      e.target.value.length <= process.env.NEXT_PUBLIC_AMOUNT_MAX_LENGTH
    ) {
      const minimumBid = price ? price : orderDetails.minimum_bid;

      if (nft?.core_statistics?.role?.value === "Shot") {
        if (validateCurrencyShot(e.target.value)) {
          if (user) {
            if (parseFloat(user.balance) < parseFloat(e.target.value)) {
              setBid({
                ...bid,
                progressError: "error-progress",
                buttonDisable: true,
              });
              setError("error-balance");
              setNoBalance(true);
              setBidAmount(e.target.value);
            } else if (
              (price || orderDetails.total_bids > 0) &&
              parseFloat(e.target.value) <= parseFloat(minimumBid)
            ) {
              setBid({
                ...bid,
                progressError: "error-progress",
                buttonDisable: true,
              });
              setError("error-bid");
              setNoBalance(false);
              setBidAmount(e.target.value);
            } else if (
              (!price || orderDetails.total_bids === 0) &&
              parseFloat(e.target.value) < parseFloat(orderDetails.starting_bid)
            ) {
              setBid({
                ...bid,
                progressError: "error-progress",
                buttonDisable: true,
              });
              setError("error-bid");
              setNoBalance(false);
              setBidAmount(e.target.value);
            } else {
              setBid({ ...bid, progressError: "", buttonDisable: false });
              setNoBalance(false);
              setError("");
              setBidAmount(e.target.value);
            }
          } else {
            setBidAmount(e.target.value);
            setBid({ ...bid, buttonDisable: false });
          }
        }
      } else {
        if (validateCurrency(e.target.value)) {
          if (user) {
            if (parseFloat(user.balance) < parseFloat(e.target.value)) {
              setBid({
                ...bid,
                progressError: "error-progress",
                buttonDisable: true,
              });
              setError("error-balance");
              setNoBalance(true);
              setBidAmount(e.target.value);
            } else if (
              (price || orderDetails.total_bids > 0) &&
              parseFloat(e.target.value) <= parseFloat(minimumBid)
            ) {
              setBid({
                ...bid,
                progressError: "error-progress",
                buttonDisable: true,
              });
              setError("error-bid");
              setNoBalance(false);
              setBidAmount(e.target.value);
            } else if (
              (!price || orderDetails.total_bids === 0) &&
              parseFloat(e.target.value) < parseFloat(orderDetails.starting_bid)
            ) {
              setBid({
                ...bid,
                progressError: "error-progress",
                buttonDisable: true,
              });
              setError("error-bid");
              setNoBalance(false);
              setBidAmount(e.target.value);
            } else {
              setBid({ ...bid, progressError: "", buttonDisable: false });
              setNoBalance(false);
              setError("");
              setBidAmount(e.target.value);
            }
          } else {
            setBidAmount(e.target.value);
            setBid({ ...bid, buttonDisable: false });
          }
        }
      }
      // await debouncedTaxCalculator(e.target.value);
    } else {
      setBidAmount("");
      setNoBalance(false);
      setError("");
      setBid({ ...bid, bidError: "", progressError: "", buttonDisable: true });
    }
  };

  const calculateWithTdsAmount = (bidAmt, s_fee, tds_fee) => {
    let bid = parseFloat(bidAmt);
    let fee = (parseFloat(tds_fee) + parseFloat(s_fee)) / 100;
    return bid + bid * parseFloat(fee);
  };

  return (
    <Offcanvas
      show={placeBidPop}
      onHide={() => setPlaceBidPop(!placeBidPop)}
      placement="end"
      className="w-100 w-md-50 w-lg-42"
    >
      <Offcanvas.Body className={`p-0 pop-body-container`}>
        {user ? (
          <>
            <div className={"pop-nft-details"}>
              {!success ? (
                <>
                  <div className={"pop-head-content"}>
                    <div className={"pop-bid-title"}>Place Your Bid</div>
                    <div
                      className={"close-button-pop"}
                      onClick={() => setPlaceBidPop(!placeBidPop)}
                    >
                      <Image
                        unoptimized={true}
                        alt="place bid logo"
                        width={20}
                        height={20}
                        src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e"
                      />
                    </div>
                  </div>

                  {/* error-progress -> error progress , loading -> progressing */}
                  <div className={`pop-bid-progress ${bid.progressError}`}>
                    <div className={"progress-complete"}></div>
                  </div>
                  <div className={"pop-body-content"}>
                    <div className={"error-float-container"}>
                      {noBalance && <ErrorText type="nobalance" />}
                      {/* <ErrorText type="ending-time" /> */}

                      {bid.isError && (
                        <ErrorText
                          handleClick={() =>
                            setBid({
                              ...bid,
                              isError: false,
                              progressError: "",
                            })
                          }
                          type="error"
                          title={bid.errorTitle}
                          desc={bid.errorDescription}
                        />
                      )}
                    </div>
                    <div className={"pop-nft-info"}>
                      <div className={"pop-nft-media"}>
                        {(() => {
                          if (nft?.asset_type?.includes("image")) {
                            return (
                              <Image
                                unoptimized={true}
                                alt="media_logo"
                                width={250}
                                height={250}
                                className="type_image typeimg_audio"
                                src={
                                  nft.asset_url ? nft.asset_url : "/sample.gif"
                                }
                                loading="lazy"
                              />
                            );
                          } else if (nft?.asset_type?.includes("audio")) {
                            return (
                              <>
                                <Image
                                  unoptimized={true}
                                  alt="media_logo"
                                  width={250}
                                  height={250}
                                  className="type_image typeimg_audio"
                                  src={
                                    nft.cover_url
                                      ? nft.cover_url
                                      : "/sample.gif"
                                  }
                                  loading="lazy"
                                />
                              </>
                            );
                          } else if (nft?.asset_type?.includes("video")) {
                            return (
                              <Image
                                unoptimized={true}
                                alt="media_logo"
                                width={250}
                                height={250}
                                className="type_image typeimg_audio"
                                src={
                                  nft.cover_url ? nft.cover_url : "/sample.gif"
                                }
                                loading="lazy"
                              />
                            );
                          } else {
                            return (
                              <Image
                                unoptimized={true}
                                alt="media_logo"
                                width={250}
                                height={250}
                                className="type_image typeimg_audio"
                                src={
                                  nft.asset_url ? nft.asset_url : "/sample.gif"
                                }
                                loading="lazy"
                              />
                            );
                          }
                        })()}
                      </div>

                      <div className={"pop-nft-content"}>
                        <div className={`pop-author-name text-center`}>
                          {nft?.category_name}
                        </div>
                        <div className={`pop-nft-title text-center mb-1`}>
                          {nft?.name}
                        </div>
                        <div className={`erc-type text-center mb-1`}>
                          1 of 1 <span>left</span>
                        </div>
                      </div>
                    </div>
                    {/* error-bid -> less value than min bid,  error-balance -> low value, error-balance-float -> low value in quantity  */}
                    <div className={"sticky-bottom-fix"}>
                      <div className={`input-bid-container mt-5 ${error}`}>
                        <label className={"input-bid-text"}>
                          {`Enter ${
                            price || orderDetails.total_bids > 0
                              ? "bid amount greater than"
                              : "minimum bid amount of "
                          } $${price ? price : orderDetails.minimum_bid}`}
                        </label>

                        <div className={"input-bid-wrap"}>
                          <span className={"bid-currency"}>$</span>
                          <input
                            type="text"
                            className={"input-bid"}
                            value={bidAmount}
                            placeholder="0"
                            disabled={
                              soldOut || transferringNFT || isOrderCancelled
                            }
                            onChange={handleBidInputChange}
                          />
                        </div>

                        <div className={"balance-details"}>
                          {user && `Your wallet balance is $${user?.balance}`}
                        </div>
                      </div>
                      <div className={`input-bid-container mt-5`}>
                        <div className={"fee-flexbox"}>
                          <div className="services-fee-box">
                            <label className={"input-bid-text"}>
                              {`Service Fee ${
                                user?.apply_buy_tds &&
                                !isNaN(parseFloat(nft?.tds_rate))
                                  ? "& TDS"
                                  : ""
                              }`.trim()}{" "}
                              <ToolTip
                                icon={
                                  <BsFillQuestionCircleFill
                                    size={16}
                                    className="ms-2 check-icon"
                                  />
                                }
                                content={`The service fee includes gas fee and the platform fee. ${
                                  user?.apply_buy_tds &&
                                  !isNaN(parseFloat(nft?.tds_rate))
                                    ? "TDS u/s 194S Income Tax Act"
                                    : ""
                                }`.trim()}
                                placement="right"
                              />
                            </label>
                            <h4>
                              {`${parseFloat(nft.service_fee)}% ${
                                user?.apply_buy_tds &&
                                !isNaN(parseFloat(nft?.tds_rate))
                                  ? `+ ${parseFloat(nft?.tds_rate)}%`
                                  : ""
                              }`.trim()}
                            </h4>
                          </div>
                          {/* </div>
                    <div className={`input-bid-container`}> */}
                          <div
                            className={`total-amount-box ${
                              loading ? "loading-blur" : ""
                            }`.trim()}
                          >
                            <label className={"input-bid-text"}>
                              Total Amount
                            </label>
                            <h1>
                              {`$${
                                nftPriceBreakup?.total
                                  ? nftPriceBreakup?.total
                                  : 0
                              }`}
                            </h1>
                          </div>
                        </div>
                        <hr className="custom-divider"></hr>
                      </div>
                    </div>
                  </div>
                  <div className={"bottom-area"}>
                    <div className={`terms text-secondary`}>
                      <>
                        Once a bid is placed, it cannot be withdrawn.{" "}
                        <ToolTip
                          icon={<u role={"button"}>Learn more</u>}
                          content={
                            "The bid, once placed, cannot be cancelled until it is outbid. Your bid amount will be reflected in 'Funds on Hold' section of your wallet."
                          }
                          placement="top"
                        />{" "}
                        about bid.
                      </>
                    </div>
                    {nft.celebrity_id ===
                      parseInt(process.env.NEXT_PUBLIC_LATIMES_ID) && (
                      <div className={"terms"}>
                        <>
                          By proceeding further and clicking the &quot;PLACE
                          BID&quot; button as your electronic signature, you
                          agree to the LA Times{" "}
                          <a
                            href="https://nft.latimes.com/terms-and-conditions/"
                            target={"_blank"}
                            rel="noreferrer"
                          >
                            Terms and Conditions.
                          </a>{" "}
                          The license to display the items associated with the
                          NFTs shall only be used for your personal,
                          non-commercial use.
                        </>
                      </div>
                    )}
                    <div className={"bottom-content-pop"}>
                      <div
                        className={"back-button"}
                        onClick={() => setPlaceBidPop(!placeBidPop)}
                      >
                        Back
                      </div>
                      <div className={"place-bid-button"}>
                        <button
                          disabled={(() => {
                            if (soldOut) {
                              return soldOut;
                            } else if (transferringNFT) {
                              return transferringNFT;
                            } else if (isOrderCancelled) {
                              return isOrderCancelled;
                            } else if (isAuctionEnded) {
                              return isAuctionEnded;
                            } else {
                              return bid.buttonDisable;
                            }
                          })()}
                          className={`btn btn-dark text-center btn-lg w-75 place-bid-btn-pop ${bid.processClass}`} //process -> proccessing
                          onClick={() => {
                            handleBid();
                            invokeTrackEvent(
                              EVENT_NAMES?.BID_CHECKOUT_STARTED,
                              {
                                "Bid Amount by user": bidAmount
                                  ? parseFloat(bidAmount)
                                  : null,
                                Name: nft?.name,
                                Category: nft?.category_name
                                  ? nft?.category_name
                                  : null,
                                Colleaction: null,
                                "service Fee": nft?.service_fee,
                                "Total Amount": parseInt(
                                  nftPriceBreakup?.total
                                ),
                                Balance: user?.balance
                                  ? parseFloat(user?.balance)
                                  : null,
                                "Owned By": ownedBy,
                                "Minimum Bid": orderDetails?.minimum_bid,
                                "Limited Edition": null,
                                "End Of Auction": new Date(auctionEndTime),
                                "Asset Quantiy": nft?.asset_quantity
                                  ? parseInt(nft?.asset_quantity)
                                  : null,
                                "Asset Type": nft?.asset_type,
                                "End Of Auction": null,
                              }
                            );
                          }}
                        >
                          <span>
                            {(() => {
                              if (soldOut) {
                                return "Sold Out";
                              } else if (transferringNFT) {
                                return (
                                  <ToolTip
                                    icon={
                                      <>
                                        Token Transfer Initiated{" "}
                                        <BsFillQuestionCircleFill
                                          size={16}
                                          className="ms-2 check-icon"
                                        />
                                      </>
                                    }
                                    content={
                                      "The NFT's transfer/transaction is in process on the blockchain. Visit again for latest sale-status."
                                    }
                                    placement="top"
                                  />
                                );
                              } else if (isOrderCancelled) {
                                return "Order Cancelled";
                              } else if (bidAmount > 0) {
                                return bid.buttonName;
                              } else {
                                return "Bid amount is required";
                              }
                            })()}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={"sucess-title"}>
                    <FaCheckCircle color={"#95ff8d"} size={60} />
                    <div className={`message mt-3`}>
                      Bid successfully placed. <br /> You are the highest
                      bidder.
                    </div>
                  </div>
                  <div className={"pop-body-content success"}>
                    <div className={`pop-nft-media mt-4 preview`}>
                      {(() => {
                        if (nft?.asset_type?.includes("image")) {
                          return (
                            <Image
                              unoptimized={true}
                              alt="media_logo"
                              width={250}
                              height={250}
                              className="type_image typeimg_audio"
                              src={
                                nft.asset_url ? nft.asset_url : "/sample.gif"
                              }
                            />
                          );
                        } else if (nft?.asset_type?.includes("audio")) {
                          return (
                            <>
                              <Image
                                unoptimized={true}
                                alt="media_logo"
                                width={250}
                                height={250}
                                className="type_image typeimg_audio"
                                src={
                                  nft.cover_url ? nft.cover_url : "/sample.gif"
                                }
                              />
                            </>
                          );
                        } else if (nft?.asset_type?.includes("video")) {
                          return (
                            <Image
                              unoptimized={true}
                              alt="media_logo"
                              width={250}
                              height={250}
                              className="type_image typeimg_audio"
                              src={
                                nft.cover_url ? nft.cover_url : "/sample.gif"
                              }
                            />
                          );
                        } else {
                          return (
                            <Image
                              unoptimized={true}
                              alt="media_logo"
                              width={250}
                              height={250}
                              className="type_image typeimg_audio"
                              src={
                                nft.asset_url ? nft.asset_url : "/sample.gif"
                              }
                            />
                          );
                        }
                      })()}
                    </div>
                    <div
                      className={`pop-author-name confirm-pop-name text-center`}
                    >
                      {nft?.category_name}
                    </div>
                    <div className={`pop-nft-title text-center mb-1`}>
                      {nft?.name}
                    </div>

                    <div className={`success-summary-container mt-3`}>
                      <div className={"success-summary"}>
                        <div>Bid price</div>
                        <div className={"bold"}>{`$${successData.amount}`}</div>
                      </div>

                      <div className={"success-summary"}>
                        <div>Bid placed on</div>
                        <div className={"bold"}>
                          {dayjs(successData.created_at).format(
                            "MMM D, YYYY hh:mm A"
                          )}
                        </div>
                      </div>

                      <div className={"success-summary"}>
                        <div>Bid placed for</div>
                        <div className="bold">1 Limited Edition</div>
                      </div>

                      <div className={"success-summary"}>
                        <div>Transaction ID</div>
                        <div className={"bold"}>
                          {successData.transaction_id}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"bottom-area"}>
                    <div className={"bottom-content-pop"}>
                      <div className={"place-bid-button"}>
                        <button
                          className={`btn btn-dark text-center btn-lg w-75 rounded-pill place-bid-btn-pop`}
                          onClick={handleSuccess}
                        >
                          <span>Okay</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className={"pop-nft-details"}>
              <div className={"pop-head-content"}>
                <div className={"pop-bid-title"}></div>
                <div
                  className={"close-button-pop"}
                  onClick={() => setPlaceBidPop(!placeBidPop)}
                >
                  <Image
                    unoptimized={true}
                    alt="bid logo"
                    width={20}
                    height={20}
                    src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e"
                  />
                </div>
              </div>
              <div className={"pop-signin"}>
                <div className={`pop-signin-title text-center mb-1`}>
                  {erc721 ? "Sign in to place bid" : "Sign in to buy"}
                </div>
                <div className={"pop-nft-media"}>
                  <button
                    className={`btn btn-dark text-center btn-lg mt-2 place-bid-btn`}
                    onClick={() =>
                      window.open(
                        `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/signin?redirect=${window.location.href}`,
                        "_self"
                      )
                    }
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default NFTPlaceBid;
