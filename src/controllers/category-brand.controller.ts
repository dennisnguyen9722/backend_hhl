import { Request, Response } from 'express'
import * as categoryBrandService from '../services/category-brand.service'

// GET /categories/:id/brands
export async function getBrandsOfCategory(req: Request, res: Response) {
  const { id } = req.params

  const brands = await categoryBrandService.getBrandsByCategory(id)
  res.json(brands)
}

// POST /categories/:id/brands
export async function setBrandsForCategory(req: Request, res: Response) {
  const { id } = req.params
  const { brandIds } = req.body as { brandIds: string[] }

  if (!Array.isArray(brandIds)) {
    return res.status(400).json({ message: 'brandIds must be an array' })
  }

  await categoryBrandService.setBrandsForCategory(id, brandIds)

  res.json({ success: true })
}
