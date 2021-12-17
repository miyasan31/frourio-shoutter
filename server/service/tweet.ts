import { depend } from 'velona'
import { PrismaClient } from '@prisma/client'
import type { Tweet, Prisma } from '$prisma/client'

type GetTweet =
  | (Tweet & {
      _count: {
        replies: number
        retweets: number
        likes: number
      }
    })
  | null

type GetTweetQuery = {
  where: {
    id: Tweet['id']
  }
  include: {
    _count: {
      select: {
        replies: true
        retweets: true
        likes: true
      }
    }
  }
}

const prisma = new PrismaClient()

// not used
export const getTweetList = depend(
  { prisma: prisma as { tweet: { findMany(): Promise<Tweet[]> } } },
  async ({ prisma }) => {
    const result = await prisma.tweet.findMany()
    return result
  }
)

// [userId]/tweet/[tweetId].page.tsx
export const getTweet = depend(
  {
    prisma: prisma as unknown as {
      tweet: {
        findUnique(query: GetTweetQuery): Promise<GetTweet>
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

// export const getTweet = async (id: Tweet['id']) => {
//   const result = await prisma.tweet.findUnique({
//     where: {
//       id
//     },
//     include: {
//       _count: {
//         select: {
//           replies: true,
//           retweets: true,
//           likes: true
//         }
//       }
//     }
//   })

//   return result
// }

export const createTweet = async (createTweet: Prisma.TweetCreateInput) => {
  const result = await prisma.tweet.create({ data: createTweet })

  return result
}

export const updateTweet = async (
  id: Tweet['id'],
  updateTweet: Prisma.TweetUpdateInput
) => {
  const result = await prisma.tweet.update({ where: { id }, data: updateTweet })

  return result
}

export const deleteTweet = async (id: Tweet['id']) => {
  const result = await prisma.tweet.delete({ where: { id } })

  return result
}
