import { PrismaClient } from '@prisma/client'

// Khai báo biến global để tránh tạo quá nhiều kết nối khi code hot-reload
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'] // Bật log để xem câu lệnh SQL chạy thế nào
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
