import type { Tweet, Reply, User } from '$prisma/client'

export type GetTweet = Tweet & {
  _count: {
    replies: number
    retweets: number
    likes: number
  }
}

export type GetTweetDetail = Tweet & {
  user: User & {
    followers: {
      id: number
    }[]
    _count: {
      followers: number
      followings: number
    }
  }
  retweets: {
    id: number
  }[]
  likes: {
    id: number
  }[]
  _count: {
    likes: number
    retweets: number
    replies: number
  }

  replies: (Reply & {
    user: User & {
      followers: {
        id: number
      }[]
      _count: {
        followers: number
        followings: number
      }
    }
  })[]
}
