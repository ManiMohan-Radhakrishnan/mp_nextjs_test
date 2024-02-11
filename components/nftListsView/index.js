import NFTlistcard from "../nft-list";
import style from "./style.module.scss";
const NFTLists = ({ list, image, isExplore, relativeUrl, classNames }) => {
  return (
    <>
      {/* <div
        key={`list-nft-${i}`}
        className={`${classNames === "mini-list" ? "col-xl-12" : "col-xl-12"}`}
      ></div> */}

      <header
        className={`${style["nft-list-flex-header"]} ${style[classNames]}`}
      >
        <article
          className={`${style["nft-list-row-box"]} ${style["nft-list-items"]} `}
        >
          <div className={`${style["nft-list-col-box"]}`}>#</div>
          {/* <div className={`${style["nft-list-col-box"]}`}>NFT </div> */}
          <div className={`${style["nft-list-col-box"]}`}>NFT </div>
          {/* <div className={`${style["nft-list-col-box"]}`}>NFT Type </div> */}

          {/* <div className={`${style["nft-list-col-box"]}`}>Rank</div>
          <div className={`${style["nft-list-col-box"]}`}>Category</div>
          <div className={`${style["nft-list-col-box"]}`}>Stats</div> */}
          <div className={`${style["nft-list-col-box"]}`}>Owner </div>
          <div className={`${style["nft-list-col-box"]}`}>Buy</div>
          <div className={`${style["nft-list-col-box"]}`}>Bid</div>
          <div className={`${style["nft-list-col-box"]}`}>Auction Timer</div>

          <div className={`${style["nft-list-col-box"]}`}>Cart</div>
        </article>
      </header>
      <main className={`${style["nft-list-flex-body"]} ${style[classNames]} `}>
        {list && list.length > 0 ? (
          list.map((nft, i) => (
            <NFTlistcard
              nft={nft}
              key={i}
              keyValue={i}
              image={image}
              isExplore
              relativeUrl={relativeUrl}
              className={classNames}
            />
          ))
        ) : (
          <article className="text-center">
            <h3 className="my-3 py-5">No Records Found!</h3>
          </article>
        )}
      </main>
    </>
  );
};

export default NFTLists;
