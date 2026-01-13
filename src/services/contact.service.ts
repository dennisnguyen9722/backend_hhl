import { prisma } from '../lib/prisma'

export async function getContact() {
  return prisma.contactPage.findFirst()
}

export async function updateContact(data: {
  companyName: string
  address?: string
  phone?: string
  email?: string
  mapEmbed?: string
  facebookUrl?: string
  seoTitle?: string
  seoDesc?: string
}) {
  const existing = await prisma.contactPage.findFirst()

  if (!existing) {
    return prisma.contactPage.create({
      data: {
        companyName: data.companyName,
        address: data.address,
        phone: data.phone,
        email: data.email,
        mapEmbed: data.mapEmbed,
        facebookUrl: data.facebookUrl,
        seoTitle: data.seoTitle,
        seoDesc: data.seoDesc
      }
    })
  }

  return prisma.contactPage.update({
    where: { id: existing.id },
    data: {
      companyName: data.companyName,
      address: data.address,
      phone: data.phone,
      email: data.email,
      mapEmbed: data.mapEmbed,
      facebookUrl: data.facebookUrl,
      seoTitle: data.seoTitle,
      seoDesc: data.seoDesc
    }
  })
}
