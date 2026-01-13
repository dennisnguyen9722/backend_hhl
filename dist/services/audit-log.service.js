"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeAuditLog = writeAuditLog;
const prisma_1 = require("../lib/prisma");
async function writeAuditLog(input) {
    const { adminId, action, entity, entityId, payload } = input;
    return prisma_1.prisma.auditLog.create({
        data: {
            adminId,
            action,
            entity,
            entityId,
            payload
        }
    });
}
