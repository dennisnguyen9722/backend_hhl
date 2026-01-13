import { Request, Response } from 'express'
import { AdminUserService } from '../services/admin-user.service'
import { writeAuditLog } from '../services/audit-log.service'
import { Role } from '@prisma/client'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'

export class AdminUserController {
  static async list(req: Request, res: Response) {
    const users = await AdminUserService.list()
    res.json({ users })
  }

  static async create(req: Request, res: Response) {
    const admin = (req as any).admin
    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'INVALID_INPUT' })
    }

    if (!Object.values(Role).includes(role)) {
      return res.status(400).json({ message: 'INVALID_ROLE' })
    }

    const user = await AdminUserService.create({
      name,
      email,
      password,
      role
    })

    // ===== AUDIT LOG =====
    try {
      await writeAuditLog({
        adminId: admin.id,
        action: 'CREATE',
        entity: 'AdminUser',
        entityId: user.id,
        payload: {
          email: user.email,
          role: user.role
        }
      })
    } catch (e) {
      console.error('Audit log failed (create user)', e)
    }

    res.status(201).json({ id: user.id })
  }

  static async update(req: Request, res: Response) {
    const admin = (req as any).admin
    const { id } = req.params
    const { role, isActive } = req.body

    const data: any = {}
    if (role) data.role = role
    if (typeof isActive === 'boolean') data.isActive = isActive

    // ===== BEFORE STATE =====
    const before = await prisma.adminUser.findUnique({
      where: { id },
      select: { role: true, isActive: true }
    })

    await AdminUserService.update(id, data)

    // ===== AFTER STATE =====
    const after = await prisma.adminUser.findUnique({
      where: { id },
      select: { role: true, isActive: true }
    })

    // ===== AUDIT LOG =====
    try {
      await writeAuditLog({
        adminId: admin.id,
        action: 'UPDATE',
        entity: 'AdminUser',
        entityId: id,
        payload: {
          before,
          after
        }
      })
    } catch (e) {
      console.error('Audit log failed (update user)', e)
    }

    res.json({ success: true })
  }

  static async changePassword(req: Request, res: Response) {
    const admin = (req as any).admin
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'INVALID_INPUT' })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'PASSWORD_TOO_SHORT' })
    }

    const user = await prisma.adminUser.findUnique({
      where: { id: admin.id }
    })

    if (!user) {
      return res.status(404).json({ message: 'USER_NOT_FOUND' })
    }

    const ok = await bcrypt.compare(currentPassword, user.password)

    if (!ok) {
      return res.status(400).json({ message: 'INVALID_CURRENT_PASSWORD' })
    }

    const hashed = await bcrypt.hash(newPassword, 10)

    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { password: hashed }
    })

    // AUDIT LOG
    try {
      await writeAuditLog({
        adminId: admin.id,
        action: 'UPDATE',
        entity: 'AdminUser',
        entityId: admin.id,
        payload: {
          action: 'change_password'
        }
      })
    } catch (e) {
      console.error('Audit log failed', e)
    }

    res.json({ success: true })
  }

  static async updateAvatar(req: Request, res: Response) {
    const admin = (req as any).admin
    const file = (req as any).file

    if (!file) {
      return res.status(400).json({ message: 'NO_FILE' })
    }

    // ✅ CHỈ LƯU RELATIVE PATH
    const avatarPath = `avatars/${file.filename}`

    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { avatar: avatarPath } // ✅ Lưu: avatars/xxx.png
    })

    // AUDIT LOG
    try {
      await writeAuditLog({
        adminId: admin.id,
        action: 'UPDATE',
        entity: 'AdminUser',
        entityId: admin.id,
        payload: { action: 'update_avatar' }
      })
    } catch {}

    res.json({ avatar: avatarPath }) // ✅ Trả về: avatars/xxx.png
  }

  // Thêm method này vào AdminUserController

  static async updateProfile(req: Request, res: Response) {
    const admin = (req as any).admin
    const { name } = req.body

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'INVALID_INPUT' })
    }

    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { name: name.trim() }
    })

    // AUDIT LOG
    try {
      await writeAuditLog({
        adminId: admin.id,
        action: 'UPDATE',
        entity: 'AdminUser',
        entityId: admin.id,
        payload: { action: 'update_profile', name }
      })
    } catch (e) {
      console.error('Audit log failed', e)
    }

    res.json({ success: true, name: name.trim() })
  }
}
