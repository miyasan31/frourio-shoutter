import type { Tweet, User, Retweet } from '$prisma/client'

export type Methods = {
  get: {
    resBody: (User & {
      retweets: (Retweet & {
        tweet: Tweet & {
          user: User
        }
      })[]
    })[]
  }
}
