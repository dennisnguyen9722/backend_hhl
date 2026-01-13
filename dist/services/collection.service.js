"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollectionsByBrand = getCollectionsByBrand;
exports.createCollection = createCollection;
exports.updateCollection = updateCollection;
exports.deleteCollection = deleteCollection;
exports.findCollectionBySlug = findCollectionBySlug;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma_1 = require("../lib/prisma");
async function getCollectionsByBrand(brandId) {
    return prisma_1.prisma.collection.findMany({
        where: {
            brandId,
            deletedAt: null
        },
        orderBy: { createdAt: 'desc' }
    });
}
async function createCollection(data, adminId) {
    return prisma_1.prisma.collection.create({
        data
    });
}
async function updateCollection(id, data, adminId) {
    return prisma_1.prisma.collection.update({
        where: { id },
        data
    });
}
async function deleteCollection(id, adminId) {
    // 1. Lấy collection + images
    const collection = await prisma_1.prisma.collection.findFirst({
        where: {
            id,
            deletedAt: null
        },
        include: {
            images: true
        }
    });
    if (!collection) {
        throw new Error('Collection not found');
    }
    // 2. Xoá file ảnh
    for (const img of collection.images) {
        if (!img.imageUrl)
            continue;
        const filePath = path_1.default.join(process.cwd(), 'public/uploads', img.imageUrl);
        if (fs_1.default.existsSync(filePath)) {
            fs_1.default.unlinkSync(filePath);
        }
    }
    // 3. Xoá file PDF nếu có
    if (collection.pdfFile) {
        const pdfPath = path_1.default.join(process.cwd(), 'public/uploads', collection.pdfFile);
        if (fs_1.default.existsSync(pdfPath)) {
            fs_1.default.unlinkSync(pdfPath);
        }
    }
    // 4. Xoá images trong DB (xoá cứng)
    await prisma_1.prisma.image.deleteMany({
        where: {
            collectionId: id
        }
    });
    // 5. Soft delete collection
    return prisma_1.prisma.collection.update({
        where: { id },
        data: {
            deletedAt: new Date()
        }
    });
}
async function findCollectionBySlug(brandId, slug) {
    return prisma_1.prisma.collection.findFirst({
        where: {
            brandId,
            slug,
            deletedAt: null
        }
    });
}
