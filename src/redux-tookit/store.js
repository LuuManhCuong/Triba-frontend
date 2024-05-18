import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./reducer/counterSlice";
import { countImgSlice } from "./reducer/countImgSlice";
import { showComponentSlice } from "./reducer/showComponent";
import { accountSlice } from "./reducer/accountSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    countImg: countImgSlice.reducer,
    component: showComponentSlice.reducer,
    account: accountSlice.reducer,
  },
});

export default store;
