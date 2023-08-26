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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContent = exports.createContent = exports.getContent = void 0;
const Content_1 = require("../models/Content");
const getContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageTitle = req.query.pageTitle;
        const content = yield Content_1.Content.find().where({
            pageTitle: pageTitle,
        });
        res.send(content);
    }
    catch (error) {
        res.send("Error cannot find");
    }
});
exports.getContent = getContent;
const createContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, lang, pageTitle } = req.body;
    if (content.length > 0 && lang.length > 0) {
        try {
            const result = yield Content_1.Content.create({ content, lang, pageTitle });
            res.json(result);
        }
        catch (error) {
            res.status(500).send("Error could not create content");
        }
    }
    else {
        res.status(400).send("Empty content and no language code");
    }
});
exports.createContent = createContent;
const updateContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, content } = req.body;
    try {
        const resp = yield Content_1.Content.findByIdAndUpdate(id, {
            content: content,
        }, {
            new: true,
        });
        res.send(resp);
    }
    catch (error) {
        res.status(404).send("Content Not found");
    }
});
exports.updateContent = updateContent;
