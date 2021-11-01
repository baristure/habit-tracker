import httpStatus from "http-status";

import { habitService } from "../services";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/CatchAsync";

const create = catchAsync(async (req, res) => {
  const habit = await habitService.createHabit(req.body);
  if (!habit) throw new ApiError(httpStatus.NOT_FOUND, "Habit can not create");
  res.send(habit);
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
  res.send(markHabit);
});

const getOne = catchAsync(async (req, res) => {
  const habit = await habitService.gethabitById(req.params.habitId);
  res.send(habit);
});

const getAll = catchAsync(async (req, res) => {
  const { email } = req.body;
  const habits = await habitService.getHabitsByEmail(email);
  res.send(habits);
});

const deleteOne = catchAsync(async (req, res) => {
  const habit = await habitService.gethabitById(req.params.habitId);
  if (!habit) throw new ApiError(httpStatus.NOT_FOUND, "Habit can not found");
  await habitService.deleteOne(req.params.habitId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteAll = catchAsync(async (req, res) => {
  const { email } = req.body;
  await habitService.deleteAll(email);
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
