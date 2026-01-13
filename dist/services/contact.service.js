"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContact = getContact;
exports.updateContact = updateContact;
const prisma_1 = require("../lib/prisma");
async function getContact() {
    return prisma_1.prisma.contactPage.findFirst();
}
async function updateContact(data) {
    const existing = await prisma_1.prisma.contactPage.findFirst();
    if (!existing) {
        return prisma_1.prisma.contactPage.create({
            data: {
                companyName: data.companyName,
                address: data.address,
                phone: data.phone,
                email: data.email,
                mapEmbed: data.mapEmbed,
                facebookUrl: data.facebookUrl,
                seoTitle: data.seoTitle,
                seoDesc: data.seoDesc
            }
        });
    }
    return prisma_1.prisma.contactPage.update({
        where: { id: existing.id },
        data: {
            companyName: data.companyName,
            address: data.address,
            phone: data.phone,
            email: data.email,
            mapEmbed: data.mapEmbed,
            facebookUrl: data.facebookUrl,
            seoTitle: data.seoTitle,
            seoDesc: data.seoDesc
        }
    });
}
