"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserController = void 0;
const admin_user_service_1 = require("../services/admin-user.service");
const audit_log_service_1 = require("../services/audit-log.service");
const client_1 = require("@prisma/client");
const prisma_1 = require("../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AdminUserController {
    static async list(req, res) {
        const users = await admin_user_service_1.AdminUserService.list();
        res.json({ users });
    }
    static async create(req, res) {
        const admin = req.admin;
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'INVALID_INPUT' });
        }
        if (!Object.values(client_1.Role).includes(role)) {
            return res.status(400).json({ message: 'INVALID_ROLE' });
        }
        const user = await admin_user_service_1.AdminUserService.create({
            name,
            email,
            password,
            role
        });
        // ===== AUDIT LOG =====
        try {
            await (0, audit_log_service_1.writeAuditLog)({
                adminId: admin.id,
                action: 'CREATE',
                entity: 'AdminUser',
                entityId: user.id,
                payload: {
                    email: user.email,
                    role: user.role
                }
            });
        }
        catch (e) {
            console.error('Audit log failed (create user)', e);
        }
        res.status(201).json({ id: user.id });
    }
    static async update(req, res) {
        const admin = req.admin;
        const { id } = req.params;
        const { role, isActive } = req.body;
        const data = {};
        if (role)
            data.role = role;
        if (typeof isActive === 'boolean')
            data.isActive = isActive;
        // ===== BEFORE STATE =====
        const before = await prisma_1.prisma.adminUser.findUnique({
            where: { id },
            select: { role: true, isActive: true }
        });
        await admin_user_service_1.AdminUserService.update(id, data);
        // ===== AFTER STATE =====
        const after = await prisma_1.prisma.adminUser.findUnique({
            where: { id },
            select: { role: true, isActive: true }
        });
        // ===== AUDIT LOG =====
        try {
            await (0, audit_log_service_1.writeAuditLog)({
                adminId: admin.id,
                action: 'UPDATE',
                entity: 'AdminUser',
                entityId: id,
                payload: {
                    before,
                    after
                }
            });
        }
        catch (e) {
            console.error('Audit log failed (update user)', e);
        }
        res.json({ success: true });
    }
    static async changePassword(req, res) {
        const admin = req.admin;
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'INVALID_INPUT' });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'PASSWORD_TOO_SHORT' });
        }
        const user = await prisma_1.prisma.adminUser.findUnique({
            where: { id: admin.id }
        });
        if (!user) {
            return res.status(404).json({ message: 'USER_NOT_FOUND' });
        }
        const ok = await bcrypt_1.default.compare(currentPassword, user.password);
        if (!ok) {
            return res.status(400).json({ message: 'INVALID_CURRENT_PASSWORD' });
        }
        const hashed = await bcrypt_1.default.hash(newPassword, 10);
        await prisma_1.prisma.adminUser.update({
            where: { id: admin.id },
            data: { password: hashed }
        });
        // AUDIT LOG
        try {
            await (0, audit_log_service_1.writeAuditLog)({
                adminId: admin.id,
                action: 'UPDATE',
                entity: 'AdminUser',
                entityId: admin.id,
                payload: {
                    action: 'change_password'
                }
            });
        }
        catch (e) {
            console.error('Audit log failed', e);
        }
        res.json({ success: true });
    }
    static async updateAvatar(req, res) {
        const admin = req.admin;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'NO_FILE' });
        }
        // ✅ CHỈ LƯU RELATIVE PATH
        const avatarPath = `avatars/${file.filename}`;
        await prisma_1.prisma.adminUser.update({
            where: { id: admin.id },
            data: { avatar: avatarPath } // ✅ Lưu: avatars/xxx.png
        });
        // AUDIT LOG
        try {
            await (0, audit_log_service_1.writeAuditLog)({
                adminId: admin.id,
                action: 'UPDATE',
                entity: 'AdminUser',
                entityId: admin.id,
                payload: { action: 'update_avatar' }
            });
        }
        catch { }
        res.json({ avatar: avatarPath }); // ✅ Trả về: avatars/xxx.png
    }
    // Thêm method này vào AdminUserController
    static async updateProfile(req, res) {
        const admin = req.admin;
        const { name } = req.body;
        if (!name || !name.trim()) {
            return res.status(400).json({ message: 'INVALID_INPUT' });
        }
        await prisma_1.prisma.adminUser.update({
            where: { id: admin.id },
            data: { name: name.trim() }
        });
        // AUDIT LOG
        try {
            await (0, audit_log_service_1.writeAuditLog)({
                adminId: admin.id,
                action: 'UPDATE',
                entity: 'AdminUser',
                entityId: admin.id,
                payload: { action: 'update_profile', name }
            });
        }
        catch (e) {
            console.error('Audit log failed', e);
        }
        res.json({ success: true, name: name.trim() });
    }
}
exports.AdminUserController = AdminUserController;
