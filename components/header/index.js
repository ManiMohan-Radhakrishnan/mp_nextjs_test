import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState, forwardRef } from "react";
import { useRouter } from "next/router";
import { Navbar, Nav, Dropdown, Container } from "react-bootstrap";
import { BiBell, BiHelpCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { FaDiscord, FaInfoCircle } from "react-icons/fa";
import { CgMenuRight } from "react-icons/cg";
import { VscChromeClose } from "react-icons/vsc";
import { toast } from "react-toastify";

import useWindowUtils from "../../hooks/useWindowUtils";
import Cart from "../cart";
import useScrollPosition from "../../utils/scroll-position";
import AppHelmet from "../helmet";
import style from "./style.module.scss";
import images from "../../utils/images.json";
import deposit from "../../images/noti/deposit.svg";
import withdraw from "../../images/noti/withdraw-icon.svg";
import {
  loot_details_thunk,
  user_logout_thunk,
} from "../../redux/thunk/user_thunk";
import {
  accountDetail,
  cartCheckout,
  cartDetail,
} from "../../utils/actioncable-methods";
import { currencyFormat, roundDown } from "../../utils/common";
import {
  getStatusMclBall,
  isUserLoggedIn,
  mclGamePassLootStatus,
  walletUpdate,
} from "../../redux/reducers/user_reducer";
import { getNotificationApi } from "../../utils/base-methods";
import { readNotificationApi } from "./../../utils/base-methods";
import {
  checkout_event_thunk,
  get_cart_list_thunk,
} from "../../redux/thunk/user_cart_thunk";
import { removeCookiesByName, setCookiesByName } from "../../utils/cookies";
import { LOOT_STATUS } from "../mcl-game-code-components/common";
import { IoMdClose } from "react-icons/io";
import { EVENT_NAMES, invokeTrackEvent } from "../../utils/track-events";
import { getTransferNftMenu } from "../../utils/methods";

const crypto_bat_nft_path = "/drop/crypto-bat-nfts";
const raddx_car_nft_path = "/drop/raddx-car-nfts";
// const mcl_play_pass_path = "/drop/free-mcl-pass";
const shots_path = "/drop/mcl-shot-nfts";
const referral_path = "/referral-program";
const contest_path = "/nft-marketplace/spin-contest";
const creator_path = "/creator-application";
const rental_path = "/nft-rental";
const fusor_path = "/drop/mcl-fusor-nfts";
const mega_pass_path = "/drop/free-mcl-mega-pass";
const mcl_season_pass = "/drop/mcl-free-season-pass";

const ENABLE_CREATOR_APPLICATION = true;

const Header = ({
  hideOptions = false,
  hideSign = false,
  started = false,
  bgImage = false,
  ...props
}) => {
  const dispatch = useDispatch();
  const windowUtils = useWindowUtils();
  const scrollPosition = useScrollPosition();
  const loginStatus = useSelector(isUserLoggedIn);

  const { user, cart } = useSelector((state) => state);
  const isBallNFTLive = useSelector(getStatusMclBall);
  const isMCLMegaPassLive = useSelector(mclGamePassLootStatus);
  const router = useRouter();
  const cartOpen = router.query.cartOpen;
  const fsz = router.query.fsz;
  const aid = router.query.aid;
  const mcl_founder_pass = `/drop/mcl-founder-pass${fsz ? `?fsz=${fsz}` : ""}`;

  const [notiLoading, setNotiLoading] = useState(false);
  const [npage, setNPage] = useState(1);
  const [notification, setNotification] = useState();
  const [notiRead, setNotiRead] = useState(true);

  //const [ribbon, setRibbon] = useState(true);
  const [cartPop, setCartPop] = useState(false);
  const [checkoutDevice, setCheckoutDevice] = useState(false);

  const [closed, setClosed] = useState(true);

  const slug = user.data?.user ? user.data?.user?.slug : null;
  const userCart = cart?.data ? cart?.data : null;

  const { width: innerWidth } = windowUtils;

  const [showTransferNftMenu, setShowTransferNftMenu] = useState(false);

  const [visibleTime, setVisibleTime] = useState(false);

  useEffect(() => {
    if (slug) {
      accountDetail(slug, (data) => {
        dispatch(walletUpdate(data));
      });
      handleGetNotification(npage);
      dispatch(get_cart_list_thunk());
      cartDetail(slug, (data) => {
        dispatch(get_cart_list_thunk());
      });
      cartCheckout(slug, (data) => {
        dispatch(checkout_event_thunk(data?.event === "start" ? true : false));
      });
      if (windowUtils.hash === "#cart") {
        router.push("/");
        setCartPop(true);
      }
      if (cartOpen) {
        router.push("/");
        setCartPop(true);
      }
    }
    if (user?.data?.user) {
      if (!user?.data?.user?.name) {
        window.open(
          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/profile?forceUpdate=true`,
          "_self"
        );
      }
    }
    if (user?.data?.user) {
      if (!user?.data?.user?.first_name && !user?.data?.user?.last_name) {
        window.open(
          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/profile?forceUpdate=true`,
          "_self"
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (fsz) {
      removeCookiesByName("fsz");
      sessionStorage.removeItem("fsz");
      setTimeout(() => {
        sessionStorage.setItem("fsz", fsz);
        setCookiesByName("fsz", fsz);
      }, 500);
    }

    // XENA Integration
    if (aid) {
      for (const [key, value] of Object.entries(router.query)) {
        setCookiesByName(key, value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setVisibleTime(true);
    }
  }, []);

  const handleTransferNftMenu = async () => {
    try {
      const result = await getTransferNftMenu();
      setShowTransferNftMenu(result?.data?.data?.drops_available);
    } catch (err) {
      console.log("err", err?.response?.data?.data?.message);
    }
  };

  useEffect(() => {
    if (loginStatus) handleTransferNftMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetNotification = async (input) => {
    try {
      setNotiLoading(true);
      const result = await getNotificationApi(input);
      setNotiLoading(false);
      if (input === 1) {
        setNotification(result.data.data);
        if (result.data.data.total > 0) {
          setNotiRead(result.data.data.notifications_read);
        }
      } else {
        setNotification({
          ...notification,
          notifications: [
            ...notification.notifications,
            ...result.data.data.notifications,
          ],
          next_page: result.data.data.next_page,
        });
      }
    } catch (error) {
      setNotiLoading(false);

      console.log(
        "🚀 ~ file: index.js ~ line 49 ~ handleGetNotification ~ error",
        error
      );
    }
  };
  const handleClose = () => {
    setClosed(false);
  };

  const readNotification = async () => {
    try {
      if (notiRead) await readNotificationApi();
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js ~ line 61 ~ readNotification ~ error",
        error
      );
    }
  };

  const UserToggleComponent = forwardRef(({ onClick }, ref) => (
    <UserComponent
      user={user.data.user}
      sref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));

  UserToggleComponent.displayName = "UserToggleComponent";

  const NotificationToggleComponent = forwardRef(({ onClick }, ref) => {
    return (
      <div
        className={`${notification ? "theme-color rounded-circle" : ""}`}
        ref={ref}
        role="button"
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
          setNotiRead(true);
        }}
      >
        <Image
          unoptimized={true}
          height={22}
          width={22}
          src={images.bellNotify}
          alt="Nofity-Bell"
          priority={true}
        />

        {!notiRead && (
          <>
            <span className={"nofi-color"}> </span>
          </>
        )}
      </div>
    );
  });

  NotificationToggleComponent.displayName = "NotificationToggleComponent";

  const DropToggle = forwardRef(({ onClick }, ref) => {
    return (
      <Nav.Link
        id="drop_outer"
        role={"button"}
        // className={"pre-btn"}
        ref={ref}
        onMouseOver={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        Drops
        <span
          className={
            (isBallNFTLive === LOOT_STATUS?.PRE_BOOK ||
              isBallNFTLive === LOOT_STATUS?.DROP) &&
            "new-badge"
          }
        >
          {(isBallNFTLive === LOOT_STATUS?.PRE_BOOK ||
            isBallNFTLive === LOOT_STATUS?.DROP) &&
            "live"}
        </span>
      </Nav.Link>
    );
  });

  DropToggle.displayName = "DropToggle";

  const SpinAndWinToggle = forwardRef(({ onClick }, ref) => {
    return (
      <Nav.Link
        id="drop_outer"
        role={"button"}
        className={"pre-btn"}
        ref={ref}
        onMouseOver={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        onClick={(e) => {
          e.preventDefault();
          router.push(contest_path);
        }}
      >
        {`Spin & Win`}
        {/* <span className="new-badge">new</span> */}
      </Nav.Link>
    );
  });

  SpinAndWinToggle.displayName = "SpinAndWinToggle";

  const NotiCard = ({ data }) => {
    const handleNotiClick = () => {
      if (data.reason === "deposit") {
        window.open(
          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/wallet`,
          "_self"
        );
      }
    };

    return (
      <div className={"noti-message"} role="button" onClick={handleNotiClick}>
        {data?.img_url ? (
          <>
            <Image
              unoptimized={true}
              height={40}
              width={40}
              src={data?.img_url}
              alt="notification icon"
              priority={true}
            />
          </>
        ) : (
          <>
            {" "}
            <Image
              unoptimized={true}
              height={40}
              width={40}
              src={images?.buy}
              alt="notification icon"
              priority={true}
            />
          </>
        )}
        {/* {(() => {
          if (data.activity_type === "deposit") {
            return (
              <Image unoptimized={true}
                
                height={40}
                width={40}
                src={images.deposit}
                alt="notification icon"
                priority={true}
              />
            );
          } else if (data.activity_type === "bid") {
            if (data.reason === "bid_lock") {
              return (
                <Image unoptimized={true}
                  
                  height={40}
                  width={40}
                  src={images.bid}
                  alt="notification icon"
                  priority={true}
                />
              );
            } else if (
              data.reason === "bid_expired" ||
              data.reason === "bid_closed"
            ) {
              return (
                <Image unoptimized={true}
                  
                  height={40}
                  width={40}
                  src={images.outbid}
                  alt="notification icon"
                  priority={true}
                />
              );
            } else if (data.reason === "bid_outdated") {
              return (
                <Image unoptimized={true}
                  
                  height={40}
                  width={40}
                  src={images.outbid}
                  alt="notification icon"
                  priority={true}
                />
              );
            } else if (data.reason === "bid_cancelled") {
              return (
                <Image unoptimized={true}
                  
                  height={40}
                  width={40}
                  src={images.outbid}
                  alt="notification icon"
                  priority={true}
                />
              );
            } else if (data.reason === "bid_success") {
              return (
                <Image unoptimized={true}
                  
                  height={40}
                  width={40}
                  src={images.bid}
                  alt="notification icon"
                  priority={true}
                />
              );
            } else if (data.reason === "bid_received") {
              return (
                <Image unoptimized={true}
                  
                  height={40}
                  width={40}
                  src={images.outbid}
                  alt="notification icon"
                  priority={true}
                />
              );
            }
          } else if (data.activity_type === "buy") {
            if (data.payment_type === "debit") {
              return (
                <Image unoptimized={true}
                  
                  height={40}
                  width={40}
                  src={images.buy}
                  alt="notification icon"
                  priority={true}
                />
              );
            } else {
              return (
                <Image unoptimized={true}
                  
                  height={40}
                  width={40}
                  src={images.buy}
                  alt="notification icon"
                  priority={true}
                />
              );
            }
          } else if (data.activity_type === "withdraw") {
            if (data.reason === "withdraw_requested" || data.reason === "withdraw_cancelled" || data.reason === "withdraw_success") {
              return (
                <Image unoptimized={true}
                  
                  height={40}
                  width={40}
                  src={images.withdrawMoney}
                  alt="notification icon"
                  priority={true}
                />
              );
            }
          } else if (data.activity_type === "ownership_credit") {
            return (
              <Image unoptimized={true}
                
                height={40}
                width={40}
                src={images.buy}
                alt="notification icon"
                priority={true}
              />
            );
          } else {
            return "";
          }
        })()} */}

        <div className={"noti-message-content"}>
          <>
            <div className="title">{data?.title}</div>
            <div className="desc text-secondary">{data?.desc}</div>
            <div className="noti-time">
              {dayjs(data?.created_at).format("DD MMM YYYY hh:mma")}
            </div>
          </>
          {/* {(() => {
            if (data.activity_type === "deposit") {
              return (
                <>
                  <div className="title">Deposit Successful</div>
                  <div className="desc text-secondary">
                    Your payment of{" "}
                    <b>{currencyFormat(Math.round(data.amount), "USD")}</b> was
                    successfully processed to your wallet! Happy NFT buying.
                  </div>
                  <div className="noti-time">
                    {dayjs(data.created_at).format("DD MMM YYYY hh:mma")}
                  </div>
                </>
              );
            } else if (data.activity_type === "bid") {
              return (
                <>
                  {(() => {
                    if (data.reason === "bid_lock") {
                      return (
                        <>
                          <div className="title">Bid Locked</div>
                          <div className="desc text-secondary">
                            <>
                              Your bid of{" "}
                              <b>
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                              is locked for{" "}
                              <b>
                                {data.celebrity_name}
                                &apos;s {data.nft_name}
                              </b>{" "}
                              from <b>{data.buyer_name}</b>{" "}
                            </>
                          </div>
                          <div className={"noti-time"}>
                            {dayjs(data.created_at).format(
                              "DD MMM YYYY hh:mma"
                            )}
                          </div>
                        </>
                      );
                    } else if (
                      data.reason === "bid_expired" ||
                      data.reason === "bid_closed"
                    ) {
                      return (
                        <>
                          <div className="title">Bid Expired</div>
                          <div className="desc text-secondary">
                            <>
                              Your bid{" "}
                              <b>
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                              was expired for{" "}
                              <b>
                                {data.celebrity_name}
                                &apos;s {data.nft_name}
                              </b>{" "}
                              from <b>{data.buyer_name}</b>
                            </>
                          </div>
                          <div className="noti-time">
                            {dayjs(data.created_at).format(
                              "DD MMM YYYY hh:mma"
                            )}
                          </div>
                        </>
                      );
                    } else if (data.reason === "bid_outdated") {
                      return (
                        <>
                          <div className="title">Bid Outdated</div>
                          <div className="desc text-secondary">
                            <>
                              Your bid{" "}
                              <b>
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                              was outdated for{" "}
                              <b>
                                {data.celebrity_name}
                                &apos;s {data.nft_name}
                              </b>{" "}
                              from <b>{data.buyer_name}</b>
                            </>
                          </div>
                          <div className="noti-time">
                            {dayjs(data.created_at).format(
                              "DD MMM YYYY hh:mma"
                            )}
                          </div>
                        </>
                      );
                    } else if (data.reason === "bid_cancelled") {
                      return (
                        <>
                          <div className="title">Bid Cancelled</div>
                          <div className="desc text-secondary">
                            <>
                              Your bid{" "}
                              <b>
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                              was cancelled for{" "}
                              <b>
                                {data.celebrity_name}
                                &apos;s {data.nft_name}
                              </b>{" "}
                              by <b>{data.seller_name}</b>
                            </>
                          </div>
                          <div className="noti-time">
                            {dayjs(data.created_at).format(
                              "DD MMM YYYY hh:mma"
                            )}
                          </div>
                        </>
                      );
                    } else if (data.reason === "bid_success") {
                      return (
                        <>
                          {data.payment_type === "debit" ? (
                            <>
                              <div className="title">Bid Successfull</div>
                              <div className="desc text-secondary">
                                <>
                                  Your bid{" "}
                                  <b>
                                    {" "}
                                    {currencyFormat(
                                      Math.round(data.amount),
                                      "USD"
                                    )}
                                  </b>{" "}
                                  was successful for{" "}
                                  <b>
                                    {" "}
                                    {data.celebrity_name}
                                    &apos;s {data.nft_name}
                                  </b>{" "}
                                  from <b>{data.buyer_name}</b>
                                </>
                              </div>
                              <div className="noti-time">
                                {dayjs(data.created_at).format(
                                  "DD MMM YYYY hh:mma"
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="title">Bid Successfull</div>
                              <div className="desc text-secondary">
                                <>
                                  Your{" "}
                                  <b>
                                    {data.celebrity_name}
                                    &apos;s {data.nft_name}
                                  </b>{" "}
                                  was sold for{" "}
                                  <b>
                                    {currencyFormat(
                                      Math.round(data.amount),
                                      "USD"
                                    )}
                                  </b>{" "}
                                  to <b>{data.buyer_name}</b>
                                </>
                              </div>
                              <div className="noti-time">
                                {dayjs(data.created_at).format(
                                  "DD MMM YYYY hh:mma"
                                )}
                              </div>
                            </>
                          )}
                        </>
                      );
                    } else if (data.reason === "bid_received") {
                      return (
                        <>
                          <div className="title">Bid Received</div>
                          <div className="desc text-secondary">
                            <>
                              You received{" "}
                              <b>
                                {" "}
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                              bid for{" "}
                              <b>
                                {data.celebrity_name}
                                &apos;s {data.nft_name}
                              </b>{" "}
                              from <b>{data.buyer_name}</b>
                            </>
                          </div>
                          <div className="noti-time">
                            {dayjs(data.created_at).format(
                              "DD MMM YYYY hh:mma"
                            )}
                          </div>
                        </>
                      );
                    }
                  })()}
                </>
              );
            } else if (data.activity_type === "buy") {
              return (
                <>
                  {data.payment_type === "debit" ? (
                    <>
                      <div className="title">You Bought</div>
                      <div className="desc text-secondary">
                        <>
                          You bought{" "}
                          <b>
                            {data.celebrity_name}
                            &apos;s NFT{" "}
                          </b>
                          from <b>{data.seller_name}</b> for{" "}
                          <b> {currencyFormat(data?.amount, "USD")}</b>
                        </>
                      </div>
                      <div className="noti-time">
                        {dayjs(data.created_at).format("DD MMM YYYY hh:mma")}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="title">You Sold</div>
                      <div className="desc text-secondary">
                        <>
                          You sold <b>{data.celebrity_name}&apos;s NFT</b> to{" "}
                          <b>{data.buyer_name}</b> for{" "}
                          <b>
                            {" "}
                            {currencyFormat(roundDown(data.amount, 2), "USD")}
                          </b>
                        </>
                      </div>
                      <div className="noti-time">
                        {dayjs(data.created_at).format("DD MMM YYYY hh:mma")}
                      </div>
                    </>
                  )}
                </>
              );
            } else if (data.activity_type === "withdraw") {
              return (
                <>
                  <div className="title">Withdraw</div>
                  <div className="desc text-secondary">
                    <>
                      {(() => {
                        if (data.reason === "withdraw_requested") {
                          return (
                            <>
                              {" "}
                              You <b>requested a withdraw</b> of{" "}
                              <b>
                                {currencyFormat(
                                  roundDown(data.amount, 2),
                                  "USD"
                                )}
                              </b>{" "}
                            </>
                          );
                        } else if (data.reason === "withdraw_cancelled") {
                          return (
                            <>
                              You <b>cancelled a withdraw request</b> of{" "}
                              <b>
                                {currencyFormat(
                                  roundDown(data.amount, 2),
                                  "USD"
                                )}
                              </b>
                            </>
                          );
                        } else if (data.reason === "withdraw_success") {
                          return (
                            <>
                              You <b>withdraw request</b> of{" "}
                              <b>
                                {currencyFormat(
                                  roundDown(data.amount, 2),
                                  "USD"
                                )}
                              </b>{" "}
                              was <b>successful</b>
                            </>
                          );
                        }
                      })()}
                    </>
                  </div>
                  <div className="noti-time">
                    {dayjs(data.created_at).format("DD MMM YYYY hh:mma")}
                  </div>
                </>
              );
            } else if (data.activity_type === "ownership_credit") {
              return (
                <>
                  <div className="title">Rental Earned</div>
                  <div className="desc text-secondary">
                    You have earned 2400 JT Points as rent from MCL Mega Play
                  </div>
                  <div className="noti-time">
                    {dayjs(data.created_at).format("DD MMM YYYY hh:mma")}
                  </div>
                </>
              );
            }
          })()} */}
        </div>
      </div>
    );
  };

  const lootStatus = [
    "YET TO START",
    "PRE BOOK NOW",
    "BUY",
    "DROP STARTS IN",
    "DROP YET TO ANNOUNACE",
    "DROP YET TO START",
    "ASSIGNING NFTS",
  ];

  return (
    <>
      {visibleTime && (
        <>
          <AppHelmet
            title={props?.title}
            image={props?.image}
            description={props?.description}
            width={props?.width}
            height={props?.height}
            canonical={props?.canonical}
            hideCanonical={props?.hideCanonical}
            recentSoldContent={props?.recentSoldContent}
          />
          {closed && (
            <>
              <div className={style["top-header-mcl"]}>
                <div className={style["top-header-menu"]}>
                  <div className={style["left-menu"]}>
                    <div className={style["top-header-content"]}>
                      <p>
                        {" "}
                        <FaInfoCircle />
                        For a limited time, we have slashed our royalty fee to
                        0% and service fee to almost ZERO!
                      </p>
                    </div>
                  </div>
                  {
                    <>
                      <div
                        className={style["right-menu"]}
                        onClick={handleClose}
                      >
                        <IoMdClose className={style["close-btn"]} />
                      </div>
                    </>
                  }
                </div>
              </div>
            </>
          )}
          <Navbar
            bg="dark"
            expand="md"
            variant="dark"
            sticky="top"
            className={`${
              bgImage
                ? `${style["bgImageHeader"]}`
                : scrollPosition > 60
                ? `${style["scroll_position"]}`
                : `${style["transparent"]}`
            }`}
          >
            <Container fluid>
              <Navbar.Brand
                onClick={() => {
                  window.open(process.env.NEXT_PUBLIC_WEBSITE_URL, "_self");
                  invokeTrackEvent(EVENT_NAMES?.TOP_MENU_ICON_CLICKED, {
                    name: "logo",
                  });
                }}
                role="button"
                className={style["head-title"]}
              >
                <Image
                  unoptimized={true}
                  height={30}
                  width={30}
                  src={images.jumpTradeLogo}
                  alt="jumpTradeLogo"
                  className={style["logoImage"]}
                  priority={true}
                />
                {/* <div
              className="sub-head-title header-powereby "
              role="button"
              onClick={() =>
                window.open(process.env.NEXT_PUBLIC_GUARDIAN_URL, "_self")
              }
            >
              Powered by GuardianLink
            </div> */}
              </Navbar.Brand>
              {!hideOptions && (
                <>
                  <Nav className="d-flex me-0 ms-auto">
                    {/* <Nav.Link
                  id="drop_outer"
                  // onClick={() => router.push("/nft-marketplace").then(()=>router.reload())}
                  href="/nft-marketplace"
                >
                  Explore
                </Nav.Link> */}
                    {/* <Nav.Link
                  id="drop_outer"
                  role="button"
                  className={"pre-btn "}
                  onClick={() => router.push(crypto_bat_nft_path)}
                  // href="/drop/bat-nfts"
                >
                  Crypto Bat NFTs Drop <span className="new-badge">new</span>
                </Nav.Link> */}

                    <Dropdown
                      autoClose={["inside", "outside"]}
                      className="me-0"
                    >
                      <Dropdown.Toggle
                        align="start"
                        drop="start"
                        as={DropToggle}
                      ></Dropdown.Toggle>

                      <Dropdown.Menu align="end">
                        {/* <Dropdown.Item
                          as="button"
                          className="pre-btn"
                          onClick={() => {
                            router.push(mcl_season_pass);
                          }}
                        >
                          <span className="blink_contest">
                            MCL Season Pass
                            <sup className={style["drop-sup"]}>new</sup>
                          </span>
                        </Dropdown.Item> */}
                        <Dropdown.Item
                          as="button"
                          className="pre-btn"
                          onClick={() => {
                            window.open(
                              `${process.env.NEXT_PUBLIC_BALL_NFT_URL}`,
                              "_blank"
                            );
                          }}
                        >
                          {/* <span className="blink_contest">
                            {" "}
                            MCL BALL NFTs{" "}
                            <sup className={style["drop-sup"]}>new</sup>
                          </span> */}

                          <span
                          // className={
                          //   // lootStatus.includes(isBallNFTLive) &&
                          //   "blink_contest"
                          // }
                          >
                            MCL BALL NFTs
                            {/* {lootStatus.includes(isBallNFTLive) && ( */}
                            {/* <sup className={style["drop-sup"]}>
                              {isBallNFTLive === LOOT_STATUS?.PRE_BOOK ||
                              isBallNFTLive === LOOT_STATUS?.DROP
                                ? "live"
                                : "new"}
                            </sup> */}
                            {/* )} */}
                          </span>
                        </Dropdown.Item>
                        <Dropdown.Item
                          as="button"
                          className="pre-btn"
                          onClick={() => {
                            router.push(mega_pass_path);
                          }}
                        >
                          MCL Mega Pass
                          {/* <span className="blink_contest">
                            MCL Mega Pass
                            <sup className={style["drop-sup"]}>new</sup>
                          </span> */}
                        </Dropdown.Item>
                        {/* isMCLMegaPassLive */}

                        <Dropdown.Item
                          as="button"
                          className="pre-btn"
                          onClick={() => {
                            window.open(
                              `${process.env.NEXT_PUBLIC_HURLEY_URL}`
                            );
                          }}
                        >
                          HURLEY NFTs
                        </Dropdown.Item>
                        <Dropdown.Item
                          as="button"
                          className="pre-btn"
                          onClick={() => {
                            router.push(mcl_founder_pass);
                          }}
                        >
                          MCL Founder Pass
                        </Dropdown.Item>
                        <Dropdown.Item
                          as="button"
                          className="pre-btn"
                          onClick={() => {
                            router.push(fusor_path);
                          }}
                        >
                          MCL Fusor NFTs
                        </Dropdown.Item>

                        <Dropdown.Item
                          as="button"
                          className="pre-btn"
                          onClick={() => {
                            window?.open(
                              `${process.env.NEXT_PUBLIC_RADDX_URL}`,
                              "_blank"
                            );
                            invokeTrackEvent(
                              EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                              {
                                name: "Raddx",
                              }
                            );
                          }}
                        >
                          RADDX Metaverse NFTs
                        </Dropdown.Item>

                        {/* <Dropdown.Item
                      as="button"
                      className="pre-btn"
                      onClick={() => {
                        router.push(mcl_play_pass_path);
                        invokeTrackEvent(EVENT_NAMES?.TOP_MENU_ICON_CLICKED, {
                          name: "MCL Play Pass",
                        });
                      }}
                    >
                      MCL Play Pass
                      {isPlayPassLive !== LOOT_STATUS?.SOLD_OUT &&
                        isPlayPassLive !== LOOT_STATUS?.DROP_ENDED && (
                          <sup className={style["drop-sup"]}>
                            {isPlayPassLive === LOOT_STATUS?.DROP
                              ? "Live"
                              : "New"}
                          </sup>
                        )}
                    </Dropdown.Item> */}
                        <Dropdown.Item
                          as="button"
                          className="pre-btn"
                          onClick={() => {
                            router.push(shots_path);
                            invokeTrackEvent(
                              EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                              {
                                name: "MCL Signature Shots",
                              }
                            );
                          }}
                        >
                          MCL Signature Shots
                          {/* <sup className={style["drop-sup"]}>New</sup> */}
                          {/* {isShotsDropLive !== LOOT_STATUS?.SOLD_OUT &&
                        isShotsDropLive !== LOOT_STATUS?.DROP_ENDED && (
                          <sup className={style["drop-sup"]}>
                            {isShotsDropLive === LOOT_STATUS?.DROP
                              ? "Live"
                              : "New"}
                          </sup>
                        )} */}
                        </Dropdown.Item>

                        <Dropdown.Item
                          as="button"
                          className="pre-btn"
                          onClick={() => {
                            router.push(crypto_bat_nft_path);
                            invokeTrackEvent(
                              EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                              {
                                name: "Crypto Bat NFTs",
                              }
                            );
                          }}
                        >
                          Crypto Bat NFTs
                        </Dropdown.Item>

                        {/* <Dropdown.Item
                      as="button"
                      className="pre-btn"
                      onClick={() => router.push(shots_path)}
                    >
                      MCL Action Shots
                    </Dropdown.Item> */}

                        {/* <Dropdown.Item
                      as="button"
                      className="pre-btn"
                      onClick={() => router.push(mcl_play_pass_path)}
                    >
                      MCL Play Pass
                    </Dropdown.Item> */}
                      </Dropdown.Menu>
                    </Dropdown>
                    {/* <Nav.Link
                  id="drop_outer"
                  role="button"
                  // className={"blink_contest"}
                  // onClick={() => router.push(referral_path)}
                  // href=referral_path
                  onClick={() => router.push(referral_path)}
                >
                  Refer & Earn
                </Nav.Link> */}
                    {/* {ENABLE_CREATOR_APPLICATION && (
                  <Nav.Link
                    id="drop_outer"
                    role="button"
                    className={"pre-btn"}
                    onClick={() => {
                      router.push(creator_path);
                      invokeTrackEvent(EVENT_NAMES?.TOP_MENU_ICON_CLICKED, {
                        name: "List your NFTs",
                      });
                    }}
                  >
                    List your NFTs
                    <sup className={style["drop-sup"]}>New</sup>
                  </Nav.Link>
                )} */}
                    <Nav.Link
                      id="drop_outer"
                      role="button"
                      className={"pre-btn"}
                      onClick={() => {
                        window.open(
                          `${process.env.NEXT_PUBLIC_CALL_IT_URL}/events`
                        );
                      }}
                    >
                      <span className={style["beta-container"]}>
                        {/* <span className={style["beta-tag"]}>Beta</span> */}
                        The Callit
                        <sup className={style["drop-sup"]}>New</sup>
                      </span>
                    </Nav.Link>
                    <Nav.Link
                      id="drop_outer"
                      role="button"
                      // className={"pre-btn"}
                      onClick={() => {
                        router.push(rental_path);
                        invokeTrackEvent(EVENT_NAMES?.TOP_MENU_ICON_CLICKED, {
                          name: "Rental",
                        });
                      }}
                    >
                      <span className={style["beta-container"]}>
                        <span className={style["beta-tag"]}>Beta</span>
                        Rental
                      </span>
                    </Nav.Link>
                    {!user?.marketLive ? (
                      <Nav.Link
                        className={`${style["hide_large"]}`}
                        id="drop_outer"
                        role="button"
                        onClick={() => {
                          router.push("/tournaments");
                          invokeTrackEvent(EVENT_NAMES?.TOP_MENU_ICON_CLICKED, {
                            name: "MCL Game",
                          });
                        }}
                        // href="/tournaments"
                      >
                        <span className={style["beta-container"]}>
                          {/* <span className={style["beta-tag"]}>Beta</span> */}
                          Tournaments
                        </span>
                      </Nav.Link>
                    ) : (
                      <Nav.Link
                        id="drop_outer"
                        className={`${style["hide_large"]}`}
                        role="button"
                        onClick={() => {
                          router.push("/tournaments");
                          invokeTrackEvent(EVENT_NAMES?.TOP_MENU_ICON_CLICKED, {
                            name: "MCL Game",
                          });
                        }}
                        // href="/tournaments"
                      >
                        <span className={style["beta-container"]}>
                          {/* <span className={style["beta-tag"]}>Beta</span> */}
                          Tournaments
                        </span>
                      </Nav.Link>
                    )}
                    {/* <Dropdown autoClose={["inside", "outside"]} className="me-0">
                  <Dropdown.Toggle
                    align="start"
                    drop="start"
                    as={SpinAndWinToggle}
                  ></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      as="button"
                      onClick={() => router.push(referral_path)}
                    >
                      <span className={style["beta-container"]}>
                        Refer & Earn
                      </span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
                    <Nav.Link
                      id="drop_outer"
                      role="button"
                      // className={"pre-btn"}
                      onClick={() => router.push(referral_path)}
                      className={`${style["hide_large"]}`}
                    >
                      <span className={style["beta-container"]}>
                        Refer & Earn
                      </span>
                    </Nav.Link>
                    <Nav.Link
                      id="drop_outer"
                      role="button"
                      // onClick={() => router.push("/").then(() => router.reload())}
                      // href="/nft-marketplace"
                      onClick={() => {
                        router.push("/nft-marketplace");
                        invokeTrackEvent(EVENT_NAMES?.TOP_MENU_ICON_CLICKED, {
                          name: "Explore Market",
                        });
                      }}
                      className="theme-btn"
                    >
                      {/* <span className={style["beta-container"]}>
                    <span className={style["beta-tag"]}>Beta</span>
                    </span> */}
                      Explore Market
                    </Nav.Link>

                    {!hideSign && (
                      <>
                        {user.login ? (
                          <>
                            <Nav.Link
                              href="#home"
                              className={`${style["hide_large"]} help_ic`}
                            >
                              <BiHelpCircle
                                size={25}
                                role="button"
                                onClick={() => {
                                  window.open(
                                    process.env.NEXT_PUBLIC_HELP_URL,
                                    "_blank"
                                  );
                                  invokeTrackEvent(
                                    EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                    {
                                      name: "Help",
                                    }
                                  );
                                }}
                              />
                            </Nav.Link>
                            <Dropdown
                              autoClose={["inside", "outside"]}
                              onToggle={(e) => {
                                if (e) {
                                  readNotification();
                                  setNotiRead(false);
                                }
                              }}
                            >
                              <Dropdown.Toggle
                                align="start"
                                drop="start"
                                as={NotificationToggleComponent}
                              ></Dropdown.Toggle>

                              <Dropdown.Menu
                                align="end"
                                className="noti-container"
                              >
                                <div className="noti-header">
                                  <BiBell size={25} color={"white"} />{" "}
                                  Notifications
                                </div>
                                <div className="noti-content">
                                  {notification?.notifications.length > 0 ? (
                                    <>
                                      {notification?.notifications.map(
                                        (o, i) => (
                                          <Dropdown.Item key={`noti-item${i}`}>
                                            <NotiCard
                                              key={`noti${i}`}
                                              data={o}
                                            />
                                          </Dropdown.Item>
                                        )
                                      )}

                                      {notiLoading && (
                                        <div className="noti-load-more text-secondary">
                                          Loading...
                                        </div>
                                      )}

                                      {notification?.next_page ? (
                                        <div
                                          className="noti-load-more text-secondary"
                                          role="button"
                                          onClick={() => {
                                            setNPage(npage + 1);
                                            handleGetNotification(npage + 1);
                                          }}
                                        >
                                          See More
                                        </div>
                                      ) : (
                                        <div className="noti-load-more text-secondary">
                                          You have reached the end
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <div className="noti-load-more text-secondary no-notify">
                                      No notifications found
                                    </div>
                                  )}
                                </div>
                              </Dropdown.Menu>
                            </Dropdown>
                            {slug && (
                              <Nav.Link
                                href=""
                                className="cart_ic position-relative"
                                onClick={() => {
                                  if (userCart?.checkout && !checkoutDevice) {
                                    toast.error(
                                      "Order is being processed. Can't access cart!",
                                      {
                                        autoClose: 2000,
                                      }
                                    );
                                  } else {
                                    setCartPop(!cartPop);
                                  }
                                }}
                              >
                                <Image
                                  unoptimized={true}
                                  width={20}
                                  src={images.cartIconSVG}
                                  height={20}
                                  alt="CartIcon"
                                />
                                {parseInt(userCart?.total_count) > 0 && (
                                  <span className="badge cart-count rounded-pill bg-danger position-absolute">
                                    {userCart?.total_count}
                                  </span>
                                )}
                              </Nav.Link>
                            )}
                            <Dropdown
                              autoClose="outside"
                              className="mx-0 header-dropdown"
                            >
                              <Dropdown.Toggle
                                align="start"
                                drop="start"
                                as={UserToggleComponent}
                              ></Dropdown.Toggle>

                              <Dropdown.Menu
                                align="end"
                                className="myprofille-drop-down"
                              >
                                <UserComponent user={user.data.user} />
                                <Dropdown.Item
                                  id="drop_inner"
                                  href="/"
                                  target="_self"
                                >
                                  Drops
                                </Dropdown.Item>
                                {innerWidth > 3000 ? (
                                  <>
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/profile`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "My Profile",
                                          }
                                        );
                                      }}
                                    >
                                      My Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/mynft`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "My NFTs",
                                          }
                                        );
                                      }}
                                    >
                                      My NFTs
                                    </Dropdown.Item>

                                    {showTransferNftMenu && (
                                      <Dropdown.Item
                                        as="button"
                                        onClick={() =>
                                          window.open(
                                            `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/transfer-nft`,
                                            "_self"
                                          )
                                        }
                                      >
                                        Transfer NFT
                                      </Dropdown.Item>
                                    )}
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/rented-nft`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "My Borrowed NFTs",
                                          }
                                        );
                                      }}
                                    >
                                      My Borrowed NFTs
                                      <i
                                        className={`${style["newbadge"]} ${style["blink_me"]}`}
                                      >
                                        new
                                      </i>
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/my-cards`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "My Cards",
                                          }
                                        );
                                      }}
                                    >
                                      My Cards
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/referral`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "Referral",
                                          }
                                        );
                                      }}
                                    >
                                      Referral
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/wallet`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "GuardianLink Wallet",
                                          }
                                        );
                                      }}
                                    >
                                      GuardianLink Wallet
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/my-orders`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "My Orders",
                                          }
                                        );
                                      }}
                                    >
                                      My Orders
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/myinvoice`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "My Invoices",
                                          }
                                        );
                                      }}
                                    >
                                      My Invoices
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/bid-activity`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "My Bids",
                                          }
                                        );
                                      }}
                                    >
                                      My Bids
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/pre-orders`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "Pre-Book",
                                          }
                                        );
                                      }}
                                    >
                                      Pre-Book
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/game-pass`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "Game Pass",
                                          }
                                        );
                                      }}
                                    >
                                      Game Pass
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/limit-orders`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "Limit Orders",
                                          }
                                        );
                                      }}
                                    >
                                      Limit Orders
                                      {/* <i
                                className={`${style["newbadge"]} ${style["blink_me"]}`}
                              >
                                new
                              </i> */}
                                    </Dropdown.Item>
                                    {/* <Dropdown.Item
                              as="button"
                              onClick={() =>
                                window.open(
                                  `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/user-activity`,
                                  "_self"
                                )
                              }
                            >
                              My Activity
                            </Dropdown.Item>{" "} */}
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/spin-wheel`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "Spin The Wheel",
                                          }
                                        );
                                      }}
                                    >
                                      Spin The Wheel
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/settings`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "Security Settings",
                                          }
                                        );
                                      }}
                                    >
                                      Security Settings
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/whitelist`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "Whitelist Payment",
                                          }
                                        );
                                      }}
                                    >
                                      Whitelist Payment
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          process.env.NEXT_PUBLIC_HELP_URL,
                                          "_blank"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "help center",
                                          }
                                        );
                                      }}
                                    >
                                      Help Center
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        dispatch(user_logout_thunk());
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "Sign out",
                                          }
                                        );
                                        webengage.user.logout();
                                      }}
                                    >
                                      Sign Out
                                    </Dropdown.Item>
                                  </>
                                ) : (
                                  <>
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/profile`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "My Profile",
                                          }
                                        );
                                      }}
                                    >
                                      My Profile
                                    </Dropdown.Item>

                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/wallet`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "GuardianLink Wallet",
                                          }
                                        );
                                      }}
                                    >
                                      GuardianLink Wallet
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/my-orders`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "My Orders",
                                          }
                                        );
                                      }}
                                    >
                                      My Orders
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/user-activity`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "Activity",
                                          }
                                        );
                                      }}
                                    >
                                      Activity
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/spin-wheel`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "Spin The Wheel",
                                          }
                                        );
                                      }}
                                    >
                                      Spin The Wheel
                                    </Dropdown.Item>

                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        window.open(
                                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/settings`,
                                          "_self"
                                        );
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "Security Settings",
                                          }
                                        );
                                      }}
                                    >
                                      Security Settings
                                    </Dropdown.Item>

                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => {
                                        dispatch(user_logout_thunk());
                                        invokeTrackEvent(
                                          EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                                          {
                                            name: "Sign out",
                                          }
                                        );
                                        // webengage.user.logout();
                                      }}
                                    >
                                      Sign Out
                                    </Dropdown.Item>
                                  </>
                                )}
                              </Dropdown.Menu>
                            </Dropdown>
                          </>
                        ) : (
                          <>
                            <>
                              <Nav.Link
                                className={`theme-btn rounded-bordered signin-btn`}
                                href={`${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/signin?redirect=${windowUtils.href}`}
                                target="_self"
                              >
                                {/* <span> {t("Sign in")}</span> */}
                                <span>Sign In</span>
                              </Nav.Link>
                              <Nav.Link
                                className={`theme-btn rounded-bordered signup-btn`}
                                href={`${
                                  process.env.NEXT_PUBLIC_ACCOUNTS_URL
                                }/signup${fsz ? `?fsz=${fsz}` : ""}`}
                                target="_self"
                              >
                                {/* <span> {t("Sign Up")}</span> */}

                                <span>Sign Up</span>
                              </Nav.Link>
                            </>
                          </>
                        )}
                      </>
                    )}
                    <Nav.Link
                      // className="discord_ic"
                      className={`theme-btn rounded-bordered icon-btn header-hide-mobile`}
                      href={`https://discord.gg/guardianlink`}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      <FaDiscord size={25} />
                    </Nav.Link>
                  </Nav>
                  <Dropdown autoClose={["inside", "outside"]}>
                    <Dropdown.Toggle
                      align="start"
                      drop="start"
                      as={HeaderMobileMenuIcon}
                    ></Dropdown.Toggle>

                    <Dropdown.Menu align="end" className="side-menu">
                      <Dropdown.Item
                        drop="start"
                        as={HeaderMobileMenuCloseIcon}
                      ></Dropdown.Item>

                      {/* <Dropdown.Item
                    // onClick={() => router.push("/nft-marketplace")}
                    href="/nft-marketplace"
                  >
                    Explore
                  </Dropdown.Item> */}
                      {/* <Dropdown.Item
                    onClick={() => router.push("/nft-marketplace/contest/")}
                    className={style["mob_blink_contest"]}
                  >
                    Contest<sup className={style["drop-sup"]}>New</sup>
                  </Dropdown.Item> */}
                      <Dropdown.Item
                        onClick={() =>
                          window.open(`${process.env.NEXT_PUBLIC_CALL_IT_URL}`)
                        }
                        className={`${style["show_mobile"]}`}
                      >
                        <span className={"blink_contest"}>
                          The Callit<sup className={style["drop-sup"]}>New</sup>
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          window.open("https://pro.jump.trade/", "_blank")
                        }
                      >
                        <span className={"blink_contest"}>
                          d&apos;Marketplace
                          <sup className={style["drop-sup"]}>New</sup>
                        </span>
                      </Dropdown.Item>
                      {/* <Dropdown.Item
                        className={`${style["show_mobile"]}`}
                        onClick={() => router.push(mcl_season_pass)}
                      >
                        <span className="blink_contest">
                          MCL Season Pass
                          <sup className={style["drop-sup"]}>new</sup>
                        </span>
                      </Dropdown.Item> */}

                      <Dropdown.Item
                        className={`${style["show_mobile"]}`}
                        onClick={() =>
                          window.open(
                            `${process.env.NEXT_PUBLIC_BALL_NFT_URL}`,
                            "_blank"
                          )
                        }
                      >
                        <span
                        // className="blink_contest"
                        >
                          MCL BALL NFTs
                          {/* <sup className={style["drop-sup"]}>
                            {isBallNFTLive === LOOT_STATUS?.PRE_BOOK ||
                            isBallNFTLive === LOOT_STATUS?.DROP
                              ? "live"
                              : "new"}
                          </sup> */}
                        </span>

                        {/* <span
                          className={
                            lootStatus.includes(isBallNFTLive) &&
                            "blink_contest"
                          }
                        >
                          MCL BALL NFTs
                          {lootStatus.includes(isBallNFTLive) && (
                            <sup className={style["drop-sup"]}>
                              {isBallNFTLive === LOOT_STATUS?.PRE_BOOK ||
                              isBallNFTLive === LOOT_STATUS?.DROP
                                ? "live"
                                : "new"}
                            </sup>
                          )}
                        </span> */}
                      </Dropdown.Item>
                      <Dropdown.Item
                        className={`${style["show_mobile"]}`}
                        onClick={() => router.push(mega_pass_path)}
                      >
                        MCL Mega Pass
                        {/* <span className="blink_contest">
                          MCL Mega Pass
                          <sup className={style["drop-sup"]}>new</sup>
                        </span> */}
                      </Dropdown.Item>

                      <Dropdown.Item
                        className={`${style["show_mobile"]}`}
                        onClick={() =>
                          window.open(`${process.env.NEXT_PUBLIC_HURLEY_URL}`)
                        }
                      >
                        HURLEY NFTs
                      </Dropdown.Item>
                      <Dropdown.Item
                        className={`${style["show_mobile"]}`}
                        onClick={() => router.push(mcl_founder_pass)}
                      >
                        MCL Founder Pass
                      </Dropdown.Item>
                      <Dropdown.Item
                        className={`${style["show_mobile"]}`}
                        onClick={() => router.push(fusor_path)}
                      >
                        MCL Fusor NFTs
                      </Dropdown.Item>

                      <Dropdown.Item
                        className={`${style["show_mobile"]}`}
                        //onClick={() => router.push(raddx_car_nft_path)}
                        onClick={() => {
                          window?.open(
                            `${process.env.NEXT_PUBLIC_RADDX_URL}`,
                            "_blank"
                          );
                          invokeTrackEvent(EVENT_NAMES?.TOP_MENU_ICON_CLICKED, {
                            name: "Raddx",
                          });
                        }}
                      >
                        RADDX Metaverse NFTs Drop{" "}
                      </Dropdown.Item>
                      {/* <Dropdown.Item
                    className={`${style["show_mobile"]}`}
                    onClick={() => {
                      router.push(mcl_play_pass_path);
                      invokeTrackEvent(EVENT_NAMES?.TOP_MENU_ICON_CLICKED, {
                        name: "MCL Play Pass Drop",
                      });
                    }}
                  >
                    <span
                    className={
                      isPlayPassLive !== LOOT_STATUS?.DROP_ENDED &&
                      isPlayPassLive !== LOOT_STATUS?.SOLD_OUT
                        ? "blink_contest"
                        : ""
                    }
                    >
                      MCL Play Pass Drop
                      {isPlayPassLive !== LOOT_STATUS?.DROP_ENDED &&
                        isPlayPassLive !== LOOT_STATUS?.SOLD_OUT && (
                          <sup className={style["drop-sup"]}>
                            {isPlayPassLive === LOOT_STATUS?.DROP
                              ? "Live"
                              : "new"}
                          </sup>
                        )}
                    </span>
                  </Dropdown.Item> */}
                      <Dropdown.Item
                        className={`${style["show_mobile"]}`}
                        onClick={() => {
                          router.push(shots_path);
                          invokeTrackEvent(EVENT_NAMES?.TOP_MENU_ICON_CLICKED, {
                            name: "MCL Signature Shots Drop",
                          });
                        }}
                      >
                        <span>
                          MCL Signature Shots Drop
                          {/* <sup className={style["drop-sup"]}>new</sup> */}
                          {/* {isShotsDropLive !== LOOT_STATUS?.DROP_ENDED &&
                        isShotsDropLive !== LOOT_STATUS?.SOLD_OUT && (
                          <sup className={style["drop-sup"]}>
                            {isShotsDropLive === LOOT_STATUS?.DROP
                              ? "Live"
                              : "new"}
                          </sup>
                        )} */}
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item
                        className={`${style["show_mobile"]}`}
                        onClick={() => {
                          router.push(crypto_bat_nft_path);
                          invokeTrackEvent(EVENT_NAMES?.TOP_MENU_ICON_CLICKED, {
                            name: "Crypto Bat NFTs Drop",
                          });
                        }}
                      >
                        <span>Crypto Bat NFTs Drop</span>
                      </Dropdown.Item>

                      {/* <Dropdown.Item onClick={() => router.push(shots_path)}>
                    <span>MCL Action Shots Drop</span>
                  </Dropdown.Item> */}

                      <Dropdown.Item
                        className={`${style["show_mobile"]}`}
                        onClick={() => {
                          router.push(rental_path);
                          invokeTrackEvent(EVENT_NAMES?.TOP_MENU_ICON_CLICKED, {
                            name: "Rental",
                          });
                        }}
                      >
                        <span className={style["beta-container"]}>
                          <span className={style["beta-tag"]}>Beta</span> Rental{" "}
                        </span>
                      </Dropdown.Item>

                      <Dropdown.Item
                        onClick={() => {
                          router.push("/tournaments");
                          invokeTrackEvent(EVENT_NAMES?.TOP_MENU_ICON_CLICKED, {
                            name: "Mcl Game",
                          });
                        }}
                      >
                        <span className="blink_contest">
                          {" "}
                          Tournaments{" "}
                          <sup className={style["drop-sup"]}>New</sup>{" "}
                        </span>
                      </Dropdown.Item>
                      {ENABLE_CREATOR_APPLICATION && (
                        <Dropdown.Item
                          onClick={() => {
                            router.push(creator_path);
                            invokeTrackEvent(
                              EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                              {
                                name: "List your NFTs",
                              }
                            );
                          }}
                        >
                          <span className={style["beta-container"]}>
                            List your NFTs{" "}
                          </span>
                        </Dropdown.Item>
                      )}

                      {/* <Dropdown.Item href={contest_path}>
                    <span className={"blink_contest"}>Spin &amp; Win</span>
                  </Dropdown.Item> */}
                      {/* <Dropdown.Item href={mcl_play_pass_path}>
                    <span className={"blink_contest"}>
                      MCL Play Pass <span className="new-badge">new</span>
                    </span>
                  </Dropdown.Item> */}

                      <Dropdown.Item
                        onClick={() => {
                          router.push(referral_path);
                          invokeTrackEvent(EVENT_NAMES?.TOP_MENU_ICON_CLICKED, {
                            name: "Referral",
                          });
                        }}
                      >
                        <span className={style["beta-container"]}>
                          Refer & Earn
                          {/* <span className="new-badge-refer">new</span> */}
                        </span>{" "}
                      </Dropdown.Item>

                      {/* <Dropdown autoClose={["inside", "outside"]} className="me-0">
                    <Dropdown.Toggle
                      align="start"
                      drop="start"
                      as={DropToggle}
                    ></Dropdown.Toggle>

                    <Dropdown.Menu align="end">
                      <Dropdown.Item
                        as="button"
                        onClick={() =>
                          window.open(
                            `${process.env.NEXT_PUBLIC_MCL_URL}`,
                            "_blank"
                          )
                        }
                      >
                        Meta Cricket League NFTs
                      </Dropdown.Item>

                    </Dropdown.Menu>
                  </Dropdown> */}

                      <Dropdown.Item
                        onClick={() => {
                          router.push("/nft-marketplace");
                          invokeTrackEvent(EVENT_NAMES?.TOP_MENU_ICON_CLICKED, {
                            name: "Explore Market",
                          });
                        }}
                        className={`${style["show_mobile"]} btn-link`}
                      >
                        {/* <span className={style["beta-container"]}>
                      <span className={style["beta-tag"]}>Beta</span>

                    </span> */}
                        <span className="theme-btn">Explore Market</span>
                      </Dropdown.Item>
                      {user.login && (
                        <Dropdown.Item
                          // className={`${style["show_mobile"]}`}
                          onClick={() => {
                            window.open(
                              process.env.NEXT_PUBLIC_HELP_URL,
                              "_blank"
                            );
                            invokeTrackEvent(
                              EVENT_NAMES?.TOP_MENU_ICON_CLICKED,
                              {
                                name: "Help",
                              }
                            );
                          }}
                        >
                          Need Help ?
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
            </Container>
          </Navbar>

          <Cart
            cartPop={cartPop}
            setCartPop={setCartPop}
            setCheckoutDevice={setCheckoutDevice}
          />
        </>
      )}
    </>
  );
};

const UserComponent = ({ sref, user, onClick = () => {} }) => (
  <div
    // className={`header-user-details ${user?.og_user === true ? "og-user" : ""}`}
    className={`header-user-details`}
    onClick={onClick}
    ref={sref}
  >
    <div className="user-image-block">
      <Image
        unoptimized={true}
        height={60}
        width={60}
        className="user-image"
        src={user?.avatar_url ? user?.avatar_url : images?.userJPG}
        alt="user-icon"
      />
    </div>
    <div className="user-name">
      {currencyFormat(roundDown(user?.balance, user?.currency_name))}
    </div>
  </div>
);

const HeaderMobileMenuIcon = forwardRef(({ onClick }, ref) => {
  return (
    <div
      className={`${style["menu-icon"]} ${style["header-hide-mobile"]}`}
      ref={ref}
      role="button"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <CgMenuRight size={25} color={"#ec7c49"} />
    </div>
  );
});

HeaderMobileMenuIcon.displayName = "HeaderMobileMenuIcon";

const HeaderMobileMenuCloseIcon = forwardRef(({ onClick }, ref) => {
  return (
    <div
      className={style["close-icon"]}
      ref={ref}
      role="button"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <VscChromeClose size={25} color={"white"} />
    </div>
  );
});

HeaderMobileMenuCloseIcon.displayName = "HeaderMobileMenuCloseIcon";

export default Header;
