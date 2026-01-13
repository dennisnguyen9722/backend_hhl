"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadZipFile = uploadZipFile;
const image_zip_service_1 = require("../services/image-zip.service");
async function uploadZipFile(req, res) {
    const { collectionId } = req.params;
    const adminId = req.admin?.id;
    if (!collectionId) {
        return res.status(400).json({ message: 'Missing collectionId' });
    }
    if (!req.file) {
        return res.status(400).json({ message: 'Missing zip file' });
    }
    if (!adminId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const result = await (0, image_zip_service_1.importCatalogZip)({
        zipBuffer: req.file.buffer, // ✅ THAY ĐỔI: truyền buffer thay vì path
        collectionId,
        adminId
    });
    return res.json({
        message: 'ZIP_IMPORTED',
        ...result
    });
}
