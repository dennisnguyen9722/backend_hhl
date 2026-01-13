"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCatalogZip = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const tmpDir = path_1.default.join(process.cwd(), 'uploads/tmp');
fs_1.default.mkdirSync(tmpDir, { recursive: true });
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, tmpDir);
    },
    filename: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    }
});
exports.uploadCatalogZip = (0, multer_1.default)({
    storage,
    fileFilter: (_req, file, cb) => {
        if (!file.originalname.endsWith('.zip')) {
            return cb(new Error('ONLY_ZIP_ALLOWED'));
        }
        cb(null, true);
    }
});
