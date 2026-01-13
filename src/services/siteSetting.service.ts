import { prisma } from '../lib/prisma'

export async function getSiteSetting() {
  let setting = await prisma.siteSetting.findUnique({
    where: { id: 1 }
  })

  if (!setting) {
    setting = await prisma.siteSetting.create({
      data: {
        id: 1,
        siteName: 'Huy Hoàng Lighting',
        logo: null,
        favicon: null // ✅ thêm
      }
    })
  }

  return setting
}

export async function updateSiteSetting(data: {
  siteName?: string
  logo?: string | null
  favicon?: string | null // ✅ thêm
}) {
  return prisma.siteSetting.update({
    where: { id: 1 },
    data
  })
}
