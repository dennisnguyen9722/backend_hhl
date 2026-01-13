import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export async function getCategories(req: Request, res: Response) {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' }
  })
  res.json(categories)
}

export async function createCategory(req: Request, res: Response) {
  const { name, slug, sortOrder, isActive } = req.body
  const category = await prisma.category.create({
    data: { name, slug, sortOrder, isActive }
  })
  res.json(category)
}

export async function updateCategory(req: Request, res: Response) {
  const { id } = req.params
  const category = await prisma.category.update({
    where: { id },
    data: req.body
  })
  res.json(category)
}

export async function deleteCategory(req: Request, res: Response) {
  const { id } = req.params
  await prisma.category.delete({ where: { id } })
  res.json({ success: true })
}

/* ================= BRAND ↔ CATEGORY ================= */

// GET brands + checked state
export async function getCategoryBrands(req: Request, res: Response) {
  const { id } = req.params

  const brands = await prisma.brand.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
    include: {
      categories: {
        where: { categoryId: id }
      }
    }
  })

  res.json(
    brands.map((b) => ({
      id: b.id,
      name: b.name,
      checked: b.categories.length > 0
    }))
  )
}

// PUT update mapping
export async function updateCategoryBrands(req: Request, res: Response) {
  const { id } = req.params
  const { brandIds } = req.body as { brandIds: string[] }

  await prisma.brandCategory.deleteMany({
    where: { categoryId: id }
  })

  if (brandIds.length > 0) {
    await prisma.brandCategory.createMany({
      data: brandIds.map((bid) => ({
        brandId: bid,
        categoryId: id
      }))
    })
  }

  res.json({ success: true })
}
