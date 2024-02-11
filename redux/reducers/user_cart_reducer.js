import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  checkout: false,
  loading: false,
  error: false,
  errorData: {},
};

const userCartSlice = createSlice({
  name: "userCart",
  initialState,
  reducers: {
    addToCartRequest(state) {
      return { ...state, loading: true };
    },
    addToCartSuccess(state, { payload }) {
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          total_count: payload.count,
        },
      };
    },
    addToCartFailure(state, { payload }) {
      return { ...state, loading: false, error: true, errorData: payload };
    },
    removeFromCartRequest(state) {
      return { ...state, loading: true };
    },
    removeFromCartSuccess(state, { payload }) {
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          total_count: payload.count,
        },
      };
    },
    removeFromCartFailure(state, { payload }) {
      return { ...state, loading: false, error: true, errorData: payload };
    },
    getCartListRequest(state) {
      return { ...state, loading: true };
    },
    getCartListSuccess(state, { payload }) {
      return {
        ...state,
        loading: false,
        data: payload,
      };
    },
    getCartListFailure(state, { payload }) {
      return { ...state, loading: false, error: true, errorData: payload };
    },
    proceedCheckoutRequest(state) {
      return { ...state, loading: true };
    },
    proceedCheckoutSuccess(state, { payload }) {
      return {
        ...state,
        loading: false,
        data: payload,
      };
    },
    proceedCheckoutFailure(state, { payload }) {
      return { ...state, loading: false, error: true, errorData: payload };
    },
    clearCart() {
      return initialState;
    },
    checkoutEvent(state, { payload }) {
      return { ...state, checkout: payload };
    },
  },
});

// Selectors
export const getUserCart = (state) => state.userCart;

export const {
  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,
  removeFromCartRequest,
  removeFromCartSuccess,
  removeFromCartFailure,
  getCartListRequest,
  getCartListSuccess,
  getCartListFailure,
  proceedCheckoutRequest,
  proceedCheckoutSuccess,
  proceedCheckoutFailure,
  clearCart,
  checkoutEvent,
} = userCartSlice.actions;

export default userCartSlice.reducer;
