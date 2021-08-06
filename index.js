import app from "./app";

import config from "./config/config";
import logger from "./config/logger";

app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});
