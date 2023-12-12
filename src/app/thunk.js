import { createAsyncThunk } from "@reduxjs/toolkit";
import CoinMarketServices from "../services";

const getAxiosError = (error) =>
  error.response?.data?.errors?.[0].message ?? error.message;

export const getLatestCryptoListings = createAsyncThunk(
  "crypto/list",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await CoinMarketServices.getLatestCryptoListings();
      return data;
    } catch (error) {
      return rejectWithValue(getAxiosError(error));
    }
  }
);

export const getLogos = createAsyncThunk(
  "crypto/logo",
  async (ids, { rejectWithValue }) => {
    try {
      const { data } = await CoinMarketServices.getLogos(ids);
      return data;
    } catch (error) {
      return rejectWithValue(getAxiosError(error));
    }
  }
);
