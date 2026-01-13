import { prisma } from '../lib/prisma'

type AuditLogFilter = {
  entity?: string
  entityId?: string
  adminId?: string
  from?: Date
  to?: Date
  limit?: number
  offset?: number
}

export async function getAuditLogs(filter: AuditLogFilter) {
  const { entity, entityId, adminId, from, to, limit = 50, offset = 0 } = filter

  return prisma.auditLog.findMany({
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
  })
}
