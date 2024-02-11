import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Footer from "../../components/footer";
import { setCookiesByName } from "../../utils/cookies";
import ExploreAllNFT from "../../components/explore/explore-all-nft.js";

const ExploreAll = () => {
  // const router = useRouter();
  // const fsz = router.fsz;

  // useEffect(() => {
  //   if (fsz) {
  //     sessionStorage.setItem("fsz", fsz);
  //     setCookiesByName("fsz", fsz);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      {/* <ExploreAllNFT
        metaData={{
          metaTitle: "Explore NFT Collection | Jump.trade",
          metaDescription:
            "Get your hands on some of the most prized and highly collectible cricket NFTs at Jump.trade. Buy, sell, & collect exclusive NFTs today.",
        }}
      />
      <Footer /> */}
    </>
  );
};

export default ExploreAll;
