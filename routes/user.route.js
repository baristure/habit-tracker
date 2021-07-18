import express from "express";
import passport from "passport";
import { sign } from "jsonwebtoken";

//Load User Model
import User from "../models/user.model";

const userRouter = express.Router();

const signToken = (userID) => {
  return sign(
    {
      iss: process.env.SECRET,
      id: userID,
    },
    process.env.SECRET,
    { expiresIn: "1h" }
  );
};

// Register
userRouter.post("/register", (req, res) => {
  const { email, username, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    if (user)
      res
        .status(400)
        .json({
          message: { msgBody: "Email is already taken", msgError: true },
        });
    else {
      const newUser = new User({ email, username, password });
      newUser.save((err) => {
        if (err)
          res
            .status(500)
            .json({
              message: { msgBody: "Error has occured", msgError: true },
            });
        else
          res
            .status(201)
            .json({
              message: {
                msgBody: "Account successfully created",
                msgError: false,
              },
            });
      });
    }
  });
});

// Login
userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, email, username } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true , sameSite: true });
      res
        .status(200)
         .json({ isAuthenticated: true, user: { email, username  }});
    }
  }
);

// Logout
userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { email: "", username: "" }, success: true });
  }
);

userRouter.get('/todos',passport.authenticate('jwt',{session : false}),(req,res)=>{
    User.findById({_id : req.user._id}).exec((err,document)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            res.status(200).json({todos :console.log({document}), authenticated : true});
        }
    });
});


module.exports = userRouter;
