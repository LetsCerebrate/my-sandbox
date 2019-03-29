import config from "../config";
import app from "./server";
import logger from "../common/util/logger";
import MongoConnection from "../common/util/MongoConnection";

const port = config.server.port || "8081";
const dbUrl = config.db.dbUrl;

const server = app.get("_server");
const mongoConnection = new MongoConnection(dbUrl);

(async () => {
  try {
    // Run the server first.
    server.listen(port);
    logger.info(`Listen to server on port ${port}`);

    // Then connect to DB.
    await mongoConnection.connect();
    logger.info(`Connected to DB "${config.db.dbName}"`);

  } catch(error) {
    logger.error("Problem occured when listening server or connecting DB!",
      error);
    server.close();
  }
})();