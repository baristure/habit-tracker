import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";

import User from "../models/user.model";
import config from "./config";

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// authorization
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: config.jwt.secretKey,
    },
    (payload, done) => {
      User.findById({ _id: payload.id }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }
  )
);

// authenticated local strategy using username and password
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      // something went wrong with database
      if (err) return done(err);
      // if no user exist
      if (!user) return done(null, false);
      // check if password is correct
      user.comparePassword(password, done);
    });
  })
);
