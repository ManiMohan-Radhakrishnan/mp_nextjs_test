import appAxios from "./axios-utils";
import blogAxios from "./axios-blog-base-utils";
import { ParamsSerialize } from "./params-serialize";

export const nftCategoriesApi = ({ page, parent_slug }) =>
  appAxios.get(`/dashboard/categories?page=${page}`, {
    params: {
      parent_slug,
    },
    paramsSerializer: (params) => {
      return ParamsSerialize(params);
    },
  });

export const nftCategoryDetailApi = ({ slug }) =>
  appAxios.get(`/categories/${slug}`);

export const nftCategoryListApi = ({ slug, page, filter = {}, sort }) =>
  appAxios.get(`/categories/${slug}/nfts?page=${page}`, {
    params: { filter, sort },
    paramsSerializer: (params) => {
      return ParamsSerialize(params);
    },
  });

export const nftShowAllApi = ({ page, per_page, filter = {}, sort }) =>
  appAxios.get(`/dashboard/index?page=${page}&per_page=${per_page}`, {
    params: {
      filter,
      sort,
      time: new Date().getTime(),
    },
    paramsSerializer: (params) => {
      return ParamsSerialize(params);
    },
  });

export const nftExplorePageInternalApi = ({
  page,
  per_page,
  filter = {},
  sort,
}) =>
  appAxios.get(`/dashboard/evqcrhcrwe?page=${page}&per_page=${per_page}`, {
    params: {
      filter,
      sort,
      time: new Date().getTime(),
    },
    paramsSerializer: (params) => {
      return ParamsSerialize(params);
    },
  });

export const hotNFTsApi = ({ page }) =>
  appAxios.get(`/dashboard/hot_nfts?page=${page}`);

export const liveAuctionNFTsApi = (
  page = 1,
  sort = "auction_ending_soon",
  filter
) =>
  appAxios.get(`/dashboard/live_auctions?page=${page}&sort=${sort}`, {
    params: { filter },
    paramsSerializer: (params) => {
      return ParamsSerialize(params);
    },
  });

export const topSellersApi = ({ page, time_format }) =>
  appAxios.get(
    `/dashboard/top_sellers?page=${page}&time_format=${time_format}`
  );

export const topBuyerApi = ({ page, time_format }) =>
  appAxios.get(`/dashboard/top_buyers?page=${page}&time_format=${time_format}`);

export const nftDetailApi = ({ nft_slug, order_slug }) => {
  if (order_slug) {
    return appAxios.get(`/nfts/${nft_slug}?order_slug=${order_slug}`, {
      params: {
        time: new Date().getTime(),
      },
      paramsSerializer: (params) => {
        return ParamsSerialize(params);
      },
    });
  } else {
    return appAxios.get(`/nfts/${nft_slug}`, {
      params: {
        time: new Date().getTime(),
      },
      paramsSerializer: (params) => {
        return ParamsSerialize(params);
      },
    });
  }
};

export const nftMoreApi = ({ page }) => appAxios.get(`/nfts/more?page=${page}`);

export const nftBuyHistory = ({ nft_slug, page }) =>
  appAxios.get(`/nfts/${nft_slug}/buy_history?page=${page}`);

export const nftBidHistory = ({ nft_slug, page }) =>
  appAxios.get(`/nfts/${nft_slug}/bid_history?page=${page}`);

export const nftTransactionHistory = ({ nft_slug, page, order_slug }) => {
  if (order_slug) {
    return appAxios.get(
      `/nfts/${nft_slug}/transaction_histories?page=${page}`,
      {
        params: {
          order_slug: order_slug,
        },
        paramsSerializer: (params) => {
          return ParamsSerialize(params);
        },
      }
    );
  } else {
    return appAxios.get(`/nfts/${nft_slug}/transaction_histories?page=${page}`);
  }
};

export const orderBidHistory = ({ order_slug, page }) =>
  appAxios.get(`/orders/${order_slug}/bid_history?page=${page}`);

export const orderPurchaseDetailsApi = ({ order_slug, page }) =>
  appAxios.get(`/orders/${order_slug}/purchase_details?page=${page}`);

export const nftBidWinner = ({ order_slug }) =>
  appAxios.get(`/orders/${order_slug}/bid_winner`);

export const nftOwnerApi = ({ nft_slug, page }) =>
  appAxios.get(`/nfts/${nft_slug}/owners?page=${page}`);

// export const nftBuyApi = (props) =>
//   appAxios.post("/buys", { order: { ...props } });

// export const nftBidApi = (props) =>
//   appAxios.post("/bids", { nft: { ...props } });

export const nftMakeFav = ({ nft_slug }) =>
  appAxios.post(`/nfts/${nft_slug}/fav`);

export const nftMakeUnFav = ({ nft_slug }) =>
  appAxios.post(`/nfts/${nft_slug}/unfav`);

export const lootBuyApi = (props) =>
  appAxios.post("/buys/loot_box", { nft: { ...props } });

export const putOnSaleApi = ({ slug, order }) =>
  appAxios.post(`/nfts/${slug}/orders`, { order: order });

export const nftBuyApi = ({ order_slug, order }) =>
  appAxios.post(`/orders/${order_slug}/buy`, { order });

export const nftBundleBuyApi = ({ order }) =>
  appAxios.post(`/orders/bundle_buy`, { order });

export const nftBidApi = ({ order_slug, order }) =>
  appAxios.post(`/orders/${order_slug}/bid`, { order });

export const bidSaleCancelApi = ({ order_slug }) =>
  appAxios.post(`/orders/${order_slug}/bid_cancel`);

export const saleCancelApi = ({ order_slug }) =>
  appAxios.post(`/orders/${order_slug}/sale_cancel`);

export const bundleSaleCancelApi = (order) =>
  appAxios.post(`/orders/bundle_cancel`, { order });

export const buySaleCancelApi = ({ order_slug, order }) =>
  appAxios.post(`/orders/${order_slug}/buy_cancel`, { order });

export const acceptBidApi = ({ order_slug, order }) =>
  appAxios.post(`/orders/${order_slug}/accept_bid`, { order });

// export const sellerFavedNFTSApi = ({ slug, page }) =>
//   appAxios.get(`/users/${slug}/faved?page=${page}`);

export const sellerFavedNFTSApi = ({ slug, page }) =>
  appAxios.get(`/users/${slug}/faved?page=${page}`, {
    params: {
      size: "20",
    },
    paramsSerializer: (params) => {
      return ParamsSerialize(params);
    },
  });

// export const sellerOwnedNFTsApi = ({ slug, page }) =>
//   appAxios.get(`/users/${slug}/owned?page=${page}`);

export const sellerOwnedNFTsApi = ({ slug, page }) =>
  appAxios.get(`/users/${slug}/owned?page=${page}`, {
    params: {
      size: "20",
    },
    paramsSerializer: (params) => {
      return ParamsSerialize(params);
    },
  });

// export const userOnsaleNFTsApi = ({ slug, page }) =>
//   appAxios.get(`/users/${slug}/onsale?page=${page}`);

export const userOnsaleNFTsApi = ({ slug, page }) =>
  appAxios.get(`/users/${slug}/onsale?page=${page}`, {
    params: {
      size: "20",
    },
    paramsSerializer: (params) => {
      return ParamsSerialize(params);
    },
  });

export const userProfileDetailApi = ({ slug }) =>
  appAxios.get(`/users/${slug}/marketplace_profile`);

export const nftRecentlySoldApi = (
  page = 1,
  sort = "recently_sold",
  from_dashboard = "true"
) =>
  appAxios.get(
    `/nfts/stats/market_trades?page=${page}&sort=${sort}&from_dashboard=${from_dashboard}`
  );

export const nftRecentlySoldApiList = (page = 1, sort = "recently_sold") =>
  appAxios.get(`/nfts/stats/market_trades?page=${page}&sort=${sort}`);
export const userFavedNFTOrders = (page) =>
  appAxios.get(`/users/faved_orders?page=${page}`);

export const trendingNFTsApi = (page, sort = "price_desc", filter) =>
  appAxios.get(`/dashboard/trending_nfts?page=${page}&sort=${sort}`, {
    params: {
      filter,
    },
    paramsSerializer: (params) => {
      return ParamsSerialize(params);
    },
  });

export const addToCartApi = ({ order_slug, quantity }) =>
  appAxios.post(`/carts/add_to_cart`, { id: order_slug, quantity });

export const removeFromCartApi = ({ line_item_slug }) =>
  appAxios.delete(`/carts/remove_cart/${line_item_slug}`);

export const clearCartApi = () => appAxios.delete(`/carts/empty_cart`);

export const getCartListApi = () => appAxios.get(`/carts/cart_line_items`);

export const checkoutApi = ({ selectedItems }) =>
  appAxios.post(`/carts/proceed_checkout`, {
    line_item_ids: selectedItems,
  });
export const getBlogListApi = () =>
  blogAxios.get(`/wp-json/wp/v2/posts?_embed`);
export const getBlogCattApi = () => blogAxios.get(`/wp-json/wp/v2/categories/`);

export const getBlogCateListApi = () =>
  blogAxios.get(`/wp-json/wp/v2/posts?_embed&per_page=100`);

export const getBlogMetaApi = ({ slug }) =>
  blogAxios.get(
    `wp-json/yoast/v1/get_head?url=https://blog.jump.trade/${slug}/`
  );

export const nftUpgradeHistory = ({ nft_slug, page, order_slug }) => {
  if (order_slug) {
    return appAxios.get(`/nfts/${nft_slug}/upgrade_history?page=${page}`, {
      params: {
        order_slug: order_slug,
      },
      paramsSerializer: (params) => {
        return ParamsSerialize(params);
      },
    });
  } else {
    return appAxios.get(`/nfts/${nft_slug}/upgrade_history?page=${page}`);
  }
};

export const nftActiveOrders = ({ nft_slug }) =>
  appAxios.get(`/nfts/${nft_slug}/active_orders`);

export const randomOrders = (page = 1, status = "onsale", sale = "onbuy") =>
  appAxios.get(
    `/dashboard/random_orders?page=${page}&status=${status}&sale=${sale}`
  );

export const lootBoxPrebookApi = (slug, request) =>
  appAxios.post(`/loots/${slug}/preorders/preorder_users`, request);

export const lootBoxBuyApi = (slug, request) =>
  appAxios.put(`/loots/${slug}`, request);

export const getNftPriceBreakup = (params) =>
  appAxios.get(`/users/payment_splits`, { params });

export const getPrebookPriceBreakup = ({ slug, request: preorder }) =>
  appAxios.put(`/loots/${slug}/preorders/splitup`, { preorder });

export const getDropPriceBreakup = ({ slug, request: loot }) =>
  appAxios.put(`/loots/${slug}/splitup`, { loot });

export const getTransferNftMenu = () => appAxios.get(`/users/drop_available`);
