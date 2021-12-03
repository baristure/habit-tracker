import httpStatus from "http-status";

import { habitService } from "../services";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/CatchAsync";

const create = catchAsync(async (req, res) => {
  const habit = await habitService.createHabit(req.body);
  if (!habit) throw new ApiError(httpStatus.NOT_FOUND, "Habit can not create");
  res.status(httpStatus.CREATED).send(habit);
});

const mark = catchAsync(async (req, res) => {
  const { dateObj, habitId } = req.body;
  if (!dateObj)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Request body date object can not be null"
    );
  if (!habitId)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Request body habitId can not be null"
    );
  const markHabit = await habitService.markHabit(habitId, dateObj);
  res.status(httpStatus.OK).send(markHabit);
});

const getOne = catchAsync(async (req, res) => {
  const habitId = req.params.habitId;
  if (!habitId)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Request params habitId can not be null"
    );
  const habit = await habitService.gethabitById(habitId);
  res.send(habit);
});

const getAll = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  if (!userId)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Request params userId can not be null"
    );
  const habits = await habitService.getHabitsByUserId(userId);
  res.send(habits);
});

const deleteOne = catchAsync(async (req, res) => {
  const { habitId } = req.body;
  if (!habitId)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Request body habitId can not be null"
    );
  const habit = await habitService.gethabitById(habitId);
  if (!habit) throw new ApiError(httpStatus.NOT_FOUND, "Habit can not found");
  await habitService.deleteOne(habitId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteAll = catchAsync(async (req, res) => {
  const { userId } = req.body;
  if (!userId)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Request body userId can not be null"
    );
  await habitService.deleteAll(userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  create,
  mark,
  getOne,
  getAll,
  deleteOne,
  deleteAll,
};
