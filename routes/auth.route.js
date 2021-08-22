import express from "express";
import passport from "passport";

//Load User Model
import { User } from "../models";
import passportConfig from "../config/passport";
import auth from "../middlewares/auth";
import { authController } from "../controllers/index";

const authRouter = express.Router();

// Login
authRouter.post("/login", auth.setAuth(), authController.login);

// Logout
authRouter.get("/logout", authController.logout);

module.exports = authRouter;
