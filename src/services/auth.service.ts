import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'
import { Role } from '@prisma/client'

type LoginInput = {
  email: string
  password: string
}

type LoginResult = {
  token: string
  admin: {
    id: string
    email: string
    name: string
    role: Role
    avatar: string | null
  }
}

export async function login(input: LoginInput): Promise<LoginResult> {
  const { email, password } = input

  const admin = await prisma.adminUser.findUnique({
    where: { email }
  })

  if (!admin) {
    throw new Error('EMAIL_NOT_FOUND')
  }

  if (!admin.isActive) {
    throw new Error('ACCOUNT_DISABLED')
  }

  const ok = await bcrypt.compare(password, admin.password)
  if (!ok) {
    throw new Error('WRONG_PASSWORD')
  }

  const token = jwt.sign(
    {
      id: admin.id,
      role: admin.role
    },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  return {
    token,
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      avatar: admin.avatar
    }
  }
}
