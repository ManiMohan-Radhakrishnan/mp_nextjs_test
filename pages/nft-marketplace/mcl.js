import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { parse } from "url";

import Footer from "../../components/footer";
import { setCookiesByName } from "../../utils/cookies";
import ExploreAllNFT from "../../components/explore/explore-all-nft.js";
import listedNftRequest from "../../utils/request-config";
import {
  nftShowAllApi,
  nftExplorePageInternalApi,
} from "../../utils/internal-methods";
import { CELEBRITIES } from "../../utils/celebrity-config";
import { getMetaDetails } from "../../utils/common";
import App from "next/app";
import AppHelmet from "../../components/helmet";

const ExploreAll = ({ listedNFTs, celebrity, meta_information }) => {
  const router = useRouter();
  const fsz = router.fsz;
  useEffect(() => {
    if (fsz) {
      sessionStorage.setItem("fsz", fsz);
      setCookiesByName("fsz", fsz);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const metaDetails = meta_information;

  return (
    <>
      <AppHelmet
        title={metaDetails?.title}
        description={metaDetails?.description}
        image={metaDetails?.image}
      />
      <ExploreAllNFT data={listedNFTs} celebrity={celebrity} />
      <Footer />
    </>
  );
};

export default ExploreAll;

export async function getServerSideProps({ query, req }) {
  const urlName = parse(req.url);
  const metaDetails = getMetaDetails(urlName?.pathname);
  let props = { celebrity: CELEBRITIES.mcl.name };
  try {
    let listedNFTreq = listedNftRequest(query, CELEBRITIES.mcl.name);
    if (!listedNFTreq)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };

    let showNFTs = await nftExplorePageInternalApi(listedNFTreq);
    props = {
      ...props,
      listedNFTs: showNFTs?.data,
      meta_information: metaDetails,
    };
  } catch (err) {
    console.error("Error", err);
  }
  return { props };
}
