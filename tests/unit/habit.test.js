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
      email: faker.internet.email().toLowerCase(),
      content: faker.random.word(),
      index: 0,
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
      expect(habit.email).toEqual(newHabit.email);
      expect(habit.content).toEqual(newHabit.content);
      habit.dates.forEach((date, index) => {
        expect(date).toMatchObject(newHabit.dates[index]);
      });
      expect(habit.index).toEqual(newHabit.index);
      expect(habit.dates).toEqual(newHabit.dates);
      expect(habit.status).toEqual(newHabit.status);
      expect(error).toBeNull();
    } catch (e) {
      error = e;
    }
  });
  it("Should not validate a habit without valid email", async () => {
    let error = null;
    newHabit.email = "asdasd";

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
  it("Should be create a habit default status true", async () => {
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
