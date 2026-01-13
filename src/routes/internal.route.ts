import { Router } from 'express'
import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma'
import { requireSetupKey } from '../middlewares/internal.middleware'

const router = Router()

router.post('/create-admin', requireSetupKey, async (req, res) => {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Missing fields' })
  }

  const exists = await prisma.adminUser.findUnique({ where: { email } })
  if (exists) {
    return res.status(409).json({ message: 'Admin already exists' })
  }

  const hashed = await bcrypt.hash(password, 12)

  const admin = await prisma.adminUser.create({
    data: {
      email,
      password: hashed,
      name
    }
  })

  res.json({
    id: admin.id,
    email: admin.email,
    name: admin.name
  })
})

export default router
