"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const saltRounds = 10;
const accessTokenSecret = process.env.ACCESS_TOKEN_KEY || "";
const refreshTokenSecret = process.env.REFRESH_TOKEN_KEY || "";
const accessTokenLife = "24h";
const refreshTokenLife = "7d";
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hashedPassword = yield bcrypt_1.default.hash(req.body.password, saltRounds);
    const user = new User_1.User({
        username: req.body.username,
        password: hashedPassword,
    });
    user
        .save()
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).send({ message: err }));
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({ username: req.body.username });
    if (user) {
        const result = yield bcrypt_1.default.compareSync(req.body.password, user.password);
        if (result === true) {
            const accessToken = jsonwebtoken_1.default.sign(user.toJSON(), accessTokenSecret, {
                expiresIn: "24h",
            });
            const refreshToken = jsonwebtoken_1.default.sign(user.toJSON(), refreshTokenSecret, {
                expiresIn: "7d",
            });
            res.status(200).send({
                message: "Successful login",
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        }
        else {
            res.status(403).send({ message: "wrong credentials" });
        }
    }
});
exports.login = login;
