import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./reducer/counterSlice";
import { countImgSlice } from "./reducer/countImgSlice";
import { showComponentSlice } from "./reducer/showComponent";
import { accountSlice } from "./reducer/accountSlice";
import { filterSlice } from "./reducer/filterSclice";

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    countImg: countImgSlice.reducer,
    component: showComponentSlice.reducer,
    account: accountSlice.reducer,
    filter: filterSlice.reducer,
  },
});

export default store;
