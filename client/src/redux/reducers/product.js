import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, {
  // Create Product
  productCreateRequest: (state) => {
    state.isLoading = true;
  },
  productCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  },
  productCreateFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
  // Get All Products
  getAllProductRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
  },
  getAllProductFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // Delete Product
  deleteProductRequest: (state) => {
    state.isLoading = true;
  },
  deleteProductSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteProductFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // get all products
  getAllProductsRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.allProducts = action.payload;
  },
  getAllProductsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
});
