import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from ".";

interface AccountState {
  accountVisible: boolean | null;
  currentPasswordVisible: boolean | null;
  changePasswordVisible: boolean | null;
  historyVisible: boolean | null;
  changeEmailVisible: boolean | null;
  changeEmailAddress: boolean | null;
  newEmailAddress: string | null;
  passwordVisible: boolean | null;
}

const initialState: AccountState = {
  accountVisible: false,
  currentPasswordVisible: false,
  changePasswordVisible: false,
  historyVisible: false,
  changeEmailVisible: false,
  changeEmailAddress: false,
  newEmailAddress: "",
  passwordVisible: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountVisible: (state, action: PayloadAction<boolean>) => {
      state.accountVisible = action.payload;
    },
    setCurrentPasswordVisible: (state, action: PayloadAction<boolean>) => {
      state.currentPasswordVisible = action.payload;
    },
    setChangePasswordVisible: (state, action: PayloadAction<boolean>) => {
      state.changePasswordVisible = action.payload;
    },
    setHistoryVisible: (state, action: PayloadAction<boolean>) => {
      state.historyVisible = action.payload;
    },
    setChangeEmailVisible: (state, action: PayloadAction<boolean>) => {
      state.changeEmailVisible = action.payload;
    },
    setChangeEmailAddress: (state, action: PayloadAction<boolean>) => {
      state.changeEmailAddress = action.payload;
    },
    setNewEmailAddress: (state, action: PayloadAction<string>) => {
      state.newEmailAddress = action.payload;
    },
    setPasswordVisible: (state, action: PayloadAction<boolean>) => {
      state.passwordVisible = action.payload;
    },
  },
});

export const {
  setAccountVisible,
  setCurrentPasswordVisible,
  setChangePasswordVisible,
  setHistoryVisible,
  setChangeEmailVisible,
  setChangeEmailAddress,
  setNewEmailAddress,
  setPasswordVisible,
} = accountSlice.actions;

// export const selectCount = (state: RootState) => state.account.visible;

export default accountSlice.reducer;
