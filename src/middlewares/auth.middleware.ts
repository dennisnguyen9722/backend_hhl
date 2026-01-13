import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JwtAdminPayload } from '../types/auth'

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  let token: string | undefined

  // 1️⃣ Authorization header (GIỮ NGUYÊN)
  const authHeader = req.headers.authorization
  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.replace('Bearer ', '')
  }

  // 2️⃣ Fallback sang cookie (THÊM)
  if (!token && req.cookies?.accessToken) {
    token = req.cookies.accessToken
  }

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtAdminPayload

    ;(req as any).admin = payload
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
