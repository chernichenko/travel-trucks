import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filterSlice";
import campersReducer from "./camperSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    campers: campersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;