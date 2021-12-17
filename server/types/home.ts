import type { Tweet, Follow, User, Reply, Retweet } from '$prisma/client'

export type GetHome = (Follow & {
  following: User & {
    replies: Reply[]
    retweets: (Retweet & {
      tweet: Tweet & {
        _count: {
          replies: number
          retweets: number
          likes: number
        }
      }
    })[]
    tweets: Tweet[]
  }
})[]
