import { Router } from 'express'
import { getAbout, updateAbout } from '../controllers/about.controller'
import { requireAuth } from '../middlewares/auth.middleware'
import { requirePermission } from '../middlewares/permission.middleware'

const router = Router()

router.get('/about', getAbout)

router.patch(
  '/about',
  requireAuth,
  requirePermission('page.update'),
  updateAbout
)

export default router
