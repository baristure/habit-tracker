import express from "express";

import auth from "../middlewares/auth";
import { habitController } from "../controllers/index";

const habitRouter = express.Router();
habitRouter.post("/add", auth.checkAuth(), habitController.create);

habitRouter.post("/mark", auth.checkAuth(), habitController.mark);
habitRouter.get("/get/:habitId", auth.checkAuth(), habitController.getOne);
habitRouter.get("/get/all/:userId", auth.checkAuth(), habitController.getAll);
habitRouter.post("/delete", auth.checkAuth(), habitController.deleteOne);
habitRouter.post("/delete-all", auth.checkAuth(), habitController.deleteAll);

module.exports = habitRouter;
