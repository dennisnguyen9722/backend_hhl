import multer from 'multer'

const storage = multer.memoryStorage()

export const uploadCollectionImage = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('ONLY_IMAGE_ALLOWED'))
    }
    cb(null, true)
  }
})
