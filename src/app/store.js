import { configureStore } from "@reduxjs/toolkit";
import cryptoSlice from "./slice";

export const store = configureStore({
  reducer: {
    crypto: cryptoSlice,
  },
});
