import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const eventReducer = createReducer(initialState, {
  // Create event
  eventCreateRequest: (state) => {
    state.isLoading = true;
  },
  eventCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.event = action.payload;
    state.success = true;
  },
  eventCreateFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
  // Get All events
  getAllShopEventRequest: (state) => {
    state.isLoading = true;
  },
  getAllShopEventSuccess: (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
  },
  getAllEventFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // Delete event
  deleteEventRequest: (state) => {
    state.isLoading = true;
  },
  deleteEventSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteEventFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // get all events
  getAlleventsRequest: (state) => {
    state.isLoading = true;
  },
  getAlleventsSuccess: (state, action) => {
    state.isLoading = false;
    state.allEvents = action.payload;
  },
  getAlleventsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
});
