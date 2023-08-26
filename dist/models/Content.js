"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contentSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: true,
    },
    lang: {
        type: String,
        required: true,
    },
    pageTitle: {
        type: String,
        required: true,
    },
});
const Content = mongoose_1.default.model("Content", contentSchema);
exports.Content = Content;
