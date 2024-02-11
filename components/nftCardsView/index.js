import NFTCard from "../nft-card";
import RaddxNFTCard from "../raddx/nft-card";
import HurleyNftCard from "../hurley/nft-card";
const NFTcards = ({
  list,
  image,
  isExplore,
  relativeUrl,
  classNames,
  celebrity,
  expandView = "",
}) => {
  return (
    <>
      {list && list.length > 0 ? (
        list.map((nft, i) => (
          <div
            key={`list-nft-${i}`}
            className={`${
              classNames === "mini-card"
                ? // ? "col-xl-3 col-lg-4 col-md-4 col-sm-6"
                  // : "col-xl-4 col-sm-6"
                  expandView === "expand-cards"
                  ? `col-xl-3 ${expandView} col-lg-3 col-md-4 col-sm-4 col-6 col-xs-6`
                  : "col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 col-xs-6"
                : expandView === "expand-cards"
                ? `col-xl-3 col-lg-4 col-sm-6`
                : "col-xl-4 col-lg-6 col-sm-6"
            }`}
          >
            {/* <NFTCard
              nft={nft}
              key={i}
              image={image}
              isExplore
              relativeUrl={relativeUrl}
              className={classNames}
            /> */}
            {celebrity === "isMcl" ? (
              <NFTCard
                nft={nft}
                key={i}
                image={image}
                isExplore
                relativeUrl={relativeUrl}
                className={classNames}
                imageUrl={"/sample.gif"}
              />
            ) : celebrity === "isRaddx" ? (
              <RaddxNFTCard
                nft={nft}
                key={i}
                image={image}
                isExplore
                relativeUrl={relativeUrl}
                className={classNames}
                imageUrl={"/sample.gif"}
              />
            ) : celebrity === "isHurley" ? (
              <HurleyNftCard
                nft={nft}
                key={i}
                image={image}
                isExplore
                relativeUrl={relativeUrl}
                className={classNames}
                imageUrl={"/sample.gif"}
              />
            ) : (
              <></>
            )}
          </div>
        ))
      ) : (
        <div className="col-12 text-center mb-5">
          <h3 className="my-3 py-5">No Records Found!</h3>
        </div>
      )}
    </>
  );
};

export default NFTcards;
