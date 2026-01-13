import { prisma } from '../lib/prisma'

export async function getAbout() {
  return prisma.aboutPage.findFirst()
}

export async function updateAbout(data: {
  title: string
  summary?: string
  content: string
  imageUrl?: string
  seoTitle?: string
  seoDesc?: string
}) {
  const existing = await prisma.aboutPage.findFirst()

  // ✅ CHƯA CÓ → CREATE
  if (!existing) {
    return prisma.aboutPage.create({
      data: {
        title: data.title,
        summary: data.summary,
        content: data.content,
        imageUrl: data.imageUrl,
        seoTitle: data.seoTitle,
        seoDesc: data.seoDesc
      }
    })
  }

  // ✅ CÓ RỒI → UPDATE
  return prisma.aboutPage.update({
    where: { id: existing.id },
    data: {
      title: data.title,
      summary: data.summary,
      content: data.content,
      imageUrl: data.imageUrl,
      seoTitle: data.seoTitle,
      seoDesc: data.seoDesc
    }
  })
}
