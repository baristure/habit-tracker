import React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";

import { refreshUserFromCookie } from "../../store/slices/authSlice";
export const PrivateRoute = ({ component: Component, ...rest }) => {
  const userCookie = Cookies.get("auth-jwt");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  if (!user.username?.length && userCookie) dispatch(refreshUserFromCookie());

  return (
    <Route
      {...rest}
      render={(props) =>
        userCookie ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/sign-in", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
