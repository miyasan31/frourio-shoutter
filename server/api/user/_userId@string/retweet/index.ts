import type { Tweet, User, Retweet } from '$prisma/client'
import type { AuthHeader } from '$/types'

export type Methods = {
  get: {
    reqHeaders: AuthHeader

    resBody: (User & {
      retweets: (Retweet & {
        tweet: Tweet & {
          user: User
        }
      })[]
    })[]
    status: 200
  }
}
