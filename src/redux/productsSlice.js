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
      state.filtersCheck = null;
    },

    filterProducts: (state, action) => {
      const payload = action.payload;
      state.filters = {};
      if (payload.byClick) {
        payload.search.forEach((filter) => {
          const key = Object.keys(filter)[0];
          state.filters[key] = Boolean(filter[key]);
        });
      }
      const filteredProducts = state.allProducts.filter(
        (product) => product.category === payload.category
      );
      const products = [];
      const filters = state.filters;
      const filterKeys = Object.keys(filters);
      filteredProducts.forEach((p) => {
        const productFilter = {};
        const specifications = p.specifications;
        specifications.forEach((s) => {
          filterKeys.forEach((filterKey) => {
            const [filter] = filterKey.split("_");
            if (
              s.filter === filter &&
              Object.keys(state.filters).includes(s.filter + "_" + s.value)
            ) {
              productFilter[filterKey] = true;
            }
          });
          Object.keys(productFilter).length === filterKeys.length &&
            products.push(p);
        });
      });
      if (products.length) {
        state.products = [...new Set(products)];
      } else {
        if (filterKeys[0]) state.products = ["false"];
        else state.products = state.allProducts;
      }
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
