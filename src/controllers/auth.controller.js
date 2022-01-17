import httpStatus from "http-status";
import auth from "../middlewares/auth";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/CatchAsync";
import passportConfig from "../config/passport";
import config from "../config/config";
import { userService } from "../services";
import { generateToken, generateRefreshToken } from "../utils/GenerateToken";

const register = catchAsync(async (req, res) => {
  const { email, username, password } = req.body;
  if (email === null || email === "")
    throw new ApiError(httpStatus.BAD_REQUEST, "Email can not be blank");
  if (username === null || username === "")
    throw new ApiError(httpStatus.BAD_REQUEST, "Username can not be blank");
  if (password === null || password === "")
    throw new ApiError(httpStatus.BAD_REQUEST, "Password can not be blank");
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
  const refreshtoken = generateRefreshToken(user.id);
  const response = {
    isAuthenticated: true,
    user,
    token,
    refreshtoken,
  };
  res.status(httpStatus.OK).send(response);
});

const refreshUser = catchAsync(async (req, res) => {
  const user = await auth.resolveUser(req);
  const token = generateToken(user.id);
  const refreshtoken = generateRefreshToken(user.id);

  const response = {
    isAuthenticated: true,
    user,
    token,
    refreshtoken,
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
  refreshUser,
};
