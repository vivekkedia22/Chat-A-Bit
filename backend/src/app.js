import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";

//dotEnv connfig
dotenv.config();

//create express app
const app = express();

//morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//helmet
app.use(helmet());

//parse json request body
app.use(express.json());

//Parse json request body
app.use(express.urlencoded({ extended: true }));

//sanitize request data
app.use(mongoSanitize());

//enable cookie Parser
app.use(cookieParser());

//gzip compression
app.use(compression());

//file upload
app.use(fileUpload({ useTempFiles: true }));

//cors
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

export default app;
