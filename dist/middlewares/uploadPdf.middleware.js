"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPdf = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/catalog/pdf';
        fs_1.default.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const name = path_1.default
            .basename(file.originalname, ext)
            .replace(/\s+/g, '-')
            .toLowerCase();
        cb(null, `${Date.now()}-${name}${ext}`);
    }
});
exports.uploadPdf = (0, multer_1.default)({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            return cb(new Error('Only PDF allowed'));
        }
        cb(null, true);
    },
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB
    }
});
