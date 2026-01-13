"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirePermission = requirePermission;
const rbac_1 = require("../config/rbac");
function requirePermission(permission) {
    return (req, res, next) => {
        const admin = req.admin;
        if (!admin || !admin.role) {
            return res.status(401).json({ message: 'UNAUTHORIZED' });
        }
        const permissions = rbac_1.ROLE_PERMISSIONS[admin.role];
        if (!permissions) {
            return res.status(403).json({
                message: 'ROLE_HAS_NO_PERMISSIONS',
                role: admin.role
            });
        }
        if (permissions.includes('*') || permissions.includes(permission)) {
            return next();
        }
        return res.status(403).json({ message: 'FORBIDDEN' });
    };
}
