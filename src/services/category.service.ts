import { prisma } from '../lib/prisma'

export function getAllCategories() {
  return prisma.category.findMany({
    where: {
      isActive: true
    },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }]
  })
}

export function createCategory(data: {
  name: string
  slug: string
  sortOrder?: number
  isActive?: boolean
}) {
  return prisma.category.create({
    data: {
      name: data.name,
      slug: data.slug,
      sortOrder: data.sortOrder ?? 0,
      isActive: data.isActive ?? true
    }
  })
}

export function updateCategory(
  id: string,
  data: Partial<{
    name: string
    slug: string
    sortOrder: number
    isActive: boolean
  }>
) {
  return prisma.category.update({
    where: { id },
    data
  })
}

export function deleteCategory(id: string) {
  return prisma.category.delete({
    where: { id }
  })
}
