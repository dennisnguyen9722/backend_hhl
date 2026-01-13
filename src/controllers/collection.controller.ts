import { Request, Response } from 'express'
import * as collectionService from '../services/collection.service'

export async function getCollectionsByBrand(req: Request, res: Response) {
  const { brandId } = req.params

  if (!brandId) {
    return res.status(400).json({ message: 'Missing brandId' })
  }

  const collections = await collectionService.getCollectionsByBrand(brandId)

  return res.json(collections)
}

export async function createCollection(req: Request, res: Response) {
  const { brandId } = req.params
  const { name, slug, isActive } = req.body

  if (!brandId || !name || !slug) {
    return res.status(400).json({ message: 'Missing fields' })
  }

  const exists = await collectionService.findCollectionBySlug(brandId, slug)
  if (exists) {
    return res.status(409).json({ message: 'Slug already exists' })
  }

  const adminId = (req as any).admin?.id

  const collection = await collectionService.createCollection(
    { brandId, name, slug, isActive },
    adminId
  )

  return res.json(collection)
}

export async function updateCollection(req: Request, res: Response) {
  const { id } = req.params
  const { name, isActive, pdfFile, pdfLink } = req.body

  const adminId = (req as any).admin?.id

  const collection = await collectionService.updateCollection(
    id,
    { name, isActive, pdfFile, pdfLink },
    adminId
  )

  return res.json(collection)
}

export async function deleteCollection(req: Request, res: Response) {
  try {
    const { id } = req.params
    const adminId = (req as any).admin?.id

    await collectionService.deleteCollection(id, adminId)

    return res.json({ success: true })
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || 'Delete collection failed'
    })
  }
}
