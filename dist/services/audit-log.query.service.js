"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuditLogs = getAuditLogs;
const prisma_1 = require("../lib/prisma");
async function getAuditLogs(filter) {
    const { entity, entityId, adminId, from, to, limit = 50, offset = 0 } = filter;
    return prisma_1.prisma.auditLog.findMany({
        where: {
            ...(entity && { entity }),
            ...(entityId && { entityId }),
            ...(adminId && { adminId }),
            ...(from || to
                ? {
                    createdAt: {
                        ...(from && { gte: from }),
                        ...(to && { lte: to })
                    }
                }
                : {})
        },
        include: {
            admin: {
                select: { id: true, name: true, email: true }
            }
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset
    });
}
