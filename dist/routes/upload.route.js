"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// POST /uploads/banner
router.post('/uploads/banner', auth_middleware_1.requireAuth, (0, upload_middleware_1.uploadSingle)('banners'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    return res.json({
        path: `banners/${req.file.filename}`
    });
});
exports.default = router;
