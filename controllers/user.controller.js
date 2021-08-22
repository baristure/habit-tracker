import httpStatus from "http-status";

import { userService } from "../services";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/CatchAsync";

const createUser = catchAsync(async (req, res) => {
  const { email } = req.body;
  if (email === null || email === "")
    throw new ApiError(httpStatus.BAD_REQUEST, "Email can not be blank");
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

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
  createUser,
  getUser,
  deleteUser,
};
