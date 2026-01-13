import { Router } from 'express'
import {
  getCollectionsByBrand,
  createCollection,
  updateCollection,
  deleteCollection
} from '../controllers/collection.controller'
import { requireAuth } from '../middlewares/auth.middleware'
import { requirePermission } from '../middlewares/permission.middleware'

const router = Router()

// GET /brands/:brandId/collections
router.get(
  '/brands/:brandId/collections',
  requireAuth,
  requirePermission('collection.read'),
  getCollectionsByBrand
)

// POST /brands/:brandId/collections
router.post(
  '/brands/:brandId/collections',
  requireAuth,
  requirePermission('collection.create'),
  createCollection
)

// PATCH /collections/:id
router.patch(
  '/collections/:id',
  requireAuth,
  requirePermission('collection.update'),
  updateCollection
)

// DELETE /collections/:id
router.delete(
  '/collections/:id',
  requireAuth,
  requirePermission('collection.delete'),
  deleteCollection
)

export default router
