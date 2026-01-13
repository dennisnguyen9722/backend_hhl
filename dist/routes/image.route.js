"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_controller_1 = require("../controllers/image.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const permission_middleware_1 = require("../middlewares/permission.middleware");
const upload_collection_image_middleware_1 = require("../middlewares/upload-collection-image.middleware"); // ✅ ĐỔI
const router = (0, express_1.Router)();
router.get('/collections/:collectionId/images', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('image.read'), image_controller_1.getImagesByCollection);
router.post('/collections/:collectionId/images', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('image.create'), upload_collection_image_middleware_1.uploadCollectionImage.single('image'), // ✅ ĐỔI
image_controller_1.createImage);
router.patch('/images/:id', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('image.update'), image_controller_1.updateImage);
router.delete('/images/:id', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('image.delete'), image_controller_1.deleteImage);
exports.default = router;
