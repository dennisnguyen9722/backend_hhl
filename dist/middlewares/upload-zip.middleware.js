"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadZip = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
function fileFilter(_req, file, cb) {
    if (file.mimetype === 'application/zip') {
        cb(null, true);
    }
    else {
        cb(new Error('ONLY_ZIP_ALLOWED'));
    }
}
exports.uploadZip = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 500 * 1024 * 1024 // 500MB
    }
});
