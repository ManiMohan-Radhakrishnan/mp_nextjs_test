import { BiX } from "react-icons/bi";

import style from "./style.module.scss";

const ErrorText = ({ type, handleClick = () => {}, title, desc }) => {
  if (type === "nobalance") {
    return (
      <div className={style["error-container"]}>
        <div className={style["error-text"]}>
          Insufficient funds in your wallet
        </div>
        <div>
          <button
            type="button"
            onClick={() =>
              window.open(
                `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/wallet`,
                "_self"
              )
            }
            className={`${style["btn-error-button"]} rounded rounded-pill`}
          >
            Recharge Wallet
          </button>
        </div>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className="error-container">
        <BiX
          className="btn-cls"
          size={16}
          role="button"
          onClick={handleClick}
        />
        <div className="error-details">
          <div className="error-title">{title}</div>
          <div className="error-counter">{desc}</div>
        </div>
      </div>
    );
  }

  return null;
};

export default ErrorText;
