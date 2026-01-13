"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brand_controller_1 = require("../controllers/brand.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const permission_middleware_1 = require("../middlewares/permission.middleware");
const router = (0, express_1.Router)();
/* ================= PUBLIC – STOREFRONT ================= */
// GET /brands/public
router.get('/public', brand_controller_1.getPublicBrands);
/* ================= ADMIN ================= */
// GET /brands
router.get('/', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('brand.read'), brand_controller_1.getBrands);
// POST /brands
router.post('/', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('brand.create'), brand_controller_1.createBrand);
// PATCH /brands/:id
router.patch('/:id', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('brand.update'), brand_controller_1.updateBrand);
// DELETE /brands/:id
router.delete('/:id', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('brand.delete'), brand_controller_1.deleteBrand);
exports.default = router;
