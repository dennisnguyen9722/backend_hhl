"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importCatalogZip = importCatalogZip;
const path_1 = __importDefault(require("path"));
const adm_zip_1 = __importDefault(require("adm-zip"));
const prisma_1 = require("../lib/prisma");
const audit_log_service_1 = require("./audit-log.service");
const cloudinary_upload_1 = require("../utils/cloudinary-upload");
async function importCatalogZip({ zipBuffer, collectionId, adminId }) {
    const collection = await prisma_1.prisma.collection.findUnique({
        where: { id: collectionId },
        include: { brand: true }
    });
    if (!collection)
        throw new Error('COLLECTION_NOT_FOUND');
    // ✅ GIẢI NÉN ZIP TỪ BUFFER
    const zip = new adm_zip_1.default(zipBuffer);
    const entries = zip.getEntries();
    const lastImage = await prisma_1.prisma.image.findFirst({
        where: { collectionId },
        orderBy: { sortOrder: 'desc' }
    });
    let sortOrder = lastImage ? lastImage.sortOrder + 1 : 0;
    let total = 0;
    for (const entry of entries) {
        if (entry.isDirectory)
            continue;
        const ext = path_1.default.extname(entry.entryName).toLowerCase();
        if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext))
            continue;
        // ✅ LẤY BUFFER CỦA FILE
        const fileBuffer = entry.getData();
        // ✅ UPLOAD LÊN CLOUDINARY
        const cloudinaryResult = await (0, cloudinary_upload_1.uploadToCloudinary)(fileBuffer, {
            folder: `catalog/${collection.brand.slug}/${collection.slug}`,
            resource_type: 'image'
        });
        // ✅ LƯU URL TỪ CLOUDINARY
        const imageUrl = cloudinaryResult.secure_url;
        await prisma_1.prisma.image.create({
            data: {
                collectionId,
                imageUrl,
                sortOrder: sortOrder++,
                isActive: true
            }
        });
        total++;
    }
    await (0, audit_log_service_1.writeAuditLog)({
        adminId,
        action: 'CREATE',
        entity: 'Image',
        entityId: collectionId,
        payload: { total }
    });
    return { total };
}
