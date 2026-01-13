"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const public_controller_1 = require("../controllers/public.controller");
const router = (0, express_1.Router)();
// HOME
router.get('/catalog', public_controller_1.getPublicCatalog);
// ✅ COLLECTION DETAIL – 3 params (DÙNG LẠI CONTROLLER CŨ)
router.get('/catalog/:categorySlug/:brandSlug/:collectionSlug', (req, res, next) => {
    // bỏ categorySlug, dùng lại logic cũ
    req.params.brandSlug = req.params.brandSlug;
    req.params.collectionSlug = req.params.collectionSlug;
    return (0, public_controller_1.getPublicCollectionDetail)(req, res);
});
// BRAND PAGE
router.get('/catalog/:categorySlug/:brandSlug', public_controller_1.getPublicBrandPage);
// LEGACY – giữ cho FE cũ / admin
router.get('/catalog/:brandSlug/:collectionSlug', public_controller_1.getPublicCollectionDetail);
// DOWNLOAD
router.post('/catalog/:brandSlug/:collectionSlug/download', public_controller_1.increaseDownloadCount);
exports.default = router;
