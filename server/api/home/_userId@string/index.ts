import type { Follow, User, Retweet, Tweet, Reply } from '$prisma/client'

export type Methods = {
  get: {
    resBody: (Follow & {
      following: User & {
        tweets: Tweet[]
        replies: Reply[]
        retweets: (Retweet & {
          tweet: Tweet
        })[]
      }
    })[]
    status: 200
  }
}
