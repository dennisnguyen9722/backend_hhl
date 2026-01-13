"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCatalogZipFile = uploadCatalogZipFile;
const image_zip_service_1 = require("../services/image-zip.service");
async function uploadCatalogZipFile(req, res) {
    const { collectionId } = req.params;
    if (!req.file) {
        return res.status(400).json({ message: 'ZIP_MISSING' });
    }
    const adminId = req.admin?.id;
    const result = await (0, image_zip_service_1.importCatalogZip)({
        zipBuffer: req.file.buffer, // ✅ THAY ĐỔI: truyền buffer thay vì path
        collectionId,
        adminId
    });
    return res.json({
        message: 'ZIP_IMPORTED',
        total: result.total
    });
}
