import { Request, Response } from 'express'
import { getAuditLogs } from '../services/audit-log.query.service'

export async function listAuditLogs(req: Request, res: Response) {
  const { entity, entityId, adminId, from, to, limit, offset } = req.query

  const logs = await getAuditLogs({
    entity: typeof entity === 'string' ? entity : undefined,
    entityId: typeof entityId === 'string' ? entityId : undefined,
    adminId: typeof adminId === 'string' ? adminId : undefined,
    from: typeof from === 'string' ? new Date(from) : undefined,
    to: typeof to === 'string' ? new Date(to) : undefined,
    limit: typeof limit === 'string' ? Number(limit) : undefined,
    offset: typeof offset === 'string' ? Number(offset) : undefined
  })

  return res.json(logs)
}
