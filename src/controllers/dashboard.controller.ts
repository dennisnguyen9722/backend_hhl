import { Request, Response } from 'express'
import * as dashboardService from '../services/dashboard.service'

export async function getDashboardOverview(req: Request, res: Response) {
  const data = await dashboardService.getDashboardOverview()
  return res.json(data)
}

/* ================= NEW ================= */

export async function getRecentUploads(req: Request, res: Response) {
  const limit = Math.min(parseInt(req.query.limit as string) || 10, 50)

  const images = await dashboardService.getRecentImages(limit)

  return res.json(images)
}

export async function getDashboardActivity(req: Request, res: Response) {
  const data = await dashboardService.getRecentActivity(10)
  res.json(data)
}
