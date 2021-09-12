import React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Cookies.get("auth-jwt") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/sign-in", state: { from: props.location } }}
        />
      )
    }
  />
);
