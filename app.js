import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import compression from "compression";

import router from "./routes/index";
import mongoConnection from "./mongo-connection";
import config from "./config/config";

require("dotenv").config();

const app = express();

// set security HTTP headers
app.use(helmet());

// enable cors
app.use(cors());
app.options("*", cors());

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Express body parser
app.use(bodyParser.json());

app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

module.exports = app;
