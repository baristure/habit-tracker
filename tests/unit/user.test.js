import faker from "faker";
import { User } from "../../src/models";
import setupTestDB from "../utils/setupTestDB";
import { expect, it } from "@jest/globals";
setupTestDB();

describe("User model tests", () => {
  let newUser;
  beforeEach(() => {
    newUser = {
      email: faker.internet.email().toLowerCase(),
      username: faker.name.findName(),
      password: "1234567a",
    };
  });

  it("Should correctly create a user", async () => {
    let error = null;
    let user = null;
    try {
      user = await User.create(newUser);
    } catch (e) {
      error = e;
    }

    expect(user.email).toEqual(newUser.email);
    expect(user.username).toEqual(newUser.username);
    expect(error).toBeNull();
  });

  it("Should not validate user without valid email", async () => {
    let error = null;
    newUser.email = "asdasd";

    try {
      const user = new User(newUser);
      await user.validate();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
  });

  it("Should not validate user without username", async () => {
    let error = null;
    newUser.username = "";

    try {
      const user = new User(newUser);
      await user.validate();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
  });

  it("Should not validate user without password", async () => {
    let error = null;
    newUser.password = "";

    try {
      const user = new User(newUser);
      await user.validate();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
  });
});
