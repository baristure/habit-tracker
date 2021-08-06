import mongoose from "mongoose";

import config from "./config/config";
import logger from "./config/logger";

// mongoose.set("debug", true);

async function main() {
  await mongoose
    .connect(config.mongoose.url, config.mongoose.options)
    .then(() => {
      logger.info("MongoDB database connection established successfully");
    });
}

main();
