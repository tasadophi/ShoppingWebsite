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
  products: [],
  allProducts: [],
  loading: false,
  cart: [],
  filters: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.cart.push(action.payload);
    },
    deleteFilters: (state) => {
      state.filters = [];
      state.products = state.allProducts;
    },
    filterProducts: (state, action) => {
      const payload = action.payload;
      if (payload.checked) state.filters.push(payload);
      else
        state.filters = state.filters.filter(
          (filter) => filter.id !== payload.id
        );
      const filteredProducts = state.allProducts.filter(
        (product) => product.category === payload.category
      );
      const products = [];
      filteredProducts.forEach((p) => {
        const specifications = p.specifications;
        state.filters.forEach((filter) => {
          specifications.forEach((s) => {
            if (s.filter === filter.type && s.value === filter.value) {
              products.push(p);
            }
          });
        });
      });
      products.length
        ? (state.products = [...new Set(products)])
        : (state.products = state.allProducts);
    },
  },
  extraReducers: {
    [getDataApi.pending]: (state) => {
      return {
        ...state,
        error: null,
        products: [],
        allProducts: [],
        loading: true,
      };
    },
    [getDataApi.fulfilled]: (state, action) => {
      return {
        ...state,
        error: null,
        products: action.payload,
        allProducts: action.payload,
        loading: false,
      };
    },
    [getDataApi.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload.message,
        products: [],
        allProducts: [],
        loading: false,
      };
    },
  },
});
export const { addProduct, filterProducts, deleteFilters } =
  productSlice.actions;
export default productSlice.reducer;
