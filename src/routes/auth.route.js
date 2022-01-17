import express from "express";
import passport from "passport";

import passportConfig from "../config/passport";
import auth from "../middlewares/auth";
import { authController } from "../controllers/index";

const authRouter = express.Router();

// Register
authRouter.post("/register", authController.register);

// Login
authRouter.post("/login", authController.login);
// refreshToken
authRouter.post("/refresh-token", auth.checkAuth(), authController.refreshUser);
// Logout
authRouter.post("/logout", authController.logout);

module.exports = authRouter;
