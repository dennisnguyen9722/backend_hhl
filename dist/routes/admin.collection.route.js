"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_collection_controller_1 = require("../controllers/admin.collection.controller");
const router = (0, express_1.Router)();
// PATCH /admin/collections/:id
router.patch('/collections/:id', admin_collection_controller_1.updateCollection);
exports.default = router;
