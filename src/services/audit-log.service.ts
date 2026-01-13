import { prisma } from '../lib/prisma'
import { Prisma } from '@prisma/client'

type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE'

type AuditInput = {
  adminId: string
  action: AuditAction
  entity: string
  entityId: string
  payload?: Prisma.InputJsonValue
}

export async function writeAuditLog(input: AuditInput) {
  const { adminId, action, entity, entityId, payload } = input

  return prisma.auditLog.create({
    data: {
      adminId,
      action,
      entity,
      entityId,
      payload
    }
  })
}
