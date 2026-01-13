import { Router } from 'express'
import { uploadPdf } from '../middlewares/uploadPdf.middleware'
import { uploadImage } from '../middlewares/uploadImage.middleware'

const router = Router()

router.post('/pdf', uploadPdf.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' })
  }

  res.json({
    path: `catalog/pdf/${req.file.filename}`
  })
})

router.post('/brand-logo', uploadImage.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' })
  }

  // Trả về đường dẫn tương đối từ thư mục uploads
  res.json({
    path: `brands/${req.file.filename}`
  })
})

export default router
