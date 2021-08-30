import request from "supertest";
import faker from "faker";
import httpStatus from "http-status";

import app from "../../src/app";
import { User } from "../../src/models";
import setupTestDB from "../utils/setupTestDB";
import { insertUsers, userOne } from "../utils/InsertUsers";
import generateToken from "../../src/utils/GenerateToken";

setupTestDB();

describe("Auth routes", () => {
  describe("POST /auth/register", () => {
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

    test("Should return 400 if email is already used", async () => {
      insertUsers([userOne]);

      await request(app)
        .post("/api/auth/register")
        .send(userOne)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("Should return 400 if username is already used", async () => {
      insertUsers([userOne]);

      await request(app)
        .post("/api/auth/register")
        .send(userOne)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("Should return 400 if password is null", async () => {
      newUser.password = null;

      await request(app)
        .post("/api/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("POST /auth/login", () => {
    test("should return 200 and successfully user and token information", async () => {
      insertUsers([userOne]);
      const userOneAccessToken = generateToken(userOne._id);
      const res = await request(app)
        .post("/api/auth/login")
        .send(userOne)
        .expect(httpStatus.OK);

      expect(res.header["set-cookie"][0].split(";")[0]).toEqual(
        `jwt=${userOneAccessToken}`
      );

      expect(res.body).toBeDefined();
      expect(res.body).toMatchObject({
        isAuthenticated: true,
        user: {
          username: userOne.username,
          email: userOne.email,
          id: userOne._id.toString(),
        },
        token: userOneAccessToken,
      });
    });
    test("should return 401 if username is wrong", async () => {
      insertUsers([userOne]);
      userOne.username = "wrongname";
      const res = await request(app)
        .post("/api/auth/login")
        .send(userOne)
        .expect(httpStatus.UNAUTHORIZED);

      const data = JSON.parse(res.text);

      expect(data).toBeDefined();
      expect(data).toMatchObject({
        code: httpStatus.UNAUTHORIZED,
        message: "Incorrect username or password",
      });
    });
    test("should return 401 if password is wrong", async () => {
      insertUsers([userOne]);
      userOne.password = "wrongpassword";
      const res = await request(app)
        .post("/api/auth/login")
        .send(userOne)
        .expect(httpStatus.UNAUTHORIZED);

      const data = JSON.parse(res.text);

      expect(data).toBeDefined();
      expect(data).toMatchObject({
        code: httpStatus.UNAUTHORIZED,
        message: "Incorrect username or password",
      });
    });
    test("should return 401 if user has not contain", async () => {
      await request(app)
        .post("/api/auth/login")
        .send(userOne)
        .expect(httpStatus.UNAUTHORIZED);
    });
  });

  describe("POST /auth/logout", () => {
    test("should return 204 and logout successfully ", async () => {
      const res = await request(app)
        .post("/api/auth/logout")
        .send()
        .expect(httpStatus.NO_CONTENT);
      expect(res.header["set-cookie"][0].split(";")[0]).toEqual("jwt=");
      expect(res.body).toBeDefined();
      expect(res.body).toMatchObject({});
    });
  });
});
