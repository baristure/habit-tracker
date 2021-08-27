import httpStatus from "http-status";
import { sign } from "jsonwebtoken";
import passport from "passport";

import ApiError from "../utils/ApiError";
import catchAsync from "../utils/CatchAsync";
import passportConfig from "../config/passport";
import config from "../config/config";
import { userService } from "../services";
import generateToken from "../utils/GenerateToken";

const register = catchAsync(async (req, res) => {
  const { email } = req.body;
  if (email === null || email === "")
    throw new ApiError(httpStatus.BAD_REQUEST, "Email can not be blank");
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await userService.loginUserWithUsernameAndPassword(
    username,
    password
  );
  const token = generateToken(user.id);
  let response = {
    isAuthenticated: true,
    user,
    token,
  };
  res.status(httpStatus.OK).send(response);
});

const logout = catchAsync(async (req, res) => {
  let response = { user: { email: "", username: "" }, success: true };
  res.status(httpStatus.NO_CONTENT).send(response);
});

module.exports = {
  register,
  login,
  logout,
};
