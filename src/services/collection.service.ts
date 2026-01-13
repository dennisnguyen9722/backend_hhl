import fs from 'fs'
import path from 'path'
import { prisma } from '../lib/prisma'

type CreateCollectionInput = {
  brandId: string
  name: string
  slug: string
  isActive?: boolean
}

type UpdateCollectionInput = {
  name?: string
  isActive?: boolean
  pdfFile?: string | null
  pdfLink?: string | null
}

export async function getCollectionsByBrand(brandId: string) {
  return prisma.collection.findMany({
    where: {
      brandId,
      deletedAt: null
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function createCollection(
  data: CreateCollectionInput,
  adminId?: string
) {
  return prisma.collection.create({
    data
  })
}

export async function updateCollection(
  id: string,
  data: UpdateCollectionInput,
  adminId?: string
) {
  return prisma.collection.update({
    where: { id },
    data
  })
}

export async function deleteCollection(id: string, adminId?: string) {
  // 1. Lấy collection + images
  const collection = await prisma.collection.findFirst({
    where: {
      id,
      deletedAt: null
    },
    include: {
      images: true
    }
  })

  if (!collection) {
    throw new Error('Collection not found')
  }

  // 2. Xoá file ảnh
  for (const img of collection.images) {
    if (!img.imageUrl) continue

    const filePath = path.join(process.cwd(), 'public/uploads', img.imageUrl)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }

  // 3. Xoá file PDF nếu có
  if (collection.pdfFile) {
    const pdfPath = path.join(
      process.cwd(),
      'public/uploads',
      collection.pdfFile
    )

    if (fs.existsSync(pdfPath)) {
      fs.unlinkSync(pdfPath)
    }
  }

  // 4. Xoá images trong DB (xoá cứng)
  await prisma.image.deleteMany({
    where: {
      collectionId: id
    }
  })

  // 5. Soft delete collection
  return prisma.collection.update({
    where: { id },
    data: {
      deletedAt: new Date()
    }
  })
}

export async function findCollectionBySlug(brandId: string, slug: string) {
  return prisma.collection.findFirst({
    where: {
      brandId,
      slug,
      deletedAt: null
    }
  })
}
