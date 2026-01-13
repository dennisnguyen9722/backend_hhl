"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAuditLogs = listAuditLogs;
const audit_log_query_service_1 = require("../services/audit-log.query.service");
async function listAuditLogs(req, res) {
    const { entity, entityId, adminId, from, to, limit, offset } = req.query;
    const logs = await (0, audit_log_query_service_1.getAuditLogs)({
        entity: typeof entity === 'string' ? entity : undefined,
        entityId: typeof entityId === 'string' ? entityId : undefined,
        adminId: typeof adminId === 'string' ? adminId : undefined,
        from: typeof from === 'string' ? new Date(from) : undefined,
        to: typeof to === 'string' ? new Date(to) : undefined,
        limit: typeof limit === 'string' ? Number(limit) : undefined,
        offset: typeof offset === 'string' ? Number(offset) : undefined
    });
    return res.json(logs);
}
