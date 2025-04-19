import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  accessToken: string | null;
  userId: string | null;
  showMenuCheck: number;
}

const initialState: AuthState = {
  accessToken: null,
  userId: null,
  showMenuCheck: 1,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUserInfomation: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setShowMenuCheck: (state, action) => {
      state.showMenuCheck = action.payload;
    },
  },
});

export const { setToken, setUserInfomation, setShowMenuCheck } =
  authSlice.actions;

export default authSlice.reducer;
