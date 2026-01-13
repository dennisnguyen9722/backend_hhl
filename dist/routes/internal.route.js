"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../lib/prisma");
const internal_middleware_1 = require("../middlewares/internal.middleware");
const router = (0, express_1.Router)();
router.post('/create-admin', internal_middleware_1.requireSetupKey, async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    const exists = await prisma_1.prisma.adminUser.findUnique({ where: { email } });
    if (exists) {
        return res.status(409).json({ message: 'Admin already exists' });
    }
    const hashed = await bcrypt_1.default.hash(password, 12);
    const admin = await prisma_1.prisma.adminUser.create({
        data: {
            email,
            password: hashed,
            name
        }
    });
    res.json({
        id: admin.id,
        email: admin.email,
        name: admin.name
    });
});
exports.default = router;
