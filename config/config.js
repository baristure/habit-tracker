// const dotenv = require("dotenv");
// const path = require("path");
// const Joi = require("joi");
import path from "path";
import Joi from "joi";
// dotenv.config({ path: path.join(__dirname, "../.env") });
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    SECRET_KEY: Joi.number().default("topSecretKey"),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  secretKey: envVars.SECRET_KEY,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
