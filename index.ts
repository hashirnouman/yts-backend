import express, { Express, Response, Request } from "express";
import dotenv from "dotenv";
import route from "./routes";
import cors from "cors";
import * as bodyparser from "body-parser";
import mongoose from "mongoose";
dotenv.config();
const app: Express = express();
app.use(cors());
app.use(bodyparser.json());
const URI = process.env.DATABASE_URL || "";
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});
mongoose.set("strictQuery", true);
mongoose.connect(URI).then(() => {
  app.listen(8000);
  console.log("listening");
});
app.use("/", route);
