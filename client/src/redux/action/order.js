import axios from "axios";
import { server } from "../../server";

// create product

// export const createProduct = (newForm) => async(dispatch)=>{
//     try{
//         dispatch({
//             type: "productCreateRequest",

//         })
//         const config  = {headers: {"Content-Type" : "multipart/form-data"}}
//         const {data} = await axios.post(`${server}/product/create-product`,
//         newForm,
//         config
//         )
//         dispatch({
//             type: "productCreateSuccess",
//             payload: data.products
//         })
//     }catch(err){
//         dispatch({
//             type: "productCreateFailed",
//             payload: err.response.data.message,
//         })
//     }
// }

// get All orders of user

export const getAllOrders = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrderRequest",
    });
    const { data } = await axios.get(`${server}/order/get-user-orders/${userId}`);
    dispatch({
      type: "getAllOrderSuccess",
      payload: data.orders,
    });
  } catch (err) {
    dispatch({
      type: "getAllOrderFailed",
      payload: err.response.data.message,
    });
  }
};

// get All orders of seller

export const getAllSellerOrders = (sellerId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllSellerOrderRequest",
    });
    const { data } = await axios.get(`${server}/order/get-seller-orders/${sellerId}`);
    dispatch({
      type: "getAllSellerOrderSuccess",
      payload: data.orders,
    });
  } catch (err) {
    dispatch({
      type: "getAllSellerOrderFailed",
      payload: err.response.data.message,
    });
  }
};

// delete order of a shop
export const orderProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteOrderRequest",
    });
    const { data } = await axios.delete(`${server}/order/delete-shop-order/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: "deleteOrderSuccess",
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: "deleteOrderFailed",
      payload: err.response.data.message,
    });
  }
};

// get all orders of Admin
export const getAllOrdersOfAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminAllOrdersRequest",
    });

    const { data } = await axios.get(`${server}/order/get-all-orders`, {
      withCredentials: true,
    });

    dispatch({
      type: "adminAllOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "adminAllOrdersFailed",
      payload: error.response.data.message,
    });
  }
};
