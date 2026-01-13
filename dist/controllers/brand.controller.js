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
exports.getBrands = getBrands;
exports.createBrand = createBrand;
exports.updateBrand = updateBrand;
exports.deleteBrand = deleteBrand;
exports.getPublicBrands = getPublicBrands;
const brandService = __importStar(require("../services/brand.service"));
async function getBrands(_req, res) {
    const brands = await brandService.getAllBrands();
    return res.json(brands);
}
async function createBrand(req, res) {
    const { name, slug, logo, isActive } = req.body;
    if (!name || !slug) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    const exists = await brandService.findBrandBySlug(slug);
    if (exists) {
        return res.status(409).json({ message: 'Slug already exists' });
    }
    // ✅ LẤY adminId TỪ requireAuth middleware
    const adminId = req.admin?.id;
    const brand = await brandService.createBrand({ name, slug, logo, isActive }, adminId);
    return res.json(brand);
}
async function updateBrand(req, res) {
    const { id } = req.params;
    const { name, logo, isActive } = req.body;
    const adminId = req.admin?.id;
    const brand = await brandService.updateBrand(id, { name, logo, isActive }, adminId);
    return res.json(brand);
}
async function deleteBrand(req, res) {
    const { id } = req.params;
    const adminId = req.admin?.id;
    await brandService.deleteBrand(id, adminId);
    return res.json({ success: true });
}
async function getPublicBrands(req, res) {
    const brands = await brandService.getActiveBrands();
    res.json(brands);
}
