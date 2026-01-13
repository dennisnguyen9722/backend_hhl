import multer from 'multer'

const storage = multer.memoryStorage()

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
