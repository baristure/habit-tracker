import express from "express";

// Load custom routes
import userRouter from "./user.route";
import authRouter from "./auth.route";
import habitRouter from "./habit.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/habit",
    route: habitRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
