import { Request, Response } from 'express'

export function getServerTime(req: Request, res: Response) {
  res.json({
    now: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  })
}
