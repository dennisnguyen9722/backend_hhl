import multer from 'multer'
import path from 'path'
import fs from 'fs'

const tmpDir = path.join(process.cwd(), 'uploads/tmp')
fs.mkdirSync(tmpDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, tmpDir)
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`)
  }
})

export const uploadCatalogZip = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (!file.originalname.endsWith('.zip')) {
      return cb(new Error('ONLY_ZIP_ALLOWED'))
    }
    cb(null, true)
  }
})
