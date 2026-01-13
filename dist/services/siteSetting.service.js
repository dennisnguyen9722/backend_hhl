"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSiteSetting = getSiteSetting;
exports.updateSiteSetting = updateSiteSetting;
const prisma_1 = require("../lib/prisma");
async function getSiteSetting() {
    let setting = await prisma_1.prisma.siteSetting.findUnique({
        where: { id: 1 }
    });
    if (!setting) {
        setting = await prisma_1.prisma.siteSetting.create({
            data: {
                id: 1,
                siteName: 'Huy Hoàng Lighting',
                logo: null,
                favicon: null // ✅ thêm
            }
        });
    }
    return setting;
}
async function updateSiteSetting(data) {
    return prisma_1.prisma.siteSetting.update({
        where: { id: 1 },
        data
    });
}
