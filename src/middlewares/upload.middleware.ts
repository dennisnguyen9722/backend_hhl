import multer from 'multer'

const storage = multer.memoryStorage()

/**
 * Upload single image
 */
export function uploadSingle(subDir: string) {
  return multer({
    storage,
    limits: {
      fileSize: 5 * 1024 * 1024 // 5MB
    }
  }).single('image')
}
