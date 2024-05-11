import { createSlice } from "@reduxjs/toolkit";

export const showComponentSlice = createSlice({
  name: "component",
  initialState: {
    jobId: 0,
    component: "default",
  },
  reducers: {
    setComponent: (state, action) => {
      state.jobId = action.payload.jobId;
      state.component = action.payload.component;
      console.log("ACTION: ", action.payload);
    },
  },
});
