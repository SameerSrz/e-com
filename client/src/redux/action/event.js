import axios from "axios";
import { server } from "../../server";

// create event

export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",

    });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/product/create-events`,
      newForm,
      config,
    );
    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (err) {
    dispatch({
      type: "eventCreateFailed",
      payload: err.response.data.message,
    });
  }
};

// get All Events

export const getAllShopEvents = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllShopEventRequest",
    });
    const { data } = await axios.get(`${server}/product/get-all-events/${id}`);
    dispatch({
      type: "getAllShopEventSuccess",
      payload: data.events,
    });
  } catch (err) {
    dispatch({
      type: "getAllEventFailed",
      payload: err.response.data.message,
    });
  }
};

// delete Event of a shop

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteEventRequest",
    });
    const { data } = await axios.delete(`${server}/product/delete-shop-event/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: "deleteEventSuccess",
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: "deleteEventFailed",
      payload: err.response.data.message,
    });
  }
};

export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-events`);
    dispatch({
      type: "getAlleventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsFailed",
      payload: error.response.data.message,
    });
  }
};
