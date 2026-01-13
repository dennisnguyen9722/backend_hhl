import { Router } from 'express'
import {
  getImagesByCollection,
  createImage,
  updateImage,
  deleteImage
} from '../controllers/image.controller'
import { requireAuth } from '../middlewares/auth.middleware'
import { requirePermission } from '../middlewares/permission.middleware'
import { uploadCollectionImage } from '../middlewares/upload-collection-image.middleware' // ✅ ĐỔI

const router = Router()

router.get(
  '/collections/:collectionId/images',
  requireAuth,
  requirePermission('image.read'),
  getImagesByCollection
)

router.post(
  '/collections/:collectionId/images',
  requireAuth,
  requirePermission('image.create'),
  uploadCollectionImage.single('image'), // ✅ ĐỔI
  createImage
)

router.patch(
  '/images/:id',
  requireAuth,
  requirePermission('image.update'),
  updateImage
)

router.delete(
  '/images/:id',
  requireAuth,
  requirePermission('image.delete'),
  deleteImage
)

export default router
