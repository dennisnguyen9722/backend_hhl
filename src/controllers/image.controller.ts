import { Request, Response } from 'express'
import * as imageService from '../services/image.service'
import { prisma } from '../lib/prisma'
import { uploadToCloudinary } from '../utils/cloudinary-upload'

/**
 * GET /collections/:collectionId/images?page=&limit=
 */
export async function getImagesByCollection(req: Request, res: Response) {
  const { collectionId } = req.params

  if (!collectionId) {
    return res.status(400).json({ message: 'Missing collectionId' })
  }

  // pagination params
  const page = Math.max(parseInt(req.query.page as string) || 1, 1)
  const limit = Math.min(parseInt(req.query.limit as string) || 25, 100)

  const result = await imageService.getImagesByCollection(
    collectionId,
    page,
    limit
  )

  return res.json(result)
}

/**
 * POST /collections/:collectionId/images
 */
export async function createImage(req: Request, res: Response) {
  const { collectionId } = req.params

  if (!collectionId) {
    return res.status(400).json({ message: 'Missing collectionId' })
  }

  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' })
  }

  // ✅ LẤY COLLECTION + BRAND
  const collection = await prisma.collection.findUnique({
    where: { id: collectionId },
    include: { brand: true }
  })

  if (!collection) {
    return res.status(404).json({ message: 'Collection not found' })
  }

  // ✅ UPLOAD LÊN CLOUDINARY
  const cloudinaryResult = await uploadToCloudinary(req.file.buffer, {
    folder: `catalog/${collection.brand.slug}/${collection.slug}`,
    resource_type: 'image'
  })

  // ✅ LƯU URL TỪ CLOUDINARY
  const imageUrl = cloudinaryResult.secure_url

  // 🔥 LẤY sortOrder CUỐI
  const lastImage = await prisma.image.findFirst({
    where: { collectionId },
    orderBy: { sortOrder: 'desc' }
  })

  const nextSortOrder = lastImage ? lastImage.sortOrder + 1 : 0

  const adminId = (req as any).admin?.id

  const image = await imageService.createImage(
    {
      collectionId,
      imageUrl,
      sortOrder: nextSortOrder,
      isActive: true
    },
    adminId
  )

  return res.json(image)
}

/**
 * PATCH /images/:id
 */
export async function updateImage(req: Request, res: Response) {
  const { id } = req.params
  const { title, sortOrder, isActive } = req.body

  if (!id) {
    return res.status(400).json({ message: 'Missing image id' })
  }

  const adminId = (req as any).admin?.id

  const image = await imageService.updateImage(
    id,
    { title, sortOrder, isActive },
    adminId
  )

  return res.json(image)
}

/**
 * DELETE /images/:id
 */
export async function deleteImage(req: Request, res: Response) {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'Missing image id' })
  }

  const adminId = (req as any).admin?.id

  await imageService.deleteImage(id, adminId)

  return res.json({ success: true })
}
