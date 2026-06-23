import { PrismaClient } from '@/app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  const connectionString = (process.env.DATABASE_URL || '')
    // Use libpq compatible SSL mode to avoid self-signed cert issues with Supabase pooler
    .replace('sslmode=require', 'sslmode=require&uselibpqcompat=true')

  const adapter = new PrismaPg({ connectionString })
  return new PrismaClient({ adapter } as Parameters<typeof PrismaClient>[0])
}

const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
