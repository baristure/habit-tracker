import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    getUserById: (state, action) => {},
    deleteUser: (state, action) => {},
  },
});

export const { getUserById, deleteUser } = userSlice.actions;

export default userSlice.reducer;
