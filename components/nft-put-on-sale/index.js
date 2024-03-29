import dayjs from "dayjs";
import _ from "lodash";
import Select from "react-select";
import Image from "next/image";
import ToggleButton from "react-toggle-button";
import { useState, forwardRef } from "react";
import { useSelector } from "react-redux";
import { Offcanvas } from "react-bootstrap";
import { BiCheck, BiX } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { setMinutes, setHours, addHours, addDays } from "date-fns";
import { toast } from "react-toastify";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiOutlineLink,
} from "react-icons/ai";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

import ErrorText from "./error-text";
import images from "../../utils/images.json";
import ToolTip from "../tooltip/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  currencyFormat,
  dot,
  getDecimalInfo,
  roundDown,
  validateCurrency,
  validateCurrencyShot,
  validateQuantity,
} from "../../utils/common";
import { putOnSaleApi } from "../../utils/methods";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { CopyToClipboard } from "react-copy-to-clipboard";

const NFTPutOnSale = ({
  putOnSalePop = false,
  setPutOnSalePop,
  nft,
  isQuantityAvailable,
}) => {
  //const url = window.location.href;
  //const hashtags = "NFT,NFTCollector,NFTCollection,GuardianLink";
  // const via = "jump.trade";

  const nftType = nft?.core_statistics?.role?.value;

  const { user } = useSelector((state) => state.user.data);
  // const { params } = useRouteMatch();
  // const startDateRef = useRef();

  const [success, setSuccess] = useState(false);
  const [startChosen, setStartChosen] = useState(false);
  const [endChosen, setEndChosen] = useState(false);
  const [orderId, setOrderId] = useState("");

  const erc721 = nft?.nft_type === "erc721";
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [erc721Sale, setErc721Sale] = useState({
    isBid: false,
    isBuy: true,
    bidAmount: "",
    buyAmount: "",
    buyQuantity: 1,
    totalAmount: 0,
    warning: false,
  });

  const [erc1155Sale, setErc1155Sale] = useState({
    isBuy: true,
    buyAmount: "",
    buyQuantity: "",
    totalAmount: 0,
  });

  const [confirmState, setConfirmState] = useState({
    progressError: "",
    buttonDisable: false,
    processClass: "",
    buttonName: "Confirm",
  });
  const handleErc721BidAmountChange = (e) => {
    if (
      e.target.value &&
      e.target.value.length <= process.env.NEXT_PUBLIC_AMOUNT_MAX_LENGTH
    ) {
      if (nftType === "Shot") {
        if (validateCurrencyShot(e.target.value)) {
          setErc721Sale({ ...erc721Sale, bidAmount: e.target.value });
        }
      } else {
        if (validateCurrency(e.target.value)) {
          setErc721Sale({ ...erc721Sale, bidAmount: e.target.value });
        }
      }
    } else {
      setErc721Sale({ ...erc721Sale, bidAmount: "" });
    }
  };

  const handleErc721BuyAmountChange = (e) => {
    if (
      e.target.value &&
      e.target.value.length <= process.env.NEXT_PUBLIC_AMOUNT_MAX_LENGTH
    ) {
      if (nftType === "Shot") {
        if (validateCurrencyShot(e.target.value)) {
          setErc721Sale({ ...erc721Sale, buyAmount: e.target.value });
        }
      } else {
        if (validateCurrency(e.target.value)) {
          setErc721Sale({ ...erc721Sale, buyAmount: e.target.value });
        }
      }
    } else {
      setErc721Sale({ ...erc721Sale, buyAmount: "" });
    }
  };

  const handleErc1155BuyAmountChange = (e) => {
    if (
      e.target.value &&
      e.target.value.length <= process.env.NEXT_PUBLIC_AMOUNT_MAX_LENGTH
    ) {
      if (nftType === "Shot") {
        if (validateCurrencyShot(e.target.value)) {
          setErc1155Sale({
            ...erc1155Sale,
            buyAmount: e.target.value,
            totalAmount: e.target.value * erc1155Sale.buyQuantity,
          });
        }
      } else {
        if (validateCurrency(e.target.value)) {
          setErc1155Sale({
            ...erc1155Sale,
            buyAmount: e.target.value,
            totalAmount: e.target.value * erc1155Sale.buyQuantity,
          });
        }
      }
    } else {
      setErc1155Sale({
        ...erc1155Sale,
        buyAmount: "",
        totalAmount: 0,
      });
    }
  };

  const handleErc1155QuantityInputChange = (e) => {
    let availableQty =
      isQuantityAvailable != null
        ? isQuantityAvailable
        : nft?.owner_details.available_quantity;
    if (e.target.value) {
      if (
        validateQuantity(e.target.value) &&
        e.target.value <= availableQty &&
        e.target.value !== 0
      ) {
        setErc1155Sale({
          ...erc1155Sale,
          buyQuantity: e.target.value,
          totalAmount: erc1155Sale.buyAmount * e.target.value,
        });
      }
    } else {
      setErc1155Sale({
        ...erc1155Sale,
        buyQuantity: e.target.value,
        totalAmount: 0,
      });
    }
  };

  const handlePutOnSale = async () => {
    try {
      let order = {};
      setConfirmState({
        ...confirmState,
        progressError: "loading",
        processClass: "process",
        buttonName: "Processing...",
        buttonDisable: true,
      });
      if (erc721) {
        if (erc721Sale.isBid) {
          order = {
            is_buy: erc721Sale.isBuy,
            is_bid: erc721Sale.isBid,
            minimum_bid: erc721Sale.bidAmount,
            buy_amount: erc721Sale.buyAmount,
            total_quantity: erc721Sale.buyQuantity,
            timed_auction: erc721Sale.isBid,
            auction_start_time: startChosen
              ? startDate.toISOString()
              : new Date().toISOString(),
            auction_end_time: endChosen
              ? endDate.toISOString()
              : startChosen
              ? addDays(startDate, 1).toISOString()
              : addDays(new Date(), 1).toISOString(),
          };
        } else {
          order = {
            is_buy: erc721Sale.isBuy,
            is_bid: erc721Sale.isBid,
            minimum_bid: erc721Sale.bidAmount,
            buy_amount: erc721Sale.buyAmount,
            total_quantity: erc721Sale.buyQuantity,
            timed_auction: erc721Sale.isBid,
          };
        }
      } else {
        order = {
          is_buy: true,
          buy_amount: erc1155Sale.buyAmount,
          total_quantity: erc1155Sale.buyQuantity,
          is_bid: false,
          minimum_bid: null,
        };
      }
      const result = await putOnSaleApi({
        slug: nft?.slug,
        order: order,
      });
      if (result.data.success) {
        setConfirm(false);
        setSuccess(true);
        setConfirmState({
          ...confirmState,
          progressError: "",
          processClass: "",
          buttonName: "Confirm",
          buttonDisable: false,
        });
        setOrderId(result.data?.data?.order_slug);
        // setSuccessData(result.data.data.buy);
      }
    } catch (error) {
      if (error.response.data.status === 422) {
        // const err = bidBuyError(error.response.data.fail_status);
        // toaster(error.response.data.status, err.description);
        toast.error(error.response.data.message);
      }
      setConfirmState({
        ...confirmState,
        progressError: "",
        processClass: "",
        buttonName: "Confirm",
        buttonDisable: false,
      });
      // console.log(error.response);
    }
  };

  const handleSuccess = () => {
    setPutOnSalePop(!putOnSalePop);
    setSuccess(false);
    setError("");
    setErc721Sale({
      ...erc721Sale,
      isBid: false,
      isBuy: true,
      bidAmount: "",
      buyAmount: "",
      buyQuantity: 1,
      totalAmount: 0,
    });
    setErc1155Sale({
      ...erc1155Sale,
      buyAmount: "",
      buyQuantity: "",
      totalAmount: 0,
    });
    setConfirmState({
      ...confirmState,
      progressError: "",
      buttonDisable: false,
      processClass: "",
      buttonName: "Confirm",
    });
  };

  const startOption = [
    {
      label: "Right after listing",
      value: "now",
    },
    {
      label: "Pick specific date",
      value: "pick",
    },
  ];

  const endOption = [
    {
      label: "1 Day",
      value: "one",
    },
    {
      label: "Pick specific date",
      value: "pick",
    },
  ];

  const crispStyle = {
    control: (prop) => ({
      ...prop,
      padding: ".8rem 0.8rem",
      borderRadius: "0.7rem",
      minHeight: "33px",
      fontSize: "1rem",
      fontWeight: "400",
      borderColor: "#3d3d49",
      borderWidth: "2px",
      backgroundColor: "#0e0e1c",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#3d3d49",
      },
      "&:focus": {
        boxShadow: "none",
        borderColor: "#3d3d49",
      },
      "&:active": {
        boxShadow: "none",
        borderColor: "#3d3d49",
      },
    }),
    input: (prop) => ({
      ...prop,
      margin: 0,
      color: "#fff",
      padding: 0,
    }),
    valueContainer: (prop) => ({
      ...prop,
      margin: 0,
      color: "#fff",
      padding: 0,
    }),
    singleValue: (styles, { data }) => ({
      ...styles,
      margin: 0,
      color: "#fff",
      padding: 0,
      ...(data.color ? dot(data.color) : {}),
    }),

    dropdownIndicator: (prop) => ({
      ...prop,
      margin: 0,
      padding: "0 3px 0 0",
      color: "#fff",
    }),
    indicatorsContainer: (prop) => ({
      ...prop,
      margin: 0,
      padding: 0,
    }),
    clearIndicator: (prop) => ({
      ...prop,
      margin: 0,
      padding: 0,
    }),
    indicatorSeparator: (prop) => ({
      ...prop,
      margin: "3px",
      padding: 0,
    }),
    noOptionsMessage: (prop) => ({
      ...prop,
      padding: 0,
      fontSize: "12px",
    }),
    option: (prop, { isSelected }) => ({
      ...prop,
      padding: "8px",
      fontSize: "1rem",
      color: isSelected ? "#0e0e1c" : "#fff",
      backgroundColor: isSelected && "#ef9d5d",
      fontFamily: "neue_helvetica_medium",
      "&:hover": {
        backgroundColor: !isSelected && "#4a4a54",
        color: !isSelected && "#ffffff",
      },
      "&:active": {
        backgroundColor: "#4a4a54",
      },
    }),
    menu: (prop) => ({
      ...prop,
      borderRadius: "3px",
      backgroundColor: "#1d1c2c",
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999, top: base.top - 5 }),
  };

  // const handleStartDate = (date) => {
  //   setErc721Sale({
  //     ...erc721Sale,
  //     startDate: date,
  //     endDate: null,
  //   });
  // };

  // const handleEndDate = (date) => {
  //   setErc721Sale({
  //     ...erc721Sale,
  //     endDate: date,
  //   });
  // };

  const detectWhatsapp = (uri) => {
    const onIE = () => {
      return new Promise((resolve) => {
        window.navigator.msLaunchUri(
          uri,
          () => resolve(true),
          () => resolve(false)
        );
      });
    };

    const notOnIE = () => {
      return new Promise((resolve) => {
        const a =
          document.getElementById("wapp-launcher") ||
          document.createElement("a");
        a.id = "wapp-launcher";
        a.href = uri;
        a.style.display = "none";
        document.body.appendChild(a);

        const start = Date.now();
        const timeoutToken = setTimeout(() => {
          if (Date.now() - start > 1250) {
            resolve(true);
          } else {
            resolve(false);
          }
        }, 1000);

        const handleBlur = () => {
          clearTimeout(timeoutToken);
          resolve(true);
        };
        window.addEventListener("blur", handleBlur);

        a.click();
      });
    };

    return window.navigator.msLaunchUri ? onIE() : notOnIE();
  };

  // const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  //   <div
  //     className="input-sale-wrap"
  //     ref={ref}
  //     onClick={(e) => {
  //       e.preventDefault();
  //       onClick(e);
  //     }}
  //     role={"button"}
  //   >
  //     <span className="p-3 w-100">
  //       <div className="d-flex justify-content-between">
  //         <div>{children}</div>
  //         <div>&#x25bc;</div>
  //       </div>
  //     </span>
  //   </div>
  // ));

  const [startDate, setStartDate] = useState(
    (() => {
      const d = new Date();
      let minutes = d.getMinutes();

      let hours = d.getHours();

      if (minutes >= 45) {
        return setHours(setMinutes(new Date(), 0), hours + 1);
      } else if (minutes >= 30) {
        return setHours(setMinutes(new Date(), 45), hours);
      } else if (minutes >= 15) {
        return setHours(setMinutes(new Date(), 30), hours);
      } else if (minutes >= 0) {
        return setHours(setMinutes(new Date(), 15), hours);
      } else {
        return setHours(setMinutes(new Date(), 0), hours);
      }
    })()
  );

  const [endDate, setEndDate] = useState(
    (() => {
      const d = new Date();
      let minutes = d.getMinutes();

      let hours = d.getHours();

      if (minutes >= 45) {
        return setHours(setMinutes(new Date(), 30), hours + 1);
      } else if (minutes >= 30) {
        return setHours(setMinutes(new Date(), 15), hours + 1);
      } else if (minutes >= 15) {
        return setHours(setMinutes(new Date(), 0), hours + 1);
      } else if (minutes >= 0) {
        return setHours(setMinutes(new Date(), 45), hours);
      } else {
        return setHours(setMinutes(new Date(), 30), hours);
      }
    })()
  );

  const ExampleCustomStartInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="example-custom-input"
      onClick={onClick}
      ref={ref}
      id="start_date"
    >
      {value}
    </button>
  ));
  ExampleCustomStartInput.displayName = "ExampleCustomStartInput";

  const ExampleCustomEndInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="example-custom-input"
      onClick={onClick}
      ref={ref}
      id="end_date"
    >
      {value}
    </button>
  ));
  ExampleCustomEndInput.displayName = "ExampleCustomEndInput";

  const handleConfirm = () => {
    if (
      startChosen &&
      endChosen &&
      new Date(startDate).getTime() > new Date(endDate).getTime()
    ) {
      toast.error("End date should be grater than Start date");
      setConfirm(false);
    } else if (
      startChosen &&
      endChosen &&
      new Date(endDate).getTime() > new Date(addDays(startDate, 3)).getTime()
    ) {
      toast.error(
        "End date should be less than or equal to 3 days from start date"
      );
      setConfirm(false);
    } else if (
      !startChosen &&
      endChosen &&
      new Date().getTime() > new Date(endDate).getTime()
    ) {
      toast.error("Please select future date");
      setEndDate(new Date());
      setConfirm(false);
    } else {
      setConfirm(true);
    }
  };

  const calculateTotalAmount = (buyAmount, taxAmount, tdsAmount) => {
    const ba = roundDown(parseFloat(buyAmount), 2);
    const tx = parseFloat((ba * taxAmount) / 100);
    let total = ba - tx;
    const tds = parseFloat((total * tdsAmount) / 100);
    if (user?.apply_sale_tds && !isNaN(tds)) total -= tds;
    let fixedDecimalLength = getDecimalInfo(total);
    return currencyFormat(total, "USD", fixedDecimalLength);
  };

  return (
    <>
      <Offcanvas
        show={putOnSalePop}
        onHide={() => setPutOnSalePop(!putOnSalePop)}
        placement="end"
        className="w-100 w-md-50 w-lg-42"
      >
        <Offcanvas.Body className={`p-0 pop-sale-body-container`}>
          {user ? (
            <>
              <div className={"pop-sale-nft-details"}>
                {(() => {
                  if (!success && !confirm) {
                    return (
                      <>
                        <div className={"pop-sale-head-content"}>
                          <div className={"pop-sale-title"}>List for sale</div>
                          <div
                            className={"close-button-pop"}
                            onClick={() => setPutOnSalePop(!putOnSalePop)}
                          >
                            {/* <BiX
                        role="button"
                        size={45}
                        onClick={() => setPutOnSalePop(!putOnSalePop)}
                      /> */}
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
                          className={`pop-sale-progress ${confirmState.progressError} ${confirmState.progressError}`}
                        >
                          <div className={"progress-complete"}></div>
                        </div>
                        <div className={"pop-sale-bodyContent"}>
                          {erc721Sale.warning && (
                            <div className={"error-float-container"}>
                              <ErrorText
                                type="bid-buy-amount"
                                handleClick={() =>
                                  setErc721Sale({
                                    ...erc721Sale,
                                    warning: false,
                                  })
                                }
                              />
                            </div>
                          )}
                          <div className={"pop-sale-nft-info"}>
                            <div className={"pop-sale-nft-media"}>
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
                                        nft?.asset_url
                                          ? nft?.asset_url
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
                                          nft?.cover_url
                                            ? nft?.cover_url
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
                                        nft?.cover_url
                                          ? nft?.cover_url
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
                                      width={250}
                                      height={250}
                                      className="type_image typeimg_audio"
                                      src={
                                        nft?.asset_url
                                          ? nft?.asset_url
                                          : "/sample.gif"
                                      }
                                      loading="lazy"
                                    />
                                  );
                                }
                              })()}
                            </div>
                            <div className={"pop-sale-nft-content"}>
                              <div className={`pop-author-name text-center`}>
                                {nft?.category_name}
                              </div>
                              <div
                                className={`pop-sale-nft-title text-center mb-1`}
                              >
                                {nft?.name}
                              </div>
                              {erc721 && (
                                <div className={`erc-type text-center mb-1`}>
                                  1 of 1 <span>left</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className={"sticky-bottom-fix"}>
                            {erc721 && (
                              <div className={`input-sale-container mt-3`}>
                                <div className={"toggle-btn-buybid"}>
                                  <div className={"btn-buy"}>
                                    <label
                                      className={`toggle-private-title w-100`}
                                    >
                                      Buy
                                    </label>
                                    <div>
                                      <ToggleButton
                                        inactiveLabel={<BiX size={20} />}
                                        activeLabel={<BiCheck size={20} />}
                                        colors={{
                                          activeThumb: {
                                            base: "rgb(0,0,0)",
                                          },
                                          inactiveThumb: {
                                            base: "rgb(0,0,0)",
                                          },
                                          active: {
                                            base: "rgb(76, 175, 80)",
                                            hover: "rgb(76, 175, 80)",
                                          },
                                          inactive: {
                                            base: "rgb(158, 158, 158)",
                                            hover: "rgb(158, 158, 158)",
                                          },
                                        }}
                                        value={erc721Sale.isBuy}
                                        onToggle={(value) => {
                                          setErc721Sale({
                                            ...erc721Sale,
                                            isBuy: !value,
                                            buyAmount: "",
                                          });
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className={"btn-bid"}>
                                    <label
                                      className={`toggle-private-title w-100`}
                                    >
                                      Bid
                                    </label>
                                    <div>
                                      <ToggleButton
                                        inactiveLabel={<BiX size={20} />}
                                        activeLabel={<BiCheck size={20} />}
                                        colors={{
                                          activeThumb: {
                                            base: "rgb(0,0,0)",
                                          },
                                          inactiveThumb: {
                                            base: "rgb(0,0,0)",
                                          },
                                          active: {
                                            base: "rgb(76, 175, 80)",
                                            hover: "rgb(76, 175, 80)",
                                          },
                                          inactive: {
                                            base: "rgb(158, 158, 158)",
                                            hover: "rgb(158, 158, 158)",
                                          },
                                        }}
                                        value={erc721Sale.isBid}
                                        onToggle={(value) => {
                                          setErc721Sale({
                                            ...erc721Sale,
                                            isBid: !value,
                                            bidAmount: "",
                                          });
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* error-bid -> less value than min bid,  error-balance -> low value, error-balance-float -> low value in quantity  */}
                            <div
                              className={`input-sale-container mt-3 flex-input ${error}`}
                            >
                              {!erc721 ? (
                                <>
                                  <div className={`input-field-sale`}>
                                    <label className={"input-sale-text"}>
                                      Set Sale Cost (Per edition)
                                    </label>
                                    <div className={"input-sale-wrap"}>
                                      <span className={"sale-currency"}>$</span>
                                      <input
                                        type="text"
                                        className={"input-sale"}
                                        value={erc1155Sale.buyAmount}
                                        placeholder="0"
                                        onChange={handleErc1155BuyAmountChange}
                                      />
                                    </div>
                                  </div>
                                  <div className={"input-field-sale"}>
                                    <label className={"input-sale-text"}>
                                      Set NFT Count for Sale
                                    </label>
                                    <div
                                      className={`input-sale-quantity-container bid-input`}
                                    >
                                      <input
                                        type="text"
                                        className={"input-sale-quantity"}
                                        value={erc1155Sale.buyQuantity}
                                        placeholder="0 NFT"
                                        onChange={
                                          handleErc1155QuantityInputChange
                                        }
                                      />
                                      <span className={"sale-currency"}>
                                        /
                                        {isQuantityAvailable != null
                                          ? isQuantityAvailable
                                          : _.get(
                                              nft,
                                              "owner_details.available_quantity"
                                            )}
                                      </span>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div
                                    className={`input-field-sale ${
                                      !erc721Sale.isBuy ? "disabled" : ""
                                    }`}
                                  >
                                    <label className={"input-sale-text"}>
                                      Set Price{" "}
                                      <span
                                        className={`quantity-to-value text-red`}
                                      >
                                        Min.{" "}
                                        {currencyFormat(
                                          nft?.floor_price,
                                          "USD"
                                        )}
                                      </span>
                                    </label>
                                    <div className={"input-sale-wrap"}>
                                      <span className={"sale-currency"}>$</span>
                                      <input
                                        type="text"
                                        className={"input-sale"}
                                        value={erc721Sale.buyAmount}
                                        placeholder="0"
                                        disabled={!erc721Sale.isBuy}
                                        onChange={handleErc721BuyAmountChange}
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className={`input-field-sale ${
                                      !erc721Sale.isBid ? "disabled" : ""
                                    }`}
                                  >
                                    <label className={"input-sale-text"}>
                                      Bid Amount{" "}
                                      <span
                                        className={`quantity-to-value text-red`}
                                      >
                                        Min{" "}
                                        {currencyFormat(
                                          nft?.floor_price,
                                          "USD"
                                        )}
                                      </span>
                                    </label>
                                    <div className={"input-sale-wrap"}>
                                      <span className={"sale-currency"}>$</span>
                                      <input
                                        type="text"
                                        className={"input-sale"}
                                        value={erc721Sale.bidAmount}
                                        placeholder="0"
                                        disabled={!erc721Sale.isBid}
                                        onChange={handleErc721BidAmountChange}
                                      />
                                    </div>
                                    {/* <span
                                    className={`quantity-to-value error-msg`}
                                  >
                                    Bids will expire in 7 days if you do not
                                    acknowledge/accept it.
                                  </span> */}
                                  </div>
                                </>
                              )}
                            </div>
                            {erc721 && erc721Sale.isBid && (
                              <>
                                {/* <div className="input-sale-container checkbox-container mt-3">
                                <input
                                  type="checkbox"
                                  id="checkScheduled"
                                  checked={erc721Sale.scheduleAuction}
                                  onClick={(e) => {
                                    setErc721Sale({
                                      ...erc721Sale,
                                      scheduleAuction: e.target.checked,
                                    });
                                  }}
                                />{" "}
                                &nbsp;
                                <label for="checkScheduled">
                                  Schedule my auction
                                </label>
                              </div> */}

                                <div
                                  className={`input-sale-container mt-3 flex-input`}
                                >
                                  <div className={"input-field-sale"}>
                                    <label className={"input-sale-text"}>
                                      Auction Starting Date
                                    </label>

                                    <Select
                                      styles={crispStyle}
                                      options={startOption}
                                      value={(() => {
                                        if (startChosen)
                                          return {
                                            label: dayjs(startDate).format(
                                              "DD MMM YYYY hh:mm a"
                                            ),
                                            value: "xx",
                                          };
                                        else
                                          return {
                                            label: "Right after listing",
                                            value: "now",
                                          };
                                      })()}
                                      onChange={(data) => {
                                        if (data.value === "now") {
                                          setStartChosen(false);
                                          setStartDate(new Date());
                                        } else {
                                          document
                                            .getElementById("start_date")
                                            .click();
                                          setStartChosen(false);
                                        }
                                      }}
                                    />
                                    {/* <Dropdown>
                                      <Dropdown.Toggle as={CustomToggle}>
                                        {startChosen
                                          ? dayjs(startDate).format(
                                              "DD MMM YYYY hh:mm a"
                                            )
                                          : `Right after listing`}
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item
                                          as="button"
                                          onClick={() => {
                                            setStartChosen(false);
                                            setStartDate(new Date());
                                            // setEndDate(addDays(new Date(), 3));
                                          }}
                                        >
                                          Right after listing
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          as="button"
                                          onClick={() => {
                                            document
                                              .getElementById("start_date")
                                              .click();
                                            setStartChosen(false);
                                          }}
                                        >
                                          Pick specific date
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown> */}
                                  </div>

                                  <div className={"input-field-sale"}>
                                    <label className={"input-sale-text"}>
                                      Auction Expiration Date
                                      <ToolTip
                                        icon={
                                          <BsFillQuestionCircleFill
                                            size={16}
                                            className="check-icon"
                                          />
                                        }
                                        content={
                                          "Auction duration can be up to 3 days. Any bid placed in the last 10 minutes extends the auction by 10 minutes."
                                        }
                                        placement="top"
                                      />
                                    </label>

                                    <Select
                                      styles={crispStyle}
                                      options={endOption}
                                      value={(() => {
                                        if (endChosen)
                                          return {
                                            label: dayjs(endDate).format(
                                              "DD MMM YYYY hh:mm a"
                                            ),
                                            value: "xx",
                                          };
                                        else
                                          return {
                                            label: "1 Day",
                                            value: "one",
                                          };
                                      })()}
                                      onChange={(data) => {
                                        if (data.value === "one") {
                                          setEndChosen(false);
                                        } else {
                                          document
                                            .getElementById("end_date")
                                            .click();

                                          setEndChosen(false);
                                        }
                                      }}
                                    />

                                    {/* <Dropdown>
                                      <Dropdown.Toggle as={CustomToggle}>
                                        {endChosen
                                          ? dayjs(endDate).format(
                                              "DD MMM YYYY hh:mm a"
                                            )
                                          : `1 Day`}
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item
                                          as="button"
                                          onClick={() => setEndChosen(false)}
                                        >
                                          1 Day
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          as="button"
                                          onClick={() => {
                                            document
                                              .getElementById("end_date")
                                              .click();

                                            setEndChosen(false);
                                          }}
                                        >
                                          Pick specific date
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown> */}
                                  </div>
                                </div>

                                {/* {erc721Sale.scheduleAuction && (
                                <div className="input-sale-container mt-3 flex-input ">
                                  <div className="input-field-sale">
                                    <label className="input-sale-text">
                                      Auction Start Date
                                    </label>
                                    <div className="input-sale-wrap">
                                      <DatePicker
                                        selected={erc721Sale.startDate}
                                        onChange={(date) =>
                                          handleStartDate(date)
                                        }
                                        showTimeSelect
                                        withPortal
                                        minDate={new Date()}
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                      />
                                    </div>
                                  </div>

                                  <div className="input-field-sale">
                                    <label className="input-sale-text">
                                      Auction End Date
                                    </label>
                                    <div className="input-sale-wrap">
                                      <DatePicker
                                        selected={erc721Sale.endDate}
                                        onChange={(date) => handleEndDate(date)}
                                        showTimeSelect
                                        withPortal
                                        minDate={erc721Sale.startDate}
                                        maxDate={addDays(
                                          erc721Sale.startDate,
                                          3
                                        )}
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )} */}
                              </>
                            )}

                            {erc721 ? (
                              <div className={"you-own-block"}>
                                <span className={"you-own-title"}>You Own</span>
                                <div className={"you-own"}>
                                  <h3>
                                    1 of 1 <span>left</span>
                                  </h3>
                                  <h3>Edition</h3>
                                </div>
                              </div>
                            ) : (
                              <div className={"you-own-block"}>
                                <span className={"you-own-title"}>
                                  Total Amount
                                </span>
                                <div className={"you-own"}>
                                  <h3>$ {erc1155Sale.totalAmount}</h3>
                                  <h3>
                                    {erc1155Sale.buyQuantity}
                                    {parseInt(erc1155Sale.buyQuantity) > 1
                                      ? ` Edition(s)`
                                      : ` Edition`}
                                  </h3>
                                </div>
                              </div>
                            )}

                            {/* <div className="px-3">
                            <HelpLine />
                          </div> */}
                          </div>
                        </div>

                        <div className={"bottom-area"}>
                          <div className={`terms text-secondary`}>
                            A artist fee of {nft?.royalties}% will be applicable
                            for every transaction.
                          </div>

                          <div className={"bottom-content-pop"}>
                            <div
                              className={"back-button"}
                              onClick={() => setPutOnSalePop(!putOnSalePop)}
                            >
                              Back
                            </div>
                            <div className={"place-bid-button"}>
                              {erc721 ? (
                                <button
                                  disabled={(() => {
                                    if (
                                      erc721Sale.isBuy &&
                                      erc721Sale.buyAmount <
                                        parseFloat(nft?.floor_price)
                                    ) {
                                      return true;
                                    } else if (
                                      erc721Sale.isBid &&
                                      erc721Sale.bidAmount <
                                        parseFloat(nft?.floor_price)
                                    ) {
                                      return true;
                                    } else if (
                                      !erc721Sale.isBuy &&
                                      !erc721Sale.isBid
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  })()}
                                  className={`btn btn-dark text-center btn-lg w-75 place-bid-btn-pop ${confirmState.processClass}`} //process -> proccessing
                                  onClick={() => handleConfirm()}
                                >
                                  <span>
                                    {(() => {
                                      if (
                                        erc721Sale.isBuy &&
                                        erc721Sale.buyAmount <
                                          parseFloat(nft?.floor_price) &&
                                        erc721Sale.isBid &&
                                        erc721Sale.bidAmount <
                                          parseFloat(nft?.floor_price)
                                      ) {
                                        return `Min.Bid & Buy Amount ${currencyFormat(
                                          nft?.floor_price,
                                          "USD"
                                        )} is required`;
                                      } else if (
                                        erc721Sale.isBuy &&
                                        erc721Sale.buyAmount <
                                          parseFloat(nft?.floor_price)
                                      ) {
                                        return `Min.Buy Amount ${currencyFormat(
                                          nft?.floor_price,
                                          "USD"
                                        )} is required`;
                                      } else if (
                                        erc721Sale.isBid &&
                                        erc721Sale.bidAmount <
                                          parseFloat(nft?.floor_price)
                                      ) {
                                        return `Min.Bid Amount ${currencyFormat(
                                          nft?.floor_price,
                                          "USD"
                                        )} is required`;
                                      } else if (
                                        !erc721Sale.isBuy &&
                                        !erc721Sale.isBid
                                      ) {
                                        return `Min.Bid or Buy Amount ${currencyFormat(
                                          nft?.floor_price,
                                          "USD"
                                        )} is required`;
                                      } else {
                                        return "List for sale";
                                      }
                                    })()}
                                  </span>
                                </button>
                              ) : (
                                <button
                                  disabled={(() => {
                                    if (
                                      erc1155Sale.buyAmount <
                                        parseFloat(nft?.floor_price) ||
                                      !erc1155Sale.buyQuantity > 0
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  })()}
                                  className={`btn btn-dark text-center btn-lg w-75  place-bid-btn-pop ${confirmState.processClass}`} //process -> proccessing
                                  onClick={() => setConfirm(true)}
                                >
                                  <span>
                                    {(() => {
                                      if (
                                        erc1155Sale.buyAmount <
                                        parseFloat(nft?.floor_price)
                                      ) {
                                        return `Set a Minimum Price of ${currencyFormat(
                                          nft?.floor_price,
                                          "USD"
                                        )} For Your NFT`;
                                      } else if (!erc1155Sale.buyQuantity > 0) {
                                        return "Specify Quantity";
                                      } else {
                                        return "List for sale";
                                      }
                                    })()}
                                  </span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  } else if (confirm) {
                    if (erc721) {
                      return (
                        <>
                          <div className={"pop-sale-head-content"}>
                            <div className={"pop-sale-title"}>
                              Confirm the sale
                            </div>
                            <div
                              className={"close-button-pop"}
                              onClick={() => setPutOnSalePop(!putOnSalePop)}
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
                            className={`pop-sale-progress ${confirmState.progressError}`}
                          >
                            <div className={"progress-complete"}></div>
                          </div>
                          <div className={"pop-sale-bodyContent"}>
                            <div className={"error-float-container"}>
                              {/* <ErrorText type="ending-time" /> */}
                              {/* <ErrorText
                              handleClick={() =>
                                setBuy({
                                  ...buy,
                                  isError: false,
                                  progressError: "",
                                })
                              }
                              type="error"
                              title={buy.errorTitle}
                              desc={buy.errorDescription}
                            /> */}
                            </div>
                            <div className={"pop-sale-nft-info"}>
                              <div className={"pop-sale-nft-media"}>
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
                                          nft?.asset_url
                                            ? nft?.asset_url
                                            : "/sample.gif"
                                        }
                                      />
                                    );
                                  } else if (
                                    nft?.asset_type?.includes("audio")
                                  ) {
                                    return (
                                      <>
                                        <Image
                                          unoptimized={true}
                                          alt="media_logo"
                                          width={250}
                                          height={250}
                                          className="type_image typeimg_audio"
                                          src={
                                            nft?.cover_url
                                              ? nft?.cover_url
                                              : "/sample.gif"
                                          }
                                        />
                                      </>
                                    );
                                  } else if (
                                    nft?.asset_type?.includes("video")
                                  ) {
                                    return (
                                      <Image
                                        unoptimized={true}
                                        alt="media_logo"
                                        width={250}
                                        height={250}
                                        className="type_image typeimg_audio"
                                        src={
                                          nft?.cover_url
                                            ? nft?.cover_url
                                            : "/sample.gif"
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
                                          nft?.asset_url
                                            ? nft?.asset_url
                                            : "/sample.gif"
                                        }
                                      />
                                    );
                                  }
                                })()}
                              </div>
                              <div className={"pop-sale-nft-content"}>
                                <div className={`pop-author-name text-center`}>
                                  {nft?.category_name}
                                </div>
                                <div
                                  className={`pop-sale-nft-title text-center mb-1`}
                                >
                                  {nft?.name}
                                </div>
                                <div className={`erc-type text-center mb-1`}>
                                  1 of 1 <span>left</span>
                                </div>
                              </div>
                            </div>

                            <div className={"confirm-content-block"}>
                              <ul className={"confirm-content-list"}>
                                <li>
                                  <span className="key">Selected Editions</span>
                                  <span className="value">1/1</span>
                                </li>
                                <li>
                                  <span className="key">Type</span>
                                  <span className="value">
                                    {(() => {
                                      if (
                                        erc721Sale.isBid &&
                                        !erc721Sale.isBuy
                                      ) {
                                        return "Bid";
                                      } else if (
                                        erc721Sale.isBuy &&
                                        !erc721Sale.isBid
                                      ) {
                                        return "Buy";
                                      } else if (
                                        erc721Sale.isBid &&
                                        erc721Sale.isBuy
                                      ) {
                                        return "Bid & Buy";
                                      } else {
                                        return "-";
                                      }
                                    })()}
                                  </span>
                                </li>
                                {erc721Sale.isBuy && (
                                  <>
                                    <li>
                                      <span className="key">Buy Amount</span>
                                      <span className="value">
                                        {`$${erc721Sale.buyAmount * 1}`}
                                      </span>
                                    </li>

                                    <li>
                                      <span className="key">
                                        Artist Fee{" "}
                                        <ToolTip
                                          icon={
                                            <BsFillQuestionCircleFill
                                              size={16}
                                              className="check-icon"
                                            />
                                          }
                                          content={
                                            "The royalty paid to the artist or the inspiration."
                                          }
                                          placement="top"
                                        />
                                      </span>
                                      <span className="value">
                                        - {parseFloat(nft?.royalties)}%
                                      </span>
                                    </li>
                                    <li>
                                      <span className="key">
                                        Service Fee{" "}
                                        <ToolTip
                                          icon={
                                            <BsFillQuestionCircleFill
                                              size={16}
                                              className="mb-1 check-icon"
                                            />
                                          }
                                          content={
                                            "The service fee includes gas fee and the platform fee."
                                          }
                                          placement="top"
                                        />
                                      </span>
                                      <span className="value">
                                        - {parseFloat(nft?.service_fee)}%
                                      </span>
                                    </li>
                                    {user?.apply_sale_tds &&
                                      !isNaN(parseFloat(nft?.tds_rate)) && (
                                        <li>
                                          <span className="key">
                                            TDS{" "}
                                            <ToolTip
                                              icon={
                                                <BsFillQuestionCircleFill
                                                  size={16}
                                                  className="mb-1 check-icon"
                                                />
                                              }
                                              content={
                                                "TDS u/s 194S Income Tax Act"
                                              }
                                              placement="top"
                                            />
                                          </span>
                                          <span className="value">
                                            - {parseFloat(nft?.tds_rate)}%
                                          </span>
                                        </li>
                                      )}
                                    <li className={"final-set"}>
                                      <span className="key">Final Amount </span>
                                      <span className="value">
                                        {calculateTotalAmount(
                                          erc721Sale?.buyAmount,
                                          parseFloat(nft?.royalties) +
                                            parseFloat(nft?.service_fee),
                                          nft?.tds_rate
                                        )}
                                      </span>
                                    </li>
                                  </>
                                )}

                                {erc721Sale.isBid && (
                                  <>
                                    <li>
                                      <span className="key">Bid Amount</span>
                                      <span className="value">
                                        {currencyFormat(
                                          erc721Sale.bidAmount,
                                          "USD"
                                        )}
                                      </span>
                                    </li>
                                    <li>
                                      <span className="key">
                                        Auction Starting Date
                                      </span>
                                      <span className="value">
                                        {startChosen
                                          ? dayjs(startDate).format(
                                              "DD MMM YYYY hh:mm a"
                                            )
                                          : "Right after listing"}
                                      </span>
                                    </li>
                                    <li>
                                      <span className="key">
                                        Auction Expiration Date{" "}
                                        <ToolTip
                                          icon={
                                            <BsFillQuestionCircleFill
                                              size={16}
                                              className="check-icon"
                                            />
                                          }
                                          content={
                                            "Any bid placed in the last 10 minutes extends the auction by 10 minutes."
                                          }
                                          placement="top"
                                        />
                                      </span>
                                      <span className="value">
                                        {startChosen && !endChosen
                                          ? dayjs(addDays(startDate, 1)).format(
                                              "DD MMM YYYY hh:mm a"
                                            )
                                          : endChosen
                                          ? dayjs(endDate).format(
                                              "DD MMM YYYY hh:mm a"
                                            )
                                          : "1 Day"}
                                      </span>
                                    </li>
                                  </>
                                )}
                                {erc721Sale.isBid && (
                                  <li className={"final-set"}>
                                    <span className="key ">
                                      1. Auction cannot be cancelled after any
                                      valid bid was made. <br />
                                      2. Your final amount will be calculated
                                      after deducting{" "}
                                      {parseFloat(nft?.royalties)}% artist fee{" "}
                                      <ToolTip
                                        icon={
                                          <BsFillQuestionCircleFill
                                            size={16}
                                            className="mb-1 check-icon"
                                          />
                                        }
                                        content={
                                          "The royalty paid to the artist or the inspiration."
                                        }
                                        placement="top"
                                      />{" "}
                                      {user?.apply_sale_tds &&
                                      !isNaN(parseFloat(nft?.tds_rate))
                                        ? ","
                                        : "and"}{" "}
                                      {parseFloat(nft?.service_fee)}% service
                                      fee{" "}
                                      <ToolTip
                                        icon={
                                          <BsFillQuestionCircleFill
                                            size={16}
                                            className="mb-1 check-icon"
                                          />
                                        }
                                        content={
                                          "The service fee includes gas fee and the platform fee."
                                        }
                                        placement="top"
                                      />{" "}
                                      {user?.apply_sale_tds &&
                                        !isNaN(parseFloat(nft?.tds_rate)) && (
                                          <>
                                            {`and ${parseFloat(
                                              nft?.tds_rate
                                            )}% of TDS`}{" "}
                                            <ToolTip
                                              icon={
                                                <BsFillQuestionCircleFill
                                                  size={16}
                                                  className="mb-1 check-icon"
                                                />
                                              }
                                              content={
                                                "TDS u/s 194S Income Tax Act"
                                              }
                                              placement="top"
                                            />{" "}
                                          </>
                                        )}
                                      on the final bid amount.
                                    </span>
                                  </li>
                                )}

                                {nft?.celebrity_id ===
                                  parseInt(
                                    process.env.NEXT_PUBLIC_LATIMES_ID
                                  ) && (
                                  <li className="">
                                    <span className={"terms quantity-to-value"}>
                                      By proceeding further and clicking the
                                      &quot;CONFIRM&quot; button as your
                                      electronic signature, you acknowledge and
                                      agree to the LA Times{" "}
                                      <a
                                        href="https://nft?.latimes.com/terms-and-conditions/"
                                        target={"_blank"}
                                        rel="noreferrer"
                                      >
                                        Terms and Conditions
                                      </a>
                                    </span>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                          <div className={"bottom-area"}>
                            <div className={"confirm-content-msg"}>
                              Are you sure want to Continue ?
                            </div>
                            <div className={"bottom-content-pop"}>
                              <div
                                className={"back-button"}
                                onClick={() => setConfirm(!confirm)}
                              >
                                Back
                              </div>
                              <div className={"place-bid-button"}>
                                <button
                                  disabled={confirmState.buttonDisable}
                                  className={`btn btn-dark text-center btn-lg w-75  place-bid-btn-pop ${confirmState.processClass}`} //process -> proccessing
                                  onClick={handlePutOnSale}
                                >
                                  <span> {confirmState.buttonName}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <div className={"pop-sale-head-content"}>
                            <div className={"pop-sale-title"}>
                              Confirm the sale
                            </div>
                            <div
                              className={"close-button-pop"}
                              onClick={() => setPutOnSalePop(!putOnSalePop)}
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
                            className={`pop-sale-progress ${confirmState.progressError}`}
                          >
                            <div className={"progress-complete"}></div>
                          </div>
                          <div className={"pop-sale-bodyContent"}>
                            <div className={"error-float-container"}>
                              {/* <ErrorText type="ending-time" /> */}
                            </div>
                            <div className={"pop-sale-nft-info"}>
                              <div className={"pop-sale-nft-media"}>
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
                                          nft?.asset_url
                                            ? nft?.asset_url
                                            : "/sample.gif"
                                        }
                                      />
                                    );
                                  } else if (
                                    nft?.asset_type?.includes("audio")
                                  ) {
                                    return (
                                      <>
                                        <Image
                                          unoptimized={true}
                                          alt="media_logo"
                                          width={250}
                                          height={250}
                                          className="type_image typeimg_audio"
                                          src={
                                            nft?.cover_url
                                              ? nft?.cover_url
                                              : "/sample.gif"
                                          }
                                        />
                                      </>
                                    );
                                  } else if (
                                    nft?.asset_type?.includes("video")
                                  ) {
                                    return (
                                      <Image
                                        unoptimized={true}
                                        alt="media_logo"
                                        width={250}
                                        height={250}
                                        className="type_image typeimg_audio"
                                        src={
                                          nft?.cover_url
                                            ? nft?.cover_url
                                            : "/sample.gif"
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
                                          nft?.asset_url
                                            ? nft?.asset_url
                                            : "/sample.gif"
                                        }
                                      />
                                    );
                                  }
                                })()}
                              </div>
                              <div className={"pop-sale-nft-content"}>
                                <div className={`pop-author-name text-center`}>
                                  {nft?.category_name}
                                </div>
                                <div
                                  className={`pop-sale-nft-title text-center mb-1`}
                                >
                                  {nft?.name}
                                </div>
                                {/* <div className="erc-type">
                              1 of 1 <span>left</span>
                            </div> */}
                              </div>
                            </div>

                            <div className={"confirm-content-block"}>
                              <ul className={"confirm-content-list"}>
                                <li>
                                  <span className="key">Selected Editions</span>
                                  <span className="value">{`${
                                    erc1155Sale.buyQuantity
                                  } / ${_.get(
                                    nft,
                                    "owner_details.total_quantity",
                                    0
                                  )}`}</span>
                                </li>
                                <li>
                                  <span className="key">Buy Amount</span>
                                  <span className="value">
                                    {currencyFormat(
                                      erc1155Sale.totalAmount,
                                      "USD"
                                    )}
                                  </span>
                                </li>
                                <li>
                                  <span className="key">
                                    Artist Fee{" "}
                                    <ToolTip
                                      icon={
                                        <BsFillQuestionCircleFill
                                          size={16}
                                          className="mb-1 check-icon"
                                        />
                                      }
                                      content={
                                        "The royalty paid to the artist or the inspiration."
                                      }
                                      placement="top"
                                    />
                                  </span>
                                  <span className="value">
                                    - {parseFloat(nft?.royalties)}%
                                  </span>
                                </li>
                                <li>
                                  <span className="key">
                                    Service Fee{" "}
                                    <ToolTip
                                      icon={
                                        <BsFillQuestionCircleFill
                                          size={16}
                                          className="mb-1 check-icon"
                                        />
                                      }
                                      content={
                                        "The service fee includes gas fee and the platform fee."
                                      }
                                      placement="top"
                                    />
                                  </span>
                                  <span className="value">
                                    - {parseFloat(nft?.service_fee)}%
                                  </span>
                                </li>
                                <li className={"final-set"}>
                                  <span className="key">Total Amount </span>
                                  <span className="value">
                                    {currencyFormat(
                                      parseFloat(erc1155Sale.totalAmount) -
                                        (parseFloat(erc1155Sale.totalAmount) *
                                          (parseFloat(nft?.royalties) +
                                            parseFloat(nft?.service_fee))) /
                                          100,
                                      "USD"
                                    )}
                                  </span>
                                </li>
                                {nft?.celebrity_id ===
                                  parseInt(
                                    process.env.NEXT_PUBLIC_LATIMES_ID
                                  ) && (
                                  <li className="">
                                    <span className={"terms quantity-to-value"}>
                                      By proceeding further and clicking the
                                      &quot;CONFIRM&quot; button as your
                                      electronic signature, you acknowledge and
                                      agree to the LA Times{" "}
                                      <a
                                        href="https://nft?.latimes.com/terms-and-conditions/"
                                        target={"_blank"}
                                        rel="noreferrer"
                                      >
                                        Terms and Conditions.
                                      </a>
                                    </span>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                          <div className={"bottom-area"}>
                            <div className={"confirm-content-msg"}>
                              Are you sure want to Continue ?
                            </div>
                            <div className={"bottom-content-pop"}>
                              <div
                                className={"back-button"}
                                onClick={() => setConfirm(!confirm)}
                              >
                                Back
                              </div>
                              <div className={"place-bid-button"}>
                                <button
                                  disabled={confirmState.buttonDisable}
                                  className={`btn btn-dark text-center btn-lg w-75  place-bid-btn-pop ${confirmState.processClass}`} //process -> proccessing
                                  onClick={handlePutOnSale}
                                >
                                  <span>{confirmState.buttonName}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  } else {
                    return (
                      <>
                        <div className={"sucess-title"}>
                          <FaCheckCircle color={"#95ff8d"} size={60} />
                          <div className={`message mt-3`}>
                            Your NFT has been successfully listed for{" "}
                            {erc721 ? "bidding/sale" : "sale"}.
                          </div>

                          {orderId && (
                            <div className={"success-share-block"}>
                              <div className={`d-flex share-icon-block`}>
                                <CopyToClipboard
                                  role="button"
                                  className="me-2"
                                  text={`${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/order/details/${nft?.slug}/${orderId}`}
                                  onCopy={() => {
                                    toast.success("Copied to Clipboard");
                                  }}
                                >
                                  <AiOutlineLink size={35} />
                                </CopyToClipboard>
                                <AiFillFacebook
                                  role="button"
                                  className="me-2"
                                  size={35}
                                  style={{ color: "#4267B2" }}
                                  onClick={() =>
                                    window.open(
                                      `https://www.facebook.com/sharer/sharer.php?u=${`${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/order/details/${nft?.slug}/${orderId}`}&quote=${encodeURIComponent(
                                        `Hey!! Check out this awesome NFT I've listed for sale! You can buy it on Jump.trade marketplace!`
                                      )}`
                                    )
                                  }
                                />
                                <AiFillTwitterCircle
                                  role="button"
                                  className="me-2"
                                  size={35}
                                  style={{ color: "#1DA1F2" }}
                                  onClick={() =>
                                    window.open(
                                      `https://twitter.com/intent/tweet?url=${`${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/order/details/${nft?.slug}/${orderId}`}&text=${encodeURIComponent(
                                        `Hey y'all! Here is the #NFT I've listed for sale on @Jumptradenft marketplace powered by @Guardian_NFT! Check it out if you wanna buy this NFT and more NFTs? Sign up and gear up! #NFTCollection`
                                      )}`
                                    )
                                  }
                                />
                                <FaTelegramPlane
                                  role="button"
                                  className="me-2"
                                  size={35}
                                  style={{ color: "#0088cc" }}
                                  onClick={() =>
                                    window.open(
                                      `https://telegram.me/share/?url=${`${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/order/details/${nft?.slug}/${orderId}`}&title=${encodeURIComponent(
                                        `Hey!! Check out this awesome NFT I've listed for sale! You can buy it on Jump.trade marketplace!`
                                      )}`
                                    )
                                  }
                                />

                                <FaWhatsapp
                                  role="button"
                                  size={35}
                                  style={{ color: "#25D366" }}
                                  onClick={() => {
                                    detectWhatsapp(
                                      `whatsapp://send?text=Hey ! I found an awesome NFT here%0a%0a${encodeURIComponent(
                                        `Hey!! Check out this awesome NFT I've listed for sale! You can buy it on Jump.trade marketplace!`
                                      )}%0a%0aCheck it out in below link%0a%0a${`${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/order/details/${nft?.slug}/${orderId}`}`
                                    ).then((hasWhatsapp) => {
                                      if (!hasWhatsapp) {
                                        alert(
                                          "You don't have WhatsApp, kindly install it and try again"
                                        );
                                      }
                                    });
                                  }}
                                />
                              </div>
                              <div className={`share-message mt-2`}>
                                Spread the word and share in your circles to
                                sell it soon!
                              </div>
                            </div>
                          )}
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
                    );
                  }
                })()}
              </div>
            </>
          ) : (
            <>
              <div className={"pop-sale-nft-details"}>
                <div className={"pop-sale-head-content"}>
                  <div className={"pop-sale-title"}>
                    {/* {erc721 ? "Sign in to place bid" : "Sign in to place buy"} */}
                  </div>
                  <div
                    className={"close-button-pop"}
                    onClick={() => setPutOnSalePop(!putOnSalePop)}
                  >
                    {/* <BiX
                    role="button"
                    size={45}
                    onClick={() => setPutOnSalePop(!putOnSalePop)}
                  /> */}
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
                    {erc721 ? "Sign in to place bid" : "Sign in to place buy"}
                  </div>
                  <div className={"pop-sale-nft-media"}>
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
        <div style={{ position: "fixed", top: "-50px" }}>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              const t_start = dayjs(date).format("DD MM YYYY");
              const init = dayjs().format("DD MM YYYY");

              if (t_start === init) {
                const d = new Date();
                let minutes = d.getMinutes();

                let hours = d.getHours();

                let in_minutes = date.getMinutes();

                let in_hours = date.getHours();

                if (minutes >= 45) {
                  hours = hours + 1;
                  minutes = 0;
                } else if (minutes >= 30) {
                  minutes = 45;
                } else if (minutes >= 15) {
                  minutes = 30;
                } else if (minutes >= 0) {
                  minutes = 15;
                } else {
                  minutes = 0;
                }

                // console.log(hours, minutes, in_hours, in_minutes);

                if (hours <= in_hours) {
                  setStartDate(
                    setHours(setMinutes(date, in_minutes), in_hours)
                  );
                } else {
                  setStartDate(setHours(setMinutes(date, minutes), hours));
                }
              } else {
                setStartDate(date);
              }

              // console.log(
              //   dayjs(endDate),
              //   dayjs(date),
              //   dayjs(endDate) > dayjs(date)
              // );

              setEndDate(addHours(date, 1));

              setStartChosen(true);
              // setEndChosen(false);
            }}
            customInput={<ExampleCustomStartInput />}
            minDate={new Date()}
            minTime={(() => {
              const t_start = dayjs(startDate).format("DD MM YYYY");
              const init = dayjs().format("DD MM YYYY");

              if (t_start === init) {
                const d = new Date();
                let minutes = d.getMinutes();
                let hours = d.getHours();

                if (minutes >= 45) {
                  return setHours(setMinutes(startDate, 0), hours + 1);
                } else if (minutes >= 30) {
                  return setHours(setMinutes(startDate, 45), hours);
                } else if (minutes >= 15) {
                  return setHours(setMinutes(startDate, 30), hours);
                } else if (minutes >= 0) {
                  return setHours(setMinutes(startDate, 15), hours);
                } else {
                  return setHours(setMinutes(startDate, 0), hours);
                }
              } else {
                return setHours(setMinutes(startDate, 0), 0);
              }
            })()}
            maxTime={setHours(setMinutes(startDate, 45), 23)}
            timeFormat="hh:mm aa"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            showTimeSelect
            withPortal
            // onCalendarClose={() => {
            //   if (!startChosen) {
            //     toast.error("Choose the date");
            //   }
            // }}
          />
        </div>

        <div style={{ position: "fixed", top: "-50px" }}>
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              const t_start = dayjs(date).format("DD MM YYYY");
              const init = startChosen
                ? dayjs(startDate).format("DD MM YYYY")
                : dayjs().format("DD MM YYYY");

              const t_maxDate = dayjs(addDays(startDate, 3)).format(
                "DD MM YYYY"
              );

              if (t_start === init) {
                const d = startChosen ? startDate : new Date();
                let minutes = d.getMinutes();

                let hours = d.getHours();

                if (minutes >= 45) {
                  hours = hours + 1;
                  minutes = 45;
                } else if (minutes >= 30) {
                  minutes = 30;
                  hours = hours + 1;
                } else if (minutes >= 15) {
                  minutes = 15;
                  hours = hours + 1;
                } else if (minutes >= 0) {
                  minutes = 0;
                  hours = hours + 1;
                } else {
                  minutes = 0;
                }

                let in_minutes = date.getMinutes();

                let in_hours = date.getHours();

                // console.log(hours, minutes, in_hours, in_minutes);

                if (hours <= in_hours) {
                  if (minutes <= in_minutes) {
                    setEndDate(
                      setHours(setMinutes(date, in_minutes), in_hours)
                    );
                  } else {
                    setEndDate(setHours(setMinutes(date, minutes), in_hours));
                  }
                } else {
                  setEndDate(setHours(setMinutes(date, minutes), hours));
                }
              } else if (t_start === t_maxDate) {
                const d = startChosen ? startDate : new Date();
                let minutes = d.getMinutes();

                let hours = d.getHours();

                let in_minutes = date.getMinutes();

                let in_hours = date.getHours();

                if (in_hours < hours) {
                  setEndDate(setHours(setMinutes(date, in_minutes), in_hours));
                } else {
                  if (minutes > 45) {
                    setEndDate(setHours(setMinutes(date, 0), hours + 1));
                  } else if (minutes > 30) {
                    setEndDate(setHours(setMinutes(date, 45), hours));
                  } else if (minutes > 15) {
                    setEndDate(setHours(setMinutes(date, 30), hours));
                  } else if (minutes > 0) {
                    setEndDate(setHours(setMinutes(date, 15), hours));
                  } else {
                    setEndDate(setHours(setMinutes(date, minutes), hours));
                  }
                }
              } else {
                setEndDate(date);
              }

              setEndChosen(true);
            }}
            customInput={<ExampleCustomEndInput />}
            minDate={startChosen ? startDate : new Date()}
            maxDate={
              startChosen ? addDays(startDate, 3) : addDays(new Date(), 3)
            }
            minTime={(() => {
              const t_endDate = dayjs(endDate).format("DD MM YYYY");

              const tmp_start_date = startChosen ? startDate : new Date();

              const t_startDate = dayjs(tmp_start_date).format("DD MM YYYY");

              if (t_endDate === t_startDate) {
                const d = startDate;
                let minutes = d.getMinutes();

                let hours = d.getHours();

                if (minutes >= 45) {
                  return setHours(setMinutes(tmp_start_date, 15), hours + 1);
                } else if (minutes >= 30) {
                  return setHours(setMinutes(tmp_start_date, 0), hours + 1);
                } else if (minutes >= 15) {
                  return setHours(setMinutes(tmp_start_date, 45), hours);
                } else if (minutes >= 0) {
                  return setHours(setMinutes(tmp_start_date, 30), hours);
                }
              } else {
                return setHours(setMinutes(endDate, 0), 0);
              }
            })()}
            maxTime={(() => {
              const t_endDate = dayjs(endDate).format("DD MM YYYY");

              const t_maxDate = dayjs(addDays(startDate, 3)).format(
                "DD MM YYYY"
              );

              if (t_endDate === t_maxDate) {
                const d = startDate;
                let minutes = d.getMinutes();

                let hours = d.getHours();

                return setHours(setMinutes(startDate, minutes), hours);
              } else {
                return setHours(setMinutes(startDate, 45), 23);
              }
            })()}
            timeFormat="hh:mm aa"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            showTimeSelect
            withPortal
            // onCalendarClose={() => {
            //   if (!endChosen) {
            //     toast.error("Choose the date");
            //   }
            // }}
          />
        </div>
      </Offcanvas>
    </>
  );
};

export default NFTPutOnSale;
