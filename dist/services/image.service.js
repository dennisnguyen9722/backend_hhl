"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImagesByCollection = getImagesByCollection;
exports.createImage = createImage;
exports.updateImage = updateImage;
exports.deleteImage = deleteImage;
const prisma_1 = require("../lib/prisma");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function getImagesByCollection(collectionId, page, limit) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
        prisma_1.prisma.image.findMany({
            where: { collectionId },
            orderBy: { sortOrder: 'asc' },
            skip,
            take: limit
        }),
        prisma_1.prisma.image.count({
            where: { collectionId }
        })
    ]);
    return {
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
}
async function createImage(data, adminId) {
    return prisma_1.prisma.image.create({
        data
    });
}
async function updateImage(id, data, adminId) {
    return prisma_1.prisma.image.update({
        where: { id },
        data
    });
}
async function deleteImage(id, adminId) {
    // 1️⃣ Lấy image trước
    const image = await prisma_1.prisma.image.findUnique({
        where: { id }
    });
    if (!image) {
        throw new Error('Image not found');
    }
    // 2️⃣ Xóa file vật lý nếu tồn tại
    if (image.imageUrl) {
        const filePath = path_1.default.join(process.cwd(), 'uploads', image.imageUrl);
        if (fs_1.default.existsSync(filePath)) {
            fs_1.default.unlinkSync(filePath);
            console.log('🗑️ Deleted image file:', filePath);
        }
        else {
            console.warn('⚠️ Image file not found:', filePath);
        }
    }
    // 3️⃣ Xóa DB (HARD DELETE)
    await prisma_1.prisma.image.delete({
        where: { id }
    });
    return true;
}
