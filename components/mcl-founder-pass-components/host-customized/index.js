import React from "react";
import Image from "next/image";
import useWindowSize from "../../../hooks/useWindowSize";

import Host from "../../../images/drop/vip-pass/host-customized/Host.png";
import Invite from "../../../images/drop/vip-pass/host-customized/Invite.png";
import Reward from "../../../images/drop/vip-pass/host-customized/Reward.png";
import Monitize from "../../../images/drop/vip-pass/host-customized/Monitize.png";

import HostTitle from "../../../images/drop/vip-pass/host-txt.png";
import InviteTitle from "../../../images/drop/vip-pass/invite-txt.png";
import RewardTitle from "../../../images/drop/vip-pass/reward-txt.png";
import MonitizeTitle from "../../../images/drop/vip-pass/monetize-txt.png";

import mainHeading from "../../../images/drop/vip-pass/host-customized-tournament.png";
import mainHeadingMobile from "../../../images/drop/vip-pass/host-customized-tournament-mobile.png";
import style from "./style.module.scss";
const HostCustomized = () => {
  const { width: windowWidth } = useWindowSize();
  return (
    <>
      <section className={`${style["host-cutomized-section"]}`}>
        <div className={`${style["host-cutomized-block"]}`}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className={`${style["sec-header"]}`}>
                  {/* <h2>One identity across internet</h2> */}
                  <Image
                    unoptimized={true}
                    alt="mcl-founder-pass"
                    src={`${
                      windowWidth > 767
                        ? mainHeading.src
                        : mainHeadingMobile.src
                    }`}
                    height={300}
                    width={1440}
                  />
                  <p>
                    Take charge of organizing exclusive private tournaments
                    customized to your preferences. Earn not just glory, but
                    also earn rewards as you curate unforgettable gaming
                    experience for other players
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={`${style["host-cutomized-content-block"]}`}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6 col-lg-3 my-3">
                  <Image
                    unoptimized={true}
                    alt="host"
                    src={Host.src}
                    height={600}
                    width={600}
                    className={`${style["block-img"]}`}
                  />
                  <Image
                    unoptimized={true}
                    alt="reward"
                    src={HostTitle.src}
                    height={300}
                    width={1440}
                    className={`${style["title-img"]}`}
                  />
                  <p>
                    Create and host customized tournaments, setting the stage
                    for an epic showdown for the players.
                  </p>
                </div>
                <div className="col-sm-6 col-lg-3 my-3">
                  <Image
                    unoptimized={true}
                    alt="invite"
                    src={Invite.src}
                    height={600}
                    width={600}
                    className={`${style["block-img"]}`}
                  />
                  <Image
                    unoptimized={true}
                    alt="title"
                    src={InviteTitle.src}
                    height={300}
                    width={1440}
                    className={`${style["title-img"]}`}
                  />
                  <p>
                    Gather your friends, fellow gamers, and competitors from
                    diverse gaming communities to participate in your hosted
                    tournaments.
                  </p>
                </div>
                <div className="col-sm-6 col-lg-3 my-3">
                  <Image
                    unoptimized={true}
                    alt="reward"
                    src={Reward.src}
                    height={600}
                    width={600}
                    className={`${style["block-img"]}`}
                  />
                  <Image
                    unoptimized={true}
                    alt="reward-title"
                    src={RewardTitle.src}
                    height={300}
                    width={1440}
                    className={`${style["title-img"]}`}
                  />
                  <p>
                    As a reward for organizing the exclusive tournament, get a
                    share from each match you host.
                  </p>
                </div>
                <div className="col-sm-6 col-lg-3 my-3">
                  <Image
                    unoptimized={true}
                    alt="monitize"
                    src={Monitize.src}
                    height={600}
                    width={600}
                    className={`${style["block-img"]}`}
                  />
                  <Image
                    unoptimized={true}
                    alt="monitize"
                    src={MonitizeTitle.src}
                    height={300}
                    width={1440}
                    className={`${style["title-img"]}`}
                  />
                  <p>
                    With the founder pass, you have the ability to not only host
                    tournaments but trade your pass, enabling you to benefit
                    more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HostCustomized;
