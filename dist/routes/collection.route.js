"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collection_controller_1 = require("../controllers/collection.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const permission_middleware_1 = require("../middlewares/permission.middleware");
const router = (0, express_1.Router)();
// GET /brands/:brandId/collections
router.get('/brands/:brandId/collections', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('collection.read'), collection_controller_1.getCollectionsByBrand);
// POST /brands/:brandId/collections
router.post('/brands/:brandId/collections', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('collection.create'), collection_controller_1.createCollection);
// PATCH /collections/:id
router.patch('/collections/:id', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('collection.update'), collection_controller_1.updateCollection);
// DELETE /collections/:id
router.delete('/collections/:id', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('collection.delete'), collection_controller_1.deleteCollection);
exports.default = router;
