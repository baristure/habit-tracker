import express from "express";

//Load User Model
import { User } from "../models";

import auth from "../middlewares/auth";
import { userController } from "../controllers/index";

const userRouter = express.Router();

userRouter.post("/register", userController.createUser);

userRouter.get("/todos", auth.checkAuth(), (req, res) => {
  console.log(req);
});

module.exports = userRouter;
