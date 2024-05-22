import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filter: [],
    onFilter: false,
  },
  reducers: {
    filter: (state, action) => {
      state.filter = action.payload;
      state.onFilter = !state.onFilter;
    },
    unFilter: (state, action) => {
      state.onFilter = false;
    },
  },
});
