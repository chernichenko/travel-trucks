import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICamper } from "../types";

interface CampersState {
  campers: ICamper[];
  totalCount: number;
  loading: boolean;
  offset: number;
  limit: number;
}

const initialState: CampersState = {
  campers: [],
  totalCount: 0,
  loading: false,
  offset: 0,
  limit: 4,
};

const camperSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    setCampers(state, action: PayloadAction<ICamper[]>) {
      state.campers = action.payload;
    },
    appendCampers(state, action: PayloadAction<ICamper[]>) {
      state.campers = [...state.campers, ...action.payload];
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload;
    },
  },
});

export const {
  setCampers,
  appendCampers,
  setTotalCount,
  setLoading,
  setOffset,
} = camperSlice.actions;

export default camperSlice.reducer;