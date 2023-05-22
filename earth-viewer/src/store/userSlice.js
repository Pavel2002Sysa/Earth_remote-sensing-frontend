import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  avatar: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (slice, action) => {
      slice.name = action.payload;
    },
    setAvatar: (slice, action) => {
      slice.avatar = action.payload;
    },
  },
});

export const { setAvatar, setName } = userSlice.actions;
export const userReducer = userSlice.reducer;
