"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImagesByCollection = getImagesByCollection;
exports.createImage = createImage;
exports.updateImage = updateImage;
exports.deleteImage = deleteImage;
const imageService = __importStar(require("../services/image.service"));
const prisma_1 = require("../lib/prisma");
/**
 * GET /collections/:collectionId/images?page=&limit=
 */
async function getImagesByCollection(req, res) {
    const { collectionId } = req.params;
    if (!collectionId) {
        return res.status(400).json({ message: 'Missing collectionId' });
    }
    // pagination params
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 25, 100);
    const result = await imageService.getImagesByCollection(collectionId, page, limit);
    /**
     * result = {
     *   data: Image[],
     *   pagination: { page, limit, total, totalPages }
     * }
     */
    return res.json(result);
}
/**
 * POST /collections/:collectionId/images
 */
async function createImage(req, res) {
    const { collectionId } = req.params;
    if (!collectionId) {
        return res.status(400).json({ message: 'Missing collectionId' });
    }
    if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded' });
    }
    // ✅ LẤY COLLECTION + BRAND
    const collection = await prisma_1.prisma.collection.findUnique({
        where: { id: collectionId },
        include: { brand: true }
    });
    if (!collection) {
        return res.status(404).json({ message: 'Collection not found' });
    }
    // ✅ TẠO imageUrl
    const imageUrl = `catalog/${collection.brand.slug}/${collection.slug}/${req.file.filename}`;
    // 🔥 LẤY sortOrder CUỐI
    const lastImage = await prisma_1.prisma.image.findFirst({
        where: { collectionId },
        orderBy: { sortOrder: 'desc' }
    });
    const nextSortOrder = lastImage ? lastImage.sortOrder + 1 : 0;
    const adminId = req.admin?.id;
    const image = await imageService.createImage({
        collectionId,
        imageUrl,
        sortOrder: nextSortOrder, // ✅ FIX Ở ĐÂY
        isActive: true
    }, adminId);
    return res.json(image);
}
/**
 * PATCH /images/:id
 */
async function updateImage(req, res) {
    const { id } = req.params;
    const { title, sortOrder, isActive } = req.body;
    if (!id) {
        return res.status(400).json({ message: 'Missing image id' });
    }
    const adminId = req.admin?.id;
    const image = await imageService.updateImage(id, { title, sortOrder, isActive }, adminId);
    return res.json(image);
}
/**
 * DELETE /images/:id
 */
async function deleteImage(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Missing image id' });
    }
    const adminId = req.admin?.id;
    await imageService.deleteImage(id, adminId);
    return res.json({ success: true });
}
