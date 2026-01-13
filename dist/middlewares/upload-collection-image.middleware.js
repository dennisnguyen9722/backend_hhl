"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCollectionImage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const prisma_1 = require("../lib/prisma");
const UPLOAD_DIR = path_1.default.join(process.cwd(), 'uploads/catalog');
exports.uploadCollectionImage = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: async (req, _file, cb) => {
            try {
                const { collectionId } = req.params;
                // Lấy collection + brand từ DB
                const collection = await prisma_1.prisma.collection.findUnique({
                    where: { id: collectionId },
                    include: { brand: true }
                });
                if (!collection) {
                    return cb(new Error('COLLECTION_NOT_FOUND'), '');
                }
                // Tạo đường dẫn: uploads/catalog/{brand-slug}/{collection-slug}
                const dest = path_1.default.join(UPLOAD_DIR, collection.brand.slug, collection.slug);
                // Tạo folder nếu chưa có
                fs_1.default.mkdirSync(dest, { recursive: true });
                cb(null, dest);
            }
            catch (error) {
                cb(error, '');
            }
        },
        filename: (_req, file, cb) => {
            const ext = path_1.default.extname(file.originalname);
            const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
            cb(null, name);
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('ONLY_IMAGE_ALLOWED'));
        }
        cb(null, true);
    }
});
