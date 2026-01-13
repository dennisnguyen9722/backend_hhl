import { Request, Response } from 'express'
import * as authService from '../services/auth.service'

export async function login(req: Request, res: Response) {
  try {
    const result = await authService.login(req.body)
    return res.json(result)
  } catch (e: any) {
    switch (e.message) {
      case 'EMAIL_NOT_FOUND':
        return res.status(400).json({ code: 'EMAIL_NOT_FOUND' })

      case 'WRONG_PASSWORD':
        return res.status(400).json({ code: 'WRONG_PASSWORD' })

      case 'ACCOUNT_DISABLED':
        return res.status(403).json({ code: 'ACCOUNT_DISABLED' })

      default:
        return res.status(400).json({ code: 'LOGIN_FAILED' })
    }
  }
}
