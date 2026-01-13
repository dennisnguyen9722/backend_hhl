"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importCatalogZip = importCatalogZip;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto")); // ✅ BẮT BUỘC
const adm_zip_1 = __importDefault(require("adm-zip"));
const prisma_1 = require("../lib/prisma");
const audit_log_service_1 = require("./audit-log.service");
async function importCatalogZip({ zipPath, collectionId, adminId }) {
    const collection = await prisma_1.prisma.collection.findUnique({
        where: { id: collectionId },
        include: { brand: true }
    });
    if (!collection)
        throw new Error('COLLECTION_NOT_FOUND');
    const baseDir = path_1.default.join(process.cwd(), 'uploads/catalog', collection.brand.slug, collection.slug);
    fs_1.default.mkdirSync(baseDir, { recursive: true });
    const zip = new adm_zip_1.default(zipPath);
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
        const filename = `${crypto_1.default.randomUUID()}${ext}`;
        const filePath = path_1.default.join(baseDir, filename);
        fs_1.default.writeFileSync(filePath, entry.getData());
        // ✅ CHỈ LƯU RELATIVE PATH (KHÔNG DOMAIN, KHÔNG /uploads)
        const imageUrl = `catalog/${collection.brand.slug}/${collection.slug}/${filename}`;
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
    fs_1.default.unlinkSync(zipPath);
    await (0, audit_log_service_1.writeAuditLog)({
        adminId,
        action: 'CREATE',
        entity: 'Image',
        entityId: collectionId,
        payload: { total }
    });
    return { total };
}
