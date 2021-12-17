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

export type GetAllTweetQuery = {
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
export type GetTweetQuery = {
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
