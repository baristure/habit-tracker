import request from "supertest";
import faker from "faker";
import httpStatus from "http-status";

import app from "../../app";
import { User } from "../../models";
import setupTestDB from "../utils/setupTestDB";

setupTestDB();

describe("User routes", () => {
  describe("POST /users/register", () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        email: faker.internet.email().toLowerCase(),
        username: faker.name.findName(),
        password: "1234567a",
      };
    });

    test("should return 201 and successfully create new user if data is ok ", async () => {
      const res = await request(app)
        .post("/api/users/register")
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body).not.toHaveProperty("password");
      expect(res.body).toEqual({
        id: expect.anything(),
        username: newUser.username,
        email: newUser.email,
      });

      const checkUser = await User.findById(res.body.id);
      expect(checkUser).toBeDefined();
      expect(checkUser.password).not.toBe(newUser.password);
      expect(checkUser).toMatchObject({
        username: newUser.username,
        email: newUser.email,
      });
    });
  });
});
