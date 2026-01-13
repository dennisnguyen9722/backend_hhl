import { Router } from 'express'
import {
  getBrands,
  getPublicBrands,
  createBrand,
  updateBrand,
  deleteBrand
} from '../controllers/brand.controller'
import { requireAuth } from '../middlewares/auth.middleware'
import { requirePermission } from '../middlewares/permission.middleware'

const router = Router()

/* ================= PUBLIC – STOREFRONT ================= */

// GET /brands/public
router.get('/public', getPublicBrands)

/* ================= ADMIN ================= */

// GET /brands
router.get('/', requireAuth, requirePermission('brand.read'), getBrands)

// POST /brands
router.post('/', requireAuth, requirePermission('brand.create'), createBrand)

// PATCH /brands/:id
router.patch(
  '/:id',
  requireAuth,
  requirePermission('brand.update'),
  updateBrand
)

// DELETE /brands/:id
router.delete(
  '/:id',
  requireAuth,
  requirePermission('brand.delete'),
  deleteBrand
)

export default router
