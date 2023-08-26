import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
const saltRounds = 10;
const accessTokenSecret = process.env.ACCESS_TOKEN_KEY || "";
const refreshTokenSecret = process.env.REFRESH_TOKEN_KEY || "";
const accessTokenLife = "24h";
const refreshTokenLife = "7d";
export const signup = async (req: Request, res: Response) => {
  let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  });
  user
    .save()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send({ message: err }));
};

export const login = async (req: Request, res: Response) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    const result = await bcrypt.compareSync(req.body.password, user.password);
    if (result === true) {
      const accessToken = jwt.sign(user.toJSON(), accessTokenSecret, {
        expiresIn: "24h",
      });
      const refreshToken = jwt.sign(user.toJSON(), refreshTokenSecret, {
        expiresIn: "7d",
      });
      res.status(200).send({
        message: "Successful login",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      res.status(403).send({ message: "wrong credentials" });
    }
  }
};
