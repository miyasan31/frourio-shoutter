import { PrismaClient } from '@prisma/client'
import type { Retweet, Prisma } from '$prisma/client'

const prisma = new PrismaClient()

export const createRetweet = async (
  createRetweet: Prisma.RetweetCreateInput
) => {
  const result = await prisma.retweet.create({ data: createRetweet })

  return result
}

export const deleteRetweet = async (id: Retweet['id']) => {
  const result = await prisma.retweet.delete({ where: { id } })

  return result
}
