"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/siteSetting.route.ts
const express_1 = require("express");
const siteSetting_controller_1 = require("../controllers/siteSetting.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const permission_middleware_1 = require("../middlewares/permission.middleware");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const router = (0, express_1.Router)();
// GET site settings
router.get('/', siteSetting_controller_1.getSiteSetting);
// UPDATE site settings
router.patch('/', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('settings.update'), siteSetting_controller_1.updateSiteSetting);
// UPLOAD SITE LOGO  ✅ THÊM
// POST /site-settings/logo
router.post('/logo', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('settings.update'), (0, upload_middleware_1.uploadSingle)('site-logo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    return res.json({
        path: `site-logo/${req.file.filename}`
    });
});
router.post('/favicon', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('settings.update'), (0, upload_middleware_1.uploadSingle)('site-favicon'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    return res.json({
        path: `site-favicon/${req.file.filename}`
    });
});
exports.default = router;
