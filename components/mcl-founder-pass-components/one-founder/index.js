import React from "react";
import Image from "next/image";
import useWindowSize from "../../../hooks/useWindowSize";
import imgOne from "../../../images/drop/vip-pass/card-upgrade.png";
import imgTwo from "../../../images/drop/vip-pass/fee-free.png";
import imgThree from "../../../images/drop/vip-pass/mega-special-play.png";
import imgFour from "../../../images/drop/vip-pass/exclusive-badge.png";
import imgFive from "../../../images/drop/vip-pass/private-discard.png";
import imgSix from "../../../images/drop/vip-pass/premium-kitbag.png";
import mainHeading from "../../../images/drop/vip-pass/one-founder-pass.png";
import mainHeadingMobile from "../../../images/drop/vip-pass/one-founder-pass-mobile.png";
import style from "./style.module.scss";

const OneFounder = () => {
  const { width: windowWidth } = useWindowSize();
  return (
    <>
      <section className={`${style["one-identity-section"]}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={`${style["sec-header"]}`}>
                {/* <h2>One identity across internet</h2> */}
                {/* <Image unoptimized={true} src={mainHeading} /> */}
                <Image
                  unoptimized={true}
                  alt="mcl-founder-pass"
                  src={`${
                    windowWidth > 767 ? mainHeading.src : mainHeadingMobile.src
                  }`}
                  height={300}
                  width={1440}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm-12 order-2 order-md-1 col-md-6">
              <div className={`${style["content-block"]}`}>
                <h3>Card Upgrades</h3>
                <p>
                  MCL player cards that you own can be upgraded to a higher
                  level, and the cost of upgrading them will be lower based on
                  the type of pass you own. This allows you to enhance your
                  team, gain an advantage over others in competitions, and
                  improve your chances of success.
                </p>
              </div>
            </div>
            <div className="col-sm-12 order-1 order-md-2 col-md-6">
              <div className={`${style["img-block"]}`}>
                <Image
                  unoptimized={true}
                  alt="mcl-pass"
                  src={imgOne.src}
                  height={500}
                  width={600}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row  align-items-center">
            <div className="col-sm-12 col-md-6">
              <div className={`${style["img-block"]}`}>
                <Image
                  unoptimized={true}
                  alt="mcl-pass"
                  src={imgTwo.src}
                  height={500}
                  width={600}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className={`${style["content-block"]}`}>
                <h3>Zero Transactions Fee</h3>
                <p>
                  Enjoy the convenience of zero transactions fee for up to three
                  transactions, with a limit set for each transaction* based on
                  the category of the pass you own.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row  align-items-center">
            <div className="col-sm-12 order-2 order-md-1 col-md-6">
              <div className={`${style["content-block"]}`}>
                <h3>Monthly Mega Play Tournament</h3>
                <p>
                  Gain exclusive access to our monthly mega play tournaments,
                  held twice a month specifically for Founder Pass holders.
                </p>
              </div>
            </div>
            <div className="col-sm-12 order-1 order-md-2 col-md-6">
              <div className={`${style["img-block"]}`}>
                <Image
                  unoptimized={true}
                  alt="mcl-pass"
                  src={imgThree.src}
                  height={500}
                  width={600}
                  className={`${style["three"]}`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row  align-items-center">
            <div className="col-sm-12 col-md-6">
              <div className={`${style["img-block"]}`}>
                <Image
                  unoptimized={true}
                  alt="mcl-pass"
                  src={imgFour.src}
                  height={500}
                  width={600}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className={`${style["content-block"]}`}>
                <h3>Exclusive Badges</h3>
                <p>
                  Unleash the vibrant energy of your profile with the
                  meticulously crafted exclusive badges for our Founder Pass
                  holders! Embrace a standard of distinction that propels you to
                  the forefront, effortlessly standing out from the crowd and
                  securing a guaranteed spotlight.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row  align-items-center">
            <div className="col-sm-12 order-2 order-md-1 col-md-6">
              <div className={`${style["content-block"]}`}>
                <h3>Premium Kit Bag</h3>
                <p>
                  Secure an exclusive premium kit bag after each game that has
                  high tier upgrade cards.
                </p>
              </div>
            </div>
            <div className="col-sm-12 order-1 order-md-2 col-md-6">
              <div className={`${style["img-block"]}`}>
                <Image
                  unoptimized={true}
                  alt="mcl-pass"
                  src={imgSix.src}
                  height={500}
                  width={600}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container-fluid">
          <div className="row  align-items-center">
            <div className="col-sm-12 order-2 order-md-1 col-md-6">
              <div className={`${style["content-block"]}`}>
                <h3>Private Discord Channels</h3>
                <p>
                  Gain exclusive access to private channels on Discord reserved
                  solely for pass holders. Connect with like-minded individuals,
                  discuss strategies, and stay updated on the latest happenings.
                </p>
              </div>
            </div>
            <div className="col-sm-12 order-1 order-md-2 col-md-6">
              <div className={`${style["img-block"]}`}>
                <Image unoptimized={true}
                  alt="mcl-pass"
                  src={imgFive.src}
                  height={500}
                  width={600}
                />
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="container-fluid">
          <div className="row  align-items-center">
            <div className="col-sm-12 col-md-6">
              <div className={`${style["img-block"]}`}>
                <Image unoptimized={true}
                  alt="mcl-pass"
                  src={imgSix.src}
                  height={500}
                  width={600}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className={`${style["content-block"]}`}>
                <h3>Premium Kit Bag</h3>
                <p>
                  Receive a premium Kit bag filled with valuable items,
                  including 2500 emotes or shots and in-game currency like gems.
                  These exclusive NFTs and items will further enhance your
                  gameplay and give you an edge on the field.
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </>
  );
};

export default OneFounder;
