import express from "express";

//Load User Model
import User from "../models/user.model";

const router = express.Router();

// Register
router.post("/register", (req, res) => {
    console.log("You are registered");
  });

// Login
router.post("/login", (req, res) => {
    console.log("You are logged in");
  });

// Logout
router.post("/logout", (req, res) => {
  console.log("You are logged out");
});

module.exports = router;
