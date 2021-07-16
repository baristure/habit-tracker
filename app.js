import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";

import router from "./routes/index";

require ("dotenv").config();;
require("./mongo-connection");

const app = express();
app.use(cors());

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use("/", router);

 

module.exports = app;