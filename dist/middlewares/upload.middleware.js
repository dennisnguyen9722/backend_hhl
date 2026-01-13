"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingle = uploadSingle;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * Root uploads folder
 * backend/uploads
 */
const UPLOAD_DIR = path_1.default.join(process.cwd(), 'uploads');
/**
 * Ensure folder exists
 */
function ensureDir(dir) {
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
}
/**
 * Multer storage factory
 */
function storageFactory(subDir) {
    const dest = path_1.default.join(UPLOAD_DIR, subDir);
    ensureDir(dest);
    return multer_1.default.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, dest);
        },
        filename: (_req, file, cb) => {
            const ext = path_1.default.extname(file.originalname);
            const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
            cb(null, name);
        }
    });
}
/**
 * Upload single image
 */
function uploadSingle(subDir) {
    return (0, multer_1.default)({
        storage: storageFactory(subDir),
        limits: {
            fileSize: 5 * 1024 * 1024 // 5MB
        }
    }).single('image');
}
