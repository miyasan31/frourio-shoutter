import type { Tweet, Reply, User } from '$prisma/client'

export type GetTweet = Tweet & {
  _count: {
    replies: number
    retweets: number
    likes: number
  }
}

export type GetTweetDetail = Tweet & {
  replies: (Reply & {
    user: User
  })[]
  _count: {
    likes: number
    retweets: number
    replies: number
  }
}
