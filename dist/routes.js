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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const jwt = __importStar(require("jsonwebtoken"));
const videoController_1 = require("./controllers/videoController");
const adminController_1 = require("./controllers/adminController");
const authController_1 = require("./controllers/authController");
dotenv_1.default.config();
const key = process.env.ACCESS_TOKEN_KEY || "";
const route = express_1.default.Router();
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            const accessToken = req.headers.authorization.split(" ")[1];
            jwt.verify(accessToken, key);
            next();
        }
        catch (e) {
            res.status(403).send("Error unverified user");
        }
    }
});
//Video routes
route.get("/download", videoController_1.downloadVideo);
route.post("/view", videoController_1.viewVideo);
// Admin routes
route.get("/content", adminController_1.getContent);
route.post("/create-content", authenticate, adminController_1.createContent);
route.put("/update-content", authenticate, adminController_1.updateContent);
// Auth routes
route.post("/signup", authController_1.signup);
route.put("/login", authController_1.login);
exports.default = route;
