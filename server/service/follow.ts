import { PrismaClient } from '@prisma/client'
import type { Follow, Prisma } from '$prisma/client'

const prisma = new PrismaClient()

export const createFollow = async (createFollow: Prisma.FollowCreateInput) => {
  const result = await prisma.follow.create({ data: createFollow })

  return result
}

export const deleteFollow = async (id: Follow['id']) => {
  const result = await prisma.follow.delete({ where: { id } })

  return result
}
