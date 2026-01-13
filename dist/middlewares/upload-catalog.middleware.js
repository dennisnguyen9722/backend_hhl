"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCatalogZip = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
exports.uploadCatalogZip = (0, multer_1.default)({
    storage,
    fileFilter: (_req, file, cb) => {
        if (!file.originalname.endsWith('.zip')) {
            return cb(new Error('ONLY_ZIP_ALLOWED'));
        }
        cb(null, true);
    }
});
