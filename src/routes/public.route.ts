import { Router } from 'express'
import {
  getPublicCatalog,
  getPublicCollectionDetail,
  getPublicBrandPage,
  increaseDownloadCount
} from '../controllers/public.controller'

const router = Router()

// HOME
router.get('/catalog', getPublicCatalog)

// ✅ COLLECTION DETAIL – 3 params (DÙNG LẠI CONTROLLER CŨ)
router.get(
  '/catalog/:categorySlug/:brandSlug/:collectionSlug',
  (req, res, next) => {
    // bỏ categorySlug, dùng lại logic cũ
    req.params.brandSlug = req.params.brandSlug
    req.params.collectionSlug = req.params.collectionSlug
    return getPublicCollectionDetail(req, res)
  }
)

// BRAND PAGE
router.get('/catalog/:categorySlug/:brandSlug', getPublicBrandPage)

// LEGACY – giữ cho FE cũ / admin
router.get('/catalog/:brandSlug/:collectionSlug', getPublicCollectionDetail)

// DOWNLOAD
router.post(
  '/catalog/:brandSlug/:collectionSlug/download',
  increaseDownloadCount
)

export default router
