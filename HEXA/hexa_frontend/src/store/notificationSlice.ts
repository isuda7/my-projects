import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "",
};

const notificationSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
    },
    hideNotification: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
