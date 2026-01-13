import { Router } from 'express'
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryBrands,
  updateCategoryBrands
} from '../controllers/category.controller'
import { requireAuth } from '../middlewares/auth.middleware'
import { requirePermission } from '../middlewares/permission.middleware'

const router = Router()

router.get('/', requireAuth, requirePermission('category.read'), getCategories)
router.post(
  '/',
  requireAuth,
  requirePermission('category.create'),
  createCategory
)
router.patch(
  '/:id',
  requireAuth,
  requirePermission('category.update'),
  updateCategory
)
router.delete(
  '/:id',
  requireAuth,
  requirePermission('category.delete'),
  deleteCategory
)

/* ===== BRAND ↔ CATEGORY ===== */
router.get(
  '/:id/brands',
  requireAuth,
  requirePermission('category.update'),
  getCategoryBrands
)

router.put(
  '/:id/brands',
  requireAuth,
  requirePermission('category.update'),
  updateCategoryBrands
)

export default router
