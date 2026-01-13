"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAvatar = void 0;
const multer_1 = __importDefault(require("multer"));
// Dùng memory storage thay vì disk
const storage = multer_1.default.memoryStorage();
exports.uploadAvatar = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB
    },
    fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            cb(new Error('ONLY_IMAGE_ALLOWED'));
            return;
        }
        cb(null, true);
    }
});
