import { Router } from 'express'
import {
  getDashboardActivity,
  getDashboardOverview,
  getRecentUploads
} from '../controllers/dashboard.controller'
import { requireAuth } from '../middlewares/auth.middleware'
import { requirePermission } from '../middlewares/permission.middleware'

const router = Router()

router.get(
  '/dashboard/overview',
  requireAuth,
  requirePermission('dashboard.read'),
  getDashboardOverview
)

/* ================= NEW ================= */

router.get(
  '/dashboard/recent-uploads',
  requireAuth,
  requirePermission('dashboard.read'),
  getRecentUploads
)

router.get('/dashboard/activity', requireAuth, getDashboardActivity)

export default router
