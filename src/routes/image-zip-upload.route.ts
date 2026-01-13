import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware'
import { requirePermission } from '../middlewares/permission.middleware'
import { uploadZip } from '../middlewares/upload-zip.middleware'
import { uploadZipFile } from '../controllers/image-zip-upload.controller'

const router = Router()

// POST /collections/:collectionId/images/upload-zip
router.post(
  '/collections/:collectionId/images/upload-zip',
  requireAuth,
  requirePermission('image.create'),
  uploadZip.single('zip'),
  uploadZipFile
)

export default router
