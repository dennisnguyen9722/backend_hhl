"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBanners = getAllBanners;
exports.createBanner = createBanner;
exports.updateBanner = updateBanner;
exports.deleteBanner = deleteBanner;
exports.getActiveBanners = getActiveBanners;
const prisma_1 = require("../lib/prisma");
/* ================= ADMIN ================= */
function getAllBanners() {
    return prisma_1.prisma.banner.findMany({
        orderBy: { sortOrder: 'asc' }
    });
}
function createBanner(data) {
    return prisma_1.prisma.banner.create({ data });
}
function updateBanner(id, data) {
    return prisma_1.prisma.banner.update({
        where: { id },
        data
    });
}
function deleteBanner(id) {
    return prisma_1.prisma.banner.delete({
        where: { id }
    });
}
/* ================= PUBLIC ================= */
function getActiveBanners() {
    return prisma_1.prisma.banner.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' }
    });
}
