import { toast } from "react-toastify";
import {
  addToCartApi,
  removeFromCartApi,
  getCartListApi,
  checkoutApi,
} from "../../utils/methods";
import {
  addToCartFailure,
  addToCartRequest,
  addToCartSuccess,
  checkoutEvent,
  getCartListFailure,
  getCartListRequest,
  getCartListSuccess,
  proceedCheckoutFailure,
  proceedCheckoutRequest,
  proceedCheckoutSuccess,
  removeFromCartFailure,
  removeFromCartRequest,
  removeFromCartSuccess,
} from "../reducers/user_cart_reducer";

import * as fbq from "../../utils/fbpixel";

export const add_to_cart_thunk = (order_slug, quantity) => {
  return async (dispatch) => {
    try {
      dispatch(addToCartRequest());
      const result = await addToCartApi({ order_slug, quantity });
      dispatch(addToCartSuccess(result.data.data));
      dispatch(get_cart_list_thunk());
      toast.success("The NFT is successfully added to your cart.", {
        autoClose: 2000,
      });

      // Meta Pixel
      if (process.env.NEXT_PUBLIC_MARKETING_SCRIPT === "enabled") {
        fbq.pageView();
        fbq.event("AddToCart");
      }
    } catch (err) {
      if (err?.response?.status === 404) {
        toast.error("The NFT has either been sold or no longer listed.", {
          autoClose: 2000,
        });
      }
      dispatch(addToCartFailure(err));
    }
  };
};

export const remove_from_cart_thunk = (line_item_slug) => {
  return async (dispatch) => {
    try {
      dispatch(removeFromCartRequest());
      const result = await removeFromCartApi({ line_item_slug });
      dispatch(removeFromCartSuccess(result.data.data));
      dispatch(get_cart_list_thunk());
      toast.success("Removed from cart successfully", {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      dispatch(removeFromCartFailure(err));
    }
  };
};

export const get_cart_list_thunk = () => {
  return async (dispatch) => {
    try {
      dispatch(getCartListRequest());
      const result = await getCartListApi();
      dispatch(getCartListSuccess(result.data.data));
    } catch (err) {
      console.log(err);
      dispatch(getCartListFailure(err));
    }
  };
};

export const proceed_checkout_thunk = (selectedItems) => {
  return async (dispatch) => {
    try {
      dispatch(proceedCheckoutRequest());
      const result = await checkoutApi({
        selectedItems,
      });
      dispatch(proceedCheckoutSuccess(result.data.data));
    } catch (err) {
      console.log(err);
      dispatch(proceedCheckoutFailure(err));
    }
  };
};

export const checkout_event_thunk = (event) => {
  return async (dispatch) => {
    dispatch(checkoutEvent(event));
  };
};
