"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRBAC = getRBAC;
const rbac_service_1 = require("../services/rbac.service");
function getRBAC(_req, res) {
    const roles = (0, rbac_service_1.getRBACConfig)();
    return res.json({ roles });
}
