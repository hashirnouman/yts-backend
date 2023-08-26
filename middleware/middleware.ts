import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.ACCESS_TOKEN_KEY || "";
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(accessToken, secretKey);
      console.log("decode  is " + decode);
    } catch (error) {
      res.status(403).send(" token invalid");
    }
  }
};
