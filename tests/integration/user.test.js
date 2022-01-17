import request from "supertest";
import httpStatus from "http-status";

import config from "../../src/config/config";
import app from "../../src/app";
import setupTestDB from "../utils/setupTestDB";
import { insertUsers, userOne, userTwo } from "../utils/InsertUsers";
import { generateToken } from "../../src/utils/GenerateToken";

setupTestDB();

describe("User routes", () => {
  describe("GET /users/:userId", () => {
    test("Should return 200 and the user object if data is ok", async () => {
      await insertUsers([userOne]);
      const userOneAccessToken = generateToken(userOne._id);
      const res = await request(app)
        .get(`/api/users/${userOne._id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).not.toHaveProperty("password");
      expect(res.body).toEqual({
        id: userOne._id.toHexString(),
        email: userOne.email,
        username: userOne.username,
      });
    });

    test("Should return 401 error if access token is missing", async () => {
      await insertUsers([userOne]);
      await request(app)
        .get(`/api/users/${userOne._id}`)
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    });

    test("Should return 400 error if userId is not a valid mongo id", async () => {
      await insertUsers([userOne]);
      const userOneAccessToken = generateToken(userOne._id);
      await request(app)
        .get("/api/users/invalidId")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 404 error if user is not found", async () => {
      await insertUsers([userOne]);
      const userOneAccessToken = generateToken(userOne._id);
      await request(app)
        .get(`/api/users/610eddfa0e0ca7302871321b`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("DELETE /users/:userId", () => {
    test("Should return 401 error if access token is missing", async () => {
      await insertUsers([userOne]);
      await request(app)
        .get(`/api/users/delete/${userOne._id}`)
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    });

    test("Should return 400 error if userId is not a valid mongo id", async () => {
      await insertUsers([userOne]);
      const userOneAccessToken = generateToken(userOne._id);
      await request(app)
        .get("/api/users/delete/invalidId")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 404 error if user is not found", async () => {
      await insertUsers([userOne]);
      const userOneAccessToken = generateToken(userOne._id);

      await request(app)
        .get(`/api/users/delete/${userTwo._id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
    test("should return 204 error if user is delete", async () => {
      await insertUsers([userOne]);
      const userOneAccessToken = generateToken(userOne._id);

      await request(app)
        .get(`/api/users/delete/${userOne._id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.NO_CONTENT);
    });
  });
});
