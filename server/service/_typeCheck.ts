import { PrismaClient } from '@prisma/client'
import type { Tweet } from '$prisma/client'

const prisma = new PrismaClient()

export const responseTypeCheck = async (id: Tweet['id']) => {
  const result = await prisma.tweet.findUnique({
    where: {
      id: id
    },
    include: {
      replies: {
        include: {
          user: true
        }
      },
      _count: {
        select: {
          replies: true,
          retweets: true,
          likes: true
        }
      }
    }
  })

  return result
}
