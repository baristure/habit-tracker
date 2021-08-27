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
  const token = req.cookies.jwt;
  return new Promise((resolve, reject) => {
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

module.exports = {
  checkAuth,
};
