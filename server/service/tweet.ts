import { depend } from 'velona'
import { PrismaClient } from '@prisma/client'
import type { Tweet, Prisma } from '$prisma/client'
import type { GetTweet, GetTweetDetail } from '$/types/tweet'

const prisma = new PrismaClient()

// not used
export const getTweetList = depend(
  {
    prisma: prisma as unknown as {
      tweet: { findMany(query: Prisma.TweetFindManyArgs): Promise<GetTweet[]> }
    }
  },
  async ({ prisma }) => {
    const result = await prisma.tweet.findMany({
      include: {
        _count: {
          select: {
            replies: true,
            retweets: true,
            likes: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return result
  }
)

// [userId]/tweet/[tweetId].page.tsx
export const getTweet = depend(
  {
    prisma: prisma as unknown as {
      tweet: {
        findUnique(query: Prisma.TweetFindUniqueArgs): Promise<GetTweetDetail>
      }
    }
  },
  async ({ prisma }, id: Tweet['id']) => {
    const result = await prisma.tweet.findUnique({
      where: {
        id: id
      },
      include: {
        replies: {
          orderBy: {
            createdAt: 'asc'
          },
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
)

export const createTweet = depend(
  {
    prisma: prisma as unknown as {
      tweet: { create(query: Prisma.TweetCreateArgs): Promise<Tweet> }
    }
  },
  async (
    { prisma },
    // miyasan31:key1
    // createTweet: Prisma.TweetUncheckedCreateInput
    createTweet: Prisma.TweetCreateInput
  ) => {
    const result = await prisma.tweet.create({
      data: createTweet
    })
    return result
  }
)

export const updateTweet = depend(
  {
    prisma: prisma as unknown as {
      tweet: {
        update(query: Prisma.TweetUpdateArgs): Promise<Tweet>
      }
    }
  },
  async (
    { prisma },
    id: Tweet['id'],
    // miyasan31:key1
    // updateTweet: Prisma.TweetUncheckedUpdateInput
    updateTweet: Prisma.TweetUpdateInput
  ) => {
    const result = await prisma.tweet.update({
      where: {
        id: id
      },
      data: updateTweet
    })
    return result
  }
)

export const deleteTweet = depend(
  {
    prisma: prisma as unknown as {
      tweet: {
        delete(query: Prisma.TweetDeleteArgs): Promise<Tweet>
      }
    }
  },
  async ({ prisma }, id: Tweet['id']) => {
    const result = await prisma.tweet.delete({
      where: {
        id: id
      }
    })
    return result
  }
)
