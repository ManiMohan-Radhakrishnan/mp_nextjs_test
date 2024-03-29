import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { IoLogoWhatsapp } from "react-icons/io";
import { BiLoaderAlt } from "react-icons/bi";
import { Button, Form } from "react-bootstrap";
import { HiOutlineArrowRight } from "react-icons/hi";
import {
  FaDiscord,
  FaInstagram,
  FaTwitter,
  FaTelegramPlane,
  FaYoutube,
} from "react-icons/fa";

import style from "./style.module.scss";
import images from "../../utils/images.json";
import { validateEmail } from "../../utils/common";
import { subscribeApi } from "../../utils/base-methods";

const Footer = () => {
  const [email, setEmail] = useState();
  const [vEmail, setVEmail] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSendNewsLetter = async () => {
    if (validateEmail(email)) {
      setVEmail(null);

      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("Nemail", email);

        const result = await subscribeApi(formData);

        if (result.data.status) {
          setVEmail(
            "We will buzz you with important updates. Thank you for being a part of Jump.trade #jump.trade #nft"
          );
        } else {
          setVEmail(
            "We got it again!, We are excited to have you as part of our NFT club. Details have been noted already. We will buzz you with important updates. See you soon!"
          );
        }

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
  return (
    <>
      <div id="footer" className={style["footer"]}>
        <div id="fmenu1" className={style["fmenu1"]}>
          <div className={`${style["submenu"]} ${style["first-box"]}`}>
            <Link legacyBehavior target="_self" href="/">
              {/* <a> */}
              <Image
                unoptimized={true}
                height="100"
                width="100"
                src={images.jumpTradeLogo}
                className={style["footer-logo"]}
                alt="JumptradeLogo"
              />
              {/* </a> */}
            </Link>
            <p className={style["footer-brand-info"]}>
              Jump.trade is one of the world&apos;s largest NFT marketplace
              where you can buy &amp; trade a lot of top digital collectibles
              including MCL cricket game NFTs and other sports NFTs.
            </p>
            <div className={`${style["downloads-section"]} mb-5`}>
              <h2 className={style["app-download"]}>Download App</h2>
              <div className={`d-flex pt-3 ${style["downloads_btns"]} mb-4`}>
                <a
                  href="https://play.google.com/store/apps/details?id=com.jump.trade"
                  className="me-4"
                  target="_blank"
                  rel="nofollow noopoener noreferrer"
                >
                  <Image
                    unoptimized={true}
                    height="100"
                    width="100"
                    className={style["image_icon"]}
                    src={images.playStore}
                    alt="PlayStore"
                  />
                </a>
                <a
                  href="https://apps.apple.com/in/app/jump-trade/id1618739753"
                  className=""
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <Image
                    unoptimized={true}
                    height="100"
                    width="100"
                    className={style["image_icon"]}
                    src={images.appStore}
                    alt="AppStore"
                  />
                </a>
              </div>
            </div>
            <div id="socialMedia" className={style["socialMedia"]}>
              <h3>FOLLOW US</h3>
              <ul className={style["social-icon-two"]}>
                <li>
                  {/* eslint-disable-next-line */}
                  <a
                    href="https://discord.gg/guardianlink"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    <FaDiscord />
                  </a>
                </li>
                <li>
                  {/* eslint-disable-next-line */}
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://t.me/jumptradenft"
                  >
                    <FaTelegramPlane />
                  </a>
                </li>
                <li>
                  {/* eslint-disable-next-line */}
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://twitter.com/Jumptradenft"
                  >
                    <FaTwitter />
                  </a>
                </li>
                {/* <li>
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://www.facebook.com/BeyondLifeClub-109895114746109"
                  >
                    <FaFacebookF />
                  </a>
                </li> */}
                <li>
                  {/* eslint-disable-next-line */}
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://www.instagram.com/jumptradenft/"
                  >
                    <FaInstagram />
                  </a>
                </li>
                {/* <li>
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://beyondlife-club.medium.com/"
                  >
                    <FaMediumM />
                  </a>
                </li> */}
                <li>
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://www.youtube.com/channel/UCBjyJeYnDeml1aE6URwUfdA"
                  >
                    <FaYoutube />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://api.whatsapp.com/send?l=en&text=Hi,%20I%20have%20a%20query%20here!&phone=918925512070"
                  >
                    <IoLogoWhatsapp />
                  </a>
                </li>
              </ul>

              {/* <h4>
                <a
                  href="https://cdn.guardianlink.io/product-hotspot/files/media-kit.zip"
                  target="_self"
                  rel="nofollow noopener noreferrer"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <FaCloudDownloadAlt /> download media kit
                </a>
              </h4> */}
            </div>
          </div>
          <div className={`${style["submenu"]} ${style["second-box"]}`}>
            <div className={style["top-block"]}>
              <h3>BECOME A PART OF THE COMMUNITY</h3>
              <h4>BEGIN A CONVERSATION</h4>
              <ul className={style["linkList"]}>
                <li>
                  {/* eslint-disable-next-line */}
                  <a
                    href="https://discord.gg/guardianlink"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    <FaDiscord /> @Discord
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@jump.trade"
                    rel="nofollow noopener noreferrer"
                    className=""
                  >
                    support@jump.trade
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <Form
                id="nft_form"
                className={style["nft_form"]}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendNewsLetter();
                  return false;
                }}
              >
                <Form.Label className={style["form-label-lbl"]}>
                  Get the Latest Updates on Jump.trade NFT Marketplace
                </Form.Label>
                <Form.Group
                  className={`${style["formGroup"]} mb-3`}
                  controlId="formBasicEmail"
                >
                  <Form.Control
                    className={style["nft_form_email"]}
                    type="email"
                    name="Nemail"
                    placeholder="name@example.com"
                    disabled={loading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className={style["nft_email_error"]}>{vEmail}</p>
                  <Button
                    className={style["nft_form"]}
                    type="button"
                    disabled={loading}
                    onClick={handleSendNewsLetter}
                  >
                    {loading ? (
                      <BiLoaderAlt className="fa fa-spin" />
                    ) : (
                      <HiOutlineArrowRight />
                    )}
                  </Button>
                </Form.Group>
              </Form>
              <span
                onClick={() => router.push("/offers")}
                className={`${style["linkList"]} ${style["offer"]}`}
              >
                <Image
                  unoptimized={true}
                  height="50"
                  width="50"
                  src={images.discount}
                  alt="discount"
                />
                Offers
              </span>
            </div>
          </div>
          {/* <div className="submenu">
            
          </div> */}
          <div className={`${style["submenu"]} ${style["third-box"]}`}>
            <div className={style["footer-menu-list"]}>
              <ul className={style["footer-menu-links"]}>
                <li onClick={() => router.push("/about-us")}>About Us</li>

                <li onClick={() => router.push("/terms-and-conditions")}>
                  Terms &amp; Conditions
                </li>

                <li onClick={() => router.push("/privacy-policy")}>
                  Privacy Policy
                </li>
                <li
                  onClick={() =>
                    window.open(
                      `${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/blog`,
                      "_self"
                    )
                  }
                >
                  Blog
                </li>
                <li onClick={() => router.push("/faq")}>FAQs</li>

                <li
                  onClick={() =>
                    window.open(process.env.NEXT_PUBLIC_INSTRUCTION_URL)
                  }
                >
                  Instruction
                </li>
                <li onClick={() => router.push("/release-notes")}>
                  Release Notes
                </li>

                <li
                  onClick={() =>
                    window.open(
                      process.env.NEXT_PUBLIC_GUARDIAN_CONTACT_US,
                      "_blank"
                    )
                  }
                >
                  Contact Us
                </li>
              </ul>
            </div>
          </div>
          {/* Third box-end */}
        </div>
      </div>
      <div className={`${style["bottom-bar"]}  py-4`}>
        <div
          className={`${style["bottom-container"]} d-flex justify-content-center align-items-center`}
        >
          <div className={`${style["copyrights"]} me-3`}>
            © All rights reserved |{" "}
            {/* <a href="https://guardianlink.io/">A GuardianLink Brand</a>,   */}
            Appstars Applications Pvt. Ltd., India & Guardian Blockchain Labs
            Pte. Ltd., Singapore.
          </div>
          {/* <div className="vr"></div> */}

          {/* <div className={style["bottom-links"]}>
            <span
              className="ms-3 me-3 "
              onClick={() => router.push("/about-us")}
            >
              About Us
            </span>
            <div className="vr"></div>
            <span
              className="ms-3 me-3 "
              onClick={() => router.push("/terms-and-conditions")}
            >
              Terms & Conditions
            </span>
            <div className="vr"></div>
            <span
              className="ms-3 me-3"
              onClick={() => router.push("/privacy-policy")}
            >
              Privacy Policy
            </span>
            <div className="vr"></div>
            <span className="ms-3 me-3" onClick={() => router.push("/faq")}>
              FAQs
            </span>
            <div className="vr"></div>
            <span
              className="ms-3"
              // onClick={() => router.push("/https://www.guardianlink.io/contact-us")}
              onClick={() =>
                window.open(
                  process.env.NEXT_PUBLIC_GUARDIAN_CONTACT_US,
                  "_blank"
                )
              }
            >
              Contact Us
            </span>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Footer;
