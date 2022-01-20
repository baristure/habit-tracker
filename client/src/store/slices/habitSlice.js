import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import habitApi from "../../common/api/habit";

export const getAllHabits = createAsyncThunk(
  "habits/getall",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await habitApi.getAllHabits(userId);
      let data = response.data;
      if (response.status === 200) {
        return data;
      } else {
        return rejectWithValue(data);
      }
    } catch (e) {
      return rejectWithValue(e.response.message);
    }
  }
);
export const markHabit = createAsyncThunk(
  "habits/mark",
  async ({ habitId, dateObj }, { rejectWithValue }) => {
    try {
      const response = await habitApi.markHabit(habitId, dateObj);
      let data = response.data;
      if (response.status === 200) {
        return data;
      } else {
        return rejectWithValue(data);
      }
    } catch (e) {
      return rejectWithValue(e.response.message);
    }
  }
);
export const addHabit = createAsyncThunk(
  "habits/add",
  async ({ userId, content }, { rejectWithValue }) => {
    console.log(userId, content);
    try {
      const response = await habitApi.addHabit(userId, content);
      let data = response.data;
      if (response.status === 201) {
        return data;
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
    code: "",
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllHabits.fulfilled, (state, { payload }) => {
      state.habits = payload;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    });
    builder.addCase(getAllHabits.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.code = payload.code;
      state.errorMessage = payload.message;
    });
    builder.addCase(getAllHabits.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(addHabit.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    });
    builder.addCase(addHabit.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.code = payload.code;
      state.errorMessage = payload.message;
    });
    builder.addCase(addHabit.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(markHabit.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    });
    builder.addCase(markHabit.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.code = payload.code;
      state.errorMessage = payload.message;
    });
    builder.addCase(markHabit.pending, (state) => {
      state.isFetching = true;
    });
  },
});

export const habitSelector = (state) => state.habit;

export const habitReducer = habitSlice.reducer;
