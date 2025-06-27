import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesreducer from "./moviesSlice";
import GPTReducer from "./GPTSlice";
import configReducer from "./configSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesreducer,
    GPT: GPTReducer,
    config: configReducer,
  },
});

export default appStore;
