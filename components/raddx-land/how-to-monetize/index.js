import React from "react";
import Image from "next/image";
import useWindowSize from "../../../hooks/useWindowSize";
import monetization from "../../../images/drop/raddx-land-nft/monetization.png";
import host from "../../../images/drop/raddx-land-nft/host.png";
import network from "../../../images/drop/raddx-land-nft/network.png";
import rental from "../../../images/drop/raddx-land-nft/rental.png";
import trade from "../../../images/drop/raddx-land-nft/trade.png";
import mainHeading from "../../../images/drop/vip-pass/one-founder-pass.png";
import mainHeadingMobile from "../../../images/drop/vip-pass/one-founder-pass-mobile.png";
import style from "./style.module.scss";

const RaddxLandBenefits = () => {
  const { width: windowWidth } = useWindowSize();
  return (
    <>
      <section className={`${style["monetize-section"]}`}>
        {/* <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={`${style["sec-header"]}`}>
                <h2>One identity across internet</h2>
                <Image unoptimized={true} src={mainHeading} alt="mcl-founder-pass"/>
                <Image unoptimized={true}
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
        </div> */}
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm-12 order-2 order-md-1 col-md-6">
              <div className={`${style["content-block"]}`}>
                <h4>HOST & BUILD</h4>
                <h3>Engaging Events and Profitable Properties</h3>
                <p>
                  Organize exciting contests and events to engage your
                  community. Optimize commercial properties for steady income,
                  creating seamless customer experiences and supporting growth
                  and development.
                </p>
              </div>
            </div>
            <div className="col-sm-12 order-1 order-md-2 col-md-6">
              <div className={`${style["img-block"]}`}>
                <Image
                  unoptimized={true}
                  alt="mcl-pass"
                  src={host.src}
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
                  src={monetization.src}
                  height={500}
                  width={600}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className={`${style["content-block"]}`}>
                <h4>MONETIZE</h4>
                <h3>Maximize Brand Potential</h3>
                <p>
                  Leverage your brand&apos;s presence and reputation to attract
                  partnerships, securing sponsorship deals and collaborations.
                  Implement effective advertising strategies, crafting targeted
                  campaigns to reach your audience and maximize revenue and
                  brand visibility
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row  align-items-center">
            <div className="col-sm-12 order-2 order-md-1 col-md-6">
              <div className={`${style["content-block"]}`}>
                <h4>TRADE</h4>
                <h3>Strategic Real Estate Investments</h3>
                <p>
                  Engage in digital land trading for assets with growth
                  potential and act in the commercial property market,
                  capitalizing on market trends for strategic transactions.
                  Enhance property value by customizing spaces for aesthetics
                  and functionality.
                </p>
              </div>
            </div>
            <div className="col-sm-12 order-1 order-md-2 col-md-6">
              <div className={`${style["img-block"]}`}>
                <Image
                  unoptimized={true}
                  alt="mcl-pass"
                  src={trade.src}
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
                  src={network.src}
                  height={500}
                  width={600}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className={`${style["content-block"]}`}>
                <h4>CONNECT</h4>
                <h3>Community Engagement and Networking</h3>
                <p>
                  Join an exclusive owners club to connect with like-minded
                  individuals and businesses, fostering a strong community
                  through socialization, events, and active collaboration.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row  align-items-center">
            <div className="col-sm-12 order-2 order-md-1 col-md-6">
              <div className={`${style["content-block"]}`}>
                <h4>RENTALS</h4>
                <h3>Diversify Earnings with Innovation</h3>
                <p>
                  Explore fractional leasing to diversify income streams,
                  allowing others to invest in your properties and increase
                  earnings. Continuously pursue innovative strategies, seeking
                  new opportunities and partnerships to drive revenue growth.
                </p>
              </div>
            </div>
            <div className="col-sm-12 order-1 order-md-2 col-md-6">
              <div className={`${style["img-block"]}`}>
                <Image
                  unoptimized={true}
                  alt="mcl-pass"
                  src={rental.src}
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

export default RaddxLandBenefits;
