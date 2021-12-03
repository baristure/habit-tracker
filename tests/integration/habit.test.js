import request from "supertest";
import faker from "faker";
import httpStatus from "http-status";

import config from "../../src/config/config";
import app from "../../src/app";
import setupTestDB from "../utils/setupTestDB";
import { insertUsers, userOne } from "../utils/InsertUsers";
import { createHabit } from "../utils/CreateHabit";
import generateToken from "../../src/utils/GenerateToken";

setupTestDB();
describe("Habit routes ", () => {
  let newHabit;
  beforeEach(() => {
    newHabit = {
      userId: require("mongoose").Types.ObjectId(),
      content: faker.lorem.words(2),
      status: true,
    };
  });
  describe("POST /habit/add", () => {
    it("Should return 200 and the habit object if data is ok", async () => {
      await insertUsers([userOne]);
      const userOneAccessToken = generateToken(userOne._id);
      const res = await request(app)
        .post("/api/habit/add")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newHabit)
        .expect(httpStatus.CREATED);

      expect(res.body).toMatchObject({
        _id: expect.anything(),
        userId: expect.anything(),
        content: newHabit.content,
        status: true,
        dates: [],
      });
    });

    it("Should return 401 error if access token is missing", async () => {
      await insertUsers([userOne]);
      await request(app)
        .post(`/api/habit/add`)
        .send(newHabit)
        .expect(httpStatus.UNAUTHORIZED);
    });

    it("Should return 400 if userId is null or invalid mongoId", async () => {
      await insertUsers([userOne]);
      const userOneAccessToken = generateToken(userOne._id);
      newHabit.userId = "";
      await request(app)
        .post(`/api/habit/add`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newHabit)
        .expect(httpStatus.BAD_REQUEST);
    });

    it("Should return 400 if content is null", async () => {
      await insertUsers([userOne]);
      const userOneAccessToken = generateToken(userOne._id);
      newHabit.content = "";
      await request(app)
        .post(`/api/habit/add`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newHabit)
        .expect(httpStatus.BAD_REQUEST);
    });
    it("should return 400 user has same habit ", async () => {
      await insertUsers([userOne]);
      const userOneAccessToken = generateToken(userOne._id);
      const habit = await createHabit({
        userId: userOne._id,
        content: "habit content",
        status: true,
      });

      await request(app)
        .post("/api/habit/add")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send({
          userId: userOne._id,
          content: "habit content",
          status: true,
        })
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});
