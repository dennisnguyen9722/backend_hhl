"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../lib/prisma");
async function login(input) {
    const { email, password } = input;
    const admin = await prisma_1.prisma.adminUser.findUnique({
        where: { email }
    });
    if (!admin) {
        throw new Error('EMAIL_NOT_FOUND');
    }
    if (!admin.isActive) {
        throw new Error('ACCOUNT_DISABLED');
    }
    const ok = await bcrypt_1.default.compare(password, admin.password);
    if (!ok) {
        throw new Error('WRONG_PASSWORD');
    }
    const token = jsonwebtoken_1.default.sign({
        id: admin.id,
        role: admin.role
    }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return {
        token,
        admin: {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
            avatar: admin.avatar
        }
    };
}
