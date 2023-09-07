import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, {
  // Get All user orders
  getAllOrderRequest: (state) => {
    state.isLoading = true;
  },
  getAllOrderSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  },
  getAllOrderFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // Get All seller orders
  getAllSellerOrderRequest: (state) => {
    state.isLoading = true;
  },
  getAllSellerOrderSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  },
  getAllSellerOrderFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // Delete order
  deleteOrderRequest: (state) => {
    state.isLoading = true;
  },
  deleteOrderSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteOrderFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // get all orders for admin
  adminAllOrdersRequest: (state) => {
    state.adminOrderLoading = true;
  },
  adminAllOrdersSuccess: (state, action) => {
    state.adminOrderLoading = false;
    state.adminOrders = action.payload;
  },
  adminAllOrdersFailed: (state, action) => {
    state.adminOrderLoading = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
});
