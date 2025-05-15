import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { api } from "./api"
import selectedProductsReducer from "./selectedProductsSlice"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    selectedProducts: selectedProductsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
