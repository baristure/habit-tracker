import request from "supertest";
import faker from "faker";
import httpStatus from "http-status";

import app from "../../src/app";
import { User } from "../../src/models";
import setupTestDB from "../utils/setupTestDB";

setupTestDB();

describe("Auth routes", () => {
  describe("POST /auth/login", () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        email: faker.internet.email().toLowerCase(),
        username: faker.name.findName(),
        password: "1234567a",
      };
    });
    it("should return 201 and successfully create new user if data is ok ", async () => {
      const res = await request(app)
        .post("/api/auth/register")
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

    it("Should return 400 if email is already used", async () => {
      await request(app).post("/api/auth/register").send(newUser);

      await request(app)
        .post("/api/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("Should return 400 if username is already used", async () => {
      await request(app).post("/api/auth/register").send(newUser);

      await request(app)
        .post("/api/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should", async () => {
      await request(app).post("/api/auth/register").send(newUser);

      const loginCredentials = {
        email: newUser.email,
        username: newUser.username,
        password: newUser.password,
      };

      const res = await request(app)
        .post("/api/auth/login")
        .send(loginCredentials)
        .expect(httpStatus.OK);

      expect(res.body.user).toEqual({
        id: expect.anything(),
        email: newUser.email,
        username: newUser.username,
      });
    });
  });
});
