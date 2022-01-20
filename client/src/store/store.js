import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./slices/authSlice";
import { habitReducer } from "./slices/habitSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    habit: habitReducer,
  },
});
