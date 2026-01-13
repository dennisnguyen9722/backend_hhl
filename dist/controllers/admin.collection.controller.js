"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCollection = updateCollection;
const prisma_1 = require("../lib/prisma");
/**
 * UPDATE COLLECTION (ADMIN)
 * PATCH /admin/collections/:id
 */
async function updateCollection(req, res) {
    try {
        const { id } = req.params;
        const { pdfFile } = req.body;
        const updated = await prisma_1.prisma.collection.update({
            where: { id },
            data: {
                pdfFile
            }
        });
        return res.json(updated);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Failed to update collection'
        });
    }
}
