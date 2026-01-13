"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadPdf_middleware_1 = require("../middlewares/uploadPdf.middleware");
const uploadImage_middleware_1 = require("../middlewares/uploadImage.middleware");
const router = (0, express_1.Router)();
router.post('/pdf', uploadPdf_middleware_1.uploadPdf.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({
        path: `catalog/pdf/${req.file.filename}`
    });
});
router.post('/brand-logo', uploadImage_middleware_1.uploadImage.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    // Trả về đường dẫn tương đối từ thư mục uploads
    res.json({
        path: `brands/${req.file.filename}`
    });
});
exports.default = router;
