import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import authApi from "../../api/auth";

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await authApi.login(username, password);
      let data = response.data;

      if (response.status === 200) {
        let resDataStr = JSON.stringify(data);
        Cookies.set("auth-jwt", resDataStr);
        return { ...data };
      } else if (response.status === 401) {
        return thunkAPI.rejectWithValue(data);
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("e", e);
      return thunkAPI.rejectWithValue(e.response);
    }
  }
);

export const registerUser = createAsyncThunk(
  "users/register",
  async ({ email, username, password }, thunkAPI) => {
    try {
      const response = await authApi.login(username, password);
      let data = response.data;
      console.log(response.data);
      if (response.status === 200) {
        let resDataStr = JSON.stringify(data);
        Cookies.set("auth-jwt", resDataStr);
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: "",
    email: "",
    id: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    isAuthenticated: null,
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.isAuthenticated = null;
      return state;
    },
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, { payload }) => {},
    [registerUser.rejected]: (state, { payload }) => {},
    [registerUser.pending]: (state) => {},
    [loginUser.fulfilled]: (state, { payload }) => {
      console.log("fullfilled payload", payload);
      console.log(state);
      state.email = payload.user.email;
      state.username = payload.user.username;
      state.id = payload.user.id;
      state.isFetching = false;
      state.isSuccess = true;
      console.log(state);
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log("rejected payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
  },
});
export const { clearState } = authSlice.actions;

export const authSelector = (state) => state.auth;
