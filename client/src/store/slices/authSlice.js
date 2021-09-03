import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {},
    logout: (state, action) => {},
    register: (state, action) => {},
  },
});

export const { login, logout, register } = authSlice.actions;

export default authSlice.reducer;
