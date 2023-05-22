import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setView: (slice, action) => {
      slice.name = action.payload;
    },
  },
});

export const { setView } = viewSlice.actions;
export const viewReducer = viewSlice.reducer;
