import { prisma } from '../lib/prisma'

export async function getDashboardOverview() {
  const [brands, collections, totalImages, activeImages] = await Promise.all([
    prisma.brand.count(),
    prisma.collection.count(),
    prisma.image.count(),
    prisma.image.count({ where: { isActive: true } })
  ])

  return {
    brands,
    collections,
    images: {
      total: totalImages,
      active: activeImages,
      inactive: totalImages - activeImages
    }
  }
}

/* ================= NEW ================= */

export async function getRecentImages(limit = 10) {
  return prisma.image.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      collection: {
        include: {
          brand: true
        }
      }
    }
  })
}

export async function getRecentActivity(limit = 10) {
  const images = await prisma.image.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      createdAt: true,
      collection: {
        select: { name: true }
      }
    }
  })

  return images.map((img) => ({
    type: 'upload',
    message: 'Upload ảnh',
    target: img.collection?.name ?? '',
    createdAt: img.createdAt
  }))
}
