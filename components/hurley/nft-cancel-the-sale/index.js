import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Offcanvas } from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa";

import ToolTip from "../../tooltip";
import images from "../../../utils/images.json";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { bidBuyError, validateQuantity } from "../../../utils/common";
import { buySaleCancelApi, saleCancelApi } from "../../../utils/methods";

const NFTCancelTheSale = ({
  cancelTheSalePop = false,
  setCancelTheSalePop,
  nft,
  isOwner,
  orderDetails,
  availableQty,
  isOrderOnSale,
  isOrderCancelled,
  totalQty,
  soldOut,
  transferringNFT,
  isAuctionEnded,
  latestBid,
  orderSlug,
}) => {
  const { user } = useSelector((state) => state.user.data);
  const [success, setSuccess] = useState(false);
  //  const [bidCancel, setBidCancel] = useState(false);
  //  const [buyCancel, setBuyCancel] = useState(false);
  const [cancelQuantity, setCancelQuantity] = useState("");
  const erc721 = nft.nft_type === "erc721";

  useEffect(() => {
    if (soldOut) {
      setCancelTheSalePop(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soldOut]);

  // const [error, setError] = useState({
  //   isError: false,
  //   progressError: "",
  //   errorTitle: "",
  //   errorDescription: "",
  // });

  const handleSaleCancel = async () => {
    try {
      const result = await saleCancelApi({
        order_slug: isOwner && nft.owner_details.orders[0].slug,
      });
      if (result.data.success) {
        setSuccess(true);
      }
    } catch (error) {
      if (error.response.data.status === 422) {
        const err = bidBuyError(error.response.data.fail_status);
        console.log(err);
        // setError({
        //   ...error,
        //   isError: true,
        //   progressError: "error-progress",
        //   errorTitle: err.title,
        //   errorDescription: err.description,
        // });
      }
    }
  };

  const handleBuyCancel = async () => {
    try {
      const result = await buySaleCancelApi({
        order_slug: orderDetails.slug,
        order: { quantity: erc721 ? 1 : parseInt(cancelQuantity) },
      });
      if (result.data.success) {
        setSuccess(true);
      }
    } catch (error) {
      if (error.response.data.status === 422) {
        const err = bidBuyError(error.response.data.fail_status);
        console.log(err);
        // setError({
        //   ...error,
        //   isError: true,
        //   progressError: "error-progress",
        //   errorTitle: err.title,
        //   errorDescription: err.description,
        // });
      }
    }
  };

  const handleQuantityInputChange = (e) => {
    if (e.target.value) {
      if (
        validateQuantity(e.target.value) &&
        e.target.value <= orderDetails.available_quantity &&
        e.target.value !== 0
      ) {
        setCancelQuantity(e.target.value);
      }
    } else {
      setCancelQuantity(e.target.value);
    }
  };

  const handleSuccess = () => {
    if (isOrderCancelled) {
      // setCancelTheSalePop(!cancelTheSalePop);
      // setSuccess(false);
      //router.push(`/nft-marketplace/details/${nft?.slug}`);
      window.location.href = `/nft-marketplace/details/${nft?.slug}`;
    } else {
      setCancelTheSalePop(!cancelTheSalePop);
      setSuccess(false);
      setCancelQuantity("");

      // setError({
      //   isError: false,
      //   progressError: "",
      //   errorTitle: "",
      //   errorDescription: "",
      // });
    }
  };

  return (
    <Offcanvas
      show={cancelTheSalePop}
      onHide={() => setCancelTheSalePop(!cancelTheSalePop)}
      placement="end"
      className="w-100 w-md-50 w-lg-42"
    >
      <Offcanvas.Body className={`p-0 pop-cancel-body-container`}>
        {user ? (
          <>
            <div className={"pop-cancel-nft-details"}>
              {!success ? (
                !erc721 ? (
                  <>
                    <div className={"pop-cancel-head-content"}>
                      <div className={"pop-cancel-title"}>Cancel the sale</div>
                      <div
                        className={"close-button-pop"}
                        onClick={() => setCancelTheSalePop(!cancelTheSalePop)}
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
                    <div className={"pop-cancel-progress"}>
                      <div className={"progress-complete"}></div>
                    </div>
                    <div className={`pop-cancel-bodyContent px-4`}>
                      <div className={"pop-nft-info"}>
                        <div className={"pop-nft-media"}>
                          {(() => {
                            if (nft?.asset_type?.includes("image")) {
                              return (
                                <Image
                                  unoptimized={true}
                                  alt="media_logo"
                                  className="type_image typeimg_audio"
                                  width={250}
                                  height={250}
                                  src={
                                    nft.asset_url
                                      ? nft.asset_url
                                      : "/sample.gif"
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
                                    className="type_image typeimg_audio"
                                    width={250}
                                    height={250}
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
                                  className="type_image typeimg_audio"
                                  width={250}
                                  height={250}
                                  src={
                                    nft.cover_url
                                      ? nft.cover_url
                                      : "/sample.gif"
                                  }
                                  loading="lazy"
                                />
                              );
                            } else {
                              return (
                                <Image
                                  unoptimized={true}
                                  alt="media_logo"
                                  className="type_image typeimg_audio"
                                  width={250}
                                  height={250}
                                  src={
                                    nft.asset_url
                                      ? nft.asset_url
                                      : "/sample.gif"
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
                          {erc721 && (
                            <div className={`erc-type text-center mb-1`}>
                              1 of 1 <span>left</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className={`input-cancel-container mt-5 mb-5`}>
                        <div className="input-field-cancel px-0">
                          <label className={"input-cancel-text"}>
                            No of units to cancel sale?
                          </label>
                          <div
                            className={`input-cancel-quantity-container bid-input`}
                          >
                            <input
                              type="text"
                              className={"input-cancel-quantity"}
                              value={cancelQuantity}
                              placeholder="0 NFT"
                              disabled={(() => {
                                if (soldOut) {
                                  return true;
                                } else if (transferringNFT) {
                                  return true;
                                } else {
                                  return false;
                                }
                              })()}
                              onChange={handleQuantityInputChange}
                            />
                            <span className={"cancel-currency"}>
                              /
                              {availableQty != null
                                ? availableQty
                                : orderDetails.available_quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={"bottom-area"}>
                      <h5 className="text-center">
                        Are you sure want to cancel the sale?
                      </h5>

                      <div className={"bottom-content-pop"}>
                        <div
                          className={"back-button"}
                          onClick={() => setCancelTheSalePop(!cancelTheSalePop)}
                        >
                          Cancel
                        </div>
                        <div className={"place-cancel-button"}>
                          <button
                            className={`btn btn-dark text-center btn-lg w-75 rounded-pill place-cancel-btn-pop`} //process -> proccessing
                            disabled={(() => {
                              if (soldOut) {
                                return true;
                              } else if (transferringNFT) {
                                return true;
                              } else if (!erc721 && !cancelQuantity > 0) {
                                return true;
                              } else {
                                return false;
                              }
                            })()}
                            onClick={handleBuyCancel}
                          >
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
                              } else if (!erc721 && !cancelQuantity > 0) {
                                return "No of unit is required";
                              } else {
                                return "Confirm";
                              }
                            })()}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={"pop-cancel-head-content"}>
                      <div className="pop-cancel-title">Cancel the sale</div>
                      <div
                        className={"close-button-pop"}
                        onClick={() => setCancelTheSalePop(!cancelTheSalePop)}
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
                    <div
                      className={`pop-cancel-progress ${
                        success ? "error" : ""
                      }`}
                    >
                      <div className={"progress-complete"}></div>
                    </div>

                    <div className={`sucess-title cancel-confirm`}>
                      <div className={"pop-nft-info"}>
                        <div className={"pop-nft-media"}>
                          {(() => {
                            if (nft?.asset_type?.includes("image")) {
                              return (
                                <Image
                                  unoptimized={true}
                                  alt="media_logo"
                                  className="type_image typeimg_audio"
                                  width={250}
                                  height={250}
                                  src={
                                    nft.asset_url
                                      ? nft.asset_url
                                      : "/sample.gif"
                                  }
                                  loading="lazy"
                                />
                              );
                            } else if (nft?.asset_type?.includes("audio")) {
                              return (
                                <>
                                  <Image
                                    unoptimized={true}
                                    width={250}
                                    height={250}
                                    alt="media_logo"
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
                                  className="type_image typeimg_audio"
                                  width={250}
                                  height={250}
                                  src={
                                    nft.cover_url
                                      ? nft.cover_url
                                      : "/sample.gif"
                                  }
                                  loading="lazy"
                                />
                              );
                            } else {
                              return (
                                <Image
                                  unoptimized={true}
                                  alt="media_logo"
                                  className="type_image typeimg_audio"
                                  width={250}
                                  height={250}
                                  src={
                                    nft.asset_url
                                      ? nft.asset_url
                                      : "/sample.gif"
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

                      {/* <div>
                        <FaTimesCircle color={"#f21e00"} size={60} />
                        <div className="message mt-3">
                          Are you sure want to cancel the {buyCancel && "Buy "}
                          {bidCancel && "Bid "}
                          sale?
                        </div>
                      </div> */}
                    </div>

                    {/* <div className="pop-cancel-bodyContent">
                    <div className="error-float-container">
                      {error && (
                        <ErrorText
                          handleClick={() =>
                            setError({
                              ...error,
                              isError: false,
                              progressError: "",
                            })
                          }
                          type="error"
                          title={error.errorTitle}
                          desc={error.errorDescription}
                        />
                      )}
                    </div>
                  </div> */}

                    <div className={"bottom-area"}>
                      {orderDetails?.is_bid && orderDetails?.is_buy ? (
                        <h5 className="text-center mb-3">
                          Are you sure you want to proceed with the cancelation?{" "}
                          <br /> This action will cancel both your bid-listing
                          and sale-listing
                        </h5>
                      ) : (
                        <h5 className="text-center">
                          Are you sure want to cancel the sale?
                        </h5>
                      )}

                      <div className={"bottom-content-pop"}>
                        <div
                          className={`back-button`} //process -> proccessing
                          onClick={() => setCancelTheSalePop(!cancelTheSalePop)}
                        >
                          No
                        </div>
                        <div className={"place-cancel-button"}>
                          <button
                            disabled={
                              latestBid?.slug && orderDetails?.timed_auction
                            }
                            className={`btn btn-dark text-center btn-lg w-75 rounded-pill place-cancel-btn-pop`} //process -> proccessing
                            onClick={handleSaleCancel}
                          >
                            <span>Yes</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )
              ) : (
                <>
                  <div className={"sucess-title"}>
                    <FaTimesCircle color={"#7e0000"} size={60} />
                    <div className={`message mt-3`}>
                      Listing cancelled successfully. Your NFT is no longer
                      listed for selling.
                    </div>
                  </div>

                  <div className={"bottom-area"}>
                    <div className={"bottom-content-pop"}>
                      <div className={"place-cancel-button"}>
                        <button
                          className={`btn btn-dark text-center btn-lg w-75 rounded-pill place-cancel-btn-pop`}
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
            <div className={"pop-cancel-nft-details"}>
              <div className={"pop-cancel-head-content"}>
                <div className={"pop-cancel-title"}></div>
                <div
                  className={"close-button-pop"}
                  onClick={() => setCancelTheSalePop(!cancelTheSalePop)}
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
                <div className={"pop-cancel-nft-media"}>
                  <button
                    className={`btn btn-dark text-center btn-lg mt-2 rounded-pill place-cancel-btn`}
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

export default NFTCancelTheSale;
