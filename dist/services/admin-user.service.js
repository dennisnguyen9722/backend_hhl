"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserService = void 0;
const prisma_1 = require("../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AdminUserService {
    static async list() {
        return prisma_1.prisma.adminUser.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isActive: true,
                createdAt: true
            }
        });
    }
    static async create(input) {
        const hashedPassword = await bcrypt_1.default.hash(input.password, 10);
        return prisma_1.prisma.adminUser.create({
            data: {
                name: input.name,
                email: input.email,
                password: hashedPassword,
                role: input.role
            }
        });
    }
    static async update(id, data) {
        return prisma_1.prisma.adminUser.update({
            where: { id },
            data
        });
    }
}
exports.AdminUserService = AdminUserService;
