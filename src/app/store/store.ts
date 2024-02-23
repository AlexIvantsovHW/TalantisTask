import { configureStore } from "@reduxjs/toolkit";
import { itemApi } from "./item.api";

export const store = configureStore({
  reducer: {
    [itemApi.reducerPath]: itemApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemApi.middleware),
});
export type TypeRootState = ReturnType<typeof store.getState>;
