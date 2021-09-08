import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./slices/authSlice";
import userReducer from "./slices/userSlice";

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
 
  },
});
