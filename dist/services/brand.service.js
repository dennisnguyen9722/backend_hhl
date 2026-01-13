"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBrands = getAllBrands;
exports.createBrand = createBrand;
exports.updateBrand = updateBrand;
exports.deleteBrand = deleteBrand;
exports.findBrandBySlug = findBrandBySlug;
exports.getActiveBrands = getActiveBrands;
const prisma_1 = require("../lib/prisma");
async function getAllBrands() {
    return prisma_1.prisma.brand.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' }
    });
}
async function createBrand(data, adminId) {
    return prisma_1.prisma.brand.create({
        data
    });
}
async function updateBrand(id, data, adminId) {
    return prisma_1.prisma.brand.update({
        where: { id },
        data
    });
}
async function deleteBrand(id, adminId) {
    return prisma_1.prisma.brand.update({
        where: { id },
        data: { deletedAt: new Date() }
    });
}
async function findBrandBySlug(slug) {
    return prisma_1.prisma.brand.findFirst({
        where: {
            slug,
            deletedAt: null
        }
    });
}
async function getActiveBrands() {
    return prisma_1.prisma.brand.findMany({
        where: {
            isActive: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    });
}
