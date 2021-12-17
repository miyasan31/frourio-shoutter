import type { Tweet, Follow, User, Like, Reply, Retweet } from '$prisma/client'

export type GetAllUser = (User & {
  _count: {
    followers: number
    followings: number
  }
})[]

export type GetUser =
  | (User & {
      _count: {
        followers: number
        followings: number
      }
    })
  | null

export type GetTweetList = (User & {
  tweets: (Tweet & {
    _count: {
      replies: number
      retweets: number
      likes: number
    }
  })[]
})[]

export type GetReplyList = (User & {
  replies: Reply[]
})[]

export type GetLikeList = (User & {
  likes: (Like & {
    tweet: Tweet & {
      _count: {
        replies: number
        retweets: number
        likes: number
      }
      user: User
    }
  })[]
})[]

export type GetRetweetList = (User & {
  retweets: (Retweet & {
    tweet: Tweet & {
      user: User
      _count: {
        replies: number
        retweets: number
        likes: number
      }
    }
  })[]
})[]

export type GetFollowerList = (User & {
  followers: (Follow & {
    following: User
  })[]
})[]

export type GetFollowingList = (User & {
  followings: (Follow & {
    follower: User
  })[]
})[]
