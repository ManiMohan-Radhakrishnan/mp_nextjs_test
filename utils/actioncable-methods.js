let nftCable,baseCable;
export const getMarketPlaceCable = async () => {
  if (!nftCable) {
    const { createConsumer } = await import("@rails/actioncable");
    nftCable = createConsumer(process.env.NEXT_PUBLIC_SOCKET_URL);
  }
  return nftCable;
};

export const getBaseCable = async () => {
  if (!baseCable) {
    const { createConsumer } = await import("@rails/actioncable");
    baseCable = createConsumer(process.env.NEXT_PUBLIC_BASE_SOCKET_URL);
  }
  return baseCable;
};

export const buyDetail = async (nftSlug, orderSlug, value) => {
  // const { createConsumer } = await import("@rails/actioncable");
  // const nftCable = createConsumer(process.env.NEXT_PUBLIC_SOCKET_URL);
  // nftCable.subscriptions.create(
  await getMarketPlaceCable();
  nftCable?.subscriptions?.create(
    { channel: "NftChannel", room: `${nftSlug}_order_buy_${orderSlug}` },
    {
      connected: () => {
        console.log("BL/AC1:Connected");
      },
      received: (data) => {
        console.log("BL/AC1:Success");
        value(data);
      },
    }
  );
};

export const bidDetail = async (slug, value) => {
  // const { createConsumer } = await import("@rails/actioncable");
  // const nftCable = createConsumer(process.env.NEXT_PUBLIC_SOCKET_URL);
  // nftCable.subscriptions.create(

  await getMarketPlaceCable();
  nftCable?.subscriptions?.create(
    { channel: "NftChannel", room: `bid_detail_${slug}` },
    {
      connected: () => {
        console.log("BL/AC2:Connected");
      },
      received: (data) => {
        console.log("BL/AC2:Success");
        value(data);
      },
    }
  );
};

export const pageView = async (slug, value) => {
  //  const { createConsumer } = await import("@rails/actioncable");
  await getMarketPlaceCable();
  nftCable?.subscriptions?.create(
    { channel: "NftChannel", room: `page_view_${slug}` },
    {
      connected: () => {
        console.log("BL/AC3:Connected");
      },
      received: (data) => {
        console.log("BL/AC3:Success");
        value(data);
      },
    }
  );
};

export const totalFav = async (slug, value) => {
  // const { createConsumer } = await import("@rails/actioncable");
  // const nftCable = createConsumer(process.env.NEXT_PUBLIC_SOCKET_URL);
  await getMarketPlaceCable();

  nftCable?.subscriptions?.create(
    { channel: "NftChannel", room: `fav_view_${slug}` },
    {
      connected: () => {
        console.log("BL/AC4:Connected");
      },
      received: (data) => {
        console.log("BL/AC4:Success");
        value(data);
      },
    }
  );
};

export const userBuyDetail = async (orderSlug, userSlug, value) => {
  // const { createConsumer } = await import("@rails/actioncable");
  // const nftCable = createConsumer(process.env.NEXT_PUBLIC_SOCKET_URL);

  await getMarketPlaceCable();

  nftCable?.subscriptions?.create(
    { channel: "NftChannel", room: `buy_detail_${orderSlug}_${userSlug}` },
    {
      connected: () => {
        console.log("BL/AC5:Connected");
      },
      received: (data) => {
        console.log("BL/AC5:Success");
        value(data);
      },
    }
  );
};

export const userBidDetail = async (orderSlug, userSlug, value) => {
  // const { createConsumer } = await import("@rails/actioncable");
  // const nftCable = createConsumer(process.env.NEXT_PUBLIC_SOCKET_URL);
  await getMarketPlaceCable();
  nftCable?.subscriptions?.create(
    { channel: "NftChannel", room: `bid_detail_${orderSlug}_${userSlug}` },
    {
      connected: () => {
        console.log("BL/AC6:Connected");
      },
      received: (data) => {
        console.log("BL/AC6:Success");
        value(data);
      },
    }
  );
};

export const listForSaleDetail = async (nftSlug, userSlug, value) => {
  // const { createConsumer } = await import("@rails/actioncable");
  // const nftCable = createConsumer(process.env.NEXT_PUBLIC_SOCKET_URL);
  await getMarketPlaceCable();
  nftCable?.subscriptions?.create(
    { channel: "NftChannel", room: `${nftSlug}_order_${userSlug}` },
    {
      connected: () => {
        console.log("BL/AC7:Connected");
      },
      received: (data) => {
        console.log("BL/AC7:Success");
        value(data);
      },
    }
  );
};

export const cancelSaleDetail = async (nftSlug, orderSlug, value) => {
  // const { createConsumer } = await import("@rails/actioncable");
  // const nftCable = createConsumer(process.env.NEXT_PUBLIC_SOCKET_URL);
  await getMarketPlaceCable();
  nftCable?.subscriptions?.create(
    { channel: "NftChannel", room: `${nftSlug}_order_cancel_${orderSlug}` },
    {
      connected: () => {
        console.log("BL/AC8:Connected");
      },
      received: (data) => {
        console.log("BL/AC8:Success");
        value(data);
      },
    }
  );
};

export const acceptBid = async (nftSlug, orderSlug, value) => {
  // const { createConsumer } = await import("@rails/actioncable");
  // const nftCable = createConsumer(process.env.NEXT_PUBLIC_SOCKET_URL);
  // nftCable.subscriptions.create(
  await getMarketPlaceCable();
  nftCable?.subscriptions?.create(
    { channel: "NftChannel", room: `${nftSlug}_accept_bid_${orderSlug}` },
    {
      connected: () => {
        console.log("BL/AC9:Connected");
      },
      received: (data) => {
        console.log("BL/AC9:Success");
        value(data);
      },
    }
  );
};

export const ownerDetails = async (slug, value) => {
  // const { createConsumer } = await import("@rails/actioncable");
  // const nftCable = createConsumer(process.env.NEXT_PUBLIC_SOCKET_URL);
  // nftCable.subscriptions.create(
  await getMarketPlaceCable();
  nftCable?.subscriptions?.create(
    { channel: "NftChannel", room: `owner_detail_${slug}` },
    {
      connected: () => {
        console.log("BL/AC10:Connected");
      },
      received: (data) => {
        console.log("BL/AC10:Success");
        value(data);
      },
    }
  );
};

export const orderPurchaseDetails = async (nftSlug, orderSlug, value) => {
  // const { createConsumer } = await import("@rails/actioncable");
  // const nftCable = createConsumer(process.env.NEXT_PUBLIC_SOCKET_URL);
  // nftCable.subscriptions.create(
  await getMarketPlaceCable();
  nftCable?.subscriptions?.create(
    { channel: "NftChannel", room: `${nftSlug}_order_purchase_${orderSlug}` },
    {
      connected: () => {
        console.log("BL/AC11:Connected");
      },
      received: (data) => {
        console.log("BL/AC11:Success");
        value(data);
      },
    }
  );
};

export const outDatedBid = async (nftSlug, orderSlug, value) => {
  // const { createConsumer } = await import("@rails/actioncable");
  // const nftCable = createConsumer(process.env.NEXT_PUBLIC_SOCKET_URL);
  // nftCable.subscriptions.create(
  await getMarketPlaceCable();
  nftCable?.subscriptions?.create(
    { channel: "NftChannel", room: `${nftSlug}_bid_outdated_${orderSlug}` },
    {
      connected: () => {
        console.log("BL/AC12:Connected");
      },
      received: (data) => {
        console.log("BL/AC12:Success");
        value(data);
      },
    }
  );
};

export const cartDetail = async (slug, value) => {
  // const { createConsumer } = await import("@rails/actioncable");
  // const nftCable = createConsumer(process.env.NEXT_PUBLIC_SOCKET_URL);
  // nftCable.subscriptions.create(

  await getMarketPlaceCable();
  nftCable?.subscriptions?.create(
    { channel: "NftChannel", room: `cart_${slug}` },
    {
      connected: () => {
        console.log("BL/AC13:Connected");
      },
      received: (data) => {
        console.log("BL/AC13:Connected");
        value(data);
      },
    }
  );
};

export const cartCheckout = async (slug, value) => {
  // const { createConsumer } = await import("@rails/actioncable");
  // const nftCable = createConsumer(process.env.NEXT_PUBLIC_SOCKET_URL);
  // nftCable.subscriptions.create(
  await getMarketPlaceCable();
  nftCable?.subscriptions?.create(
    { channel: "NftChannel", room: `cart_checkout_${slug}` },
    {
      connected: () => {
        console.log("BL/AC14:Connected");
      },
      received: (data) => {
        console.log("BL/AC14:Connected");
        value(data);
      },
    }
  );
};

export const accountDetail = async (slug, value) => {
  // const { createConsumer } = await import("@rails/actioncable");
  // const baseCable = createConsumer(process.env.NEXT_PUBLIC_BASE_SOCKET_URL);
  // baseCable.subscriptions.create(
  await getBaseCable();
  baseCable?.subscriptions?.create(
    { channel: "UserChannel", room: `account_${slug}` },
    {
      connected: () => {
        console.log("connected");
      },
      received: (data) => {
        value(data);
      },
    }
  );
};

export const leaderBoardUpdate = async (id, value) => {
  // const { createConsumer } = await import("@rails/actioncable");
  // const nftCable = createConsumer(process.env.NEXT_PUBLIC_SOCKET_URL);
  // nftCable.subscriptions.create(
  await getMarketPlaceCable();
  nftCable?.subscriptions?.create(
    { channel: "NftChannel", room: `leaderBoard_${id}` },
    {
      connected: () => {
        console.log("BL/AC17:Connected");
      },
      received: (data) => {
        console.log("BL/AC17:Connected");
        value(data);
      },
    }
  );
};

export const gameCodesAvailableQty = async (slug, value) => {
  // const { createConsumer } = await import("@rails/actioncable");
  // const baseCable = createConsumer(process.env.NEXT_PUBLIC_BASE_SOCKET_URL);
  // baseCable.subscriptions.create(
  await getBaseCable();
  baseCable?.subscriptions?.create(
    { channel: "ActivationCodeChannel", room: `tournament_${slug}` },
    {
      connected: () => {
        console.log("BL/AC15:Connected");
      },
      received: (data) => {
        console.log("BL/AC15:Success");
        value(data);
      },
    }
  );
};

export const lootAvailableQty = async (slug, value) => {
  // const { createConsumer } = await import("@rails/actioncable");
  // const baseCable = createConsumer(process.env.NEXT_PUBLIC_SOCKET_URL);
  // baseCable.subscriptions.create(
  await getMarketPlaceCable();
  nftCable?.subscriptions?.create(
    { channel: "LootChannel", room: `loot_${slug}` },
    {
      connected: () => {
        console.log("BL/AC16:Connected");
      },
      received: (data) => {
        console.log("BL/AC16:Success");
        value(data);
      },
    }
  );
};
