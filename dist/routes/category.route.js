"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const permission_middleware_1 = require("../middlewares/permission.middleware");
const router = (0, express_1.Router)();
router.get('/', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('category.read'), category_controller_1.getCategories);
router.post('/', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('category.create'), category_controller_1.createCategory);
router.patch('/:id', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('category.update'), category_controller_1.updateCategory);
router.delete('/:id', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('category.delete'), category_controller_1.deleteCategory);
/* ===== BRAND ↔ CATEGORY ===== */
router.get('/:id/brands', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('category.update'), category_controller_1.getCategoryBrands);
router.put('/:id/brands', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('category.update'), category_controller_1.updateCategoryBrands);
exports.default = router;
