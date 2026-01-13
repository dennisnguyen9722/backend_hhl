import multer from 'multer'
import path from 'path'
import fs from 'fs'

/**
 * Root uploads folder
 * backend/uploads
 */
const UPLOAD_DIR = path.join(process.cwd(), 'uploads')

/**
 * Ensure folder exists
 */
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

/**
 * Multer storage factory
 */
function storageFactory(subDir: string) {
  const dest = path.join(UPLOAD_DIR, subDir)
  ensureDir(dest)

  return multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, dest)
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname)
      const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
      cb(null, name)
    }
  })
}

/**
 * Upload single image
 */
export function uploadSingle(subDir: string) {
  return multer({
    storage: storageFactory(subDir),
    limits: {
      fileSize: 5 * 1024 * 1024 // 5MB
    }
  }).single('image')
}
