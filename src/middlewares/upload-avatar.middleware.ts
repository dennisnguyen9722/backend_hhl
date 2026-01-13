import multer, { FileFilterCallback } from 'multer'
import { Request } from 'express'

// Dùng memory storage thay vì disk
const storage = multer.memoryStorage()

export const uploadAvatar = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  },
  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('ONLY_IMAGE_ALLOWED'))
      return
    }
    cb(null, true)
  }
})
