import { PrismaClient } from '@prisma/client'
import type { User } from '$prisma/client'

const prisma = new PrismaClient()

export const responseTypeCheck = async (id: User['id']) => {
  const result = await prisma.follow.findMany({
    where: {
      // is following user
      userId: id
    },
    include: {
      // following -> user
      following: {
        include: {
          // following(user) is followed
          followers: {
            where: { userId: id },
            select: { id: true }
          },
          // countings on user follow
          _count: {
            select: { followers: true, followings: true }
          },
          // user -> tweets
          tweets: {
            // sotr by createdAt desc
            orderBy: { createdAt: 'desc' },
            include: {
              // user is liked
              likes: {
                where: { userId: id },
                select: { id: true }
              },
              // user is retweeted
              retweets: {
                where: { userId: id },
                select: { id: true }
              },
              // countings on tweet
              _count: {
                select: { replies: true, retweets: true, likes: true }
              }
            }
          },
          // user -> replies
          replies: {
            orderBy: { createdAt: 'desc' }
          },
          // user -> retweets
          retweets: {
            // sotr by createdAt desc
            orderBy: { createdAt: 'desc' },
            include: {
              // retweets -> tweet
              tweet: {
                include: {
                  // tweet -> user
                  user: {
                    include: {
                      // user is followed
                      followers: {
                        where: { userId: id },
                        select: { id: true }
                      },
                      // countings on user follow
                      _count: {
                        select: { followers: true, followings: true }
                      }
                    }
                  },
                  // user is liked
                  likes: {
                    where: { userId: id },
                    select: { id: true }
                  },
                  // user is retweeted
                  retweets: {
                    where: { userId: id },
                    select: { id: true }
                  },
                  // countings on tweet
                  _count: {
                    select: { replies: true, retweets: true, likes: true }
                  }
                }
              }
            }
          }
        }
      }
    }
  })

  return result
}
