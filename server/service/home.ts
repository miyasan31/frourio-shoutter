import { depend } from 'velona'
import { PrismaClient } from '@prisma/client'
import type { Tweet, Prisma } from '$prisma/client'
import { GetHome } from '$/types/home'

const prisma = new PrismaClient()

export const getFollowingUserTweetList = depend(
  {
    prisma: prisma as unknown as {
      follow: {
        findMany(query: Prisma.FollowFindManyArgs): Promise<GetHome>
      }
    }
  },
  async ({ prisma }, userId: Tweet['userId']) => {
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
              orderBy: {
                createdAt: 'desc'
              },
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
            replies: {
              orderBy: {
                createdAt: 'desc'
              }
            },
            // user -> retweets
            retweets: {
              orderBy: {
                createdAt: 'desc'
              },
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
)
