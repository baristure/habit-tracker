import { Habit } from "../../src/models";

const createHabit = async ({ userId, content, status }) => {
  return await Habit.create({ userId, content, status });
};

module.exports = {
  createHabit,
};
