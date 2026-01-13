import { Router } from 'express'
import { requireAuth } from '../middlewares/auth.middleware'
import { requirePermission } from '../middlewares/permission.middleware'
import { uploadCatalogZip } from '../middlewares/upload-catalog.middleware'
import { uploadCatalogZipFile } from '../controllers/image-upload.controller'

const router = Router()

router.post(
  '/collections/:collectionId/images/upload-zip',
  requireAuth,
  requirePermission('image.create'),
  uploadCatalogZip.single('zip'),
  uploadCatalogZipFile
)

export default router
