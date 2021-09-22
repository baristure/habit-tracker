// test-utils.jsx
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// Import your own reducer
import { authSlice } from "../../store/slices/authSlice";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: { auth: authSlice.reducer },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
