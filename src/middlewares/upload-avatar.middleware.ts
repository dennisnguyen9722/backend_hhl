import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import fs from 'fs'
import { Request } from 'express'

const uploadDir = path.join(process.cwd(), 'uploads/avatars')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb) => {
    cb(null, uploadDir)
  },

  filename: (req: Request, file: Express.Multer.File, cb) => {
    const admin = (req as any).admin
    const ext = path.extname(file.originalname)
    cb(null, `${admin.id}${ext}`)
  }
})

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
