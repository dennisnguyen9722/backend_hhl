import { prisma } from '../lib/prisma'

type CreateBrandInput = {
  name: string
  slug: string
  logo?: string
  isActive?: boolean
}

type UpdateBrandInput = {
  name?: string
  logo?: string
  isActive?: boolean
}

export async function getAllBrands() {
  return prisma.brand.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' }
  })
}

export async function createBrand(data: CreateBrandInput, adminId?: string) {
  return prisma.brand.create({
    data
  })
}

export async function updateBrand(
  id: string,
  data: UpdateBrandInput,
  adminId?: string
) {
  return prisma.brand.update({
    where: { id },
    data
  })
}

export async function deleteBrand(id: string, adminId?: string) {
  return prisma.brand.update({
    where: { id },
    data: { deletedAt: new Date() }
  })
}

export async function findBrandBySlug(slug: string) {
  return prisma.brand.findFirst({
    where: {
      slug,
      deletedAt: null
    }
  })
}

export async function getActiveBrands() {
  return prisma.brand.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  })
}
