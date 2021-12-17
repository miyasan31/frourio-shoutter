import type { Tweet } from '$prisma/client'

export type GetTweet =
  | (Tweet & {
      _count: {
        replies: number
        retweets: number
        likes: number
      }
    })
  | null
