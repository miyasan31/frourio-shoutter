import type { Tweet, Prisma } from '$prisma/client'
import type { GetTweet } from '$/types/tweet'

export type Methods = {
  get: {
    resBody: GetTweet[]
    status: 200
  }

  post: {
    // miyasan31:key1
    // reqBody: Prisma.TweetUncheckedCreateInput
    reqBody: Prisma.TweetCreateInput
    resBody: Tweet
    status: 201
  }
}
