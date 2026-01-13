import { Request, Response, NextFunction } from 'express'

export function requireSetupKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const key = req.headers['x-setup-key']
  if (key !== process.env.INTERNAL_SETUP_KEY) {
    return res.status(403).json({ message: 'Forbidden' })
  }
  next()
}
