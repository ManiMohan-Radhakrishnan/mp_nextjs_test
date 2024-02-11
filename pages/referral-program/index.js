import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ReferralInstruction from "../../components/referral-instruction";
import ReferEarnCode from "../../components/refer-earn-code";
import ReferWin from "../../components/car-nft-components/refer-win";

const Referral = () => {
  return (
    <>
      <Header
        title={"Refer Your Friend | Refer & Get Rewarded | Jump.trade"}
        description={
          "Refer Your Friend To Buy The Exclusive $1 RADDX Car NFTs And Win Big Rewards With Our Referral Program. Refer Your Friend Now!"
        }
        image="https://cdn.guardianlink.io/product-hotspot/images/referral_OG_image_v1.jpg"
      />
      <ReferEarnCode />
      <ReferralInstruction />
      <ReferWin />

      <Footer />
    </>
  );
};

export default Referral;
