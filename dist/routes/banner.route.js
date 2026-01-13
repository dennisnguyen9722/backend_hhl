"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const banner_controller_1 = require("../controllers/banner.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const permission_middleware_1 = require("../middlewares/permission.middleware");
const router = (0, express_1.Router)();
/* ================= PUBLIC ================= */
// GET /banners/public
router.get('/public', banner_controller_1.getPublicBanners);
/* ================= ADMIN ================= */
// GET /banners
router.get('/', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('banner.read'), banner_controller_1.getBanners);
// POST /banners
router.post('/', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('banner.create'), banner_controller_1.createBanner);
// PATCH /banners/:id
router.patch('/:id', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('banner.update'), banner_controller_1.updateBanner);
// DELETE /banners/:id
router.delete('/:id', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('banner.delete'), banner_controller_1.deleteBanner);
exports.default = router;
