import Image from "next/image";
import HeroBG from "../../images/jump-trade/refer-earn/new.png";
import Heroright from "../../images/jump-trade/refer-earn/hero-right.svg";
import Heroleft from "../../images/jump-trade/refer-earn/hero-left.svg";
import ShareIcon from "../../images/jump-trade/refer-earn/icons/share.svg";
import RegisterIcon from "../../images/jump-trade/refer-earn/icons/register.svg";
import KYCIcon from "../../images/jump-trade/refer-earn/icons/kyc.svg";
import PurchaseIcon from "../../images/jump-trade/refer-earn/icons/purchase.svg";
import TreasureboxIcon from "../../images/jump-trade/refer-earn/icons/tresurebox.svg";
import { MdFileCopy, MdShare } from "react-icons/md";
import style from "./style.module.scss";
import { useSelector } from "react-redux";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import useWindowUtils from "../../hooks/useWindowUtils";
import { OverlayTrigger, Popover } from "react-bootstrap";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiOutlineLink,
  AiOutlineLogin,
} from "react-icons/ai";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { CgLogIn } from "react-icons/cg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const ReferEarnCode = () => {
  const { user } = useSelector((state) => state.user.data);

  return (
    <>
      <section className={`${style["refer-earnpage"]} px-0`}>
        <section
          className={`${style["refer-banner"]}`}
          style={{
            backgroundImage: `url(${HeroBG.src})`,
          }}
        >
          <Image
            unoptimized={true}
            width="500"
            height="500"
            src={Heroleft}
            alt="Heroleft"
            className={`${style["hero-content-image"]} ${style["left"]}`}
          />

          <span className={style["apply-sec"]}>
            <i>*</i> - T&amp;Cs Apply
          </span>

          <Image
            unoptimized={true}
            width="500"
            height="500"
            src={Heroright}
            alt="Heroright"
            className={`${style["hero-content-image"]} ${style["right"]}`}
          />
          <div className={`${style["hero-content"]}`}>
            <h1>
              Refer &amp; Earn Rewards<sup>*</sup>
            </h1>
            <h5>Invite Friends &amp; Earn Your Rewards!</h5>
            <p>
              Let Your Power To Bring People Into To Joy Of Playing &amp;
              Earning Also Become A Rewarding Experience For You!
            </p>

            {user ? (
              <>
                <article className={`${style["refer-link-band"]}`}>
                  <h5>
                    Your Invite code: <b>{user?.referral_code}</b>{" "}
                  </h5>

                  <CopyToClipboard
                    role="button"
                    text={user?.referral_code}
                    onCopy={() => {
                      toast.success("Copied to Clipboard");
                    }}
                  >
                    <button className={`${style["copy-btn"]}`}>
                      <MdFileCopy /> Copy
                    </button>
                  </CopyToClipboard>
                </article>
                <button className={`${style["share-btn"]}`}>
                  <SharePopover
                    icon={
                      <div>
                        Share <MdShare />
                        {/* Reminder */}
                      </div>
                    }
                    user={user}
                    placement="top"
                  />
                </button>
              </>
            ) : (
              <>
                <button
                  className={`${style["share-btn"]}`}
                  onClick={() =>
                    window.open(
                      `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/signin?redirect=${window.location.href}`,
                      "_self"
                    )
                  }
                >
                  <CgLogIn /> Sign In
                </button>
              </>
            )}
          </div>
        </section>
      </section>
    </>
  );
};

const SharePopover = ({ user, icon, placement }) => {
  const referralcode = user?.referral_code;
  const windowUtils = useWindowUtils();

  const url =
    process.env.NEXT_PUBLIC_ACCOUNTS_URL +
    "/signup?fsz=carnftrefer&referralcode=" +
    referralcode;
  // var hashtags = "jump.trade,NFT,popularNFT,rareNFT,NFTMarketplace";
  // const via = "jump.trade";

  const detectWhatsapp = (uri) => {
    const onIE = () => {
      return new Promise((resolve) => {
        windowUtils.navigator.msLaunchUri(
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

  return (
    <>
      <OverlayTrigger
        trigger="click"
        rootClose
        key={placement}
        placement={placement}
        overlay={
          <Popover className="mb-2">
            <Popover.Body className="p-1 custom-pop">
              <>
                <CopyToClipboard
                  role="button"
                  className="me-2"
                  text={`${url}`}
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
                      `https://www.facebook.com/sharer/sharer.php?u=${`${encodeURIComponent(
                        url
                      )}`}&quote=Hey!! I've found an awesome NFT collection... and I've got mine! Thought it would be great for you to get one too!%0a%0aPlease use the referral code when signing up! PS: If you buy your NFT, I get a referral reward... And I'm sure you'll do it for me!%0a%0a Cheers%0a%0a`
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
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        url
                      )}
                      &text=Hey!! I've found an awesome NFT collection... and I've got mine! Thought it would be great for you to get one too!%0a%0aPlease use the referral code when signing up! PS: If you buy your NFT, I get a referral reward... And I'm sure you'll do it for me!%0a%0a Cheers%0a%0a`
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
                      `https://telegram.me/share/?url=${encodeURIComponent(url)}
                      &title=Hey!! I've found an awesome NFT collection... and I've got mine! Thought it would be great for you to get one too!%0a%0aPlease use the referral code when signing up! PS: If you buy your NFT, I get a referral reward... And I'm sure you'll do it for me!%0a%0a Cheers%0a%0a`
                    )
                  }
                />

                <FaWhatsapp
                  role="button"
                  size={35}
                  style={{ color: "#25D366" }}
                  onClick={() => {
                    detectWhatsapp(
                      `whatsapp://send?text=Hey!! I've found an awesome NFT collection... and I've got mine! Thought it would be great for you to get one too!%0a%0aPlease use the referral code when signing up! PS: If you buy your NFT, I get a referral reward... And I'm sure you'll do it for me!%0a%0a Cheers%0a%0a${encodeURIComponent(
                        url
                      )}`
                    ).then((hasWhatsapp) => {
                      if (!hasWhatsapp) {
                        alert(
                          "You don't have WhatsApp, kindly install it and try again"
                        );
                      }
                    });
                  }}
                />
              </>
            </Popover.Body>
          </Popover>
        }
      >
        <span>{icon}</span>
      </OverlayTrigger>
    </>
  );
};

export default ReferEarnCode;
