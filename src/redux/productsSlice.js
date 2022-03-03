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
  filters: {},
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.cart.push(action.payload);
    },
    deleteFilters: (state) => {
      state.filters = {};
      state.products = state.allProducts;
    },
    filterProducts: (state, action) => {
      const payload = action.payload;
      if (payload.checked)
        state.filters.hasOwnProperty(payload.type)
          ? state.filters[payload.type].push(payload.value)
          : (state.filters[payload.type] = [payload.value]);
      else {
        const newFilters = state.filters[payload.type].filter(
          (filterValue) => filterValue !== payload.value
        );
        newFilters.length
          ? (state.filters[payload.type] = newFilters)
          : delete state.filters[payload.type];
      }
      const filteredProducts = state.allProducts.filter(
        (product) => product.category === payload.category
      );
      const products = [];
      const filterKeys = Object.keys(state.filters);
      filteredProducts.forEach((p) => {
        const productFilter = {};
        const specifications = p.specifications;
        specifications.forEach((s) => {
          filterKeys.forEach((filterKey) => {
            if (
              s.filter === filterKey &&
              state.filters[filterKey].includes(s.value)
            ) {
              productFilter[filterKey] = true;
            }
          });
          if (Object.keys(productFilter).length === filterKeys.length)
            products.push(p);
        });
      });
      products.length
        ? (state.products = [...new Set(products)])
        : filterKeys.length
        ? (state.products = ["false"])
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
