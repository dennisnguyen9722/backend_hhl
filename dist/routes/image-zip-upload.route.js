"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const permission_middleware_1 = require("../middlewares/permission.middleware");
const upload_zip_middleware_1 = require("../middlewares/upload-zip.middleware");
const image_zip_upload_controller_1 = require("../controllers/image-zip-upload.controller");
const router = (0, express_1.Router)();
// POST /collections/:collectionId/images/upload-zip
router.post('/collections/:collectionId/images/upload-zip', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('image.create'), upload_zip_middleware_1.uploadZip.single('zip'), image_zip_upload_controller_1.uploadZipFile);
exports.default = router;
