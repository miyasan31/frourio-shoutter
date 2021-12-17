import { PrismaClient } from '@prisma/client'
import type { Tweet } from '$prisma/client'

const prisma = new PrismaClient()

export const getFollowingUserTweetList = async (userId: Tweet['userId']) => {
  const result = await prisma.follow.findMany({
    where: {
      // is following user
      userId: userId
    },
    include: {
      // following -> user
      following: {
        include: {
          // user -> tweets
          tweets: {
            include: {
              _count: {
                select: {
                  replies: true,
                  retweets: true,
                  likes: true
                }
              }
            }
          },
          // user -> replies
          replies: true,
          // user -> retweets
          retweets: {
            include: {
              // retweets -> tweet
              tweet: {
                include: {
                  _count: {
                    select: {
                      replies: true,
                      retweets: true,
                      likes: true
                    }
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
