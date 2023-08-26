"use strict";
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
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.ACCESS_TOKEN_KEY || "";
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization) {
        try {
            const accessToken = req.headers.authorization.split(" ")[1];
            const decode = jsonwebtoken_1.default.verify(accessToken, secretKey);
            console.log("decode  is " + decode);
        }
        catch (error) {
            res.status(403).send(" token invalid");
        }
    }
});
exports.authenticate = authenticate;
