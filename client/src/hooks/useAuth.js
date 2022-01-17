import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import jwt from "jsonwebtoken";
import {
  clearState,
  refreshUserFromCookie,
  refreshUser,
} from "../store/slices/authSlice";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  try {
    const authState = useSelector((state) => state.auth);
    if (authState.username) return true;
    const userCookie = Cookies.get("auth-jwt");
    if (!userCookie) return false;
    const cookieJson = JSON.parse(userCookie);
    let refreshCookie = false;
    let refreshToken = false;
    jwt.verify(cookieJson.token, "topSecretKey", function (err, decoded) {
      if (err) {
        console.log("1");
        jwt.verify(
          cookieJson.refreshtoken,
          "topSecretKey",
          function (error, refdecoded) {
            if (error) {
              Cookies.remove("auth-jwt");
            } else {
              refreshToken = true;
            }
          }
        );
      } else {
        refreshCookie = true;
      }
    });
    if (refreshCookie) {
      console.log("refreshCookie  dispatch");
      dispatch(refreshUserFromCookie());
    } else if (refreshToken) {
      Cookies.remove("auth-jwt");
      console.log("refreshToken  dispatch", cookieJson.refreshtoken);
      let token = cookieJson.refreshtoken;
      dispatch(refreshUser({ token }));
    } else {
      Cookies.remove("auth-jwt");
      console.log("clearState  dispatch");
      dispatch(clearState());
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
