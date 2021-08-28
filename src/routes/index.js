import express from "express";

// Load custom routes
import userRouter from "./user.route";
import authRouter from "./auth.route";

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
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
