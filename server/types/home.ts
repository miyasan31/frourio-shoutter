import type { Tweet, Follow, User, Reply, Retweet } from '$prisma/client'

export type GetHome = (Follow & {
  following: User & {
    followers: {
      id: number
    }[]
    _count: {
      followers: number
      followings: number
    }

    tweets: (Tweet & {
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

    replies: (Reply[] & {
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

    retweets: (Retweet & {
      tweet: Tweet & {
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
        user: User & {
          followers: {
            id: number
          }[]
          _count: {
            followers: number
            followings: number
          }
        }
      }
    })[]
  }
})[]
