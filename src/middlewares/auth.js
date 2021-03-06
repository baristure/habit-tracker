import passport from "passport";
import httpStatus from "http-status";

import ApiError from "../utils/ApiError";
import passportConfig from "../config/passport";

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
  }
  resolve(user);
};

const checkAuth = () => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
      );
    } else {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject)
      )(req, res, next);
    }
  })
    .then(() => next())
    .catch((err) => next(err));
};

const resolveUser = (req) => {
  return new Promise((resolve, reject) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
      );
    } else {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject)
      )(req);
    }
  })
    .then((user) => {
      return user;
    })
    .catch((err) => next(err));
};

module.exports = {
  checkAuth,
  resolveUser,
};
