import { nftActiveOrders, nftDetailApi } from "../../../utils/methods";
import { errorRedirect } from "../../../utils/common";
import {
  getDetailsComponent,
  getOrderDetailsComponent,
} from "../../../utils/celebrity-config";

const NFTDetails = (props) => {
  const OrderDetailsComponent = getOrderDetailsComponent(
    props?.currentPage,
    props?.nft?.game_name
  );

  const DetailsComponent = getDetailsComponent(
    props?.currentPage,
    props?.nft?.game_name
  );

  return (
    <>
      {OrderDetailsComponent && (
        <OrderDetailsComponent
          CurrentOrderSlug={props?.orderSlug}
          details={true}
          nftData={props?.nft}
        />
      )}
      {DetailsComponent && <DetailsComponent nftData={props?.nft} />}
    </>
  );
};

export async function getServerSideProps({ query }) {
  const props = {};
  const { slug: nft_slug } = query;
  try {
    let [transactions, nft] = await Promise.all([
      nftActiveOrders({
        nft_slug,
      }),
      nftDetailApi({
        nft_slug,
      }),
    ]);

    if (transactions?.data?.data?.orders.length) {
      props.orderSlug = transactions?.data?.data?.orders[0];
      props.currentPage = "orderdetails";
    } else {
      props.currentPage = "details";
    }

    props.nft = nft?.data?.data?.nft;
  } catch (err) {
    return errorRedirect(err?.response?.status);
  }
  return { props };
}

export default NFTDetails;
