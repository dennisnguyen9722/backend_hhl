import { Request, Response } from 'express'
import * as bannerService from '../services/banner.service'

/* ================= ADMIN ================= */

export async function getBanners(req: Request, res: Response) {
  const banners = await bannerService.getAllBanners()
  res.json(banners)
}

export async function createBanner(req: Request, res: Response) {
  const { imageUrl, title, linkUrl, sortOrder, isActive } = req.body

  if (!imageUrl) {
    return res.status(400).json({ message: 'Missing imageUrl' })
  }

  const banner = await bannerService.createBanner({
    imageUrl,
    title,
    linkUrl,
    sortOrder,
    isActive
  })

  res.json(banner)
}

export async function updateBanner(req: Request, res: Response) {
  const { id } = req.params
  const banner = await bannerService.updateBanner(id, req.body)
  res.json(banner)
}

export async function deleteBanner(req: Request, res: Response) {
  const { id } = req.params
  await bannerService.deleteBanner(id)
  res.json({ success: true })
}

/* ================= PUBLIC ================= */

/* ================= PUBLIC ================= */

export async function getPublicBanners(req: Request, res: Response) {
  const banners = await bannerService.getActiveBanners()

  res.json(
    banners.map((b) => ({
      id: b.id,
      image: b.imageUrl, // 👈 MAP Ở ĐÂY
      link: b.linkUrl ?? null,
      title: b.title ?? null
    }))
  )
}
