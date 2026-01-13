"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbout = getAbout;
exports.updateAbout = updateAbout;
const prisma_1 = require("../lib/prisma");
async function getAbout() {
    return prisma_1.prisma.aboutPage.findFirst();
}
async function updateAbout(data) {
    const existing = await prisma_1.prisma.aboutPage.findFirst();
    // ✅ CHƯA CÓ → CREATE
    if (!existing) {
        return prisma_1.prisma.aboutPage.create({
            data: {
                title: data.title,
                summary: data.summary,
                content: data.content,
                imageUrl: data.imageUrl,
                seoTitle: data.seoTitle,
                seoDesc: data.seoDesc
            }
        });
    }
    // ✅ CÓ RỒI → UPDATE
    return prisma_1.prisma.aboutPage.update({
        where: { id: existing.id },
        data: {
            title: data.title,
            summary: data.summary,
            content: data.content,
            imageUrl: data.imageUrl,
            seoTitle: data.seoTitle,
            seoDesc: data.seoDesc
        }
    });
}
