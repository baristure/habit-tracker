import httpStatus from "http-status";

import { userService } from "../services";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/CatchAsync";

const getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User can not found");
  res.send(user);
};

const deleteUser = async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  getUser,
  deleteUser,
};
