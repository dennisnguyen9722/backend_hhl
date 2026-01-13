"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function requireAuth(req, res, next) {
    let token;
    // 1️⃣ Authorization header (GIỮ NGUYÊN)
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.replace('Bearer ', '');
    }
    // 2️⃣ Fallback sang cookie (THÊM)
    if (!token && req.cookies?.accessToken) {
        token = req.cookies.accessToken;
    }
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.admin = payload;
        next();
    }
    catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
