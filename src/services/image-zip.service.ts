import fs from 'fs'
import path from 'path'
import crypto from 'crypto' // ✅ BẮT BUỘC
import AdmZip from 'adm-zip'
import { prisma } from '../lib/prisma'
import { writeAuditLog } from './audit-log.service'

type Input = {
  zipPath: string
  collectionId: string
  adminId: string
}

export async function importCatalogZip({
  zipPath,
  collectionId,
  adminId
}: Input) {
  const collection = await prisma.collection.findUnique({
    where: { id: collectionId },
    include: { brand: true }
  })

  if (!collection) throw new Error('COLLECTION_NOT_FOUND')

  const baseDir = path.join(
    process.cwd(),
    'uploads/catalog',
    collection.brand.slug,
    collection.slug
  )

  fs.mkdirSync(baseDir, { recursive: true })

  const zip = new AdmZip(zipPath)
  const entries = zip.getEntries()

  const lastImage = await prisma.image.findFirst({
    where: { collectionId },
    orderBy: { sortOrder: 'desc' }
  })

  let sortOrder = lastImage ? lastImage.sortOrder + 1 : 0

  let total = 0

  for (const entry of entries) {
    if (entry.isDirectory) continue

    const ext = path.extname(entry.entryName).toLowerCase()
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue

    const filename = `${crypto.randomUUID()}${ext}`
    const filePath = path.join(baseDir, filename)

    fs.writeFileSync(filePath, entry.getData())

    // ✅ CHỈ LƯU RELATIVE PATH (KHÔNG DOMAIN, KHÔNG /uploads)
    const imageUrl = `catalog/${collection.brand.slug}/${collection.slug}/${filename}`

    await prisma.image.create({
      data: {
        collectionId,
        imageUrl,
        sortOrder: sortOrder++,
        isActive: true
      }
    })

    total++
  }

  fs.unlinkSync(zipPath)

  await writeAuditLog({
    adminId,
    action: 'CREATE',
    entity: 'Image',
    entityId: collectionId,
    payload: { total }
  })

  return { total }
}
