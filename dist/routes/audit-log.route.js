"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const audit_log_controller_1 = require("../controllers/audit-log.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const permission_middleware_1 = require("../middlewares/permission.middleware");
const router = (0, express_1.Router)();
// GET /audit-logs
router.get('/audit-logs', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('audit.read'), audit_log_controller_1.listAuditLogs);
exports.default = router;
