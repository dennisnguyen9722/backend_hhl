import { Request, Response } from 'express'
import * as aboutService from '../services/about.service'

export async function getAbout(_req: Request, res: Response) {
  const about = await aboutService.getAbout()
  return res.json(about)
}

export async function updateAbout(req: Request, res: Response) {
  const updated = await aboutService.updateAbout(req.body)
  return res.json(updated)
}
