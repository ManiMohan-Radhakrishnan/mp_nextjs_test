import NFTCardImage from "../nft-card-image";
import style from "./style.module.scss";
const NFTcardsImages = ({
  list,
  image,
  isExplore,
  relativeUrl,
  classNames,
  topClassName,
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
                ? expandView === "expand-cards"
                  ? `col-xl-3 ${expandView} col-lg-3 col-md-4 col-sm-4 col-6 col-xs-6`
                  : "col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6" // col-xs-12
                : expandView === "expand-cards"
                ? `col-xl-3 col-lg-4 col-sm-6`
                : "col-xl-4 col-lg-6 col-sm-6"
            }`}
          >
            <NFTCardImage
              nft={nft}
              key={i}
              image={image}
              isExplore
              relativeUrl={relativeUrl}
              className={classNames}
              imageUrl={"/sample.gif"}
              topClassName={topClassName}
            />
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

export default NFTcardsImages;
