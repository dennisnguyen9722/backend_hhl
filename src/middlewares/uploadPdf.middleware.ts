import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/catalog/pdf'
    fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, '-')
      .toLowerCase()

    cb(null, `${Date.now()}-${name}${ext}`)
  }
})

export const uploadPdf = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF allowed'))
    }
    cb(null, true)
  },
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  }
})
