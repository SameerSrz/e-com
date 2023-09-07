import axios from "axios";
import { server } from "../../server";

// create product

export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",

    });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config,
    );
    dispatch({
      type: "productCreateSuccess",
      payload: data.products,
    });
  } catch (err) {
    dispatch({
      type: "productCreateFailed",
      payload: err.response.data.message,
    });
  }
};

// get All products

export const getAllProducts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductRequest",
    });
    const { data } = await axios.get(`${server}/product/get-all-products/${id}`);
    dispatch({
      type: "getAllProductSuccess",
      payload: data.products,
    });
  } catch (err) {
    dispatch({
      type: "getAllProductsFailed",
      payload: err.response.data.message,
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });
    const { data } = await axios.delete(`${server}/product/delete-shop-product/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: "deleteProductFailed",
      payload: err.response.data.message,
    });
  }
};

// get all products
export const AllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};
