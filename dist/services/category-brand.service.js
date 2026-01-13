"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrandsByCategory = getBrandsByCategory;
exports.setBrandsForCategory = setBrandsForCategory;
const prisma_1 = require("../lib/prisma");
async function getBrandsByCategory(categoryId) {
    const rows = await prisma_1.prisma.brandCategory.findMany({
        where: { categoryId },
        include: {
            brand: true
        },
        orderBy: {
            brand: {
                name: 'asc'
            }
        }
    });
    return rows.map((r) => r.brand);
}
async function setBrandsForCategory(categoryId, brandIds) {
    await prisma_1.prisma.$transaction([
        // 1️⃣ Xoá hết brand cũ của category
        prisma_1.prisma.brandCategory.deleteMany({
            where: { categoryId }
        }),
        // 2️⃣ Insert lại theo list mới
        prisma_1.prisma.brandCategory.createMany({
            data: brandIds.map((brandId) => ({
                brandId,
                categoryId
            }))
        })
    ]);
}
