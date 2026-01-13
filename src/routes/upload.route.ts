import { Router } from 'express'
import { uploadSingle } from '../middlewares/upload.middleware'
import { requireAuth } from '../middlewares/auth.middleware'

const router = Router()

// POST /uploads/banner
router.post(
  '/uploads/banner',
  requireAuth,
  uploadSingle('banners'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    return res.json({
      path: `banners/${req.file.filename}`
    })
  }
)

export default router
