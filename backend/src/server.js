import app from "./app.js";
import logger from "./config/logger.config.js";
import connectDB from "./db/index.js";

//env variables
const PORT = process.env.PORT || 8000;

// console.log(process.env.NODE_ENV);
let server;

//mongodb connection
connectDB()
  .then(() => {
    app.on("error", (error) => {
      logger.error("ERRR", error);
      throw error;
    });
    server = app.listen(PORT, () => {
      logger.info(`Server connected at port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error("MONGO db connection failed!!!!", error);
  });

//handle server errors

const exitHandler = () => {
  if (server) {
    logger.info("server closed");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  if (server) {
    logger.info("server closed");
    process.exit(1);
  }
});
