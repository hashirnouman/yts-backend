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
exports.downloadVideo = exports.viewVideo = void 0;
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const contentDisposition = require("content-disposition");
const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes)
        return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
const viewVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link } = req.body;
        const resp = yield ytdl_core_1.default.getBasicInfo(link);
        const metaInfo = yield ytdl_core_1.default.getInfo(link);
        const sizes = metaInfo.formats.map((item) => {
            if (item.hasAudio === true && item.hasVideo === true) {
                return formatBytes(parseInt(item.contentLength));
            }
        });
        res.send({
            iframe: resp.videoDetails.embed.iframeUrl,
            formats: metaInfo.formats.filter((item) => item.hasVideo === true && item.hasAudio === true),
            size: { size: sizes.filter((size) => size != null) },
        });
    }
    catch (error) {
        res.status(500).send("error could not get response");
    }
});
exports.viewVideo = viewVideo;
const downloadVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.query.link;
    const quality = req.query.quality || "highest";
    const format = req.query.format;
    const info = yield ytdl_core_1.default.getInfo(link);
    if (format === "mp4") {
        try {
            const formats = ytdl_core_1.default.filterFormats(info.formats, "audioandvideo");
            let format;
            if (quality === "highest") {
                format = formats[0];
            }
            else {
                format = formats.find((f) => f.qualityLabel === quality);
            }
            if (!format) {
                throw new Error(`No format with quality label "${quality}" found.`);
            }
            res.header("Content-Disposition", contentDisposition(`${info.videoDetails.title}.mp4`));
            (0, ytdl_core_1.default)(link, { format: format.format_id }).pipe(res);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    else if (format === "mp3") {
        try {
            const info = yield ytdl_core_1.default.getInfo(link);
            const formats = ytdl_core_1.default.filterFormats(info.formats, "audioonly");
            res.header("Content-Disposition", contentDisposition(`${info.videoDetails.title}.mp3`));
            (0, ytdl_core_1.default)(link, { format: formats.format_id }).pipe(res);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
});
exports.downloadVideo = downloadVideo;
