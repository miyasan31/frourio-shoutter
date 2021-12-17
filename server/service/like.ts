import { PrismaClient } from '@prisma/client'
import type { Like, Prisma } from '$prisma/client'

const prisma = new PrismaClient()

export const createLike = async (createLike: Prisma.LikeCreateInput) => {
  const result = await prisma.like.create({ data: createLike })

  return result
}

export const deleteLike = async (id: Like['id']) => {
  const result = await prisma.like.delete({ where: { id } })

  return result
}
