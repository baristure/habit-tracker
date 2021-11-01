import httpStatus from "http-status";

import { Habit } from "../models";
import ApiError from "../utils/ApiError";

/**
 * Create a habit
 * @param {Object} habitBody
 * @returns {Promise<Habit>}
 */
const createHabit = async (habitBody) => {
  if (await isHave(habitBody).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The user already have this habit."
    );
  }
  return Habit.create(habitBody);
};

/**
 * Get habit by id
 * @param {ObjectId} id
 * @returns {Promise<Habit>}
 */
const gethabitById = async (id) => {
  return Habit.findById(id);
};

/**
 * Get habit by email and content
 * @param {email} userEmail
 * @param {content} content
 * @returns {Promise<[Habits]>}
 */
const isHave = async ({ email, content }) => {
  return Habit.find({ email, content });
};

/**
 * Get habit by email
 * @param {Email} email
 * @returns {Promise<Habits>}
 */
const getHabitsByEmail = async (email) => {
  return Habit.find({ email });
};

/**
 * Mark habit as done or not done
 * @param {ObjectId} id
 * @param {dateObj} date
 * @returns {Promise<Habit>}
 */
const markHabit = async (habitId, dateObj) => {
  const habit = await gethabitById(habitId);
  if (!habit) {
    throw new ApiError(httpStatus.NOT_FOUND, "Habit can not found");
  }
  if (!habit.dates.some((item) => item.date === dateObj.date)) {
    habit.dates.push(dateObj);
    await habit.save();
  } else {
    habit.dates.map((item) => {
      if (item.date === dateObj.date) item.complete = dateObj.complete;
    });
    await habit.save();
  }
  return habit;
};

/**
 * Delete habit by id
 * @param {ObjectId} habitId
 * @returns {Promise<Boolean>}
 */
const deleteOne = async (habitId) => {
  const habit = await gethabitById(habitId);
  if (!habit) {
    throw new ApiError(httpStatus.NOT_FOUND, "Habit can not found");
  }
  await habit.remove();
  return true;
};
/**
 * Delete users all habits by email
 * @param {Email} email
 * @returns {Promise<Boolean>}
 */
const deleteAll = async (email) => {
  const habits = await getHabitsByEmail(email);
  if (!habits) {
    throw new ApiError(httpStatus.NOT_FOUND, "Habits can not found");
  }
  await Habit.deleteMany({ email });
  return true;
};

module.exports = {
  createHabit,
  gethabitById,
  getHabitsByEmail,
  markHabit,
  deleteOne,
  deleteAll,
};
