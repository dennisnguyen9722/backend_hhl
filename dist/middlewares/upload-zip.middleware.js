"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadZip = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const TMP_DIR = path_1.default.join(process.cwd(), 'uploads/tmp');
if (!fs_1.default.existsSync(TMP_DIR)) {
    fs_1.default.mkdirSync(TMP_DIR, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination(_req, _file, cb) {
        cb(null, TMP_DIR);
    },
    filename(_req, file, cb) {
        const ext = path_1.default.extname(file.originalname);
        const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, name);
    }
});
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
