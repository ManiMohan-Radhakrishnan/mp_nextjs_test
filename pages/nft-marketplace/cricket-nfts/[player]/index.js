import { nftShowAllApi } from "../../../../utils/methods";
import listedNftRequest from "../../../../utils/request-config.js";
import ExploreAllNFT from "../../../../components/explore/explore-all-nft";
import Footer from "../../../../components/footer";
import { getExplorePageMetaData } from "../../../../utils/common";
import { CELEBRITIES } from "../../../../utils/celebrity-config";
export const runtime = "experimental-edge";

const PlayerPath = ({ listedNFTs, pageMetaData, celebrity }) => {
  return (
    <>
      <ExploreAllNFT
        data={listedNFTs}
        metaData={pageMetaData}
        celebrity={celebrity}
      />
      <Footer />
    </>
  );
};

export default PlayerPath;

export async function getServerSideProps({ query }) {
  let { player = "default" } = query;
  let props = {
    pageMetaData: getExplorePageMetaData(player),
    celebrity: CELEBRITIES.mcl.name,
  };
  try {
    let listedNFTreq = listedNftRequest(query, CELEBRITIES.mcl.name);

    if (!listedNFTreq)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };

    let showNFTs = await nftShowAllApi(listedNFTreq);
    props = {
      ...props,
      listedNFTs: showNFTs?.data,
    };
  } catch (err) {
    console.error(
      `Error in ${err?.config?.url}\nstatus : ${err?.response?.status}\nMessage : ${err?.response?.statusMessage}`
    );
    // return errorRedirect(err?.status);
  }
  return { props };
}
