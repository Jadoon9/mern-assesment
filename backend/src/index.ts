import cors from "cors";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();
import bodyParser from "body-parser";
import express from "express";
import route from "./routes";
import "./config";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", route);

// error handling
app.use((error, req, res, next) => {
  return res.status(error.code).json({
    message: error.message,
    details: error.details?.length ? error.details : "Something went wrong",
  });
});

app.listen(process.env.PORT_NO, () => {
  console.log(`Server Running ON Port ${process.env.PORT_NO}`);
});
