import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { prisma } from '../lib/prisma'

const UPLOAD_DIR = path.join(process.cwd(), 'uploads/catalog')

export const uploadCollectionImage = multer({
  storage: multer.diskStorage({
    destination: async (req, _file, cb) => {
      try {
        const { collectionId } = req.params

        // Lấy collection + brand từ DB
        const collection = await prisma.collection.findUnique({
          where: { id: collectionId },
          include: { brand: true }
        })

        if (!collection) {
          return cb(new Error('COLLECTION_NOT_FOUND'), '')
        }

        // Tạo đường dẫn: uploads/catalog/{brand-slug}/{collection-slug}
        const dest = path.join(
          UPLOAD_DIR,
          collection.brand.slug,
          collection.slug
        )

        // Tạo folder nếu chưa có
        fs.mkdirSync(dest, { recursive: true })

        cb(null, dest)
      } catch (error) {
        cb(error as Error, '')
      }
    },

    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname)
      const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
      cb(null, name)
    }
  }),

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
