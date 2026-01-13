import path from 'path'
import AdmZip from 'adm-zip'
import { prisma } from '../lib/prisma'
import { writeAuditLog } from './audit-log.service'
import { uploadToCloudinary } from '../utils/cloudinary-upload'

type Input = {
  zipBuffer: Buffer // ✅ THAY ĐỔI: nhận buffer thay vì path
  collectionId: string
  adminId: string
}

export async function importCatalogZip({
  zipBuffer,
  collectionId,
  adminId
}: Input) {
  const collection = await prisma.collection.findUnique({
    where: { id: collectionId },
    include: { brand: true }
  })

  if (!collection) throw new Error('COLLECTION_NOT_FOUND')

  // ✅ GIẢI NÉN ZIP TỪ BUFFER
  const zip = new AdmZip(zipBuffer)
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

    // ✅ LẤY BUFFER CỦA FILE
    const fileBuffer = entry.getData()

    // ✅ UPLOAD LÊN CLOUDINARY
    const cloudinaryResult = await uploadToCloudinary(fileBuffer, {
      folder: `catalog/${collection.brand.slug}/${collection.slug}`,
      resource_type: 'image'
    })

    // ✅ LƯU URL TỪ CLOUDINARY
    const imageUrl = cloudinaryResult.secure_url

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

  await writeAuditLog({
    adminId,
    action: 'CREATE',
    entity: 'Image',
    entityId: collectionId,
    payload: { total }
  })

  return { total }
}
