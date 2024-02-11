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
const ReferralInstruction = () => {
  const { user } = useSelector((state) => state.user.data);

  return (
    <>
      <section className={`${style["refer-earnpage"]} px-0`}>
        <section
          className={`${style["refferal-program-info"]} ${style["drop"]}`}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className={` ${style["section-heading"]}`}>
                  DROP REFERRAL PROGRAM
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <article
                  className={` ${style["referral-program-info-detail"]}`}
                >
                  <ul className={` ${style["refferal-icon-flex"]}`}>
                    <li className={` ${style["refferal-icon-flex-box"]}`}>
                      <Image
                        unoptimized={true}
                        height="200"
                        width="200"
                        src={ShareIcon}
                        alt="ShareIcon"
                        className={` ${style["refferal-icon"]}`}
                      />
                      <h5>Share</h5>
                    </li>
                    <li className={` ${style["refferal-icon-flex-box"]}`}>
                      <Image
                        unoptimized={true}
                        height="200"
                        width="200"
                        src={RegisterIcon}
                        alt="RegisterIcon"
                        className={` ${style["refferal-icon"]}`}
                      />
                      <h5>Register</h5>
                    </li>
                    <li className={` ${style["refferal-icon-flex-box"]}`}>
                      <Image
                        unoptimized={true}
                        height="200"
                        width="200"
                        src={KYCIcon}
                        alt="KYCIcon"
                        className={` ${style["refferal-icon"]}`}
                      />

                      <h5>KYC</h5>
                    </li>
                    <li className={` ${style["refferal-icon-flex-box"]}`}>
                      <Image
                        unoptimized={true}
                        height="200"
                        width="200"
                        src={PurchaseIcon}
                        alt="PurchaseIcon"
                        className={` ${style["refferal-icon"]}`}
                      />

                      <h5>Purchase</h5>
                    </li>
                    <li className={` ${style["refferal-icon-flex-box"]}`}>
                      <Image
                        unoptimized={true}
                        height="200"
                        width="200"
                        src={TreasureboxIcon}
                        alt="TreasureboxIcon"
                        className={` ${style["refferal-icon"]}`}
                      />

                      <h5>Treasure box</h5>
                    </li>
                  </ul>
                  <ul className={` ${style["refferal-content-flex"]}`}>
                    <li className={` ${style["refferal-content-flex-box"]}`}>
                      <p>
                        Generate your unique link and share the link with your
                        friends. Encourage them to experience the awesomeness of
                        metaverse gaming!
                      </p>
                    </li>
                    <li className={` ${style["refferal-content-flex-box"]}`}>
                      <p>
                        Your friend should create their account on Jump.trade.
                        Please note that they should use a fresh email address
                        not associated with any Jump.trade or GuardianLink
                        account.
                      </p>
                    </li>
                    <li className={` ${style["refferal-content-flex-box"]}`}>
                      <p>
                        A valid completion of KYC is mandatory both for you and
                        your friend to be eligible for referral rewards.
                      </p>
                    </li>
                    <li className={` ${style["refferal-content-flex-box"]}`}>
                      <p>
                        Your friend should make their first-ever Raddx NFT
                        purchase during the drop on Jump.trade with their new
                        account... and step into the exciting metaverse! Until
                        then, your Treasure Box remains locked.
                      </p>
                    </li>
                    <li className={` ${style["refferal-content-flex-box"]}`}>
                      <p>
                        Once your friend completes the purchase, that&apos;s it!
                        The Treasure Box referral reward is yours! You can open
                        it up and explore what big reward it holds!
                      </p>
                    </li>
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </section>
        {/* <section
          className={`${style["refferal-program-info"]} ${style["premium"]}`}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className={` ${style["section-heading"]}`}>
                  PREMIUM REFFERAL PROGRAM
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <article
                  className={` ${style["referral-program-info-detail"]}`}
                >
                  <ul className={` ${style["refferal-icon-flex"]}`}>
                    <li className={` ${style["refferal-icon-flex-box"]}`}>
                      <Image unoptimized={true}
                        
                        height="200"
                        width="200"
                        src={ShareIcon}
                        alt={ShareIcon}
                        className={` ${style["refferal-icon"]}`}
                      />

                      <h5>Share</h5>
                    </li>
                    <li className={` ${style["refferal-icon-flex-box"]}`}>
                      <Image unoptimized={true}
                        
                        height="200"
                        width="200"
                        src={RegisterIcon}
                        alt={RegisterIcon}
                        className={` ${style["refferal-icon"]}`}
                      />

                      <h5>Register</h5>
                    </li>
                    <li className={` ${style["refferal-icon-flex-box"]}`}>
                      <Image unoptimized={true}
                        
                        height="200"
                        width="200"
                        src={KYCIcon}
                        alt={KYCIcon}
                        className={` ${style["refferal-icon"]}`}
                      />

                      <h5>KYC</h5>
                    </li>
                    <li className={` ${style["refferal-icon-flex-box"]}`}>
                      <Image unoptimized={true}
                        
                        height="200"
                        width="200"
                        src={PurchaseIcon}
                        alt={PurchaseIcon}
                        className={` ${style["refferal-icon"]}`}
                      />

                      <h5>Purchase</h5>
                    </li>
                    <li className={` ${style["refferal-icon-flex-box"]}`}>
                      <Image unoptimized={true}
                        
                        height="200"
                        width="200"
                        src={TreasureboxIcon}
                        alt={TreasureboxIcon}
                        className={` ${style["refferal-icon"]}`}
                      />

                      <h5>Treasure box</h5>
                    </li>
                  </ul>
                  <ul className={` ${style["refferal-content-flex"]}`}>
                    <li className={` ${style["refferal-content-flex-box"]}`}>
                      <p>
                        Once you Share referral link with your friends you will
                        be eligible for <b>10$ reward bonus</b>.
                      </p>
                    </li>
                    <li className={` ${style["refferal-content-flex-box"]}`}>
                      <p>
                        When Your friend registers in the site using the shared
                        link You will receive <b>$10 reward bonus instantly</b>.
                      </p>
                      <p className={` ${style["hint"]}`}>
                        Rewards will be used for buying NFTs or joining the
                        contest in MCL.
                      </p>
                    </li>
                    <li className={` ${style["refferal-content-flex-box"]}`}>
                      <p>
                        When you and your friend Complete the KYC, You will
                        receive a <b>locked treasure box</b>. To <b>unlock</b>,
                        referred friend should make a <b>NFT purchase</b>.
                      </p>
                      <p className={` ${style["hint"]}`}>
                        (To unlock, referred friend and you should complete KYC)
                      </p>
                    </li>
                    <li className={` ${style["refferal-content-flex-box"]}`}>
                      <p>
                        When your Friend make <b>first NFT</b> purchase Your{" "}
                        <b>treasure box</b> will be <b>unlocked</b>.<sup>*</sup>
                      </p>
                      <p className={` ${style["hint"]}`}>
                        (To unlock, referred friend and you should complete KYC)
                      </p>
                    </li>
                    <li className={` ${style["refferal-content-flex-box"]}`}>
                      <p>
                        You are eligible for referral contest to gets exciting
                        prizes like{" "}
                        <b>BMW Bike, iPhone 14 pro, Playstation, Asus laptop</b>{" "}
                        and many more.{" "}
                        <b>More the referral, more the chances of winning</b>.
                      </p>
                      <p className={` ${style["hint"]}`}>
                        BMW Bike, iPhone 14 pro, Playstation, Asus laptop
                      </p>
                    </li>
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </section> */}
      </section>
    </>
  );
};

const SharePopover = ({
  user,
  icon,
  placement,
  title,
  listedShare = false,
}) => {
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

export default ReferralInstruction;
