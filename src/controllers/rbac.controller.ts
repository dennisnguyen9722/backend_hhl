import { Request, Response } from 'express'
import { getRBACConfig } from '../services/rbac.service'

export function getRBAC(_req: Request, res: Response) {
  const roles = getRBACConfig()
  return res.json({ roles })
}
