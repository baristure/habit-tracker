import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import habitApi from "../../common/api/habit";

export const getAllHabits = createAsyncThunk(
  "habits/getall",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await habitApi.getAllHabits(userId);
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

export const habitSlice = createSlice({
  name: "habit",
  initialState: {
    habits: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllHabits.fulfilled, (state, { payload }) => {
      console.log("payload->>", payload);
      // state.habits = payload;
      // state.isFetching = false;
      // state.isSuccess = true;
      return state;
    });
    builder.addCase(getAllHabits.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });
    builder.addCase(getAllHabits.pending, (state) => {
      state.isFetching = true;
    });
  },
});
export const { clearState } = habitSlice.actions;

export const habitSelector = (state) => state.habit;

export const habitReducer = habitSlice.reducer;
