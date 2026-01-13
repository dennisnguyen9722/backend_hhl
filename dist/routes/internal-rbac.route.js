"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rbac_controller_1 = require("../controllers/rbac.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const permission_middleware_1 = require("../middlewares/permission.middleware");
const router = (0, express_1.Router)();
router.get('/rbac', auth_middleware_1.requireAuth, (0, permission_middleware_1.requirePermission)('audit.read'), rbac_controller_1.getRBAC);
exports.default = router;
