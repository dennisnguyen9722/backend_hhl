import { prisma } from '../lib/prisma'

export async function getBrandsByCategory(categoryId: string) {
  const rows = await prisma.brandCategory.findMany({
    where: { categoryId },
    include: {
      brand: true
    },
    orderBy: {
      brand: {
        name: 'asc'
      }
    }
  })

  return rows.map((r) => r.brand)
}

export async function setBrandsForCategory(
  categoryId: string,
  brandIds: string[]
) {
  await prisma.$transaction([
    // 1️⃣ Xoá hết brand cũ của category
    prisma.brandCategory.deleteMany({
      where: { categoryId }
    }),

    // 2️⃣ Insert lại theo list mới
    prisma.brandCategory.createMany({
      data: brandIds.map((brandId) => ({
        brandId,
        categoryId
      }))
    })
  ])
}
