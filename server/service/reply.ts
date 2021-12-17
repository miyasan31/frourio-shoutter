import { depend } from 'velona'
import { PrismaClient } from '@prisma/client'
import type { Reply, Prisma } from '$prisma/client'

const prisma = new PrismaClient()

// not used
export const getReplyList = depend(
  { prisma: prisma as { reply: { findMany(): Promise<Reply[]> } } },
  async ({ prisma }) => {
    const result = await prisma.reply.findMany()

    return result
  }
)

// [userId]/reply/[tweetId].page.tsx
export const getReply = async (id: Reply['id']) => {
  const result = await prisma.reply.findUnique({ where: { id } })

  return result
}

export const createReply = async (createReply: Prisma.ReplyCreateInput) => {
  const result = await prisma.reply.create({ data: createReply })

  return result
}

export const updateReply = async (
  id: Reply['id'],
  updateReply: Prisma.ReplyUpdateInput
) => {
  const result = await prisma.reply.update({ where: { id }, data: updateReply })

  return result
}

export const deleteReply = async (id: Reply['id']) => {
  const result = await prisma.reply.delete({ where: { id } })

  return result
}
