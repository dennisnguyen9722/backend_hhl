import { prisma } from '../lib/prisma'
import { Role } from '@prisma/client'
import bcrypt from 'bcrypt'

type CreateAdminUserInput = {
  name: string
  email: string
  password: string
  role: Role
}

export class AdminUserService {
  static async list() {
    return prisma.adminUser.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    })
  }

  static async create(input: CreateAdminUserInput) {
    const hashedPassword = await bcrypt.hash(input.password, 10)

    return prisma.adminUser.create({
      data: {
        name: input.name,
        email: input.email,
        password: hashedPassword,
        role: input.role
      }
    })
  }

  static async update(
    id: string,
    data: Partial<{ role: Role; isActive: boolean }>
  ) {
    return prisma.adminUser.update({
      where: { id },
      data
    })
  }
}
