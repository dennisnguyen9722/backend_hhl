import { Request, Response } from 'express'
import { importCatalogZip } from '../services/image-zip.service'

export async function uploadZipFile(req: Request, res: Response) {
  const { collectionId } = req.params
  const adminId = (req as any).admin?.id

  if (!collectionId) {
    return res.status(400).json({ message: 'Missing collectionId' })
  }

  if (!req.file) {
    return res.status(400).json({ message: 'Missing zip file' })
  }

  if (!adminId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const result = await importCatalogZip({
    zipPath: req.file.path,
    collectionId,
    adminId
  })

  return res.json({
    message: 'ZIP_IMPORTED',
    ...result
  })
}
