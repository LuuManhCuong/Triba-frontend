import { createSlice } from "@reduxjs/toolkit";

export const countImgSlice = createSlice({
  name: "countImg",
  initialState: {
    value: 0,
  },
  reducers: {
    increase: (state, action) => {
      state.value = action.payload;
      // console.log(action.payload);
    },
    descrease: (state, action) => {
      state.value = action.payload;
    },
  },
});
