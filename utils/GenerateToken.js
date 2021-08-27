import { sign } from "jsonwebtoken";
import config from "../config/config";
import moment from "moment";

const expires = moment().add(config.jwt.accessExpirationMinutes, "minutes");
const secret = config.jwt.secretKey;

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return sign(payload, secret);
};

module.exports = generateToken;
