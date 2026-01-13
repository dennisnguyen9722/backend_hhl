import multer from 'multer'

const storage = multer.memoryStorage()

export const uploadCatalogZip = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (!file.originalname.endsWith('.zip')) {
      return cb(new Error('ONLY_ZIP_ALLOWED'))
    }
    cb(null, true)
  }
})
