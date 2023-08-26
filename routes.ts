import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import * as jwt from "jsonwebtoken";

import { downloadVideo, searchVideo, viewVideo } from "./controllers/videoController";
import {
  createContent,
  getContent,
  updateContent,
} from "./controllers/adminController";
import { signup, login } from "./controllers/authController";

dotenv.config();
const key = process.env.ACCESS_TOKEN_KEY || "";
const route = express.Router();
const authenticate = async (req: any, res: any, next: any) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      jwt.verify(accessToken, key);
      next();
    } catch (e) {
      res.status(403).send("Error unverified user");
    }
  }
};
//Video routes
route.get("/download", downloadVideo);
route.post("/view", viewVideo);

// Admin routes
route.get("/content", getContent);
route.post("/create-content", authenticate, createContent);
route.put("/update-content", authenticate, updateContent);

// Auth routes
route.post("/signup", signup);
route.put("/login", login);

//searh routes
route.get('/search', searchVideo)
export default route;
