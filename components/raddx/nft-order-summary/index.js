import _ from "lodash";

import Badge from "./badge";
import {
  abbreviateNumber,
  currencyFormat,
  percDiff,
} from "../../../utils/common";

// import style from "./style.module.scss";

const NFTOrderSummary = ({
  nft,
  // socketData
  totalBid,
  bidChange,
  totalBuy,
  price,
  totalViews,
  totalFavourites,
  isOwner,
  className,
  bundleInfo,
  isBundle,
}) => {
  const erc721 = nft.nft_type === "erc721";
  const isBid = _.get(nft, "order_details.is_bid", false);
  const orderDetails = _.get(nft, "order_details", {});
  return (
    <section className={`${className}`}>
      <div className="container-fluid">
        <div className="row">
          <div
            className={`d-flex ${
              isOwner ? "justify-content-around" : "justify-content-center"
            } flex-wrap flex-row point-box`}
          >
            <div className="p-4 point-list">
              {erc721 && isBid ? (
                <Badge
                  title="Price"
                  // value={
                  //   price
                  //     ? currencyFormat(price, "USD")
                  //     : nft.minimum_bid && currencyFormat(nft.minimum_bid, "USD")
                  // }
                  value={(() => {
                    if (price && price >= 1000) {
                      return `$${abbreviateNumber(price)}`;
                    } else if (price && price < 1000) {
                      return currencyFormat(price, "USD");
                    } else if (
                      orderDetails.minimum_bid &&
                      orderDetails.minimum_bid >= 1000
                    ) {
                      return `$${abbreviateNumber(orderDetails.minimum_bid)}`;
                    } else {
                      return currencyFormat(orderDetails.minimum_bid, "USD");
                    }
                  })()}
                  // diff="+2000"
                  diff={
                    bidChange ? bidChange : orderDetails.bid_change.toFixed(2)
                  }
                  tooltip="Price increased from last bid"
                />
              ) : (
                <Badge
                  title="Price"
                  value={
                    price
                      ? currencyFormat(price, "USD")
                      : orderDetails.buy_amount &&
                        currencyFormat(orderDetails.buy_amount, "USD")
                  }
                  // diff="-2000"
                  tooltip="Buy price"
                />
              )}
            </div>
            {erc721 && isBid && (
              <div className="p-4 point-list">
                <Badge
                  title="Base Price"
                  value={(() => {
                    if (orderDetails.starting_bid >= 1000) {
                      return `$${abbreviateNumber(orderDetails.starting_bid)}`;
                    } else {
                      return currencyFormat(orderDetails.starting_bid, "USD");
                    }
                  })()}
                  // diff="+2000"
                  // diff={bidChange ? bidChange : orderDetails.bid_change}
                  diff={
                    price
                      ? percDiff(orderDetails.starting_bid, price)
                      : percDiff(
                          orderDetails.starting_bid,
                          orderDetails.minimum_bid
                        )
                  }
                  tooltip="Initial Seller-Listed Price"
                />
              </div>
            )}
            <div className="p-4 point-list">
              {erc721 && isBid ? (
                <Badge
                  title="Bids"
                  value={totalBid ? totalBid : orderDetails.total_bids}
                />
              ) : (
                <Badge
                  title="Buys"
                  value={
                    totalBuy
                      ? totalBuy
                      : orderDetails.total_buys
                      ? orderDetails.total_buys
                      : 0
                  }
                />
              )}
            </div>
            {/* {isOwner && (
              <div className="p-4 point-list">
                <Badge
                  title="Views"
                  value={totalViews ? totalViews : orderDetails.page_views}
                />
              </div>
            )} */}
            <div className="p-4 point-list">
              <Badge
                title="Favourites"
                value={totalFavourites ? totalFavourites : nft.total_favourites}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NFTOrderSummary;
