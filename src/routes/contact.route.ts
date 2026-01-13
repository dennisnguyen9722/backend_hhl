import { Router } from 'express'
import { getContact, updateContact } from '../controllers/contact.controller'
import { requireAuth } from '../middlewares/auth.middleware'
import { requirePermission } from '../middlewares/permission.middleware'

const router = Router()

router.get('/contact', getContact)

router.patch(
  '/contact',
  requireAuth,
  requirePermission('page.update'),
  updateContact
)

export default router
