import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct } from "../types";

const initialState: { products: IProduct[] } = {
  products: [],
};

export const selectedProductsSlice = createSlice({
  name: "selectedProducts",
  initialState,
  reducers: {
    addSelectedProduct: (state, action: PayloadAction<IProduct>) => {
      const exists = state.products.some((product) => product.id === action.payload.id);
      if (!exists) {
        state.products.push(action.payload);
      }
    },
    removeSelectedProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
  },
});

export const { addSelectedProduct, removeSelectedProduct } = selectedProductsSlice.actions;

export default selectedProductsSlice.reducer;
