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
exports.getBanners = getBanners;
exports.createBanner = createBanner;
exports.updateBanner = updateBanner;
exports.deleteBanner = deleteBanner;
exports.getPublicBanners = getPublicBanners;
const bannerService = __importStar(require("../services/banner.service"));
/* ================= ADMIN ================= */
async function getBanners(req, res) {
    const banners = await bannerService.getAllBanners();
    res.json(banners);
}
async function createBanner(req, res) {
    const { imageUrl, title, linkUrl, sortOrder, isActive } = req.body;
    if (!imageUrl) {
        return res.status(400).json({ message: 'Missing imageUrl' });
    }
    const banner = await bannerService.createBanner({
        imageUrl,
        title,
        linkUrl,
        sortOrder,
        isActive
    });
    res.json(banner);
}
async function updateBanner(req, res) {
    const { id } = req.params;
    const banner = await bannerService.updateBanner(id, req.body);
    res.json(banner);
}
async function deleteBanner(req, res) {
    const { id } = req.params;
    await bannerService.deleteBanner(id);
    res.json({ success: true });
}
/* ================= PUBLIC ================= */
/* ================= PUBLIC ================= */
async function getPublicBanners(req, res) {
    const banners = await bannerService.getActiveBanners();
    res.json(banners.map((b) => ({
        id: b.id,
        image: b.imageUrl, // 👈 MAP Ở ĐÂY
        link: b.linkUrl ?? null,
        title: b.title ?? null
    })));
}
