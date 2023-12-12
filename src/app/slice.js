import { createSlice } from "@reduxjs/toolkit";
import { getLatestCryptoListings, getLogos } from "./thunk.js";

const initialState = {
  cryptoList: {
    data: null,
    errorMessage: null,
    isLoading: false,
  },
  coinInfos: {
    data: null,
    errorMessage: null,
    isLoading: false,
  },
};

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setCoinLogons: (state) => {
      state.coinInfos.data = [];
    },
    setCryptoList: (state) => {
      state.cryptoList.data = [];
    },
  },
  extraReducers: (builder) => {
    //cryptoList
    builder.addCase(getLatestCryptoListings.rejected, (state, { payload }) => {
      state.cryptoList.errorMessage = payload;
      state.isLoading = false;
    });
    builder.addCase(getLatestCryptoListings.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.cryptoList.data = payload;
      // state.cryptoList.data.data = state.cryptoList.data?.data?.map((item) =>
      // payload.data.forEach((payLoadItem) => {
      //   return item.id === payLoadItem.id
      //     ? { ...item, img: payLoadItem.id }
      //     : item;
      // });
      // );
      // for (item in state.cryptoList.data.data) {
      //   console.data;
      // }
      // console.log(payload);
      // state.cryptoList.isLoading = false;
      // state.cryptoList.errorMessage = null;
    });
    builder.addCase(getLatestCryptoListings.pending, (state) => {
      state.cryptoList.isLoading = true;
      state.cryptoList.errorMessage = null;
    });

    // Logos
    builder.addCase(getLogos.rejected, (state, { payload }) => {
      console.log(payload);
      state.coinInfos.errorMessage = payload;
      state.isLoading = false;
    });
    builder.addCase(getLogos.fulfilled, (state, { payload }) => {
      // console.log(payload.data);
      state.cryptoList.data.data = state.cryptoList.data.data.map((item) => {
        // const coinInfo = payload.data.find(
        //   (payLoadItem) => item.id === payLoadItem.id
        // );
        return { ...item, info: payload.data[item.id] };
      });
      state.coinInfos.isLoading = false;
      state.coinInfos.errorMessage = null;
    });
    builder.addCase(getLogos.pending, (state) => {
      state.coinInfos.isLoading = true;
      state.coinInfos.errorMessage = null;
    });
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = cryptoSlice.actions;

export default cryptoSlice.reducer;
