import { Router } from 'express'
import { getServerTime } from '../controllers/system.controller'
import { requireAuth } from '../middlewares/auth.middleware'

const router = Router()

router.get('/system/time', requireAuth, getServerTime)

export default router
