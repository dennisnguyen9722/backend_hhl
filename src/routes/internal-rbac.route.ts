import { Router } from 'express'
import { getRBAC } from '../controllers/rbac.controller'
import { requireAuth } from '../middlewares/auth.middleware'
import { requirePermission } from '../middlewares/permission.middleware'

const router = Router()

router.get('/rbac', requireAuth, requirePermission('audit.read'), getRBAC)

export default router
