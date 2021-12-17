import { depend } from 'velona'
import { PrismaClient } from '@prisma/client'
import type { Tweet, Prisma } from '$prisma/client'
import type { GetTweet } from '$/types/tweet'

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
        findUnique(query: Prisma.TweetFindUniqueArgs): Promise<GetTweet>
      }
    }
  },
  async ({ prisma }, id: Tweet['id']) => {
    const result = await prisma.tweet.findUnique({
      where: {
        id: id
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
  async ({ prisma }, createTweet: Prisma.TweetCreateInput) => {
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
  async ({ prisma }, id: Tweet['id'], updateTweet: Prisma.TweetUpdateInput) => {
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
