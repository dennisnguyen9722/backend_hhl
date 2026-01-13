"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollectionsByBrand = getCollectionsByBrand;
exports.createCollection = createCollection;
exports.updateCollection = updateCollection;
exports.deleteCollection = deleteCollection;
const collectionService = __importStar(require("../services/collection.service"));
async function getCollectionsByBrand(req, res) {
    const { brandId } = req.params;
    if (!brandId) {
        return res.status(400).json({ message: 'Missing brandId' });
    }
    const collections = await collectionService.getCollectionsByBrand(brandId);
    return res.json(collections);
}
async function createCollection(req, res) {
    const { brandId } = req.params;
    const { name, slug, isActive } = req.body;
    if (!brandId || !name || !slug) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    const exists = await collectionService.findCollectionBySlug(brandId, slug);
    if (exists) {
        return res.status(409).json({ message: 'Slug already exists' });
    }
    const adminId = req.admin?.id;
    const collection = await collectionService.createCollection({ brandId, name, slug, isActive }, adminId);
    return res.json(collection);
}
async function updateCollection(req, res) {
    const { id } = req.params;
    const { name, isActive, pdfFile, pdfLink } = req.body;
    const adminId = req.admin?.id;
    const collection = await collectionService.updateCollection(id, { name, isActive, pdfFile, pdfLink }, adminId);
    return res.json(collection);
}
async function deleteCollection(req, res) {
    try {
        const { id } = req.params;
        const adminId = req.admin?.id;
        await collectionService.deleteCollection(id, adminId);
        return res.json({ success: true });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message || 'Delete collection failed'
        });
    }
}
