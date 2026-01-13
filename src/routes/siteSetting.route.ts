// backend/src/routes/siteSetting.route.ts
import { Router } from 'express'
import {
  getSiteSetting,
  updateSiteSetting
} from '../controllers/siteSetting.controller'
import { requireAuth } from '../middlewares/auth.middleware'
import { requirePermission } from '../middlewares/permission.middleware'
import { uploadSingle } from '../middlewares/upload.middleware'

const router = Router()

// GET site settings
router.get('/', getSiteSetting)

// UPDATE site settings
router.patch(
  '/',
  requireAuth,
  requirePermission('settings.update'),
  updateSiteSetting
)

// UPLOAD SITE LOGO  ✅ THÊM
// POST /site-settings/logo
router.post(
  '/logo',
  requireAuth,
  requirePermission('settings.update'),
  uploadSingle('site-logo'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    return res.json({
      path: `site-logo/${req.file.filename}`
    })
  }
)

router.post(
  '/favicon',
  requireAuth,
  requirePermission('settings.update'),
  uploadSingle('site-favicon'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    return res.json({
      path: `site-favicon/${req.file.filename}`
    })
  }
)

export default router
