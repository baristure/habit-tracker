import faker from "faker";
import { Habit } from "../../src/models";
import setupTestDB from "../utils/setupTestDB";
import { expect, it } from "@jest/globals";
setupTestDB();

describe("Habit model test", () => {
  let newHabit;

  beforeEach(() => {
    jest.setTimeout(10000);
    newHabit = {
      userId: require("mongoose").Types.ObjectId(),
      content: faker.random.word(),
      dates: [
        {
          date: "2021-10-10",
          complete: false,
        },
        {
          date: "2021-10-11",
          complete: false,
        },
        {
          date: "2021-10-12",
          complete: true,
        },
      ],
      status: true,
    };
  });

  it("Should correctly create a new habit", async () => {
    let error = null;
    try {
      const habit = await Habit.create(newHabit);
      expect(habit.userId).toEqual(newHabit.userId);
      expect(habit.content).toEqual(newHabit.content);
      habit.dates.forEach((date, index) => {
        expect(date).toMatchObject(newHabit.dates[index]);
      });
      expect(habit.dates).toEqual(newHabit.dates);
      expect(habit.status).toEqual(newHabit.status);
      expect(error).toBeNull();
    } catch (e) {
      error = e;
    }
  });
  it("Should not validate a habit without valid userId", async () => {
    let error = null;
    newHabit.userId = "1112asd";
    try {
      const habit = new Habit(newHabit);
      await habit.validate();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
  });
  it("Should not validate a habit with empty content", async () => {
    let error = null;
    newHabit.content = "";

    try {
      const habit = new Habit(newHabit);
      await habit.validate();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
  });
  it("Should be create a habit default status equal to true", async () => {
    let error = null;
    let habit = null;
    newHabit.status = null;
    try {
      habit = await Habit.create(newHabit);
      expect(habit.status).toEqual(true);
      expect(error).toBeNull();
    } catch (e) {
      error = e;
    }
  });
});
