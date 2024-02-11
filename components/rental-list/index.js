import { useState } from "react";
import { BsFilter } from "react-icons/bs";
import RentalNft from "../rental-nft";
import style from "./style.module.scss";

const RenatalList = ({ pageData }) => {
  const [showCanvas, toggleCanvas] = useState(false);
  return (
    <>
      <section className={`${style["rental-collection-section"]}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={`${style["rental-collection-header"]}`}>
                <h1>
                  <span>
                    NFTs Available For Rent{" "}
                    <sup className={style["beta-sup"]}>Beta</sup>
                  </span>
                  <div className={`${style["filter-icon-box"]}`}>
                    <BsFilter onClick={() => toggleCanvas(!showCanvas)} />
                  </div>
                </h1>
                <p>
                  You can borrow a maximum of 1 Batter NFT, 1 Bowler NFT, and 1
                  Bat NFT
                </p>
              </div>
              <RentalNft
                pageData={pageData}
                showCanvas={showCanvas}
                onHide={() => toggleCanvas(false)}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RenatalList;
