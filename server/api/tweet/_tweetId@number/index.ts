import type { Prisma } from '$prisma/client'
import type { GetTweet } from '$/types/tweet'

export type Methods = {
  get: {
    resBody: GetTweet
    status: 200
  }

  patch: {
    reqBody: Prisma.TweetUpdateInput
    status: 204
  }

  delete: {
    status: 204
  }
}
