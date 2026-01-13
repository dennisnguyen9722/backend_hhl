import multer from 'multer'
import path from 'path'
import fs from 'fs'

const TMP_DIR = path.join(process.cwd(), 'uploads/tmp')

if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR, { recursive: true })
}

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, TMP_DIR)
  },
  filename(_req, file, cb) {
    const ext = path.extname(file.originalname)
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
    cb(null, name)
  }
})

function fileFilter(
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  if (file.mimetype === 'application/zip') {
    cb(null, true)
  } else {
    cb(new Error('ONLY_ZIP_ALLOWED'))
  }
}

export const uploadZip = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024 // 500MB
  }
})
