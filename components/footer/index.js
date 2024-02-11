import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoLogoWhatsapp } from "react-icons/io";
import { BiLoaderAlt } from "react-icons/bi";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Navbar, Nav, Dropdown, Container } from "react-bootstrap";

import {
  validateEmail,
  decodeURIComponentSafe,
  openWindowBlank,
} from "../../utils/common";
import { subscribeApi } from "../../utils/base-methods";
import {
  getStatusMclBall,
  isUserLoggedIn,
  mclGamePassLootStatus,
} from "../../redux/reducers/user_reducer";
import { getSourceCookies } from "../../utils/cookies";
import { BsArrowRight, BsArrowUpCircleFill } from "react-icons/bs";

import {
  MODAL_TYPES,
  LOOT_STATUS,
} from "../../components/loot-box-section/common";
import { EVENT_NAMES, invokeTrackEvent } from "../../utils/track-events";

import LoginWithPassword from "../../components/loot-box-section/login-with-password";
import LoginWithOtp from "../../components/loot-box-section/login-with-otp";
import LoginWithGoogleOtp from "../../components/loot-box-section/google-otp";
import VerifyOtp from "../../components/loot-box-section/verify-otp";
import ForgotPassword from "../../components/loot-box-section/forgot-password";
import Register from "../../components/loot-box-section/register";
import Prebook from "../../components/loot-box-section/prebook";

import images from "../../utils/images.json";
import discount from "../../images/discount.png";
import PlayStore from "../../images/google-play-image.png";
import AppStore from "../../images/apple-image.png";
import PlayStoreWhite from "../../images/google-play-image_white.png";
import AppStoreWhite from "../../images/apple-image_white.png";
import homeIcon from "../../images/menu-icons/home.svg";
import marketIcon from "../../images/menu-icons/market.svg";
import dropsIcon from "../../images/menu-icons/drops.svg";
import rentalIcon from "../../images/menu-icons/rental.svg";
import CallItLogo from "../../images/callit-logo.svg";
import mclGameIcon from "../../images/menu-icons/mcl-game.svg";
import moreIcon from "../../images/menu-icons/more.svg";
import JumpProIcon from "../../images/menu-icons/jt-pro-02.svg";

import style from "./style.module.scss";

const Footer = () => {
  const router = useRouter();
  const fsz = router.query.fsz;
  const loginStatus = useSelector(isUserLoggedIn);
  const isBallNFTLive = useSelector(getStatusMclBall);
  const isMCLMegaPassLive = useSelector(mclGamePassLootStatus);

  const [email, setEmail] = useState();
  const [vEmail, setVEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [GShover, setGSHover] = useState(false);
  const [AShover, setASHover] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalState, setModalState] = useState({});

  const [autoLogin, setAutoLogin] = useState(true);
  const [termsConditions, setTermsConditions] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleModal = (modalType = "", modalState = {}) => {
    setModalType(modalType);
    setModalState(modalState);
  };

  useEffect(() => {
    if (!loginStatus && router.query.email && router.query.with) {
      let Loginemail = decodeURIComponentSafe(router.query.email);
      toggleModal(MODAL_TYPES.LOGIN_WITH_OTP, { Loginemail });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleSendNewsLetter = async () => {
    if (validateEmail(email)) {
      setVEmail(null);

      try {
        setLoading(true);

        const result = await subscribeApi(
          email,
          termsConditions,
          "jump",
          getSourceCookies()
        );
        if (!result.data.data.subscribed) {
          setVEmail(
            "We will buzz you with important updates. Thank you for being a part of Jump.trade #jump.trade #nft"
          );
        } else {
          setVEmail(
            "We got it again!, We are excited to have you as part of our NFT club. Details have been noted already. We will buzz you with important updates. See you soon!"
          );
        }

        !loginStatus &&
          termsConditions &&
          router.push(
            `?with=otp&email=${result?.data?.data?.signin_email || ""}`
          );

        setEmail("");
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.log(
          "🚀 ~ file: index.js ~ line 46 ~ handleSendNewsLetter ~ error",
          error
        );
      }
    } else {
      setVEmail("Please provide a valid email");
    }
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
      <div className={"side_menu for-mobile"}>
        <div className={"vertical-wrapper"}>
          <ul className={"vertical-group"}>
            <>
              <Dropdown
                drop="up"
                aria-haspopup
                autoClose={["inside", "outside"]}
              >
                <Dropdown.Toggle
                  align="start"
                  drop="up"
                  onClick={() => router.push("/")}
                  // role="button"
                  // as={RoleDropdown}
                >
                  <Image unoptimized={true} alt="home icon" src={homeIcon} />
                  <span>Home</span>
                </Dropdown.Toggle>
              </Dropdown>
              <Dropdown aria-haspopup autoClose={["inside", "outside"]}>
                <Dropdown.Toggle
                  align="start"
                  onClick={() => router.push("/nft-marketplace")}
                >
                  <Image
                    unoptimized={true}
                    alt="market icon"
                    src={marketIcon}
                  />
                  <span>Market</span>
                </Dropdown.Toggle>
              </Dropdown>
              <Dropdown
                drop="up"
                aria-haspopup
                autoClose={["inside", "outside"]}
              >
                <Dropdown.Toggle
                  align="start"
                  drop="up"
                  // as={RoleDropdown}
                >
                  <Image unoptimized={true} alt="drop icon" src={dropsIcon} />
                  <span>Drops</span>
                </Dropdown.Toggle>

                <Dropdown.Menu align="start" drop="up">
                  {/* <Dropdown.Item
                    className="blink_contest"
                    onClick={() => router.push("/drop/mcl-free-season-pass")}
                  >
                    MCL Mega pass
                    <sup className={style["drop-sup"]}>new</sup>
                  </Dropdown.Item> */}
                  <Dropdown.Item
                    className={`
                      ${
                        lootStatus.includes(isBallNFTLive)
                          ? "blink_contest"
                          : ""
                      }`}
                    onClick={() =>
                      window.open(
                        `${process.env.NEXT_PUBLIC_BALL_NFT_URL}`,
                        "_blank"
                      )
                    }
                  >
                    MCL BALL NFTs
                    {lootStatus.includes(isBallNFTLive) && (
                      <sup
                        className={`${
                          isBallNFTLive === LOOT_STATUS?.PRE_BOOK ||
                          isBallNFTLive === LOOT_STATUS?.DROP ||
                          isBallNFTLive === LOOT_STATUS?.DROP_YTA
                            ? style["drop-sup"]
                            : ""
                        }`}
                      >
                        {" "}
                        {isBallNFTLive === LOOT_STATUS?.PRE_BOOK ||
                        isBallNFTLive === LOOT_STATUS?.DROP
                          ? "live"
                          : "New"}
                      </sup>
                    )}
                  </Dropdown.Item>
                  <Dropdown.Item
                    // className="blink_contest"
                    onClick={() => router.push("/drop/free-mcl-mega-pass")}
                  >
                    MCL Mega pass
                    {/* <sup className={style["drop-sup"]}>new</sup> */}
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() =>
                      window.open(`${process.env.NEXT_PUBLIC_HURLEY_URL}`)
                    }
                  >
                    HURLEY NFTs
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      router.push(
                        `/drop/mcl-founder-pass${fsz ? `?fsz=${fsz}` : ""}`
                      )
                    }
                  >
                    MCL Founder Pass
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => router.push("/drop/mcl-fusor-nfts")}
                  >
                    MCL Fusor NFTs
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      window.open(
                        `${process.env.NEXT_PUBLIC_RADDX_URL}`,
                        "_blank"
                      )
                    }
                  >
                    RADDX Metaverse NFTs
                  </Dropdown.Item>
                  {/* <Dropdown.Item
                    onClick={() => router.push("/drop/free-mcl-pass")}
                  >
                    MCL Play Pass
                  </Dropdown.Item> */}
                  <Dropdown.Item
                    onClick={() => router.push("/drop/mcl-shot-nfts")}
                  >
                    MCL Signature Shots
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => router.push("/drop/crypto-bat-nfts")}
                  >
                    Crypto Bat NFTs
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <Dropdown
                drop="up"
                aria-haspopup
                autoClose={["inside", "outside"]}
              >
                <Dropdown.Toggle
                  align="start"
                  drop="up"
                  // as={RoleDropdown}
                >
                  <div
                    onClick={() => {
                      router.push("/nft-rental");
                    }}
                  >
                    <Image unoptimized={true} alt="rental icon" src={rentalIcon} />
                    <span>Rental</span>
                  </div>
                </Dropdown.Toggle>
              </Dropdown> */}
              <Dropdown
                drop="up"
                aria-haspopup
                autoClose={["inside", "outside"]}
              >
                <Dropdown.Toggle
                  align="start"
                  drop="up"
                  // as={RoleDropdown}
                >
                  <div
                    onClick={() => {
                      window.open(
                        `${process.env.NEXT_PUBLIC_CALL_IT_URL}/events`
                      );
                    }}
                  >
                    <Image
                      unoptimized={true}
                      alt="rental icon"
                      src={CallItLogo}
                    />
                    <span>Callit</span>
                  </div>
                </Dropdown.Toggle>
              </Dropdown>
              <Dropdown
                drop="up"
                aria-haspopup
                autoClose={["inside", "outside"]}
              >
                <Dropdown.Toggle
                  align="start"
                  drop="up"
                  // as={RoleDropdown}
                >
                  <div
                    onClick={() => {
                      router.push("/tournaments");
                    }}
                  >
                    <Image
                      unoptimized={true}
                      alt="m_icon"
                      className={`${style["d-marketplace-image"]}`}
                      src={JumpProIcon}
                      height={20}
                      width={20}
                      onClick={() =>
                        window.open("https://pro.jump.trade/", "_blank")
                      }
                    />
                    <span>d&apos;Marketplace</span>
                  </div>
                </Dropdown.Toggle>
              </Dropdown>
              <Dropdown drop="up" autoClose={["inside", "outside"]}>
                <Dropdown.Toggle
                  align="start"
                  drop="up"

                  // as={RoleDropdown}
                >
                  <Image unoptimized={true} alt="more icon" src={moreIcon} />
                  <span>More</span>
                </Dropdown.Toggle>

                <Dropdown.Menu align="start" drop="center">
                  <Dropdown.Item
                    onClick={() => {
                      router.push("/tournaments");
                    }}
                  >
                    Tournaments
                    <sup className={style["drop-sup"]}>New</sup>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      router.push("/nft-rental");
                    }}
                  >
                    Rental
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => router.push("/creator-application")}
                  >
                    List your NFTs
                    <sup className={style["drop-sup"]}>New</sup>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => router.push("/referral-program")}
                  >
                    Refer & Earn
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      openWindowBlank(process.env.NEXT_PUBLIC_HELP_URL)
                    }
                  >
                    Need Help
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      openWindowBlank("https://discord.gg/guardianlink")
                    }
                  >
                    Discord
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          </ul>
        </div>
      </div>
      {showTopBtn && (
        <div className="top-to-btm">
          <BsArrowUpCircleFill
            className="icon-position icon-style"
            onClick={goToTop}
          />
        </div>
      )}

      <div id="footer" className={style["footer"]}>
        <div id="fmenu1" className={style["fmenu1"]}>
          <div className={`${style["submenu"]} ${style["first-box"]}`}>
            <Link legacyBehavior target="_self" href="/" prefetch={false}>
              {/* <a> */}
              <Image
                unoptimized={true}
                height="100"
                width="100"
                src={images.jumpTradeLogo}
                className={style["footer-logo"]}
                alt="JumptradeLogo"
                priority={true}
              />
              {/* </a> */}
            </Link>
            <p className={style["footer-brand-info"]}>
              Jump.trade is Asia&apos;s Largest NFT Marketplace. Begin trading
              NFTs today.
            </p>
            <div className={`${style["downloads-section"]} `}>
              <div
                className={`d-flex pt-3 gap-3 flex-wrap justify-content-center ${style["downloads_btns"]} `}
              >
                <a
                  href="https://play.google.com/store/apps/details?id=com.jump.trade"
                  target="_blank"
                  rel="nofollow noopoener noreferrer"
                >
                  <Image
                    unoptimized={true}
                    height="100"
                    width="100"
                    className={style["image_icon"]}
                    src={GShover ? PlayStoreWhite : PlayStore}
                    alt="PlayStore"
                    priority={true}
                    onMouseOver={() => setGSHover(true)}
                    onMouseOut={() => setGSHover(false)}
                  />
                </a>
                <a
                  href="https://apps.apple.com/in/app/jump-trade/id1618739753"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <Image
                    unoptimized={true}
                    height="100"
                    width="100"
                    className={style["image_icon"]}
                    src={AShover ? AppStoreWhite : AppStore}
                    alt="AppStore"
                    priority={true}
                    onMouseOver={() => setASHover(true)}
                    onMouseOut={() => setASHover(false)}
                  />
                </a>
              </div>
            </div>
          </div>
          <div className={`${style["submenu"]} ${style["third-box"]}`}>
            <div className={style["footer-form-block"]}>
              <h6>Stay Informed! Subscribe Today For The Latest Updates.</h6>
              <div className={`${style["input-group"]} input-group `}>
                <input
                  type="text"
                  className={`${style["form-control"]} form-control`}
                  placeholder="Enter your email"
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <span
                  className={`${style["input-group-text"]} input-group-text`}
                  disabled={loading}
                  onClick={handleSendNewsLetter}
                >
                  {loading ? (
                    <BiLoaderAlt className="fa fa-spin" />
                  ) : (
                    <BsArrowRight />
                  )}
                </span>
              </div>
              {autoLogin && email && !loginStatus && (
                <div className="py-2 gap-2 mt-2">
                  <input
                    type="checkbox"
                    name="termsConditions"
                    checked={termsConditions}
                    onClick={() => setTermsConditions(!termsConditions)}
                  />{" "}
                  I allow Jump.trade to create an account for me and I confirm
                  that I am 18 years or older. View{" "}
                  <a
                    target="_blank"
                    onClick={() =>
                      window.open(
                        `${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/terms-and-conditions`
                      )
                    }
                    className={`${style["link"]} ${style["link-orange"]}`}
                  >{`T&Cs`}</a>{" "}
                  and
                  <a
                    target="_blank"
                    onClick={() =>
                      window.open(
                        `${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/privacy-policy`
                      )
                    }
                    className={`${style["link"]} ${style["link-orange"]}`}
                  >{` Privacy Policy.`}</a>
                </div>
              )}
              <p className={style["nft_email_error"]}>{vEmail}</p>
            </div>
            <div className={style["footer-menulist-block"]}>
              <div className={style["footer-menu-list"]}>
                <ul className={style["footer-menu-links"]}>
                  <li
                    onClick={() => {
                      router.push("/about-us");
                      invokeTrackEvent(EVENT_NAMES?.ABOUT_US_CLICKED, {});
                    }}
                  >
                    About Us
                  </li>

                  <li
                    onClick={() =>
                      invokeTrackEvent(EVENT_NAMES?.CONTACT_US_CLICKED, {})
                    }
                  >
                    <a
                      href={process.env.NEXT_PUBLIC_GUARDIAN_CONTACT_US}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li
                    onClick={() => {
                      invokeTrackEvent(EVENT_NAMES?.BLOG_CLICKED, {});
                      window.open(
                        `${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/blog`,
                        "_self"
                      );
                    }}
                  >
                    Blog
                  </li>

                  {/* <Nav.Link
                    className={"blink_contest"}
                    onClick={() => router.push("/creator-application")}
                  >
                    Creator
                    <span className="new-badge">new</span>
                  </Nav.Link> */}
                  {/* <li onClick={() => router.push("/")}>Marketplace</li>

                  <li onClick={() => router.push("/tournaments")}>MCL Game</li> */}
                </ul>
              </div>

              <div className={style["footer-menu-list"]}>
                <ul className={style["footer-menu-links"]}>
                  <li
                    onClick={() => {
                      invokeTrackEvent(EVENT_NAMES?.FAQS_CLICKED, {});
                      router.push("/faq");
                    }}
                  >
                    FAQs
                  </li>
                  <li
                    onClick={() => {
                      window.open(process.env.NEXT_PUBLIC_INSTRUCTION_URL);
                    }}
                  >
                    Instruction
                  </li>

                  <li onClick={() => router.push("/release-notes")}>
                    Release Notes
                  </li>
                  {/* <li
                    onClick={() =>
                      window.open(
                        process.env.NEXT_PUBLIC_GUARDIAN_CONTACT_US,
                        "_blank"
                      )
                    }
                  >
                    Contact Us
                  </li> */}
                </ul>
              </div>
              <div className={style["footer-menu-list"]}>
                <ul className={style["footer-menu-links"]}>
                  <li onClick={() => router.push("/privacy-policy")}>
                    Privacy Policy
                  </li>

                  <li onClick={() => router.push("/terms-and-conditions")}>
                    Terms &amp; Conditions
                  </li>
                  {/* <li
                    onClick={() => router.push("/offers")}
                    className={style["offer"]}
                  >
                    Offers
                    <Image unoptimized={true}
                      src={discount}
                      alt="discount"
                      height={20}
                      width={20}
                    />
                  </li> */}
                  <li onClick={() => router.push("/nft-marketplace/contest/")}>
                    Contest
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Third box-end */}
        </div>
      </div>
      <div className={`${style["bottom-bar"]}`}>
        <div
          className={`${style["bottom-container"]} d-flex justify-content-center align-items-center`}
        >
          <div className={`${style["copyrights"]} me-3`}>
            © All rights reserved | Appstars Applications Pvt. Ltd., India &
            Guardian Blockchain Labs Pte. Ltd., Singapore.
          </div>
        </div>
      </div>

      {modalType === MODAL_TYPES.LOGIN_WITH_PASSWORD && (
        <LoginWithPassword
          show={modalType === MODAL_TYPES.LOGIN_WITH_PASSWORD}
          toggleModal={toggleModal}
          modalState={modalState}
        />
      )}
      {modalType === MODAL_TYPES.LOGIN_WITH_OTP && (
        <LoginWithOtp
          show={modalType === MODAL_TYPES.LOGIN_WITH_OTP}
          toggleModal={toggleModal}
          modalState={modalState}
        />
      )}
      {modalType === MODAL_TYPES.VERIFY_GOOGLE_OTP && (
        <LoginWithGoogleOtp
          show={modalType === MODAL_TYPES.VERIFY_GOOGLE_OTP}
          toggleModal={toggleModal}
          modalState={modalState}
        />
      )}
      {modalType === MODAL_TYPES.VERIFY_OTP && (
        <VerifyOtp
          show={modalType === MODAL_TYPES.VERIFY_OTP}
          toggleModal={toggleModal}
          modalState={modalState}
        />
      )}
      {modalType === MODAL_TYPES.FORGOT_PASSWORD && (
        <ForgotPassword
          show={modalType === MODAL_TYPES.FORGOT_PASSWORD}
          toggleModal={toggleModal}
          modalState={modalState}
        />
      )}
      {modalType === MODAL_TYPES.REGISTER && (
        <Register
          show={modalType === MODAL_TYPES.REGISTER}
          toggleModal={toggleModal}
          modalState={modalState}
        />
      )}
      {modalType === MODAL_TYPES.PREBOOK && (
        <Prebook
          show={modalType === MODAL_TYPES.PREBOOK}
          toggleModal={toggleModal}
          modalState={modalState}
        />
      )}
    </>
  );
};

export default Footer;
