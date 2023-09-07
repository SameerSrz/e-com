import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const item = action.payload;
    const isItemExist = state.cart.find((i) => i._id === item._id);
    if (isItemExist) {
      return {
        ...state,
        cart: state.cart.map((i) => (i._id === isItemExist._id ? item : i)),
      };
    }
    return {
      ...state,
      cart: [...state.cart, item],
    };
  },

  removeFromCart: (state, action) => ({
    ...state,
    cart: state.cart.filter((i) => i._id !== action.payload),
  }),
});
