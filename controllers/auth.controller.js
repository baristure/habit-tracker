import httpStatus from "http-status";
import { sign } from "jsonwebtoken";
import passport from "passport";

import ApiError from "../utils/ApiError";
import catchAsync from "../utils/CatchAsync";
import passportConfig from "../config/passport";
import config from "../config/config";
import { userService } from "../services";
import Signtoken from "../utils/TokenGenerate";

const login = catchAsync(async (req, res) => {
  if (req.isAuthenticated()) {
    const { _id, email, username } = req.user;
    const token = Signtoken(_id);
    res.cookie("access_token", token, { httpOnly: true, sameSite: true });
    let response = { isAuthenticated: true, user: { email, username } };
    res.status(httpStatus.OK).send(response);
  }
});

const logout = catchAsync(async (req, res) => {
  let response = { user: { email: "", username: "" }, success: true };
  res.clearCookie("access_token");
  res.status(httpStatus.OK).send(response);
});

module.exports = {
  login,
  logout,
};
