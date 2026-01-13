import multer from 'multer'

const storage = multer.memoryStorage()

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
