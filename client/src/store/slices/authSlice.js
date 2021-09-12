import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import authApi from "../../common/api/auth";

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await authApi.login(username, password);
      let data = response.data;

      if (response.status === 200 && data.isAuthenticated) {
        let resDataStr = JSON.stringify(data);
        Cookies.set("auth-jwt", resDataStr);
        return { ...data };
      } else {
        return rejectWithValue(data);
      }
    } catch (e) {
      return rejectWithValue(e.response.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "users/register",
  async ({ email, username, password }, { rejectWithValue }) => {
    try {
      const response = await authApi.register(email, username, password);
      let data = response.data;
      if (response.status === 201) {
        return { ...data };
      } else {
        return rejectWithValue(data);
      }
    } catch (e) {
      return rejectWithValue(e.response.message);
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
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.email = payload.email;
      state.username = payload.username;
      state.id = payload.id;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.email = payload.user.email;
      state.username = payload.user.username;
      state.id = payload.user.id;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isFetching = true;
    });
  },
});
export const { clearState } = authSlice.actions;

export const authSelector = (state) => state.auth;

export const authReducer = authSlice.reducer;
