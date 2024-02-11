import Image from "next/image";
import { useHistory } from "react-router-dom";
import { currencyFormat } from "../../utils/common";

const CancelNft = ({ nft, order, image, modalShow, setModalShow }) => {
  const history = useHistory();
  return (
    <article className="cancel-nft">
      <div className="image-block">
        <Image
          unoptimized={true}
          height={60}
          width={60}
          src={image}
          alt="nfImages"
          loading="lazy"
        />
      </div>
      <div className="info-block">
        <h5 className="name">{nft?.name}</h5>
        <ul className="nft-info">
          <li className="quantity">
            <span className="key">Quantity</span>
            <span className="value">{`${order.available_quantity} / ${order.total_quantity}`}</span>
          </li>
          <li className="price">
            <span className="key">Price</span>
            <span className="value">
              {currencyFormat(order.buy_amount, "USD")}
            </span>
          </li>
        </ul>
      </div>
      <button
        type="button"
        className="btn btn-dark text-center mt-2 rounded-pill cancel-btn"
        onClick={() => {
          setModalShow(!modalShow);
          window.open(
            `${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/order/details/${nft.slug}/${order.slug}`,
            "_self"
          );
        }}
      >
        Cancel
      </button>
    </article>
  );
};

export default CancelNft;
