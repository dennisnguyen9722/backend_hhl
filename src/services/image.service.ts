import { prisma } from '../lib/prisma'
import fs from 'fs'
import path from 'path'

type CreateImageInput = {
  collectionId: string
  title?: string
  imageUrl: string
  sortOrder?: number
  isActive?: boolean
}

type UpdateImageInput = {
  title?: string
  sortOrder?: number
  isActive?: boolean
}

export async function getImagesByCollection(
  collectionId: string,
  page: number,
  limit: number
) {
  const skip = (page - 1) * limit

  const [data, total] = await Promise.all([
    prisma.image.findMany({
      where: { collectionId },
      orderBy: { sortOrder: 'asc' },
      skip,
      take: limit
    }),
    prisma.image.count({
      where: { collectionId }
    })
  ])

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
}

export async function createImage(data: CreateImageInput, adminId?: string) {
  return prisma.image.create({
    data
  })
}

export async function updateImage(
  id: string,
  data: UpdateImageInput,
  adminId?: string
) {
  return prisma.image.update({
    where: { id },
    data
  })
}

export async function deleteImage(id: string, adminId?: string) {
  // 1️⃣ Lấy image trước
  const image = await prisma.image.findUnique({
    where: { id }
  })

  if (!image) {
    throw new Error('Image not found')
  }

  // 2️⃣ Xóa file vật lý nếu tồn tại
  if (image.imageUrl) {
    const filePath = path.join(process.cwd(), 'uploads', image.imageUrl)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      console.log('🗑️ Deleted image file:', filePath)
    } else {
      console.warn('⚠️ Image file not found:', filePath)
    }
  }

  // 3️⃣ Xóa DB (HARD DELETE)
  await prisma.image.delete({
    where: { id }
  })

  return true
}
