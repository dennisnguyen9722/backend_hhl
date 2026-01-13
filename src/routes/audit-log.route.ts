import { Router } from 'express'
import { listAuditLogs } from '../controllers/audit-log.controller'
import { requireAuth } from '../middlewares/auth.middleware'
import { requirePermission } from '../middlewares/permission.middleware'

const router = Router()

// GET /audit-logs
router.get(
  '/audit-logs',
  requireAuth,
  requirePermission('audit.read'),
  listAuditLogs
)

export default router
