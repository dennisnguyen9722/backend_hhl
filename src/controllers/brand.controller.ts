import { Request, Response } from 'express'
import * as brandService from '../services/brand.service'

export async function getBrands(_req: Request, res: Response) {
  const brands = await brandService.getAllBrands()
  return res.json(brands)
}

export async function createBrand(req: Request, res: Response) {
  const { name, slug, logo, isActive } = req.body

  if (!name || !slug) {
    return res.status(400).json({ message: 'Missing fields' })
  }

  const exists = await brandService.findBrandBySlug(slug)
  if (exists) {
    return res.status(409).json({ message: 'Slug already exists' })
  }

  // ✅ LẤY adminId TỪ requireAuth middleware
  const adminId = (req as any).admin?.id

  const brand = await brandService.createBrand(
    { name, slug, logo, isActive },
    adminId
  )

  return res.json(brand)
}

export async function updateBrand(req: Request, res: Response) {
  const { id } = req.params
  const { name, logo, isActive } = req.body

  const adminId = (req as any).admin?.id

  const brand = await brandService.updateBrand(
    id,
    { name, logo, isActive },
    adminId
  )

  return res.json(brand)
}

export async function deleteBrand(req: Request, res: Response) {
  const { id } = req.params

  const adminId = (req as any).admin?.id

  await brandService.deleteBrand(id, adminId)

  return res.json({ success: true })
}

export async function getPublicBrands(req: Request, res: Response) {
  const brands = await brandService.getActiveBrands()
  res.json(brands)
}
