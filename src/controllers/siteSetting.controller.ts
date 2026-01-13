// src/controllers/siteSetting.controller.ts
import { Request, Response } from 'express'
import * as siteSettingService from '../services/siteSetting.service'

export async function getSiteSetting(req: Request, res: Response) {
  const setting = await siteSettingService.getSiteSetting()
  res.json(setting)
}

export async function updateSiteSetting(req: Request, res: Response) {
  const { siteName, logo, favicon } = req.body // ✅ thêm favicon

  const setting = await siteSettingService.updateSiteSetting({
    siteName,
    logo,
    favicon // ✅ truyền xuống service
  })

  res.json(setting)
}
