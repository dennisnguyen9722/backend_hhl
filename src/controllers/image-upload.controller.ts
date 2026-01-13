import { Request, Response } from 'express'
import { importCatalogZip } from '../services/image-zip.service'

export async function uploadCatalogZipFile(req: Request, res: Response) {
  const { collectionId } = req.params

  if (!req.file) {
    return res.status(400).json({ message: 'ZIP_MISSING' })
  }

  const adminId = (req as any).admin?.id

  const result = await importCatalogZip({
    zipBuffer: req.file.buffer, // ✅ THAY ĐỔI: truyền buffer thay vì path
    collectionId,
    adminId
  })

  return res.json({
    message: 'ZIP_IMPORTED',
    total: result.total
  })
}
