"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const permission_middleware_1 = require("../middlewares/permission.middleware");
const router = (0, express_1.Router)();
router.get('/dashboard/overview', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('dashboard.read'), dashboard_controller_1.getDashboardOverview);
/* ================= NEW ================= */
router.get('/dashboard/recent-uploads', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('dashboard.read'), dashboard_controller_1.getRecentUploads);
router.get('/dashboard/activity', auth_middleware_1.requireAuth, dashboard_controller_1.getDashboardActivity);
exports.default = router;
