import express from "express";
import passport from "passport";

//Load User Model
import { User } from "../models";
import passportConfig from "../config/passport";
import auth from "../middlewares/auth";
import { authController } from "../controllers/index";

const authRouter = express.Router();

// Register
authRouter.post("/register", authController.register);

// Login
authRouter.post("/login", auth.setAuth(), authController.login);

// Logout
authRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  authController.logout
);

module.exports = authRouter;
