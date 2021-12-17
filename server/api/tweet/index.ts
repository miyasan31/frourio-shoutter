import type { Tweet, Prisma } from '$prisma/client'

export type Methods = {
  get: {
    resBody: Tweet[]
    status: 200
  }

  post: {
    reqBody: Prisma.TweetCreateInput
    resBody: Tweet
    status: 204
  }
}
