import { Router } from 'express'
import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  getPublicBanners
} from '../controllers/banner.controller'
import { requireAuth } from '../middlewares/auth.middleware'
import { requirePermission } from '../middlewares/permission.middleware'

const router = Router()

/* ================= PUBLIC ================= */

// GET /banners/public
router.get('/public', getPublicBanners)

/* ================= ADMIN ================= */

// GET /banners
router.get('/', requireAuth, requirePermission('banner.read'), getBanners)

// POST /banners
router.post('/', requireAuth, requirePermission('banner.create'), createBanner)

// PATCH /banners/:id
router.patch(
  '/:id',
  requireAuth,
  requirePermission('banner.update'),
  updateBanner
)

// DELETE /banners/:id
router.delete(
  '/:id',
  requireAuth,
  requirePermission('banner.delete'),
  deleteBanner
)

export default router
