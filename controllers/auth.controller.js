import httpStatus from "http-status";
import { sign } from "jsonwebtoken";
import passport from "passport";

import ApiError from "../utils/ApiError";
import catchAsync from "../utils/CatchAsync";
import passportConfig from "../config/passport";
import config from "../config/config";

const signToken = (userID) => {
  return sign(
    {
      iss: config.secretKey,
      id: userID,
    },
    config.secretKey,
    { expiresIn: "1h" }
  );
};

const register = catchAsync(async (req, res) => {
  const { email, username, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    if (user)
      res.status(400).json({
        message: { msgBody: "Email is already taken", msgError: true },
      });
    else {
      const newUser = new User({ email, username, password });
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else
          res.status(201).json({
            message: {
              msgBody: "Account successfully created",
              msgError: false,
            },
          });
      });
    }
  });
});
const login = catchAsync(async (req, res) => {
  if (req.isAuthenticated()) {
    const { _id, email, username } = req.user;
    const token = signToken(_id);
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
  register,
};
