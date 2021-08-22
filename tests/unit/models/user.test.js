import faker from "faker";
import { User } from "../../../models";
import setupTestDB from "../../utils/setupTestDB";

setupTestDB();

describe("User model tests", () => {
  describe("User validation", () => {
    let newUser;

    beforeEach(() => {
      newUser = {
        email: faker.internet.email().toLowerCase(),
        username: faker.name.findName(),
        password: "1234567a",
      };
    });

    it("Should correctly create a user", async () => {
      const user = await User.create(newUser);
      expect(user.email).toEqual(newUser.email);
      expect(user.username).toEqual(newUser.username);
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
});