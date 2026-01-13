"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardOverview = getDashboardOverview;
exports.getRecentImages = getRecentImages;
exports.getRecentActivity = getRecentActivity;
const prisma_1 = require("../lib/prisma");
async function getDashboardOverview() {
    const [brands, collections, totalImages, activeImages] = await Promise.all([
        prisma_1.prisma.brand.count(),
        prisma_1.prisma.collection.count(),
        prisma_1.prisma.image.count(),
        prisma_1.prisma.image.count({ where: { isActive: true } })
    ]);
    return {
        brands,
        collections,
        images: {
            total: totalImages,
            active: activeImages,
            inactive: totalImages - activeImages
        }
    };
}
/* ================= NEW ================= */
async function getRecentImages(limit = 10) {
    return prisma_1.prisma.image.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
            collection: {
                include: {
                    brand: true
                }
            }
        }
    });
}
async function getRecentActivity(limit = 10) {
    const images = await prisma_1.prisma.image.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            createdAt: true,
            collection: {
                select: { name: true }
            }
        }
    });
    return images.map((img) => ({
        type: 'upload',
        message: 'Upload ảnh',
        target: img.collection?.name ?? '',
        createdAt: img.createdAt
    }));
}
