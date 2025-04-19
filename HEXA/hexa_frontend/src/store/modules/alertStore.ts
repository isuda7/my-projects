import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "",
  title: "",
  type: "alert",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.open = true;
      state.title = action.payload.title
        ? action.payload.title
        : '';
      state.message = action.payload.message;
      state.type = action.payload.type
        ? action.payload.type
        : initialState.type;
    },
    hideAlert: (state) => {
      state.open = false;
      state.message = initialState.message;
      state.type = initialState.type;
      state.title = '';
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
