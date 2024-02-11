import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState, forwardRef } from "react";
import { useRouter } from "next/router";
import { Navbar, Nav, Dropdown, Container } from "react-bootstrap";
import { BiBell, BiHelpCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { FaDiscord } from "react-icons/fa";
import { CgMenuRight } from "react-icons/cg";
import { VscChromeClose } from "react-icons/vsc";
import { toast } from "react-toastify";

import useWindowUtils from "../../hooks/useWindowUtils";
import Cart from "../cart";
import useScrollPosition from "../../utils/scroll-position";
import AppHelmet from "../helmet";
import style from "./style.module.scss";
import images from "../../utils/images.json";
import { user_logout_thunk } from "../../redux/thunk/user_thunk";
import {
  accountDetail,
  cartCheckout,
  cartDetail,
} from "../../utils/actioncable-methods";
import { currencyFormat, roundDown } from "../../utils/common";
import { walletUpdate } from "../../redux/reducers/user_reducer";
import { getNotificationApi } from "../../utils/base-methods";
import { readNotificationApi } from "./../../utils/base-methods";
import {
  checkout_event_thunk,
  get_cart_list_thunk,
} from "../../redux/thunk/user_cart_thunk";
import raddxLogo from "../../images/raddx-nft/RADDX-logo.png";
const crypto_bat_nft_path = "/drop/crypto-bat-nfts";

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

  const { user, cart } = useSelector((state) => state);
  const router = useRouter();

  const [notiLoading, setNotiLoading] = useState(false);
  const [npage, setNPage] = useState(1);
  const [notification, setNotification] = useState();
  const [notiRead, setNotiRead] = useState(true);

  //const [ribbon, setRibbon] = useState(true);
  const [cartPop, setCartPop] = useState(false);
  const [checkoutDevice, setCheckoutDevice] = useState(false);

  const slug = user.data?.user ? user.data?.user?.slug : null;
  const userCart = cart?.data ? cart?.data : null;
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

  // useEffect(() => {
  //   const token = getCookies();
  //   if (token) dispatch(user_load_by_token_thunk(token));

  //   if (user.data?.user && !token) dispatch(user_logout_thunk());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        Drops
      </Nav.Link>
    );
  });

  DropToggle.displayName = "DropToggle";

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
        {(() => {
          if (data.activity_type === "deposit") {
            return (
              <Image
                unoptimized={true}
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
                <Image
                  unoptimized={true}
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
                <Image
                  unoptimized={true}
                  height={40}
                  width={40}
                  src={images.outbid}
                  alt="notification icon"
                  priority={true}
                />
              );
            } else if (data.reason === "bid_outdated") {
              return (
                <Image
                  unoptimized={true}
                  height={40}
                  width={40}
                  src={images.outbid}
                  alt="notification icon"
                  priority={true}
                />
              );
            } else if (data.reason === "bid_cancelled") {
              return (
                <Image
                  unoptimized={true}
                  height={40}
                  width={40}
                  src={images.outbid}
                  alt="notification icon"
                  priority={true}
                />
              );
            } else if (data.reason === "bid_success") {
              return (
                <Image
                  unoptimized={true}
                  height={40}
                  width={40}
                  src={images.bid}
                  alt="notification icon"
                  priority={true}
                />
              );
            } else if (data.reason === "bid_received") {
              return (
                <Image
                  unoptimized={true}
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
                <Image
                  unoptimized={true}
                  height={40}
                  width={40}
                  src={images.buy}
                  alt="notification icon"
                  priority={true}
                />
              );
            } else {
              return (
                <Image
                  unoptimized={true}
                  height={40}
                  width={40}
                  src={images.buy}
                  alt="notification icon"
                  priority={true}
                />
              );
            }
          } else if (data.activity_type === "withdraw") {
            if (data.reason === "withdraw_requested") {
              return (
                <Image
                  unoptimized={true}
                  height={40}
                  width={40}
                  src={images.withdrawMoney}
                  alt="notification icon"
                  priority={true}
                />
              );
            } else if (data.reason === "withdraw_cancelled") {
              return (
                <Image
                  unoptimized={true}
                  height={40}
                  width={40}
                  src={images.withdrawMoney}
                  alt="notification icon"
                  priority={true}
                />
              );
            } else if (data.reason === "withdraw_success") {
              return (
                <Image
                  unoptimized={true}
                  height={40}
                  width={40}
                  src={images.withdrawMoney}
                  alt="notification icon"
                  priority={true}
                />
              );
            }
          } else {
            return "";
          }
        })()}

        <div className={"noti-message-content"}>
          {(() => {
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
            }
          })()}
        </div>
      </div>
    );
  };

  return (
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
      <Navbar
        expand="md"
        variant="dark"
        sticky="top"
        className={`${style["raddx-header"]} raddx-header`}
      >
        <Container fluid>
          <Navbar.Brand
            onClick={() => {
              window.open(process.env.NEXT_PUBLIC_WEBSITE_URL, "_self");
            }}
            role="button"
            className={style["head-title"]}
          >
            <Image
              unoptimized={true}
              height={100}
              width={180}
              src={raddxLogo}
              alt="RaddxLogo"
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
                {/* {!user?.marketLive ? (
                  <Nav.Link
                    id="drop_outer"
                    role="button"
                    href="/mcl-game"
                  >
                    <span className={style["beta-container"]}>
                      <span className={style["beta-tag"]}>Beta</span>
                      MCL Game
                    </span>
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    id="drop_outer"
                    role="button"
                    href="/mcl-game"
                  >
                    <span className={style["beta-container"]}>
                      <span className={style["beta-tag"]}>Beta</span>
                      MCL Game
                    </span>
                  </Nav.Link>
                )} */}
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
                        window.open(process.env.NEXT_PUBLIC_MCL_URL)
                      }
                    >
                      Meta Cricket League NFTs
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}

                {/* <Nav.Link
                  id="drop_outer"
                  role="button"
                  // className={"blink_contest"}
                  // onClick={() => router.push("nft-marketplace/contest")}
                  href="/nft-marketplace/contest"
                >
                  Contest
                </Nav.Link> */}
                <Nav.Link
                  id="drop_outer"
                  role="button"
                  // onClick={() => router.push("/").then(() => router.reload())}
                  href="/nft-marketplace"
                  className="theme-btn"
                >
                  {/* <span className={style["beta-container"]}>
                    <span className={style["beta-tag"]}>Beta</span>
                    </span> */}
                  Explore Market
                </Nav.Link>

                {/* {!hideSign && (
                  <>
                    {user.login ? (
                      <>
                        <Nav.Link href="#home" className="help_ic">
                          <BiHelpCircle
                            size={25}
                            role="button"
                            onClick={() =>
                              window.open(
                                process.env.NEXT_PUBLIC_HELP_URL,
                                "_blank"
                              )
                            }
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

                          <Dropdown.Menu align="end" className="noti-container">
                            <div className="noti-header">
                              <BiBell size={25} color={"white"} /> Notifications
                            </div>
                            <div className="noti-content">
                              {notification?.notifications.length > 0 ? (
                                <>
                                  {notification?.notifications.map((o, i) => (
                                    <Dropdown.Item key={`noti-item${i}`}>
                                      <NotiCard key={`noti${i}`} data={o} />
                                    </Dropdown.Item>
                                  ))}

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
                            <Image unoptimized={true}
                              
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
                        <Dropdown autoClose="outside" className="mx-0">
                          <Dropdown.Toggle
                            align="start"
                            drop="start"
                            as={UserToggleComponent}
                          ></Dropdown.Toggle>

                          <Dropdown.Menu align="end">
                            <UserComponent user={user.data.user} />
                            <Dropdown.Item
                              id="drop_inner"
                              href="/"
                              target="_self"
                            >
                              Drops
                            </Dropdown.Item>
                            <Dropdown.Item
                              as="button"
                              onClick={() =>
                                window.open(
                                  `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/profile`,
                                  "_self"
                                )
                              }
                            >
                              My Profile
                            </Dropdown.Item>
                            <Dropdown.Item
                              as="button"
                              onClick={() =>
                                window.open(
                                  `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/mynft`,
                                  "_self"
                                )
                              }
                            >
                              My NFTs
                            </Dropdown.Item>
                            <Dropdown.Item
                              as="button"
                              onClick={() =>
                                window.open(
                                  `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/my-cards`,
                                  "_self"
                                )
                              }
                            >
                              My Cards
                            </Dropdown.Item>
                            <Dropdown.Item
                              as="button"
                              onClick={() =>
                                window.open(
                                  `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/wallet`,
                                  "_self"
                                )
                              }
                            >
                              My GuardianLink Wallet
                            </Dropdown.Item>
                            <Dropdown.Item
                              as="button"
                              onClick={() =>
                                window.open(
                                  `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/myinvoice`,
                                  "_self"
                                )
                              }
                            >
                              My Invoices
                            </Dropdown.Item>
                            <Dropdown.Item
                              as="button"
                              onClick={() =>
                                window.open(
                                  `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/my-orders`,
                                  "_self"
                                )
                              }
                            >
                              My Orders
                            </Dropdown.Item>
                            <Dropdown.Item
                              as="button"
                              onClick={() =>
                                window.open(
                                  `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/limit-orders`,
                                  "_self"
                                )
                              }
                            >
                              Limit Orders
                              
                            </Dropdown.Item>
                            <Dropdown.Item
                              as="button"
                              onClick={() =>
                                window.open(
                                  `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/pre-orders`,
                                  "_self"
                                )
                              }
                            >
                              Pre-Book
                            </Dropdown.Item>
                            <Dropdown.Item
                              as="button"
                              onClick={() =>
                                window.open(
                                  `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/bid-activity`,
                                  "_self"
                                )
                              }
                            >
                              My Bids
                            </Dropdown.Item>
                            <Dropdown.Item
                              as="button"
                              onClick={() =>
                                window.open(
                                  `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/user-activity`,
                                  "_self"
                                )
                              }
                            >
                              My Activity
                            </Dropdown.Item>{" "}
                            <Dropdown.Item
                              as="button"
                              onClick={() =>
                                window.open(
                                  `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/settings`,
                                  "_self"
                                )
                              }
                            >
                              Settings
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                              as="button"
                              onClick={() =>
                                window.open(
                                  process.env.NEXT_PUBLIC_HELP_URL,
                                  "_blank"
                                )
                              }
                            >
                              Help Center
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                              as="button"
                              onClick={() => dispatch(user_logout_thunk())}
                            >
                              Sign Out
                            </Dropdown.Item>
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
                            <span> {t("Sign in")}</span>
                          </Nav.Link>
                          <Nav.Link
                            className={`theme-btn rounded-bordered signup-btn`}
                            href={`${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/signup`}
                            target="_self"
                          >
                            <span>{t("Sign up")}</span>
                          </Nav.Link>
                        </>
                      </>
                    )}
                  </>
                )} */}
                {/* <Nav.Link
                  // className="discord_ic"
                  className={`theme-btn rounded-bordered icon-btn`}
                  href={`https://discord.com/invite/JRWmNb38GW`}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <FaDiscord size={25} />
                </Nav.Link> */}
              </Nav>
              {/* <Dropdown
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
                  as={HeaderMobileMenuIcon}
                ></Dropdown.Toggle>

                <Dropdown.Menu align="end" className="side-menu">
                  <Dropdown.Item
                    drop="start"
                    as={HeaderMobileMenuCloseIcon}
                  ></Dropdown.Item>

                  
                  <Dropdown.Item href={crypto_bat_nft_path}>
                    <span className={"blink_contest"}>
                      Crypto Bat NFTs Drop{" "}
                      <span className="new-badge">new</span>
                    </span>
                  </Dropdown.Item>

                  <Dropdown.Item href="/mcl-game">
                    {" "}
                    <span className={style["beta-container"]}>
                      <span className={style["beta-tag"]}>Beta</span> MCL Game{" "}
                    </span>{" "}
                  </Dropdown.Item>

                  <Dropdown.Item href="/nft-marketplace" className="btn-link">
                    
                    <span className="theme-btn">Explore Market</span>
                  </Dropdown.Item>
                  {user.login && (
                    <Dropdown.Item
                      onClick={() =>
                        window.open(process.env.NEXT_PUBLIC_HELP_URL, "_blank")
                      }
                    >
                      Need Help ?
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown> */}
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
  );
};

const UserComponent = ({ sref, user, onClick = () => {} }) => (
  <div
    className={`header-user-details ${user?.og_user === true ? "og-user" : ""}`}
    onClick={onClick}
    ref={sref}
  >
    <div className={`user-image-block `}>
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
      {currencyFormat(user?.balance, user?.currency_name)}
    </div>
  </div>
);

const HeaderMobileMenuIcon = forwardRef(({ onClick }, ref) => {
  return (
    <div
      className={style["menu-icon"]}
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
