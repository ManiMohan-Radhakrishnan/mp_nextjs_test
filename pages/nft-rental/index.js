import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/footer";
import Header from "../../components/header";
import RenatalList from "../../components/rental-list";
import { getHideMenuStatus } from "../../redux/reducers/user_reducer";
import { getRentalBats, getRentalNfts } from "../../utils/base-methods";
import { invokeTrackEvent } from "../../utils/track-events";
import AppHelmet from "../../components/helmet";

const SUPPORTED_NFT_TYPES = ["players", "bats"];

export const runtime = "experimental-edge";

export async function getServerSideProps({ query, resolvedUrl }) {
  let { nftType = "players" } = query;
  let isPlayer = nftType === "players";
  let isBat = nftType === "bats";

  if (!SUPPORTED_NFT_TYPES.includes(nftType)) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  let pageData = [];
  let queryString = resolvedUrl.split("?")[1];

  try {
    let response = {};
    if (isPlayer) {
      response = await getRentalNfts(queryString || "");
      pageData = response?.data?.data?.players || [];
    }
    if (isBat) {
      response = await getRentalBats(queryString || "");
      pageData = response?.data?.data?.bats || [];
    }
  } catch (err) {
    console.log("Error in Fetching NFT List");
  }

  return {
    props: {
      pageData,
    },
  };
}

const Rental = ({ pageData }) => {
  const hideMenu = useSelector(getHideMenuStatus);

  useEffect(() => {
    invokeTrackEvent("Page Viewed", {
      "Page Name": "Rental",
      "Page URL": window?.location?.href,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {hideMenu ? (
        <></>
      ) : (
        <>
          {" "}
          <div className="loader-container">
            <div className="top-loader"></div>
          </div>
          <AppHelmet
            title={"NFTs Rent | NFTs Available For Rent  | Jump.trade"}
            description={
              "You can now rent NFT of MCL batter, bowler, and bat from the Jump.trade Marketplace. Borrow your favorite gaming NFTs and play with them."
            }
          />
          <Header />
        </>
      )}
      <RenatalList pageData={pageData} />
      {!hideMenu && <Footer />}
    </>
  );
};

export default Rental;
