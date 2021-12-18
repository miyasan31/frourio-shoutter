import type { Prisma } from '$prisma/client'
import type { GetTweetDetail } from '$/types/tweet'

export type Methods = {
  get: {
    resBody: GetTweetDetail
    status: 200
  }

  patch: {
    // miyasan31:key1
    // reqBody: Prisma.TweetUncheckedUpdateInput
    reqBody: Prisma.TweetUpdateInput
    status: 204
  }

  delete: {
    status: 204
  }
}
