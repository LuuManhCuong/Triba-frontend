import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: [],
  },
  reducers: {
    login: (state, action) => {
      state.account = action.payload;
    },
  },
});
