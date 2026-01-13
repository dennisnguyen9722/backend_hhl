import { Router } from 'express'
import { updateCollection } from '../controllers/admin.collection.controller'

const router = Router()

// PATCH /admin/collections/:id
router.patch('/collections/:id', updateCollection)

export default router
