import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getData from "../services/getData";

export const getDataApi = createAsyncThunk(
  "products/getDataApi",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getData();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

let initialState = {
  error: null,
  products: {},
  loading: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    [getDataApi.pending]: (state) => {
      return { ...state, error: null, products: {}, loading: true };
    },
    [getDataApi.fulfilled]: (state, action) => {
      return {
        ...state,
        error: null,
        products: action.payload,
        loading: false,
      };
    },
    [getDataApi.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload.message,
        products: {},
        loading: false,
      };
    },
  },
});
export const { initData } = productSlice.actions;
export default productSlice.reducer;
