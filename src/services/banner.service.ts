import { prisma } from '../lib/prisma'

/* ================= ADMIN ================= */

export function getAllBanners() {
  return prisma.banner.findMany({
    orderBy: { sortOrder: 'asc' }
  })
}

export function createBanner(data: {
  title?: string
  imageUrl: string
  linkUrl?: string
  sortOrder?: number
  isActive?: boolean
}) {
  return prisma.banner.create({ data })
}

export function updateBanner(
  id: string,
  data: {
    title?: string
    imageUrl?: string
    linkUrl?: string
    sortOrder?: number
    isActive?: boolean
  }
) {
  return prisma.banner.update({
    where: { id },
    data
  })
}

export function deleteBanner(id: string) {
  return prisma.banner.delete({
    where: { id }
  })
}

/* ================= PUBLIC ================= */

export function getActiveBanners() {
  return prisma.banner.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' }
  })
}
