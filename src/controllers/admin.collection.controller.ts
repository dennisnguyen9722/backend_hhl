import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

/**
 * UPDATE COLLECTION (ADMIN)
 * PATCH /admin/collections/:id
 */
export async function updateCollection(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { pdfFile } = req.body as { pdfFile?: string }

    const updated = await prisma.collection.update({
      where: { id },
      data: {
        pdfFile
      }
    })

    return res.json(updated)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Failed to update collection'
    })
  }
}
