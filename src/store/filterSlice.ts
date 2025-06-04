import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  location: string;
  transmission: string;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  form: string;
}

const initialState: FiltersState = {
  location: "",
  transmission: "",
  AC: false,
  bathroom: false,
  kitchen: false,
  TV: false,
  form: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    setTransmission(state, action: PayloadAction<string>) {
      state.transmission = action.payload;
    },
    setAC(state, action: PayloadAction<boolean>) {
      state.AC = action.payload;
    },
    setBathroom(state, action: PayloadAction<boolean>) {
      state.bathroom = action.payload;
    },
    setKitchen(state, action: PayloadAction<boolean>) {
      state.kitchen = action.payload;
    },
    setTV(state, action: PayloadAction<boolean>) {
      state.TV = action.payload;
    },
    setForm(state, action: PayloadAction<string>) {
      state.form = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setLocation,
  setTransmission,
  setAC,
  setBathroom,
  setKitchen,
  setTV,
  setForm,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;