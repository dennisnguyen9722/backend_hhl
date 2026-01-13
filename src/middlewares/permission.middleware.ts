import { Request, Response, NextFunction } from 'express'
import { ROLE_PERMISSIONS } from '../config/rbac'
import { JwtAdminPayload } from '../types/auth'

export function requirePermission(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const admin = (req as any).admin as JwtAdminPayload | undefined

    if (!admin || !admin.role) {
      return res.status(401).json({ message: 'UNAUTHORIZED' })
    }

    const permissions = ROLE_PERMISSIONS[admin.role]

    if (!permissions) {
      return res.status(403).json({
        message: 'ROLE_HAS_NO_PERMISSIONS',
        role: admin.role
      })
    }

    if (permissions.includes('*') || permissions.includes(permission)) {
      return next()
    }

    return res.status(403).json({ message: 'FORBIDDEN' })
  }
}
