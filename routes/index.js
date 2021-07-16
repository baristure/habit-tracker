import express from "express";

// Load custom routes
import userRouter from "./user.route";

const router = express.Router();

router.use("/api/user", userRouter);

module.exports = router;
