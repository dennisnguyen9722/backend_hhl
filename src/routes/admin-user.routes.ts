import { Router } from 'express'
import { AdminUserController } from '../controllers/admin-user.controller'
import { requireAuth } from '../middlewares/auth.middleware'
import { requirePermission } from '../middlewares/permission.middleware'
import { uploadAvatar } from '../middlewares/upload-avatar.middleware'

const router = Router()

router.get(
  '/',
  requireAuth,
  requirePermission('admin-user.read'),
  AdminUserController.list
)

router.post(
  '/',
  requireAuth,
  requirePermission('admin-user.create'),
  AdminUserController.create
)

router.patch('/me/password', requireAuth, AdminUserController.changePassword)

router.patch(
  '/me/avatar',
  requireAuth,
  uploadAvatar.single('avatar'),
  AdminUserController.updateAvatar
)

router.patch('/me/profile', requireAuth, AdminUserController.updateProfile)

router.patch(
  '/:id',
  requireAuth,
  requirePermission('admin-user.update'),
  AdminUserController.update
)

export default router
