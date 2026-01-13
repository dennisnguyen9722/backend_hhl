"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRBACConfig = getRBACConfig;
const rbac_1 = require("../config/rbac");
function getRBACConfig() {
    return Object.entries(rbac_1.ROLE_PERMISSIONS).map(([role, permissions]) => ({
        role,
        permissions
    }));
}
