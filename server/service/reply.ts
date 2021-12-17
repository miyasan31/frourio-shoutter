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
export const getReply = depend(
  {
    prisma: prisma as unknown as {
      reply: {
        findUnique(query: Prisma.ReplyFindUniqueArgs): Promise<Reply>
      }
    }
  },
  async ({ prisma }, id: Reply['id']) => {
    const result = await prisma.reply.findUnique({
      where: {
        id: id
      }
    })
    return result
  }
)

export const createReply = depend(
  {
    prisma: prisma as unknown as {
      reply: {
        create(query: Prisma.ReplyCreateArgs): Promise<Reply>
      }
    }
  },
  async ({ prisma }, createReply: Prisma.ReplyCreateInput) => {
    const result = await prisma.reply.create({ data: createReply })
    return result
  }
)

export const updateReply = depend(
  {
    prisma: prisma as unknown as {
      reply: {
        update(query: Prisma.ReplyUpdateArgs): Promise<Reply>
      }
    }
  },
  async ({ prisma }, id: Reply['id'], updateReply: Prisma.ReplyUpdateInput) => {
    const result = await prisma.reply.update({
      where: {
        id: id
      },
      data: updateReply
    })
    return result
  }
)

export const deleteReply = depend(
  {
    prisma: prisma as unknown as {
      reply: {
        delete(query: Prisma.ReplyDeleteArgs): Promise<Reply>
      }
    }
  },
  async ({ prisma }, id: Reply['id']) => {
    const result = await prisma.reply.delete({
      where: {
        id: id
      }
    })

    return result
  }
)
