import express from "express";

import auth from "../middlewares/auth";
import { userController } from "../controllers/index";

const userRouter = express.Router();

userRouter.get("/:userId", auth.checkAuth(), userController.getUser);

userRouter.get("/delete/:userId", auth.checkAuth(), userController.deleteUser);

module.exports = userRouter;
